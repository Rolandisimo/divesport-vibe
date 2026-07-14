import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { DestinationGrid } from '@/components/shared/DestinationGrid';
import { useLang } from '@/context/LangContext';
import { useSheetData } from '@/hooks/useSheetData';
import { DESTINATIONS_SHEET_URL } from '@/config/sheets';
import { mapDestinationRow } from '@/types/sheets';

export function CelojumiFotoPage() {
  const { lang, content } = useLang();
  const { celojumiFoto: page } = content;
  const { data: destinations } = useSheetData(DESTINATIONS_SHEET_URL, lang, mapDestinationRow, page.destinations);

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
            <DestinationGrid destinations={destinations} />
            <p className="gallery__note">{page.note}</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
