import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import type { TripsByYear, Trip } from '@/types/sheets';

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
    tripsCount: (n: number) => `${n} ${n === 1 ? 'ceļojums' : 'ceļojumi'}`,
    emptyUpcoming: 'Šobrīd nav ieplānotu ceļojumu.',
    contactCta: 'Sazināties par ceļojumiem',
    pastCta: 'Skatīt pagājušos ceļojumus',
    emptyPast: 'Arhīvā vēl nav ceļojumu.',
  },
  ru: {
    dates: 'Даты на выбор',
    highlights: 'Что вас ждёт',
    accommodation: 'Проживание',
    gettingThere: 'Как добраться',
    accommodationPrice: 'Проживание',
    divingPrice: 'Дайвинг',
    tripsCount: (n: number) => `${n} ${n === 1 ? 'поездка' : 'поездок'}`,
    emptyUpcoming: 'Сейчас нет запланированных поездок.',
    contactCta: 'Связаться насчёт поездок',
    pastCta: 'Смотреть прошедшие поездки',
    emptyPast: 'В архиве пока нет поездок.',
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

/** Full detail card — used only for upcoming trips, where the extra detail and booking button earn their space. */
function UpcomingTripCard({ trip, bookLabel, onBook }: { trip: Trip; bookLabel: string; onBook: (trip: Trip) => void }) {
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

/** Compact single-line row — used for past trips. A year can easily hold a dozen-plus entries,
 *  so full detail cards would make the archive unmanageable; a scannable row is what actually works. */
function PastTripRow({ trip }: { trip: Trip }) {
  return (
    <div className="trip-row">
      {trip.flag && <span className="trip-row__flag">{trip.flag}</span>}
      <span className="trip-row__title">{trip.title}</span>
      {trip.dates.length > 0 && <span className="trip-row__dates">{trip.dates.join(' · ')}</span>}
    </div>
  );
}

/** A year's worth of upcoming trips as full cards. Defaults open — there's usually only one or
 *  two upcoming years, and these are the trips someone's actively deciding whether to book. */
function UpcomingYearGroup({ group, bookLabel, onBook }: { group: TripsByYear; bookLabel: string; onBook: (trip: Trip) => void }) {
  const { lang } = useLang();
  return (
    <details className="trip-year-details" open>
      <summary>
        <span>{group.year}</span>
        <span className="trip-year-count">{LABELS[lang].tripsCount(group.trips.length)}</span>
      </summary>
      <div className="trip-list">
        {group.trips.map((trip) => (
          <UpcomingTripCard trip={trip} bookLabel={bookLabel} onBook={onBook} key={trip.title} />
        ))}
      </div>
    </details>
  );
}

/** A year's worth of past trips as compact rows, collapsed by default except the most recent
 *  past year — this is what keeps 16+ trips in a single year from being an unmanageable wall. */
function PastYearGroup({ group, defaultOpen }: { group: TripsByYear; defaultOpen: boolean }) {
  const { lang } = useLang();
  return (
    <details className="trip-year-details" open={defaultOpen}>
      <summary>
        <span>{group.year}</span>
        <span className="trip-year-count">{LABELS[lang].tripsCount(group.trips.length)}</span>
      </summary>
      <div className="trip-row-list">
        {group.trips.map((trip) => (
          <PastTripRow trip={trip} key={trip.title} />
        ))}
      </div>
    </details>
  );
}

interface TripsListProps {
  upcomingByYear: TripsByYear[];
  pastByYear: TripsByYear[];
  bookLabel: string;
  onBook: (trip: Trip) => void;
  onContactUs: () => void;
}

export function TripsList({ upcomingByYear, pastByYear, bookLabel, onBook, onContactUs }: TripsListProps) {
  const { lang } = useLang();
  const labels = LABELS[lang];
  const hasUpcoming = upcomingByYear.length > 0;
  const hasPast = pastByYear.length > 0;
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');

  // Nothing configured in the sheet at all yet — nothing to show.
  if (!hasUpcoming && !hasPast) return null;

  const heading = HEADING[lang][activeTab];

  return (
    <section className="section" style={{ paddingTop: 48 }}>
      <div className="section__inner">
        <p className="section__eyebrow">{heading.eyebrow}</p>
        <h2 className="section__title">{heading.title}</h2>

        {/* The Upcoming tab is always shown, even with nothing in it — see the empty state below. */}
        <div className="trip-tabs">
          <button
            type="button"
            className={`trip-tab${activeTab === 'upcoming' ? ' active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            {HEADING[lang].upcoming.tab}
          </button>
          <button
            type="button"
            className={`trip-tab${activeTab === 'past' ? ' active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            {HEADING[lang].past.tab}
          </button>
        </div>

        {activeTab === 'upcoming' &&
          (hasUpcoming ? (
            <div className="trip-year-list">
              {upcomingByYear.map((group) => (
                <UpcomingYearGroup group={group} bookLabel={bookLabel} onBook={onBook} key={group.year} />
              ))}
            </div>
          ) : (
            <div className="trip-empty">
              <p>{labels.emptyUpcoming}</p>
              <div className="trip-empty__actions">
                <button type="button" className="btn btn--solid" onClick={onContactUs}>
                  {labels.contactCta}
                </button>
                {hasPast && (
                  <button type="button" className="btn btn--ghost" onClick={() => setActiveTab('past')}>
                    {labels.pastCta}
                  </button>
                )}
              </div>
            </div>
          ))}

        {activeTab === 'past' &&
          (hasPast ? (
            <div className="trip-year-list">
              {pastByYear.map((group, i) => (
                <PastYearGroup group={group} defaultOpen={i === 0} key={group.year} />
              ))}
            </div>
          ) : (
            <div className="trip-empty">
              <p>{labels.emptyPast}</p>
            </div>
          ))}
      </div>
    </section>
  );
}
