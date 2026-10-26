import io
from datetime import timedelta
import pytest
from sqlalchemy.dialects import postgresql
from sqlalchemy.schema import CreateTable

from app.core.security import create_access_token
from app.core.config import Settings
from app.models.admin import Administrator
from app.models.department import Department
from app.models.programme import Programme
from app.models.news import NewsArticle
from app.models.gallery import GalleryItem
from app.models.enquiry import AdmissionsEnquiry
from app.models.contact import ContactMessage
from app.models.settings import SiteSetting
from app.db.base import Base


def _get_admin_token(client) -> str:
    login_resp = client.post("/api/v1/admin/auth/login", json={
        "email": "testadmin@anrcas.edu.in",
        "password": "TestPassword123!"
    })
    return login_resp.json()["access_token"]


# -----------------------------------------------------------------------------
# 1. Token & Authentication Tests
# -----------------------------------------------------------------------------
def test_expired_and_invalid_tokens(client):
    """Verify rejection of malformed, tampered, and expired JWT tokens."""
    # Malformed token
    res_malformed = client.get("/api/v1/admin/auth/me", headers={"Authorization": "Bearer malformed.jwt.token"})
    assert res_malformed.status_code == 401

    # Tampered token
    valid_token = _get_admin_token(client)
    tampered_token = valid_token[:-4] + "wxyz"
    res_tampered = client.get("/api/v1/admin/auth/me", headers={"Authorization": f"Bearer {tampered_token}"})
    assert res_tampered.status_code == 401

    # Expired token
    expired_token = create_access_token(subject="test-admin-id", expires_delta=timedelta(seconds=-30))
    res_expired = client.get("/api/v1/admin/auth/me", headers={"Authorization": f"Bearer {expired_token}"})
    assert res_expired.status_code == 401

    # Token with missing subject
    token_no_sub = create_access_token(subject="", expires_delta=timedelta(minutes=10))
    res_no_sub = client.get("/api/v1/admin/auth/me", headers={"Authorization": f"Bearer {token_no_sub}"})
    assert res_no_sub.status_code == 401


