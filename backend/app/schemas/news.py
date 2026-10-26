from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class NewsBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    slug: str = Field(..., min_length=3, max_length=150)
    category: str = Field(default="Notice", max_length=50)  # Event, Camp, Academics, Notice
    summary: str = Field(..., min_length=5)
    content: Optional[str] = None
    image_url: Optional[str] = None
    is_published: bool = True
    publication_date: str = "Recent"


class NewsCreate(NewsBase):
    id: Optional[str] = None


class NewsUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    category: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None
    is_published: Optional[bool] = None
    publication_date: Optional[str] = None


class NewsOut(NewsBase):
    id: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
