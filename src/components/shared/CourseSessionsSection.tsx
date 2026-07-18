import { useState } from 'react';
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
    students: (registered: number, capacity: number) => `${registered}/${capacity} studenti`,
    sessionsCount: (n: number) => `${n} ${n === 1 ? 'norise' : 'norises'}`,
    emptyUpcoming: 'Šobrīd nav ieplānotu kursu dienu.',
    contactCta: 'Sazināties par kursiem',
    pastCta: 'Skatīt iepriekšējās norises',
    emptyPast: 'Arhīvā vēl nav ierakstu.',
    joinCta: 'Pievienoties',
  },
  ru: {
    full: 'Мест нет',
    students: (registered: number, capacity: number) => `${registered}/${capacity} студентов`,
    sessionsCount: (n: number) => `${n} ${n === 1 ? 'дата' : 'даты'}`,
    emptyUpcoming: 'Сейчас нет запланированных дат курсов.',
    contactCta: 'Связаться по курсам',
    pastCta: 'Смотреть прошедшие даты',
    emptyPast: 'В архиве пока нет записей.',
    joinCta: 'Присоединиться',
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
  onJoin: (session: CourseSession) => void;
}

function UpcomingSessionCard({ session, lang, onJoin }: UpcomingSessionCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const labels = LABELS[lang];
  const hasCounts = session.capacity !== null && session.registered !== null;
  const isFull = hasCounts && session.registered! >= session.capacity!;
  const time = timeRangeLabel(session, lang);

  const dateLine = time ? `${dateRangeLabel(session, lang)} · ${time}` : dateRangeLabel(session, lang);
  const statusText = hasCounts ? (isFull ? labels.full : labels.students(session.registered!, session.capacity!)) : '';
  const secondLine = [session.instructor, statusText].filter(Boolean).join(' · ');

  return (
    <div className="session-row">
      <div className="session-row__main">
        {/* A plain controlled button — not the native <details>/<summary> disclosure — so
            there's exactly one expand indicator on screen, not a custom one plus whatever
            marker the browser decides to draw on its own for a <summary>. */}
        <button
          type="button"
          className="session-row__toggle"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
        >
          <span className="session-row__indicator">{isOpen ? '–' : '+'}</span>
          <div className="session-row__grid">
            <div className="session-row__type">
              <span className="session-row__type-main">{session.diveType}</span>
              {session.diveTypeDetail && <span className="session-row__type-detail">{session.diveTypeDetail}</span>}
            </div>
            <div className="session-row__info">
              <span>{dateLine}</span>
              {session.location && <span>{session.location}</span>}
              {secondLine && <span>{secondLine}</span>}
            </div>
          </div>
        </button>
        {!isFull && (
          <button type="button" className="btn btn--solid btn--sm" onClick={() => onJoin(session)}>
            {labels.joinCta}
          </button>
        )}
      </div>
      {isOpen && session.description && (
        // The calendar event's description comes through as sanitized HTML (Google
        // Calendar's rich-text editor stores line breaks/lists/bold as real markup, not
        // plaintext) — rendering it as text would show the raw <br>/<ol> tags literally.
        <div className="session-row__body" dangerouslySetInnerHTML={{ __html: session.description }} />
      )}
    </div>
  );
}

function PastSessionRow({ session, lang }: { session: CourseSession; lang: Lang }) {
  const title = [session.diveType, session.diveTypeDetail].filter(Boolean).join(' — ');
  const metaParts = [dateRangeLabel(session, lang), session.location, session.instructor].filter(Boolean);
  return (
    <div className="compact-row">
      <span className="compact-row__title">{title}</span>
      <span className="compact-row__meta">{metaParts.join(' · ')}</span>
    </div>
  );
}

interface CourseSessionsSectionProps {
  id?: string;
  onJoin: (session: CourseSession) => void;
  onContactUs: () => void;
}

export function CourseSessionsSection({ id, onJoin, onContactUs }: CourseSessionsSectionProps) {
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
                  <UpcomingSessionCard session={session} lang={lang} onJoin={onJoin} key={`${session.diveType}-${i}`} />
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
                  <PastSessionRow session={session} lang={lang} key={`${session.diveType}-${j}`} />
                ))}
              </div>
            </YearGroup>
          ))}
        </div>
      )}
    />
  );
}
