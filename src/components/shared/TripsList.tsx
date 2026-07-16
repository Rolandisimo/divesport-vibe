import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import type { PastTripsByYear, Trip } from '@/types/sheets';

type Tab = 'upcoming' | 'past';

const HEADING = {
  lv: {
    upcoming: { eyebrow: 'Plānotie braucieni', title: 'Tuvākie ceļojumi', tab: 'Tuvākie' },
    past: { eyebrow: 'Arhīvs', title: 'Pagājušie ceļojumi', tab: 'Pagājušie' },
  },
  ru: {
    upcoming: { eyebrow: 'Запланированные поездки', title: 'Ближайшие поездки', tab: 'Ближайшие' },
    past: { eyebrow: 'Архив', title: 'Прошедшие поездки', tab: 'Прошедшие' },
  },
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
  /** Past trips don't get a price/booking footer — nothing to book for something already over. */
  showBooking: boolean;
  bookLabel: string;
  onBook: (trip: Trip) => void;
}

function TripCard({ trip, showBooking, bookLabel, onBook }: TripCardProps) {
  const { lang } = useLang();
  const labels = LABELS[lang];

  const priceParts = [
    trip.accommodationPrice && `${labels.accommodationPrice} — ${trip.accommodationPrice}`,
    trip.divingPrice && `${labels.divingPrice} — ${trip.divingPrice}`,
  ].filter(Boolean);

  return (
    <article className={`trip-card${showBooking ? '' : ' trip-card--past'}`}>
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

        {showBooking && (
          <div className="trip-card__footer">
            {priceParts.length > 0 && <span className="trip-card__price">{priceParts.join(' · ')}</span>}
            <button type="button" className="btn btn--solid btn--sm" onClick={() => onBook(trip)}>
              {bookLabel}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function PastYearGroup({
  group,
  bookLabel,
  onBook,
}: {
  group: PastTripsByYear;
  bookLabel: string;
  onBook: (trip: Trip) => void;
}) {
  return (
    <div className="trip-year-group">
      <p className="trip-year-heading">{group.year}</p>
      <div className="trip-list">
        {group.trips.map((trip) => (
          <TripCard trip={trip} showBooking={false} bookLabel={bookLabel} onBook={onBook} key={trip.title} />
        ))}
      </div>
    </div>
  );
}

interface TripsListProps {
  upcoming: Trip[];
  pastByYear: PastTripsByYear[];
  bookLabel: string;
  onBook: (trip: Trip) => void;
}

export function TripsList({ upcoming, pastByYear, bookLabel, onBook }: TripsListProps) {
  const { lang } = useLang();
  const hasUpcoming = upcoming.length > 0;
  const hasPast = pastByYear.length > 0;
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');

  if (!hasUpcoming && !hasPast) return null;

  // Only one bucket has anything — just show it directly, no point in a tab switcher
  // with a single option (or an empty one).
  const effectiveTab: Tab = hasUpcoming && hasPast ? activeTab : hasUpcoming ? 'upcoming' : 'past';
  const showTabs = hasUpcoming && hasPast;
  const heading = HEADING[lang][effectiveTab];

  return (
    <section className="section" style={{ paddingTop: 48 }}>
      <div className="section__inner">
        <p className="section__eyebrow">{heading.eyebrow}</p>
        <h2 className="section__title">{heading.title}</h2>

        {showTabs && (
          <div className="trip-tabs">
            <button
              type="button"
              className={`trip-tab${effectiveTab === 'upcoming' ? ' active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              {HEADING[lang].upcoming.tab}
            </button>
            <button
              type="button"
              className={`trip-tab${effectiveTab === 'past' ? ' active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              {HEADING[lang].past.tab}
            </button>
          </div>
        )}

        {effectiveTab === 'upcoming' ? (
          <div className="trip-list">
            {upcoming.map((trip) => (
              <TripCard trip={trip} showBooking bookLabel={bookLabel} onBook={onBook} key={trip.title} />
            ))}
          </div>
        ) : (
          pastByYear.map((group) => (
            <PastYearGroup group={group} bookLabel={bookLabel} onBook={onBook} key={group.year} />
          ))
        )}
      </div>
    </section>
  );
}
