# ANRO TRIP — Компактное руководство проекта (2026)

## 📌 БЫСТРЫЙ СТАРТ

**Конституция:** `.specify/memory/constitution.md` — ЧИТАТЬ ПЕРВЫМ ДЕЛОМ!
**Технологии:** Astro 5.16.13 + Tailwind CSS 4.1.18
**Порт разработки:** http://localhost:4321

### Железные правила

1. **Стилизация ТОЛЬКО через Tailwind CSS**
   - Стандартные утилиты → JIT-синтаксис → Только тогда CSS в `global.css`
   - ❌ Запрещено: новые `.css` файлы, `<style>` блоки в компонентах
   - ✅ Разрешено: `bg-[#hex]`, `shadow-[...]`, `class:list`

2. **Tailwind v4 синтаксис (ВАЖНО!)**
   - `bg-linear-to-r` (НЕ `bg-gradient-to-r`)
   - `z-9999` (НЕ `z-[9999]`)
   - Container Queries: `@container`, `@md:`, `@lg:`

3. **Единственный CSS файл:** `src/styles/global.css`
   - Только для: глобальных утилит, сторонних библиотек, базовых стилей

## 🏗️ АРХИТЕКТУРА ПРОЕКТА

### Структура файлов (ключевая)

```
white_anrotrip/
├── .specify/memory/constitution.md       # ⭐ Конституция
├── src/
│   ├── assets/
│   │   └── hero/plane.avif              # Hero фон (AVIF, оптимизирован)
│   ├── components/
│   │   ├── ui/Modal.astro               # Базовый модал
│   │   ├── widgets/
│   │   │   ├── NemoSearch.astro         # Авиабилеты
│   │   │   └── TourvisorSearch.astro    # Туры
│   │   ├── Hero.astro                   # ⭐ Главный экран
│   │   ├── Header.astro                 # Навигация
│   │   ├── SearchWidget.astro           # Поисковая форма
│   │   ├── ScrollProgress.astro         # Индикатор прогресса
│   │   ├── TrustBadges.astro            # Бейджи доверия
│   │   └── [другие компоненты]
│   ├── layouts/Layout.astro             # ⭐ Главный Layout
│   ├── pages/index.astro                # Главная страница
│   ├── styles/global.css                # ⭐ Единственный CSS
│   └── types/
├── astro.config.mjs
└── package.json
```

### Sticky Hero + Content Overlay

**Ключевая особенность:** Hero фиксирован, контент "наползает" сверху

```astro
<Hero />
<!-- sticky, z-0 -->
<div class="mt-[90vh]">
  <!-- Контент, z-10 -->
  <div class="-translate-y-24">
    <!-- SearchWidget выезжает -->
    <SearchWidget />
  </div>
</div>
```

💡 **Для быстрого появления формы:** `mt-[90vh]` → `mt-[70vh]` и `-translate-y-24` → `-translate-y-40`

### Z-Index иерархия (НЕ МЕНЯТЬ!)

```css
z-[2147483647]  /* Модальные окна */
z-[2147483646]  /* ScrollToTop */
z-[2147483630]  /* OfficeWidget, FavoritesWidget */
z-9999          /* ScrollProgress */
z-50            /* Header */
z-20            /* SearchWidget */
z-10            /* Content */
z-0             /* Hero */
```

---

## 🎨 DESIGN SYSTEM

### Цвета

```css
@theme {
  --color-primary: #3fa0f0; /* Голубой (основной) */
  --color-secondary: #1a6db1; /* Бирюзовый */
  --color-cta: #ffd417; /* Желтый (CTA) */
  --color-cta-hover: #e5be14;
  --font-montserrat: 'Montserrat', sans-serif;
  --font-inter: 'Inter', sans-serif;
}
```

### Типографика

**Fluid Typography (clamp):**

```css
h1 {
  font-size: clamp(2rem, 1rem + 5vw, 4.5rem);
}
h2 {
  font-size: clamp(1.75rem, 1rem + 3vw, 3rem);
}
```

**Шрифты:**

- **Montserrat:** Заголовки, кнопки, логотип
- **Inter:** Основной текст, параграфы

**CDN:**

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
```

### Glassmorphism

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.15);
}

.glass-panel-interactive:hover {
  background: rgba(255, 255, 255, 0.85);
  transform: translateY(-2px);
}
```

### Скругления 2026

