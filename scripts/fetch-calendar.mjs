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

// Primary source: a trailing "X/Y <word>" in the event TITLE itself, e.g.
// "OWD - Final Dive - 2/2 students" -> registered 2, capacity 2, title cleaned to
// "OWD - Final Dive". This is the format course organizers actually type when creating
// the event, so it's the first thing checked before falling back to the description.
const SLOTS_IN_TITLE_PATTERN =
  /[\s\-\u2013\u2014]*(\d+)\s*\/\s*(\d+)\s*[a-zA-Z\u0100-\u017F\u0400-\u04FF]*\s*$/u;

function parseSlotsFromTitle(title) {
  const match = title.match(SLOTS_IN_TITLE_PATTERN);
  if (!match) return null;
  const registered = parseInt(match[1], 10);
  const capacity = parseInt(match[2], 10);
  const cleanedTitle = title.slice(0, match.index).trim();
  return { registered, capacity, cleanedTitle: cleanedTitle || title };
}

async function main() {
  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });

  if (!CALENDAR_ID || !API_KEY) {
    console.log('[fetch-calendar] CALENDAR_ID / GOOGLE_CALENDAR_API_KEY not set — writing empty schedule.');
    await writeFile(OUTPUT_PATH, '[]\n');
    return;
  }

  const params = new URLSearchParams({
    key: API_KEY,
    timeMin: new Date().toISOString(),
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '50',
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
      const titleSlots = parseSlotsFromTitle(event.summary);
      const capacity = titleSlots ? titleSlots.capacity : parseCount(event.description, CAPACITY_KEYWORDS);
      const registered = titleSlots ? titleSlots.registered : parseCount(event.description, REGISTERED_KEYWORDS);
      const title = titleSlots ? titleSlots.cleanedTitle : event.summary;

      return {
        title,
        startDate: event.start?.dateTime ?? event.start?.date ?? null,
        endDate: event.end?.dateTime ?? event.end?.date ?? null,
        allDay: Boolean(event.start?.date),
        capacity,
        registered,
        location: event.location ?? '',
      };
    })
    .filter((s) => s.startDate && s.endDate);

  await writeFile(OUTPUT_PATH, JSON.stringify(sessions, null, 2) + '\n');
  console.log(`[fetch-calendar] Wrote ${sessions.length} session(s) to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

main();
