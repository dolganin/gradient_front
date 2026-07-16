# [ГРАД]иент

Одностраничный React-лендинг для регистрации на конференцию с backend API.

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт будет доступен на `http://localhost:4252`.

## Docker Compose для сервера

```bash
docker compose up -d --build
```

Снаружи публикуется только порт `80`: сайт доступен на `http://localhost/` или по IP/домену сервера.
Backend работает только внутри docker-сети на `backend:4253`, а запросы `/api/*` проксируются через nginx во frontend-контейнере.

Для записи заявок в Google Sheets перед запуском задайте переменную окружения:

```bash
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/..." docker compose up -d --build
```

## Структура

- `src/App.jsx` — контент и секции лендинга
- `src/styles.css` — визуальная система на основе `test.md` с новой палитрой
- `Dockerfile` — production-сборка фронта и nginx на порту `80`
- `nginx.conf` — отдача SPA и проксирование `/api` во внутренний backend
- `backend/` — Express API для регистрации
