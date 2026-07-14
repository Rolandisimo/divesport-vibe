import type { Course, CourseTier, Destination, PriceRow } from '@/types/content';

/** A course row as it comes out of the sheet, before being grouped into tiers. */
export interface SheetCourseRow extends Course {
  tier: string;
}

/** An "upcoming trip" entry — this concept only exists via the sheet, there's no static fallback content for it.
 *  Several fields (dates, highlights, accommodation, gettingThere) hold a LIST of bullet points — in the
 *  sheet these are one cell each, with each bullet on its own line (Alt+Enter in Google Sheets). */
export interface Trip {
  flag: string;
  title: string;
  intro: string;
  dates: string[];
  highlights: string[];
  accommodation: string[];
  gettingThere: string[];
  accommodationPrice: string;
  divingPrice: string;
  imageUrl: string;
  cta: string;
}

function requireField(row: Record<string, string>, key: string): string | null {
  const value = row[key]?.trim();
  return value ? value : null;
}

/** Splits a multi-line cell into a clean bullet list — one entry per non-empty line. */
function splitLines(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function mapCourseRow(row: Record<string, string>): SheetCourseRow | null {
  const tier = requireField(row, 'tier');
  const title = requireField(row, 'title');
  const price = requireField(row, 'price');
  const bookingValue = requireField(row, 'bookingValue');
  if (!tier || !title || !price || !bookingValue) return null;

  const tagVariant = row.tagVariant?.trim().toLowerCase() === 'popular' ? 'popular' : 'default';

  return {
    tier,
    tag: row.tag?.trim() ?? '',
    tagVariant,
    title,
    description: row.description?.trim() ?? '',
    price,
    bookingValue,
  };
}

/** Groups flat course rows into tiers, preserving the order tiers first appear in the sheet. */
export function groupCoursesByTier(rows: SheetCourseRow[]): CourseTier[] {
  const tiers: CourseTier[] = [];
  const tierIndex = new Map<string, number>();

  for (const row of rows) {
    const { tier, ...course } = row;
    let idx = tierIndex.get(tier);
    if (idx === undefined) {
      idx = tiers.length;
      tierIndex.set(tier, idx);
      tiers.push({ title: tier, courses: [] });
    }
    tiers[idx].courses.push(course);
  }

  return tiers;
}

export function mapDestinationRow(row: Record<string, string>): Destination | null {
  const name = requireField(row, 'name');
  const imageUrl = requireField(row, 'imageUrl');
  if (!name || !imageUrl) return null;
  return { name, imageUrl };
}

export function mapTankPriceRow(row: Record<string, string>): PriceRow | null {
  const label = requireField(row, 'label');
  const price = requireField(row, 'price');
  if (!label || !price) return null;
  return { label, price };
}

export function mapTripRow(row: Record<string, string>): Trip | null {
  const title = requireField(row, 'title');
  if (!title) return null;

  return {
    flag: row.flag?.trim() ?? '',
    title,
    intro: row.intro?.trim() ?? '',
    dates: splitLines(row.dates),
    highlights: splitLines(row.highlights),
    accommodation: splitLines(row.accommodation),
    gettingThere: splitLines(row.gettingThere),
    accommodationPrice: row.accommodationPrice?.trim() ?? '',
    divingPrice: row.divingPrice?.trim() ?? '',
    imageUrl: row.imageUrl?.trim() ?? '',
    cta: row.cta?.trim() ?? '',
  };
}

/** Flattens the static CourseTier[] (from content/lv.ts, content/ru.ts) into the same
 *  flat row shape the sheet produces, so groupCoursesByTier() can serve as the single
 *  grouping path regardless of whether the data came from the sheet or the static fallback. */
export function flattenTiersToRows(tiers: CourseTier[]): SheetCourseRow[] {
  return tiers.flatMap((tier) => tier.courses.map((course) => ({ ...course, tier: tier.title })));
}
