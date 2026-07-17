import { Link } from 'react-router-dom';
import { useLang } from '@/context/LangContext';
import { scrollToId } from '@/utils/scroll';

const HERO_BG = 'https://www.divesport.lv/wp-content/uploads/2018/04/akula-2-1300x535.jpg';

export function Hero() {
  const { content, pathFor } = useLang();
  const { home } = content;

  return (
    <section className="hero" id="top">
      <div className="hero__bg" style={{ backgroundImage: `url('${HERO_BG}')` }} />
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="eyebrow">{home.heroEyebrow}</p>
        <h1 className="hero__title-list">
          {home.heroTitleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <div className="hero__cta">
          <Link to={pathFor('apmaciba-kursi')} className="btn btn--solid">
            {home.heroCtaPrimary}
          </Link>
          <button type="button" className="btn btn--ghost" onClick={() => scrollToId('contact')}>
            {home.heroCtaSecondary}
          </button>
        </div>
      </div>
    </section>
  );
}
