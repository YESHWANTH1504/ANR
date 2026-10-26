from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.news import NewsArticle
from app.models.admin import Administrator
from app.schemas.news import NewsCreate, NewsUpdate, NewsOut
from app.api.deps import get_current_admin

router = APIRouter()


# -------------------------------------------------------------------------
# Public Endpoints
# -------------------------------------------------------------------------
@router.get("", response_model=List[NewsOut])
def get_public_news(
    category: Optional[str] = None,
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    """Retrieve published news and event circulars."""
    query = db.query(NewsArticle).filter(NewsArticle.is_published == True)
    if category:
        query = query.filter(NewsArticle.category == category)
    return query.order_by(NewsArticle.created_at.desc()).offset(offset).limit(limit).all()


@router.get("/{slug}", response_model=NewsOut)
def get_news_article_by_slug(slug: str, db: Session = Depends(get_db)):
    """Retrieve a single published article by its unique slug."""
    article = db.query(NewsArticle).filter(
        NewsArticle.slug == slug,
        NewsArticle.is_published == True
    ).first()
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    return article


# -------------------------------------------------------------------------
# Admin Endpoints
# -------------------------------------------------------------------------
@router.get("/admin/all", response_model=List[NewsOut])
def admin_list_news(
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: List all articles including drafts."""
    return db.query(NewsArticle).order_by(NewsArticle.created_at.desc()).all()


@router.post("/admin", response_model=NewsOut, status_code=status.HTTP_201_CREATED)
def admin_create_news(
    news_in: NewsCreate,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Publish or draft a new article/notice."""
    existing = db.query(NewsArticle).filter(NewsArticle.slug == news_in.slug).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="An article with this slug already exists")
        
    news_data = news_in.model_dump()
    if not news_data.get("id"):
        news_data.pop("id", None)
    article = NewsArticle(**news_data)
    db.add(article)
    db.commit()
    db.refresh(article)
    return article


@router.put("/admin/{id}", response_model=NewsOut)
def admin_update_news(
    id: str,
    news_in: NewsUpdate,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Update an article."""
    article = db.query(NewsArticle).filter(NewsArticle.id == id).first()
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
        
    update_data = news_in.model_dump(exclude_unset=True)
    if "slug" in update_data and update_data["slug"] != article.slug:
        existing = db.query(NewsArticle).filter(NewsArticle.slug == update_data["slug"]).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug already in use")
            
    for field, value in update_data.items():
        setattr(article, field, value)
        
    db.commit()
    db.refresh(article)
    return article


@router.delete("/admin/{id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_news(
    id: str,
    current_admin: Administrator = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Delete an article."""
    article = db.query(NewsArticle).filter(NewsArticle.id == id).first()
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    db.delete(article)
    db.commit()
    return None
