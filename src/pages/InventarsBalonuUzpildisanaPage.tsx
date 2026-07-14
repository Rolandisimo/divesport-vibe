import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { PriceList } from '@/components/shared/PriceList';
import { SubNav } from '@/components/shared/SubNav';
import { useLang } from '@/context/LangContext';
import { useSheetData } from '@/hooks/useSheetData';
import { TANK_PRICES_SHEET_URL } from '@/config/sheets';
import { mapTankPriceRow } from '@/types/sheets';

export function InventarsBalonuUzpildisanaPage() {
  const { lang, content } = useLang();
  const { inventarsBalonuUzpildisana: page } = content;
  const { data: rows } = useSheetData(TANK_PRICES_SHEET_URL, lang, mapTankPriceRow, page.rows);

  return (
    <Layout slug="inventars-balonu-uzpildisana">
      <PageHero
        title={page.heroTitle}
        lede={page.heroLede}
      />
      <main>
        <section className="section">
          <div className="section__inner">
            <PriceList rows={rows} />
            <p className="price-note">{page.note}</p>
            <SubNav items={page.subnav} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
