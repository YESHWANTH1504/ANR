from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class ProgrammeBase(BaseModel):
    department_id: str
    name: str = Field(..., min_length=2, max_length=150)
    slug: str = Field(..., min_length=2, max_length=100)
    degree: str = Field(..., max_length=100)
    level: str = Field(..., max_length=20)  # UG, PG, Certificate
    duration_years: int = Field(default=3, ge=1, le=6)
    description: str
    overview: Optional[str] = None
    admission_info: Optional[str] = None
    display_order: int = 0
    is_active: bool = True


class ProgrammeCreate(ProgrammeBase):
    id: Optional[str] = None


class ProgrammeUpdate(BaseModel):
    department_id: Optional[str] = None
    name: Optional[str] = None
    slug: Optional[str] = None
    degree: Optional[str] = None
    level: Optional[str] = None
    duration_years: Optional[int] = None
    description: Optional[str] = None
    overview: Optional[str] = None
    admission_info: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None


class ProgrammeOut(ProgrammeBase):
    id: str
    department_name: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
