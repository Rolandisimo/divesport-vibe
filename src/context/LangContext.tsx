import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { Lang, Slug, SiteContent } from '@/types/content';
import { getContent } from '@/content';

/** Maps every page "kind" to its LV path segment. The RU equivalent is always `/ru<path>`. */
const SLUG_PATHS: Record<Slug, string> = {
  home: '/',
  'par-mums': '/par-mums',
  apmaciba: '/apmaciba',
  'apmaciba-kursi': '/apmaciba-kursi',
  'apmaciba-specializacijas': '/apmaciba-specializacijas',
  'apmaciba-tehniska-nirsana': '/apmaciba-tehniska-nirsana',
  'apmaciba-instruktoru-kursi': '/apmaciba-instruktoru-kursi',
  celojumi: '/celojumi',
  'celojumi-foto': '/celojumi-foto',
  inventars: '/inventars',
  'inventars-noma': '/inventars-noma',
  'inventars-remonts': '/inventars-remonts',
  'inventars-balonu-uzpildisana': '/inventars-balonu-uzpildisana',
  kontakti: '/kontakti',
};

interface LangContextValue {
  lang: Lang;
  content: SiteContent;
  /** Builds the correct path for a given page slug, honoring the current language. */
  pathFor: (slug: Slug) => string;
  /** Path to the same page in the other language, for the language switcher. */
  otherLangPath: (currentSlug: Slug) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const value = useMemo<LangContextValue>(() => {
    const content = getContent(lang);
    const pathFor = (slug: Slug) => {
      const base = SLUG_PATHS[slug];
      return lang === 'ru' ? (base === '/' ? '/ru' : `/ru${base}`) : base;
    };
    const otherLangPath = (currentSlug: Slug) => {
      const base = SLUG_PATHS[currentSlug];
      return lang === 'lv' ? (base === '/' ? '/ru' : `/ru${base}`) : base === '/' ? '/' : base;
    };
    return { lang, content, pathFor, otherLangPath };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within a LangProvider');
  return ctx;
}
