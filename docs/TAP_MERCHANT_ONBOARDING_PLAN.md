# План Next.js фронтенда для подключения мерчантов из Центральной Азии к TAP

## Проблема
Мерчанты из Центральной Азии (Казахстан, Узбекистан, Кыргызстан и др.) не понимают:
- Как технически подключиться к Trusted Agent Protocol
- Что нужно для интеграции
- Какие шаги предпринять
- Как это поможет их бизнесу

## Решение: Next.js Onboarding Platform

### Архитектура

```
┌─────────────────────────────────────────────────────────┐
│         Next.js Merchant Onboarding Platform            │
│  (Многоязычный: RU, KZ, UZ, EN)                         │
└─────────────────────────────────────────────────────────┘
         │
         ├─── Wizard (Пошаговая интеграция)
         ├─── API Integration Guide
         ├─── Code Generator
         ├─── Testing Dashboard
         └─── Analytics & Monitoring
```

### Основные компоненты

#### 1. **Wizard для пошаговой интеграции** (`/onboarding`)

**Страницы:**
- **Шаг 1: Регистрация агента**
  - Форма для регистрации в Agent Registry
  - Генерация ключевых пар (RSA/Ed25519)
  - Автоматическая регистрация через API
  
- **Шаг 2: Настройка бэкенда**
  - Выбор технологии (FastAPI, Express, Django)
  - Генерация middleware для проверки подписей
  - Инструкции по установке
  
- **Шаг 3: Настройка фронтенда**
  - Интеграция с CDN Proxy
  - Настройка заголовков
  - Примеры кода для React/Vue/Angular
  
- **Шаг 4: Тестирование**
  - Проверка подписей
  - Тестовые запросы
  - Валидация интеграции

**Технологии:**
- Next.js 14+ (App Router)
- React Hook Form для форм
- Zod для валидации
- shadcn/ui для UI компонентов
- i18next для многоязычности

#### 2. **Code Generator** (`/generator`)

**Функционал:**
- Выбор стека технологий
- Генерация готового кода:
  - Middleware для проверки подписей
  - API endpoints
  - Frontend компоненты
  - Docker конфигурации
  
**Примеры:**
```typescript
// Генератор для FastAPI
export function generateFastAPIMiddleware(language: 'ru' | 'kz' | 'uz') {
  return {
    code: `# Автоматически сгенерированный код
from fastapi import Request, HTTPException
import httpx

async def verify_tap_signature(request: Request):
    # ... сгенерированный код
    `,
    instructions: getLocalizedInstructions(language)
  }
}
```

#### 3. **Interactive API Documentation** (`/docs`)

**Особенности:**
- Интерактивная документация (Swagger-like)
- Примеры запросов с реальными данными
- Возможность тестирования API прямо в браузере
- Многоязычные комментарии

#### 4. **Testing Dashboard** (`/testing`)

**Функционал:**
- Тестирование подписей в реальном времени
- Визуализация процесса проверки
- Логирование запросов
- Отчеты о тестировании

#### 5. **Analytics & Monitoring** (`/analytics`)

**Метрики:**
- Количество успешных проверок подписей
- Статистика по агентам
- Мониторинг ошибок
- Производительность

### Технический стек

```typescript
// package.json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^19.0.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "i18next": "^23.0.0",
    "next-i18next": "^15.0.0",
    "@shadcn/ui": "latest",
    "tailwindcss": "^3.4.0",
    "axios": "^1.6.0",
    "react-syntax-highlighter": "^15.5.0"
  }
}
```

### Структура проекта

