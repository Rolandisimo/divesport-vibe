import { useLang } from '@/context/LangContext';
import { useAccordion } from '@/hooks/useAccordion';
import { ScheduleSection } from '@/components/shared/ScheduleSection';
import { YearGroup } from '@/components/shared/YearGroup';
import { ExpandableRow } from '@/components/shared/ExpandableRow';
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
    moreDates: (n: number) => `+${n} citi datumi`,
    tripsCount: (n: number) => `${n} ${n === 1 ? 'ceļojums' : 'ceļojumi'}`,
    emptyUpcoming: 'Šobrīd nav ieplānotu ceļojumu.',
    loading: 'Ielādē ceļojumus...',
    errorMessage: 'Mēs ceļojam regulāri, taču šobrīd neizdevās ielādēt tuvāko ceļojumu sarakstu. Sazinies ar mums zemāk, lai uzzinātu par tuvākajiem braucieniem.',
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
    moreDates: (n: number) => `+${n} другие даты`,
    tripsCount: (n: number) => `${n} ${n === 1 ? 'поездка' : 'поездок'}`,
    emptyUpcoming: 'Сейчас нет запланированных поездок.',
    loading: 'Загружаем поездки...',
    errorMessage: 'Мы путешествуем регулярно, но сейчас не удалось загрузить список ближайших поездок. Свяжитесь с нами ниже, чтобы узнать о ближайших маршрутах.',
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

interface UpcomingTripCardProps {
  trip: Trip;
  isOpen: boolean;
  onToggle: () => void;
  bookLabel: string;
  onBook: (trip: Trip) => void;
}

function UpcomingTripCard({ trip, isOpen, onToggle, bookLabel, onBook }: UpcomingTripCardProps) {
  const { lang } = useLang();
  const labels = LABELS[lang];

  const priceParts = [
    trip.accommodationPrice && `${labels.accommodationPrice} — ${trip.accommodationPrice}`,
    trip.divingPrice && `${labels.divingPrice} — ${trip.divingPrice}`,
  ].filter(Boolean);
  const extraDates = trip.dates.length - 1;

  return (
    <ExpandableRow
      isOpen={isOpen}
      onToggle={onToggle}
      typeContent={
        <span className="expandable-row__type-main">
          {trip.flag && <span className="trip-card__flag">{trip.flag}</span>}
          {trip.title}
        </span>
      }
      infoContent={
        <>
          {trip.dates.length > 0 && (
            <span>
              📅 {trip.dates[0]}
              {extraDates > 0 && ` (${labels.moreDates(extraDates)})`}
            </span>
          )}
          {priceParts.length > 0 && <span>💶 {priceParts.join(' · ')}</span>}
        </>
      }
      actionContent={
        <button type="button" className="btn btn--solid btn--sm" onClick={() => onBook(trip)}>
          {bookLabel}
        </button>
      }
      bodyContent={
        <>
          {trip.intro && <p className="trip-card__intro">{trip.intro}</p>}
          <div className="trip-card__grid">
            <TripSection label={labels.dates} icon="📅" items={trip.dates} />
            <TripSection label={labels.highlights} icon="🤿" items={trip.highlights} />
            <TripSection label={labels.accommodation} icon="🏡" items={trip.accommodation} />
            <TripSection label={labels.gettingThere} icon="✈️" items={trip.gettingThere} />
          </div>
        </>
      }
    />
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
  isLoading: boolean;
  isError: boolean;
  bookLabel: string;
  onBook: (trip: Trip) => void;
  onContactUs: () => void;
}

export function TripsList({ upcomingByYear, pastByYear, isLoading, isError, bookLabel, onBook, onContactUs }: TripsListProps) {
  const { lang } = useLang();
  const labels = LABELS[lang];
  const heading = HEADING[lang];
  const accordion = useAccordion();

  if (isLoading) {
    return (
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="section__inner">
          <div className="schedule-loading">{labels.loading}</div>
        </div>
      </section>
    );
  }

  // On a fetch error, replace the upcoming list with a friendly pointer to the contact form
  // below instead of showing (possibly stale) fallback trips as if nothing went wrong.
  const effectiveUpcoming = isError ? [] : upcomingByYear;
  const emptyUpcomingMessage = isError ? labels.errorMessage : labels.emptyUpcoming;

  return (
    <ScheduleSection
      hasUpcoming={effectiveUpcoming.length > 0}
      hasPast={pastByYear.length > 0}
      upcomingLabels={heading.upcoming}
      pastLabels={heading.past}
      emptyUpcomingMessage={emptyUpcomingMessage}
      emptyPastMessage={labels.emptyPast}
      contactCta={{ label: labels.contactCta, onClick: onContactUs }}
      pastCtaLabel={labels.pastCta}
      renderUpcoming={() => (
        <div className="year-group-list">
          {effectiveUpcoming.map((group) => (
            <YearGroup year={group.year} countLabel={labels.tripsCount(group.items.length)} defaultOpen key={group.year}>
              <div className="trip-list">
                {group.items.map((trip, i) => {
                  const itemId = `${group.year}-${i}`;
                  return (
                    <UpcomingTripCard
                      trip={trip}
                      isOpen={accordion.isOpen(itemId)}
                      onToggle={() => accordion.toggle(itemId)}
                      bookLabel={bookLabel}
                      onBook={onBook}
                      key={itemId}
                    />
                  );
                })}
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
