# Frontend Architecture

## Решение: Отдельное приложение

### Структура

```
platform-frontend/          # 👈 НОВЫЙ (для платформы)
├── src/
│   ├── pages/
│   │   ├── DashboardPage.jsx       # Главная после входа
│   │   ├── IntegrationsPage.jsx    # Настройка Shopify/Amazon
│   │   ├── AnalyticsPage.jsx       # Статистика
│   │   └── OnboardingPage.jsx      # Первичная настройка
│   ├── components/
│   │   ├── IntegrationCard.jsx     # Карточка платформы (Shopify)
│   │   ├── SetupWizard.jsx         # Мастер настройки
│   │   └── AnalyticsChart.jsx      # Графики
│   └── services/
│       └── api.js                  # Запросы к platform-api
└── ...

merchant-frontend/          # Существующий (для покупателей)
└── ...                    # Остается как есть
```

**Две отдельные фронтенд-приложения:**

1. **merchant-frontend** (есть) - витрина для покупателей
2. **platform-frontend** (новый) - админка для мерчантов

## Стек

**То же что и merchant-frontend:**
- React 18
- Vite
- React Router
- Tailwind CSS
- Axios/fetch

**Почему не переиспользуем merchant-frontend?**
- Разная логика (витрина vs админка)
- Разные пользователи (покупатели vs мерчанты)
- Проще разделить сейчас, чем рефакторить потом

## Архитектура страниц

### 1. Onboarding (первый вход)

```jsx
// OnboardingPage.jsx
// Мастер настройки за 3 шага

Step 1: Информация о бизнесе
  - Название
  - Email
  - Регион (Казахстан, Узбекистан)

Step 2: Выбор платформ
  - ☑ Shopify
  - ☐ Amazon (coming soon)
  - ☐ WooCommerce (coming soon)

Step 3: Авто-настройка TAP
  - [Прогресс бар]
  - ✓ Генерация ключей
  - ✓ Регистрация агента
  - ✓ Настройка webhook
```

### 2. Dashboard

```jsx
// DashboardPage.jsx
// Главная страница после входа

┌─────────────────────────────────────┐
│  Заказы сегодня:  15                │
│  Активные платформы: Shopify        │
│  TAP заказы: 3                      │
└─────────────────────────────────────┘

┌──────────────┬──────────────────────┐
│  Платформы   │   Последние заказы   │
│              │                      │
│  Shopify ✓   │   #1234 - $150       │
│  Amazon ⏳   │   #1235 - $200       │
└──────────────┴──────────────────────┘
```

### 3. Integrations

```jsx
// IntegrationsPage.jsx
// Управление интеграциями

Shopify
  Status: ✓ Активен
  Store: mystore.myshopify.com
  Products synced: 50
  [Настройки] [Отключить]

Amazon Seller Central
  Status: ⏳ Не настроен
  [Подключить]

TAP Protocol
  Status: ✓ Активен
  Agent ID: agent-123abc
  Public Key: Ed25519:abc...xyz
  [Обновить ключи]
```

### 4. Analytics

```jsx
// AnalyticsPage.jsx
// Простая статистика

Фильтры: [7 дней ▼] [Все платформы ▼]

┌────────────────────────────────────┐
│  График заказов по дням            │
│  Shopify: ████                     │
│  TAP:     ██                       │
└────────────────────────────────────┘

Таблица заказов:
Date       | Platform | AI Agent | Amount
2024-01-20 | Shopify  | Yes      | $150
2024-01-20 | Shopify  | No       | $200
```

## Компоненты

### SetupWizard

```jsx
// Переиспользуемый мастер настройки
<SetupWizard
  steps={[
    { title: 'Бизнес', component: BusinessInfo },
    { title: 'Платформы', component: PlatformSelect },
    { title: 'TAP Setup', component: TAPSetup }
  ]}
  onComplete={handleComplete}
/>
```

### IntegrationCard

```jsx
// Карточка интеграции
<IntegrationCard
  platform="shopify"
  status="active"
  data={{
    store: "mystore.myshopify.com",
    products: 50
  }}
  onConfigure={handleConfigure}
/>
```

## API Service

```javascript
// services/api.js

const API_BASE = 'http://localhost:8003';

export const platformAPI = {
  // Регистрация мерчанта
  registerMerchant: async (data) => {
    return await fetch(`${API_BASE}/merchants/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  },

  // Настройка Shopify
  setupShopify: async (merchantId, credentials) => {
    return await fetch(`${API_BASE}/integrations/shopify/setup`, {
      method: 'POST',
      body: JSON.stringify({ merchantId, credentials })
    });
  },

  // Получить аналитику
  getAnalytics: async (merchantId, filters) => {
    const params = new URLSearchParams(filters);
    return await fetch(`${API_BASE}/analytics/${merchantId}?${params}`);
  }
};
```

## Моки для фронтенда

```javascript
// mocks/handlers.js (опционально, для разработки без бэка)

export const handlers = [
  rest.post('/merchants/register', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'merchant-123',
        name: req.body.name,
        status: 'active'
      })
    );
  }),

  rest.get('/analytics/:merchantId', (req, res, ctx) => {
    return res(
      ctx.json({
        orders: [
          { id: 1, platform: 'shopify', amount: 150 },
          { id: 2, platform: 'shopify', amount: 200 }
        ]
      })
    );
  })
];
```

## Docker

```dockerfile
# platform-frontend/Dockerfile

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3001"]
```

```yaml
# docker-compose.yml (добавить)

  platform-frontend:
    build: ./platform-frontend
    ports:
      - "3001:3001"
    environment:
      - VITE_API_URL=http://localhost:8003
    depends_on:
      - platform-api
```

## Резюме

| Аспект | Решение |
|--------|---------|
| Архитектура | Отдельное приложение (platform-frontend) |
| Стек | React + Vite (как merchant-frontend) |
| Страницы | Dashboard, Integrations, Analytics, Onboarding |
| API | Fetch к platform-api (порт 8003) |
| Моки | MSW для разработки без бэка (опционально) |
| Порт | 3001 (merchant-frontend на 3000) |