- `rounded-full` — Кнопки, аватары
- `rounded-3xl` (24px) — Карточки, виджеты
- `rounded-t-[40px]` — Content блок

---

## ⚡ МОДЕРНИЗАЦИЯ 2026 (ЗАВЕРШЕНА)

### Реализовано (15/13 задач)

✅ View Transitions API (`ClientRouter`)
✅ Scroll Progress Bar (градиентная полоса)
✅ Fluid Typography (clamp)
✅ Staggered Animations (последовательное появление)
✅ Trust Badges + Stats Hero Block
✅ Micro-interactions (ripple, magnetic, shake)
✅ Container Queries (`@container`)
✅ Responsive Images (Astro `<Image />`)
✅ Parallax Scroll (Hero контент)
✅ Dynamic Gradients (время суток)
✅ Glass Panel Interactive (hover эффекты)
✅ Ken Burns улучшение (translate анимация)
✅ Супер-современная Hero CTA (shine effect, 3% scale)
✅ Модернизация Scroll Arrow
❌ Dark Mode (отменен — не подходит для туристического сайта)

---

## 🔧 КЛЮЧЕВЫЕ КОМПОНЕНТЫ

### Hero.astro

**Особенности:**

- Ken Burns Effect (30s, scale + translate)
- Dynamic Gradients (4 времени суток)
- Parallax (только контент, `-0.2` коэффициент)
- CTA кнопка: shine effect, 3% scale, glow

### SearchWidget.astro

**Интеграции:**

- Tab 1: NemoSearch (авиабилеты)
- Tab 2: TourvisorSearch (туры)
- Glassmorphism фон

### ScrollProgress.astro

**Z-index:** `z-9999`
**Градиент:** `from-primary via-secondary to-cta`

### TrustBadges.astro

**Показатели:**

- Членство РТО
- Топ-10 России
- 4+ года опыта
- 14 000+ клиентов

---

## 🔌 ИНТЕГРАЦИИ

### Tourvisor (Туры и отели)

**Проблема:** Серая кнопка `.TVCartStickyButton` портит дизайн
**Решение:**

```css
.TVCartStickyButton {
  opacity: 0 !important;
  position: fixed !important;
  left: -9999px !important;
}
```

**Мобильный фикс:**

```css
iframe[src*='tourvisor'] {
  width: 100% !important;
  min-height: 400px !important;
}
```

- Dispatch `resize` при переключении таба

### Nemo Travel (Авиабилеты)

Работает "из коробки", без кастомизации.

---

## 🚨 РЕШЕННЫЕ ПРОБЛЕМЫ

### 1. Parallax + Animation Conflict

**Решение:** Parallax к контенту, animation к фону (раздельно)

### 2. Scale 110% → 103%

**Причина:** 10% слишком агрессивно
**Решение:** 3% subtle scale (тренд 2026)

### 3. Tourvisor серая кнопка

**Решение:** Скрываем визуально, кликабельность программная

### 4. Tourvisor мобильный "сплющивание"

**Решение:** `min-height: 400px !important` + `resize` event

### 5. Scroll Offset для якорей

```css
:target {
  scroll-margin-top: calc(4rem + 40px);
}
```

---

## 📊 SEO, GEO, AEO СТРАТЕГИЯ

### E-E-A-T (Google 2026)

- **Experience:** 18+ лет, 14 000+ клиентов
- **Expertise:** Членство РТО, Топ-10 России
- **Authoritativeness:** Mercedes, Napoleon, NIAGARA (партнеры)
- **Trustworthiness:** Полные реквизиты, SSL, прозрачность

### GEO (Generative Engine Optimization)

✅ Короткие определения
✅ Списки и таблицы (способы оплаты, реквизиты)
⚠️ Добавить: FAQ секцию, таблицу направлений с ценами

### AEO (Answer Engine Optimization)

⚠️ Нужно:

1. Микроразметка Schema.org (TravelAgency, Review, FAQPage)
2. Отдельные страницы под направления `/tours/maldives`
3. Хлебные крошки (Breadcrumbs)

**Schema.org пример:**

```json
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "ANRO TRIP",
  "legalName": "ООО АНРО",
  "telephone": "+78002224473",
  "email": "anro@anrotrip.ru"
}
```

---

## 🎯 ТРЕНДЫ ДИЗАЙНА 2026

### Ключевые принципы

