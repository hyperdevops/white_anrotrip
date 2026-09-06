# ANRO TRIP — Руководство для ИИ-агентов

Сайт туристического агентства «ANRO TRIP» (г. Екатеринбург). Более 18 лет опыта в организации путешествий и командировок по всему миру.

> **Конституция проекта:** `.specify/memory/constitution.md` — читать первым делом!  
> **Документация:** `.doc/README.md` — указатель всех справочных документов.

---

## Команды (запускать перед коммитом)

| Команда | Что делает |
|---|---|
| **`pnpm check`** | ✅ TypeScript + Astro check — **рекомендуется перед коммитом и для ИИ перед завершением задачи** |
| `pnpm dev` | Dev-сервер на localhost:4321 |
| `pnpm build` | Production сборка (включает optimize:images) |
| `pnpm preview` | Preview production сборки |
| `pnpm optimize:images` | Sharp-оптимизация изображений |
| `pnpm typograf:blog` | Типографика для markdown блога |

---

## Технологический стек

- **Astro 6.x** — SSR, Node adapter (`standalone`)
- **Tailwind CSS 4.x** — v4 синтаксис (отличается от v3!)
- **TypeScript** — строгая типизация
- **pnpm 11.x** — менеджер пакетов (не npm, не yarn!)
- **Sharp** — оптимизация изображений
- **@fontsource** — локальные шрифты Inter + Montserrat (без Google CDN)
- **Font Awesome Free** — иконки
- **astro-iconify** — SVG иконки
- **nodemailer** — SMTP email (Яндекс 360)
- **Telegram Bot API** — уведомления о заявках
- **zod** — валидация форм

---

## Структура проекта

```
src/
├── assets/           # Изображения (WebP/AVIF), разбиты по папкам
│   ├── hero/         # world.webp, plane.avif
│   ├── tours/        # 7 туров (antalya, egypt, japan, maldives, seychelles, thailand, vietnam)
│   ├── team/         # Фото сотрудников
│   ├── partners/     # Логотипы партнёров
│   ├── reviews/      # Фото рецензентов
│   └── awards/       # Награды (3 изображения)
├── components/       # Astro компоненты
│   ├── ui/           # Modal.astro — базовый UI компонент
│   ├── widgets/      # NemoSearch.astro, TourvisorSearch.astro
│   └── *.astro       # Секции страниц (Hero, About, Awards, ...)
├── content/
│   └── blog/         # 7 markdown статей
├── integrations/     # rehype-typograf.mjs
├── layouts/          # Layout.astro
├── lib/              # Утилиты (mailer, schemas, typograf, site-urls, ...)
├── pages/
│   ├── api/          # callback.ts, gift.ts, review.ts — Server endpoints
│   ├── blog/         # [...page].astro, [...slug].astro
│   ├── index.astro   # Главная страница
│   ├── corp.astro    # Корпоративным клиентам
│   ├── cabinet.astro # Личный кабинет (форма → lk.anrotrip.ru)
│   ├── privacy.astro # Политика конфиденциальности (152-ФЗ)
│   └── terms.astro   # Условия использования
├── styles/
│   └── global.css    # Единственный CSS-файл: @theme, @layer base, @layer components
└── types/
    └── window.d.ts   # Расширение Window (виджеты Nemo/Tourvisor)
```

---

## Дизайн-система

### Brand Colors (из `src/styles/global.css` → `@theme`)

```css
/* Основной тил */
--color-primary:       #00abb3;
--color-primary-light: #33bfc6;
--color-primary-dark:  #008a91;
--color-secondary:     #006d73;

/* Брендовый красный — Hero CTA, акцентные кнопки */
--color-red:           #e31a33;
--color-red-light:     #f2a8b3;
--color-red-dark:      #a01022;
--color-red-hover:     #c2142a;
```

### Шрифты

- `font-montserrat` — заголовки (Montserrat 600/700/800)
- `font-inter` — основной текст (Inter 400/500/600)

### Кастомные брейкпоинты

- `--breakpoint-nav: 90rem` — десктопная навигация от 1440px (используй `nav:`)

### Motion

```css
--transition-duration-fast:   200ms   /* hover цвет, focus */
--transition-duration-normal: 300ms   /* кнопки, карточки */
--transition-duration-slow:   500ms   /* модалки, overlay */
```

---

## Известные особенности и ограничения

### ⚠️ Blur в production

