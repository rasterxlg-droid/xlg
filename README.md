# XLGDEV — Production Website

Next.js 14 · TypeScript · Framer Motion · next-intl (RU/EN) · Prisma · PostgreSQL · Telegram Bot · Vercel

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Setup environment variables
```bash
cp .env.example .env.local
```
Заполни `.env.local`:

```env
DATABASE_URL="postgresql://neondb_owner:npg_cJHpU54jhzOV@ep-quiet-bar-a2aibsf3-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"   # из Neon.tech
TELEGRAM_BOT_TOKEN="8910875971:AAEvJfULmZQaZrrGT2H1XPiCxNT55hSEe_o"          # из @BotFather
TELEGRAM_CHAT_ID="7380365871"            # свой chat_id (получи через @userinfobot)
NEXT_PUBLIC_SITE_URL="https://xlgdev.vercel.app"
```

### 3. Setup Database (Neon.tech — бесплатно)
1. Зайди на [neon.tech](https://neon.tech) → создай проект
2. Скопируй connection string → вставь в `DATABASE_URL`
3. Запусти:
```bash
npm run db:push      # создаёт таблицы
npm run db:generate  # генерирует Prisma client
```

### 4. Setup Telegram Bot
1. Открой [@BotFather](https://t.me/BotFather) → `/newbot` → получи токен
2. Открой [@userinfobot](https://t.me/userinfobot) → получи свой `chat_id`
3. Вставь в `.env.local`

### 5. Run locally
```bash
npm run dev
# → http://localhost:3000
```

---

## 🌐 Deploy to Vercel

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "init"
git remote add origin https://github.com/YOUR/xlgdev.git
git push -u origin main

# 2. Import on vercel.com → New Project → выбери репо
# 3. Добавь Environment Variables (те же что в .env.local)
# 4. Deploy!
```

Vercel автоматически запустит `npx prisma generate && next build`.

---

## 📁 Project Structure

```
xlgdev/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts   # POST → сохранить лид + Telegram
│   │   │   └── health/route.ts    # GET → проверка БД
│   │   └── [locale]/
│   │       ├── layout.tsx         # HTML обёртка с i18n
│   │       └── page.tsx           # Главная страница
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Navbar.tsx         # Навбар + переключатель языка
│   │   │   ├── Hero.tsx           # Hero секция
│   │   │   ├── Services.tsx       # Карточки услуг
│   │   │   ├── Contact.tsx        # Форма + контакты
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── FloatingWhatsApp.tsx
│   │       └── GlobalStyles.tsx
│   ├── lib/
│   │   ├── prisma.ts              # Prisma singleton
│   │   └── telegram.ts            # Telegram уведомления
│   ├── hooks/
│   │   └── useReveal.ts
│   ├── middleware.ts              # i18n routing
│   └── i18n.ts
├── messages/
│   ├── ru.json                    # Русские тексты
│   └── en.json                    # English texts
├── prisma/
│   └── schema.prisma              # БД схема (Lead model)
├── .env.example
├── next.config.mjs
├── vercel.json
└── tsconfig.json
```

---

## ✅ Features

- **RU/EN** — автоматический роутинг, переключатель в навбаре
- **Рабочая форма** — сохраняет лиды в PostgreSQL
- **Telegram уведомления** — мгновенно при новой заявке
- **Framer Motion** — анимации при загрузке и скролле
- **Валидация** — Zod на сервере, проверка на клиенте
- **Health check** — `/api/health` для мониторинга
- **TypeScript** — строгая типизация везде
- **SEO** — метатеги, OG, Twitter cards

---

## 🛠 Scripts

```bash
npm run dev          # dev server
npm run build        # production build
npm run db:push      # sync schema → DB
npm run db:studio    # Prisma Studio (GUI для БД)
npm run db:generate  # regenerate Prisma client
```
