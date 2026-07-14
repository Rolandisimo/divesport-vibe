import { Link } from 'react-router-dom';
import { useLang } from '@/context/LangContext';

export function QuickPaths() {
  const { content, pathFor } = useLang();
  const { home } = content;

  return (
    <section className="quick-paths">
      <div className="quick-paths__inner">
        <p className="quick-paths__title">{home.quickPathsTitle}</p>
        <p className="quick-paths__subtitle">{home.quickPathsSubtitle}</p>
        <div className="quick-grid">
          {home.quickPaths.map((path) => (
            <Link to={pathFor(path.slug)} className="quick-card" key={path.slug}>
              <span className="quick-card__icon">{path.icon}</span>
              <span className="quick-card__arrow">→</span>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
