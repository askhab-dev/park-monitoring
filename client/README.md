## Park Monitoring – client

Фронтенд‑часть проекта Park Monitoring – админ‑панель для мониторинга парка вендинговых автоматов:

- **Обзор состояния парка**: количество автоматов, работающие/с ошибками/с низким остатком.
- **Карта**: расположение автоматов на карте Яндекса.
- **Аналитика продаж**: графики и карточки по объёмам продаж, популярным товарам и времени пиковых продаж.

Стек: **React 18**, **TypeScript**, **Vite**, **SWR**, **recharts**, **framer-motion**, CSS Modules.

---

## Быстрый старт (локально)

```bash
cd client
npm install

# Дев‑режим
npm run dev
```

По умолчанию приложение доступно по адресу `http://localhost:3000`.

Бэкенд по умолчанию ожидается на `http://localhost:8080` (можно переопределить через `VITE_API_URL`).

### Production сборка

```bash
cd client
npm run build   # сборка TypeScript + Vite
npm run preview # локальный просмотр production‑сборки
```

---

## Переменные окружения

Файл: `.env` (или `.env.local` и т.п.)

- **`VITE_API_URL`** – базовый URL API бэкенда.  
  По умолчанию в `src/shared/lib/api.ts` используется `http://localhost:8080`.

Пример:

```bash
VITE_API_URL=http://localhost:8080
```

---

## Архитектура и структура каталогов

Фронтенд организован по мотивам FSD:

```text
client/
  src/
    app/        # Входная точка приложения, корневые провайдеры
    pages/      # Страницы (routes)
    widgets/    # Крупные UI‑блоки (header, left menu)
    features/   # Бизнес‑фичи (monitoring и т.д.)
    shared/     # Переиспользуемые блоки, UI‑компоненты и утилиты
```

### `app/`

- `app/App.tsx` – корневой компонент приложения.
  - Оборачивает дерево в `SWRConfig` с общими настройками работы с API.
  - Рендерит страницу `AdminMonitoring`.
- `app/index.ts` – реэкспорт `App`.

### `pages/`

- `pages/AdminMonitoring` – основная страница админ‑панели.
  - Состав страницы:
    - `Header` (`widgets/Header`)
    - `LeftMenu` (`widgets/LeftMenu`)
    - `InnerMenu` (внутренняя навигация по разделам)
    - `Monitoring` (`features/monitoring`)

### `widgets/`

- `widgets/Header` – верхняя панель:
  - Логотип (`LogoLink`).
  - Навигация по паркам (`ParksNavigation` + `useParkSelection`).
  - Поиск (`Search` с хоткеем `Shift + S`).
  - Блок последнего обновления (`LastUpdate`).
  - Уведомления (`Notifications`).
  - Профиль пользователя (`Profile` с анимированным попапом на `framer-motion`).
- `widgets/LeftMenu` – левое вертикальное меню с иконками разделов.

### `features/`

Сейчас основная фича – **monitoring**:

- `features/monitoring/ui/Monitoring/Monitoring.tsx` – контейнер мониторинга:
  - `PeriodSwitcher` – выбор периода данных.
  - `StatsRow` – сводные карточки по автоматам.
  - `Map` – карта Яндекса с параметрами автоматов.
  - `VMParamsSwitcher` – переключатель параметров на карте.
  - `StatsReview` – обзор состояния автоматов.
  - `Analytics` – аналитический блок (графики и топы).

#### `StatsRow`

- Тянет данные из `/machines/overview` через `useApi`.
- Отрисовывает несколько `StatItem` с подсчитанными процентами (с защитой от деления на ноль).

#### `StatsReview`

Состоит из трёх под‑виджетов:

- `SalesIndex` – индекс продаж.
- `ProductFilling` – заполненность товарами.
- `MoneyFilling` – денежная наполненность.

#### `Analytics`

- Использует `recharts` для графика пиковых продаж (`PeakSales`).
- Два блока с колонками и статистикой:
  - `SalesVolumes` – ТА по объёмам продаж.
  - `PopulatItems` – популярные товары/категории.
- Для переключения режимов/представлений используется `MultiSwitcher` из `shared/ui`.

### `shared/`

- `shared/lib/api.ts`
  - `BASE_API_URL` – базовый URL, читает `import.meta.env.VITE_API_URL` или `http://localhost:8080`.
  - `fetcher` – общий fetch‑хелпер, выбрасывает `Error` при `!res.ok`.
- `shared/hooks/useApi.ts`
  - Обёртка над `useSWR`, использующая общий `fetcher`.
  - Используется всеми фичами, которые запрашивают данные у API.
- `shared/ui/`
  - `Loader` – универсальный спиннер‑компонент:
    - По центру контейнера, с анимированным кружком.
    - Поддерживает `message` и `fullscreen`‑режим (для корневых загрузок).
  - `Error` – стандартное сообщение об ошибке запроса.
  - `MultiSwitcher` – переключатель вариантов (кнопки‑табы).
  - `ReportButton` – кнопка “Сообщить о проблеме” / отправка отчёта.
  - `StatItem` – карточка со значением + статусом (good/warning/danger).

---

## Работа с API и данными

### SWR и `useApi`

Для большинства запросов к API используется **SWR**:

- Глобальные настройки задаются в `App.tsx` через `SWRConfig`:
  - `revalidateOnFocus: false` – нет лишних запросов при фокусе на вкладку.
  - `revalidateOnReconnect: true` – обновление при восстановлении соединения.
  - `shouldRetryOnError: false` – без агрессивных повторов при ошибке.
  - `dedupingInterval: 10000` – дублирующие запросы в течение 10 сек. “слипаются”.
- Хук `useApi<T>(url: string)`:
  - Возвращает стандартный объект `SWRResponse<T, Error>`.
  - В фичах через него извлекаются `data`, `error`, `isLoading`.

Типичный паттерн использования:

```ts
const { data, error, isLoading } = useApi<MyResponse>('/some-endpoint');

if (error) return <ErrorMessage />;
if (isLoading || !data) return <Loader />;

// основной рендер с данными
```

---

## Стили и UI

- Стили пишутся через **CSS Modules** (`*.module.css`).
- Глобальные базовые стили и CSS‑переменные – в `src/index.css`:
  - Подключение шрифта **Montserrat** через `<link>` в `index.html`.
  - CSS‑переменные типа `--bg-brand`, `--border-secondary` для единообразия темы.
- Иконки:
  - SVG‑иконки подключаются как React‑компоненты (`?react`) через `vite-plugin-svgr`.

---

## Docker

Для фронтенда есть `client/Dockerfile`.  
Рекомендуемый способ запуска всего проекта описан в корневом `README.md` (Docker Compose + Makefile).

Кратко:

- Фронтенд собирается Vite и раздаётся статикой из контейнера.

---

## Рекомендации по разработке

- **Новые фичи**:
  - Раскладывать по FSD: `features/<featureName>`, `widgets/<WidgetName>`, `shared` – только максимально переиспользуемые вещи.
- **Запросы**:
  - Все новые вызовы API – через `useApi` + общий `fetcher`.
  - Не дублировать настройки SWR локально, по возможности использовать глобальные.
- **UI/UX**:
  - При асинхронной загрузке – использовать `Loader`.
  - Для ошибок – `ErrorMessage`.
  - Для сложных анимаций – `framer-motion` по аналогии с `Profile`.
