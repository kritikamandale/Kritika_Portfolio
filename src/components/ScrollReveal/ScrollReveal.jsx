// src/components/ScrollReveal/ScrollReveal.jsx
// ============================================================
// SCROLL-DRIVEN REVEAL — v2 REWRITE
//
// 4 phases, all driven by scroll position within the trigger:
//
//  Phase 1 (0%  → 50%)  : Pill grows to 70vw×70vh, colour shifts,
//                          radius 9999px → 60px
//  Phase 2 (50% → 80%)  : Shape fills 100vw×100vh, radius → 0px,
//                          name fades IN (50% → 65%), stays through 95%
//  Phase 3 (80% → 95%)  : Shape fades OUT, name stays bold
//  Phase 4 (95% → 100%) : Name fades OUT, portfolio fully revealed
//
// BUG FIXES applied:
//   BUG 1 — overlay wrapper background is transparent (CSS handles it)
//   BUG 2 — content div has NO opacity/display tricks; always rendered
//   REMOVED — all "Crafting experience" text and loading animations
// ============================================================

import React, { useRef, useEffect, useState } from 'react';

import useScrollProgress from '../../hooks/useScrollProgress';
import { colorLerp, REVEAL_PALETTE } from '../../utils/colorLerp';

// ─────────────────────────────────────────────────────────────
// lerp — linear interpolation between two numbers
//   a: start, b: end, t: progress 0→1
// ─────────────────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;

// ─────────────────────────────────────────────────────────────
// mapRange — re-maps value from [inMin, inMax] to [outMin, outMax]
//   Clamps so the output never leaves [outMin, outMax].
//   e.g. mapRange(0.6, 0.5, 0.8, 0, 1) → 0.333...
// ─────────────────────────────────────────────────────────────
const mapRange = (value, inMin, inMax, outMin, outMax) => {
  const t = Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)));
  return lerp(outMin, outMax, t);
};

// ─────────────────────────────────────────────────────────────
// PHASE BOUNDARIES — fraction of trigger scroll progress (0–1)
// Change these to adjust the feel/pacing of the animation.
// ─────────────────────────────────────────────────────────────
const P = {
  PHASE1_END: 0.20,
  PHASE2_END: 0.45,
  NAME_FADE_IN_START: 0.10,
  NAME_FADE_IN_END: 0.35,
  SHAPE_FADE_START: 0.45,
  SHAPE_FADE_END: 0.72,
  NAME_FADE_OUT_START: 0.50,
  NAME_FADE_OUT_END: 0.88,
  DONE_AT: 0.88,
};

// Starting pill dimensions (px)
const PILL_W = 80;
const PILL_H = 48;

// ── Edit your name here ───────────────────────────────────────
// This is the text that appears in Phase 2 over the shape.
const DISPLAY_NAME = 'Kritika Mandale';

