from app.db.base import Base
from app.models.admin import Administrator
from app.models.department import Department
from app.models.programme import Programme
from app.models.enquiry import AdmissionsEnquiry
from app.models.contact import ContactMessage
from app.models.news import NewsArticle
from app.models.gallery import GalleryItem
from app.models.settings import SiteSetting

__all__ = [
    "Base",
    "Administrator",
    "Department",
    "Programme",
    "AdmissionsEnquiry",
    "ContactMessage",
    "NewsArticle",
    "GalleryItem",
    "SiteSetting",
]
