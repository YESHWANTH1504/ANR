import asyncio
import json
import os
import subprocess
import time
import httpx
import websockets

ROUTES = [
    "/",
    "/about",
    "/leadership",
    "/academics",
    "/departments",
    "/programmes",
    "/programmes/computer-science",
    "/programmes/mathematics",
    "/programmes/bcom",
    "/programmes/corporate-secretaryship",
    "/programmes/bba",
    "/programmes/mcom",
    "/admissions",
    "/admission",
    "/campus-life",
    "/facilities",
    "/placements",
    "/news",
    "/news/nss-special-camp-vadamavandal",
    "/news/inter-departmental-symposium",
    "/news/annual-sports-athletics-meet",
    "/news/social-welfare-awareness-programme",
    "/gallery",
    "/blog",
    "/committees",
    "/contact",
    "/design-system",
    "/non-existent-404-test"
]

async def audit_route(ws, route, width=1920, height=1080):
    msg_id = 1
    async def send(method, params=None):
        nonlocal msg_id
        m = {"id": msg_id, "method": method, "params": params or {}}
        msg_id += 1
        await ws.send(json.dumps(m))
        return m["id"]

    console_errors = []
    network_failures = []

    await send("Page.enable")
    await send("Runtime.enable")
    await send("Log.enable")
    await send("Network.enable")

    await send("Emulation.setDeviceMetricsOverride", {
        "width": width,
        "height": height,
        "deviceScaleFactor": 1,
        "mobile": width < 768
    })

    target_url = f"http://localhost:5173{route}"
    await send("Page.navigate", {"url": target_url})

    start = time.time()
    while time.time() - start < 2.0:
        try:
            raw = await asyncio.wait_for(ws.recv(), timeout=0.2)
            event = json.loads(raw)
            method = event.get("method")
            if method == "Runtime.consoleAPICalled":
                if event["params"]["type"] in ("error", "assert"):
                    args = " ".join([str(a.get("value", a.get("description", ""))) for a in event["params"]["args"]])
                    # Ignore harmless favicon 404 or known extensions
                    if "favicon" not in args:
                        console_errors.append(args)
            elif method == "Log.entryAdded":
                if event["params"]["entry"]["level"] == "error":
                    text = event["params"]["entry"]["text"]
                    if "favicon" not in text:
                        console_errors.append(text)
            elif method == "Network.loadingFailed":
                p = event["params"]
                if not p.get("canceled", False):
                    network_failures.append(f"{p.get('errorText')} (type {p.get('type')})")
        except asyncio.TimeoutError:
            pass

    eval_script = """
    (async () => {
        // Scroll through the page to trigger lazy loading
        window.scrollTo(0, document.body.scrollHeight / 2);
        await new Promise(r => setTimeout(r, 150));
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 200));
        window.scrollTo(0, 0);

        const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim());
        const title = document.title;
        const overflow = document.documentElement.scrollWidth > window.innerWidth;
        const brokenImages = Array.from(document.querySelectorAll('img'))
            .filter(img => img.complete && img.naturalWidth === 0 && !img.src.includes('data:') && !img.src.includes('non-existent'))
            .map(img => img.src);
        const textContent = document.body.innerText.substring(0, 300);
        return {
            title,
            h1Count: h1s.length,
            h1Texts: h1s,
            hasOverflow: overflow,
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
            brokenImages,
            hasRoot: !!document.getElementById('root'),
            textPreview: textContent.replace(/\\s+/g, ' ').trim()
        };
    })()
    """
    eval_id = await send("Runtime.evaluate", {"expression": eval_script, "awaitPromise": True, "returnByValue": True})

    eval_result = {}
    eval_start = time.time()
    while time.time() - eval_start < 5.0:
        try:
            raw = await asyncio.wait_for(ws.recv(), timeout=0.3)
            resp = json.loads(raw)
            if resp.get("id") == eval_id:
                eval_result = resp.get("result", {}).get("result", {}).get("value", {})
                break
        except asyncio.TimeoutError:
            pass

    return {
        "route": route,
        "url": target_url,
        "viewport": f"{width}x{height}",
        "title": eval_result.get("title", ""),
        "h1Count": eval_result.get("h1Count", 0),
        "h1Texts": eval_result.get("h1Texts", []),
        "hasOverflow": eval_result.get("hasOverflow", False),
        "scrollWidth": eval_result.get("scrollWidth", width),
        "brokenImages": eval_result.get("brokenImages", []),
        "consoleErrors": console_errors,
        "networkFailures": network_failures,
        "textPreview": eval_result.get("textPreview", "")[:100]
    }

async def run_audit():
    edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    temp_dir = r"C:\Users\MMIP\AppData\Local\Temp\edge_cdp_audit"
    os.makedirs(temp_dir, exist_ok=True)

    proc = subprocess.Popen([
        edge_exe,
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        f"--user-data-dir={temp_dir}",
        "--remote-debugging-port=9222",
        "http://localhost:5173/"
    ])
    time.sleep(2)

    try:
        res = httpx.get("http://127.0.0.1:9222/json")
        targets = [t for t in res.json() if t.get("type") == "page"]
        if not targets:
            raise RuntimeError("No page target found in Edge CDP session.")
        ws_url = targets[0]["webSocketDebuggerUrl"]

        async with websockets.connect(ws_url, max_size=10_000_000) as ws:
            results = []
            print(f"Beginning Deep Route Audit of {len(ROUTES)} routes at 1920x1080...")

            for r in ROUTES:
                res_item = await audit_route(ws, r, 1920, 1080)
                status_str = "PASS"
                reasons = []
                if res_item["hasOverflow"]:
                    status_str = "FAIL"
                    reasons.append("Horizontal overflow")
                if res_item["brokenImages"]:
                    status_str = "FAIL"
                    reasons.append(f"{len(res_item['brokenImages'])} broken image(s)")
                if res_item["consoleErrors"]:
                    status_str = "FAIL"
                    reasons.append(f"{len(res_item['consoleErrors'])} console error(s)")
                if res_item["networkFailures"]:
                    status_str = "FAIL"
                    reasons.append(f"{len(res_item['networkFailures'])} network failure(s)")

                res_item["status"] = status_str
                res_item["reasons"] = reasons
                results.append(res_item)
                print(f"[{status_str:4}] {r:38} | H1s: {res_item['h1Count']} | Overflow: {res_item['hasOverflow']} | Err: {len(res_item['consoleErrors'])}")

            print("\nBeginning Mobile Viewport Overflow Audit (375x812 & 320x800)...")
            mobile_checks = ["/", "/programmes", "/admissions", "/contact", "/about", "/departments", "/news", "/gallery"]
            mobile_results = []
            for r in mobile_checks:
                for w, h in [(375, 812), (320, 800)]:
                    m_res = await audit_route(ws, r, w, h)
                    status_str = "PASS" if not m_res["hasOverflow"] else "FAIL"
                    m_res["status"] = status_str
                    mobile_results.append(m_res)
                    print(f"[{status_str:4}] {r:20} @ {w}x{h} | Overflow: {m_res['hasOverflow']} | ScrollWidth: {m_res['scrollWidth']} vs Viewport: {w}")

            artifacts_path = os.path.abspath("docs/qa/artifacts/cdp_audit_results.json")
            with open(artifacts_path, "w", encoding="utf-8") as f:
                json.dump({"desktop": results, "mobile": mobile_results}, f, indent=2)
            print(f"\nAudit results successfully saved to: {artifacts_path}")

    finally:
        proc.terminate()

if __name__ == "__main__":
    asyncio.run(run_audit())
