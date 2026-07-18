import type { MouseEvent } from 'react';
import { useLang } from '@/context/LangContext';
import { useCourseSessions } from '@/hooks/useCourseSessions';
import { ScheduleSection } from '@/components/shared/ScheduleSection';
import { YearGroup } from '@/components/shared/YearGroup';
import type { Lang } from '@/types/content';
import type { CourseSession } from '@/types/calendar';
import type { ByYear } from '@/utils/dateBuckets';

const HEADING = {
  lv: {
    upcoming: { eyebrow: 'Grafiks', title: 'Tuvākās kursu dienas', tab: 'Tuvākās' },
    past: { eyebrow: 'Arhīvs', title: 'Iepriekšējās kursu dienas', tab: 'Iepriekšējās' },
  },
  ru: {
    upcoming: { eyebrow: 'Расписание', title: 'Ближайшие даты курсов', tab: 'Ближайшие' },
    past: { eyebrow: 'Архив', title: 'Прошедшие даты курсов', tab: 'Прошедшие' },
  },
} as const;

const LABELS = {
  lv: {
    full: 'Vietu nav',
    spotsLeft: (free: number, capacity: number) => `${free} no ${capacity} vietām brīvas`,
    sessionsCount: (n: number) => `${n} ${n === 1 ? 'norise' : 'norises'}`,
    emptyUpcoming: 'Šobrīd nav ieplānotu kursu dienu.',
    contactCta: 'Sazināties par kursiem',
    pastCta: 'Skatīt iepriekšējās norises',
    emptyPast: 'Arhīvā vēl nav ierakstu.',
    bookCta: 'Pieteikties',
  },
  ru: {
    full: 'Мест нет',
    spotsLeft: (free: number, capacity: number) => `Свободно ${free} из ${capacity} мест`,
    sessionsCount: (n: number) => `${n} ${n === 1 ? 'дата' : 'даты'}`,
    emptyUpcoming: 'Сейчас нет запланированных дат курсов.',
    contactCta: 'Связаться по курсам',
    pastCta: 'Смотреть прошедшие даты',
    emptyPast: 'В архиве пока нет записей.',
    bookCta: 'Записаться',
  },
} as const;

function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'lv-LV', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatTime(date: Date, lang: Lang): string {
  return date.toLocaleTimeString(lang === 'ru' ? 'ru-RU' : 'lv-LV', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function dateRangeLabel(session: CourseSession, lang: Lang): string {
  const sameDay = session.startDate.toDateString() === session.endDate.toDateString();
  return sameDay
    ? formatDate(session.startDate, lang)
    : `${formatDate(session.startDate, lang)} – ${formatDate(session.endDate, lang)}`;
}

/** Adds the start–end time to the date range, but only for timed events — an all-day
 *  calendar entry has no meaningful time-of-day to show. */
function timeRangeLabel(session: CourseSession, lang: Lang): string | null {
  if (session.allDay) return null;
  return `${formatTime(session.startDate, lang)}–${formatTime(session.endDate, lang)}`;
}

interface UpcomingSessionCardProps {
  session: CourseSession;
  lang: Lang;
  onBook: (session: CourseSession) => void;
}

function UpcomingSessionCard({ session, lang, onBook }: UpcomingSessionCardProps) {
  const labels = LABELS[lang];
  const hasCounts = session.capacity !== null && session.registered !== null;
  const free = hasCounts ? session.capacity! - session.registered! : null;
  const isFull = free !== null && free <= 0;
  const time = timeRangeLabel(session, lang);

  function handleBookClick(e: MouseEvent) {
    // Without this, clicking the button would also toggle the <details> open/closed,
    // since the button lives inside <summary> to keep the whole thing on one compact row.
    e.preventDefault();
    e.stopPropagation();
    onBook(session);
  }

  return (
    <details className="session-row">
      <summary>
        <div className="session-row__top">
          <span className="session-row__title">{session.title}</span>
          {!isFull && (
            <button type="button" className="btn btn--solid btn--sm" onClick={handleBookClick}>
              {labels.bookCta}
            </button>
          )}
        </div>
        <div className="session-row__meta">
          <span>📅 {dateRangeLabel(session, lang)}</span>
          {time && <span>🕐 {time}</span>}
          {session.location && <span>📍 {session.location}</span>}
          {session.instructor && <span>👤 {session.instructor}</span>}
          {free !== null && (
            <span className={`session-row__spots${isFull ? ' session-row__spots--full' : ''}`}>
              {free > 0 ? labels.spotsLeft(free, session.capacity!) : labels.full}
            </span>
          )}
        </div>
      </summary>
      {session.description && (
        <div className="session-row__body">
          <p>{session.description}</p>
        </div>
      )}
    </details>
  );
}

function PastSessionRow({ session, lang }: { session: CourseSession; lang: Lang }) {
  const metaParts = [dateRangeLabel(session, lang), session.location, session.instructor].filter(Boolean);
  return (
    <div className="compact-row">
      <span className="compact-row__title">{session.title}</span>
      <span className="compact-row__meta">{metaParts.join(' · ')}</span>
    </div>
  );
}

interface CourseSessionsSectionProps {
  id?: string;
  onBook: (session: CourseSession) => void;
  onContactUs: () => void;
}

export function CourseSessionsSection({ id, onBook, onContactUs }: CourseSessionsSectionProps) {
  const { lang } = useLang();
  const { upcomingByYear, pastByYear } = useCourseSessions();
  const labels = LABELS[lang];
  const heading = HEADING[lang];

  return (
    <ScheduleSection
      id={id}
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
          {upcomingByYear.map((group: ByYear<CourseSession>) => (
            <YearGroup year={group.year} countLabel={labels.sessionsCount(group.items.length)} defaultOpen key={group.year}>
              <div className="course-catalog" style={{ marginTop: 20 }}>
                {group.items.map((session, i) => (
                  <UpcomingSessionCard session={session} lang={lang} onBook={onBook} key={`${session.title}-${i}`} />
                ))}
              </div>
            </YearGroup>
          ))}
        </div>
      )}
      renderPast={() => (
        <div className="year-group-list">
          {pastByYear.map((group: ByYear<CourseSession>, i) => (
            <YearGroup year={group.year} countLabel={labels.sessionsCount(group.items.length)} defaultOpen={i === 0} key={group.year}>
              <div className="compact-row-list">
                {group.items.map((session, j) => (
                  <PastSessionRow session={session} lang={lang} key={`${session.title}-${j}`} />
                ))}
              </div>
            </YearGroup>
          ))}
        </div>
      )}
    />
  );
}
