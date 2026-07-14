import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { CourseCatalog } from '@/components/shared/CourseCatalog';
import { SubNav } from '@/components/shared/SubNav';
import { ContactForm, type BookingRequest } from '@/components/shared/ContactForm';
import { useLang } from '@/context/LangContext';

const BOOK_LABEL: Record<'lv' | 'ru', string> = { lv: 'Pieteikties', ru: 'Записаться' };

export function ApmacibaKursiPage() {
  const { lang, content } = useLang();
  const { apmacibaKursi } = content;
  const [bookingRequest, setBookingRequest] = useState<BookingRequest | null>(null);

  const allCourseValues = apmacibaKursi.tiers.flatMap((tier) => tier.courses.map((c) => c.bookingValue));

  function handleBook(course: string) {
    setBookingRequest((prev) => ({ course, nonce: (prev?.nonce ?? 0) + 1 }));
  }

  return (
    <Layout slug="apmaciba-kursi">
      <PageHero
        trail={[
          { label: content.nav[1].label, slug: 'apmaciba' },
          { label: apmacibaKursi.heroTitle, slug: 'apmaciba-kursi' },
        ]}
        title={apmacibaKursi.heroTitle}
        lede={apmacibaKursi.heroLede}
      />
      <main>
        <section className="section">
          <div className="section__inner">
            <CourseCatalog tiers={apmacibaKursi.tiers} bookLabel={BOOK_LABEL[lang]} onBook={handleBook} />
            <SubNav items={apmacibaKursi.subnav} />
          </div>
        </section>

        <section className="section section--alt">
          <div className="section__inner" style={{ maxWidth: 640 }}>
            <p className="section__eyebrow">{apmacibaKursi.bookingEyebrow}</p>
            <h2 className="section__title">{apmacibaKursi.bookingTitle}</h2>
            <p className="section__text">{apmacibaKursi.bookingText}</p>

            <div style={{ marginTop: 32 }}>
              <ContactForm
                fromName="Divesport kursu pieteikums"
                courseOptions={allCourseValues}
                bookingRequest={bookingRequest}
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
