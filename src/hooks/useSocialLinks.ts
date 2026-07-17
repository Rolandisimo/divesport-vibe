import { useLang } from '@/context/LangContext';
import { useSheetData } from '@/hooks/useSheetData';
import { SOCIAL_LINKS_SHEET_URL } from '@/config/sheets';
import { mapSocialLinkRow, type SocialLink } from '@/types/sheets';
import type { Lang } from '@/types/content';

const FALLBACK: Record<Lang, SocialLink[]> = {
  lv: [
    { title: 'Facebook', url: 'https://www.facebook.com/divinglatvia/' },
    { title: 'Instagram', url: 'https://www.instagram.com/divesport.diving/' },
    { title: 'YouTube', url: 'https://www.youtube.com/channel/UCBKWVcXiG8IjdEr9qEJiuAQ' },
    { title: 'Blogs', url: 'http://divesport.blogspot.com' },
  ],
  ru: [
    { title: 'Facebook', url: 'https://www.facebook.com/divinglatvia/' },
    { title: 'Instagram', url: 'https://www.instagram.com/divesport.diving/' },
    { title: 'YouTube', url: 'https://www.youtube.com/channel/UCBKWVcXiG8IjdEr9qEJiuAQ' },
    { title: 'Блог', url: 'http://divesport.blogspot.com' },
  ],
};

/** Loads the social links list from the sheet, falling back to the site's current
 *  Facebook/Instagram/YouTube/Blog links if the sheet isn't configured or fails to load. */
export function useSocialLinks(): SocialLink[] {
  const { lang } = useLang();
  const { data } = useSheetData(SOCIAL_LINKS_SHEET_URL, lang, mapSocialLinkRow, FALLBACK[lang]);
  return data;
}
