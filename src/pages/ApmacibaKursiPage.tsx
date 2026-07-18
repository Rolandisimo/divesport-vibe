import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { CourseCatalog } from '@/components/shared/CourseCatalog';
import { CourseSessionsSection } from '@/components/shared/CourseSessionsSection';
import { SubNav } from '@/components/shared/SubNav';
import { ContactForm, type PrefillRequest } from '@/components/shared/ContactForm';
import { useLang } from '@/context/LangContext';
import { useCourseCatalog } from '@/hooks/useCourseCatalog';
import { scrollToId } from '@/utils/scroll';
import type { CourseSession } from '@/types/calendar';

function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const JUMP_NAV_LABELS = {
  lv: { schedule: 'Grafiks', catalog: 'Kursi', booking: 'Pieteikšanās' },
  ru: { schedule: 'Расписание', catalog: 'Курсы', booking: 'Запись' },
} as const;

export function ApmacibaKursiPage() {
  const { lang, content } = useLang();
  const { apmacibaKursi, form } = content;
  const { tiers, bookingOptions } = useCourseCatalog();
  const [prefillRequest, setPrefillRequest] = useState<PrefillRequest | null>(null);
  const jumpLabels = JUMP_NAV_LABELS[lang];

  function handleBookCourse(course: string) {
    setPrefillRequest((prev) => ({
      category: form.courseCategoryValue,
      course,
      message: form.courseTemplate(course),
      nonce: (prev?.nonce ?? 0) + 1,
    }));
  }

  function handleJoinSession(session: CourseSession) {
    const sameDay = session.startDate.toDateString() === session.endDate.toDateString();
    const dateLabel = sameDay
      ? session.startDate.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'lv-LV')
      : `${session.startDate.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'lv-LV')} – ${session.endDate.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'lv-LV')}`;
    const sessionTitle = [session.diveType, session.diveTypeDetail].filter(Boolean).join(' — ');

    setPrefillRequest((prev) => ({
      category: form.courseCategoryValue,
      message: form.courseSessionTemplate(sessionTitle, dateLabel, session.location),
      startDate: toDateInputValue(session.startDate),
      nonce: (prev?.nonce ?? 0) + 1,
    }));
  }

  function handleContactUs() {
    setPrefillRequest((prev) => ({
      category: form.courseCategoryValue,
      message: form.courseGeneralInquiryMessage,
      nonce: (prev?.nonce ?? 0) + 1,
    }));
  }

  return (
    <Layout slug="apmaciba-kursi">
      <PageHero title={apmacibaKursi.heroTitle} lede={apmacibaKursi.heroLede}>
        {/* Lets a visitor see the whole page's structure up front, so the schedule section
            below doesn't read as "the whole page" and the catalog gets missed by scrolling. */}
        <div className="jump-nav" style={{ marginTop: 24 }}>
          <button type="button" className="jump-nav__btn" onClick={() => scrollToId('course-schedule')}>
            {jumpLabels.schedule}
          </button>
          <button type="button" className="jump-nav__btn" onClick={() => scrollToId('course-catalog')}>
            {jumpLabels.catalog}
          </button>
          <button type="button" className="jump-nav__btn" onClick={() => scrollToId('booking')}>
            {jumpLabels.booking}
          </button>
        </div>
      </PageHero>
      <main>
        <CourseSessionsSection id="course-schedule" onJoin={handleJoinSession} onContactUs={handleContactUs} />

        <section className="section" id="course-catalog">
          <div className="section__inner">
            <p className="section__eyebrow">{apmacibaKursi.catalogEyebrow}</p>
            <h2 className="section__title">{apmacibaKursi.catalogTitle}</h2>
            <CourseCatalog tiers={tiers} bookLabel={apmacibaKursi.bookButtonLabel} onBook={handleBookCourse} />
            <SubNav items={apmacibaKursi.subnav} />
          </div>
        </section>

        <section className="section">
          <div className="section__inner" style={{ maxWidth: 640 }}>
            <p className="section__eyebrow">{apmacibaKursi.bookingEyebrow}</p>
            <h2 className="section__title">{apmacibaKursi.bookingTitle}</h2>
            <p className="section__text">{apmacibaKursi.bookingText}</p>

            <div style={{ marginTop: 32 }}>
              <ContactForm
                fromName="Divesport kursu pieteikums"
                courseOptions={bookingOptions}
                prefillRequest={prefillRequest}
                sectionId="booking"
              />
            </div>

            <p className="price-note" style={{ marginTop: 24 }}>
              {apmacibaKursi.bookingNote}
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
