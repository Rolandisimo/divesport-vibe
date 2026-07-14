import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { BadgeCards } from '@/components/shared/BadgeCards';
import { useLang } from '@/context/LangContext';

export function ApmacibaHubPage() {
  const { content } = useLang();
  const { apmacibaHub } = content;

  return (
    <Layout slug="apmaciba">
      <PageHero title={apmacibaHub.heroTitle} lede={apmacibaHub.heroLede} />
      <main>
        <section className="section">
          <div className="section__inner">
            <BadgeCards cards={apmacibaHub.cards} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
