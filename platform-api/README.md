# Platform API

Integration platform for merchants with TAP (Trusted Agent Protocol) support. Provides a unified API for connecting to various e-commerce platforms (Shopify, Amazon, WooCommerce) and automatic TAP agent configuration.

## Overview

This FastAPI service acts as a middleware layer between e-commerce platforms and merchant backends, handling:
- Merchant registration and TAP agent setup
- Integration management with external platforms
- Request proxying with TAP signature verification
- Analytics collection and reporting

## Internal Processes

**Application Startup:** On startup, the application initializes SQLAlchemy database connection, creates tables for merchants, integrations, and analytics models. CORS middleware is configured to allow cross-origin requests, and HTTP request logging middleware is set up to track all incoming requests with timing information.

**Merchant Registration:** When a new merchant registers, the system generates cryptographic key pairs (Ed25519), registers the agent in the Agent Registry service via HTTP API, and creates corresponding database records to track merchant integrations and configuration.

**Integration Setup:** Each integration (Shopify, Amazon, etc.) is configured through OAuth/webhook endpoints. The platform proxies requests to merchant-backend services, automatically adding TAP signatures for agent verification. Integration credentials are stored securely in the database.

**Data Processing:** Webhooks from e-commerce platforms are processed asynchronously. Order and product data is synchronized with merchant-backend services, while analytics metrics are collected in separate database tables for multi-channel sales reporting and performance tracking.

## Project Structure

```
platform-api/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Settings and environment variables
│   ├── database/
│   │   └── database.py      # SQLAlchemy setup and session management
│   ├── models/              # Database models (merchant, integration, analytics)
│   ├── routes/              # API route handlers
│   ├── schemas/             # Pydantic validation schemas
│   ├── services/            # Business logic services
│   ├── integrations/        # External platform integrations
│   └── tap/                 # TAP protocol utilities
├── requirements.txt
└── .env.example
```

## Setup

1. Copy `.env.example` to `.env` and configure environment variables
2. Install dependencies: `pip install -r requirements.txt`
3. Run the application: `uvicorn app.main:app --reload --port 8003`

## Environment Variables

See `.env.example` for all available configuration options. Key variables:
- `DATABASE_URL` - Database connection string (SQLite by default)
- `AGENT_REGISTRY_URL` - Agent Registry service endpoint
- `ALLOWED_ORIGINS` - CORS allowed origins (comma-separated)
- `LOG_LEVEL` - Logging level (DEBUG, INFO, WARNING, ERROR)
