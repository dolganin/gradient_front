# [ГРАД]иент

Одностраничный React-лендинг для регистрации на конференцию без бэкенда.

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт будет доступен на `http://localhost:4252`.

## Docker

```bash
docker build -t gradient-landing .
docker run --rm -p 4252:4252 gradient-landing
```

## Структура

- `src/App.jsx` — контент и секции лендинга
- `src/styles.css` — визуальная система на основе `test.md` с новой палитрой
- `Dockerfile` — контейнер для запуска Vite на порту `4252`
