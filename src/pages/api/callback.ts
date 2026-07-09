/**
 * POST /api/callback — заявка «Обратный звонок»
 * Поля: name (string), phone (string), _hp (honeypot, должно быть пустым)
 */

import type { APIRoute } from 'astro';
import { firstZodError, readRequestBody } from '../../lib/api-request';
import { buildTelegram, isRateLimited, sendEmail, sendTelegram, wrapHtml } from '../../lib/mailer';
import { callbackBodySchema } from '../../lib/schemas';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress ?? 'unknown';

    if (isRateLimited(ip)) {
      return json({ ok: false, error: 'Слишком много запросов. Попробуйте позже.' }, 429);
    }

    const body = await readRequestBody(request);

    if (String(body._hp ?? '')) return json({ ok: true }, 200);

    const parsed = callbackBodySchema.safeParse(body);
    if (!parsed.success) {
      return json({ ok: false, error: firstZodError(parsed.error) }, 422);
    }
    const { name, phone } = parsed.data;

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
