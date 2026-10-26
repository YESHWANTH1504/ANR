from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.department import Department
from app.models.programme import Programme
from app.models.admin import Administrator
from app.schemas.department import DepartmentCreate, DepartmentUpdate, DepartmentOut
from app.api.deps import get_current_admin

router = APIRouter()


# -------------------------------------------------------------------------
# Public Endpoints
# -------------------------------------------------------------------------
@router.get("", response_model=List[DepartmentOut])
def get_public_departments(
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Retrieve published active academic departments."""
    query = db.query(Department).filter(Department.is_active == True)
    if category:
        query = query.filter(Department.category == category)
    return query.order_by(Department.display_order.asc(), Department.name.asc()).all()


@router.get("/{slug}", response_model=DepartmentOut)
def get_department_by_slug(slug: str, db: Session = Depends(get_db)):
    """Retrieve an active department by its URL slug."""
    dept = db.query(Department).filter(
        Department.slug == slug,
        Department.is_active == True
    ).first()
    if not dept:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Department not found")
    return dept


# -------------------------------------------------------------------------
# Admin Endpoints
# -------------------------------------------------------------------------
@router.get("/admin/all", response_model=List[DepartmentOut])
def admin_list_departments(
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: List all departments including inactive ones."""
    return db.query(Department).order_by(Department.display_order.asc(), Department.name.asc()).all()


@router.post("/admin", response_model=DepartmentOut, status_code=status.HTTP_201_CREATED)
def admin_create_department(
    dept_in: DepartmentCreate,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Create a new academic department."""
    existing = db.query(Department).filter(Department.slug == dept_in.slug).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A department with this slug already exists"
        )
    dept_data = dept_in.model_dump()
    if not dept_data.get("id"):
        dept_data.pop("id", None)
    dept = Department(**dept_data)
    db.add(dept)
    db.commit()
    db.refresh(dept)
    return dept


@router.put("/admin/{id}", response_model=DepartmentOut)
def admin_update_department(
    id: str,
    dept_in: DepartmentUpdate,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Update an existing department."""
    dept = db.query(Department).filter(Department.id == id).first()
    if not dept:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Department not found")
    
    update_data = dept_in.model_dump(exclude_unset=True)
    if "slug" in update_data and update_data["slug"] != dept.slug:
        existing = db.query(Department).filter(Department.slug == update_data["slug"]).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug already in use")
            
    for field, value in update_data.items():
        setattr(dept, field, value)
        
    db.commit()
    db.refresh(dept)
    return dept


@router.delete("/admin/{id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_department(
    id: str,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Delete a department, preventing deletion if programmes are associated."""
    dept = db.query(Department).filter(Department.id == id).first()
    if not dept:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Department not found")

    prog_count = db.query(Programme).filter(Programme.department_id == id).count()
    if prog_count > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot delete department '{dept.name}' because it contains {prog_count} associated programme(s). Please reassign or delete programmes first."
        )

    try:
        db.delete(dept)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to delete department.")
    return None
