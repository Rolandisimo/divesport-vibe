import type { Lang, SiteContent } from '@/types/content';
import lv from './lv';
import ru from './ru';

const contentByLang: Record<Lang, SiteContent> = { lv, ru };

export function getContent(lang: Lang): SiteContent {
  return contentByLang[lang];
}
