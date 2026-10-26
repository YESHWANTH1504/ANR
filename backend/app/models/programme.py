import uuid
from datetime import datetime, timezone
from typing import Optional, List, TYPE_CHECKING
from sqlalchemy import String, Text, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

if TYPE_CHECKING:
    from app.models.department import Department
    from app.models.enquiry import AdmissionsEnquiry


class Programme(Base):
    __tablename__ = "programmes"

    id: Mapped[str] = mapped_column(String(50), primary_key=True, default=lambda: f"prog-{uuid.uuid4().hex[:8]}")
    department_id: Mapped[str] = mapped_column(String(50), ForeignKey("departments.id", ondelete="RESTRICT"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    degree: Mapped[str] = mapped_column(String(100), nullable=False)
    level: Mapped[str] = mapped_column(String(20), nullable=False)  # "UG", "PG", "Certificate"
    duration_years: Mapped[int] = mapped_column(Integer, nullable=False, default=3)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    overview: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    admission_info: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    department: Mapped["Department"] = relationship("Department", back_populates="programmes")
    enquiries: Mapped[List["AdmissionsEnquiry"]] = relationship("AdmissionsEnquiry", back_populates="programme")
