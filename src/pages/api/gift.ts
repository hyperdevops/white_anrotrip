/**
 * POST /api/gift — заявка «Подарочный сертификат»
 * Поля: fio (string), phone (string), email (string), _hp (honeypot)
 */

import type { APIRoute } from 'astro';
import { firstZodError, readRequestBody } from '../../lib/api-request';
import { buildTelegram, isRateLimited, sendEmail, sendTelegram, wrapHtml } from '../../lib/mailer';
import { giftBodySchema } from '../../lib/schemas';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress ?? 'unknown';

    if (isRateLimited(ip)) {
      return json({ ok: false, error: 'Слишком много запросов. Попробуйте позже.' }, 429);
    }

    const body = await readRequestBody(request);

    if (String(body._hp ?? '')) return json({ ok: true }, 200);

    const parsed = giftBodySchema.safeParse(body);
    if (!parsed.success) {
      return json({ ok: false, error: firstZodError(parsed.error) }, 422);
    }
    const { fio, phone, email } = parsed.data;

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