def test_inactive_admin_blocked(client, db_session):
    """Verify that an inactive admin account cannot perform operations even with a valid token."""
    inactive_admin = Administrator(
        id="inactive-admin-id",
        name="Inactive Staff",
        email="inactive@anrcas.edu.in",
        password_hash="$2b$12$e80yq9gU16G1sU1Q",
        role="admin",
        is_active=False,
    )
    db_session.add(inactive_admin)
    db_session.commit()

    token = create_access_token(subject=inactive_admin.id)
    res = client.get("/api/v1/admin/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 403
    assert "inactive" in res.json()["detail"].lower()


# -----------------------------------------------------------------------------
# 2. Authorization on Administrator Endpoints
# -----------------------------------------------------------------------------
def test_unauthorized_admin_operations(client):
    """Verify that unauthenticated callers cannot access or modify private admin resources."""
    endpoints = [
        ("GET", "/api/v1/admin/auth/me"),
        ("GET", "/api/v1/admissions-enquiries/admin/all"),
        ("GET", "/api/v1/contact-messages/admin/all"),
        ("GET", "/api/v1/departments/admin/all"),
        ("GET", "/api/v1/programmes/admin/all"),
        ("GET", "/api/v1/news/admin/all"),
        ("GET", "/api/v1/gallery/admin/all"),
        ("GET", "/api/v1/site-settings/admin/all"),
        ("GET", "/api/v1/site-settings/admin/dashboard/stats"),
        ("POST", "/api/v1/departments/admin"),
        ("POST", "/api/v1/programmes/admin"),
        ("POST", "/api/v1/news/admin"),
        ("POST", "/api/v1/gallery/admin"),
        ("POST", "/api/v1/admin/uploads"),
    ]
    for method, path in endpoints:
        if method == "GET":
            res = client.get(path)
        else:
            res = client.post(path, json={})
        assert res.status_code == 401, f"Expected 401 for {method} {path}, got {res.status_code}"


# -----------------------------------------------------------------------------
# 3. Privacy & Public Endpoints
# -----------------------------------------------------------------------------
def test_public_submissions_do_not_expose_admin_notes(client):
    """Ensure public enquiry and contact message responses omit private triage notes."""
    # Admissions enquiry
    enq_resp = client.post("/api/v1/admissions-enquiries", json={
        "applicant_name": "Siddharth Verma",
        "email": "siddharth@example.com",
        "phone": "+91 9840112233",
        "message": "Enquiry regarding curriculum details."
    })
    assert enq_resp.status_code == 201
    enq_data = enq_resp.json()
    assert "admin_notes" not in enq_data
    assert "id" in enq_data

    # Contact message
    cnt_resp = client.post("/api/v1/contact-messages", json={
        "sender_name": "Radhika Murthy",
        "email": "radhika@example.com",
        "subject": "Seminar Registration",
        "message": "Inquiring about upcoming regional conference."
    })
    assert cnt_resp.status_code == 201
    cnt_data = cnt_resp.json()
    assert "admin_notes" not in cnt_data


def test_public_site_settings_whitelist(client):
    """Verify that public site settings endpoint exposes only approved public keys."""
    res = client.get("/api/v1/site-settings")
    assert res.status_code == 200
    data = res.json()
    allowed_keys = {
        "college_name", "short_name", "affiliation", "primary_phone",
        "landline", "email", "address_locality", "address_state",
        "campus_notice", "admissions_active"
    }
    assert set(data.keys()) == allowed_keys


# -----------------------------------------------------------------------------
# 4. Form Validation & Rate Limiting
# -----------------------------------------------------------------------------
def test_form_validation_and_oversized_payloads(client):
    """Test rigorous validation on admissions and contact submissions."""
    # Invalid email format
    bad_email = client.post("/api/v1/admissions-enquiries", json={
        "applicant_name": "Test User",
        "email": "not-an-email",
        "phone": "+91 9840112233",
        "message": "Valid test enquiry message."
    })
    assert bad_email.status_code == 422

    # Invalid phone format
    bad_phone = client.post("/api/v1/admissions-enquiries", json={
        "applicant_name": "Test User",
        "email": "user@example.com",
        "phone": "invalid-phone-abc",
        "message": "Valid test enquiry message."
    })
    assert bad_phone.status_code == 422

    # Oversized message (>2000 characters)
    oversized = client.post("/api/v1/admissions-enquiries", json={
        "applicant_name": "Test User",
        "email": "user@example.com",
        "phone": "+91 9840112233",
        "message": "x" * 2500
    })
    assert oversized.status_code == 422


def test_duplicate_submission_handling(client, db_session):
    """Ensure rapid duplicate form submissions are handled safely without duplicate DB records."""
    payload = {
        "applicant_name": "Deepak Natarajan",
        "email": "deepak.natarajan@example.com",
        "phone": "+91 9840556677",
        "programme_name": "B.Com General",
        "message": "Duplicate submission test enquiry message."
    }
    res1 = client.post("/api/v1/admissions-enquiries", json=payload)
    assert res1.status_code == 201
    id1 = res1.json()["id"]

    # Submit second identical enquiry immediately
    res2 = client.post("/api/v1/admissions-enquiries", json=payload)
    assert res2.status_code in (200, 201)
    id2 = res2.json()["id"]

    # Must return the existing enquiry reference ID
    assert id1 == id2

    # Database count must be exactly 1
    count = db_session.query(AdmissionsEnquiry).filter(AdmissionsEnquiry.email == payload["email"]).count()
    assert count == 1


# -----------------------------------------------------------------------------
# 5. Database & Relationship Integrity
# -----------------------------------------------------------------------------
def test_department_deletion_prevented_when_programmes_exist(client):
    """Verify that deleting a department cannot orphan or cascade-wipe associated programmes."""
    token = _get_admin_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    # Attempt to delete department 'dept-cs' which has programme 'prog-bsc-cs'
    res = client.delete("/api/v1/departments/admin/dept-cs", headers=headers)
    assert res.status_code == 400
    assert "associated programme" in res.json()["detail"].lower()


# -----------------------------------------------------------------------------
# 6. Upload Security & Magic Byte Inspection
# -----------------------------------------------------------------------------
def test_upload_security_and_magic_bytes(client):
    """Verify upload restrictions: authentication, extension check, and magic byte validation."""
    # 1. Unauthenticated upload fails (ensure client session cookies are cleared)
    client.cookies.clear()
    res_unauth = client.post("/api/v1/admin/uploads", files={"file": ("test.png", b"test", "image/png")})
    assert res_unauth.status_code == 401

    token = _get_admin_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Disallowed extension (.exe) fails
    res_exe = client.post(
        "/api/v1/admin/uploads",
        files={"file": ("malware.exe", b"MZ\x90\x00", "application/octet-stream")},
        headers=headers
    )
    assert res_exe.status_code == 400

    # 3. Executable masquerading as PNG (bad magic bytes) fails
    fake_png = b"MZ This is an executable disguised with .png extension"
    res_fake = client.post(
        "/api/v1/admin/uploads",
        files={"file": ("fake_image.png", fake_png, "image/png")},
        headers=headers
    )
    assert res_fake.status_code == 400
    assert "PNG image signature" in res_fake.json()["detail"]

    # 4. Valid PNG image (correct signature) succeeds
    # Standard PNG header: 89 50 4E 47 0D 0A 1A 0A
    valid_png = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4"
    res_valid = client.post(
        "/api/v1/admin/uploads",
        files={"file": ("valid_image.png", valid_png, "image/png")},
        headers=headers
    )
    assert res_valid.status_code == 201
    upload_info = res_valid.json()
    assert upload_info["filename"].endswith(".png")
    assert "/uploads/" in upload_info["url"]

    # 5. Valid JPEG image (FF D8 FF) succeeds
    valid_jpeg = b"\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x01\x00`\x00`\x00\x00\xff\xdb"
    res_jpeg = client.post(
        "/api/v1/admin/uploads",
        files={"file": ("photo.jpg", valid_jpeg, "image/jpeg")},
        headers=headers
    )
    assert res_jpeg.status_code == 201
    assert res_jpeg.json()["filename"].endswith(".jpg")


# -----------------------------------------------------------------------------
# 7. Production Configuration Safeguards
# -----------------------------------------------------------------------------
def test_production_configuration_safeguards():
    """Verify that startup fails safely if insecure production parameters are configured."""
    # Production with DEBUG=True should raise ValueError
    with pytest.raises(ValueError, match="DEBUG must be set to False"):
        s = Settings(
            ENVIRONMENT="production",
            DEBUG=True,
            DATABASE_URL="postgresql://user:pass@localhost:5432/db",
            SECRET_KEY="a" * 32,
            ALLOWED_ORIGINS="https://anrcas.edu.in"
        )
        s.validate_production_safeguards()

    # Production with default/short SECRET_KEY should raise ValueError
    with pytest.raises(ValueError, match="Insecure SECRET_KEY"):
        s = Settings(
            ENVIRONMENT="production",
            DEBUG=False,
            DATABASE_URL="postgresql://user:pass@localhost:5432/db",
            SECRET_KEY="short",
            ALLOWED_ORIGINS="https://anrcas.edu.in"
        )
        s.validate_production_safeguards()

    # Production with SQLite should raise ValueError
    with pytest.raises(ValueError, match="SQLite cannot be used as the production database"):
        s = Settings(
            ENVIRONMENT="production",
            DEBUG=False,
            DATABASE_URL="sqlite:///./anr_dev.db",
            SECRET_KEY="a" * 32,
            ALLOWED_ORIGINS="https://anrcas.edu.in"
        )
        s.validate_production_safeguards()

    # Production with wildcard CORS should raise ValueError
    with pytest.raises(ValueError, match="Wildcard"):
        s = Settings(
            ENVIRONMENT="production",
            DEBUG=False,
            DATABASE_URL="postgresql://user:pass@localhost:5432/db",
            SECRET_KEY="a" * 32,
            ALLOWED_ORIGINS="*"
        )
        s.validate_production_safeguards()


# -----------------------------------------------------------------------------
# 8. PostgreSQL DDL Compilation Test
# -----------------------------------------------------------------------------
def test_postgresql_ddl_compilation():
    """Verify that all SQLAlchemy model tables and constraints compile to valid PostgreSQL DDL."""
    pg_dialect = postgresql.dialect()
    for table in Base.metadata.sorted_tables:
        ddl = CreateTable(table).compile(dialect=pg_dialect)
        ddl_str = str(ddl).strip()
        assert len(ddl_str) > 0
        assert f"CREATE TABLE {table.name}" in ddl_str
