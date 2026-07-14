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
    prices: 'Cenas',
    accommodationPrice: 'Dzīvošana',
    divingPrice: 'Niršana',
    defaultCta: 'Rakstiet mums, lai saņemtu sīkāku informāciju un rezervētu vietu.',
  },
  ru: {
    dates: 'Даты на выбор',
    highlights: 'Что вас ждёт',
    accommodation: 'Проживание',
    gettingThere: 'Как добраться',
    prices: 'Стоимость',
    accommodationPrice: 'Проживание',
    divingPrice: 'Дайвинг',
    defaultCta: 'Напишите нам, чтобы получить подробности и забронировать место.',
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

function TripCard({ trip }: { trip: Trip }) {
  const { lang } = useLang();
  const labels = LABELS[lang];
  const hasPrices = Boolean(trip.accommodationPrice || trip.divingPrice);

  return (
    <article className="trip-card">
      {trip.imageUrl && <div className="trip-card__img" style={{ backgroundImage: `url('${trip.imageUrl}')` }} />}
      <div className="trip-card__body">
        <h3>
          {trip.flag} {trip.title}
        </h3>
        {trip.intro && <p className="trip-card__intro">{trip.intro}</p>}

        <div className="trip-card__grid">
          <TripSection label={labels.dates} icon="📅" items={trip.dates} />
          <TripSection label={labels.highlights} icon="🤿" items={trip.highlights} />
          <TripSection label={labels.accommodation} icon="🏡" items={trip.accommodation} />
          <TripSection label={labels.gettingThere} icon="✈️" items={trip.gettingThere} />
        </div>

        {hasPrices && (
          <div className="trip-card__section">
            <p className="trip-card__label">💶 {labels.prices}</p>
            <ul>
              {trip.accommodationPrice && (
                <li>
                  {labels.accommodationPrice} — {trip.accommodationPrice}
                </li>
              )}
              {trip.divingPrice && (
                <li>
                  {labels.divingPrice} — {trip.divingPrice}
                </li>
              )}
            </ul>
          </div>
        )}

        <p className="trip-card__cta">📩 {trip.cta || labels.defaultCta}</p>
      </div>
    </article>
  );
}

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
            <TripCard trip={trip} key={trip.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
