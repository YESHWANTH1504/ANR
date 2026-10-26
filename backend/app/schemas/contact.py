import re
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactCreate(BaseModel):
    sender_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=25)
    subject: str = Field(..., min_length=2, max_length=200)
    message: str = Field(..., min_length=5, max_length=3000)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        cleaned = v.strip()
        if not cleaned:
            return None
        if not re.match(r"^\+?[0-9\s\-()]{7,25}$", cleaned):
            raise ValueError("Phone number must contain between 7 and 25 valid digits and formatting characters (+, -, ()).")
        digits = re.sub(r"\D", "", cleaned)
        if len(digits) < 7 or len(digits) > 15:
            raise ValueError("Phone number must contain between 7 and 15 digits.")
        return cleaned


class ContactUpdate(BaseModel):
    status: Optional[str] = Field(None, pattern="^(New|Read|Replied|Archived)$")
    admin_notes: Optional[str] = None


class ContactPublicOut(BaseModel):
    id: str
    sender_name: str
    email: EmailStr
    subject: str
    status: str
    created_at: datetime
    message: str = "Contact message received successfully."

    model_config = {"from_attributes": True}


class ContactOut(BaseModel):
    id: str
    sender_name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    status: str
    admin_notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
