import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useLang } from '@/context/LangContext';
import { useMobileNav } from '@/hooks/useMobileNav';
import type { NavItem } from '@/types/content';

interface NavLinkListProps {
  items: NavItem[];
  pathFor: (slug: NavItem['slug']) => string;
  onLinkClick: () => void;
}

/** The actual list of links + dropdowns — rendered twice (once inline for desktop, once
 *  inside the portalled mobile drawer) so both stay in sync from one source. */
function NavLinkList({ items, pathFor, onLinkClick }: NavLinkListProps) {
  return (
    <>
      {items.map((item) =>
        item.children ? (
          <div className="nav__drop" key={item.slug}>
            <Link to={pathFor(item.slug)} onClick={onLinkClick}>
              {item.label}
            </Link>
            <div className="nav__drop-menu">
              {item.children.map((child) => (
                <Link to={pathFor(child.slug)} key={child.slug} onClick={onLinkClick}>
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link to={pathFor(item.slug)} key={item.slug} onClick={onLinkClick}>
            {item.label}
          </Link>
        )
      )}
    </>
  );
}

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

          {/* Desktop only — hidden on mobile via CSS. The mobile overlay is a separate,
              portal-rendered drawer below, so this instance never needs to become a
              fixed-position overlay nested inside the sticky header. */}
          <nav className="nav__links" id="navLinks">
            <NavLinkList items={content.nav} pathFor={pathFor} onLinkClick={() => {}} />
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

      {/* Always rendered (not conditional on isOpen) so the transform/opacity transitions
          below actually have a "before" state to animate from/to — conditionally mounting
          this would make the drawer and backdrop just appear/disappear instantly. Both are
          portalled directly into <body>, never nested inside the sticky <header> — some
          browsers (notably iOS Safari) incorrectly treat a `position: sticky` ancestor as a
          containing block for `position: fixed` descendants, which would confine these to
          the header's own (much smaller) box instead of the full page. */}
      {createPortal(
        <>
          <div className={`nav-backdrop${mobileNav.isOpen ? ' open' : ''}`} onClick={mobileNav.close} />
          <nav
            className={`mobile-nav-drawer${mobileNav.isOpen ? ' open' : ''}`}
            aria-label={content.lang === 'ru' ? 'Меню' : 'Izvēlne'}
          >
            <NavLinkList items={content.nav} pathFor={pathFor} onLinkClick={mobileNav.close} />
          </nav>
        </>,
        document.body
      )}
    </>
  );
}
