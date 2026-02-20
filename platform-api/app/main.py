import logging
import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database.database import init_db
from app.routes import merchants_router, payments_router

logging.basicConfig(
    level=getattr(logging, settings.log_level),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="TAPay API",
    description="Secure Payment Gateway for AI-Driven Commerce with TAP Protocol fraud prevention",
    version="1.0.0"
)

# CORS middleware should be added first to handle preflight requests
origins = [origin.strip() for origin in settings.allowed_origins.split(",")]
logger.info(f"CORS allowed origins: {origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(merchants_router, prefix="/api")
app.include_router(payments_router, prefix="/api")


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    logger.info(f"REQUEST: {request.method} {request.url}")
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(f"RESPONSE: {response.status_code} - {process_time:.3f}s")
    return response


@app.on_event("startup")
async def startup_event():
    logger.info("Starting Platform API...")
    init_db()
    logger.info("Database initialized")


@app.get("/")
def read_root():
    return {
        "message": "TAPay Payment Gateway API",
        "description": "Secure payment processing for AI-driven commerce with TAP Protocol verification",
        "version": "1.0.0"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}

