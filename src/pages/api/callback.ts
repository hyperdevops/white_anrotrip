/**
 * POST /api/callback — заявка «Обратный звонок»
 * Поля: name (string), phone (string), _hp (honeypot, должно быть пустым)
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
    let honeypot = '';

    const ct = request.headers.get('content-type') ?? '';

    if (ct.includes('application/json')) {
      const body = await request.json().catch(() => ({}));
      name     = String(body.name  ?? '').trim();
      phone    = String(body.phone ?? '').trim();
      honeypot = String(body._hp   ?? '');
    } else {
      const fd = await request.formData().catch(() => new FormData());
      name     = String(fd.get('name')  ?? '').trim();
      phone    = String(fd.get('phone') ?? '').trim();
      honeypot = String(fd.get('_hp')   ?? '');
    }

    if (honeypot) return json({ ok: true }, 200);

    if (!name  || name.length  < 2) return json({ ok: false, error: 'Укажите имя' }, 422);
    if (!phone || phone.length < 7) return json({ ok: false, error: 'Укажите телефон' }, 422);

    await sendEmail({
      subject: `📞 Обратный звонок — ${name}`,
      html: wrapHtml('Заказ обратного звонка', '📞', [
        ['Имя клиента', name],
        ['Телефон',     phone, true],
      ]),
    });

    await sendTelegram(buildTelegram('📞', 'Заказ обратного звонка', [
      ['👤 Имя',     name],
      ['📱 Телефон', phone],
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
