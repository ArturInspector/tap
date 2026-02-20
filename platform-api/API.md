# TAPay API - Payment Gateway for AI-Driven Commerce

Base URL: `http://localhost:8003` (или `http://platform-api:8000` внутри Docker)

Все endpoints начинаются с `/api`

## About TAPay

TAPay is a secure payment gateway for AI-driven commerce with TAP Protocol fraud prevention.

**Key Features:**
- ✅ Payment processing from AI agents
- ✅ TAP signature verification (fraud prevention)
- ✅ Currency conversion (USD → KGS)
- ✅ Withdrawal to Kaspi/bank accounts
- ✅ Low transaction fees (2% vs 5-7% traditional)
- ✅ Financial inclusion for emerging markets

## Authentication

Сейчас API не требует аутентификации (для хакатона). В продакшене добавим JWT токены.

## Merchants API

### Создать мерчанта
```http
POST /api/merchants
Content-Type: application/json

{
  "name": "My Shop",
  "email": "shop@example.com",
  "domain": "https://myshop.com"
}
```

**Response 201:**
```json
{
  "id": 1,
  "name": "My Shop",
  "email": "shop@example.com",
  "domain": "https://myshop.com",
  "tap_agent_id": null,
  "tap_key_id": null,
  "is_active": true,
  "created_at": "2025-01-15T10:00:00",
  "updated_at": "2025-01-15T10:00:00"
}
```

### Получить список мерчантов
```http
GET /api/merchants?skip=0&limit=100
```

**Response 200:**
```json
{
  "merchants": [
    {
      "id": 1,
      "name": "My Shop",
      "email": "shop@example.com",
      "domain": "https://myshop.com",
      "tap_agent_id": 123,
      "tap_key_id": "primary",
      "is_active": true,
      "created_at": "2025-01-15T10:00:00",
      "updated_at": "2025-01-15T10:00:00"
    }
  ],
  "total": 1
}
```

### Получить мерчанта по ID
```http
GET /api/merchants/{merchant_id}
```

### Обновить мерчанта
```http
PATCH /api/merchants/{merchant_id}
Content-Type: application/json

{
  "name": "Updated Shop Name",
  "is_active": false
}
```

### Удалить мерчанта
```http
DELETE /api/merchants/{merchant_id}
```

## Integrations API

### Создать интеграцию
```http
POST /api/integrations
Content-Type: application/json

{
  "merchant_id": 1,
  "platform_type": "shopify",
  "credentials": {
    "api_key": "shpat_xxx",
    "api_secret": "xxx",
    "store_domain": "myshop.myshopify.com"
  },
  "settings": {
    "sync_products": true,
    "sync_orders": true
  }
}
```

**Platform types:** `shopify`, `amazon`, `woocommerce`

**Response 201:**
```json
{
  "id": 1,
  "merchant_id": 1,
  "platform_type": "shopify",
  "credentials": {
    "api_key": "shpat_xxx",
    "api_secret": "xxx",
    "store_domain": "myshop.myshopify.com"
  },
  "settings": {
    "sync_products": true,
    "sync_orders": true
  },
  "status": "pending",
  "platform_store_id": null,
  "created_at": "2025-01-15T10:00:00",
  "updated_at": "2025-01-15T10:00:00"
}
```

### Получить список интеграций
```http
GET /api/integrations?merchant_id=1&skip=0&limit=100
```

**Response 200:**
```json
{
  "integrations": [
    {
      "id": 1,
      "merchant_id": 1,
      "platform_type": "shopify",
      "credentials": {...},
      "settings": {...},
      "status": "active",
      "platform_store_id": "123456",
      "created_at": "2025-01-15T10:00:00",
      "updated_at": "2025-01-15T10:00:00"
    }
  ],
  "total": 1
}
```

### Получить интеграцию по ID
```http
GET /api/integrations/{integration_id}
```

