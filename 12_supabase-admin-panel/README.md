# 🔧 Supabase Admin Panel с Авторизацией

Современная веб-панель администратора для управления переменными в Supabase с **полноценной системой авторизации**, красивым интерфейсом и модульной архитектурой для переиспользования.

![Admin Panel](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4.1-blue) ![Supabase](https://img.shields.io/badge/Database-Supabase-green) ![Auth](https://img.shields.io/badge/Auth-Supabase_Auth-orange)

## ✨ Возможности

### 🔐 Система авторизации:
- **Регистрация и вход** через email/пароль
- **Восстановление пароля** через email
- **Автоматическое управление сессиями**
- **Защищенные маршруты** с AuthGuard
- **Красивые формы** с валидацией и обработкой ошибок
- **Модульная архитектура** для переиспользования

### 📊 Управление данными:
- **Просмотр текущих значений** переменных из Supabase
- **Обновление переменных** через удобную форму
- **Автоматическое обновление** данных
- **Безопасное API** через Supabase RLS
- **Только для авторизованных пользователей**

### 🎨 Интерфейс:
- **Современный UI** с Tailwind CSS
- **Адаптивный дизайн** для всех устройств
- **Темная/светлая тема** поддержка
- **Микро-анимации** и переходы
- **Интуитивная навигация**

## 🛠 Технологии

- **Frontend:** React 18 + TypeScript + Vite
- **Авторизация:** Supabase Auth (JWT токены)
- **База данных:** Supabase (PostgreSQL + RLS)
- **Стили:** Tailwind CSS
- **Иконки:** Lucide React
- **Деплой:** Netlify

## 📋 Требования

- Node.js 18+
- Аккаунт Supabase

## ⚙️ Настройка проекта

### 1. Клонирование репозитория

```bash
git clone <your-repo-url>
cd supabase-admin-panel
npm install
```

### 2. Настройка Supabase

#### 2.1 Создание проекта:
1. Зайдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Дождитесь завершения настройки

#### 2.2 Настройка авторизации:
1. **Authentication → Settings:**
   - ✅ Enable email confirmations: **OFF** (отключить подтверждение)
   - ✅ Enable email change confirmations: **OFF**
   - ✅ Enable phone confirmations: **OFF**

2. **Authentication → URL Configuration:**
   - Site URL: `http://localhost:5173` (для разработки)
   - Redirect URLs: `http://localhost:5173/**`

#### 2.3 Получение ключей:
- В панели Supabase: Settings → API
- Скопируйте `Project URL` и `anon public` ключ (НЕ service_role!)

### 3. Переменные окружения

```bash
cp .env.example .env
```

Заполните `.env` файл:
```env
VITE_SUPABASE_URL=https://ваш-проект.supabase.co
VITE_SUPABASE_ANON_KEY=ваш-anon-ключ
```

### 4. Настройка базы данных

Таблица и RLS политики создаются автоматически через миграции:

```bash
# Миграции применятся автоматически при первом запуске
npm run dev
```

**Структура таблицы `variables`:**
- `id` (UUID, Primary Key)
- `variable_1` (Text) - Первая переменная
- `variable_2` (Text) - Вторая переменная  
- `created_at` (Timestamp) - Время создания

**RLS Политики:**
- Только авторизованные пользователи могут читать данные
- Только авторизованные пользователи могут создавать записи

### 5. Локальная разработка

```bash
npm run dev
```

Приложение откроется на `http://localhost:5173`

**Первый запуск:**
1. Откройте приложение
2. Нажмите "Нет аккаунта? Зарегистрируйтесь"
3. Введите email и пароль
4. Сразу попадете в админ-панель (без подтверждения email)

## 🔐 Система авторизации

### Архитектура:

```
src/
├── contexts/
│   └── AuthContext.tsx          # ❤️ Основная логика авторизации
├── components/auth/
│   ├── AuthForm.tsx            # Форма входа/регистрации/восстановления
│   ├── AuthGuard.tsx           # Защита маршрутов
│   ├── LogoutButton.tsx        # Кнопка выхода
│   ├── LoadingSpinner.tsx      # Индикатор загрузки
│   └── index.ts               # Экспорты + документация
└── App.tsx                     # Основное приложение
```

### Использование в коде:

```typescript
import { useAuth } from './contexts/AuthContext';
import AuthGuard from './components/auth/AuthGuard';
import LogoutButton from './components/auth/LogoutButton';

function MyComponent() {
  const { user, signOut, loading } = useAuth();
  
  return (
    <AuthGuard>
      <div>
        <p>Привет, {user?.email}!</p>
        <LogoutButton showText={true} />
      </div>
    </AuthGuard>
  );
}
```

### Возможности авторизации:

- ✅ **Регистрация:** email + пароль (без подтверждения)
- ✅ **Вход:** email + пароль
- ✅ **Восстановление пароля:** через email
- ✅ **Автоматический выход:** при истечении токена
- ✅ **Защищенные маршруты:** через AuthGuard
- ✅ **Управление сессиями:** автоматически

## 🔄 Переиспользование авторизации

### Для нового проекта:

1. **Скопируйте файлы:**
   ```bash
   cp -r src/contexts/ new-project/src/
   cp -r src/components/auth/ new-project/src/components/
   ```

2. **Обновите Supabase настройки:**
   ```typescript
   // src/lib/supabase.ts
   const supabaseUrl = 'ваш-новый-url'
   const supabaseAnonKey = 'ваш-новый-anon-ключ'
   ```

3. **Оберните приложение:**
   ```typescript
   import { AuthProvider } from './contexts/AuthContext';
   import AuthGuard from './components/auth/AuthGuard';
   
   function App() {
     return (
       <AuthProvider>
         <AuthGuard>
           <YourMainComponent />
         </AuthGuard>
       </AuthProvider>
     );
   }
   ```

**Готово!** Полноценная авторизация работает в новом проекте.

## 🚀 Деплой

### На Netlify:

1. **Подключите репозиторий:**
   - [Netlify Dashboard](https://app.netlify.com) → New site from Git

2. **Настройки сборки:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Переменные окружения:**
   ```
   VITE_SUPABASE_URL = https://ваш-проект.supabase.co
   VITE_SUPABASE_ANON_KEY = ваш-anon-ключ
   ```

4. **Обновите Supabase URLs:**
   - Authentication → URL Configuration
   - Site URL: `https://ваше-приложение.netlify.app`
   - Redirect URLs: `https://ваше-приложение.netlify.app/**`

### На Vercel:

```bash
npm install -g vercel
vercel --prod
```

## 📁 Структура проекта

```
├── src/
│   ├── App.tsx                    # Главный компонент
│   ├── main.tsx                   # Точка входа
│   ├── index.css                  # Стили Tailwind
│   ├── contexts/
│   │   └── AuthContext.tsx        # ❤️ Логика авторизации
│   ├── components/auth/           # 🔐 Система авторизации
│   │   ├── AuthForm.tsx          # Форма входа/регистрации
│   │   ├── AuthGuard.tsx         # Защита маршрутов
│   │   ├── LogoutButton.tsx      # Кнопка выхода
│   │   ├── LoadingSpinner.tsx    # Спиннер загрузки
│   │   └── index.ts             # Экспорты
│   └── lib/
│       └── supabase.ts           # Конфигурация Supabase
├── supabase/migrations/          # SQL миграции
├── .env.example                  # Пример переменных
├── package.json                  # Зависимости
├── tailwind.config.js           # Конфигурация Tailwind
├── tsconfig.json               # Конфигурация TypeScript
└── vite.config.ts              # Конфигурация Vite
```

## 🔧 API и безопасность

### Supabase Auth API:

```typescript
// Регистрация
const { error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'безопасный_пароль'
});

// Вход
const { error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'безопасный_пароль'
});

// Восстановление пароля
const { error } = await supabase.auth.resetPasswordForEmail(
  'user@example.com'
);

// Выход
const { error } = await supabase.auth.signOut();
```

### Database API (только для авторизованных):

```typescript
// Получение переменных
const { data, error } = await supabase
  .from('variables')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(1);

// Создание записи
const { error } = await supabase
  .from('variables')
  .insert([{
    variable_1: 'значение 1',
    variable_2: 'значение 2'
  }]);
```

### RLS Политики:

```sql
-- Только авторизованные пользователи могут читать
CREATE POLICY "Authenticated users can read variables"
  ON variables FOR SELECT 
  TO authenticated 
  USING (true);

-- Только авторизованные пользователи могут создавать
CREATE POLICY "Authenticated users can insert variables"
  ON variables FOR INSERT 
  TO authenticated 
  WITH CHECK (true);
```

## 🔒 Безопасность

- ✅ **JWT токены** для авторизации
- ✅ **Row Level Security (RLS)** на уровне базы данных
- ✅ **Автоматическое управление сессиями**
- ✅ **Защищенные маршруты** через AuthGuard
- ✅ **Валидация на клиенте и сервере**
- ✅ **Безопасное хранение токенов** в localStorage
- ✅ **Автоматический выход** при истечении токена

## 🐛 Отладка

### Проблемы с авторизацией:

**Не работает регистрация:**
- Проверьте что email confirmation отключен в Supabase
- Убедитесь что Site URL настроен правильно

**Ошибки входа:**
- Проверьте правильность email/пароля
- Убедитесь что пользователь зарегистрирован

**Не приходят письма восстановления:**
- Проверьте настройки SMTP в Supabase
- Убедитесь что email templates настроены

### Проблемы с данными:

**Ошибки RLS:**
- Убедитесь что пользователь авторизован
- Проверьте что политики применены к таблице

**Не загружаются данные:**
- Проверьте Network tab в DevTools
- Убедитесь что токен передается в запросах

### Общие проблемы:

```bash
# Проверка переменных окружения
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Очистка кэша
rm -rf node_modules package-lock.json
npm install

# Проверка логов Supabase
# Supabase Dashboard → Logs → Auth/Database
```

## 📚 Дополнительные возможности

### Расширение авторизации:

```typescript
// Добавить OAuth провайдеры
const { error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
});

// Добавить роли пользователей
const { data } = await supabase.auth.getUser();
const userRole = data.user?.user_metadata?.role;

// Добавить профили пользователей
const { data } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id);
```

### Кастомизация UI:

```typescript
// Изменить цвета в tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color'
    }
  }
}

// Добавить свои компоненты
<AuthGuard fallback={<CustomLoadingScreen />}>
  <YourApp />
</AuthGuard>
```

## 📝 Лицензия

MIT License - используйте свободно для любых целей.

## 🤝 Поддержка

Если возникли вопросы:

1. **Проверьте логи:** Browser DevTools → Console/Network
2. **Supabase Dashboard:** Logs → Auth/Database  
3. **Переменные окружения:** убедитесь что заданы правильно
4. **RLS политики:** проверьте что применены к таблице
5. **Создайте Issue** в репозитории

## 🎯 Roadmap

- [ ] Добавить OAuth провайдеры (Google, GitHub)
- [ ] Система ролей и разрешений
- [ ] Профили пользователей
- [ ] Двухфакторная аутентификация
- [ ] Аудит логи действий пользователей
- [ ] Темная тема
- [ ] Мобильное приложение

---

**Создано с ❤️ используя React, TypeScript, Supabase Auth и современные веб-технологии**

*Полностью готовая система авторизации для переиспользования в ваших проектах!*