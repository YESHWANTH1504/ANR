from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.programme import Programme
from app.models.department import Department
from app.models.admin import Administrator
from app.schemas.programme import ProgrammeCreate, ProgrammeUpdate, ProgrammeOut
from app.api.deps import get_current_admin

router = APIRouter()


def _populate_dept_name(prog: Programme) -> dict:
    data = {
        "id": prog.id,
        "department_id": prog.department_id,
        "name": prog.name,
        "slug": prog.slug,
        "degree": prog.degree,
        "level": prog.level,
        "duration_years": prog.duration_years,
        "description": prog.description,
        "overview": prog.overview,
        "admission_info": prog.admission_info,
        "display_order": prog.display_order,
        "is_active": prog.is_active,
        "department_name": prog.department.name if prog.department else None,
        "created_at": prog.created_at,
        "updated_at": prog.updated_at,
    }
    return data


# -------------------------------------------------------------------------
# Public Endpoints
# -------------------------------------------------------------------------
@router.get("", response_model=List[ProgrammeOut])
def get_public_programmes(
    level: Optional[str] = Query(None, description="UG, PG, or Certificate"),
    department_id: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Retrieve published active academic programmes."""
    query = db.query(Programme).filter(Programme.is_active == True)
    if level:
        query = query.filter(Programme.level == level)
    if department_id:
        query = query.filter(Programme.department_id == department_id)
        
    progs = query.order_by(Programme.display_order.asc(), Programme.name.asc()).all()
    return [_populate_dept_name(p) for p in progs]


@router.get("/{slug_or_id}", response_model=ProgrammeOut)
def get_programme_by_slug_or_id(slug_or_id: str, db: Session = Depends(get_db)):
    """Retrieve an active programme by slug or ID."""
    prog = db.query(Programme).filter(
        (Programme.slug == slug_or_id) | (Programme.id == slug_or_id),
        Programme.is_active == True
    ).first()
    if not prog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Programme not found")
    return _populate_dept_name(prog)


# -------------------------------------------------------------------------
# Admin Endpoints
# -------------------------------------------------------------------------
@router.get("/admin/all", response_model=List[ProgrammeOut])
def admin_list_programmes(
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: List all programmes."""
    progs = db.query(Programme).order_by(Programme.display_order.asc(), Programme.name.asc()).all()
    return [_populate_dept_name(p) for p in progs]


@router.post("/admin", response_model=ProgrammeOut, status_code=status.HTTP_201_CREATED)
def admin_create_programme(
    prog_in: ProgrammeCreate,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Create an academic programme."""
    dept = db.query(Department).filter(Department.id == prog_in.department_id).first()
    if not dept:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Referenced department does not exist")
        
    existing = db.query(Programme).filter(Programme.slug == prog_in.slug).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A programme with this slug already exists")
        
    prog_data = prog_in.model_dump()
    if not prog_data.get("id"):
        prog_data.pop("id", None)
    prog = Programme(**prog_data)
    db.add(prog)
    db.commit()
    db.refresh(prog)
    return _populate_dept_name(prog)


@router.put("/admin/{id}", response_model=ProgrammeOut)
def admin_update_programme(
    id: str,
    prog_in: ProgrammeUpdate,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Update a programme."""
    prog = db.query(Programme).filter(Programme.id == id).first()
    if not prog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Programme not found")
        
    update_data = prog_in.model_dump(exclude_unset=True)
    if "department_id" in update_data:
        dept = db.query(Department).filter(Department.id == update_data["department_id"]).first()
        if not dept:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Referenced department does not exist")
            
    if "slug" in update_data and update_data["slug"] != prog.slug:
        existing = db.query(Programme).filter(Programme.slug == update_data["slug"]).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug already in use")
            
    for field, value in update_data.items():
        setattr(prog, field, value)
        
    db.commit()
    db.refresh(prog)
    return _populate_dept_name(prog)


@router.delete("/admin/{id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_programme(
    id: str,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Delete a programme."""
    prog = db.query(Programme).filter(Programme.id == id).first()
    if not prog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Programme not found")
    db.delete(prog)
    db.commit()
    return None
