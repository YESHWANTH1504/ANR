from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


class DepartmentBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    slug: str = Field(..., min_length=2, max_length=100)
    code: str = Field(..., min_length=1, max_length=20)
    category: str = Field(..., max_length=50)
    overview: str
    display_order: int = 0
    is_active: bool = True


class DepartmentCreate(DepartmentBase):
    id: Optional[str] = None


class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    code: Optional[str] = None
    category: Optional[str] = None
    overview: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None


class DepartmentOut(DepartmentBase):
    id: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
