'use client';

import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

// Canonical GSAP <-> Lenis bridge. Without this, ScrollTrigger reads scroll
// position from the browser's native scroll events. On DESKTOP that's fine
// because Lenis smooths the wheel into a clean, monotonic position that
// scrub/snap can follow. On MOBILE, touch input was left to the browser's
// native ballistic fling (Lenis only smoothed the wheel), so the same
// scrub/snap timelines fought the momentum — cards skipped or stuck, and the
// horizontal certificate rail triggered mid-fling. Driving Lenis from
// gsap.ticker and forwarding every Lenis scroll into ScrollTrigger.update
// makes touch flow through the exact same smoothed loop as the wheel, so the
// mobile behaviour matches desktop. (Touch normalisation itself is switched on
// via `syncTouch` on the ReactLenis options below.)
const LenisGsapBridge = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Layout for the pinned sections is measured from the final page height;
    // once Lenis is the single scroll source, refresh so every ScrollTrigger
    // start/end recomputes against it.
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return null;
};

const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis
      root
      // autoRaf disabled: Lenis is driven from gsap.ticker in LenisGsapBridge
      // so GSAP and Lenis share one animation loop (no two-RAF jitter).
      // syncTouch normalises touch input through Lenis the same way smoothWheel
      // normalises the wheel — this is what makes the scrub/snap timelines
      // behave identically on mobile and desktop.
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.8,
        syncTouch: true,
        autoRaf: false,
      }}
    >
      <LenisGsapBridge />
      <HashScrollOnLoad />
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
