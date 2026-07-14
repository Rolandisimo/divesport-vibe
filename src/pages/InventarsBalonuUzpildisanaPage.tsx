import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { PriceList } from '@/components/shared/PriceList';
import { SubNav } from '@/components/shared/SubNav';
import { useLang } from '@/context/LangContext';

export function InventarsBalonuUzpildisanaPage() {
  const { content } = useLang();
  const { inventarsBalonuUzpildisana: page } = content;

  return (
    <Layout slug="inventars-balonu-uzpildisana">
      <PageHero
        trail={[
          { label: content.nav[3].label, slug: 'inventars' },
          { label: page.heroTitle, slug: 'inventars-balonu-uzpildisana' },
        ]}
        title={page.heroTitle}
        lede={page.heroLede}
      />
      <main>
        <section className="section">
          <div className="section__inner">
            <PriceList rows={page.rows} />
            <p className="price-note">{page.note}</p>
            <SubNav items={page.subnav} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
