# Content CMS — Google Sheets setup

The site pulls **courses, trip photos, tank-fill prices, and upcoming trips** from a
Google Sheet, so the club owner can update these without touching any code. Everything
else (page text, team bios, nav labels) stays as regular content in the codebase, since
those change rarely and aren't something you'd want edited casually.

**Nothing breaks if this isn't set up.** Until the URLs below are filled in, the site
just uses the built-in static content exactly as it does today.

---

## One-time setup (do this once)

1. Create a new Google Sheet.
2. Create four tabs (bottom of the screen), named whatever you like — the name doesn't
   matter, only the columns do. Suggested names: `Courses`, `Destinations`, `TankPrices`, `Trips`.
3. In each tab, set up the exact column headers listed below (row 1), then fill in rows.
4. **Every tab needs a `lang` column** with the value `lv` or `ru` on every row — this is
   how one tab holds both languages. Put the Latvian version of a row and the Russian
   version of the same row right next to each other so they're easy to keep in sync.
5. For each tab: **File → Share → Publish to web**. Under "Link," pick that specific
   sheet/tab (not "Entire document"). Under format, choose **Comma-separated values (.csv)**.
   Click **Publish**, then copy the URL it gives you.
6. Paste each tab's URL into `src/config/sheets.ts` in the project, replacing the matching
   `null`:
   ```ts
   export const COURSES_SHEET_URL = 'https://docs.google.com/.../pub?gid=123&single=true&output=csv';
   ```
7. Commit and push — the next deploy will start reading from the sheet.

After that, **editing content is just editing spreadsheet cells** — no redeploy, no code,
no waiting for a developer. Changes to a published sheet appear on the live site within
a few minutes (Google's publish cache refreshes periodically).

---

## Tab: Courses

Replaces the course catalog on the Kursi page, and the course list in every booking form
on the site (homepage, Kontakti, Kursi).

| Column | Required | Example | Notes |
|---|---|---|---|
| `lang` | yes | `lv` | `lv` or `ru` |
| `tier` | yes | `Sāc šeit` | The group heading a course appears under. Rows sharing the same `tier` text are grouped together, in the order they first appear. |
| `tag` | no | `Populārākais` | Small badge shown on the card |
| `tagVariant` | no | `popular` | Set to exactly `popular` for the amber-highlighted badge style; leave blank otherwise |
| `title` | yes | `PADI Open Water Diver` | |
| `description` | no | `Pamata sertifikācijas kurss...` | |
| `price` | yes | `400 €` | Shown as-is, so include the € sign |
| `bookingValue` | yes | `PADI Open Water Diver (400 €)` | What gets pre-filled into the contact form's course dropdown when someone clicks "Pieteikties" — keep this unique per course |

**To change a price:** edit the `price` cell AND the price inside `bookingValue` (so the
two stay consistent) — e.g. `PADI Open Water Diver (400 €)` → `PADI Open Water Diver (450 €)`.

**To add a new course:** add a new row (LV) and its matching row (RU) with the same
`tier` name to file it under the right group.

**To remove a course:** delete its row(s).

---

## Tab: Destinations

Replaces the photo grid on the Ceļojumi → Foto page.

| Column | Required | Example |
|---|---|---|
| `lang` | yes | `lv` |
| `name` | yes | `Taizeme` |
| `imageUrl` | yes | a direct image link (see note below) |

**Getting an image URL:** upload the photo to Google Drive, right-click it → **Share →
General access → Anyone with the link**, then use this format for the `imageUrl` cell
(swap in the file's ID from the share link):
```
https://drive.google.com/uc?export=view&id=YOUR_FILE_ID
```
Any other publicly-accessible image URL (e.g. from Google Photos' shared album "download
link", or an existing photo host) also works fine.

---

## Tab: TankPrices

Replaces the pricing table on the Balonu uzpildīšana (tank fill) page.

| Column | Required | Example |
|---|---|---|
| `lang` | yes | `lv` |
| `label` | yes | `Nitrox 21–40%, 15 litru balons, 200 bar` |
| `price` | yes | `7 €` |

---

## Tab: Trips

A new "Upcoming trips" section that appears on the Ceļojumi page — **only shows up at
all once this tab has rows**, so it's fine to leave empty until there's an actual trip
to announce.

| Column | Required | Example |
|---|---|---|
| `lang` | yes | `lv` |
| `title` | yes | `Ceļojums uz Ēģipti` |
| `dates` | no | `2027. gada aprīlis` |
| `description` | no | `Nedēļa Sarkanajā jūrā, iekļauti 10 niršanas...` |
| `imageUrl` | no | same as Destinations tab above |

---

## Starter templates

The `cms-templates/` folder has one `.csv` per tab, pre-filled with the site's current
content, so you can start from real data instead of a blank sheet:

- `cms-templates/courses.csv`
- `cms-templates/destinations.csv`
- `cms-templates/tank-prices.csv`
- `cms-templates/trips.csv` (a couple of example rows — replace with real trips, or
  delete them and leave the tab empty until there's something to announce)

To use one: open it in a text editor or spreadsheet app, select all, copy, and paste
into row 1 of the matching tab in your Google Sheet (or use **File → Import** in Sheets
and choose "Insert new sheet(s)").
