import { useEffect, useState } from 'react';

/** Purely decorative: makes the hero's "DEPTH" readout tick gently, like a dive computer. */
export function useHeroGauge() {
  const [value, setValue] = useState(12.4);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((prev) => {
        const next = prev + (Math.random() - 0.5) * 0.6;
        return Math.max(2, Math.min(38, next));
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return value.toFixed(1).padStart(5, '0');
}
