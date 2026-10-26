from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field


class SettingUpdate(BaseModel):
    value: str
    description: Optional[str] = None
    is_public: Optional[bool] = None


class SettingOut(BaseModel):
    id: int
    key: str
    value: str
    is_public: bool
    description: Optional[str] = None
    updated_at: datetime

    model_config = {"from_attributes": True}


class PublicSettingsOut(BaseModel):
    college_name: str
    short_name: str
    affiliation: str
    primary_phone: str
    landline: str
    email: str
    address_locality: str
    address_state: str
    campus_notice: str
    admissions_active: bool
