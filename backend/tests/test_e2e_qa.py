"""End-to-End Release Readiness & QA Regression Suite.
Validates newly connected public flows, admin lifecycles, and integrity boundaries.
"""
import pytest
from app.models.programme import Programme
from app.models.department import Department
from app.models.news import NewsArticle
from app.models.gallery import GalleryItem


def _get_admin_token(client) -> str:
    login_resp = client.post("/api/v1/admin/auth/login", json={
        "email": "testadmin@anrcas.edu.in",
        "password": "TestPassword123!"
    })
    return login_resp.json()["access_token"]


def test_public_programme_filtering(client):
    """Verify level and department_id filtering on public programmes endpoint."""
    res_ug = client.get("/api/v1/programmes?level=UG")
    assert res_ug.status_code == 200
    progs = res_ug.json()
    assert len(progs) >= 1
    assert all(p["level"] == "UG" for p in progs)

    # Filter for non-existent level returns empty list
    res_empty = client.get("/api/v1/programmes?level=Certificate")
    assert res_empty.status_code == 200
    assert len(res_empty.json()) == 0


def test_public_gallery_category_and_featured_filtering(client, db_session):
    """Verify category and featured_only filtering on public gallery items."""
    item1 = GalleryItem(
        id="gal-featured-1",
        title="Featured Campus Arch",
        category="Campus Grounds",
        image_url="/assets/campus_main.webp",
        alt_text="Campus Entrance",
        caption="Main archway",
        is_featured=True,
        display_order=1,
        is_published=True,
    )
    item2 = GalleryItem(
        id="gal-regular-2",
        title="Classroom Lecture",
        category="Academic Life",
        image_url="/assets/gallery_seminar.webp",
        alt_text="Classroom Seminar",
        caption="Lecture discussion",
        is_featured=False,
        display_order=2,
        is_published=True,
    )
    db_session.add(item1)
    db_session.add(item2)
    db_session.commit()

    # Query featured only
    res_feat = client.get("/api/v1/gallery?featured_only=true")
    assert res_feat.status_code == 200
    feat_items = res_feat.json()
    assert any(g["id"] == "gal-featured-1" for g in feat_items)
    assert not any(g["id"] == "gal-regular-2" for g in feat_items)

    # Query category filter
    res_cat = client.get("/api/v1/gallery?category=Campus%20Grounds")
    assert res_cat.status_code == 200
    cat_items = res_cat.json()
    assert all(g["category"] == "Campus Grounds" for g in cat_items)


def test_programme_lifecycle_and_public_visibility(client, db_session):
    """Verify admin deactivation hides programme from public directory immediately."""
    token = _get_admin_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    # Verify active programme visible
    res_pub1 = client.get("/api/v1/programmes/computer-science")
    assert res_pub1.status_code == 200
    assert res_pub1.json()["name"] == "B.Sc Computer Science"

    # Admin deactivates the programme (is_active = False)
    res_patch = client.put("/api/v1/programmes/admin/prog-bsc-cs", json={
        "is_active": False
    }, headers=headers)
    assert res_patch.status_code == 200

    # Public endpoint should now return 404
    res_pub2 = client.get("/api/v1/programmes/computer-science")
    assert res_pub2.status_code == 404

    # Reactivate programme
    res_restore = client.put("/api/v1/programmes/admin/prog-bsc-cs", json={
        "is_active": True
    }, headers=headers)
    assert res_restore.status_code == 200
    assert client.get("/api/v1/programmes/computer-science").status_code == 200


def test_news_unpublish_lifecycle(client):
    """Verify publishing then unpublishing an article toggles public visibility."""
    token = _get_admin_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    # Initially draft article is private
    res1 = client.get("/api/v1/news/draft-internal-news")
    assert res1.status_code == 404

    # Admin publishes it
    res_pub = client.put("/api/v1/news/admin/news-draft", json={"is_published": True}, headers=headers)
    assert res_pub.status_code == 200

    # Public route now succeeds
    res2 = client.get("/api/v1/news/draft-internal-news")
    assert res2.status_code == 200

    # Admin unpublishes it back to draft
    res_unpub = client.put("/api/v1/news/admin/news-draft", json={"is_published": False}, headers=headers)
    assert res_unpub.status_code == 200

    # Public route returns 404 again
    res3 = client.get("/api/v1/news/draft-internal-news")
    assert res3.status_code == 404


def test_admin_dashboard_stats_calculation(client, db_session):
    """Verify statistical aggregation across live models."""
    token = _get_admin_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    res = client.get("/api/v1/site-settings/admin/dashboard/stats", headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["total_programmes"] == 1
    assert data["active_programmes"] == 1
    assert data["total_departments"] == 1
    assert data["total_news"] == 2
    assert data["published_news"] == 1  # 1 published, 1 draft


def test_admin_profile_does_not_leak_password_hash(client):
    """Verify administrator profile serialization excludes password_hash."""
    token = _get_admin_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    res = client.get("/api/v1/admin/auth/me", headers=headers)
    assert res.status_code == 200
    profile = res.json()
    assert "email" in profile
    assert "role" in profile
    assert "password_hash" not in profile
    assert "password" not in profile

