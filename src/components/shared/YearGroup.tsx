import type { ReactNode } from 'react';

interface YearGroupProps {
  year: number;
  countLabel: string;
  defaultOpen: boolean;
  children: ReactNode;
}

/** A collapsible <details> block for one year's worth of items — used for both trips and
 *  course sessions so a year with many entries (e.g. 16 past trips) doesn't turn into an
 *  unmanageable wall of content by default. */
export function YearGroup({ year, countLabel, defaultOpen, children }: YearGroupProps) {
  return (
    <details className="year-group" open={defaultOpen}>
      <summary>
        <span>{year}</span>
        <span className="year-group__count">{countLabel}</span>
      </summary>
      {children}
    </details>
  );
}
