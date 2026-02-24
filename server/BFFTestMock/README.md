# BFFTestMock

Документация и инструкция по локальному запуску тестового mock-сервиса (ASP.NET Core).

## О проекте

`BFFTestMock` — небольшой HTTP-сервис на .NET 10, который предоставляет набор mock-эндпоинтов, возвращающих случайные (фиктивные) данные о вендинговых автоматах и продажах. Сервис использует минимальный API (top-level statements) и OpenAPI/Swagger для быстрого тестирования.

Ключевые маршруты (GET):

- `/machines/overview` — обзор автоматов
- `/sales/index-by-historic-avg` — индекс продаж
- `/machines/product-fill` — заполнение товарных позиций
- `/machines/money-fill` — заполнение монет/банкнот
- `/sales/by-vending-machine` — продажи по автоматам
- `/sales/by-product-type` — продажи по типам продуктов
- `/sales/peak-sale-count-per-day` — пиковое время продаж по дням

Swagger UI: `/swagger` (OpenAPI JSON: `/openapi/v1.json`).

Фреймворк: .NET 10 (TargetFramework `net10.0`).

## Предпосылки

- Установлен .NET SDK 10 (проверьте: `dotnet --info`).
- (Опционально) Docker для контейнеризации.

## Быстрый запуск локально (dotnet run)

1. Откройте терминал в папке проекта `BFFTestMock`:

```bash
cd /path/to/bfftestmock-main/BFFTestMock
```

2. Восстановите зависимости и запустите приложение:

```bash
dotnet restore
dotnet run --project BFFTestMock.csproj
```

По умолчанию профиль запуска в `Properties/launchSettings.json` задаёт `applicationUrl: http://localhost:5165`. После успешного запуска приложение будет доступно по адресу:

- API: http://localhost:5165
- Swagger UI: http://localhost:5165/swagger

Если хотите использовать другой порт при запуске вручную, можно указать параметр `--urls`:

```bash
dotnet run --project BFFTestMock.csproj --urls "http://localhost:5000"
```

Или задать переменную окружения:

```bash
ASPNETCORE_URLS="http://localhost:5000" dotnet run --project BFFTestMock.csproj
```

## Примеры запросов

Получить обзор автоматов:

```bash
curl http://localhost:5165/machines/overview
```

Получить продажи по автоматам:

```bash
curl http://localhost:5165/sales/by-vending-machine
```

Список всех доступных эндпоинтов виден в Swagger UI: `/swagger`.

## Сборка и запуск в Docker

1. Соберите образ (в каталоге `BFFTestMock`, где лежит `Dockerfile`):

```bash
docker build -t bfftestmock:latest .
```

2. Запустите контейнер и пробросьте порт `8080` (Dockerfile EXPOSE 8080):

```bash
docker run --rm -p 8080:8080 bfftestmock:latest
```

После старта сервис будет доступен на `http://localhost:8080` (Swagger UI — `http://localhost:8080/swagger`).

Примечание: в Docker-профиле `launchSettings.json` используется переменная `ASPNETCORE_HTTP_PORTS=8080`. Dockerfile также содержит строку `USER $APP_UID` — в некоторых окружениях при локальной сборке переменная `APP_UID` может быть не задана и это приведёт к ошибке сборки/запуска. В этом случае:

- временно удалите/закомментируйте строку `USER $APP_UID` в `Dockerfile`, или
- задайте корректную переменную окружения/аргумент в окружении, или
- запускать сервис локально через `dotnet run` (без Docker).

## Конфигурация и переменные окружения

- `ASPNETCORE_ENVIRONMENT` — профиль окружения (например, `Development`).
- `ASPNETCORE_URLS` или параметр `--urls` — для задания прослушиваемых URL.
- `ASPNETCORE_HTTP_PORTS` — используется в Docker-профиле (для указания порта контейнера).

## Тесты

В проекте нет встроенных unit-тестов. Для ручной проверки используйте Swagger UI и `curl`/Postman.

## Возможные проблемы и решения

- Порт занят: используйте другой порт через `--urls` или `ASPNETCORE_URLS`.
- Docker build падает из-за `USER $APP_UID`: см. раздел Docker выше.
- Требуется другая версия .NET: установите соответствующий SDK, указанный в `BFFTestMock.csproj`.

## Что дальше (рекомендации)

- Добавить unit/integration тесты для основных маршрутов.
- Добавить Docker Compose, если нужно запускать сервисы связно.
- Добавить CI-пайплайн для сборки/публикации образа.

---

Если нужно, могу добавить пример `docker-compose.yml`, тестовые запросы в формате HTTP файла (например, `BFFTestMock.http` уже содержит пример), или подготовить инструкции для развёртывания в Kubernetes.
