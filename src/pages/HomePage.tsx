import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useLang } from '@/context/LangContext';
import { Hero } from '@/components/home/Hero';
import { QuickPaths } from '@/components/home/QuickPaths';
import { TeamGrid } from '@/components/shared/TeamCard';
import { ContactForm } from '@/components/shared/ContactForm';
import { ContactDetails } from '@/components/shared/ContactDetails';
import { useCourseCatalog } from '@/hooks/useCourseCatalog';

export function HomePage() {
  const { content, pathFor } = useLang();
  const { home } = content;
  const { bookingOptions } = useCourseCatalog();

  return (
    <Layout slug="home">
      <Hero />
      <QuickPaths />

      <main>
        <section className="section" id="about">
          <div className="section__inner">
            <p className="section__eyebrow">{home.aboutEyebrow}</p>
            <h2 className="section__title">{home.aboutTitle}</h2>
            <p className="section__text">{home.aboutText}</p>
            <Link to={pathFor('par-mums')} className="btn btn--ghost" style={{ marginTop: 20 }}>
              {home.aboutCta}
            </Link>
            <TeamGrid members={home.team} />
          </div>
        </section>

        <section className="section section--contact" id="contact">
          <div className="section__inner section__inner--split">
            <div>
              <p className="section__eyebrow">{home.contactEyebrow}</p>
              <h2 className="section__title">{home.contactTitle}</h2>
              <p className="section__text">{home.contactText}</p>
              <ContactDetails />
            </div>

            <ContactForm fromName="Divesport kontaktforma" courseOptions={bookingOptions} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
