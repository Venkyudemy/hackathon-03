from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List, Tuple
import os

from app.core.config import settings
from app.core.logger import get_logger


log = get_logger(__name__)


@dataclass
class Predictor:
    name: str = "traffic_congestion"
    version: str = "v1"
    model: object | None = None

    def __post_init__(self) -> None:
        model_path = settings.MODEL_PATH
        if os.path.exists(model_path):
            try:
                from joblib import load
                self.model = load(model_path)
                log.info("Loaded model from %s", model_path)
            except Exception as exc:  # pragma: no cover
                log.warning("Failed to load model at %s: %s; using heuristic", model_path, exc)
        else:
            log.info("Model file not found at %s; using heuristic", model_path)

    def predict(
        self,
        intersection_id: str,
        speed_avg: float,
        vehicle_count: int,
        weather: str | None,
        event_flags: List[str],
    ) -> Tuple[float, Dict[str, str]]:
        if self.model is not None:
            # Expect model to accept [speed_avg, vehicle_count] (expand as needed)
            import numpy as np
            x = np.array([[speed_avg, vehicle_count]], dtype=float)
            y = float(self.model.predict_proba(x)[0][1]) if hasattr(self.model, "predict_proba") else float(self.model.predict(x)[0])
            score = max(0.0, min(1.0, y))
        else:
            # Heuristic fallback
            veh_term = min(1.0, vehicle_count / 100.0)
            speed_term = 1.0 - max(0.0, min(1.0, speed_avg / 60.0))
            score = 0.6 * veh_term + 0.4 * speed_term
            if weather and weather.lower() in {"rain", "snow", "storm"}:
                score += 0.1
            if any(flag in {"accident", "school_zone", "construction"} for flag in event_flags):
                score += 0.1
            score = max(0.0, min(1.0, score))

        return score, {"name": self.name, "version": self.version}


_predictor: Predictor | None = None


def get_predictor() -> Predictor:
    global _predictor
    if _predictor is None:
        _predictor = Predictor()
    return _predictor


def train_and_save_example_model(out_path: str | None = None) -> str:
    """Train a trivial scikit-learn model and save as joblib artifact.

    Returns the path to the saved artifact.
    """
    from sklearn.linear_model import LogisticRegression
    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import StandardScaler
    from sklearn.pipeline import make_pipeline
    from sklearn.datasets import make_classification
    from joblib import dump
    import os

    X, y = make_classification(n_samples=500, n_features=2, n_informative=2, n_redundant=0, random_state=42)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    clf = make_pipeline(StandardScaler(), LogisticRegression(max_iter=200))
    clf.fit(X_train, y_train)

    out_dir = os.path.dirname(out_path or settings.MODEL_PATH)
    os.makedirs(out_dir, exist_ok=True)
    model_path = out_path or settings.MODEL_PATH
    dump(clf, model_path)
    log.info("Saved example model to %s", model_path)
    return model_path



