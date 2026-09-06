# Дорожная карта проекта ANRO TRIP

> **Актуально на:** июль 2026  
> Статусы: ✅ Готово | 🔄 В процессе | ⬜ Запланировано | ❌ Отложено

---

## Фаза 0: Фундамент (ЗАВЕРШЕНА) ✅

- [x] Инициализация проекта Astro 6.x + Tailwind 4.x
- [x] Дизайн-система (токены, шрифты, цвета)
- [x] Главная страница (все секции)
- [x] Страница /corp (корпоративным клиентам)
- [x] Страница /cabinet (личный кабинет)
- [x] /terms, /privacy (юридические страницы)
- [x] Блог с 7 статьями
- [x] Формы (callback, gift, review) + nodemailer SMTP + Telegram
- [x] Docker + GitHub Actions CI/CD
- [x] Caddy reverse proxy + HTTPS
- [x] Зеркало Gitflic

---

## Фаза 1: Оптимизация и SEO (ТЕКУЩАЯ) 🔄

- [x] Локальные шрифты (@fontsource — без Google CDN)
- [x] Оптимизация изображений (Sharp, WebP/AVIF, pnpm optimize:images)
- [x] Типографика (typograf — кавычки, тире, неразрывные пробелы)
- [x] Sitemap (astro-sitemap)
- [x] Gzip сжатие (Caddy encode gzip)
- [x] Семантический HTML (header, main, footer, nav, article)
- [x] Бренд-цвет красный #e31a33 в Hero CTA
- [ ] SEO-чек-лист — см. [SEO-чек-лист.md](./SEO-чек-лист.md)
- [ ] Семантическое ядро — см. [Семантическое-ядро.md](./Семантическое-ядро.md)
- [ ] OpenGraph / Schema.org для всех страниц
- [ ] robots.txt и sitemap проверка
- [ ] Core Web Vitals оптимизация (LCP, CLS, INP)

---

## Фаза 2: Деплой на Beget VPS (СЛЕДУЮЩАЯ) ⬜

> Подготовка, сроки и разделение ролей: [deploy-prep-checklist.md](./deploy-prep-checklist.md)

- [ ] Настройка VPS (UFW, SSH hardening, fail2ban)
- [ ] Docker Compose на VPS
- [ ] Caddy + Let's Encrypt
- [ ] Перенос DNS на REG.RU → Beget IP
- [ ] Настройка .env (SMTP, Telegram)
- [ ] Первый деплой через GitHub Actions → Run workflow
- [ ] Smoke-тест всех форм на проде
- [ ] Smoke-тест всех страниц

---

## Фаза 3: Безопасность (ПАРАЛЛЕЛЬНО) ⬜

- [ ] Baseline-пакет безопасности — см. [security-baseline-package.md](./security-baseline-package.md)
- [ ] Периметр (UFW, SSH, Cloudflare/DDoS-Guard) — см. [perimeter-edge-security.md](./perimeter-edge-security.md)
- [ ] Security hardening checklist — см. [security-hardening-checklist.md](./security-hardening-checklist.md)
- [ ] CSP (Content Security Policy) заголовки в Caddy
- [ ] Rate-limit форм (уже in-memory — улучшить при росте нагрузки)

---

## Фаза 4: Nemo Авиа-виджет (ЗАПЛАНИРОВАНО) ⬜

- [ ] Nemo авиа-виджет — см. [nemo-flights-widget-plan.md](./nemo-flights-widget-plan.md)
- [ ] Кастомная тема ANRO TRIP для виджета
- [ ] Поддомен `ticket.anrotrip.ru` или `b2b.anrotrip.ru`
- [ ] DNS/SSL для поддомена

---

## Фаза 5: PWA (ЗАПЛАНИРОВАНО) ⬜

- [ ] PWA план — см. [pwa-plan.md](./pwa-plan.md)
- [ ] Web App Manifest
- [ ] Service Worker (кэширование статики)
- [ ] Оффлайн-страница (`/offline`)
- [ ] Иконки (512×512, maskable)
- [ ] Add to Home Screen промпт

---

## Фаза 6: Рефакторинг и качество (ЗАПЛАНИРОВАНО) ⬜

- [ ] Рефакторинг — см. [refactoring-plan.md](./refactoring-plan.md)
- [ ] Устранение дублирования кода
- [ ] Разбивка крупных компонентов
- [ ] E2E тесты форм (Playwright) — см. [testing-plan.md](./testing-plan.md)
- [ ] Smoke-тесты страниц
- [ ] Lighthouse автоматизация в CI

---

## Фаза 7: Контент-маркетинг (ДОЛГОСРОЧНО) ⬜

- [ ] Новые статьи блога (регулярно)
- [ ] Контент-стратегия — см. [Контент-стратегия.md](./Контент-стратегия.md)
- [ ] Семантическое ядро — см. [Семантическое-ядро.md](./Семантическое-ядро.md)
- [ ] Региональные SEO-страницы
- [ ] Отзывы (реальные, от клиентов)

---

## Фаза 8: Коммерческий ресурс и собственные виджеты (ДОЛГОСРОЧНО) ⬜

> Стратегический план развития: [commercial-resource-roadmap.md](./commercial-resource-roadmap.md)

- [ ] Запустить текущий сайт как стабильный production-ресурс.
- [ ] Расширить структуру страниц под направления, услуги и рекламные посадочные.
- [ ] Постепенно развивать собственные независимые виджеты заявок и подбора.
- [ ] Оценить API-интеграции для туров, отелей и авиабилетов.
- [ ] Связать заявки с CRM/операционной работой менеджеров.
- [ ] Развивать сайт как коммерческую платформу на основе аналитики и реальных заявок.

---

## Связанные документы

| Документ | Фаза |
|---|---|
| [server-vps-stack-plan.md](./server-vps-stack-plan.md) | Фаза 2 |
| [perimeter-edge-security.md](./perimeter-edge-security.md) | Фаза 3 |
| [security-baseline-package.md](./security-baseline-package.md) | Фаза 3 |
| [nemo-flights-widget-plan.md](./nemo-flights-widget-plan.md) | Фаза 4 |
| [pwa-plan.md](./pwa-plan.md) | Фаза 5 |
| [refactoring-plan.md](./refactoring-plan.md) | Фаза 6 |
| [testing-plan.md](./testing-plan.md) | Фаза 6 |
| [commercial-resource-roadmap.md](./commercial-resource-roadmap.md) | Фаза 8 |
| [budget-costs.md](./budget-costs.md) | Смета |
