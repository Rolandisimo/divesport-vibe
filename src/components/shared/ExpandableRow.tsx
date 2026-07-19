import type { ReactNode } from 'react';

interface ExpandableRowProps {
  isOpen: boolean;
  onToggle: () => void;
  /** Left column (~20%) — the item's main label, e.g. dive type or trip flag+title. */
  typeContent: ReactNode;
  /** Middle column (~60%) — compact summary details, e.g. date/location/instructor. */
  infoContent: ReactNode;
  /** Right column (~20%) — a join/book button, a status message, or nothing. */
  actionContent: ReactNode;
  /** Only shown once expanded — the fuller detail (description, full itinerary, etc). */
  bodyContent?: ReactNode;
}

/**
 * The compact, expandable row shell shared by the course-sessions schedule and the trips
 * list — a 20/60/20 grid (type / info / action) that expands to reveal bodyContent. Purely
 * a layout + toggle-button shell; callers supply whatever content belongs in each slot, and
 * whether/when the row is open comes from outside (see useAccordion) so a list of these can
 * share "only one open at a time" behavior without each row managing its own state.
 */
export function ExpandableRow({ isOpen, onToggle, typeContent, infoContent, actionContent, bodyContent }: ExpandableRowProps) {
  return (
    <div className="expandable-row">
      <div className="expandable-row__grid">
        {/* A plain controlled button — not the native <details>/<summary> disclosure — so
            there's exactly one expand indicator on screen, not a custom one plus whatever
            marker the browser decides to draw on its own for a <summary>. */}
        <button type="button" className="expandable-row__toggle" onClick={onToggle} aria-expanded={isOpen}>
          <div className="expandable-row__type">
            <span className="expandable-row__indicator">{isOpen ? '–' : '+'}</span>
            <div className="expandable-row__type-text">{typeContent}</div>
          </div>
          <div className="expandable-row__info">{infoContent}</div>
        </button>
        <div className="expandable-row__action">{actionContent}</div>
      </div>
      {isOpen && bodyContent && <div className="expandable-row__body">{bodyContent}</div>}
    </div>
  );
}
