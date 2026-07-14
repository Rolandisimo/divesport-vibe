import { Layout } from '@/components/layout/Layout';
import { ContactForm } from '@/components/shared/ContactForm';
import { ContactDetails } from '@/components/shared/ContactDetails';
import { useLang } from '@/context/LangContext';
import { useCourseCatalog } from '@/hooks/useCourseCatalog';

export function KontaktiPage() {
  const { content } = useLang();
  const { kontakti: page } = content;
  const { bookingOptions } = useCourseCatalog();

  return (
    <Layout slug="kontakti">
      <main>
        <section className="section section--contact">
          <div className="section__inner section__inner--split">
            <div>
              <h1 className="section__title">{page.heroTitle}</h1>
              <p className="section__text" style={{ marginBottom: 28 }}>
                {page.heroLede}
              </p>
              <ContactDetails />
            </div>

            <ContactForm fromName="Divesport kontaktforma" courseOptions={bookingOptions} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
