import { Link } from 'react-router-dom';
import { useLang } from '@/context/LangContext';
import type { NavChild } from '@/types/content';

export function SubNav({ items }: { items: NavChild[] }) {
  const { pathFor } = useLang();

  return (
    <div className="subnav">
      {items.map((item) => (
        <Link to={pathFor(item.slug)} key={item.slug}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
