/**
 * Google Sheets CMS configuration.
 *
 * Each constant is the CSV export URL for one tab of a published Google Sheet.
 * Leave any of them as `null` and that section of the site simply keeps using
 * the static content from src/content/lv.ts and src/content/ru.ts — nothing
 * breaks if the sheet isn't set up yet, or if a tab gets removed later.
 *
 * See CMS_SETUP.md at the project root for the exact steps to publish a sheet
 * and the required column headers for each tab.
 *
 * How to get a tab's URL:
 *   1. In Google Sheets: File → Share → Publish to web
 *   2. Under "Link", choose the specific sheet/tab (not "Entire document")
 *   3. Choose format "Comma-separated values (.csv)" and click Publish
 *   4. Copy the URL it gives you and paste it below
 */

export const COURSES_SHEET_URL: string | null =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSt5nuMsDPx3nBca4r4a4QwnjjV89nP1Cw661hNmzccQJL14dvqUSwXFxA7wc4SBk6KoNIqOgXz1gab/pub?gid=0&single=true&output=csv";
export const DESTINATIONS_SHEET_URL: string | null =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSt5nuMsDPx3nBca4r4a4QwnjjV89nP1Cw661hNmzccQJL14dvqUSwXFxA7wc4SBk6KoNIqOgXz1gab/pub?gid=1955127117&single=true&output=csv";
export const TANK_PRICES_SHEET_URL: string | null =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSt5nuMsDPx3nBca4r4a4QwnjjV89nP1Cw661hNmzccQJL14dvqUSwXFxA7wc4SBk6KoNIqOgXz1gab/pub?gid=1928242247&single=true&output=csv";
export const TRIPS_SHEET_URL: string | null =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSt5nuMsDPx3nBca4r4a4QwnjjV89nP1Cw661hNmzccQJL14dvqUSwXFxA7wc4SBk6KoNIqOgXz1gab/pub?gid=23365677&single=true&output=csv";
export const SOCIAL_LINKS_SHEET_URL: string | null =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSt5nuMsDPx3nBca4r4a4QwnjjV89nP1Cw661hNmzccQJL14dvqUSwXFxA7wc4SBk6KoNIqOgXz1gab/pub?gid=55393030&single=true&output=csv";
