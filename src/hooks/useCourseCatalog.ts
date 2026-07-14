import { useMemo } from 'react';
import { useLang } from '@/context/LangContext';
import { useSheetData } from '@/hooks/useSheetData';
import { COURSES_SHEET_URL } from '@/config/sheets';
import { mapCourseRow, groupCoursesByTier, flattenTiersToRows } from '@/types/sheets';
import type { CourseTier } from '@/types/content';

interface CourseCatalogData {
  tiers: CourseTier[];
  /** Every course's booking value, for any ContactForm's course <select>. */
  bookingOptions: string[];
}

/**
 * The single source for course data across the whole site. Every page that needs
 * the course list (the Kursi catalog itself, and every ContactForm's course
 * dropdown on Home/Kontakti/Kursi) reads from this same hook, so a change made
 * in the Google Sheet shows up everywhere at once — never just on one page.
 */
export function useCourseCatalog(): CourseCatalogData {
  const { lang, content } = useLang();
  const staticRows = useMemo(() => flattenTiersToRows(content.apmacibaKursi.tiers), [content.apmacibaKursi.tiers]);
  const { data: rows } = useSheetData(COURSES_SHEET_URL, lang, mapCourseRow, staticRows);

  return useMemo(
    () => ({
      tiers: groupCoursesByTier(rows),
      bookingOptions: rows.map((r) => r.bookingValue),
    }),
    [rows]
  );
}
