import type { PriceRow } from '@/types/content';

export function PriceList({ rows }: { rows: PriceRow[] }) {
  return (
    <dl className="price-list">
      {rows.map((row) => (
        <div className="price-list__row" key={row.label}>
          <dt>{row.label}</dt>
          <dd>{row.price}</dd>
        </div>
      ))}
    </dl>
  );
}
