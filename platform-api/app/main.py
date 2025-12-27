import logging
import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database.database import init_db

logging.basicConfig(
    level=getattr(logging, settings.log_level),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Platform API",
    description="Integration platform for merchants with TAP protocol",
    version="1.0.0"
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    logger.info(f"REQUEST: {request.method} {request.url}")
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(f"RESPONSE: {response.status_code} - {process_time:.3f}s")
    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    logger.info("Starting Platform API...")
    init_db()
    logger.info("Database initialized")


@app.get("/")
def read_root():
    return {"message": "Platform API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}