```
tap-onboarding-platform/
├── app/
│   ├── (onboarding)/
│   │   ├── onboarding/
│   │   │   ├── page.tsx          # Главная страница онбординга
│   │   │   ├── step-1/
│   │   │   ├── step-2/
│   │   │   ├── step-3/
│   │   │   └── step-4/
│   ├── generator/
│   │   └── page.tsx
│   ├── docs/
│   │   └── page.tsx
│   ├── testing/
│   │   └── page.tsx
│   └── analytics/
│       └── page.tsx
├── components/
│   ├── onboarding/
│   │   ├── AgentRegistrationForm.tsx
│   │   ├── BackendSetup.tsx
│   │   ├── FrontendSetup.tsx
│   │   └── TestingPanel.tsx
│   ├── generator/
│   │   └── CodeGenerator.tsx
│   └── ui/                      # shadcn компоненты
├── lib/
│   ├── code-generators/
│   │   ├── fastapi.ts
│   │   ├── express.ts
│   │   └── django.ts
│   ├── api/
│   │   └── agent-registry.ts
│   └── utils/
│       └── signature-utils.ts
├── public/
│   └── locales/                 # Переводы
│       ├── ru/
│       ├── kz/
│       ├── uz/
│       └── en/
└── docker-compose.yml
```

### Ключевые фичи для Центральной Азии

#### 1. **Многоязычность**
- Русский (основной)
- Казахский
- Узбекский
- Английский (fallback)

#### 2. **Локализация контента**
- Примеры кода с комментариями на нужном языке
- Видео-туториалы на местных языках
- Поддержка через чат на русском/казахском

#### 3. **Упрощенная интеграция**
- Минимальные требования к техническим знаниям
- Визуальные инструкции
- Автоматическая генерация кода

#### 4. **Поддержка популярных стеков**
- FastAPI (Python)
- Express.js (Node.js)
- Django (Python)
- Spring Boot (Java) - для корпоративных клиентов

### Пример реализации Wizard

```typescript
// app/(onboarding)/onboarding/page.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AgentRegistrationForm } from '@/components/onboarding/AgentRegistrationForm'
import { BackendSetup } from '@/components/onboarding/BackendSetup'
import { FrontendSetup } from '@/components/onboarding/FrontendSetup'
import { TestingPanel } from '@/components/onboarding/TestingPanel'

const steps = [
  { id: 1, title: 'Регистрация агента', component: AgentRegistrationForm },
  { id: 2, title: 'Настройка бэкенда', component: BackendSetup },
  { id: 3, title: 'Настройка фронтенда', component: FrontendSetup },
  { id: 4, title: 'Тестирование', component: TestingPanel },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  
  return (
    <div className="container mx-auto py-8">
      <ProgressBar steps={steps} currentStep={currentStep} />
      <StepContent 
        step={currentStep} 
        onNext={() => setCurrentStep(prev => prev + 1)}
        onPrev={() => setCurrentStep(prev => prev - 1)}
      />
    </div>
  )
}
```

### Интеграция с существующим TAP

```typescript
// lib/api/agent-registry.ts
export async function registerAgent(agentData: AgentRegistration) {
  const response = await fetch('http://agent-registry:8001/agents/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agentData)
  })
  return response.json()
}

export async function generateKeyPair(algorithm: 'rsa' | 'ed25519') {
  // Генерация ключевой пары на клиенте или через API
  // ...
}
```

### Деплой

```yaml
# docker-compose.onboarding.yml
version: '3.8'
services:
  onboarding-platform:
    build: ./tap-onboarding-platform
    ports:
      - "3003:3000"
    environment:
      - NEXT_PUBLIC_AGENT_REGISTRY_URL=http://agent-registry:8001
      - NEXT_PUBLIC_API_URL=http://merchant-backend:8000
    networks:
      - tap-network
```

### Метрики успеха

1. **Время интеграции**: < 30 минут от регистрации до первого теста
2. **Процент успешных интеграций**: > 80%
3. **Поддержка**: Среднее время ответа < 2 часа
4. **Многоязычность**: 100% покрытие основных функций

### Дальнейшее развитие

1. **Мобильное приложение** для мониторинга
2. **SDK для популярных языков** (Python, Node.js, Java, PHP)
3. **Marketplace интеграций** с готовыми плагинами
4. **Community форум** для обмена опытом



