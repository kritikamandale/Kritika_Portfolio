'use client';
// src/components/Cursor/Cursor.jsx
// ============================================================
// CUSTOM CURSOR — desktop only (hover: hover) & (pointer: fine)
// .cursorDot  — 8px solid circle, follows exact mouse position
// .cursorRing — 32px outline circle, lerps behind the dot
// Trail dots  — 7 fading dots with increasing delay offsets,
//               forming a pumpkin-spice comet tail.
// Scales ring on [data-hover] / a / button elements.
// All elements start off-screen (opacity 0) and only appear
// after the first real mousemove — no top-left flash.
// ============================================================

import React, { useEffect, useRef, useState } from 'react';

const isDesktopPointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// 7 trail dots — lerp factors slow progressively to create spread
const TRAIL_COUNT     = 7;
const TRAIL_LERPS     = [0.10, 0.085, 0.072, 0.062, 0.053, 0.046, 0.040];
const TRAIL_SIZES     = [7,    6,     5,     4.5,   4,     3.5,   3];
const TRAIL_OPACITIES = [0.55, 0.45,  0.36,  0.28,  0.20,  0.13,  0.07];

// All elements start off-screen so they never flash at (0,0)
const OFF = -300;

const Cursor = () => {
  const [mounted, setMounted] = useState(false);
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const trailRefs = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ current: null }))
  );

  useEffect(() => {
    // Avoid synchronous setState in effect
    const timer = setTimeout(() => setMounted(true), 0);

    if (!isDesktopPointer()) return;

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const trail = trailRefs.current.map((r) => r.current);
    if (!dot || !ring) return;

    // Hide native cursor on the whole document
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    // All positions start off-screen
    let mouseX = OFF;
    let mouseY = OFF;
    let ringX  = OFF;
    let ringY  = OFF;
    let trailX = Array(TRAIL_COUNT).fill(OFF);
    let trailY = Array(TRAIL_COUNT).fill(OFF);
    let rafId;
    let isHovering  = false;
    let hasMovedOnce = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Reveal all cursor elements only after the first real mouse event
      if (!hasMovedOnce) {
        hasMovedOnce = true;
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
        trail.forEach((t, i) => {
          if (t) t.style.opacity = String(TRAIL_OPACITIES[i]);
        });
      }

      // Dot snaps instantly to pointer
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const onMouseOver = (e) => {
      if (e.target.closest('[data-hover], a, button')) {
        isHovering = true;
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('[data-hover], a, button')) {
        isHovering = false;
      }
    };

    const tick = () => {
      // Ring lerps smoothly behind the dot
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = isHovering
        ? `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(2.2)`
        : `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(1)`;
      ring.style.borderColor = isHovering ? 'rgba(255,140,66,0.7)' : '';

      // Trail dots — each follows the one ahead
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const srcX = i === 0 ? mouseX : trailX[i - 1];
        const srcY = i === 0 ? mouseY : trailY[i - 1];
        trailX[i] += (srcX - trailX[i]) * TRAIL_LERPS[i];
        trailY[i] += (srcY - trailY[i]) * TRAIL_LERPS[i];
        if (trail[i]) {
          trail[i].style.transform =
            `translate(${trailX[i]}px, ${trailY[i]}px) translate(-50%, -50%)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout',  onMouseOut,  { passive: true });

    return () => {
      clearTimeout(timer);
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout',  onMouseOut);
    };
  }, []);

  if (!mounted || !isDesktopPointer()) return null;

  return (
    <>
      {/* Dot — snaps exactly to pointer, invisible until first move */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          opacity:   0,
          transform: `translate(${OFF}px, ${OFF}px) translate(-50%, -50%)`,
        }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-accent pointer-events-none z-[9999] will-change-transform hidden md:block transition-opacity duration-150"
      />

      {/* Ring — lerps behind dot, scales on hover targets */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          opacity:   0,
          transform: `translate(${OFF}px, ${OFF}px) translate(-50%, -50%)`,
        }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-accent bg-transparent pointer-events-none z-[9998] will-change-transform transition-[transform,border-color,opacity] duration-200 ease hidden md:block"
      />

      {/* Comet trail — orange dots fading out behind the cursor */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = { current: el }; }}
          aria-hidden="true"
          className="fixed top-0 left-0 rounded-full bg-brand-orange pointer-events-none z-[9997] will-change-transform hidden md:block"
          style={{
            width:     TRAIL_SIZES[i],
            height:    TRAIL_SIZES[i],
            opacity:   0,
            transform: `translate(${OFF}px, ${OFF}px) translate(-50%, -50%)`,
          }}
        />
      ))}
    </>
  );
};

export default Cursor;
