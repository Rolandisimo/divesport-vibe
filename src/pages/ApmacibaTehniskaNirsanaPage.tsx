import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { TeamCard } from '@/components/shared/TeamCard';
import { SubNav } from '@/components/shared/SubNav';
import { useLang } from '@/context/LangContext';

export function ApmacibaTehniskaNirsanaPage() {
  const { content, pathFor } = useLang();
  const { apmacibaTehniskaNirsana: page } = content;

  return (
    <Layout slug="apmaciba-tehniska-nirsana">
      <PageHero
        trail={[
          { label: content.nav[1].label, slug: 'apmaciba' },
          { label: page.heroTitle, slug: 'apmaciba-tehniska-nirsana' },
        ]}
        title={page.heroTitle}
        lede={page.heroLede}
      />
      <main>
        <section className="section">
          <div className="section__inner section__inner--split">
            <div>
              {page.paragraphs.map((p) => (
                <p className="section__text" style={{ marginTop: 16 }} key={p}>
                  {p}
                </p>
              ))}
              <Link to={pathFor('kontakti')} className="btn btn--solid" style={{ marginTop: 24 }}>
                {page.cta}
              </Link>
            </div>
            <TeamCard member={page.instructor} />
          </div>
        </section>

        <section className="section section--alt">
          <div className="section__inner">
            <SubNav
              items={[...page.subnav, { label: content.lang === 'ru' ? 'Заправка O2 / Тримикс →' : 'O2 / Trimix uzpilde →', slug: 'inventars-balonu-uzpildisana' }]}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
