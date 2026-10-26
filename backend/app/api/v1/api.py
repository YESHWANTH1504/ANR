from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth,
    departments,
    programmes,
    news,
    gallery,
    enquiries,
    contact,
    site_settings,
    uploads,
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/admin/auth", tags=["Admin Auth"])
api_router.include_router(departments.router, prefix="/departments", tags=["Departments"])
api_router.include_router(programmes.router, prefix="/programmes", tags=["Programmes"])
api_router.include_router(news.router, prefix="/news", tags=["News & Events"])
api_router.include_router(gallery.router, prefix="/gallery", tags=["Gallery"])
api_router.include_router(enquiries.router, prefix="/admissions-enquiries", tags=["Admissions Enquiries"])
api_router.include_router(contact.router, prefix="/contact-messages", tags=["Contact Messages"])
api_router.include_router(site_settings.router, prefix="/site-settings", tags=["Site Settings"])
api_router.include_router(uploads.router, prefix="/admin/uploads", tags=["Uploads"])