### Обновить интеграцию
```http
PATCH /api/integrations/{integration_id}
Content-Type: application/json

{
  "status": "active",
  "settings": {
    "sync_products": false
  }
}
```

**Status values:** `pending`, `active`, `error`, `disabled`

### Удалить интеграцию
```http
DELETE /api/integrations/{integration_id}
```

## Analytics API

### Получить аналитику мерчанта
```http
GET /api/analytics/merchants/{merchant_id}?days=30
```

**Query params:**
- `days` - период в днях (1-365, по умолчанию 30)

**Response 200:**
```json
{
  "merchant_id": 1,
  "period_start": "2024-12-15T10:00:00",
  "period_end": "2025-01-15T10:00:00",
  "stats": {
    "total_orders": 150,
    "tap_orders": 45,
    "regular_orders": 105,
    "total_revenue": 15000.50,
    "tap_revenue": 4500.00,
    "regular_revenue": 10500.50,
    "orders_by_platform": {
      "shopify": 100,
      "amazon": 50
    },
    "revenue_by_platform": {
      "shopify": 10000.00,
      "amazon": 5000.50
    }
  },
  "recent_orders": [
    {
      "id": 1,
      "merchant_id": 1,
      "integration_id": 1,
      "order_id": "order_123",
      "platform": "shopify",
      "order_data": {
        "customer": "John Doe",
        "items": [...]
      },
      "is_tap_order": true,
      "total_amount": 99.99,
      "created_at": "2025-01-15T09:00:00"
    }
  ]
}
```

### Получить список заказов
```http
GET /api/analytics/orders?merchant_id=1&platform=shopify&is_tap_order=true&skip=0&limit=100
```

**Query params:**
- `merchant_id` - фильтр по мерчанту (опционально)
- `platform` - фильтр по платформе (опционально)
- `is_tap_order` - фильтр по типу заказа: `true`/`false` (опционально)
- `skip` - пагинация (по умолчанию 0)
- `limit` - лимит (по умолчанию 100)

**Response 200:**
```json
[
  {
    "id": 1,
    "merchant_id": 1,
    "integration_id": 1,
    "order_id": "order_123",
    "platform": "shopify",
    "order_data": {...},
    "is_tap_order": true,
    "total_amount": 99.99,
    "created_at": "2025-01-15T09:00:00"
  }
]
```

## Payments API (Fintech)

### Process Payment from AI Agent
```http
POST /api/payments/process
Content-Type: application/json

{
  "merchant_id": 1,
  "amount": 100.00,
  "currency": "USD",
  "tap_signature": "sig1=...",
  "tap_signature_input": "sig1=...;keyid=\"primary-ed25519\";...",
  "tap_agent_id": "agent-123",
  "description": "Payment for iPhone 15"
}
```

**Response 201:**
```json
{
  "transaction_id": 1,
  "status": "completed",
  "amount_original": 100.00,
  "currency_original": "USD",
  "amount_converted": 8950.00,
  "currency_converted": "KGS",
  "fee_amount": 2.00,
  "fee_percentage": 2.00,
  "net_amount": 98.00,
  "tap_verified": true,
  "merchant_balance_usd": 98.00,
  "merchant_balance_kgs": 8771.00,
  "created_at": "2025-01-15T10:00:00"
}
```

### Withdraw to Kaspi
```http
POST /api/payments/withdrawals/kaspi
Content-Type: application/json

{
  "merchant_id": 1,
  "amount": 5000.00,
  "currency": "KGS",
  "withdrawal_account": "996555123456",
  "description": "Withdrawal to Kaspi"
}
```

**Response 201:**
```json
{
  "transaction_id": 2,
  "status": "completed",
  "amount": 5000.00,
  "currency": "KGS",
  "withdrawal_account": "996555123456",
  "fee_amount": 100.00,
  "net_amount": 4900.00,
  "estimated_completion": "2025-01-15T10:05:00",
  "created_at": "2025-01-15T10:00:00"
}
```

