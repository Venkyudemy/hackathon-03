from fastapi import APIRouter
from typing import List

from app.services.alert_service import get_recent_alerts


router = APIRouter()


@router.get("/alerts")
async def list_alerts() -> List[dict]:
    return await get_recent_alerts(limit=20)



