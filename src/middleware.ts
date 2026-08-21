import { defineMiddleware } from 'astro:middleware';

/**
 * Базовые security-заголовки для всех ответов.
 * CSP с 'unsafe-inline' — из-за inline-скриптов Astro и виджетов Nemo/Tourvisor.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://tourvisor.ru https://cdn.nemo.travel",
  "style-src 'self' 'unsafe-inline' https://cdn.nemo.travel",
  "img-src 'self' data: https: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://tourvisor.ru https://cdn.nemo.travel https://ticket.anrotrip.ru",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://lk.anrotrip.ru",
].join('; ');

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Content-Security-Policy', CONTENT_SECURITY_POLICY);

  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload',
    );
  }

  return response;
});
