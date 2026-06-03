# Зеркало репозитория на Gitflic

> Настроено: июнь 2026.  
> Цель: страховка от блокировки GitHub со стороны США или РФ.

---

## Что сделано

| Что | Где |
|---|---|
| Репозиторий-зеркало | [gitflic.ru/project/shkrndns/white_anrotrip](https://gitflic.ru/project/shkrndns/white_anrotrip) |
| Основной репозиторий | [github.com/hyperdevops/white_anrotrip](https://github.com/hyperdevops/white_anrotrip) |
| Workflow-файл | `.github/workflows/mirror-gitflic.yml` |
| GitHub Secret | `GITFLIC_TOKEN` — токен от аккаунта `shkrndns` на Gitflic |

---

## Как работает

При каждом `git push` в **любую ветку** на GitHub автоматически запускается GitHub Actions:

```
GitHub push → Actions: mirror-gitflic.yml → git push --mirror → Gitflic
```

Зеркалятся:
- **все ветки** (`main`, `main-design-green`, `minimal-design` и т.д.)
- **все теги**
- **вся история коммитов**

---

## Аккаунты и доступы

| Платформа | Логин | URL |
|---|---|---|
| GitHub | `hyperdevops` | github.com/hyperdevops |
| Gitflic | `shkrndns` | gitflic.ru/project/shkrndns |

### Токен Gitflic
- **Название токена:** `github-mirror`
- **Права:** Pull + Push (чтение и запись кода)
- **Срок действия:** бессрочный
- **Хранится:** GitHub Secrets → `GITFLIC_TOKEN`

> ⚠️ Сам токен нигде в репозитории не хранится — только в GitHub Secrets. Если нужно восстановить: Gitflic → Настройки → Токены → пересоздать, обновить секрет в GitHub.

---

## Как проверить, что зеркало работает

1. Открыть [github.com/hyperdevops/white_anrotrip/actions](https://github.com/hyperdevops/white_anrotrip/actions)
2. Найти workflow **«Mirror to Gitflic»**
3. Должен быть зелёный статус ✅

Или вручную запустить: Actions → Mirror to Gitflic → **Run workflow**.

---

## Что делать если GitHub недоступен

### Переключиться на Gitflic как основной remote

```bash
# Добавить Gitflic как remote (если ещё не добавлен)
git remote add gitflic https://gitflic.ru/project/shkrndns/white_anrotrip.git

# Проверить remotes
git remote -v

# Пушить в Gitflic напрямую
git push gitflic main-design-green
```

### Клонировать с Gitflic (на новой машине)

```bash
git clone https://gitflic.ru/project/shkrndns/white_anrotrip.git
cd white_anrotrip
```

При запросе пароля — использовать токен из Gitflic (Настройки → Токены → создать новый).

---

## Если токен истёк или нужно пересоздать

1. Войти на [gitflic.ru](https://gitflic.ru) → аватар → **Настройки** → **Токены**
2. Удалить старый, создать новый с правами Pull + Push
3. Скопировать новый токен
4. Обновить GitHub Secret:  
   [github.com/hyperdevops/white_anrotrip/settings/secrets/actions](https://github.com/hyperdevops/white_anrotrip/settings/secrets/actions) → `GITFLIC_TOKEN` → **Update**
5. Проверить следующий push — workflow должен пройти зелёным

---

## Связанные документы

| Документ | Содержание |
|---|---|
| [server-vps-stack-plan.md](./server-vps-stack-plan.md) | Деплой на Beget VPS — GitHub Actions там же |
| [project-roadmap.md](./project-roadmap.md) | Общий план работ |
