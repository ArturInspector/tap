# Docker Setup для Trusted Agent Protocol

## Быстрый старт

### Требования
- Docker 20.10+
- Docker Compose 2.0+
- 4GB+ свободной RAM
- 10GB+ свободного места на диске

### Запуск всех сервисов

```bash
# Клонировать репозиторий (если еще не сделано)
git clone <repository-url>
cd tap

# Запустить все сервисы
docker-compose up -d

# Проверить статус
docker-compose ps
```

### Доступ к сервисам

После запуска сервисы будут доступны по следующим адресам:

- **Merchant Frontend**: http://localhost:3001
- **Merchant Backend API**: http://localhost:8000
- **Agent Registry**: http://localhost:8001
- **CDN Proxy**: http://localhost:3002
- **TAP Agent (Streamlit)**: http://localhost:8501

### Остановка сервисов

```bash
# Остановить все сервисы
docker-compose down

# Остановить и удалить volumes (БД будут удалены)
docker-compose down -v
```

## Настройка окружения

### Переменные окружения

Создайте файл `.env` в корне проекта (опционально):

```env
# Agent Registry
AGENT_REGISTRY_URL=http://agent-registry:8001

# Merchant Backend
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3003

# TAP Agent (нужно создать ключи)
RSA_PRIVATE_KEY=...
RSA_PUBLIC_KEY=...
ED25519_PRIVATE_KEY=...
ED25519_PUBLIC_KEY=...
```

### Генерация ключей для TAP Agent

Для работы TAP Agent нужны криптографические ключи. Создайте файл `tap-agent/.env`:

```bash
cd tap-agent
python3 -c "
from cryptography.hazmat.primitives.asymmetric import rsa, ed25519
from cryptography.hazmat.primitives import serialization
import base64

# Генерация RSA ключей
rsa_private = rsa.generate_private_key(public_exponent=65537, key_size=2048)
rsa_public = rsa_private.public_key()

rsa_private_pem = rsa_private.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.PKCS8,
    encryption_algorithm=serialization.NoEncryption()
).decode('utf-8')

rsa_public_pem = rsa_public.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo
).decode('utf-8')

# Генерация Ed25519 ключей
ed25519_private = ed25519.Ed25519PrivateKey.generate()
ed25519_public = ed25519_private.public_key()

ed25519_private_bytes = ed25519_private.private_bytes(
    encoding=serialization.Encoding.Raw,
    format=serialization.PrivateFormat.Raw,
    encryption_algorithm=serialization.NoEncryption()
)

ed25519_public_bytes = ed25519_public.public_bytes(
    encoding=serialization.Encoding.Raw,
    format=serialization.PublicFormat.Raw
)

ed25519_private_b64 = base64.b64encode(ed25519_private_bytes).decode('utf-8')
ed25519_public_b64 = base64.b64encode(ed25519_public_bytes).decode('utf-8')

print('RSA_PRIVATE_KEY=' + rsa_private_pem.replace('\n', '\\n'))
print('RSA_PUBLIC_KEY=' + rsa_public_pem.replace('\n', '\\n'))
print('ED25519_PRIVATE_KEY=' + ed25519_private_b64)
print('ED25519_PUBLIC_KEY=' + ed25519_public_b64)
" > .env
```

## Структура сервисов

### 1. Agent Registry (порт 8001)
Регистрация и управление AI агентами, хранение публичных ключей.

**Health check**: http://localhost:8001/

### 2. Merchant Backend (порт 8000)
FastAPI бэкенд для мерчанта, обработка заказов.

**Health check**: http://localhost:8000/health

**API Docs**: http://localhost:8000/docs

### 3. Merchant Frontend (порт 3001)
React/Vite фронтенд для демо-магазина.

**Главная**: http://localhost:3001

### 4. CDN Proxy (порт 3002)
Node.js прокси для проверки RFC 9421 подписей.

**Test endpoint**: http://localhost:3002/test-proxy

### 5. TAP Agent (порт 8501)
Streamlit приложение для генерации подписей и тестирования.

**Главная**: http://localhost:8501

## Логи и отладка

### Просмотр логов

```bash
# Все сервисы
docker-compose logs -f

# Конкретный сервис
docker-compose logs -f merchant-backend

# Последние 100 строк
docker-compose logs --tail=100 merchant-backend
```

### Пересборка после изменений

```bash
# Пересобрать конкретный сервис
docker-compose build merchant-backend

# Пересобрать и перезапустить
docker-compose up -d --build merchant-backend
```

### Вход в контейнер

```bash
# Войти в контейнер
docker-compose exec merchant-backend bash

# Выполнить команду
docker-compose exec merchant-backend python -m pytest
```

## Troubleshooting

### Проблема: Порт уже занят

```bash
# Проверить, что использует порт
lsof -i :8000

# Изменить порт в docker-compose.yml
ports:
  - "8001:8000"  # Внешний:Внутренний
```

### Проблема: Сервис не запускается

```bash
# Проверить логи
docker-compose logs service-name

# Проверить статус
docker-compose ps

# Пересобрать
docker-compose build --no-cache service-name
```

### Проблема: База данных не работает

```bash
# Удалить volumes и пересоздать
docker-compose down -v
docker-compose up -d
```

### Проблема: Недостаточно памяти

```bash
# Ограничить ресурсы в docker-compose.yml
services:
  merchant-backend:
    deploy:
      resources:
        limits:
          memory: 512M
```

## Production настройки

Для production рекомендуется:

1. **Использовать .env файлы** для секретов
2. **Настроить reverse proxy** (nginx/traefik)
3. **Включить SSL/TLS**
4. **Настроить мониторинг** (Prometheus, Grafana)
5. **Настроить логирование** (ELK stack)
6. **Использовать managed БД** вместо volumes

Пример production docker-compose:

```yaml
services:
  merchant-backend:
    restart: always
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
```

## Дополнительные команды

```bash
# Остановить все сервисы
docker-compose stop

# Запустить конкретный сервис
docker-compose up -d merchant-backend

# Удалить все (включая volumes)
docker-compose down -v --remove-orphans

# Показать использование ресурсов
docker stats

# Очистить неиспользуемые образы
docker system prune -a
```




