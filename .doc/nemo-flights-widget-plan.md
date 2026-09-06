# Nemo Авиа: виджет поиска билетов

> **Статус:** Запланировано (Фаза 4)  
> Компонент: `src/components/widgets/NemoSearch.astro`

---

## Что такое Nemo

Nemo (nemo.travel) — API и виджет для поиска авиабилетов. Интегрируется через JavaScript-виджет с кастомизацией темы.

---

## Текущее состояние

- Компонент `NemoSearch.astro` создан и размещён на главной странице в `SearchWidget.astro`
- Кастомная тема ANRO TRIP (цвета #00abb3 / #e31a33) — прописана в CSS
- Типы для `window.nemo*` — в `src/types/window.d.ts`

---

## Планируемые этапы

### До деплоя VPS

- [ ] Зарегистрировать аккаунт в Nemo Travel
- [ ] Получить API-ключ / Partner ID
- [ ] Подобрать / проверить кастомную тему виджета
- [ ] Проверить отображение на мобильных

### После деплоя VPS

- [ ] Настроить поддомен `ticket.anrotrip.ru` → Nemo
  - DNS CNAME запись в REG.RU
  - SSL через Let's Encrypt (или Cloudflare)
- [ ] Либо альтернатива: iframe с поддомена на главной
- [ ] Тест реальных поисков (авиабилеты туда-обратно)

---

## Кастомная тема ANRO TRIP

Цвета для виджета соответствуют дизайн-системе:

```css
/* Основной тил */
--nemo-primary: #00abb3;
/* CTA / акцент */
--nemo-accent: #e31a33;
/* Фон */
--nemo-bg: #ffffff;
```

---

## Особенности интеграции

- Tourvisor (альтернатива) — уже интегрирован через `TourvisorSearch.astro`
- `SearchWidget.astro` — таб «Авиабилеты» (Nemo) / «Туры и Отели» (Tourvisor)
- Tourvisor требует полной перезагрузки страницы при использовании View Transitions

---

## Связанные документы

| Документ | Содержание |
|---|---|
| [server-vps-stack-plan.md](./server-vps-stack-plan.md) | DNS, SSL, деплой |
| [project-roadmap.md](./project-roadmap.md) | Фаза 4 |
