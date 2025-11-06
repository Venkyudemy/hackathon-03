from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
import time

from app.services.prediction_service import get_predictor


router = APIRouter()


class PredictIn(BaseModel):
    intersection_id: str
    speed_avg: float
    vehicle_count: int
    weather: Optional[str] = None
    event_flags: Optional[List[str]] = None


class PredictOut(BaseModel):
    intersection_id: str
    model_name: str
    model_version: str
    congestion_score: float
    processing_ms: float


@router.post("/predict", response_model=PredictOut)
async def predict(req: PredictIn) -> PredictOut:
    predictor = get_predictor()
    start = time.perf_counter()
    score, meta = predictor.predict(
        intersection_id=req.intersection_id,
        speed_avg=req.speed_avg,
        vehicle_count=req.vehicle_count,
        weather=req.weather,
        event_flags=req.event_flags or [],
    )
    elapsed = (time.perf_counter() - start) * 1000.0
    return PredictOut(
        intersection_id=req.intersection_id,
        model_name=meta["name"],
        model_version=meta["version"],
        congestion_score=score,
        processing_ms=elapsed,
    )



