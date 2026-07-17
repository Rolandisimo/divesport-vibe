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

function dateRangeLabel(session: CourseSession, lang: Lang): string {
  const sameDay = session.startDate.toDateString() === session.endDate.toDateString();
  return sameDay
    ? formatDate(session.startDate, lang)
    : `${formatDate(session.startDate, lang)} – ${formatDate(session.endDate, lang)}`;
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
  const metaParts = [dateRangeLabel(session, lang), session.location].filter(Boolean);

  return (
    <div className="course-card">
      <h3>{session.title}</h3>
      <p>{metaParts.join(' · ')}</p>
      <div className="course-card__footer">
        {free !== null && (
          <span className="course-card__price">{free > 0 ? labels.spotsLeft(free, session.capacity!) : labels.full}</span>
        )}
        {!isFull && (
          <button type="button" className="btn btn--solid btn--sm" onClick={() => onBook(session)}>
            {labels.bookCta}
          </button>
        )}
      </div>
    </div>
  );
}

function PastSessionRow({ session, lang }: { session: CourseSession; lang: Lang }) {
  const metaParts = [dateRangeLabel(session, lang), session.location].filter(Boolean);
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
