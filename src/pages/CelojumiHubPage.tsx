import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { TripsList } from '@/components/shared/TripsList';
import { ContactForm, type PrefillRequest } from '@/components/shared/ContactForm';
import { useLang } from '@/context/LangContext';
import { useTrips } from '@/hooks/useTrips';
import { useCourseCatalog } from '@/hooks/useCourseCatalog';
import type { Trip } from '@/types/sheets';

export function CelojumiHubPage() {
  const { content } = useLang();
  const { celojumiHub: page, form } = content;
  const { upcoming, pastByYear } = useTrips();
  const { bookingOptions } = useCourseCatalog();
  const [prefillRequest, setPrefillRequest] = useState<PrefillRequest | null>(null);

  function handleBookTrip(trip: Trip) {
    setPrefillRequest((prev) => ({
      category: form.tripCategoryValue,
      message: form.tripTemplate(trip.title),
      nonce: (prev?.nonce ?? 0) + 1,
    }));
  }

  return (
    <Layout slug="celojumi">
      <PageHero title={page.heroTitle} lede={page.heroLede} />
      <main>
        <TripsList upcoming={upcoming} pastByYear={pastByYear} bookLabel={page.tripBookButtonLabel} onBook={handleBookTrip} />

        <section className="section">
          <div className="section__inner" style={{ maxWidth: 640 }}>
            <p className="section__eyebrow">{page.bookingEyebrow}</p>
            <h2 className="section__title">{page.bookingTitle}</h2>
            <p className="section__text">{page.bookingText}</p>

            <div style={{ marginTop: 32 }}>
              <ContactForm
                fromName="Divesport ceļojuma pieteikums"
                courseOptions={bookingOptions}
                prefillRequest={prefillRequest}
                sectionId="booking"
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
