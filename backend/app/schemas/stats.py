from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_enquiries: int
    new_enquiries: int
    total_messages: int
    new_messages: int
    total_programmes: int
    active_programmes: int
    total_departments: int
    total_news: int
    published_news: int
    total_gallery_items: int
