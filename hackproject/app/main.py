from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import init_db
from app.api.sensor_routes import router as sensor_router
from app.api.model_routes import router as model_router
from app.api.alert_routes import router as alert_router


app = FastAPI(title="AI-Driven Smart City Management System", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup() -> None:
    await init_db()


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "env": settings.APP_ENV}


app.include_router(sensor_router, prefix="/api", tags=["sensors"])
app.include_router(model_router, prefix="/api", tags=["predict"])
app.include_router(alert_router, prefix="/api", tags=["alerts"])

# Dashboard summary route
@app.get("/api/dashboard")
async def dashboard():
    from sqlalchemy import func, select
    from app.core.database import async_session
    from app.models.db_models import SensorReading

    async with async_session() as session:
        total = (await session.execute(select(func.count(SensorReading.id)))).scalar() or 0
        avg_speed = (
            await session.execute(select(func.avg(SensorReading.speed_avg)))
        ).scalar() or 0.0
        avg_count = (
            await session.execute(select(func.avg(SensorReading.vehicle_count)))
        ).scalar() or 0.0
    return {
        "total_readings": total,
        "avg_speed": round(float(avg_speed), 3),
        "avg_vehicle_count": round(float(avg_count), 3),
    }



