// src/components/Cursor/Cursor.jsx
// ============================================================
// CUSTOM CURSOR — desktop only (hover: hover) & (pointer: fine)
// .cursorDot  — 8px solid circle, follows exact mouse position
// .cursorRing — 32px outline circle, lerps behind the dot
// Scales/fades ring on [data-hover] elements.
// Adds cursor:none to body on mount; restores on unmount.
// ============================================================

import React, { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

const isDesktopPointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const Cursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!isDesktopPointer()) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide native cursor
    document.body.style.cursor = 'none';

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;
    let rafId;
    let isHovering = false;

    // ── Track exact mouse position ──────────────────────────
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    // ── Hover detection via event delegation ────────────────
    const onMouseOver = (e) => {
      if (e.target.closest('[data-hover], a, button')) {
        isHovering = true;
        ring.style.opacity = '0.5';
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('[data-hover], a, button')) {
        isHovering = false;
        ring.style.opacity = '1';
      }
    };

    // ── RAF loop: lerp ring toward cursor ───────────────────
    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      ring.style.transform = isHovering
        ? `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(2)`
        : `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(1)`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout',  onMouseOut,  { passive: true });

    return () => {
      document.body.style.cursor = '';
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout',  onMouseOut);
    };
  }, []);

  if (!isDesktopPointer()) return null;

  return (
    <>
      <div ref={dotRef}  className={styles.cursorDot}  aria-hidden="true" />
      <div ref={ringRef} className={styles.cursorRing} aria-hidden="true" />
    </>
  );
};

export default Cursor;
