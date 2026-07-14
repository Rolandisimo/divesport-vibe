import { useLang } from '@/context/LangContext';
import type { Trip } from '@/types/sheets';

const HEADING = {
  lv: { eyebrow: 'Plānotie braucieni', title: 'Tuvākie ceļojumi' },
  ru: { eyebrow: 'Запланированные поездки', title: 'Ближайшие поездки' },
} as const;

const LABELS = {
  lv: {
    dates: 'Datumi pēc izvēles',
    highlights: 'Kas jūs sagaida',
    accommodation: 'Naktsmītnes',
    gettingThere: 'Kā nokļūt',
    accommodationPrice: 'Dzīvošana',
    divingPrice: 'Niršana',
  },
  ru: {
    dates: 'Даты на выбор',
    highlights: 'Что вас ждёт',
    accommodation: 'Проживание',
    gettingThere: 'Как добраться',
    accommodationPrice: 'Проживание',
    divingPrice: 'Дайвинг',
  },
} as const;

function TripSection({ label, icon, items }: { label: string; icon: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="trip-card__section">
      <p className="trip-card__label">
        {icon} {label}
      </p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

interface TripCardProps {
  trip: Trip;
  bookLabel: string;
  onBook: (trip: Trip) => void;
}

function TripCard({ trip, bookLabel, onBook }: TripCardProps) {
  const { lang } = useLang();
  const labels = LABELS[lang];

  const priceParts = [
    trip.accommodationPrice && `${labels.accommodationPrice} — ${trip.accommodationPrice}`,
    trip.divingPrice && `${labels.divingPrice} — ${trip.divingPrice}`,
  ].filter(Boolean);

  return (
    <article className="trip-card">
      {trip.imageUrl && <div className="trip-card__img" style={{ backgroundImage: `url('${trip.imageUrl}')` }} />}
      <div className="trip-card__body">
        <h3>
          {trip.flag && <span className="trip-card__flag">{trip.flag}</span>}
          {trip.title}
        </h3>
        {trip.intro && <p className="trip-card__intro">{trip.intro}</p>}

        <div className="trip-card__grid">
          <TripSection label={labels.dates} icon="📅" items={trip.dates} />
          <TripSection label={labels.highlights} icon="🤿" items={trip.highlights} />
          <TripSection label={labels.accommodation} icon="🏡" items={trip.accommodation} />
          <TripSection label={labels.gettingThere} icon="✈️" items={trip.gettingThere} />
        </div>

        <div className="trip-card__footer">
          {priceParts.length > 0 && <span className="trip-card__price">{priceParts.join(' · ')}</span>}
          <button type="button" className="btn btn--solid btn--sm" onClick={() => onBook(trip)}>
            {bookLabel}
          </button>
        </div>
      </div>
    </article>
  );
}

interface TripsListProps {
  trips: Trip[];
  bookLabel: string;
  onBook: (trip: Trip) => void;
}

export function TripsList({ trips, bookLabel, onBook }: TripsListProps) {
  const { lang } = useLang();
  if (trips.length === 0) return null;

  const heading = HEADING[lang];

  return (
    <section className="section">
      <div className="section__inner">
        <p className="section__eyebrow">{heading.eyebrow}</p>
        <h2 className="section__title">{heading.title}</h2>
        <div className="trip-list">
          {trips.map((trip) => (
            <TripCard trip={trip} bookLabel={bookLabel} onBook={onBook} key={trip.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
