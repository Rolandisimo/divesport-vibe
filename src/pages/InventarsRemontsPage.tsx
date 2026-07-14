import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { SubNav } from '@/components/shared/SubNav';
import { useLang } from '@/context/LangContext';

export function InventarsRemontsPage() {
  const { content, pathFor } = useLang();
  const { inventarsRemonts: page } = content;

  return (
    <Layout slug="inventars-remonts">
      <PageHero
        title={page.heroTitle}
        lede={page.heroLede}
      />
      <main>
        <section className="section">
          <div className="section__inner">
            <ul className="card__list" style={{ maxWidth: 680 }}>
              {page.items.map((item) => (
                <li key={item.text}>{item.text}</li>
              ))}
            </ul>
            <Link to={pathFor('kontakti')} className="btn btn--solid" style={{ marginTop: 32 }}>
              {page.cta}
            </Link>
            <SubNav items={page.subnav} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
