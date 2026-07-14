import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { TripsList } from '@/components/shared/TripsList';
import { ContactForm, type PrefillRequest } from '@/components/shared/ContactForm';
import { useLang } from '@/context/LangContext';
import { useSheetData } from '@/hooks/useSheetData';
import { useCourseCatalog } from '@/hooks/useCourseCatalog';
import { TRIPS_SHEET_URL } from '@/config/sheets';
import { mapTripRow, type Trip } from '@/types/sheets';

const NO_TRIPS: Trip[] = [];

export function CelojumiHubPage() {
  const { lang, content, pathFor } = useLang();
  const { celojumiHub: page, form } = content;
  const { data: trips } = useSheetData(TRIPS_SHEET_URL, lang, mapTripRow, NO_TRIPS);
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
      <main>
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="section__inner">
            <h1 className="section__title">{page.heroTitle}</h1>
            <p className="section__text">{page.heroLede}</p>
          </div>
        </section>

        <TripsList trips={trips} bookLabel={page.tripBookButtonLabel} onBook={handleBookTrip} />

        <section className="section section--alt">
          <div className="section__inner section__inner--split">
            <div>
              {page.paragraphs.map((p, i) => (
                <p className="section__text" style={i > 0 ? { marginTop: 16 } : undefined} key={p}>
                  {p}
                </p>
              ))}
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
                <Link to={pathFor('kontakti')} className="btn btn--solid">
                  {page.ctaPrimary}
                </Link>
                <Link to={pathFor('celojumi-foto')} className="btn btn--ghost">
                  {page.ctaSecondary}
                </Link>
              </div>
            </div>
            <div className="travel__strip">
              {page.images.map((url) => (
                <div className="travel__img" style={{ backgroundImage: `url('${url}')` }} key={url} />
              ))}
            </div>
          </div>
        </section>

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
