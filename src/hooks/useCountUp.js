'use client';
// src/hooks/useCountUp.js
// ============================================================
// COUNT-UP HOOK
// Counts a number from 0 to `target` over `duration`ms using
// rAF + easeOutCubic. Triggered when the element scrolls into
// view via IntersectionObserver.
// Respects prefers-reduced-motion — shows final value instantly.
// ============================================================

import { useState, useEffect, useRef } from 'react';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/**
 * @param {number} target    - The number to count up to
 * @param {number} duration  - Animation duration in ms (default 1400)
 * @returns {{ ref, display }} - ref: attach to container, display: current string value
 */
const useCountUp = (target, duration = 1400) => {
  const [display, setDisplay] = useState('0');
  const ref    = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const runAnimation = () => {
      if (prefersReduced) {
        setDisplay(String(target));
        return;
      }
      const start = performance.now();

      const tick = (now) => {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = easeOutCubic(progress);
        const value    = Math.round(eased * target);
        setDisplay(String(value));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return { ref, display };
};

export default useCountUp;
