import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { CourseCatalog } from '@/components/shared/CourseCatalog';
import { CourseSessionsSection } from '@/components/shared/CourseSessionsSection';
import { SubNav } from '@/components/shared/SubNav';
import { ContactForm, type PrefillRequest } from '@/components/shared/ContactForm';
import { useLang } from '@/context/LangContext';
import { useCourseCatalog } from '@/hooks/useCourseCatalog';

export function ApmacibaKursiPage() {
  const { content } = useLang();
  const { apmacibaKursi, form } = content;
  const { tiers, bookingOptions } = useCourseCatalog();
  const [prefillRequest, setPrefillRequest] = useState<PrefillRequest | null>(null);

  function handleBook(course: string) {
    setPrefillRequest((prev) => ({
      category: form.courseCategoryValue,
      course,
      message: form.courseTemplate(course),
      nonce: (prev?.nonce ?? 0) + 1,
    }));
  }

  return (
    <Layout slug="apmaciba-kursi">
      <PageHero
        title={apmacibaKursi.heroTitle}
        lede={apmacibaKursi.heroLede}
      />
      <main>
        <section className="section">
          <div className="section__inner">
            <CourseCatalog tiers={tiers} bookLabel={apmacibaKursi.bookButtonLabel} onBook={handleBook} />
            <SubNav items={apmacibaKursi.subnav} />
          </div>
        </section>

        <CourseSessionsSection />

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
