# ANRO TRIP — Путешествия и командировки

Современный веб-сайт турагентства ANRO TRIP. Консьерж-сервис по организации путешествий и командировок по всему миру. Собран на Astro 5 и Tailwind CSS 4.

## Особенности

- **Адаптивный дизайн** — корректная работа на десктопе и мобильных
- **Мобильное меню** — выдвижная панель справа с backdrop и анимацией
- **Поиск туров** — виджет поиска (авиабилеты / туры и отели)
- **Bento-сетка** — популярные направления, блок «Почему выбирают»
- **Lightbox** — просмотр отзывов-документов с прокруткой и зумом
- **Модальные окна** — обратный звонок, подарок, форма отзыва
- **View Transitions** — плавные переходы между страницами
- **Производительность** — оптимизация под Core Web Vitals, LCP

## Технологии

| Технология | Версия |
|------------|--------|
| [Astro](https://astro.build/) | 5.x |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x |
| [TypeScript](https://www.typescriptlang.org/) | — |
| Sharp | оптимизация изображений |

## Структура проекта

```
white_anrotrip/
├── .specify/memory/constitution.md   # Конституция проекта — читать первым
├── .doc/                             # Документация
├── src/
│   ├── assets/                       # Изображения (hero, tours, team, awards…)
│   ├── components/                   # Компоненты Astro
│   │   ├── Header.astro              # Шапка, мобильное меню
│   │   ├── Hero.astro                # Hero-блок
│   │   ├── SearchWidget.astro        # Поиск туров
│   │   ├── PopularTours.astro        # Популярные направления
│   │   ├── About.astro               # О компании
│   │   ├── Partners.astro            # Партнёры
│   │   ├── Reviews.astro             # Отзывы, lightbox, форма
│   │   ├── Team.astro                # Команда
│   │   ├── Contacts.astro            # Контакты
│   │   ├── Footer.astro              # Подвал
│   │   └── …
│   ├── layouts/Layout.astro
│   ├── pages/
│   │   ├── index.astro               # Главная
│   │   ├── corp.astro                # Корпоративным клиентам
│   │   ├── cabinet.astro             # Личный кабинет
│   │   ├── privacy.astro              # Политика конфиденциальности
│   │   └── terms.astro               # Условия использования
│   └── styles/global.css             # Глобальные стили, токены
└── public/
```

## Установка и запуск

```bash
# Клонирование
git clone <repository-url>
cd white_anrotrip

# Зависимости
npm install

# Разработка
npm run dev
```

Откройте [http://localhost:4321](http://localhost:4321).

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Локальный сервер разработки |
| `npm run build` | Сборка в `./dist/` |
| `npm run preview` | Просмотр сборки локально |
| `npm run astro ...` | CLI Astro |

## Дизайн-система

### Цвета (токены в `global.css`)

- **Primary:** `#00abb3` (тил)
- **Primary Dark:** `#008a91`
- **Primary Light:** `#33bfc6`
- **Secondary:** `#006d73`
- **CTA:** `#ffd417` (жёлтый)

### Шрифты

- **Заголовки:** Montserrat
- **Основной текст:** Inter

### Правила стилизации

Стилизация — **только через Tailwind CSS**. Подробности в [Конституции проекта](.specify/memory/constitution.md).

## Документация

- [Конституция проекта](.specify/memory/constitution.md) — правила и стандарты
- [Руководство ANRO TRIP](.doc/anro-trip-guide-optimized.md) — архитектура, z-index, компоненты

## Лицензия

Проект White Anrotrip. Все права защищены.
