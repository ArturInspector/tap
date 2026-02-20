# Design System

## Концепция

**Профессиональный enterprise-дизайн для B2B SaaS платформы**

Вдохновение: Microsoft Azure, Stripe, Salesforce  
Принцип: Доверие, стабильность, простота

---

## Цветовая палитра

### Основные цвета

```css
/* Primary - Синий (доверие, технологии) */
--primary-600: #0F6CBD;      /* Основные кнопки, ссылки */
--primary-700: #2B579A;      /* Hover состояния */
--primary-800: #002050;      /* Заголовки, акценты */

/* Neutral - Серый (текст, фоны) */
--neutral-50:  #F5F7FA;      /* Фон карточек, секций */
--neutral-100: #E5E7EB;      /* Borders, разделители */
--neutral-600: #4A5568;      /* Основной текст */
--neutral-700: #374151;      /* Темный текст */
--neutral-900: #1F2937;      /* Заголовки */

/* Background */
--bg-primary:   #FFFFFF;     /* Основной фон */
--bg-secondary: #F5F7FA;     /* Альтернативный фон */
```

### Функциональные цвета

```css
/* Success */
--success-600: #10B981;      /* Успешные операции */
--success-700: #059669;      /* Hover */

/* Warning */
--warning-600: #F59E0B;      /* Предупреждения */
--warning-700: #D97706;      /* Hover */

/* Error */
--error-600:   #EF4444;      /* Ошибки */
--error-700:   #DC2626;      /* Hover */

/* Info */
--info-600:    #3B82F6;      /* Информация */
--info-700:    #2563EB;      /* Hover */
```

### Применение

| Элемент | Цвет | Причина |
|---------|------|---------|
| Кнопки действий | `primary-600` | Призыв к действию |
| Текст основной | `neutral-600` | Читаемость |
| Заголовки H1-H2 | `neutral-900` | Иерархия |
| Фон карточек | `neutral-50` | Визуальное разделение |
| Success badges | `success-600` | Положительный feedback |
| Ссылки | `primary-600` | Узнаваемость |

**Психология:**  
Синий снижает тревожность при работе с финансами. Белый фон = низкая когнитивная нагрузка при многочасовой работе.

---

## Типографика

### Шрифты

```css
/* Системные шрифты (нет веб-загрузок = быстрее) */
--font-system: -apple-system, BlinkMacSystemFont, 
               "Segoe UI", "Roboto", "Oxygen", 
               "Ubuntu", "Cantarell", sans-serif;

/* Моноширинный (для кода, ключей) */
--font-mono: "SF Mono", Monaco, "Cascadia Code", 
             "Consolas", monospace;
```

### Шкала размеров

```css
/* Размеры */
--text-xs:   0.75rem;   /* 12px - метки, badges */
--text-sm:   0.875rem;  /* 14px - второстепенный текст */
--text-base: 1rem;      /* 16px - основной текст */
--text-lg:   1.125rem;  /* 18px - лиды, интро */
--text-xl:   1.25rem;   /* 20px - заголовки H4 */
--text-2xl:  1.5rem;    /* 24px - заголовки H3 */
--text-3xl:  1.875rem;  /* 30px - заголовки H2 */
--text-4xl:  2.25rem;   /* 36px - заголовки H1 */

/* Высота строки */
--leading-tight:  1.25;  /* Заголовки */
--leading-normal: 1.5;   /* Основной текст */
--leading-relaxed: 1.75; /* Длинные тексты */

/* Вес */
--font-normal:  400;
--font-medium:  500;
--font-semibold: 600;
--font-bold:    700;
```

### Примеры

```html
<!-- H1: Главная страница -->
<h1 class="text-4xl font-bold text-neutral-900">
  Добро пожаловать в платформу
</h1>

<!-- H2: Секции -->
<h2 class="text-3xl font-semibold text-neutral-900">
  Интеграции
</h2>

<!-- Body: Основной текст -->
<p class="text-base text-neutral-600 leading-normal">
  Подключите Shopify за 5 минут
</p>

<!-- Label: Формы -->
<label class="text-sm font-medium text-neutral-700">
  Название магазина
</label>
```

---

## Spacing System

### Grid: 8px base unit

```css
--space-1: 0.25rem;  /*  4px */
--space-2: 0.5rem;   /*  8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

### Применение

- **Padding внутри кнопок:** `space-3` (12px) вертикально, `space-6` (24px) горизонтально
- **Gap между элементами формы:** `space-4` (16px)
- **Margin между секциями:** `space-12` (48px)
- **Padding карточек:** `space-6` (24px)

---

## Компоненты

### Кнопки

```css
/* Primary Button */
.btn-primary {
  background: var(--primary-600);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 150ms ease;
}

