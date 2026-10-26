from datetime import datetime, timezone, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.contact import ContactMessage
from app.models.admin import Administrator
from app.schemas.contact import ContactCreate, ContactUpdate, ContactOut, ContactPublicOut
from app.core.rate_limit import check_rate_limit, public_rate_limiter
from app.api.deps import get_current_admin

router = APIRouter()


# -------------------------------------------------------------------------
# Public Submission
# -------------------------------------------------------------------------
@router.post("", response_model=ContactPublicOut, status_code=status.HTTP_201_CREATED)
def submit_contact_message(
    request: Request,
    message_in: ContactCreate,
    db: Session = Depends(get_db)
):
    """Public: Submit an institutional contact enquiry message with duplicate detection and rate limiting."""
    check_rate_limit(request, public_rate_limiter)
    
    clean_email = message_in.email.strip().lower()
    clean_name = message_in.sender_name.strip()
    clean_subject = message_in.subject.strip()
    clean_message = message_in.message.strip()
    clean_phone = message_in.phone.strip() if message_in.phone else None

    # Check for duplicate submission within recent 5-minute window
    five_mins_ago = datetime.now(timezone.utc) - timedelta(minutes=5)
    existing = db.query(ContactMessage).filter(
        ContactMessage.email == clean_email,
        ContactMessage.subject == clean_subject,
        ContactMessage.message == clean_message,
        ContactMessage.created_at >= five_mins_ago
    ).first()
    if existing:
        return existing

    msg = ContactMessage(
        sender_name=clean_name,
        email=clean_email,
        phone=clean_phone,
        subject=clean_subject,
        message=clean_message,
        status="New",
    )
    try:
        db.add(msg)
        db.commit()
        db.refresh(msg)
    except Exception:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to submit contact message.")
    return msg


# -------------------------------------------------------------------------
# Admin Triage
# -------------------------------------------------------------------------
@router.get("/admin/all", response_model=List[ContactOut])
def admin_list_messages(
    status_filter: Optional[str] = Query(None, alias="status"),
    search: Optional[str] = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Triage contact messages with status filter and keyword search."""
    query = db.query(ContactMessage)
    if status_filter:
        query = query.filter(ContactMessage.status == status_filter)
    if search:
        s = f"%{search.strip()}%"
        query = query.filter(
            (ContactMessage.sender_name.ilike(s)) |
            (ContactMessage.email.ilike(s)) |
            (ContactMessage.subject.ilike(s)) |
            (ContactMessage.message.ilike(s))
        )
    return query.order_by(ContactMessage.created_at.desc()).offset(offset).limit(limit).all()


@router.get("/admin/{id}", response_model=ContactOut)
def admin_get_message(
    id: str,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: View a specific contact message."""
    msg = db.query(ContactMessage).filter(ContactMessage.id == id).first()
    if not msg:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    return msg


@router.patch("/admin/{id}", response_model=ContactOut)
def admin_update_message_status(
    id: str,
    update_in: ContactUpdate,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Update contact processing status (New, Read, Replied, Archived) and internal notes."""
    msg = db.query(ContactMessage).filter(ContactMessage.id == id).first()
    if not msg:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
        
    for field, value in update_in.model_dump(exclude_unset=True).items():
        setattr(msg, field, value)
        
    db.commit()
    db.refresh(msg)
    return msg


@router.delete("/admin/{id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_message(
    id: str,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Delete a message."""
    msg = db.query(ContactMessage).filter(ContactMessage.id == id).first()
    if not msg:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    db.delete(msg)
    db.commit()
    return None
