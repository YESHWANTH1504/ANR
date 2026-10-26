import re
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator


class EnquiryCreate(BaseModel):
    applicant_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=7, max_length=25)
    programme_id: Optional[str] = None
    programme_name: Optional[str] = None
    message: str = Field(..., min_length=5, max_length=2000)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = v.strip()
        if not re.match(r"^\+?[0-9\s\-()]{7,25}$", cleaned):
            raise ValueError("Phone number must contain between 7 and 25 valid digits and formatting characters (+, -, ()).")
        digits = re.sub(r"\D", "", cleaned)
        if len(digits) < 7 or len(digits) > 15:
            raise ValueError("Phone number must contain between 7 and 15 digits.")
        return cleaned


class EnquiryUpdate(BaseModel):
    status: Optional[str] = Field(None, pattern="^(New|Contacted|In Progress|Closed)$")
    admin_notes: Optional[str] = None


class EnquiryPublicOut(BaseModel):
    id: str
    applicant_name: str
    email: EmailStr
    programme_id: Optional[str] = None
    programme_name: Optional[str] = None
    status: str
    created_at: datetime
    message: str = "Admissions enquiry received successfully."

    model_config = {"from_attributes": True}


class EnquiryOut(BaseModel):
    id: str
    applicant_name: str
    email: EmailStr
    phone: str
    programme_id: Optional[str] = None
    programme_name: Optional[str] = None
    message: str
    status: str
    admin_notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
