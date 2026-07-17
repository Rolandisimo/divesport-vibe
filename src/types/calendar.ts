export interface CourseSession {
  /** The event title from the calendar — used as the course name (e.g. "PADI Open Water Diver"). */
  title: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  /** Total spots, if the event description includes a "vietas: N" / "места: N" line. Null if not specified. */
  capacity: number | null;
  /** How many are already registered, from a "pieteikušies: N" / "записалось: N" line. Null if not specified. */
  registered: number | null;
  location: string;
}
