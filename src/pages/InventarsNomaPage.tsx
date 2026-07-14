import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { SubNav } from '@/components/shared/SubNav';
import { useLang } from '@/context/LangContext';

export function InventarsNomaPage() {
  const { content, pathFor } = useLang();
  const { inventarsNoma: page } = content;

  return (
    <Layout slug="inventars-noma">
      <PageHero
        trail={[
          { label: content.nav[3].label, slug: 'inventars' },
          { label: page.heroTitle, slug: 'inventars-noma' },
        ]}
        title={page.heroTitle}
        lede={page.heroLede}
      />
      <main>
        <section className="section">
          <div className="section__inner">
            {page.paragraphs.map((p, i) => (
              <p className="section__text" style={i > 0 ? { marginTop: 16 } : undefined} key={p}>
                {p}
              </p>
            ))}
            <Link to={pathFor('kontakti')} className="btn btn--solid" style={{ marginTop: 24 }}>
              {page.cta}
            </Link>
            <SubNav items={page.subnav} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
