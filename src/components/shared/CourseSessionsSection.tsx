import { useLang } from '@/context/LangContext';
import { useCourseSessions } from '@/hooks/useCourseSessions';
import { useAccordion } from '@/hooks/useAccordion';
import { ScheduleSection } from '@/components/shared/ScheduleSection';
import { YearGroup } from '@/components/shared/YearGroup';
import { ExpandableRow } from '@/components/shared/ExpandableRow';
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
    people: (registered: number, capacity: number) => `${registered}/${capacity} cilvēki`,
    sessionsCount: (n: number) => `${n} ${n === 1 ? 'norise' : 'norises'}`,
    emptyUpcoming: 'Šobrīd nav ieplānotu kursu dienu.',
    contactCta: 'Sazināties par kursiem',
    pastCta: 'Skatīt iepriekšējās norises',
    emptyPast: 'Arhīvā vēl nav ierakstu.',
    joinCta: 'Pievienoties',
  },
  ru: {
    full: 'Мест нет',
    people: (registered: number, capacity: number) => `${registered}/${capacity} человек`,
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
  isOpen: boolean;
  onToggle: () => void;
  onJoin: (session: CourseSession) => void;
}

function UpcomingSessionCard({ session, lang, isOpen, onToggle, onJoin }: UpcomingSessionCardProps) {
  const labels = LABELS[lang];
  const hasCounts = session.capacity !== null && session.registered !== null;
  const isFull = hasCounts && session.registered! >= session.capacity!;
  const time = timeRangeLabel(session, lang);

  const dateLine = time ? `${dateRangeLabel(session, lang)} · ${time}` : dateRangeLabel(session, lang);
  const peopleText = hasCounts && !isFull ? labels.people(session.registered!, session.capacity!) : '';

  return (
    <ExpandableRow
      isOpen={isOpen}
      onToggle={onToggle}
      typeContent={
        <>
          <span className="expandable-row__type-main">{session.diveType}</span>
          {session.diveTypeDetail && <span className="expandable-row__type-detail">{session.diveTypeDetail}</span>}
        </>
      }
      infoContent={
        <>
          <span>📅 {dateLine}</span>
          {session.location && <span>📍 {session.location}</span>}
          {session.instructor && <span>👤 {session.instructor}</span>}
        </>
      }
      actionContent={
        isFull ? (
          <span className="expandable-row__full">{labels.full}</span>
        ) : (
          <div className="expandable-row__action-inner">
            {peopleText && <span className="expandable-row__people">👥 {peopleText}</span>}
            <button type="button" className="btn btn--solid btn--sm" onClick={() => onJoin(session)}>
              {labels.joinCta}
            </button>
          </div>
        )
      }
      bodyContent={
        session.description && (
          // The calendar event's description comes through as sanitized HTML (Google
          // Calendar's rich-text editor stores line breaks/lists/bold as real markup, not
          // plaintext) — rendering it as text would show the raw <br>/<ol> tags literally.
          <div dangerouslySetInnerHTML={{ __html: session.description }} />
        )
      }
    />
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
  const accordion = useAccordion();
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
                {group.items.map((session, i) => {
                  const itemId = `${group.year}-${i}`;
                  return (
                    <UpcomingSessionCard
                      session={session}
                      lang={lang}
                      isOpen={accordion.isOpen(itemId)}
                      onToggle={() => accordion.toggle(itemId)}
                      onJoin={onJoin}
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