.btn-primary:hover {
  background: var(--primary-700);
  box-shadow: 0 4px 12px rgba(15, 108, 189, 0.2);
}

.btn-primary:active {
  background: var(--primary-800);
  transform: translateY(1px);
}

.btn-primary:disabled {
  background: var(--neutral-100);
  color: var(--neutral-600);
  cursor: not-allowed;
}

/* Secondary Button */
.btn-secondary {
  background: white;
  color: var(--primary-600);
  border: 1px solid var(--neutral-100);
}

.btn-secondary:hover {
  background: var(--neutral-50);
  border-color: var(--primary-600);
}
```

**Состояния:**
- Default: Основной цвет
- Hover: Темнее + тень
- Active: Еще темнее + сдвиг на 1px
- Disabled: Серый + курсор not-allowed

### Карточки

```css
.card {
  background: white;
  border: 1px solid var(--neutral-100);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: all 200ms ease;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-color: var(--neutral-100);
}

.card-header {
  margin-bottom: 16px;
  border-bottom: 1px solid var(--neutral-100);
  padding-bottom: 12px;
}
```

### Формы

```css
.input {
  border: 1px solid var(--neutral-100);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 1rem;
  color: var(--neutral-900);
  background: white;
  transition: all 150ms ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-600);
  box-shadow: 0 0 0 3px rgba(15, 108, 189, 0.1);
}

.input:disabled {
  background: var(--neutral-50);
  color: var(--neutral-600);
  cursor: not-allowed;
}

