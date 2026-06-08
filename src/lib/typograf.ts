import Typograf from 'typograf';

/** Русская типографика: неразрывные пробелы, тире, кавычки. Только невидимые сущности → &nbsp; */
const tp = new Typograf({ locale: ['ru', 'en-US'] });

/** Не трогаем телефоны в тексте турфирмы — ложные срабатывания */
tp.disableRule('ru/other/phone-number');

/** Обычный текст (заголовки карточек, description). */
export function typografText(text: string): string {
  if (!text?.trim()) return text;
  return tp.execute(text);
}

/** HTML-тело статьи (с тегами). */
export function typografHtml(html: string): string {
  if (!html?.trim()) return html;
  return tp.execute(html);
}

export { tp as typografInstance };
