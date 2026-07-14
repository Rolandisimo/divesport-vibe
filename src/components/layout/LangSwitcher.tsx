import { Link } from 'react-router-dom';
import { useLang } from '@/context/LangContext';
import type { Slug } from '@/types/content';

export function LangSwitcher({ currentSlug }: { currentSlug: Slug }) {
  const { lang, content, otherLangPath } = useLang();

  return (
    <div className="topbar__lang">
      {lang === 'lv' ? (
        <>
          <Link to={otherLangPath(currentSlug)}>{content.langSwitcherOtherLabel}</Link>
          <span className="topbar__lang-active">LV</span>
        </>
      ) : (
        <>
          <span className="topbar__lang-active">RU</span>
          <Link to={otherLangPath(currentSlug)}>{content.langSwitcherOtherLabel}</Link>
        </>
      )}
    </div>
  );
}
