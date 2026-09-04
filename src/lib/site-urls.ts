/**
 * Пути с учётом `import.meta.env.BASE_URL` (GitHub Pages, подпапка и т.д.).
 */

/** Страница на сайте: `privacy` → `/privacy` или `/repo/privacy`. Пустая строка — корень (`BASE_URL`). */
export function sitePage(slug: string): string {
  const base = import.meta.env.BASE_URL;
  const s = slug.replace(/^\/+/, '');
  if (!s) return base;
  return `${base}${s}`;
}

/** Главная: корень `BASE_URL`. */
export function siteHome(): string {
  return sitePage('');
}

/** Главная с якорем на виджет поиска туров (`#search`). */
export function siteHomeSearch(): string {
  return `${siteHome()}#search`;
}

/** Главная, секция «Наш блог» (`#journal`). */
export function siteHomeJournal(): string {
  return `${siteHome()}#journal`;
}

/** Политика конфиденциальности. */
export function sitePrivacy(): string {
  return sitePage('privacy');
}

/** Пользовательское соглашение. */
export function siteTerms(): string {
  return sitePage('terms');
}

/** Личный кабинет (вход). */
export function siteCabinet(): string {
  return sitePage('cabinet');
}

/** Список статей журнала: `/blog` или `/base/blog`. */
export function siteBlogIndex(): string {
  return sitePage('blog');
}

/** Страница статьи по slug коллекции `blog`. */
export function siteBlogPost(slug: string): string {
  return sitePage(`blog/${slug}`);
}
