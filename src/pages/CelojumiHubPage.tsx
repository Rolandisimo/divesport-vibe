import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { useLang } from '@/context/LangContext';

export function CelojumiHubPage() {
  const { content, pathFor } = useLang();
  const { celojumiHub: page } = content;

  return (
    <Layout slug="celojumi">
      <PageHero trail={[{ label: page.heroTitle, slug: 'celojumi' }]} title={page.heroTitle} lede={page.heroLede} />
      <main>
        <section className="section">
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
      </main>
    </Layout>
  );
}
