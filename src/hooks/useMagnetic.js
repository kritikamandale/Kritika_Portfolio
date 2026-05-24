// src/hooks/useMagnetic.js
// ============================================================
// MAGNETIC BUTTON HOOK
// Attracts an element toward the cursor when it comes within
// RADIUS px. Uses lerp(0.3) for smooth interpolation via rAF.
// Snaps back to origin on mouseleave.
// Respects prefers-reduced-motion: skips entirely if set.
// ============================================================

import { useEffect, useRef } from 'react';

const RADIUS = 60;   // px — attraction zone around the element
const LERP   = 0.30; // interpolation factor (0 = no movement, 1 = instant)

const useMagnetic = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let tx = 0, ty = 0;     // target position
    let cx = 0, cy = 0;     // current (lerped) position
    let rafId = null;
    let active = false;

    const tick = () => {
      cx += (tx - cx) * LERP;
      cy += (ty - cy) * LERP;

      // Stop rAF when close enough to avoid idle CPU usage
      const atRest = Math.abs(cx) < 0.1 && Math.abs(cy) < 0.1;
      el.style.transform = atRest && !active
        ? ''
        : `translate(${cx}px, ${cy}px)`;

      if (!atRest || active) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < RADIUS) {
        active = true;
        // Pull strength tapers off as cursor approaches edge of radius
        const strength = 1 - dist / RADIUS;
        tx = dx * strength * 0.45;
        ty = dy * strength * 0.45;
        if (!rafId) rafId = requestAnimationFrame(tick);
      } else if (active) {
        active = false;
        tx = 0;
        ty = 0;
      }
    };

    const onMouseLeave = () => {
      active = false;
      tx = 0;
      ty = 0;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transform = '';
    };
  }, []);

  return ref;
};

export default useMagnetic;
