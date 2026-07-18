export interface CourseSession {
  /** The event title from the calendar — used as the course name (e.g. "PADI Open Water Diver"). */
  title: string;
  /** Parsed from the title's trailing "- Instructor Name" segment, if present. */
  instructor: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  /** Total spots, if the event description includes a "vietas: N" / "места: N" line. Null if not specified. */
  capacity: number | null;
  /** How many are already registered, from a "pieteikušies: N" / "записалось: N" line. Null if not specified. */
  registered: number | null;
  location: string;
  /** Free-text notes from the calendar event's description — shown alongside the session
   *  details on the Kursi page. */
  description: string;
  /** Equal to endDate — used by the shared upcoming/past date-bucketing utility. */
  lastDate: Date | null;
  /** Derived from startDate's year — which year to file this session under once it's past. */
  year: number;
}