### List Transactions
```http
GET /api/payments/transactions?merchant_id=1&tap_verified=true&skip=0&limit=100
```

**Query params:**
- `merchant_id` - фильтр по мерчанту (опционально)
- `status` - фильтр по статусу: `pending`, `processing`, `completed`, `failed` (опционально)
- `transaction_type` - фильтр по типу: `payment`, `withdrawal`, `conversion`, `fee` (опционально)
- `tap_verified` - фильтр по TAP верификации: `true`/`false` (опционально)
- `skip` - пагинация (по умолчанию 0)
- `limit` - лимит (по умолчанию 100)

**Response 200:**
```json
{
  "transactions": [
    {
      "id": 1,
      "merchant_id": 1,
      "transaction_type": "payment",
      "status": "completed",
      "amount_original": 100.00,
      "currency_original": "USD",
      "amount_converted": 8950.00,
      "currency_converted": "KGS",
      "fee_amount": 2.00,
      "fee_percentage": 2.00,
      "net_amount": 98.00,
      "tap_verified": true,
      "tap_agent_id": "agent-123",
      "payment_method": "ai_agent",
      "description": "Payment for iPhone 15",
      "created_at": "2025-01-15T10:00:00",
      "updated_at": "2025-01-15T10:00:00",
      "completed_at": "2025-01-15T10:00:01"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 100
}
```

### Get Transaction Details
```http
GET /api/payments/transactions/{transaction_id}
```

### Transaction Analytics (Fintech)
```http
GET /api/analytics/transactions?merchant_id=1&days=30
```

**Response 200:**
```json
{
  "period_start": "2024-12-15T10:00:00",
  "period_end": "2025-01-15T10:00:00",
  "merchant_id": 1,
  "stats": {
    "total_transactions": 150,
    "total_volume_usd": 15000.00,
    "total_fees": 300.00,
    "average_fee_percentage": 2.00,
    "tap_verified": {
      "count": 120,
      "volume_usd": 12000.00,
      "percentage": 80.0
    },
    "transaction_types": {
      "payments": 140,
      "withdrawals": 10,
      "payments_volume": 14000.00,
      "withdrawals_volume": 1000.00
    },
    "status": {
      "completed": 145,
      "failed": 3,
      "pending": 2
    },
    "currency_conversion": {
      "count": 140,
      "total_converted_kgs": 1253000.00,
      "average_rate": 89.50
    }
  }
}
```

## Health Check

```http
GET /health
```

**Response 200:**
```json
{
  "status": "healthy"
}
```

## Error Responses

Все ошибки возвращаются в формате:

```json
{
  "detail": "Error message"
}
```

**Status codes:**
- `400` - Bad Request (валидация, дубликаты)
- `404` - Not Found
- `500` - Internal Server Error

## Примеры использования (JavaScript/TypeScript)

### Fetch API
```javascript
// Создать мерчанта
const response = await fetch('http://localhost:8003/api/merchants', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'My Shop',
    email: 'shop@example.com',
    domain: 'https://myshop.com'
  })
});
const merchant = await response.json();

// Получить аналитику
const analytics = await fetch(
  `http://localhost:8003/api/analytics/merchants/${merchant.id}?days=30`
).then(r => r.json());
```

### Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8003/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Создать интеграцию
const integration = await api.post('/integrations', {
  merchant_id: 1,
  platform_type: 'shopify',
  credentials: {
    api_key: 'shpat_xxx',
    store_domain: 'myshop.myshopify.com'
  }
});

// Получить список интеграций
const { data } = await api.get('/integrations', {
  params: { merchant_id: 1 }
});
```

### React Hook Example
```typescript
import { useState, useEffect } from 'react';

function useMerchants() {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8003/api/merchants')
      .then(res => res.json())
      .then(data => {
        setMerchants(data.merchants);
        setLoading(false);
      });
  }, []);

  return { merchants, loading };
}
```

