import os
from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./platform_api.db")
    agent_registry_url: str = os.getenv("AGENT_REGISTRY_URL", "http://localhost:9002")
    
    allowed_origins: str = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:3001")
    
    redis_url: Optional[str] = os.getenv("REDIS_URL")
    
    log_level: str = os.getenv("LOG_LEVEL", "INFO")
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
