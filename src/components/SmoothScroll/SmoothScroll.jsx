'use client';

import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';

// Lenis drives scroll itself, so it doesn't know about the browser's native
// "jump to #hash on load" behaviour — after a full page navigation (e.g.
// clicking a section link from a different route, like /mindset back to
// "/#experience"), the native jump can fire before layout has settled and
// then get silently overridden once Lenis takes over, landing back at the
// top. This re-asserts the scroll target explicitly once Lenis is ready,
// and again after all page resources have finished loading.
const HashScrollOnLoad = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.getElementById(hash.slice(1));
      if (el) lenis.scrollTo(el, { immediate: true });
    };

    const initialTimer = setTimeout(scrollToHash, 150);
    window.addEventListener('load', scrollToHash);

    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('load', scrollToHash);
    };
  }, [lenis]);

  return null;
};

const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, wheelMultiplier: 1.8 }}>
      <HashScrollOnLoad />
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
