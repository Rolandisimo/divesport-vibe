import { Link } from 'react-router-dom';
import { useLang } from '@/context/LangContext';
import type { Slug } from '@/types/content';

interface Crumb {
  label: string;
  slug: Slug;
}

/** Renders "Divesport / Parent / Current" with links on every crumb but the last. */
export function Breadcrumb({ trail }: { trail: Crumb[] }) {
  const { content, pathFor } = useLang();

  return (
    <p className="breadcrumb">
      <Link to={pathFor('home')}>{content.breadcrumbHome}</Link>
      {trail.map((crumb, i) => {
        const isLast = i === trail.length - 1;
        return (
          <span key={crumb.slug}>
            {' / '}
            {isLast ? crumb.label : <Link to={pathFor(crumb.slug)}>{crumb.label}</Link>}
          </span>
        );
      })}
    </p>
  );
}
