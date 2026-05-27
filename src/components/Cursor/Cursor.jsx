'use client';
// src/components/Cursor/Cursor.jsx
// ============================================================
// CUSTOM CURSOR — desktop only (hover: hover) & (pointer: fine)
// .cursorDot  — 8px solid circle, follows exact mouse position
// .cursorRing — 32px outline circle, lerps behind the dot
// Trail dots  — 7 fading dots with increasing delay offsets,
//               forming a pumpkin-spice comet tail.
// Scales/fades ring on [data-hover] elements.
// Adds cursor:none to body on mount; restores on unmount.
// ============================================================

import React, { useEffect, useRef, useState } from 'react';

const isDesktopPointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// 7 trail dots — lerp factors slow progressively to create spread
const TRAIL_COUNT  = 7;
const TRAIL_LERPS  = [0.10, 0.085, 0.072, 0.062, 0.053, 0.046, 0.040];
const TRAIL_SIZES  = [7,    6,     5,     4.5,   4,     3.5,   3];
const TRAIL_OPACITIES = [0.55, 0.45, 0.36, 0.28, 0.20, 0.13, 0.07];

const Cursor = () => {
  const [mounted, setMounted] = useState(false);
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const trailRefs = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ current: null }))
  );

  useEffect(() => {
    setMounted(true);
    if (!isDesktopPointer()) return;

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const trail = trailRefs.current.map((r) => r.current);
    if (!dot || !ring) return;

    // Hide native cursor
    document.body.style.cursor = 'none';

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX,  ringY  = mouseY;
    // Each trail dot has its own x/y position
    let trailX = Array(TRAIL_COUNT).fill(mouseX);
    let trailY = Array(TRAIL_COUNT).fill(mouseY);
    let rafId;
    let isHovering = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

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

    const tick = () => {
      // Ring lerp
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = isHovering
        ? `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(2)`
        : `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(1)`;

      // Trail dots — each follows the one ahead of it
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const sourceX = i === 0 ? mouseX : trailX[i - 1];
        const sourceY = i === 0 ? mouseY : trailY[i - 1];
        trailX[i] += (sourceX - trailX[i]) * TRAIL_LERPS[i];
        trailY[i] += (sourceY - trailY[i]) * TRAIL_LERPS[i];
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
      <div 
        ref={dotRef}  
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999] -mt-1 -ml-1 will-change-transform hidden md:block"  
        aria-hidden="true" 
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-accent bg-transparent pointer-events-none z-[9998] will-change-[transform,opacity] transition-all duration-200 ease opacity-100 hidden md:block" 
        aria-hidden="true" 
      />
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = { current: el }; }}
          className="fixed top-0 left-0 rounded-full bg-brand-orange pointer-events-none z-[9997] will-change-transform hidden md:block"
          aria-hidden="true"
          style={{
            width:   TRAIL_SIZES[i],
            height:  TRAIL_SIZES[i],
            opacity: TRAIL_OPACITIES[i],
          }}
        />
      ))}
    </>
  );
};

export default Cursor;
