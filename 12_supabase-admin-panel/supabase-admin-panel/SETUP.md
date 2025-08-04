# 🚀 Быстрая установка в существующий Git репозиторий

## 📁 Структура после копирования:

```
your-main-repo/
├── project-1/
├── project-2/
├── supabase-admin-panel/     # ← Этот проект
│   ├── src/
│   ├── package.json
│   ├── README.md
│   └── ...
└── other-projects/
```

## ⚡ Быстрый старт:

### 1. Установка зависимостей:
```bash
cd supabase-admin-panel
npm install
```

### 2. Настройка Supabase:
```bash
cp .env.example .env
# Заполните .env файл своими ключами
```

### 3. Запуск:
```bash
npm run dev
```

## 🔧 Настройка переменных окружения:

Создайте `.env` файл:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 📚 Полная документация:

Смотрите `README.md` для подробной документации по:
- Настройке Supabase
- Системе авторизации
- Переиспользованию в других проектах
- Деплою

## 🔄 Переиспользование авторизации:

Для копирования в другие проекты:
```bash
# Скопировать систему авторизации
cp -r src/contexts/ ../your-new-project/src/
cp -r src/components/auth/ ../your-new-project/src/components/
```

Готово! 🎉