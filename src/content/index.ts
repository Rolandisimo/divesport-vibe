import type { Lang, SiteContent } from '@/types/content';
import lv from './lv';
import ru from './ru';

const contentByLang: Record<Lang, SiteContent> = { lv, ru };

export function getContent(lang: Lang): SiteContent {
  return contentByLang[lang];
}

/** Every course's booking value (e.g. "PADI Open Water Diver (400 €)"), flattened from the Kursi tiers.
 *  Single source of truth — any ContactForm instance that needs the course list reads it from here,
 *  instead of re-deriving it from content.apmacibaKursi.tiers in every page that uses the form. */
export function getAllCourseOptions(content: SiteContent): string[] {
  return content.apmacibaKursi.tiers.flatMap((tier) => tier.courses.map((c) => c.bookingValue));
}
