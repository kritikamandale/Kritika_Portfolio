'use client';
// src/hooks/useIsMobile.js
// ============================================================
// IS-MOBILE HOOK
// Returns `true` below the Tailwind `md` breakpoint (<768px).
// Used to render the native CSS scroll-snap versions of the
// Awards / Certifications sections on phones while leaving the
// desktop GSAP choreography completely untouched.
//
// These sections are lazy-loaded (client-only), so the first
// render already runs in the browser — initialising straight
// from matchMedia avoids a desktop→mobile layout flash.
// ============================================================

import { useEffect, useState } from 'react';

const QUERY = '(max-width: 767px)';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(QUERY).matches
      : false
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mq = window.matchMedia(QUERY);
    const update = () => setIsMobile(mq.matches);
    update();

    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isMobile;
};

export default useIsMobile;
