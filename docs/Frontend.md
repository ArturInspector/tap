# Frontend Architecture

## Три отдельных приложения

```
marketing-landing/        # 🌟 НОВЫЙ - Продающий лендинг
├── Hero, Features, Pricing, CTA
└── Цель: конвертировать мерчантов в регистрацию

platform-frontend/        # 🔧 НОВЫЙ - Админка для мерчантов
├── Dashboard, Integrations, Analytics
└── Цель: управление бизнесом, настройка платформ

merchant-frontend/        # 🛒 ЕСТЬ - Витрина для покупателей
├── Products, Cart, Checkout
└── Цель: покупка товаров через AI агентов
```

---

## 1. Marketing Landing - Продающий лендинг

### Концепция

**Цель:** Привлечь мерчантов из Центральной Азии и конвертировать в регистрацию

**Tone of Voice:**
- Вдохновляющий, но профессиональный
- "Выйдите на глобальные рынки за 5 минут"
- Фокус на простоту и скорость

**Референсы дизайна:**
- Stripe (чистота, анимации)
- Vercel (современный градиент, dark sections)
- Linear (плавные переходы, микроанимации)

### Структура страницы

```
┌─────────────────────────────────────────────────────┐
│ [1] HERO SECTION                                    │
│ Animated gradient background                        │
│ "Продавайте через Shopify и AI агентов за 5 минут" │
│ [CTA: Начать бесплатно] [Demo видео]               │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [2] SOCIAL PROOF                                    │
│ Логотипы: Shopify, Amazon, ChatGPT, Visa TAP      │
│ "Интегрируемся с ведущими платформами"            │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [3] PROBLEM SECTION (темный фон)                    │
│ "Выход на Shopify/Amazon сложен и дорог"          │
│ Animated icons: ❌ Сложная настройка               │
│                 ❌ Нет AI интеграции               │
│                 ❌ Ручное управление                │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [4] SOLUTION - Анимированная диаграмма              │
│ Shopify ──┐                                        │
│ Amazon ───┤─► [Платформа] ──► TAP ──► AI Agents  │
│ WooCommerce┘                                       │
│ Анимация потока данных                             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [5] FEATURES - 3 колонки с иконками                 │
│                                                     │
│  🚀 Быстрый старт    🤖 AI-Ready    📊 Аналитика  │
│  Shopify за 5 мин    TAP из коробки  Все в одном  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [6] HOW IT WORKS - Пошаговая анимация              │
│                                                     │
│ Step 1 ────► Step 2 ────► Step 3                  │
│ Регистрация  Подключение  Автонастройка TAP        │
│              Shopify                               │
│ (Анимация появления при скролле)                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [7] LIVE DEMO - Интерактивный блок                  │
│ ┌───────────────────────────────────────────────┐  │
│ │ [Terminal-style animation]                    │  │
│ │ $ npm install agent-platform                  │  │
│ │ ✓ Shopify подключен                           │  │
│ │ ✓ TAP настроен                                │  │
│ │ 🎉 Готово к продажам!                         │  │
│ └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [8] METRICS - Большие цифры с анимацией             │
│                                                     │
│  5 минут        50+ мерчантов    99.9% uptime     │
│  на настройку   уже используют   надежность        │
│                                                     │
│ (Цифры считаются вверх при появлении)              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [9] PRICING - Три тарифа                            │
│                                                     │
│ Starter      Professional    Enterprise            │
│ $49/мес      $149/мес        Custom                │
│ [Выбрать]    [Выбрать] ⭐    [Связаться]          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [10] CTA - Градиентный блок                         │
│ "Начните продавать через AI агентов сегодня"       │
│ [Начать бесплатно]                                 │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [11] FOOTER - Minimal                               │
│ О нас | Документация | Контакты                    │
└─────────────────────────────────────────────────────┘
```

### Крутые фишки

