import sys
import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.main import app
from app.db.base import Base
from app.db.session import get_db
from app.core.security import get_password_hash
from app.models.admin import Administrator
from app.models.department import Department
from app.models.programme import Programme
from app.models.news import NewsArticle
from app.models.gallery import GalleryItem
from app.models.settings import SiteSetting

# In-memory SQLite database isolated for tests
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///:memory:"

test_engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(scope="function")
def db_session():
    Base.metadata.create_all(bind=test_engine)
    session = TestingSessionLocal()
    
    # Seed initial test admin
    admin = Administrator(
        id="test-admin-id",
        name="Test Administrator",
        email="testadmin@anrcas.edu.in",
        password_hash=get_password_hash("TestPassword123!"),
        role="superadmin",
        is_active=True,
    )
    session.add(admin)

    # Seed sample department & programme
    dept = Department(
        id="dept-cs",
        name="Department of Computer Science",
        slug="computer-science",
        code="CS",
        category="Science",
        overview="Computer science department overview.",
        display_order=1,
        is_active=True,
    )
    session.add(dept)

    prog = Programme(
        id="prog-bsc-cs",
        department_id="dept-cs",
        name="B.Sc Computer Science",
        slug="computer-science",
        degree="Bachelor of Science (B.Sc)",
        level="UG",
        duration_years=3,
        description="Undergraduate computing education.",
        display_order=1,
        is_active=True,
    )
    session.add(prog)

    # Seed published and draft news
    pub_news = NewsArticle(
        id="news-published",
        title="Published Campus Notice",
        slug="published-campus-notice",
        category="Notice",
        summary="This is a published news summary.",
        is_published=True,
    )
    draft_news = NewsArticle(
        id="news-draft",
        title="Draft Internal News",
        slug="draft-internal-news",
        category="Notice",
        summary="This is a draft notice.",
        is_published=False,
    )
    session.add(pub_news)
    session.add(draft_news)

    # Seed site settings
    setting = SiteSetting(
        key="college_name",
        value="A.N. Radhakrishnan College of Arts & Science",
        is_public=True,
    )
    session.add(setting)

    session.commit()
    yield session

    session.close()
    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture(scope="function")
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
