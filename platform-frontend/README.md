# Platform Frontend - TAP Admin Panel

Админ-панель для управления бизнесом мерчантов на платформе TAP.

## Возможности

- **Dashboard**: Обзор метрик и последних заказов
- **Интеграции**: Управление Shopify и TAP Protocol
- **Профессиональный дизайн**: Следует Design.md (Azure/Stripe стиль)

## Технологии

- React 18 + Vite
- Tailwind CSS (с кастомными цветами из Design.md)
- React Router v6
- Lucide Icons

## Запуск

```bash
# Установка зависимостей
npm install

# Разработка
npm run dev
# Откроется на http://localhost:5174

# Сборка
npm run build
```

## Структура

```
src/
├── pages/           # Страницы (Dashboard, Integrations)
├── components/      # Компоненты (Layout, Cards)
├── services/        # API клиент
└── App.jsx          # Роутинг
```

## API

Backend должен быть запущен на `http://localhost:8003`

