import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { SubNav } from '@/components/shared/SubNav';
import { useLang } from '@/context/LangContext';

export function ApmacibaSpecializacijasPage() {
  const { content, pathFor } = useLang();
  const { apmacibaSpecializacijas: page } = content;

  return (
    <Layout slug="apmaciba-specializacijas">
      <PageHero
        title={page.heroTitle}
        lede={page.heroLede}
      />
      <main>
        <section className="section">
          <div className="section__inner">
            <p className="section__text">{page.intro}</p>
            <div className="cards cards--3" style={{ marginTop: 40 }}>
              {page.specialties.map((s) => (
                <article className="card" key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </article>
              ))}
            </div>
            <p className="price-note">{page.note}</p>
            <Link to={pathFor('kontakti')} className="btn btn--solid" style={{ marginTop: 16 }}>
              {page.cta}
            </Link>
            <SubNav items={page.subnav} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
