import type { CourseSession } from '@/types/calendar';

interface GCalEvent {
  summary?: string;
  description?: string;
  location?: string;
  start?: { date?: string; dateTime?: string };
  end?: { date?: string; dateTime?: string };
}

/** Pulls a number out of the event description for a given set of keywords — e.g. finds
 *  "vietas: 8" or "места: 8" regardless of which language the calendar owner wrote it in. */
function parseCount(description: string | undefined, keywords: string[]): number | null {
  if (!description) return null;
  const pattern = new RegExp(`(?:${keywords.join('|')})\\s*[:\\-]?\\s*(\\d+)`, 'i');
  const match = description.match(pattern);
  return match ? parseInt(match[1], 10) : null;
}

const CAPACITY_KEYWORDS = ['vietas', 'kopā vietas', 'места', 'мест'];
const REGISTERED_KEYWORDS = ['pieteikušies', 'записалось', 'записались'];

/**
 * Fetches upcoming events from a public Google Calendar via the read-only Calendar API v3.
 * Only needs an API key (no OAuth) since the calendar itself must be set to public — see
 * CALENDAR_SETUP.md for how to set that up.
 */
export async function fetchCourseSessions(calendarId: string, apiKey: string): Promise<CourseSession[]> {
  const timeMin = new Date().toISOString();
  const params = new URLSearchParams({
    key: apiKey,
    timeMin,
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '50',
  });
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Calendar fetch failed with status ${response.status}`);
  }
  const data = await response.json();
  const items: GCalEvent[] = data.items ?? [];

  return items
    .filter((event) => event.summary)
    .map((event) => {
      const allDay = Boolean(event.start?.date);
      return {
        title: event.summary as string,
        startDate: new Date(event.start?.dateTime ?? event.start?.date ?? ''),
        endDate: new Date(event.end?.dateTime ?? event.end?.date ?? ''),
        allDay,
        capacity: parseCount(event.description, CAPACITY_KEYWORDS),
        registered: parseCount(event.description, REGISTERED_KEYWORDS),
        location: event.location ?? '',
      };
    });
}
