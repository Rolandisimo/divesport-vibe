import { useEffect, useRef, useState } from 'react';

export interface DepthStop {
  id: string;
  depth: number;
}

/**
 * Tracks scroll position against a list of section ids and reports which one
 * is "current" plus a 0..1 progress value, used to position the depth-rail marker.
 */
export function useDepthRail(stops: DepthStop[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    function update() {
      const viewportMid = window.scrollY + window.innerHeight * 0.35;
      let idx = 0;
      stops.forEach((stop, i) => {
        const el = document.getElementById(stop.id);
        if (el && el.offsetTop <= viewportMid) idx = i;
      });
      setCurrentIndex(idx);
    }

    function onScroll() {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          update();
          tickingRef.current = false;
        });
      }
    }

    update();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [stops]);

  const progress = stops.length > 1 ? currentIndex / (stops.length - 1) : 0;
  const depth = stops[currentIndex]?.depth ?? 0;

  return { currentIndex, progress, depth };
}
