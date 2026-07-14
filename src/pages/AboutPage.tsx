import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { TeamGrid } from '@/components/shared/TeamCard';
import { Gallery } from '@/components/shared/Gallery';
import { useLang } from '@/context/LangContext';

export function AboutPage() {
  const { content } = useLang();
  const { about } = content;

  return (
    <Layout slug="par-mums">
      <PageHero title={about.heroTitle} lede={about.heroLede} />
      <main>
        <section className="section">
          <div className="section__inner">
            <p className="section__text">{about.intro}</p>
            <TeamGrid members={about.team} />
            <div style={{ marginTop: 56 }}>
              <Gallery photos={about.galleryPhotos} />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