#### 1. **Animated Gradient Hero**
```css
/* Плавный градиент как у Stripe/Vercel */
.hero-gradient {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #667eea 100%
  );
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

#### 2. **Terminal Animation**
```jsx
// Как у Vercel - печатается команда
const TerminalDemo = () => {
  const lines = [
    '$ agent-platform setup',
    'Connecting to Shopify...',
    '✓ Shopify connected',
    '✓ TAP configured',
    '🎉 Ready to sell!'
  ];
  
  // TypeWriter эффект с задержкой между строками
}
```

#### 3. **Scroll-triggered animations**
```jsx
// Framer Motion - элементы появляются при скролле
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <Feature />
</motion.div>
```

#### 4. **Interactive Flow Diagram**
```jsx
// Анимированная диаграмма с пульсирующими точками
Shopify ──●─●─●──► Platform ──●─●──► TAP ──●──► AI
// Точки двигаются по пути (SVG + animation)
```

#### 5. **Number Counter**
```jsx
// Цифры считаются вверх при появлении
const Counter = ({ end }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Animate from 0 to end
    const animation = ...
  }, []);
}
```

#### 6. **3D Card Hover Effect**
```css
/* Карточки наклоняются при наведении */
.feature-card {
  transform-style: preserve-3d;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: rotateY(5deg) rotateX(5deg);
}
```

#### 7. **Particles Background**
```jsx
// React Particles - летающие частицы на фоне Hero
import Particles from "react-particles";
// Subtle dots/lines connecting в background
```

### Технический стек

```json
{
  "framework": "React 18 + Vite",
  "styling": "Tailwind CSS",
  "animations": "Framer Motion",
  "icons": "Lucide React",
  "effects": [
    "react-type-animation (typewriter)",
    "react-countup (number animations)",
    "react-intersection-observer (scroll triggers)"
  ]
}
```

### Структура проекта

```
marketing-landing/
├── src/
│   ├── sections/
│   │   ├── HeroSection.jsx          # Gradient + CTA
│   │   ├── ProblemSection.jsx       # Dark theme problem
│   │   ├── SolutionSection.jsx      # Animated diagram
│   │   ├── FeaturesSection.jsx      # 3-column features
│   │   ├── HowItWorksSection.jsx    # Step-by-step
│   │   ├── DemoSection.jsx          # Terminal animation
│   │   ├── MetricsSection.jsx       # Counter numbers
│   │   ├── PricingSection.jsx       # 3 tiers
│   │   ├── CTASection.jsx           # Final CTA
│   │   └── Footer.jsx
│   │
│   ├── components/
│   │   ├── AnimatedGradient.jsx     # Gradient background
│   │   ├── TerminalAnimation.jsx    # CLI demo
│   │   ├── FlowDiagram.jsx          # Interactive flow
│   │   ├── FeatureCard.jsx          # 3D hover card
│   │   ├── Counter.jsx              # Number animation
│   │   └── PricingCard.jsx          # Pricing tier
│   │
│   ├── animations/
│   │   └── variants.js              # Framer Motion variants
│   │
│   ├── App.jsx
│   └── index.jsx
│
├── public/
│   ├── demo-video.mp4               # Hero video
│   └── assets/
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── Dockerfile
```

### package.json

```json
{
  "name": "marketing-landing",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.4",
    "react-type-animation": "^3.2.0",
    "react-countup": "^6.5.0",
    "react-intersection-observer": "^9.5.3",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.5",
    "@vitejs/plugin-react": "^4.2.0"
  }
}
```

### Дизайн-система (из Design.md)

```css
/* Применяем к лендингу */
:root {
  /* Primary */
  --primary-600: #0F6CBD;
  --primary-700: #2B579A;
  --primary-800: #002050;
  
  /* Gradient для Hero */
  --gradient-start: #667eea;
  --gradient-mid: #764ba2;
  --gradient-end: #f093fb;
  
  /* Dark sections */
  --dark-bg: #1F2937;
  --dark-text: #F5F7FA;
}
```

### Key Components

#### HeroSection.jsx
```jsx
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 animate-gradient-shift" />
      
      {/* Particles */}
      <Particles className="absolute inset-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-6xl font-bold mb-6">
            Продавайте через Shopify<br />
            <TypeAnimation
              sequence={[
                'и Amazon',
                2000,
                'и AI агентов',
                2000,
                'и WooCommerce',
                2000,
              ]}
              repeat={Infinity}
              className="text-yellow-300"
            />
          </h1>
          
          <p className="text-2xl mb-8 text-blue-100">
            Автоматическая интеграция с TAP протоколом за 5 минут
          </p>
          
          <div className="flex gap-4 justify-center">
            <button className="btn-primary-large">
              Начать бесплатно
            </button>
            <button className="btn-secondary-large">
              Посмотреть демо
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
```

#### TerminalAnimation.jsx
```jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TerminalAnimation = () => {
  const [lines, setLines] = useState([]);
  
  const commands = [
    { text: '$ agent-platform init', delay: 0 },
    { text: 'Connecting to Shopify...', delay: 1000 },
    { text: '✓ Shopify connected: mystore.myshopify.com', delay: 2000 },
    { text: '✓ Generating TAP keys (Ed25519)...', delay: 3000 },
    { text: '✓ Agent registered in Agent Registry', delay: 4000 },
    { text: '🎉 Ready to sell through AI agents!', delay: 5000 },
  ];
  
  useEffect(() => {
    commands.forEach(({ text, delay }) => {
      setTimeout(() => {
        setLines(prev => [...prev, text]);
      }, delay);
    });
  }, []);
  
  return (
    <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-400 mb-2"
        >
          {line}
        </motion.div>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="text-green-400"
      >
        ▊
      </motion.span>
    </div>
  );
};
```

#### FlowDiagram.jsx
```jsx
import { motion } from 'framer-motion';

