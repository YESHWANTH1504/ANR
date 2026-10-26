from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.config import settings
from app.core.security import verify_password, create_access_token
from app.core.rate_limit import check_rate_limit, auth_rate_limiter
from app.models.admin import Administrator
from app.schemas.admin import AdminLogin, Token, AdminOut
from app.api.deps import get_current_admin

router = APIRouter()


@router.post("/login", response_model=Token)
def login_administrator(
    request: Request,
    response: Response,
    credentials: AdminLogin,
    db: Session = Depends(get_db)
):
    """Authenticate administrator and return JWT token (with secure HttpOnly cookie)."""
    check_rate_limit(request, auth_rate_limiter)
    
    clean_email = credentials.email.strip().lower()
    admin = db.query(Administrator).filter(Administrator.email == clean_email).first()
    if not admin or not verify_password(credentials.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account has been deactivated"
        )
        
    access_token = create_access_token(subject=admin.id, role=admin.role)
    
    # Set HttpOnly cookie for browser sessions
    is_prod = settings.ENVIRONMENT == "production"
    response.set_cookie(
        key="anrcas_admin_token",
        value=access_token,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        httponly=True,
        samesite=settings.COOKIE_SAMESITE,
        secure=settings.COOKIE_SECURE if is_prod else False,
        path="/"
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": admin
    }


@router.post("/logout")
def logout_administrator(response: Response):
    """Logout endpoint for client-side token discard and HttpOnly cookie clearance."""
    is_prod = settings.ENVIRONMENT == "production"
    response.delete_cookie(
        key="anrcas_admin_token",
        path="/",
        httponly=True,
        samesite=settings.COOKIE_SAMESITE,
        secure=settings.COOKIE_SECURE if is_prod else False,
    )
    return {"message": "Successfully logged out"}


@router.get("/me", response_model=AdminOut)
def get_current_admin_profile(current_admin: Administrator = Depends(get_current_admin)):
    """Retrieve current authenticated administrator profile."""
    return current_admin
