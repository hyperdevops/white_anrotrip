/**
 * POST /api/gift — заявка «Подарочный сертификат»
 * Поля: fio (string), phone (string), email (string), _hp (honeypot)
 */

import type { APIRoute } from 'astro';
import { buildTelegram, isRateLimited, sendEmail, sendTelegram, wrapHtml } from '../../lib/mailer';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress ?? 'unknown';

    if (isRateLimited(ip)) {
      return json({ ok: false, error: 'Слишком много запросов. Попробуйте позже.' }, 429);
    }

    let fio      = '';
    let phone    = '';
    let email    = '';
    let honeypot = '';

    const ct = request.headers.get('content-type') ?? '';

    if (ct.includes('application/json')) {
      const body = await request.json().catch(() => ({}));
      fio      = String(body.fio   ?? '').trim();
      phone    = String(body.phone ?? '').trim();
      email    = String(body.email ?? '').trim();
      honeypot = String(body._hp   ?? '');
    } else {
      const fd = await request.formData().catch(() => new FormData());
      fio      = String(fd.get('fio')   ?? '').trim();
      phone    = String(fd.get('phone') ?? '').trim();
      email    = String(fd.get('email') ?? '').trim();
      honeypot = String(fd.get('_hp')   ?? '');
    }

    if (honeypot) return json({ ok: true }, 200);

    if (!fio   || fio.length   < 2)  return json({ ok: false, error: 'Укажите ФИО' }, 422);
    if (!phone || phone.length < 7)  return json({ ok: false, error: 'Укажите телефон' }, 422);
    if (!email || !email.includes('@')) return json({ ok: false, error: 'Укажите e-mail' }, 422);

    await sendEmail({
      subject: `🎁 Подарочный сертификат — ${fio}`,
      html: wrapHtml('Подарочный сертификат', '🎁', [
        ['ФИО клиента', fio],
        ['Телефон',     phone, true],
        ['E-mail',      email],
      ]),
    });

    await sendTelegram(buildTelegram('🎁', 'Подарочный сертификат', [
      ['👤 ФИО',      fio],
      ['📱 Телефон',  phone],
      ['📧 E-mail',   email],
    ]));

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