`astro.config.mjs` содержит `vite.build.cssMinify: false`.  
**Не менять!** Tailwind v4 + Vite минифицирует CSS так, что `backdrop-blur-*` классы перестают работать на production-сборке. Это известная особенность стека, не баг проекта.  
Подробнее: `.doc/notes-blur-production.md`

### ⚠️ Хедер — заморожен

`Header.astro` — структура меню, вёрстка, подменю и drawer **не менять без явной просьбы заказчика**.  
Документация: `.doc/header-frozen.md`, `.doc/header-anchor-scroll.md`

### ⚠️ Tourvisor — полная перезагрузка

При переходе на главную через `<a href="/">` Tourvisor требует полной перезагрузки страницы (не View Transitions). Это намеренно.

### ⚠️ Corp-страница — в архиве

Маршрут `/corp` **не публикуется**. Черновик и ассеты: `src/_archive/corp/` (вне `src/pages/`).

### ⚠️ Tailwind v4 синтаксис

```
НЕПРАВИЛЬНО (v3) → ПРАВИЛЬНО (v4):
bg-gradient-to-r   →  bg-linear-to-r
```

---

## Компоненты: ключевые паттерны

### Модальные окна

- `CallbackModal.astro`, `GiftModal.astro`, `ReviewModal.astro` — используют `src/components/ui/Modal.astro`
- Блокировка скролла: `lockScroll()` / `unlockScroll()` с компенсацией ширины скроллбара
- Открытие: custom events (`open-callback-modal`, `open-gift-modal`, `open-review-modal`)

### Формы и API

- Эндпоинты: `src/pages/api/callback.ts`, `gift.ts`, `review.ts`
- Валидация: Zod (схемы в `src/lib/schemas.ts`)
- Отправка: nodemailer SMTP + Telegram Bot
- Защита: honeypot поле + rate-limit (см. `.doc/forms.md`)
- Переменные окружения: `src/.env.example`

### Поиск туров

- **Nemo** (`NemoSearch.astro`): виджет поиска туров, кастомная тема ANRO TRIP
- **Tourvisor** (`TourvisorSearch.astro`): альтернативный виджет
- Конфигурация: `src/types/window.d.ts` расширяет `Window`

---

## Страницы

| Маршрут | Компонент | Описание |
|---|---|---|
| `/` | `index.astro` | Главная: Hero, поиск, туры, о компании, партнёры, отзывы, награды, подарки, команда, контакты |
| `/cabinet` | `cabinet.astro` | Форма входа (action → lk.anrotrip.ru) |
| `/terms` | `terms.astro` | Условия использования |
| `/privacy` | `privacy.astro` | Политика конфиденциальности (152-ФЗ) |
| `/blog` | `blog/[...page].astro` | Список статей (7 материалов) |
| `/blog/[slug]` | `blog/[...slug].astro` | Статья журнала |

---

## Внешние сервисы

| Сервис | Назначение |
|---|---|
| Nemo API | Поиск туров (виджет) |
| Tourvisor | Поиск туров (iframe) |
| Яндекс.Карты | Карта офиса в Contacts.astro |
| lk.anrotrip.ru | Личный кабинет (внешний сервис) |
| WhatsApp/Telegram | Контактные ссылки |
| Яндекс SMTP | Email-уведомления (smtp.yandex.ru:465) |
| Telegram Bot | Push-уведомления о заявках |

---

## Деплой

> **Чеклист подготовки, сроки, роли агент/владелец:** `.doc/deploy-prep-checklist.md`

```
GitHub push (main) → Actions: build-push → Docker image → GHCR
                  → Actions: deploy (вручную) → Beget VPS → Caddy → :4321
```

- **Образ**: `ghcr.io/shkrndns/white_anrotrip:latest`
- **VPS**: Beget, deploy user, `/home/deploy/anrotrip/`
- **HTTPS**: Caddy (автоматические сертификаты Let's Encrypt)
- **Зеркало**: Gitflic (`.github/workflows/mirror-gitflic.yml`)

---

## Контакты проекта

- **Телефон:** +7 (922) 026-70-59
- **WhatsApp:** +7 922 026-70-59  
- **Telegram:** @anrotrip
- **Email:** online@anrotrip.ru
- **Адрес:** г. Екатеринбург
- **Сайт:** https://anrotrip.ru
- **GitHub:** github.com/shkrndns/white_anrotrip
- **Gitflic:** gitflic.ru/project/shkrndns/white_anrotrip
