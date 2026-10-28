import asyncio
import json
import os
import subprocess
import time
import httpx
import websockets
from dotenv import dotenv_values

ADMIN_ENV_PATH = os.path.abspath("backend/.env.admin")
if not os.path.exists(ADMIN_ENV_PATH):
    raise RuntimeError("backend/.env.admin not found.")

admin_creds = dotenv_values(ADMIN_ENV_PATH)
ADMIN_EMAIL = admin_creds.get("ADMIN_EMAIL", "testadmin@anrcas.edu.in")
ADMIN_PASSWORD = admin_creds.get("ADMIN_PASSWORD", "")

ARTIFACTS_DIR = os.path.abspath("docs/qa/artifacts")
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

SET_REACT_VAL_JS = """
function setReactVal(selector, val) {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!el) return false;
    const proto = el instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype :
                  el instanceof HTMLSelectElement ? window.HTMLSelectElement.prototype :
                  window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(proto, 'value');
    if (descriptor && descriptor.set) {
        descriptor.set.call(el, val);
    } else {
        el.value = val;
    }
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
}
"""

class CDPClient:
    def __init__(self, ws):
        self.ws = ws
        self.msg_id = 0

    async def call(self, method, params=None):
        self.msg_id += 1
        req_id = self.msg_id
        await self.ws.send(json.dumps({"id": req_id, "method": method, "params": params or {}}))
        start = time.time()
        while time.time() - start < 10.0:
            try:
                raw = await asyncio.wait_for(self.ws.recv(), timeout=0.5)
                data = json.loads(raw)
                if data.get("id") == req_id:
                    if "error" in data:
                        raise RuntimeError(f"CDP error calling {method}: {data['error']}")
                    return data.get("result", {})
            except asyncio.TimeoutError:
                pass
        raise TimeoutError(f"CDP call {method} timed out waiting for id {req_id}")

    async def navigate(self, url, wait_seconds=2.0):
        await self.call("Page.navigate", {"url": url})
        await asyncio.sleep(wait_seconds)

    async def eval(self, js_expr):
        res = await self.call("Runtime.evaluate", {
            "expression": js_expr,
            "awaitPromise": True,
            "returnByValue": True
        })
        return res.get("result", {}).get("value")

    async def screenshot(self, filename):
        path = os.path.join(ARTIFACTS_DIR, filename)
        res = await self.call("Page.captureScreenshot", {"format": "png"})
        import base64
        with open(path, "wb") as f:
            f.write(base64.b64decode(res["data"]))
        print(f"  [Artifact] Saved screenshot: {filename}")
        return path

    async def set_viewport(self, width, height, mobile=False):
        await self.call("Emulation.setDeviceMetricsOverride", {
            "width": width,
            "height": height,
            "deviceScaleFactor": 1,
            "mobile": mobile
        })

