from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Dict

from app.core.database import async_session
from app.models.db_models import SensorReading


router = APIRouter()


class SensorPayload(BaseModel):
    timestamp: datetime
    sensor_id: str = Field(min_length=1)
    intersection_id: Optional[str] = None
    speed_avg: Optional[float] = 0.0
    vehicle_count: Optional[int] = 0
    payload: Optional[Dict[str, float]] = None


@router.post("/sensor")
async def ingest_sensor(payload: SensorPayload) -> dict:
    try:
        reading = SensorReading(
            timestamp=payload.timestamp,
            sensor_id=payload.sensor_id,
            intersection_id=payload.intersection_id,
            speed_avg=payload.speed_avg or 0.0,
            vehicle_count=payload.vehicle_count or 0,
            raw_payload=payload.payload or {},
        )
        async with async_session() as session:
            session.add(reading)
            await session.commit()
        return {"status": "accepted", "id": reading.id}
    except Exception as exc:  # pragma: no cover - unexpected
        raise HTTPException(status_code=500, detail=str(exc))



