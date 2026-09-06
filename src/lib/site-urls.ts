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

/**
 * Публичный origin для OG/canonical за прокси (Dev Tunnel, Caddy).
 * Берёт X-Forwarded-Host / X-Forwarded-Proto, иначе Host, иначе site/fallback.
 */
export function getPublicOrigin(
  request: Request,
  fallbackOrigin: string,
  siteOrigin?: string,
): string {
  const xfHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const xfProto = request.headers
    .get('x-forwarded-proto')
    ?.split(',')[0]
    ?.trim();
  if (xfHost) {
    return `${xfProto || 'https'}://${xfHost}`;
  }

  const host = request.headers.get('host')?.split(',')[0]?.trim();
  if (host && !/^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host)) {
    try {
      const proto = new URL(fallbackOrigin).protocol.replace(':', '') || 'https';
      return `${proto}://${host}`;
    } catch {
      return `https://${host}`;
    }
  }

  if (siteOrigin) return siteOrigin.replace(/\/$/, '');
  return fallbackOrigin;
}

/** Абсолютный URL og:image с опциональным cache-buster (?v=). */
export function resolveOgImageUrl(
  ogImagePath: string,
  publicOrigin: string,
  version?: string,
): string {
  const explicit = import.meta.env.PUBLIC_OG_IMAGE_URL?.trim();
  if (explicit) return explicit;

  const url = new URL(ogImagePath, publicOrigin);
  if (version) url.searchParams.set('v', version);
  return url.href;
}
