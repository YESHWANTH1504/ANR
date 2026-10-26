from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class GalleryBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=200)
    category: str = Field(..., max_length=100)
    image_url: str = Field(..., max_length=500)
    alt_text: str = Field(..., max_length=255)
    caption: str
    is_featured: bool = False
    display_order: int = 0
    is_published: bool = True


class GalleryCreate(GalleryBase):
    id: Optional[str] = None


class GalleryUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    alt_text: Optional[str] = None
    caption: Optional[str] = None
    is_featured: Optional[bool] = None
    display_order: Optional[int] = None
    is_published: Optional[bool] = None


class GalleryOut(GalleryBase):
    id: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
