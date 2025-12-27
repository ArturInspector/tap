# Architecture Decisions

## 1. Монорепо vs Полирепо

### Решение: **Монорепо (текущий)**

**Почему:**

```
tap/
├── agent-registry/          # Существующий TAP registry
├── merchant-backend/        # Существующий мерчант
├── merchant-frontend/       # Существующий фронт
├── tap-agent/              # Существующий агент
├── cdn-proxy/              # Существующий прокси
└── platform-api/           # 👈 НОВЫЙ - Integration Platform
    ├── app/
    ├── Dockerfile
    └── requirements.txt
```

**Преимущества:**
- Переиспользуем TAP логику (agent-registry, signature)
- Переиспользуем модели (models.py)
- Общий docker-compose
- Единая документация
- Один репозиторий для демо на хакатоне

**Как работает:**
- `platform-api` - новый сервис в docker-compose
- Использует `agent-registry` для TAP
- Проксирует к `merchant-backend`
- Расширяет, а не дублирует

### Когда разделять:

**Переносить в отдельный репо только если:**
- Разные команды разработки
- Разные циклы релизов
- Планируем продавать отдельно

**Для хакатона: монорепо = правильный выбор**

## 2. Мок данные

### Решение: **Да, обязательно**

**Почему:**

1. **Нет времени на реальные интеграции**
   - Shopify API требует OAuth, регистрацию приложения
   - Amazon требует верификацию продавца (дни/недели)
   - Нет смысла для демо на хакатоне

2. **Моки нужны для:**
   - Демо без зависимости от внешних сервисов
   - Тесты (unit, integration)
   - Локальная разработка

**Что мокать:**

```python
# platform-api/app/integrations/shopify.py

class ShopifyIntegration:
    def __init__(self, use_mock: bool = False):
        self.use_mock = use_mock
    
    async def create_store(self, merchant_data: dict):
        if self.use_mock:
            # Для демо возвращаем мок
            return {
                "id": "mock-store-123",
                "name": merchant_data["name"],
                "domain": f"{merchant_data['name']}.myshopify.com",
                "created_at": datetime.now()
            }
        
        # Реальный API (для проода)
        return await shopify_api.create_store(merchant_data)
```

**Структура моков:**

```
platform-api/
├── mocks/
│   ├── shopify_responses.json      # Моки ответов Shopify
│   ├── amazon_responses.json       # Моки ответов Amazon
│   └── sample_products.json        # Тестовые товары
└── app/
    └── integrations/
        ├── shopify.py              # use_mock флаг
        └── amazon.py               # use_mock флаг
```

**Контроль через env:**

```bash
# .env
USE_MOCKS=true              # Для хакатона/демо
# USE_MOCKS=false           # Для прода
```

## 3. Сервисы и взаимодействие

```
┌─────────────────────────────────────────┐
│         platform-api (NEW)              │
│                                         │
│  POST /merchants/register               │
│  POST /integrations/shopify/setup       │
│  POST /webhooks/shopify/:merchant_id    │
│  GET  /analytics/:merchant_id           │
└─────────────────────────────────────────┘
         │                    │
         │                    │ Регистрирует агента
         ▼                    ▼
┌──────────────────┐   ┌─────────────────────┐
│  merchant-backend│   │  agent-registry     │
│  (существующий)  │   │  (существующий)     │
│                  │   │                     │
│  Принимает       │   │  TAP Registry       │
│  заказы от       │   │  Верификация        │
│  платформ        │   │  подписей           │
└──────────────────┘   └─────────────────────┘
```

**Как они общаются:**

1. **platform-api → agent-registry**
   - HTTP: POST /agents (регистрация)
   - HTTP: GET /agents/:id (проверка)

2. **platform-api → merchant-backend**
   - HTTP proxy с TAP signature
   - WebSocket для real-time updates (опционально)

3. **Shopify/Amazon → platform-api**
   - Webhook callbacks
   - OAuth callbacks

## 4. Docker Compose

```yaml
# docker-compose.yml (обновить)

services:
  # Существующие сервисы
  agent-registry:
    # ...
  
  merchant-backend:
    # ...
  
  # НОВЫЙ сервис
  platform-api:
    build: ./platform-api
    ports:
      - "8003:8000"
    environment:
      - DATABASE_URL=sqlite:///./platform.db
      - AGENT_REGISTRY_URL=http://agent-registry:8000
      - USE_MOCKS=true
    depends_on:
      - agent-registry
```

## Резюме

| Вопрос | Решение | Почему |
|--------|---------|--------|
| Монорепо или полирепо? | **Монорепо** | Переиспользуем код, проще для демо |
| Мок данные? | **Да** | Нет времени на реальные API для хакатона |
| Где разместить? | **`./platform-api/`** | Новая папка в текущем репо |
| Как запускать? | **docker-compose up** | Все сервисы вместе |

