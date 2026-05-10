// src/hooks/useScrollProgress.js
// ============================================================
// SCROLL PROGRESS HOOK
// Tracks scroll progress (0 → 1) within a specific DOM element
// (the scroll-trigger section). Uses requestAnimationFrame so
// reads and writes are never synchronous on the main thread.
//
// Usage:
//   const progress = useScrollProgress(triggerRef);
//   // progress: 0 when trigger top is at viewport top
//   //           1 when trigger bottom has scrolled past viewport top
// ============================================================

import { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────
// useScrollProgress
//
// @param {React.RefObject<HTMLElement>} triggerRef
//   — ref pointing at the tall scroll-trigger <div>
//
// @returns {number} progress — clamped 0 → 1
// ─────────────────────────────────────────────────────────────
const useScrollProgress = (triggerRef) => {
  // The normalised scroll progress value we expose to consumers
  const [progress, setProgress] = useState(0);

  // rAF handle — stored in a ref so we can cancel on unmount
  const rafId = useRef(null);

  // Flag: are we currently inside a pending rAF tick?
  const ticking = useRef(false);

  useEffect(() => {
    // ── The rAF callback — runs once per animation frame ─────
    const update = () => {
      // Reset the ticking flag so the next scroll event can
      // schedule a new frame
      ticking.current = false;

      const el = triggerRef.current;
      if (!el) return; // element not yet mounted — skip

      // getBoundingClientRect gives us position relative to
      // the current viewport — this is the scroll-aware value
      const rect = el.getBoundingClientRect();

      // rect.top  = px from viewport-top to element-top
      // rect.height = total scrollable height of the trigger

      // When the user hasn't scrolled yet: rect.top === 0
      // scrolled distance inside the trigger =  0 - rect.top
      const scrolled = -rect.top;

      // Total scrollable distance = trigger height minus viewport
      const total = rect.height - window.innerHeight;

      // Clamp to [0, 1] — handles over-scroll / bounce
      const raw = scrolled / total;
      const clamped = Math.max(0, Math.min(1, raw));

      // Only call setProgress when value actually changed
      // to avoid unnecessary re-renders
      setProgress((prev) => (prev !== clamped ? clamped : prev));
    };

    // ── Scroll handler — schedules exactly one rAF per frame ─
    const onScroll = () => {
      // If we already have a frame pending, do nothing —
      // the update() above will catch the latest scrollY
      if (ticking.current) return;
      ticking.current = true;
      rafId.current = requestAnimationFrame(update);
    };

    // ── Initial read on mount ─────────────────────────────────
    // Ensures correct state if the page loads mid-scroll
    update();

    // Passive: true — tells the browser this listener will never
    // call preventDefault(), allowing paint-thread optimisation
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      // Cancel any pending frame on unmount
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, [triggerRef]);

  return progress;
};

export default useScrollProgress;
