import { useLang } from '@/context/LangContext';
import { useCourseSessions } from '@/hooks/useCourseSessions';
import type { Lang } from '@/types/content';
import type { CourseSession } from '@/types/calendar';

const LABELS = {
  lv: {
    eyebrow: 'Grafiks',
    title: 'Tuvākās kursu dienas',
    full: 'Vietu nav',
    spotsLeft: (free: number, capacity: number) => `${free} no ${capacity} vietām brīvas`,
  },
  ru: {
    eyebrow: 'Расписание',
    title: 'Ближайшие даты курсов',
    full: 'Мест нет',
    spotsLeft: (free: number, capacity: number) => `Свободно ${free} из ${capacity} мест`,
  },
} as const;

function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'lv-LV', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function SessionRow({ session, lang }: { session: CourseSession; lang: Lang }) {
  const labels = LABELS[lang];
  const sameDay = session.startDate.toDateString() === session.endDate.toDateString();
  const dateLabel = sameDay
    ? formatDate(session.startDate, lang)
    : `${formatDate(session.startDate, lang)} – ${formatDate(session.endDate, lang)}`;

  const hasCounts = session.capacity !== null && session.registered !== null;
  const free = hasCounts ? session.capacity! - session.registered! : null;

  return (
    <div className="session-row">
      <span className="session-row__date">{dateLabel}</span>
      <span className="session-row__title">{session.title}</span>
      {free !== null && (
        <span className={`session-row__spots${free <= 0 ? ' session-row__spots--full' : ''}`}>
          {free > 0 ? labels.spotsLeft(free, session.capacity!) : labels.full}
        </span>
      )}
    </div>
  );
}

export function CourseSessionsSection() {
  const { lang } = useLang();
  const sessions = useCourseSessions();
  if (sessions.length === 0) return null;

  const labels = LABELS[lang];

  return (
    <section className="section section--alt">
      <div className="section__inner">
        <p className="section__eyebrow">{labels.eyebrow}</p>
        <h2 className="section__title">{labels.title}</h2>
        <div className="session-list">
          {sessions.map((session, i) => (
            <SessionRow session={session} lang={lang} key={`${session.title}-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
