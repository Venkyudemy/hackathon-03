from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, DateTime, Float, JSON
from datetime import datetime
from app.core.database import Base


class SensorReading(Base):
    __tablename__ = "sensor_readings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime, index=True)
    sensor_id: Mapped[str] = mapped_column(String(100), index=True)
    intersection_id: Mapped[str | None] = mapped_column(String(100), nullable=True)
    speed_avg: Mapped[float] = mapped_column(Float, default=0.0)
    vehicle_count: Mapped[int] = mapped_column(Integer, default=0)
    raw_payload: Mapped[dict] = mapped_column(JSON, default={})


class Alert(Base):
    __tablename__ = "alerts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
    level: Mapped[str] = mapped_column(String(20), default="INFO")
    message: Mapped[str] = mapped_column(String(512))
    intersection_id: Mapped[str | None] = mapped_column(String(100), nullable=True)



