/**
 * POST /api/review — заявка «Отзыв»
 * Поля: name (string), phone (string?), email (string?), city (string?),
 *       service (string?), rating (1–5?), review (string), _hp (honeypot)
 */

import type { APIRoute } from 'astro';
import { buildTelegram, isRateLimited, sendEmail, sendTelegram, wrapHtml } from '../../lib/mailer';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress ?? 'unknown';

    if (isRateLimited(ip)) {
      return json({ ok: false, error: 'Слишком много запросов. Попробуйте позже.' }, 429);
    }

    let name     = '';
    let phone    = '';
    let email    = '';
    let city     = '';
    let service  = '';
    let rating   = '';
    let review   = '';
    let honeypot = '';

    const ct = request.headers.get('content-type') ?? '';

    if (ct.includes('application/json')) {
      const body = await request.json().catch(() => ({}));
      name     = String(body.name    ?? '').trim();
      phone    = String(body.phone   ?? '').trim();
      email    = String(body.email   ?? '').trim();
      city     = String(body.city    ?? '').trim();
      service  = String(body.service ?? '').trim();
      rating   = String(body.rating  ?? '').trim();
      review   = String(body.review  ?? '').trim();
      honeypot = String(body._hp     ?? '');
    } else {
      const fd = await request.formData().catch(() => new FormData());
      name     = String(fd.get('name')    ?? '').trim();
      phone    = String(fd.get('phone')   ?? '').trim();
      email    = String(fd.get('email')   ?? '').trim();
      city     = String(fd.get('city')    ?? '').trim();
      service  = String(fd.get('service') ?? '').trim();
      rating   = String(fd.get('rating')  ?? '').trim();
      review   = String(fd.get('review')  ?? '').trim();
      honeypot = String(fd.get('_hp')     ?? '');
    }

    if (honeypot) return json({ ok: true }, 200);

    if (!name   || name.length   < 2)  return json({ ok: false, error: 'Укажите имя' }, 422);
    if (!review || review.length < 10) return json({ ok: false, error: 'Напишите текст отзыва (минимум 10 символов)' }, 422);

    const ratingNum = rating ? Math.min(5, Math.max(1, Number(rating))) : 0;
    const stars     = ratingNum ? '★'.repeat(ratingNum) + '☆'.repeat(5 - ratingNum) : '';

    // Email
    const emailRows: [string, string, boolean?][] = [
      ['Имя клиента',  name],
      ...(phone   ? [['Телефон',     phone,   true] as [string, string, boolean]] : []),
      ...(email   ? [['E-mail',      email]   as [string, string]] : []),
      ...(city    ? [['Город',       city]    as [string, string]] : []),
      ...(service ? [['Услуга',      service] as [string, string]] : []),
      ...(stars   ? [['Оценка',      stars]   as [string, string]] : []),
      ['Текст отзыва', review],
    ];

    await sendEmail({
      subject: `⭐ Отзыв — ${name}${city ? `, ${city}` : ''}`,
      html: wrapHtml('Новый отзыв', '⭐', emailRows),
    });

    // Telegram
    const tgFields: [string, string][] = [
      ['👤 Имя',     name],
      ...(phone   ? [['📱 Телефон',  phone]   as [string, string]] : []),
      ...(email   ? [['📧 E-mail',   email]   as [string, string]] : []),
      ...(city    ? [['🏙 Город',    city]    as [string, string]] : []),
      ...(service ? [['✈️ Услуга',   service] as [string, string]] : []),
      ...(stars   ? [['⭐ Оценка',   stars]   as [string, string]] : []),
    ];

    await sendTelegram(
      buildTelegram('⭐', 'Новый отзыв', tgFields, `💬 Отзыв:\n${review}`),
    );

    return json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Ошибка сервера';
    return json({ ok: false, error: msg }, 500);
  }
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
