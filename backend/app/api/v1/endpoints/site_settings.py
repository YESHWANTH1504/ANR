from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.session import get_db
from app.models.settings import SiteSetting
from app.models.enquiry import AdmissionsEnquiry
from app.models.contact import ContactMessage
from app.models.programme import Programme
from app.models.department import Department
from app.models.news import NewsArticle
from app.models.gallery import GalleryItem
from app.models.admin import Administrator
from app.schemas.settings import SettingOut, SettingUpdate, PublicSettingsOut
from app.schemas.stats import DashboardStats
from app.api.deps import get_current_admin

router = APIRouter()


# -------------------------------------------------------------------------
# Public Endpoints
# -------------------------------------------------------------------------
@router.get("", response_model=PublicSettingsOut)
def get_public_site_settings(db: Session = Depends(get_db)):
    """Retrieve verified approved public institutional information."""
    settings_rows = db.query(SiteSetting).filter(SiteSetting.is_public == True).all()
    s_map = {row.key: row.value for row in settings_rows}

    return PublicSettingsOut(
        college_name=s_map.get("college_name", "A.N. Radhakrishnan College of Arts & Science"),
        short_name=s_map.get("short_name", "ANRCAS"),
        affiliation=s_map.get("affiliation", "Affiliated to Thiruvalluvar University, Vellore"),
        primary_phone=s_map.get("primary_phone", "+91 8939804020"),
        landline=s_map.get("landline", "04182-247518"),
        email=s_map.get("email", "admin@anrcas.edu.in"),
        address_locality=s_map.get("address_locality", "Vadamavandal"),
        address_state=s_map.get("address_state", "Tamil Nadu"),
        campus_notice=s_map.get("campus_notice", "ADMISSIONS 2026–2027: Application portals active for UG & PG Degree Programmes."),
        admissions_active=s_map.get("admissions_active", "true").lower() in ("true", "1", "yes"),
    )


# -------------------------------------------------------------------------
# Admin Endpoints
# -------------------------------------------------------------------------
@router.get("/admin/all", response_model=List[SettingOut])
def admin_list_settings(
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: List all system configuration parameters."""
    return db.query(SiteSetting).order_by(SiteSetting.key.asc()).all()


@router.get("/admin/dashboard/stats", response_model=DashboardStats)
def admin_get_dashboard_stats(
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Overview counts for management dashboard."""
    total_enquiries = db.query(func.count(AdmissionsEnquiry.id)).scalar() or 0
    new_enquiries = db.query(func.count(AdmissionsEnquiry.id)).filter(AdmissionsEnquiry.status == "New").scalar() or 0
    
    total_messages = db.query(func.count(ContactMessage.id)).scalar() or 0
    new_messages = db.query(func.count(ContactMessage.id)).filter(ContactMessage.status == "New").scalar() or 0
    
    total_programmes = db.query(func.count(Programme.id)).scalar() or 0
    active_programmes = db.query(func.count(Programme.id)).filter(Programme.is_active == True).scalar() or 0
    
    total_departments = db.query(func.count(Department.id)).scalar() or 0
    
    total_news = db.query(func.count(NewsArticle.id)).scalar() or 0
    published_news = db.query(func.count(NewsArticle.id)).filter(NewsArticle.is_published == True).scalar() or 0
    
    total_gallery = db.query(func.count(GalleryItem.id)).scalar() or 0

    return DashboardStats(
        total_enquiries=total_enquiries,
        new_enquiries=new_enquiries,
        total_messages=total_messages,
        new_messages=new_messages,
        total_programmes=total_programmes,
        active_programmes=active_programmes,
        total_departments=total_departments,
        total_news=total_news,
        published_news=published_news,
        total_gallery_items=total_gallery,
    )


@router.put("/admin/{key}", response_model=SettingOut)
def admin_update_setting(
    key: str,
    setting_in: SettingUpdate,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Update an approved website setting."""
    setting = db.query(SiteSetting).filter(SiteSetting.key == key).first()
    if not setting:
        setting = SiteSetting(
            key=key,
            value=setting_in.value,
            description=setting_in.description,
            is_public=setting_in.is_public if setting_in.is_public is not None else True
        )
        db.add(setting)
    else:
        setting.value = setting_in.value
        if setting_in.description is not None:
            setting.description = setting_in.description
        if setting_in.is_public is not None:
            setting.is_public = setting_in.is_public
            
    db.commit()
    db.refresh(setting)
    return setting
