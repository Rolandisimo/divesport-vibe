import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { ContactForm } from '@/components/shared/ContactForm';
import { useLang } from '@/context/LangContext';

export function KontaktiPage() {
  const { content, lang } = useLang();
  const { kontakti: page, contactInfo } = content;

  return (
    <Layout slug="kontakti">
      <PageHero trail={[{ label: page.heroTitle, slug: 'kontakti' }]} title={page.heroTitle} lede={page.heroLede} />
      <main>
        <section className="section section--contact">
          <div className="section__inner section__inner--split">
            <div>
              <ul className="contact-info">
                <li>
                  <span>{lang === 'ru' ? 'Адрес' : 'Adrese'}</span> {contactInfo.address}
                </li>
                <li>
                  <span>{lang === 'ru' ? 'Телефон' : 'Tālrunis'}</span>{' '}
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>{contactInfo.phone}</a>
                </li>
                <li>
                  <span>{lang === 'ru' ? 'Эл. почта' : 'E-pasts'}</span>{' '}
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </li>
                <li>
                  <span>{lang === 'ru' ? 'Инструктор' : 'Instruktors'}</span> {contactInfo.instructor}
                </li>
              </ul>

              <div className="map">
                <iframe
                  src="https://maps.google.com/maps?q=Stiebru%20iela%2015%2C%20Me%C5%BE%C4%81res%2C%20Bab%C4%ABtes%20pagasts%2C%20LV-2101&t=m&z=13&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Divesport karte"
                />
              </div>
            </div>

            <ContactForm fromName="Divesport kontaktforma" />
          </div>
        </section>
      </main>
    </Layout>
  );
}
