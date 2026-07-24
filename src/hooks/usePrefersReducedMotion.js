'use client';
// src/hooks/usePrefersReducedMotion.js
// ============================================================
// PREFERS-REDUCED-MOTION HOOK
// Returns `true` when the OS-level "reduce motion" accessibility
// setting is on. Used to disable the scroll-driven pin / snap /
// horizontal-scroll choreography and fall back to a plain static
// layout.
//
// SSR-safe: starts `false` (matching server render) and updates
// after mount, so it never causes a hydration mismatch.
// ============================================================

import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mq = window.matchMedia(QUERY);
    const update = () => setPrefersReduced(mq.matches);
    update();

    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return prefersReduced;
};

export default usePrefersReducedMotion;
