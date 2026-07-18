export interface CourseSession {
  /** e.g. "OWD" — the left column's main label. */
  diveType: string;
  /** e.g. "Final Dive" — shown under diveType, left column. */
  diveTypeDetail: string;
  /** Parsed from the title's trailing "- Instructor Name" segment, if present. */
  instructor: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  /** Total spots, if the event title/description specifies capacity. Null if not specified. */
  capacity: number | null;
  /** How many are already registered/joined. Null if not specified. */
  registered: number | null;
  location: string;
  /** The calendar event's description, as sanitized HTML (Google Calendar's rich-text editor
   *  stores formatting — line breaks, lists, bold — as real HTML, not plaintext). Rendered
   *  via dangerouslySetInnerHTML, not shown as raw text. */
  description: string;
  /** Equal to endDate — used by the shared upcoming/past date-bucketing utility. */
  lastDate: Date | null;
  /** Derived from startDate's year — which year to file this session under once it's past. */
  year: number;
}