export const FlowDiagram = () => {
  return (
    <div className="relative py-12">
      <svg className="w-full h-64" viewBox="0 0 1000 200">
        {/* Shopify */}
        <motion.g
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <rect x="50" y="75" width="120" height="50" rx="8" 
                fill="#0F6CBD" />
          <text x="110" y="105" fill="white" textAnchor="middle">
            Shopify
          </text>
        </motion.g>
        
        {/* Animated dots flowing */}
        <motion.circle
          cx="0" cy="100" r="4" fill="#667eea"
          animate={{ cx: [170, 500] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        
        {/* Platform */}
        <motion.g
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <rect x="400" y="75" width="140" height="50" rx="8" 
                fill="#764ba2" />
          <text x="470" y="105" fill="white" textAnchor="middle">
            Platform
          </text>
        </motion.g>
        
        {/* TAP */}
        <motion.g
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <rect x="700" y="75" width="100" height="50" rx="8" 
                fill="#10B981" />
          <text x="750" y="105" fill="white" textAnchor="middle">
            TAP
          </text>
        </motion.g>
        
        {/* AI Agents */}
        <motion.g
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <rect x="850" y="75" width="120" height="50" rx="8" 
                fill="#F59E0B" />
          <text x="910" y="105" fill="white" textAnchor="middle">
            AI Agents
          </text>
        </motion.g>
      </svg>
    </div>
  );
};
```

### Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3002"]
```

### Порт: 3002

---

## 2. Platform Frontend - Админка для мерчантов

### Концепция

**Цель:** Управление бизнесом, настройка интеграций, аналитика

**Tone of Voice:**
- Профессиональный, четкий
- Enterprise-style (как Azure, Salesforce)
- Функциональность > красота

**Дизайн:** По Design.md - синий, белый фон, карточки, минимализм

### Структура

```
platform-frontend/
├── src/
│   ├── pages/
│   │   ├── DashboardPage.jsx        # Overview + metrics
│   │   ├── IntegrationsPage.jsx     # Shopify/Amazon setup
│   │   ├── AnalyticsPage.jsx        # Charts + tables
│   │   ├── OnboardingPage.jsx       # First-time setup wizard
│   │   └── SettingsPage.jsx         # Profile, API keys
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx          # Navigation
│   │   │   ├── Header.jsx           # User menu
│   │   │   └── Layout.jsx           # Main wrapper
│   │   │
│   │   ├── integrations/
│   │   │   ├── IntegrationCard.jsx  # Platform card
│   │   │   ├── ShopifySetup.jsx     # Shopify wizard
│   │   │   └── TAPStatus.jsx        # TAP config display
│   │   │
│   │   ├── analytics/
│   │   │   ├── OrdersChart.jsx      # Line/bar charts
│   │   │   ├── MetricsCards.jsx     # KPI cards
│   │   │   └── OrdersTable.jsx      # Data table
│   │   │
│   │   └── onboarding/
│   │       └── SetupWizard.jsx      # 3-step wizard
│   │
│   ├── services/
│   │   └── api.js                   # API calls to platform-api
│   │
│   ├── context/
│   │   └── AuthContext.jsx          # Merchant auth
│   │
│   ├── App.jsx
│   └── index.jsx
│
├── package.json
└── Dockerfile
```

### Key Pages

#### 1. OnboardingPage (первый вход)

```jsx
// 3-шаговый мастер
Step 1: Business Info
  - Name, Email, Region (KZ, UZ)

Step 2: Choose Platform
  - [x] Shopify
  - [ ] Amazon (coming soon)

Step 3: Auto-setup TAP
  - Progress bar
  - ✓ Keys generated
  - ✓ Agent registered
  - ✓ Ready!
```

#### 2. DashboardPage

```jsx
// Metrics overview
┌────────────────────────────────────────┐
│ Заказы сегодня: 15                     │
│ Активные платформы: Shopify            │
│ TAP заказы: 3 (20%)                    │
└────────────────────────────────────────┘

┌──────────────┬──────────────────────────┐
│ Интеграции   │ Последние заказы         │
│              │                          │
│ Shopify ✓    │ #1234 - $150 (AI)       │
│ Amazon ⏳    │ #1235 - $200 (Web)      │
└──────────────┴──────────────────────────┘
```

#### 3. IntegrationsPage

```jsx
// Управление платформами
┌─────────────────────────────────────┐
│ Shopify                             │
│ Status: ✓ Active                    │
│ Store: mystore.myshopify.com       │
│ Products: 50 synced                │
│ [Configure] [Disconnect]           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ TAP Protocol                        │
│ Status: ✓ Active                    │
│ Agent ID: agent-123abc             │
│ Public Key: Ed25519:abc...xyz      │
│ [Regenerate Keys]                  │
└─────────────────────────────────────┘
```

#### 4. AnalyticsPage

```jsx
// Charts + filters
Filters: [7 days ▼] [All platforms ▼]

┌────────────────────────────────────┐
│ Orders Chart (last 7 days)        │
│ ████████████                       │
└────────────────────────────────────┘

Table:
Date       | Platform | AI Agent | Amount
2024-01-20 | Shopify  | Yes      | $150
2024-01-20 | Shopify  | No       | $200
```

### Технический стек

```json
{
  "framework": "React 18 + Vite",
  "styling": "Tailwind CSS",
  "routing": "React Router v6",
  "state": "Context API",
  "charts": "Recharts",
  "icons": "Lucide React",
  "forms": "React Hook Form"
}
```

### package.json

```json
{
  "name": "platform-frontend",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "recharts": "^2.10.3",
    "react-hook-form": "^7.48.2",
    "lucide-react": "^0.294.0",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.5",
    "@vitejs/plugin-react": "^4.2.0"
  }
}
```

### API Service

```javascript
// services/api.js

const API_BASE = 'http://localhost:8003';

export const platformAPI = {
  // Auth
  login: async (email, password) => {
    return await axios.post(`${API_BASE}/auth/login`, { email, password });
  },
  
  // Merchants
  registerMerchant: async (data) => {
    return await axios.post(`${API_BASE}/merchants/register`, data);
  },
  
  getMerchant: async (merchantId) => {
    return await axios.get(`${API_BASE}/merchants/${merchantId}`);
  },

  // Integrations
  setupShopify: async (merchantId, credentials) => {
    return await axios.post(`${API_BASE}/integrations/shopify/setup`, {
      merchantId,
      credentials
    });
  },

  getIntegrations: async (merchantId) => {
    return await axios.get(`${API_BASE}/integrations/${merchantId}`);
  },
  
  // Analytics
  getAnalytics: async (merchantId, filters) => {
    return await axios.get(`${API_BASE}/analytics/${merchantId}`, {
      params: filters
    });
  }
};
```

### Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3001"]
```

### Порт: 3001

---

## 3. Merchant Frontend - Витрина (уже есть)

**Существующее приложение - не трогаем**

- Products page
- Cart
- Checkout
- Orders

**Порт: 3000**

---

## Docker Compose

```yaml
# docker-compose.yml (добавить фронтенды)

services:
  # Marketing Landing
  marketing-landing:
    build: ./marketing-landing
    ports:
      - "3002:3002"
    environment:
      - VITE_PLATFORM_URL=http://localhost:3001

  # Platform Frontend (админка)
  platform-frontend:
    build: ./platform-frontend
    ports:
      - "3001:3001"
    environment:
      - VITE_API_URL=http://localhost:8003
    depends_on:
      - platform-api

  # Merchant Frontend (витрина) - уже есть
  merchant-frontend:
    build: ./merchant-frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:8001
    depends_on:
      - merchant-backend
```

---

## Резюме

| Приложение | Цель | Пользователи | Порт | Стек |
|-----------|------|-------------|------|------|
| **marketing-landing** | Привлечение мерчантов | Не залогиненные | 3002 | React + Framer Motion |
| **platform-frontend** | Управление бизнесом | Мерчанты (админы) | 3001 | React + Recharts |
| **merchant-frontend** | Покупка товаров | Покупатели | 3000 | React (есть) |

---

## Workflow

### Путь мерчанта:

```
1. Открывает marketing-landing (3002)
   - Видит крутой лендинг с анимациями
   - Кликает "Начать бесплатно"

2. Редирект на platform-frontend/register (3001)
   - Регистрация
   - Onboarding wizard (3 шага)

3. Работает в platform-frontend (3001)
   - Dashboard
   - Настройка Shopify
   - Просмотр аналитики

4. Покупатели заходят на merchant-frontend (3000)
   - Видят товары мерчанта
   - Покупают через AI агентов
```

### Путь покупателя:

```
1. AI агент → Shopify Plugin → merchant-frontend (3000)
2. Выбор товаров → Checkout → Заказ
3. Данные → platform-api → мерчант видит в аналитике
```

---

## Git Strategy

```bash
# Создать ветку для фронтендов
git checkout -b feature/frontend-apps

# Структура коммитов
1. feat: add marketing-landing with animations
2. feat: add platform-frontend admin dashboard
3. feat: integrate frontends with docker-compose
4. docs: update Frontend.md
```

---

## Следующие шаги

### 1. Marketing Landing (приоритет 1)
- [ ] Setup Vite + React
- [ ] Implement HeroSection с gradient
- [ ] Add TerminalAnimation
- [ ] FlowDiagram с анимацией
- [ ] FeaturesSection с 3D cards
- [ ] PricingSection
- [ ] Dockerfile + docker-compose

### 2. Platform Frontend (приоритет 2)
- [ ] Setup Vite + React Router
- [ ] Layout (Sidebar + Header)
- [ ] OnboardingPage (wizard)
- [ ] DashboardPage (metrics)
- [ ] IntegrationsPage (Shopify setup)
- [ ] AnalyticsPage (charts)
- [ ] API integration
- [ ] Dockerfile + docker-compose

### 3. Testing
- [ ] E2E тест: лендинг → регистрация → dashboard
- [ ] Responsive design (mobile)
- [ ] Performance (Lighthouse)

---

## Ключевые отличия

| Аспект | Marketing Landing | Platform Frontend |
|--------|------------------|------------------|
| Дизайн | Яркий, градиенты, анимации | Минимализм, белый, синий |
| Цель | Конвертировать в регистрацию | Работать с платформой |
| Анимации | Много (wow-эффект) | Минимум (функциональность) |
| Контент | Продающий текст | Данные, формы, таблицы |
| Референсы | Stripe, Vercel, Linear | Azure, Salesforce |

---

**Готово!** Теперь у нас четкая архитектура для трех фронтендов. Начнем с лендинга - он проще и быстрее сделать, плюс сразу создаст "wow" эффект на хакатоне. 🚀
