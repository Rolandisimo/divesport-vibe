import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useLang } from '@/context/LangContext';
import type { Slug } from '@/types/content';
import { Topbar } from './Topbar';
import { Nav } from './Nav';
import { Footer } from './Footer';

interface LayoutProps {
  slug: Slug;
  children: ReactNode;
}

export function Layout({ slug, children }: LayoutProps) {
  const { content, lang } = useLang();
  const meta = content.meta[slug];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = meta.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.setAttribute('content', meta.description);
    window.scrollTo(0, 0);
  }, [lang, meta]);

  return (
    <>
      <div className="grain" />
      <Topbar currentSlug={slug} />
      <Nav />
      {children}
      <Footer />
    </>
  );
}
