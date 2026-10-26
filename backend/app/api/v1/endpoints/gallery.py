from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.gallery import GalleryItem
from app.models.admin import Administrator
from app.schemas.gallery import GalleryCreate, GalleryUpdate, GalleryOut
from app.api.deps import get_current_admin

router = APIRouter()


# -------------------------------------------------------------------------
# Public Endpoints
# -------------------------------------------------------------------------
@router.get("", response_model=List[GalleryOut])
def get_public_gallery(
    category: Optional[str] = None,
    featured_only: bool = False,
    db: Session = Depends(get_db)
):
    """Retrieve published campus life and facility gallery photos."""
    query = db.query(GalleryItem).filter(GalleryItem.is_published == True)
    if category:
        query = query.filter(GalleryItem.category == category)
    if featured_only:
        query = query.filter(GalleryItem.is_featured == True)
    return query.order_by(GalleryItem.display_order.asc(), GalleryItem.created_at.desc()).all()


# -------------------------------------------------------------------------
# Admin Endpoints
# -------------------------------------------------------------------------
@router.get("/admin/all", response_model=List[GalleryOut])
def admin_list_gallery(
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: List all gallery items."""
    return db.query(GalleryItem).order_by(GalleryItem.display_order.asc(), GalleryItem.created_at.desc()).all()


@router.post("/admin", response_model=GalleryOut, status_code=status.HTTP_201_CREATED)
def admin_create_gallery_item(
    item_in: GalleryCreate,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Add an item to the gallery."""
    item_data = item_in.model_dump()
    if not item_data.get("id"):
        item_data.pop("id", None)
    item = GalleryItem(**item_data)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/admin/{id}", response_model=GalleryOut)
def admin_update_gallery_item(
    id: str,
    item_in: GalleryUpdate,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Update a gallery item."""
    item = db.query(GalleryItem).filter(GalleryItem.id == id).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery item not found")
        
    for field, value in item_in.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
        
    db.commit()
    db.refresh(item)
    return item


@router.delete("/admin/{id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_gallery_item(
    id: str,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Delete a gallery item."""
    item = db.query(GalleryItem).filter(GalleryItem.id == id).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery item not found")
    db.delete(item)
    db.commit()
    return None
