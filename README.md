# Park Monitoring - Docker Setup

## Быстрый старт

### Опция 1: Docker Compose (Production-like)

```bash
# Собрать и запустить оба сервиса
make build
make up

# Или одной командой
docker-compose up --build
```

Доступно:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- API Docs: http://localhost:8080/swagger

### Опция 2: Development режим (локальный npm dev)

```bash
# Запустить только бэкенд в Docker, фронтенд локально
make dev
```

Или вручную:
```bash
# Терминал 1: Backend
docker-compose up backend

# Терминал 2: Frontend
cd client
npm run dev
```

## Доступные команды

```bash
make help          # Показать все команды
make build         # Собрать образы
make up            # Запустить сервисы
make down          # Остановить сервисы
make restart       # Перезапустить сервисы
make logs          # Просмотр логов всех сервисов
make logs-backend  # Логи бэкенда
make logs-frontend # Логи фронтенда
make clean         # Удалить контейнеры и volume'ы
make ps            # Показать статус контейнеров
```

## Структура

```
docker-compose.yml    - Конфигурация для запуска обоих сервисов
client/Dockerfile     - Frontend (React + Vite)
server/BFFTestMock/   - Backend (C# .NET)
Makefile              - Удобные команды
```

## Переменные окружения

Frontend может использовать переменную:
- `VITE_API_URL` - URL бэкенда (по умолчанию: http://localhost:8080)

## Troubleshooting

**CORS ошибки:**
- CORS настроена на бэкенде для `http://localhost:3000`
- Убедитесь, что обе службы запущены

**Port уже занят:**
```bash
docker-compose down -v
```

**Пересобрать без кэша:**
```bash
make build-rebuild
```

**Очистить все:**
```bash
make clean
```
