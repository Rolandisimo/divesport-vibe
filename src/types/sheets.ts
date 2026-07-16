import type { Course, CourseTier, Destination, PriceRow } from '@/types/content';

/** A course row as it comes out of the sheet, before being grouped into tiers. */
export interface SheetCourseRow extends Course {
  tier: string;
}

/** An "upcoming trip" entry — this concept only exists via the sheet, there's no static fallback content for it.
 *  Several fields (dates, highlights, accommodation, gettingThere) hold a LIST of bullet points — in the
 *  sheet these are one cell each, with each bullet on its own line (Alt+Enter in Google Sheets).
 *
 *  Dates must be written as dd.mm.yyyy (e.g. "15.08.2026") — that format is identical in every
 *  language, so the same parser handles LV and RU rows without any per-language date logic, and the
 *  owner doesn't need to figure out how to phrase a date differently per language. */
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
  /** The latest dd.mm.yyyy date found anywhere in the `dates` bullets. Null if none were found
   *  (parsed as a bare fallback, treated as upcoming so a trip never silently disappears). */
  lastDate: Date | null;
  /** The year to file this trip under once it's past — derived from lastDate, defaulting to the
   *  current year if no date was parseable. */
  year: number;
}

export interface TripsByYear {
  year: number;
  trips: Trip[];
}

export interface SplitTrips {
  upcomingByYear: TripsByYear[];
  pastByYear: TripsByYear[];
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

/** Matches dd.mm.yyyy (e.g. "15.08.2026"), the one date format used everywhere in the sheet —
 *  identical regardless of language, so this is the only date parser the whole app needs. */
const DATE_PATTERN = /\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b/g;

/** Finds every dd.mm.yyyy date across a trip's `dates` bullets and returns the latest one.
 *  Using the latest (not the first) means a trip with several date options only counts as
 *  "past" once every option has actually passed. */
function findLastDate(lines: string[]): Date | null {
  let latest: Date | null = null;
  for (const line of lines) {
    for (const match of line.matchAll(DATE_PATTERN)) {
      const [, dd, mm, yyyy] = match;
      const candidate = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
      if (!latest || candidate > latest) latest = candidate;
    }
  }
  return latest;
}

export function mapTripRow(row: Record<string, string>): Trip | null {
  const title = requireField(row, 'title');
  if (!title) return null;

  const dates = splitLines(row.dates);
  const lastDate = findLastDate(dates);
  const year = lastDate ? lastDate.getFullYear() : new Date().getFullYear();

  return {
    flag: row.flag?.trim() ?? '',
    title,
    intro: row.intro?.trim() ?? '',
    dates,
    highlights: splitLines(row.highlights),
    accommodation: splitLines(row.accommodation),
    gettingThere: splitLines(row.gettingThere),
    accommodationPrice: row.accommodationPrice?.trim() ?? '',
    divingPrice: row.divingPrice?.trim() ?? '',
    imageUrl: row.imageUrl?.trim() ?? '',
    cta: row.cta?.trim() ?? '',
    lastDate,
    year,
  };
}

/** Groups trips by year. `descending` controls sort order — past trips want the most
 *  recent past year first, upcoming trips want the soonest year first. */
function groupByYear(trips: Trip[], descending: boolean): TripsByYear[] {
  const byYear = new Map<number, Trip[]>();
  for (const trip of trips) {
    const list = byYear.get(trip.year) ?? [];
    list.push(trip);
    byYear.set(trip.year, list);
  }
  return Array.from(byYear.entries())
    .sort(([a], [b]) => (descending ? b - a : a - b))
    .map(([year, yearTrips]) => ({ year, trips: yearTrips }));
}

/** Buckets trips into "upcoming" (today or later) and "past", each grouped by year —
 *  past with the most recent year first, upcoming with the soonest year first. Trips
 *  with no parseable date are always treated as upcoming, so a malformed dates cell
 *  never makes a trip silently vanish instead of just miscategorizing it. */
export function splitTrips(trips: Trip[]): SplitTrips {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = trips.filter((t) => !t.lastDate || t.lastDate >= today);
  const past = trips.filter((t) => t.lastDate && t.lastDate < today);

  return {
    upcomingByYear: groupByYear(upcoming, false),
    pastByYear: groupByYear(past, true),
  };
}

/** Flattens the static CourseTier[] (from content/lv.ts, content/ru.ts) into the same
 *  flat row shape the sheet produces, so groupCoursesByTier() can serve as the single
 *  grouping path regardless of whether the data came from the sheet or the static fallback. */
export function flattenTiersToRows(tiers: CourseTier[]): SheetCourseRow[] {
  return tiers.flatMap((tier) => tier.courses.map((course) => ({ ...course, tier: tier.title })));
}
