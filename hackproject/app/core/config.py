import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)
    
    APP_ENV: str = os.getenv("APP_ENV", "local")
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

    DB_URL: str = os.getenv("DB_URL", "sqlite+aiosqlite:///./smartcity.db")
    MODEL_PATH: str = os.getenv("MODEL_PATH", "app/services/model_artifacts/traffic_model.pkl")


settings = Settings()



