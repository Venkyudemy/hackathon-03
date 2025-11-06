from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import declarative_base
from app.core.config import settings


Base = declarative_base()
engine = create_async_engine(settings.DB_URL, echo=False, future=True)
async_session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


async def init_db() -> None:
    # Perform simple auto-create for demo purposes
    from app.models.db_models import SensorReading, Alert  # noqa
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)



