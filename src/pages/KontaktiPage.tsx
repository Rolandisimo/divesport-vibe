import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
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
      <PageHero trail={[{ label: page.heroTitle, slug: 'kontakti' }]} title={page.heroTitle} lede={page.heroLede} />
      <main>
        <section className="section section--contact">
          <div className="section__inner section__inner--split">
            <div>
              <ContactDetails />
            </div>

            <ContactForm fromName="Divesport kontaktforma" courseOptions={bookingOptions} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
