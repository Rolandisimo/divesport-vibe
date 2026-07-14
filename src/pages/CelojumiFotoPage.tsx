import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { DestinationGrid } from '@/components/shared/DestinationGrid';
import { useLang } from '@/context/LangContext';

export function CelojumiFotoPage() {
  const { content } = useLang();
  const { celojumiFoto: page } = content;

  return (
    <Layout slug="celojumi-foto">
      <PageHero
        trail={[
          { label: content.nav[2].label, slug: 'celojumi' },
          { label: page.heroTitle, slug: 'celojumi-foto' },
        ]}
        title={page.heroTitle}
        lede={page.heroLede}
      />
      <main>
        <section className="section">
          <div className="section__inner">
            <DestinationGrid destinations={page.destinations} />
            <p className="gallery__note">{page.note}</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
