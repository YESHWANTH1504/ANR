from datetime import datetime, timezone, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.enquiry import AdmissionsEnquiry
from app.models.programme import Programme
from app.models.admin import Administrator
from app.schemas.enquiry import EnquiryCreate, EnquiryUpdate, EnquiryOut, EnquiryPublicOut
from app.core.rate_limit import check_rate_limit, public_rate_limiter
from app.api.deps import get_current_admin

router = APIRouter()


# -------------------------------------------------------------------------
# Public Submission
# -------------------------------------------------------------------------
@router.post("", response_model=EnquiryPublicOut, status_code=status.HTTP_201_CREATED)
def submit_admissions_enquiry(
    request: Request,
    enquiry_in: EnquiryCreate,
    db: Session = Depends(get_db)
):
    """Public: Submit an online admissions enquiry with duplicate detection and IP rate limiting."""
    check_rate_limit(request, public_rate_limiter)
    
    clean_email = enquiry_in.email.strip().lower()
    clean_name = enquiry_in.applicant_name.strip()
    clean_phone = enquiry_in.phone.strip()
    clean_message = enquiry_in.message.strip()

    # Prevent duplicate rapid submissions within a 5-minute window
    five_mins_ago = datetime.now(timezone.utc) - timedelta(minutes=5)
    existing = db.query(AdmissionsEnquiry).filter(
        AdmissionsEnquiry.email == clean_email,
        AdmissionsEnquiry.applicant_name == clean_name,
        AdmissionsEnquiry.message == clean_message,
        AdmissionsEnquiry.created_at >= five_mins_ago
    ).first()
    if existing:
        return existing

    prog_name = enquiry_in.programme_name
    if enquiry_in.programme_id:
        prog = db.query(Programme).filter(Programme.id == enquiry_in.programme_id).first()
        if prog:
            prog_name = prog.name
            
    enquiry = AdmissionsEnquiry(
        applicant_name=clean_name,
        email=clean_email,
        phone=clean_phone,
        programme_id=enquiry_in.programme_id,
        programme_name=prog_name,
        message=clean_message,
        status="New",
    )
    try:
        db.add(enquiry)
        db.commit()
        db.refresh(enquiry)
    except Exception:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to save admissions enquiry.")
    return enquiry


# -------------------------------------------------------------------------
# Admin Triage
# -------------------------------------------------------------------------
@router.get("/admin/all", response_model=List[EnquiryOut])
def admin_list_enquiries(
    status_filter: Optional[str] = Query(None, alias="status"),
    search: Optional[str] = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Triage admissions enquiries with status filter and search."""
    query = db.query(AdmissionsEnquiry)
    if status_filter:
        query = query.filter(AdmissionsEnquiry.status == status_filter)
    if search:
        s = f"%{search.strip()}%"
        query = query.filter(
            (AdmissionsEnquiry.applicant_name.ilike(s)) |
            (AdmissionsEnquiry.email.ilike(s)) |
            (AdmissionsEnquiry.phone.ilike(s)) |
            (AdmissionsEnquiry.programme_name.ilike(s))
        )
    return query.order_by(AdmissionsEnquiry.created_at.desc()).offset(offset).limit(limit).all()


@router.get("/admin/{id}", response_model=EnquiryOut)
def admin_get_enquiry(
    id: str,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: View a specific admissions enquiry."""
    enquiry = db.query(AdmissionsEnquiry).filter(AdmissionsEnquiry.id == id).first()
    if not enquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enquiry not found")
    return enquiry


@router.patch("/admin/{id}", response_model=EnquiryOut)
def admin_update_enquiry_status(
    id: str,
    update_in: EnquiryUpdate,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Update processing status (New, Contacted, In Progress, Closed) and add internal admin notes."""
    enquiry = db.query(AdmissionsEnquiry).filter(AdmissionsEnquiry.id == id).first()
    if not enquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enquiry not found")
        
    for field, value in update_in.model_dump(exclude_unset=True).items():
        setattr(enquiry, field, value)
        
    db.commit()
    db.refresh(enquiry)
    return enquiry


@router.delete("/admin/{id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_enquiry(
    id: str,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Delete an enquiry record."""
    enquiry = db.query(AdmissionsEnquiry).filter(AdmissionsEnquiry.id == id).first()
    if not enquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enquiry not found")
    db.delete(enquiry)
    db.commit()
    return None
