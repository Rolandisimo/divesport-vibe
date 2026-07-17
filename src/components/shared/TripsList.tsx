import { useLang } from '@/context/LangContext';
import { ScheduleSection } from '@/components/shared/ScheduleSection';
import { YearGroup } from '@/components/shared/YearGroup';
import type { ByYear } from '@/utils/dateBuckets';
import type { Trip } from '@/types/sheets';

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

function PastTripRow({ trip }: { trip: Trip }) {
  return (
    <div className="compact-row">
      {trip.flag && <span className="compact-row__icon">{trip.flag}</span>}
      <span className="compact-row__title">{trip.title}</span>
      {trip.dates.length > 0 && <span className="compact-row__meta">{trip.dates.join(' · ')}</span>}
    </div>
  );
}

interface TripsListProps {
  upcomingByYear: ByYear<Trip>[];
  pastByYear: ByYear<Trip>[];
  bookLabel: string;
  onBook: (trip: Trip) => void;
  onContactUs: () => void;
}

export function TripsList({ upcomingByYear, pastByYear, bookLabel, onBook, onContactUs }: TripsListProps) {
  const { lang } = useLang();
  const labels = LABELS[lang];
  const heading = HEADING[lang];

  return (
    <ScheduleSection
      hasUpcoming={upcomingByYear.length > 0}
      hasPast={pastByYear.length > 0}
      upcomingLabels={heading.upcoming}
      pastLabels={heading.past}
      emptyUpcomingMessage={labels.emptyUpcoming}
      emptyPastMessage={labels.emptyPast}
      contactCta={{ label: labels.contactCta, onClick: onContactUs }}
      pastCtaLabel={labels.pastCta}
      renderUpcoming={() => (
        <div className="year-group-list">
          {upcomingByYear.map((group) => (
            <YearGroup year={group.year} countLabel={labels.tripsCount(group.items.length)} defaultOpen key={group.year}>
              <div className="trip-list">
                {group.items.map((trip) => (
                  <UpcomingTripCard trip={trip} bookLabel={bookLabel} onBook={onBook} key={trip.title} />
                ))}
              </div>
            </YearGroup>
          ))}
        </div>
      )}
      renderPast={() => (
        <div className="year-group-list">
          {pastByYear.map((group, i) => (
            <YearGroup year={group.year} countLabel={labels.tripsCount(group.items.length)} defaultOpen={i === 0} key={group.year}>
              <div className="compact-row-list">
                {group.items.map((trip) => (
                  <PastTripRow trip={trip} key={trip.title} />
                ))}
              </div>
            </YearGroup>
          ))}
        </div>
      )}
    />
  );
}
