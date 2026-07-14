import type { CSSProperties } from 'react';
import { useLang } from '@/context/LangContext';
import { useDepthRail, type DepthStop } from '@/hooks/useDepthRail';

const STOPS: DepthStop[] = [
  { id: 'top', depth: 0 },
  { id: 'about', depth: 5 },
  { id: 'courses', depth: 18 },
  { id: 'travel', depth: 30 },
  { id: 'gear', depth: 40 },
  { id: 'contact', depth: 0 },
];

const LABELS: Record<'lv' | 'ru', { depth: string; label: string }[]> = {
  lv: [
    { depth: '0m', label: 'virsma' },
    { depth: '5m', label: 'klubs' },
    { depth: '18m', label: 'apmācība' },
    { depth: '30m', label: 'ceļojumi' },
    { depth: '40m', label: 'inventārs' },
    { depth: '↑', label: 'kontakti' },
  ],
  ru: [
    { depth: '0m', label: 'поверхность' },
    { depth: '5m', label: 'клуб' },
    { depth: '18m', label: 'обучение' },
    { depth: '30m', label: 'путешествия' },
    { depth: '40m', label: 'инвентарь' },
    { depth: '↑', label: 'контакты' },
  ],
};

export function DepthRail() {
  const { lang } = useLang();
  const { progress, depth } = useDepthRail(STOPS);
  const labels = LABELS[lang];

  return (
    <aside className="depth-rail" aria-hidden="true">
      <div className="depth-rail__line" />
      <div className="depth-rail__marker" style={{ top: `${progress * 100}%` }}>
        <span className="depth-rail__value">{depth.toFixed(1)}</span>
        <span className="depth-rail__unit">m</span>
      </div>
      <ul className="depth-rail__stops">
        {STOPS.map((stop, i) => (
          <li
            key={stop.id}
            style={{ '--stop': `${(i / (STOPS.length - 1)) * 96}%` } as CSSProperties}
            onClick={() => document.getElementById(stop.id)?.scrollIntoView({ behavior: 'smooth' })}
          >
            <em>{labels[i].depth}</em> {labels[i].label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
