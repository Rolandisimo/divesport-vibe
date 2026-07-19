import { useEffect, useState } from 'react';
import type { Lang } from '@/types/content';
import { fetchSheetRows } from '@/lib/googleSheets';

/**
 * Loads one Google Sheet tab as typed rows for the current language, starting
 * from (and falling back to, on any error) the given static content.
 *
 * If `url` is null, the sheet feature simply isn't configured yet — this
 * returns the fallback content immediately with no network request at all.
 */
export function useSheetData<T>(
  url: string | null,
  lang: Lang,
  mapRow: (row: Record<string, string>) => T | null,
  fallback: T[]
): { data: T[]; isLive: boolean; isLoading: boolean; isError: boolean } {
  const [data, setData] = useState<T[]>(fallback);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(url));
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) {
      setData(fallback);
      setIsLive(false);
      setIsLoading(false);
      setIsError(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    fetchSheetRows(url, lang, mapRow)
      .then((rows) => {
        if (cancelled) return;
        if (rows.length > 0) {
          setData(rows);
          setIsLive(true);
        }
        // An empty result (e.g. the tab has no rows for this language yet)
        // just keeps showing the fallback rather than an empty page.
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        // Logged to the console so a developer can spot it during setup.
        console.warn(`[CMS] Could not load sheet data from ${url}, using static fallback.`);
        setIsError(true);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, lang]);

  return { data, isLive, isLoading, isError };
}
