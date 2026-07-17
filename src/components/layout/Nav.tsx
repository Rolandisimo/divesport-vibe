import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useLang } from '@/context/LangContext';
import { useMobileNav } from '@/hooks/useMobileNav';

export function Nav() {
  const { content, pathFor } = useLang();
  const mobileNav = useMobileNav();

  return (
    <>
      <header className="nav" id="nav">
        <div className="nav__inner">
          <Link to={pathFor('home')} className="nav__logo">
            <span className="nav__logo-mark">◍</span>
            DIVE<span>SPORT</span>
          </Link>

          <nav className={`nav__links${mobileNav.isOpen ? ' open' : ''}`} id="navLinks">
            {content.nav.map((item) =>
              item.children ? (
                <div className="nav__drop" key={item.slug}>
                  <Link to={pathFor(item.slug)} onClick={mobileNav.close}>
                    {item.label}
                  </Link>
                  <div className="nav__drop-menu">
                    {item.children.map((child) => (
                      <Link to={pathFor(child.slug)} key={child.slug} onClick={mobileNav.close}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link to={pathFor(item.slug)} key={item.slug} onClick={mobileNav.close}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <button
            className={`nav__toggle${mobileNav.isOpen ? ' active' : ''}`}
            id="navToggle"
            aria-label={content.lang === 'ru' ? 'Открыть меню' : 'Izvērst izvēlni'}
            aria-expanded={mobileNav.isOpen}
            onClick={mobileNav.toggle}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Rendered via a portal directly into <body>, not nested inside the sticky <header> —
          some browsers (notably iOS Safari) incorrectly treat a `position: sticky` ancestor
          as a containing block for `position: fixed` descendants, which would confine this
          full-viewport backdrop to the header's own (much smaller) box instead of the page. */}
      {mobileNav.isOpen && createPortal(<div className="nav-backdrop" onClick={mobileNav.close} />, document.body)}
    </>
  );
}
