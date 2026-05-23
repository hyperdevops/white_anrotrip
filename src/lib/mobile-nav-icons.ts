/**
 * Иконки мобильного меню: Font Awesome Free (классы fa-solid / fa-brands) + цвет кружка.
 * Размер задаётся в Header через text-* на <i>.
 *
 * default — палитра главной: primary / secondary / cta из @theme.
 * *-corp — деловой стиль: slate/gray + сбалансированные акценты primary / primary-dark.
 */
export interface MobileNavIconDef {
  box: string;
  icon: string;
  /** Полная строка классов FA, напр. fa-solid fa-magnifying-glass */
  fa: string;
}

const fallback: MobileNavIconDef = {
  box: 'bg-gray-100',
  icon: 'text-gray-600',
  fa: 'fa-solid fa-link',
};

const map: Record<string, MobileNavIconDef> = {
  /* ─── Главная (default) — бренд ANRO TRIP ─── */
  Авиабилеты: {
    box: 'bg-primary-light/12',
    icon: 'text-primary',
    fa: 'fa-solid fa-plane-departure',
  },
  Туры: {
    box: 'bg-primary/12',
    icon: 'text-primary',
    fa: 'fa-solid fa-globe',
  },
  Журнал: {
    box: 'bg-secondary/10',
    icon: 'text-secondary',
    fa: 'fa-solid fa-newspaper',
  },
  'О компании': {
    box: 'bg-primary/10',
    icon: 'text-primary-dark',
    fa: 'fa-solid fa-building',
  },
  Доверие: {
    box: 'bg-secondary/10',
    icon: 'text-secondary',
    fa: 'fa-solid fa-shield-halved',
  },
  'О нас': {
    box: 'bg-primary/10',
    icon: 'text-primary-dark',
    fa: 'fa-solid fa-circle-info',
  },
  'Наши услуги': {
    box: 'bg-secondary/12',
    icon: 'text-secondary',
    fa: 'fa-solid fa-list-check',
  },
  Направления: {
    box: 'bg-primary-light/12',
    icon: 'text-primary',
    fa: 'fa-solid fa-arrow-trend-up',
  },
  'Для бизнеса': {
    box: 'bg-secondary/12',
    icon: 'text-secondary',
    fa: 'fa-solid fa-briefcase',
  },
  Партнеры: {
    box: 'bg-primary/10',
    icon: 'text-primary',
    fa: 'fa-solid fa-handshake',
  },
  Партнёры: {
    box: 'bg-primary/10',
    icon: 'text-primary',
    fa: 'fa-solid fa-handshake',
  },
  Отзывы: {
    box: 'bg-cta/20',
    icon: 'text-yellow-900',
    fa: 'fa-solid fa-star',
  },
  Награды: {
    box: 'bg-cta/22',
    icon: 'text-yellow-900',
    fa: 'fa-solid fa-trophy',
  },
  Сертификат: {
    box: 'bg-cta/18',
    icon: 'text-yellow-900',
    fa: 'fa-solid fa-gift',
  },
  Вопросы: {
    box: 'bg-secondary/12',
    icon: 'text-secondary',
    fa: 'fa-solid fa-circle-question',
  },
  Команда: {
    box: 'bg-primary-light/14',
    icon: 'text-primary-dark',
    fa: 'fa-solid fa-users',
  },
  Контакты: {
    box: 'bg-primary/12',
    icon: 'text-primary',
    fa: 'fa-solid fa-clipboard-list',
  },
  Избранное: {
    box: 'bg-secondary/8',
    icon: 'text-secondary',
    fa: 'fa-solid fa-heart',
  },

  /* ─── CORP: нейтраль + ритм primary / primary-dark (бизнес, без «сплошного серого») ─── */
  'О компании-corp': {
    box: 'bg-slate-400/10',
    icon: 'text-primary-dark/90',
    fa: 'fa-solid fa-building',
  },
  'Авиабилеты-corp': {
    box: 'bg-primary-light/12',
    icon: 'text-primary-dark/90',
    fa: 'fa-solid fa-plane-departure',
  },
  'Отели-corp': {
    box: 'bg-slate-400/10',
    icon: 'text-primary/80',
    fa: 'fa-solid fa-hotel',
  },
  'Туры-corp': {
    box: 'bg-primary/10',
    icon: 'text-primary-dark',
    fa: 'fa-solid fa-magnifying-glass',
  },
  'Трансфер-corp': {
    box: 'bg-gray-400/10',
    icon: 'text-primary-dark/85',
    fa: 'fa-solid fa-car-side',
  },
  'Преимущества-corp': {
    box: 'bg-primary/8',
    icon: 'text-primary/88',
    fa: 'fa-solid fa-wand-magic-sparkles',
  },
  'Контакты-corp': {
    box: 'bg-primary-dark/10',
    icon: 'text-primary',
    fa: 'fa-solid fa-clipboard-list',
  },
};

export function getMobileNavIcon(
  label: string,
  navVariant: 'default' | 'corp' = 'default',
): MobileNavIconDef {
  const corpLabel = `${label}-corp`;
  if (navVariant === 'corp' && map[corpLabel]) {
    return map[corpLabel];
  }
  return map[label] ?? fallback;
}
