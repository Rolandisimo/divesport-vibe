import { Link } from 'react-router-dom';
import { useLang } from '@/context/LangContext';
import type { BadgeCard } from '@/types/content';

export function BadgeCards({ cards }: { cards: BadgeCard[] }) {
  const { pathFor } = useLang();

  return (
    <div className="badge-cards">
      {cards.map((card) => (
        <div className="badge-card" key={card.slug}>
          {card.iconUrl && <img src={card.iconUrl} alt={card.title} />}
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <Link to={pathFor(card.slug)} className="btn btn--ghost">
            {card.ctaLabel}
          </Link>
        </div>
      ))}
    </div>
  );
}