.input-error {
  border-color: var(--error-600);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

### Badges

```css
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-700);
}

.badge-warning {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning-700);
}

.badge-error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-700);
}
```

---

## Иконки

### Стиль: Outline/Линейные

**Библиотека:** [Lucide Icons](https://lucide.dev/) или [Heroicons](https://heroicons.com/)

**Размеры:**
```css
--icon-sm: 16px;   /* В тексте, badges */
--icon-md: 20px;   /* В кнопках, формах */
--icon-lg: 24px;   /* Заголовки секций */
--icon-xl: 32px;   /* Главные иконки */
```

**Цвета:**
- Основные: `neutral-600`
- Активные: `primary-600`
- Успех: `success-600`
- Ошибка: `error-600`

---

## Тени и глубина

```css
/* Subtle - карточки, inputs */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);

/* Medium - hover состояния */
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);

/* Large - модальные окна, dropdowns */
--shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.12);

/* Focus ring */
--shadow-focus: 0 0 0 3px rgba(15, 108, 189, 0.1);
```

**Принцип:** Тени должны быть едва заметны. Elevation через subtle shadows, не через яркость.

---

## Border Radius

```css
--radius-sm: 4px;    /* Маленькие элементы */
--radius-md: 8px;    /* Кнопки, inputs */
--radius-lg: 12px;   /* Карточки */
--radius-xl: 16px;   /* Большие контейнеры */
--radius-full: 9999px; /* Avatars, pills */
```

**Стандарт:** 8px для большинства элементов. Не использовать острые углы (0px) для UI элементов.

---

## Responsive Breakpoints

```css
/* Mobile first */
--screen-sm: 640px;   /* Tablets */
--screen-md: 768px;   /* Small laptops */
--screen-lg: 1024px;  /* Desktops */
--screen-xl: 1280px;  /* Large screens */
```

### Layout

```
Mobile (< 640px):
  - Одна колонка
  - Стек элементов
  - Sidebar = drawer

Tablet (640px - 1024px):
  - Две колонки
  - Меньше padding

Desktop (> 1024px):
  - Sidebar + content
  - Максимум контента: 1280px
  - Центрирование
```

---

## Accessibility

### Контрастность

**WCAG AA стандарт (минимум 4.5:1):**

```
✓ neutral-900 на white: 16:1
✓ neutral-600 на white: 7:1
✓ primary-600 на white: 4.7:1
✓ white на primary-600: 4.7:1
```

### Focus States

```css
/* Все интерактивные элементы */
*:focus-visible {
  outline: 2px solid var(--primary-600);
  outline-offset: 2px;
}
```

### Screen Readers

```html
<!-- Кнопки с иконками -->
<button aria-label="Закрыть">
  <XIcon />
</button>

<!-- Loading состояния -->
<div role="status" aria-live="polite">
  Загрузка...
</div>
```

---

## Tone of Voice

### В интерфейсе

**Принципы:**
- Ясно и прямо (без жаргона)
- Профессионально, но дружелюбно
- Поддерживающе (особенно в ошибках)

**Примеры:**

```
❌ Плохо: "Ошибка 500. Internal server error"
✓ Хорошо: "Не удалось подключиться к Shopify. Проверьте API ключи"

❌ Плохо: "Success"
✓ Хорошо: "Магазин успешно подключен!"

❌ Плохо: "Invalid credentials"
✓ Хорошо: "Проверьте правильность введенных данных"
```

### Мультиязычность

**Поддержка:**
- Русский (основной для ЦА)
- Казахский
- Узбекский
- Английский

**Требования к UI:**
- Flex-контейнеры (текст может быть длиннее)
- Избегать fixed width для текстовых блоков
- RTL не требуется (все языки LTR)

---

## Анимации

### Принципы

- **Быстрые:** 150-200ms для feedback
- **Плавные:** ease или ease-out
- **Целенаправленные:** анимация должна помогать понять изменение

```css
/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;

/* Примеры */
.button {
  transition: all var(--transition-fast);
}

.card {
  transition: box-shadow var(--transition-base);
}

.drawer {
  transition: transform var(--transition-slow);
}
```

### Micro-interactions

```css
/* Button press */
.btn:active {
  transform: translateY(1px);
}

/* Card lift */
.card:hover {
  transform: translateY(-2px);
}

/* Loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Примеры компонентов

### Integration Card

```jsx
<div class="card">
  <div class="flex items-center gap-4">
    <div class="icon-container">
      <ShopifyIcon size="32" />
    </div>
    <div class="flex-1">
      <h3 class="text-xl font-semibold text-neutral-900">
        Shopify
      </h3>
      <p class="text-sm text-neutral-600">
        mystore.myshopify.com
      </p>
    </div>
    <span class="badge badge-success">
      Активен
    </span>
  </div>
  
  <div class="mt-6 grid grid-cols-2 gap-4">
    <div>
      <p class="text-sm text-neutral-600">Товаров</p>
      <p class="text-2xl font-bold text-neutral-900">50</p>
    </div>
    <div>
      <p class="text-sm text-neutral-600">Заказов</p>
      <p class="text-2xl font-bold text-neutral-900">12</p>
    </div>
  </div>
  
  <div class="mt-6 flex gap-3">
    <button class="btn-secondary flex-1">
      Настройки
    </button>
    <button class="btn-primary flex-1">
      Синхронизировать
    </button>
  </div>
</div>
```

### Empty State

```jsx
<div class="text-center py-12">
  <div class="inline-flex items-center justify-center w-16 h-16 
              rounded-full bg-neutral-50 mb-4">
    <PackageIcon class="text-neutral-600" size="32" />
  </div>
  
  <h3 class="text-xl font-semibold text-neutral-900 mb-2">
    Нет активных интеграций
  </h3>
  
  <p class="text-neutral-600 mb-6 max-w-sm mx-auto">
    Подключите Shopify или другую платформу, 
    чтобы начать продавать через AI агентов
  </p>
  
  <button class="btn-primary">
    Добавить интеграцию
  </button>
</div>
```

---

## Чеклист внедрения

### Для разработчиков

- [ ] Используй CSS переменные из этого документа
- [ ] Все интерактивные элементы имеют hover/focus/active
- [ ] Минимум 4.5:1 контраст для текста
- [ ] Mobile-first подход
- [ ] Системные шрифты (не загружай веб-шрифты)
- [ ] 8px grid для spacing
- [ ] Transitions 150-200ms
- [ ] aria-labels для иконочных кнопок

### Для дизайнеров

- [ ] Используй только цвета из палитры
- [ ] Проверь контрастность в WebAIM
- [ ] Spacing кратен 8px
- [ ] Border radius: 8px для UI, 12px для карточек
- [ ] Иконки: outline стиль, 20-24px
- [ ] Тени: subtle, не яркие
- [ ] Мультиязычность: flex-контейнеры

---

## Инструменты

**Проверка контраста:**  
https://webaim.org/resources/contrastchecker/

**Иконки:**  
https://lucide.dev/ или https://heroicons.com/

**Цвета:**  
https://tailwindcss.com/docs/customizing-colors (как референс)

**Прототипирование:**  
Figma, использовать Auto Layout с 8px grid

---

## Заключение

Эта дизайн-система создана для обеспечения:
- **Доверия:** через профессиональные цвета и типографику
- **Консистентности:** единый стиль во всех продуктах
- **Accessibility:** все могут использовать платформу
- **Скорости разработки:** готовые компоненты и переменные

**При сомнениях:** проще = лучше. Меньше цветов, меньше анимаций, больше белого пространства.