async def run_deep_qa():
    edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    temp_dir = r"C:\Users\MMIP\AppData\Local\Temp\edge_deep_qa_v2"
    os.makedirs(temp_dir, exist_ok=True)

    proc = subprocess.Popen([
        edge_exe,
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-extensions",
        f"--user-data-dir={temp_dir}",
        "--remote-debugging-port=9260",
        "http://localhost:5173/"
    ])
    time.sleep(2)

    try:
        res = httpx.get("http://127.0.0.1:9260/json")
        targets = [t for t in res.json() if t.get("type") == "page"]
        if not targets:
            raise RuntimeError("No page target found!")
        ws_url = targets[0]["webSocketDebuggerUrl"]

        async with websockets.connect(ws_url, max_size=15_000_000) as ws:
            cdp = CDPClient(ws)
            await cdp.call("Page.enable")
            await cdp.call("Runtime.enable")
            await cdp.call("DOM.enable")

            results = {}

            # ==========================================
            # TEST 1: MOBILE NAVIGATION DRAWER
            # ==========================================
            print("\n[TEST 1] Mobile Navigation Drawer (Viewport 375x812)...")
            await cdp.set_viewport(375, 812, mobile=True)
            await cdp.navigate("http://localhost:5173/", wait_seconds=1.5)

            # Check drawer initially closed
            initially_closed = await cdp.eval("document.getElementById('mobile-navigation-menu') === null")

            # Click open
            open_clicked = await cdp.eval("""
                (() => {
                    const btn = document.querySelector('button[aria-label="Open navigation menu"]');
                    if (btn) { btn.click(); return true; }
                    return false;
                })()
            """)
            await asyncio.sleep(0.6)

            drawer_open = await cdp.eval("document.getElementById('mobile-navigation-menu') !== null")
            await cdp.screenshot("test1_mobile_nav_opened.png")

            # Click close
            close_clicked = await cdp.eval("""
                (() => {
                    const btn = document.querySelector('button[aria-label="Close navigation menu"]');
                    if (btn) { btn.click(); return true; }
                    return false;
                })()
            """)
            await asyncio.sleep(0.6)
            drawer_closed = await cdp.eval("document.getElementById('mobile-navigation-menu') === null")

            t1_pass = initially_closed and open_clicked and drawer_open and close_clicked and drawer_closed
            results["mobile_nav_drawer"] = {
                "initially_closed": initially_closed,
                "open_clicked": open_clicked,
                "drawer_open": drawer_open,
                "close_clicked": close_clicked,
                "drawer_closed": drawer_closed,
                "status": "PASS" if t1_pass else "FAIL"
            }
            print(f"  Result: {'PASS' if t1_pass else 'FAIL'}")

            # Switch back to Desktop Viewport
            await cdp.set_viewport(1920, 1080, mobile=False)

            # ==========================================
            # TEST 2: SEARCH MODAL
            # ==========================================
            print("\n[TEST 2] Search Dialog & Real-Time Filtering...")
            await cdp.navigate("http://localhost:5173/", wait_seconds=1.5)

            open_search = await cdp.eval("""
                (() => {
                    const btn = document.querySelector('button[aria-label="Open search dialog"]');
                    if (btn) { btn.click(); return true; }
                    return false;
                })()
            """)
            await asyncio.sleep(0.5)

            # Type 'Computer' in search
            typed_query = await cdp.eval(f"""
                (() => {{
                    {SET_REACT_VAL_JS}
                    return setReactVal('input[aria-label=\"Search campus query\"]', 'Computer');
                }})()
            """)
            await asyncio.sleep(0.8)

            has_computer_result = await cdp.eval("""
                (() => {
                    const dlg = document.querySelector('div[role=\"dialog\"]');
                    return dlg ? dlg.innerText.includes('Computer Science') : false;
                })()
            """)
            await cdp.screenshot("test2_search_results.png")

            # Close search
            close_search = await cdp.eval("""
                (() => {
                    const btn = document.querySelector('button[aria-label=\"Close search dialog\"]');
                    if (btn) { btn.click(); return true; }
                    return false;
                })()
            """)
            await asyncio.sleep(0.5)

            t2_pass = open_search and typed_query and has_computer_result and close_search
            results["search_dialog"] = {
                "open_search": open_search,
                "typed_query": typed_query,
                "has_computer_result": has_computer_result,
                "close_search": close_search,
                "status": "PASS" if t2_pass else "FAIL"
            }
            print(f"  Result: {'PASS' if t2_pass else 'FAIL'}")

            # ==========================================
            # TEST 3: ADMISSIONS ENQUIRY SUBMISSION
            # ==========================================
            print("\n[TEST 3] Admissions Enquiry Submission & Reference Receipt...")
            await cdp.navigate("http://localhost:5173/admissions", wait_seconds=1.5)

            fill_admissions = await cdp.eval(f"""
                (() => {{
                    {SET_REACT_VAL_JS}
                    setReactVal('#enquiry-applicant-name', 'S. Vignesh Kumar');
                    setReactVal('#enquiry-email', 'vignesh.kumar@example.com');
                    setReactVal('#enquiry-phone', '9840012345');
                    setReactVal('#enquiry-message', 'Seeking admission into B.Sc Computer Science CBCS syllabus.');
                    return true;
                }})()
            """)

            submit_admissions = await cdp.eval("""
                (() => {
                    const form = document.querySelector('form');
                    const btn = form ? form.querySelector('button[type=\"submit\"]') : null;
                    if (btn) { btn.click(); return true; }
                    return false;
                })()
            """)
            await asyncio.sleep(2.5)

            has_reg_heading = await cdp.eval("document.body.innerText.includes('Enquiry Registered')")
            has_app_ref = await cdp.eval("document.body.innerText.includes('Application Ref:')")
            await cdp.screenshot("admissions_submission_success.png")

            t3_pass = fill_admissions and submit_admissions and has_reg_heading and has_app_ref
            results["admissions_submission"] = {
                "fill_admissions": fill_admissions,
                "submit_admissions": submit_admissions,
                "has_reg_heading": has_reg_heading,
                "has_app_ref": has_app_ref,
                "status": "PASS" if t3_pass else "FAIL"
            }
            print(f"  Result: {'PASS' if t3_pass else 'FAIL'}")

            # ==========================================
            # TEST 4: CONTACT MESSAGE SUBMISSION
            # ==========================================
            print("\n[TEST 4] Contact Message Submission...")
            await cdp.navigate("http://localhost:5173/contact", wait_seconds=1.5)

            fill_contact = await cdp.eval(f"""
                (() => {{
                    {SET_REACT_VAL_JS}
                    setReactVal('#contact-full-name', 'R. Anbarasan');
                    setReactVal('#contact-email', 'anbarasan@example.com');
                    setReactVal('#contact-phone', '9876543210');
                    setReactVal('#contact-message', 'Enquiring about bus transit schedules from Cheyyar to Vadamavandal.');
                    return true;
                }})()
            """)

            submit_contact = await cdp.eval("""
                (() => {
                    const form = document.querySelector('form');
                    const btn = form ? form.querySelector('button[type=\"submit\"]') : null;
                    if (btn) { btn.click(); return true; }
                    return false;
                })()
            """)
            await asyncio.sleep(2.5)

            contact_success = await cdp.eval("document.body.innerText.includes('Enquiry Registered Successfully')")
            await cdp.screenshot("contact_submission_success.png")

            t4_pass = fill_contact and submit_contact and contact_success
            results["contact_submission"] = {
                "fill_contact": fill_contact,
                "submit_contact": submit_contact,
                "contact_success": contact_success,
                "status": "PASS" if t4_pass else "FAIL"
            }
            print(f"  Result: {'PASS' if t4_pass else 'FAIL'}")

            # ==========================================
            # TEST 5: GALLERY LIGHTBOX MODAL
            # ==========================================
            print("\n[TEST 5] Gallery Lightbox Modal & Keyboard Navigation...")
            await cdp.navigate("http://localhost:5173/gallery", wait_seconds=2.0)

            open_lightbox = await cdp.eval("""
                (() => {
                    const card = document.querySelector('button[aria-label*=\"Open photo viewer\"]');
                    if (card) { card.click(); return true; }
                    return false;
                })()
            """)
            await asyncio.sleep(0.6)

            lightbox_active = await cdp.eval("""
                (() => {
                    const dlg = document.querySelector('div[role=\"dialog\"][aria-modal=\"true\"]');
                    return dlg !== null;
                })()
            """)
            await cdp.screenshot("gallery_lightbox_modal.png")

            # Navigate next image
            nav_next = await cdp.eval("""
                (() => {
                    const btn = document.querySelector('button[aria-label=\"Next image\"]');
                    if (btn) { btn.click(); return true; }
                    return false;
                })()
            """)
            await asyncio.sleep(0.4)

            # Close lightbox
            close_lightbox = await cdp.eval("""
                (() => {
                    const btn = document.querySelector('button[aria-label=\"Close image viewer\"]');
                    if (btn) { btn.click(); return true; }
                    return false;
                })()
            """)
            await asyncio.sleep(0.5)
            lightbox_closed = await cdp.eval("document.querySelector('div[role=\"dialog\"][aria-modal=\"true\"]') === null")

            t5_pass = open_lightbox and lightbox_active and nav_next and close_lightbox and lightbox_closed
            results["gallery_lightbox"] = {
                "open_lightbox": open_lightbox,
                "lightbox_active": lightbox_active,
                "nav_next": nav_next,
                "close_lightbox": close_lightbox,
                "lightbox_closed": lightbox_closed,
                "status": "PASS" if t5_pass else "FAIL"
            }
            print(f"  Result: {'PASS' if t5_pass else 'FAIL'}")

            # ==========================================
            # TEST 6: ADMIN AUTHENTICATION & DASHBOARD JOURNEY
            # ==========================================
            print("\n[TEST 6] Admin Portal Authentication & Live CMS Triage...")
            await cdp.navigate("http://localhost:5173/admin/login", wait_seconds=1.5)

            # 6A: Test invalid login rejection
            await cdp.eval(f"""
                (() => {{
                    {SET_REACT_VAL_JS}
                    setReactVal('#admin-email', 'unauthorized@anrcas.edu.in');
                    setReactVal('#admin-password', 'WrongPassword!123');
                    document.querySelector('form button[type=\"submit\"]').click();
                }})()
            """)
            await asyncio.sleep(1.5)
            invalid_login_blocked = await cdp.eval("""
                (() => {
                    const text = document.body.innerText;
                    return text.includes('Invalid') || text.includes('Incorrect') || text.includes('failed');
                })()
            """)

            # 6B: Test valid login with actual credentials
            await cdp.eval(f"""
                (() => {{
                    {SET_REACT_VAL_JS}
                    setReactVal('#admin-email', '{ADMIN_EMAIL}');
                    setReactVal('#admin-password', '{ADMIN_PASSWORD}');
                    document.querySelector('form button[type=\"submit\"]').click();
                }})()
            """)
            await asyncio.sleep(2.5)

            cur_path = await cdp.eval("window.location.pathname")
            on_dashboard = cur_path == "/admin"
            has_metrics = await cdp.eval("document.body.innerText.includes('Admissions Enquiries')")
            await cdp.screenshot("admin_dashboard_loaded.png")

            # 6C: Triage Admissions Enquiry
            await cdp.navigate("http://localhost:5173/admin/enquiries", wait_seconds=2.0)
            sees_vignesh_enquiry = await cdp.eval("document.body.innerText.includes('S. Vignesh Kumar')")
            await cdp.screenshot("admin_admissions_triage.png")

            # 6D: Triage Contact Messages
            await cdp.navigate("http://localhost:5173/admin/messages", wait_seconds=2.0)
            sees_anbarasan_message = await cdp.eval("document.body.innerText.includes('R. Anbarasan')")
            await cdp.screenshot("admin_messages_triage.png")

            # 6E: Logout
            logout_clicked = await cdp.eval("""
                (() => {
                    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Sign Out'));
                    if (btn) { btn.click(); return true; }
                    return false;
                })()
            """)
            await asyncio.sleep(1.5)
            final_path = await cdp.eval("window.location.pathname")
            logged_out = final_path == "/admin/login"
            await cdp.screenshot("admin_logout_success.png")

            t6_pass = invalid_login_blocked and on_dashboard and has_metrics and sees_vignesh_enquiry and sees_anbarasan_message and logged_out
            results["admin_portal"] = {
                "invalid_login_blocked": invalid_login_blocked,
                "login_successful": on_dashboard,
                "metrics_rendered": has_metrics,
                "admissions_triage_verified": sees_vignesh_enquiry,
                "messages_triage_verified": sees_anbarasan_message,
                "logout_successful": logged_out,
                "status": "PASS" if t6_pass else "FAIL"
            }
            print(f"  Result: {'PASS' if t6_pass else 'FAIL'}")

            # Save full execution JSON artifact
            summary_file = os.path.join(ARTIFACTS_DIR, "deep_qa_interaction_results.json")
            with open(summary_file, "w", encoding="utf-8") as f:
                json.dump(results, f, indent=2)
            print(f"\nAll interaction tests executed. Output written to: {summary_file}")

    finally:
        proc.terminate()

if __name__ == "__main__":
    asyncio.run(run_deep_qa())
