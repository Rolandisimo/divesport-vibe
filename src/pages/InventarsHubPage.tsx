import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/shared/PageHero';
import { useLang } from '@/context/LangContext';

export function InventarsHubPage() {
  const { content, pathFor } = useLang();
  const { inventarsHub: page } = content;

  return (
    <Layout slug="inventars">
      <PageHero title={page.heroTitle} lede={page.heroLede} />
      <main>
        <section className="section">
          <div className="section__inner">
            <div className="cards cards--3">
              {page.cards.map((card) => (
                <article className="card" key={card.slug}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <Link to={pathFor(card.slug)} className="btn btn--ghost" style={{ marginTop: 16 }}>
                    {card.ctaLabel}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
