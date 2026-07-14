import { useLang } from '@/context/LangContext';
import type { Trip } from '@/types/sheets';

const HEADING = {
  lv: { eyebrow: 'Plānotie braucieni', title: 'Tuvākie ceļojumi' },
  ru: { eyebrow: 'Запланированные поездки', title: 'Ближайшие поездки' },
} as const;

export function TripsList({ trips }: { trips: Trip[] }) {
  const { lang } = useLang();
  if (trips.length === 0) return null;

  const heading = HEADING[lang];

  return (
    <section className="section section--alt">
      <div className="section__inner">
        <p className="section__eyebrow">{heading.eyebrow}</p>
        <h2 className="section__title">{heading.title}</h2>
        <div className="trip-list">
          {trips.map((trip) => (
            <article className="trip-card" key={trip.title}>
              {trip.imageUrl && <div className="trip-card__img" style={{ backgroundImage: `url('${trip.imageUrl}')` }} />}
              <div className="trip-card__body">
                {trip.dates && <span className="trip-card__dates">{trip.dates}</span>}
                <h3>{trip.title}</h3>
                {trip.description && <p>{trip.description}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
