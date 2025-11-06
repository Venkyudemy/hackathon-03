from typing import List
from sqlalchemy import select, desc
from app.core.database import async_session
from app.models.db_models import Alert, SensorReading


async def get_recent_alerts(limit: int = 20) -> List[dict]:
    async with async_session() as session:
        res = await session.execute(select(Alert).order_by(desc(Alert.created_at)).limit(limit))
        alerts = [
            {
                "id": a.id,
                "created_at": a.created_at.isoformat(),
                "level": a.level,
                "message": a.message,
                "intersection_id": a.intersection_id,
            }
            for a in res.scalars().all()
        ]
        return alerts


async def maybe_generate_alert(threshold_vehicle_count: int = 80) -> None:
    # Simple heuristic: if any recent reading exceeds threshold, write an alert
    async with async_session() as session:
        res = await session.execute(
            select(SensorReading).order_by(desc(SensorReading.timestamp)).limit(1)
        )
        last = res.scalar_one_or_none()
        if last and last.vehicle_count >= threshold_vehicle_count:
            session.add(
                Alert(
                    level="WARN",
                    message=f"High vehicle count {last.vehicle_count}",
                    intersection_id=last.intersection_id,
                )
            )
            await session.commit()



