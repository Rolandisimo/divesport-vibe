/** Anything that can be bucketed into upcoming/past and grouped by year. */
export interface DateBucketable {
  /** The item's latest/reference date, used to decide upcoming vs past. Null = always upcoming. */
  lastDate: Date | null;
  /** The year to file this item under once it's past (or group it under while upcoming). */
  year: number;
}

export interface ByYear<T> {
  year: number;
  items: T[];
}

export interface SplitByDate<T> {
  upcomingByYear: ByYear<T>[];
  pastByYear: ByYear<T>[];
}

function groupByYear<T extends DateBucketable>(items: T[], descending: boolean): ByYear<T>[] {
  const byYear = new Map<number, T[]>();
  for (const item of items) {
    const list = byYear.get(item.year) ?? [];
    list.push(item);
    byYear.set(item.year, list);
  }
  return Array.from(byYear.entries())
    .sort(([a], [b]) => (descending ? b - a : a - b))
    .map(([year, yearItems]) => ({ year, items: yearItems }));
}

/**
 * Buckets any date-bucketable list into "upcoming" (today or later) and "past", each
 * grouped by year — past with the most recent year first, upcoming with the soonest year
 * first. Shared by Trips and Course Sessions so both use the exact same rules.
 */
export function splitByDate<T extends DateBucketable>(items: T[]): SplitByDate<T> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = items.filter((t) => !t.lastDate || t.lastDate >= today);
  const past = items.filter((t) => t.lastDate && t.lastDate < today);

  return {
    upcomingByYear: groupByYear(upcoming, false),
    pastByYear: groupByYear(past, true),
  };
}
