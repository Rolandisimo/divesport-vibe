// Fetches upcoming course sessions from Google Calendar at BUILD TIME and writes them to
// public/course-sessions.json as a plain static file. The client only ever fetches that
// static JSON — it never sees, and never needs, the Google API key.
//
// The key and calendar ID come from environment variables (CALENDAR_ID and
// GOOGLE_CALENDAR_API_KEY), set as GitHub Actions repo secrets in CI, or as local
// environment variables for manual testing — never committed to the repo either way.
//
// If those env vars aren't set (e.g. a contributor building locally without them), this
// just writes an empty list instead of failing the build — the schedule section on the
// Kursi page simply won't render, same as if the calendar were never configured.

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const CALENDAR_ID = process.env.CALENDAR_ID;
const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
const OUTPUT_PATH = path.resolve(process.cwd(), 'public/course-sessions.json');

// Fallback keyword-based parsing from the event DESCRIPTION, used only if the title
// doesn't have the "X/Y" pattern below.
const CAPACITY_KEYWORDS = ['vietas', 'kopā vietas', 'места', 'мест'];
const REGISTERED_KEYWORDS = ['pieteikušies', 'записалось', 'записались'];

function parseCount(description, keywords) {
  if (!description) return null;
  const pattern = new RegExp(`(?:${keywords.join('|')})\\s*[:\\-]?\\s*(\\d+)`, 'i');
  const match = description.match(pattern);
  return match ? parseInt(match[1], 10) : null;
}

// Matches "X/Y <word>" anywhere in the title — the event title format is
// "TYPE - DETAIL - X/Y students - INSTRUCTOR", e.g.
// "OWD - Final Dive - 2/2 students - Aleksejs Kravčuks".
const SLOTS_PATTERN = /(\d+)\s*\/\s*(\d+)\s*[a-zA-Z\u0100-\u017F\u0400-\u04FF]*/u;

function stripSeparators(text, side) {
  const pattern = side === 'end' ? /[\s\-\u2013\u2014]+$/ : /^[\s\-\u2013\u2014]+/;
  return text.replace(pattern, '').trim();
}

/** Splits the raw event title into: dive type, dive type detail, capacity, registered
 *  count, and instructor — for the two-column display (type+detail on one side, the rest
 *  of the details on the other). */
function parseTitle(title) {
  const match = title.match(SLOTS_PATTERN);
  const capacity = match ? parseInt(match[2], 10) : null;
  const registered = match ? parseInt(match[1], 10) : null;
  const before = match ? stripSeparators(title.slice(0, match.index), 'end') : title;
  const instructor = match ? stripSeparators(title.slice(match.index + match[0].length), 'start') : '';

  // "TYPE - DETAIL" -> two separate fields, so there's never a stray leading/trailing
  // separator left over when they're displayed independently.
  const sepIndex = before.indexOf(' - ');
  const diveType = (sepIndex === -1 ? before : before.slice(0, sepIndex)).trim() || title;
  const diveTypeDetail = sepIndex === -1 ? '' : before.slice(sepIndex + 3).trim();

  return { diveType, diveTypeDetail, capacity, registered, instructor };
}

/** Google Calendar's rich-text editor stores descriptions as HTML (<br>, <ol><li>, bold,
 *  links, etc.) — this is shown on the site as real HTML, not escaped plaintext, so a
 *  lightweight strip of anything actively dangerous is worth doing even though the source
 *  is the site owner's own calendar, not public input. */
function sanitizeHtml(html) {
  if (!html) return '';
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son\w+\s*=\s*'[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}

async function main() {
  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });

  if (!CALENDAR_ID || !API_KEY) {
    console.log('[fetch-calendar] CALENDAR_ID / GOOGLE_CALENDAR_API_KEY not set — writing empty schedule.');
    await writeFile(OUTPUT_PATH, '[]\n');
    return;
  }

  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

  const params = new URLSearchParams({
    key: API_KEY,
    // Deliberately NOT "now" — that would exclude past events at the query level entirely,
    // which is exactly what caused the archive to stay empty. Bucketing into upcoming/past
    // happens client-side (see splitByDate); this fetch just needs a reasonably wide window.
    timeMin: fiveYearsAgo.toISOString(),
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '250',
  });
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params}`;

  let items = [];
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Calendar API responded with ${response.status}: ${body}`);
    }
    const data = await response.json();
    items = data.items ?? [];
  } catch (err) {
    console.warn('[fetch-calendar] Could not fetch calendar events, writing empty schedule instead:', err.message);
    await writeFile(OUTPUT_PATH, '[]\n');
    return;
  }

  const sessions = items
    .filter((event) => event.summary)
    .map((event) => {
      const parsed = parseTitle(event.summary);
      const capacity = parsed.capacity ?? parseCount(event.description, CAPACITY_KEYWORDS);
      const registered = parsed.registered ?? parseCount(event.description, REGISTERED_KEYWORDS);

      return {
        diveType: parsed.diveType,
        diveTypeDetail: parsed.diveTypeDetail,
        instructor: parsed.instructor,
        startDate: event.start?.dateTime ?? event.start?.date ?? null,
        endDate: event.end?.dateTime ?? event.end?.date ?? null,
        allDay: Boolean(event.start?.date),
        capacity,
        registered,
        location: event.location ?? '',
        description: sanitizeHtml(event.description?.trim() ?? ''),
      };
    })
    .filter((s) => s.startDate && s.endDate);

  await writeFile(OUTPUT_PATH, JSON.stringify(sessions, null, 2) + '\n');
  console.log(`[fetch-calendar] Wrote ${sessions.length} session(s) to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

main();
