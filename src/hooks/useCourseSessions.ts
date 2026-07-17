import { useEffect, useState } from 'react';
import type { CourseSession } from '@/types/calendar';

interface RawSession {
  title: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  capacity: number | null;
  registered: number | null;
  location: string;
}

/**
 * Loads upcoming course sessions from the static /course-sessions.json file generated at
 * build time (see scripts/fetch-calendar.mjs). The browser never talks to the Google
 * Calendar API directly and never sees an API key — that fetch happens once, in CI, using
 * a key that only ever lives in GitHub Actions secrets.
 *
 * Returns an empty array (and the schedule section just doesn't render) if the file is
 * missing or empty — same graceful-degradation pattern as the Sheets integration.
 */
export function useCourseSessions(): CourseSession[] {
  const [sessions, setSessions] = useState<CourseSession[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch(`${import.meta.env.BASE_URL}course-sessions.json`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : []))
      .then((raw: RawSession[]) => {
        if (cancelled) return;
        setSessions(
          raw.map((s) => ({
            ...s,
            startDate: new Date(s.startDate),
            endDate: new Date(s.endDate),
          }))
        );
      })
      .catch(() => {
        // No file yet, or it's not valid JSON — treat as "no sessions" rather than erroring.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return sessions;
}
