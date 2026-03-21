/**
 * Бейджи направлений — те же подписи и цвета, что у карточек туров (PopularTours).
 */
export interface TourStyleBadge {
  label: string;
  className: string;
}

const TOUR_BADGE_BY_DESTINATION: Record<string, TourStyleBadge> = {
  Мальдивы: {
    label: 'Luxury',
    className: 'bg-amber-400/90 text-amber-950',
  },
  Сейшелы: {
    label: 'Острова',
    className: 'bg-[#0d9488]/85 text-white',
  },
  Турция: {
    label: 'Хит продаж',
    className: 'bg-rose-500/90 text-white',
  },
  Таиланд: {
    label: 'Relax',
    className: 'bg-emerald-500/80 text-white',
  },
  Египет: {
    label: 'Всё включено',
    className: 'bg-orange-500/90 text-white',
  },
  Вьетнам: {
    label: 'Пляжный отдых',
    className: 'bg-sky-500/80 text-white',
  },
  Направления: {
    label: 'Подборка',
    className: 'bg-primary/90 text-white',
  },
};

export function getTourStyleBadge(destination: string): TourStyleBadge {
  return (
    TOUR_BADGE_BY_DESTINATION[destination] ?? {
      label: destination,
      className: 'bg-slate-600/85 text-white',
    }
  );
}
