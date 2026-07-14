import { useLang } from '@/context/LangContext';
import { useHeroGauge } from '@/hooks/useHeroGauge';
import { scrollToId } from '@/utils/scroll';

const HERO_BG = 'https://www.divesport.lv/wp-content/uploads/2018/04/akula-2-1300x535.jpg';

export function Hero() {
  const { content } = useLang();
  const { home } = content;
  const gauge = useHeroGauge();

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
          <button type="button" className="btn btn--solid" onClick={() => scrollToId('courses')}>
            {home.heroCtaPrimary}
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => scrollToId('contact')}>
            {home.heroCtaSecondary}
          </button>
        </div>
      </div>
      <div className="hero__gauge">
        <span className="hero__gauge-label">DEPTH</span>
        <span className="hero__gauge-num">{gauge}</span>
        <span className="hero__gauge-label">M</span>
      </div>
    </section>
  );
}
