# План тестирования

> **Обязателен перед любым серьёзным рефакторингом или деплоем.**

---

## Smoke-тесты страниц (ручные / автоматические)

| Страница | URL | Проверить |
|---|---|---|
| Главная | `/` | Hero, поиск, туры, секции, хедер, формы |
| Корпоративная | `/corp` | Секции, CTA кнопки |
| Личный кабинет | `/cabinet` | Форма входа |
| Условия | `/terms` | Текст загружается |
| Политика | `/privacy` | Текст загружается |
| Блог | `/blog` | Список статей |
| Статья | `/blog/egypt-family-vacation` | Одна статья |

---

## E2E тесты форм (Playwright)

> Playwright ещё не установлен. Установка: `pnpm add -D @playwright/test`

### Форма "Обратный звонок"

```typescript
test('callback form: success', async ({ page }) => {
  await page.goto('/');
  // открыть модал
  // заполнить name + phone
  // submit
  // проверить success state
});

test('callback form: validation', async ({ page }) => {
  // отправить пустую форму
  // проверить ошибки валидации
});
```

### Форма "Подарочный сертификат"

```typescript
test('gift form: success', async ({ page }) => {
  // fio + phone + email
});
```

### Форма "Отзыв"

```typescript
test('review form: success', async ({ page }) => {
  // name + review text
});
```

---

## Lighthouse

```bash
# После деплоя или в CI
npx lighthouse https://anrotrip.ru --output json --output-path ./lighthouse.json

# Целевые показатели:
# Performance: ≥ 90
# Accessibility: ≥ 95
# Best Practices: ≥ 95
# SEO: ≥ 95
# PWA: 100 (после внедрения)
```

---

## Визуальная регрессия (опционально)

При значительных изменениях дизайна:

```bash
# Percy / Chromatic / Playwright screenshots
# Сравнение скриншотов до и после изменений
```

---

## Чеклист перед деплоем

- [ ] `pnpm check` — без ошибок
- [ ] `pnpm build` — сборка успешна
- [ ] Smoke-тест всех страниц (локально)
- [ ] Smoke-тест всех форм (локально)
- [ ] `backdrop-blur` работает (не белый box)
- [ ] Мобильный хедер открывается/закрывается
- [ ] Anchor-скролл работает корректно

---

## Связанные документы

| Документ | Содержание |
|---|---|
| [refactoring-plan.md](./refactoring-plan.md) | Когда запускать тесты |
| [project-roadmap.md](./project-roadmap.md) | Фаза 6 |
