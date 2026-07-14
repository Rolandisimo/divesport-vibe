import type { ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  lede?: string;
  children?: ReactNode;
}

export function PageHero({ title, lede, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__inner">
        <h1>{title}</h1>
        {lede && <p className="page-hero__lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
