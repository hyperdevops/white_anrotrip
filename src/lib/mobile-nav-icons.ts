/**
 * Иконки мобильного меню: Font Awesome Free (классы fa-solid / fa-brands) + цвет кружка.
 * Размер задаётся в Header через text-* на <i>.
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
  Туры: {
    box: 'bg-primary/12',
    icon: 'text-primary',
    fa: 'fa-solid fa-magnifying-glass',
  },
  Журнал: {
    box: 'bg-sky-500/12',
    icon: 'text-sky-600',
    fa: 'fa-solid fa-newspaper',
  },
  'О нас': {
    box: 'bg-violet-500/12',
    icon: 'text-violet-600',
    fa: 'fa-solid fa-circle-info',
  },
  Бизнес: {
    box: 'bg-secondary/12',
    icon: 'text-secondary',
    fa: 'fa-solid fa-briefcase',
  },
  Отзывы: {
    box: 'bg-amber-500/12',
    icon: 'text-amber-600',
    fa: 'fa-solid fa-star',
  },
  Награды: {
    box: 'bg-[#ffd417]/25',
    icon: 'text-yellow-700',
    fa: 'fa-solid fa-trophy',
  },
  Подарок: {
    box: 'bg-rose-500/12',
    icon: 'text-rose-600',
    fa: 'fa-solid fa-gift',
  },
  Вопросы: {
    box: 'bg-gray-400/15',
    icon: 'text-gray-600',
    fa: 'fa-solid fa-circle-question',
  },
  Команда: {
    box: 'bg-teal-500/12',
    icon: 'text-teal-700',
    fa: 'fa-solid fa-users',
  },
  Контакты: {
    box: 'bg-primary/12',
    icon: 'text-primary',
    fa: 'fa-solid fa-clipboard-list',
  },
  Избранное: {
    box: 'bg-red-500/12',
    icon: 'text-red-600',
    fa: 'fa-solid fa-heart',
  },
  'О компании': {
    box: 'bg-secondary/12',
    icon: 'text-secondary',
    fa: 'fa-solid fa-building',
  },
  Авиабилеты: {
    box: 'bg-sky-500/12',
    icon: 'text-sky-600',
    fa: 'fa-solid fa-plane-departure',
  },
  Отели: {
    box: 'bg-violet-500/12',
    icon: 'text-violet-600',
    fa: 'fa-solid fa-hotel',
  },
  Трансфер: {
    box: 'bg-amber-500/12',
    icon: 'text-amber-700',
    fa: 'fa-solid fa-car-side',
  },
  /** Только corp: мобильное меню — в ряду sky / violet / primary / emerald гармонирует как «между» небом и бренд-teal */
  'Трансфер-corp': {
    box: 'bg-cyan-500/12',
    icon: 'text-cyan-700',
    fa: 'fa-solid fa-car-side',
  },
  Преимущества: {
    box: 'bg-emerald-500/12',
    icon: 'text-emerald-700',
    fa: 'fa-solid fa-wand-magic-sparkles',
  },
};

export function getMobileNavIcon(
  label: string,
  navVariant: 'default' | 'corp' = 'default',
): MobileNavIconDef {
  if (navVariant === 'corp' && label === 'Трансфер') {
    return map['Трансфер-corp'];
  }
  return map[label] ?? fallback;
}
