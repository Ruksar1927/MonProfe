from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.dashboard.schemas import DashboardResponse
from app.dashboard.service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get(
    "/",
    response_model=DashboardResponse
)
def get_dashboard(db: Session = Depends(get_db)):

    data = DashboardService.get_dashboard(db)

    return DashboardResponse(**data)