'use client';
// src/hooks/useTextScramble.js
// ============================================================
// TEXT SCRAMBLE HOOK
// On trigger, cycles each character through random glyphs
// before settling on the real letter. Staggered left→right.
// Total duration: ~1200ms. Pure rAF, no library.
// Respects prefers-reduced-motion — skips if set.
// ============================================================

import { useEffect, useRef, useCallback } from 'react';

// Character pool for scramble effect
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

/**
 * @param {string}  text      - The final target text
 * @param {boolean} trigger   - Start scramble when this flips to true
 * @returns {React.RefObject} - Attach to the DOM element to scramble
 */
const useTextScramble = (text, trigger) => {
  const elRef   = useRef(null);
  const rafRef  = useRef(null);

  const scramble = useCallback(() => {
    const el = elRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      return;
    }

    const chars  = text.split('');
    const total  = chars.length;
    const startT = performance.now();
    const TOTAL_DURATION = 1200; // ms for the whole name to settle

    const tick = (now) => {
      const elapsed = now - startT;
      const progress = Math.min(elapsed / TOTAL_DURATION, 1);

      // How many characters have settled so far (left → right)
      const settled = Math.floor(progress * total);

      let output = '';
      for (let i = 0; i < total; i++) {
        if (chars[i] === ' ') {
          output += ' ';
        } else if (i < settled) {
          // This character is done — show the real letter
          output += chars[i];
        } else {
          // Still scrambling — show a random glyph
          output += randomChar();
        }
      }

      el.textContent = output;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        el.textContent = text; // guarantee exact final text
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    if (!trigger) return;
    // Small delay so the hero fade-in starts first
    const timeout = setTimeout(scramble, 200);
    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, scramble]);

  return elRef;
};

export default useTextScramble;
