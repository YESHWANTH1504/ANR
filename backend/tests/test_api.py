import pytest


def test_health_check(client):
    """Test health endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data


def test_public_departments(client):
    """Test retrieving public departments."""
    response = client.get("/api/v1/departments")
    assert response.status_code == 200
    depts = response.json()
    assert len(depts) >= 1
    assert depts[0]["slug"] == "computer-science"


def test_public_programmes(client):
    """Test retrieving public programmes."""
    response = client.get("/api/v1/programmes")
    assert response.status_code == 200
    progs = response.json()
    assert len(progs) >= 1
    assert progs[0]["slug"] == "computer-science"
    assert progs[0]["department_name"] == "Department of Computer Science"


def test_draft_versus_published_news(client):
    """Test that public news endpoint returns only published articles."""
    response = client.get("/api/v1/news")
    assert response.status_code == 200
    articles = response.json()
    slugs = [a["slug"] for a in articles]
    assert "published-campus-notice" in slugs
    assert "draft-internal-news" not in slugs


def test_submit_admissions_enquiry(client):
    """Test public submission of admissions enquiry."""
    payload = {
        "applicant_name": "Karthik Subramanian",
        "email": "karthik.sub@example.com",
        "phone": "+91 9840123456",
        "programme_name": "B.Sc Computer Science",
        "message": "Interested in enrolling for the 2026 academic intake."
    }
    response = client.post("/api/v1/admissions-enquiries", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["applicant_name"] == "Karthik Subramanian"
    assert data["status"] == "New"
    assert "id" in data


def test_submit_contact_message(client):
    """Test public submission of contact form message."""
    payload = {
        "sender_name": "Meena Sundaram",
        "email": "meena.s@example.com",
        "phone": "+91 9840998877",
        "subject": "Campus Visit Query",
        "message": "Could you provide information regarding public transport access to Vadamavandal campus?"
    }
    response = client.post("/api/v1/contact-messages", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["sender_name"] == "Meena Sundaram"
    assert data["status"] == "New"


def test_admin_authentication_and_unauthorized_access(client):
    """Test login with valid/invalid credentials and protection of admin endpoints."""
    # 1. Unauthenticated request should fail with 401
    unauth_resp = client.get("/api/v1/admin/auth/me")
    assert unauth_resp.status_code == 401

    # 2. Login with wrong password should fail
    bad_login = client.post("/api/v1/admin/auth/login", json={
        "email": "testadmin@anrcas.edu.in",
        "password": "WrongPassword999!"
    })
    assert bad_login.status_code == 401

    # 3. Login with correct credentials should succeed
    login_resp = client.post("/api/v1/admin/auth/login", json={
        "email": "testadmin@anrcas.edu.in",
        "password": "TestPassword123!"
    })
    assert login_resp.status_code == 200
    token_data = login_resp.json()
    assert "access_token" in token_data
    token = token_data["access_token"]

    headers = {"Authorization": f"Bearer {token}"}

    # 4. Authenticated request to /me
    me_resp = client.get("/api/v1/admin/auth/me", headers=headers)
    assert me_resp.status_code == 200
    assert me_resp.json()["email"] == "testadmin@anrcas.edu.in"

    # 5. Access protected admin stats
    stats_resp = client.get("/api/v1/site-settings/admin/dashboard/stats", headers=headers)
    assert stats_resp.status_code == 200
    stats = stats_resp.json()
    assert "total_programmes" in stats


def test_admin_crud_and_triage(client):
    """Test admin CRUD and enquiry triage."""
    # Login to get token
    login_resp = client.post("/api/v1/admin/auth/login", json={
        "email": "testadmin@anrcas.edu.in",
        "password": "TestPassword123!"
    })
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Submit an enquiry
    enq_resp = client.post("/api/v1/admissions-enquiries", json={
        "applicant_name": "Ananya Raman",
        "email": "ananya@example.com",
        "phone": "+91 9789012345",
        "message": "Enquiry for admission test."
    })
    enq_id = enq_resp.json()["id"]

    # 2. Admin retrieves enquiry
    get_resp = client.get(f"/api/v1/admissions-enquiries/admin/{enq_id}", headers=headers)
    assert get_resp.status_code == 200
    assert get_resp.json()["status"] == "New"

    # 3. Admin triages enquiry (change status & add internal note)
    patch_resp = client.patch(f"/api/v1/admissions-enquiries/admin/{enq_id}", json={
        "status": "Contacted",
        "admin_notes": "Called applicant on 15 Oct. Sent prospectus via email."
    }, headers=headers)
    assert patch_resp.status_code == 200
    assert patch_resp.json()["status"] == "Contacted"
    assert "Sent prospectus" in patch_resp.json()["admin_notes"]

    # 4. Admin creates a new department
    create_dept = client.post("/api/v1/departments/admin", json={
        "name": "Department of Physics",
        "slug": "physics",
        "code": "PHY",
        "category": "Science",
        "overview": "Experimental and theoretical physics instruction.",
        "display_order": 7,
        "is_active": True
    }, headers=headers)
    assert create_dept.status_code == 201
    dept_id = create_dept.json()["id"]

    # 5. Admin updates the department
    update_dept = client.put(f"/api/v1/departments/admin/{dept_id}", json={
        "overview": "Updated overview description."
    }, headers=headers)
    assert update_dept.status_code == 200
    assert update_dept.json()["overview"] == "Updated overview description."

    # 6. Admin deletes the department
    del_dept = client.delete(f"/api/v1/departments/admin/{dept_id}", headers=headers)
    assert del_dept.status_code == 204