const ScrollReveal = ({ children, onDone, staggerDelay = 0 }) => {
  // ── DOM refs ──────────────────────────────────────────────
  const triggerRef = useRef(null); // the tall scroll-spacer div
  const overlayRef = useRef(null); // position:fixed wrapper (transparent bg)
  const shapeRef = useRef(null); // morphing clay pill/rect
  const nameRef = useRef(null); // name text element

  // ── Detect prefers-reduced-motion once on mount ───────────
  // If true: skip the whole animation, render content directly
  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // ── Scroll progress 0→1 within the trigger section ───────
  const progress = useScrollProgress(triggerRef);

  // Computed state for whether the scroll is entirely past the trigger
  const isDone = progress >= P.DONE_AT;

  // ── Notify App.jsx when isDone changes ─────────────────────
  // This allows the Hero and Navbar to reverse their animations
  // if the user scrolls backwards into the trigger zone.
  useEffect(() => {
    if (onDone) onDone(isDone);
  }, [isDone, onDone]);

  // ── Trigger height (responsive) ──────────────────────────
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth <= 768;
  const triggerHeight = isMobile ? '180vh' : '220vh';

  // ── Skip handler — jumps scroll past the trigger section ──
  const skip = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const triggerBottom =
      window.scrollY + trigger.getBoundingClientRect().bottom;

    window.scrollTo({ top: triggerBottom, behavior: 'auto' });
  };

  // ── Core animation driver ─────────────────────────────────
  // Runs every time `progress` changes (rAF-batched by hook).
  // Reads viewport size, computes all values, writes to refs.
  // Works bidirectionally automatically.
  useEffect(() => {
    if (prefersReduced.current) return;

    const overlay = overlayRef.current;
    const shape = shapeRef.current;
    const nameEl = nameRef.current;
    if (!overlay || !shape || !nameEl) return;

    const p = progress; // shorthand — clamped 0→1 by the hook

    // ── CLEANUP / RECOVERY ──────────────────────────────────
    if (p >= P.DONE_AT) {
      // Remove overlay from the paint tree when done
      overlay.style.display = 'none';
      return;
    }

    // Ensure overlay is in the paint tree while animating
    overlay.style.display = '';

    // Read current viewport dimensions inside the frame
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // ────────────────────────────────────────────────────────
    // SHAPE GEOMETRY — width, height, border-radius
    // ────────────────────────────────────────────────────────
    let shapeW, shapeH, radius;

    if (p <= P.PHASE1_END) {
      const t1 = mapRange(p, 0, P.PHASE1_END, 0, 1);
      shapeW = lerp(PILL_W, vw * 0.70, t1);
      shapeH = lerp(PILL_H, vh * 0.70, t1);
      radius = lerp(9999, 60, t1);
    } else {
      const t2 = mapRange(p, P.PHASE1_END, P.PHASE2_END, 0, 1);
      shapeW = lerp(vw * 0.70, vw, t2);
      shapeH = lerp(vh * 0.70, vh, t2);
      radius = lerp(60, 0, t2);
    }

    shape.style.width = `${shapeW}px`;
    shape.style.height = `${shapeH}px`;
    shape.style.borderRadius = `${radius}px`;

    // ────────────────────────────────────────────────────────
    // COLOUR — interpolates across REVEAL_PALETTE
    // ────────────────────────────────────────────────────────
    const colorT = mapRange(p, 0, P.PHASE2_END, 0, 1);
    shape.style.backgroundColor = colorLerp(REVEAL_PALETTE, colorT);

    // ────────────────────────────────────────────────────────
    // SHAPE OPACITY
    // ────────────────────────────────────────────────────────
    const shapeOpacity = mapRange(
      p,
      P.SHAPE_FADE_START,
      P.SHAPE_FADE_END,
      1,
      0
    );
    shape.style.opacity = shapeOpacity;

    // NAME OPACITY & SCALE
    // ────────────────────────────────────────────────────────
    let nameOpacity;

    if (p < P.NAME_FADE_IN_START) {
      // Before the name phase: hidden
      nameOpacity = 0;
    } else if (p <= P.NAME_FADE_OUT_START) {
      // Name appears instantly at full opacity — no gradual fade in
      nameOpacity = 1;
    } else {
      // Name fades OUT only
      nameOpacity = mapRange(p, P.NAME_FADE_OUT_START, P.NAME_FADE_OUT_END, 1, 0);
    }

    nameEl.style.opacity = nameOpacity;

    // Scale grows moderately — big enough to feel cinematic, small enough to read
    let nameScale = 1;
    if (p >= P.NAME_FADE_IN_START) {
      nameScale = mapRange(p, P.NAME_FADE_IN_START, P.NAME_FADE_OUT_END, 1.0, 6.0);
    }
    nameEl.style.transform = `translate(-50%, -50%) scale(${nameScale})`;

  }, [progress]);

  // ── Reduced-motion bypass ─────────────────────────────────
  if (prefersReduced.current) {
    return <div className="relative z-0 opacity-100 transition-opacity duration-800 ease">{children}</div>;
  }

  // ── Initial inline styles (synchronised with p=0) ────────
  const initialShape = {
    width: `${PILL_W}px`,
    height: `${PILL_H}px`,
    borderRadius: '9999px',
    backgroundColor: REVEAL_PALETTE[0],
    opacity: 1,
  };

  const initialName = {
    opacity: 0,
  };

  return (
    <>
      <div
        ref={triggerRef}
        className="relative bg-transparent pointer-events-none"
        aria-hidden="true"
        style={{ height: triggerHeight }}
      />

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-transparent pointer-events-none"
        aria-hidden="true"
        role="presentation"
      >
        <div
          ref={shapeRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] overflow-hidden will-change-[width,height,border-radius,background-color,opacity] backface-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-[60%] before:h-[45%] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.50)_0%,rgba(255,255,255,0.00)_100%)] before:pointer-events-none"
          style={initialShape}
        />

        <div
          ref={nameRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] font-sans text-[clamp(52px,11vw,110px)] font-extrabold text-[#26215c] tracking-[-0.03em] leading-none whitespace-nowrap pointer-events-none select-none will-change-[opacity]"
          style={initialName}
        >
          {DISPLAY_NAME}
        </div>
      </div>

      {!isDone && (
        <button
          className="max-md:hidden fixed bottom-6 right-6 z-[101] px-[1.1rem] py-[0.45rem] rounded-pill border-[1.5px] border-white/35 bg-white/15 backdrop-blur-md text-[#26215c]/80 font-sans text-xs font-semibold tracking-[0.06em] cursor-pointer transition-all duration-200 ease hover:bg-white/30 hover:-translate-y-[2px]"
          onClick={skip}
          aria-label="Skip intro animation and jump to portfolio"
        >
          Skip intro ↓
        </button>
      )}

      <div className={`relative z-0 transition-opacity duration-800 ease ${isDone ? 'opacity-100' : 'opacity-0'}`}>
        {staggerDelay > 0
          ? React.Children.map(children, (child, index) =>
              child
                ? React.cloneElement(child, {
                    style: {
                      ...(child.props.style || {}),
                      animationDelay: `${index * staggerDelay}ms`,
                    },
                  })
                : child
            )
          : children}
      </div>
    </>
  );
};

export default ScrollReveal;
