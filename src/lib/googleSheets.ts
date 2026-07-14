import Papa from 'papaparse';
import type { Lang } from '@/types/content';

/**
 * Fetches a published Google Sheet CSV export and parses it into typed rows,
 * filtered to the requested language. Every sheet tab is expected to have a
 * `lang` column with values "lv" or "ru" so one tab can hold both languages.
 *
 * Returns an empty array (never throws to the caller) on any failure — the
 * calling hook decides what to do with an empty result, which is normally
 * "keep showing the static fallback content".
 */
export async function fetchSheetRows<T>(
  url: string,
  lang: Lang,
  mapRow: (row: Record<string, string>) => T | null
): Promise<T[]> {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Sheet fetch failed with status ${response.status}`);
  }
  const csvText = await response.text();

  const parsed = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const rows: T[] = [];
  for (const raw of parsed.data) {
    const rowLang = (raw.lang ?? raw.Lang ?? '').trim().toLowerCase();
    if (rowLang !== lang) continue;
    const mapped = mapRow(raw);
    if (mapped !== null) rows.push(mapped);
  }
  return rows;
}