1. **Subtle Scale:** 3-5% вместо 10%
2. **Shine Effects:** Движущиеся блики (Apple, Tesla)
3. **Fluid Typography:** clamp() без media queries
4. **Staggered Animations:** Последовательное появление
5. **Container Queries:** Адаптивность по контейнеру
6. **Glassmorphism:** Apple Liquid Glass адаптация

### Источники вдохновения

- **Material Design 3:** https://m3.material.io/
- **Apple HIG:** https://developer.apple.com/design/human-interface-guidelines/
- **LandingFolio:** https://www.landingfolio.com/inspiration
- **Uprock (UX):** https://www.uprock.ru/
- **Web Design Trends:** https://media.contented.ru/osnovy/napravleniya/trendy-web-design/

---

## 📚 КРИТИЧНАЯ ДОКУМЕНТАЦИЯ

### Официальная документация

**Astro:**

- https://docs.astro.build/
- https://docs.astro.build/en/guides/view-transitions/
- https://docs.astro.build/en/guides/images/

**Tailwind CSS v4:**

- https://tailwindcss.com/
- https://tailwindcss.com/blog/tailwindcss-v4-beta
- https://tailwindcss.com/docs/container-queries

**Material Design 3:**

- https://m3.material.io/
- https://m3.material.io/foundations/interaction/states/overview

**Apple HIG:**

- https://developer.apple.com/design/human-interface-guidelines/

### SEO и Schema.org

**Google Search Central:**

- https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content

**Schema.org:**

- https://schema.org/TravelAgency
- https://schema.org/Review

### Performance

**Lighthouse:**

- https://developers.google.com/web/tools/lighthouse

**Core Web Vitals:**

- https://web.dev/vitals/

---

## 🛠️ РАЗРАБОТКА

### Команды

```bash
# Разработка
npm run dev             # или: bun dev

# Сборка
npm run build           # или: bun build

# Форматирование
npx prettier --write "src/**/*.astro"

# Linter
npm run lint
```

### Git Workflow

**Правила:**

- ❌ НЕ обновлять git config
- ❌ НЕ запускать деструктивные команды (push --force, hard reset)
- ❌ НЕ коммитить без запроса пользователя
- ✅ Создавать коммиты только по запросу

### Collaboration с AI

1. **ВСЕГДА читать файл перед редактированием**
2. Проверять авторство изменений
3. Не удалять работающий код
4. Не трогать Tourvisor/Nemo без причины
5. Не менять z-index иерархию

---

## 📝 СЛЕДУЮЩИЕ ШАГИ

### Краткосрочные (1-2 месяца)

- [ ] Добавить Schema.org микроразметку
- [ ] Создать FAQ секцию
- [ ] Оптимизировать meta-описания
- [ ] Lighthouse audit

### Среднесрочные (3-6 месяцев)

- [ ] Отдельные страницы под направления
- [ ] Блог (кейсы, советы)
- [ ] Google Search Console интеграция

### Долгосрочные (6-12 месяцев)

- [ ] База знаний (GEO)
- [ ] Видеоконтент (YouTube)
- [ ] Мультиязычность (английский)

---

## 📌 ДЛЯ СЛЕДУЮЩЕГО AI

### Обязательно прочитать ПЕРВЫМ:

1. `.specify/memory/constitution.md` — Конституция (ВЫСШИЙ ПРИОРИТЕТ)
2. Этот файл — Компактное руководство

### Перед редактированием файла:

1. Прочитать актуальное состояние
2. Проверить авторство изменений
3. Не перезаписывать ручные правки

### Железные правила:

- ❌ НЕ создавать `.css` файлы
- ❌ НЕ использовать `<style>` блоки
- ✅ ТОЛЬКО Tailwind утилиты + JIT
- ✅ Tailwind v4 синтаксис: `bg-linear-to-r`, `z-9999`

---

**КОНЕЦ ДОКУМЕНТА**

**Версия:** 2.0 (Оптимизированная)
**Дата:** 16 февраля 2026
**Автор:** AI Senior Fullstack Developer (Sonnet) + Главный разработчик (hyper)
**Статус:** Актуально, готово к использованию

**Изменения от v1.0:**

- Сокращено с 2356 → ~500 строк (78% компактнее)
- Сохранены ВСЕ ссылки и контакты
- Сохранен весь смысл и критичная информация
- Убрана избыточность и дублирование кода

**Для следующего чата:** Прочитай этот документ + constitution.md! 🚀
