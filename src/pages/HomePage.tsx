import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useLang } from '@/context/LangContext';
import { Hero } from '@/components/home/Hero';
import { QuickPaths } from '@/components/home/QuickPaths';
import { DepthRail } from '@/components/home/DepthRail';
import { TeamGrid } from '@/components/shared/TeamCard';
import { Gallery } from '@/components/shared/Gallery';
import { ContactForm } from '@/components/shared/ContactForm';
import { ContactDetails } from '@/components/shared/ContactDetails';
import { useCourseCatalog } from '@/hooks/useCourseCatalog';

export function HomePage() {
  const { content, pathFor } = useLang();
  const { home } = content;
  const { bookingOptions } = useCourseCatalog();

  return (
    <Layout slug="home">
      <DepthRail />
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

        <section className="section section--alt" id="courses">
          <div className="section__inner">
            <p className="section__eyebrow">{home.coursesEyebrow}</p>
            <h2 className="section__title">{home.coursesTitle}</h2>
            <p className="section__text">{home.coursesText}</p>
            <div className="cards cards--4">
              {home.badgeCards.map((card, i) => (
                <Link to={pathFor(card.slug)} className="card" key={card.slug}>
                  <span className="card__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="travel">
          <div className="section__inner section__inner--split">
            <div>
              <p className="section__eyebrow">{home.travelEyebrow}</p>
              <h2 className="section__title">{home.travelTitle}</h2>
              <p className="section__text">{home.travelText}</p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link to={pathFor('celojumi')} className="btn btn--solid">
                  {home.travelCtaPrimary}
                </Link>
                <Link to={pathFor('celojumi-foto')} className="btn btn--ghost">
                  {home.travelCtaSecondary}
                </Link>
              </div>
            </div>
            <div className="travel__strip">
              {home.travelImages.map((url) => (
                <div className="travel__img" style={{ backgroundImage: `url('${url}')` }} key={url} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt" id="gear">
          <div className="section__inner">
            <p className="section__eyebrow">{home.gearEyebrow}</p>
            <h2 className="section__title">{home.gearTitle}</h2>
            <div className="cards cards--3">
              {home.gearCards.map((card) => (
                <Link to={pathFor(card.slug)} className="card" key={card.slug}>
                  <h3>{card.title}</h3>
                  {card.description && <p>{card.description}</p>}
                  {card.items && (
                    <ul className="card__list">
                      {card.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="gallery">
          <div className="section__inner">
            <p className="section__eyebrow">{home.galleryEyebrow}</p>
            <h2 className="section__title">{home.galleryTitle}</h2>
            <Gallery photos={home.galleryPhotos} />
            <p className="gallery__note">{home.galleryNote}</p>
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
