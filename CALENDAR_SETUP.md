# Course schedule — Google Calendar sync

The Kursi page can show an actual schedule of upcoming course dates — with headcount —
pulled from a Google Calendar, instead of duplicating that information in the Google
Sheet. Course *types* (title, description, price) stay in the Sheet, as before; course
*sessions* (specific dates someone can actually book) come from a calendar.

**The API key never appears in the code, the repo, or the browser.** It's fetched once at
build time (in GitHub Actions) using a key stored as an encrypted repo secret, and the
result is written to a plain static JSON file that the site reads — the same way any other
static asset works. This is deliberate: Google's own guidance is that API keys shouldn't be
committed to a repo or shipped in client code, even "restricted" ones, since referrer
restrictions can be bypassed by non-browser requests and public repos get scanned by bots
that harvest keys automatically.

**Nothing breaks if this isn't set up.** Until it's configured, the build just writes an
empty schedule and that section on the Kursi page doesn't render.

---

## One-time setup

### 1. Create a calendar

In Google Calendar, create a **new, separate calendar** for this (not your personal one) —
click the **+** next to "Other calendars" → **Create new calendar**. Name it something like
"Divesport — Kursi".

### 2. Make it public

Go to that calendar's **Settings** (hover the calendar → ⋮ → Settings and sharing):
- Under **Access permissions**, check **"Make available to public"**
- Set it to **"See all event details"**

### 3. Get the Calendar ID

Still in that calendar's settings, scroll to **"Integrate calendar"** and copy the
**Calendar ID** — it looks like:
```
abc123xyz@group.calendar.google.com
```

### 4. Get an API key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project if you don't have one already
3. **APIs & Services → Library** → search **"Google Calendar API"** → **Enable**
4. **APIs & Services → Credentials** → **Create Credentials → API key**
5. Click the new key → under **"Application restrictions"**, restrict it however fits —
   since this key is now only ever called from GitHub's build servers (never a browser),
   an **IP address restriction isn't practical** (GitHub's IPs aren't fixed), so leave
   Application restrictions as **"None"** and instead lock it down with the next step
6. Under **"API restrictions"**, restrict it to just **Google Calendar API** — this is the
   restriction that actually matters here, since it means even a leaked key can't touch
   anything except reading calendar data

### 5. Add it as a GitHub repo secret — never to a file

In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**.
Add two secrets:

| Name | Value |
|---|---|
| `CALENDAR_ID` | `abc123xyz@group.calendar.google.com` |
| `GOOGLE_CALENDAR_API_KEY` | your API key |

That's it — the deploy workflow (`.github/workflows/deploy.yml`) already passes both into
the build as environment variables. Push anything to `main` and the next deploy will pick
up real course sessions.

### Testing locally (optional)

The build script (`scripts/fetch-calendar.mjs`) reads the same two environment variables.
To test it locally without ever writing them to a file:
```bash
CALENDAR_ID="abc123xyz@group.calendar.google.com" GOOGLE_CALENDAR_API_KEY="your-key" npm run fetch:calendar
```
This writes `public/course-sessions.json` (already git-ignored) so `npm run dev` can pick it
up. Just re-run `npm run fetch:calendar` whenever you want to refresh it locally — it's
never committed.

---

## Adding a course date

Just create an event on that calendar, same as any other Google Calendar event:

| Field | What to put |
|---|---|
| **Title** | The course name, e.g. `PADI Open Water Diver` |
| **Date/time** | The actual course date(s) — a single day or a multi-day range both work. If you set an actual time of day (not just a date), the site shows the start–end time too — leave it as an all-day event if there's no specific time to show. |
| **Description** | Shown on the site next to the session's details — a good place for notes like what's included, prerequisites, or meeting point instructions |
| **Location** | Shown on the site under the session's details (e.g. `Rīga, peldbaseins`) |

### Showing available spots (optional)

The easiest way is right in the event **Title** — end it with `X/Y` and a word, where `X` is
how many are already registered and `Y` is the total capacity. Optionally add the
instructor's name right after that, also separated by ` - `:
```
OWD - Final Dive - 2/2 students - Aleksejs Kravčuks
```
The site strips the capacity and instructor parts back off for display (shown as just
"OWD - Final Dive", with the instructor shown separately alongside the date/location) and
uses the numbers to show "X of Y spots free" — once `X` reaches `Y`, the booking button
disappears automatically instead of letting someone sign up for a full session. The
instructor part is optional — leave it off and everything else still works the same.

Alternatively, add two lines to the event's **Description** instead:
```
vietas: 8
pieteikušies: 3
```
(`vietas` = total spots, `pieteikušies` = already registered — Russian `места` /
`записалось` also work.) The title format takes priority if both are present. Leave both
out entirely and the site just shows the date and course name with no spots count, and the
booking button always shows.

**One thing to know:** unlike the Sheet (which updates live), calendar changes only show up
on the site after the **next deploy**, since the fetch happens at build time — merge
something to `main`, or trigger the workflow manually from the Actions tab, to pick up new
dates.
