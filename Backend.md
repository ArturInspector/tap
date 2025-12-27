# Backend Stack

## Выбор: Python (FastAPI)

### Почему Python:

1. **Уже есть кодовая база**
   - agent-registry на FastAPI
   - merchant-backend на FastAPI
   - Переиспользуем модели, схемы, логику TAP

2. **Библиотеки интеграций**
   - `ShopifyAPI` - официальная Python библиотека
   - `python-amazon-sp-api` - SP-API клиент
   - `woocommerce` - REST API клиент
   - `httpx` - уже используется для TAP

3. **Скорость разработки**
   - Хакатон = 24-48 часов
   - FastAPI = быстрый прототип
   - Type hints = меньше багов
   - Pydantic = валидация из коробки

4. **TAP Protocol**
   - Уже реализован на Python в текущем проекте
   - Подпись запросов, верификация - готовые модули

### Почему НЕ Go:

- Нужно переписывать TAP логику
- Медленнее разработка для прототипа
- Меньше готовых SDK для Shopify/Amazon
- Overkill для хакатона

**Go имеет смысл только если:**
- Нужна высокая нагрузка (>10k req/s)
- Критична задержка (<10ms)
- Нужен microservices с gRPC

## Архитектура

```
platform-api/
├── app/
│   ├── main.py                 # FastAPI приложение
│   ├── config.py               # Настройки (envs)
│   ├── database/
│   │   └── database.py         # SQLite/PostgreSQL
│   ├── models/
│   │   ├── merchant.py         # Модели мерчантов
│   │   ├── integration.py      # Модели интеграций
│   │   └── analytics.py        # Модели аналитики
│   ├── schemas/
│   │   └── ...                 # Pydantic schemas
│   ├── integrations/
│   │   ├── shopify.py          # Shopify API
│   │   ├── amazon.py           # Amazon SP-API
│   │   └── base.py             # Базовый класс
│   ├── tap/
│   │   ├── setup.py            # Авто-настройка TAP
│   │   └── signature.py        # Генерация подписей
│   ├── routes/
│   │   ├── merchants.py        # CRUD мерчантов
│   │   ├── integrations.py     # Настройка интеграций
│   │   ├── webhooks.py         # Webhook endpoints
│   │   └── analytics.py        # Аналитика
│   └── services/
│       ├── automation.py       # Синхронизация товаров
│       └── proxy.py            # TAP proxy/gateway
├── requirements.txt
└── Dockerfile
```

## Стек

**Core:**
- FastAPI 0.104+
- Pydantic v2
- SQLAlchemy 2.0
- Alembic (миграции)

**Интеграции:**
- httpx (async HTTP)
- ShopifyAPI
- python-amazon-sp-api
- woocommerce

**TAP:**
- cryptography (Ed25519, RSA)
- Переиспользуем из agent-registry

**Инфра:**
- PostgreSQL (прод) / SQLite (dev)
- Redis (опционально для кеша)
- Docker

## Решение по производительности

**Python FastAPI достаточно:**
- 1000-2000 req/s на одном воркере (uvicorn)
- Для хакатона: 10-100 req/day
- Для MVP: до 10k req/day легко

**Если вырастет нагрузка:**
- Добавить Redis для кеша
- Horizontal scaling (k8s)
- Только потом переписывать на Go




