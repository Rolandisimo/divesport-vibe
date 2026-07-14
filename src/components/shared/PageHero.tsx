import type { ReactNode } from 'react';
import { Breadcrumb } from './Breadcrumb';
import type { Slug } from '@/types/content';

interface PageHeroProps {
  trail: { label: string; slug: Slug }[];
  title: string;
  lede?: string;
  children?: ReactNode;
}

export function PageHero({ trail, title, lede, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__inner">
        <Breadcrumb trail={trail} />
        <h1>{title}</h1>
        {lede && <p className="page-hero__lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
