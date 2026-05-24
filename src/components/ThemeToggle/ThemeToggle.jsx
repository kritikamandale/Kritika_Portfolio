'use client';
// src/components/ThemeToggle/ThemeToggle.jsx
// ============================================================
// DARK / LIGHT MODE TOGGLE
// Sets data-theme="dark"|"light" on <html>.
// Persists choice in localStorage.
// Clip-path circle expands from the button position on switch.
// ============================================================

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './ThemeToggle.module.css';

const STORAGE_KEY  = 'theme';
const DARK_CLASS   = 'dark';

// Read saved or system preference
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const ThemeToggle = () => {
  const [theme, setTheme]       = useState(getInitialTheme);
  const [rippling, setRippling] = useState(false);
  const btnRef = useRef(null);
  const overlayRef = useRef(null);

  // Apply theme to <html> whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    const btn  = btnRef.current;
    const overlay = overlayRef.current;

    // Respect prefers-reduced-motion — just swap instantly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(next);
      return;
    }

    if (!btn || !overlay || rippling) return;

    // Position the clip-path origin at the button's centre
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width  / 2;
    const y = rect.top  + rect.height / 2;

    // Diagonal of the viewport = max radius needed
    const maxR = Math.hypot(
      Math.max(x, window.innerWidth  - x),
      Math.max(y, window.innerHeight - y)
    ) + 10;

    overlay.style.background = next === 'dark' ? '#1c1917' : '#FCFBFA';
    overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    overlay.style.display  = 'block';

    setRippling(true);

    // Force reflow so the initial clip-path is painted before transition
    void overlay.offsetWidth;

    overlay.style.transition = 'clip-path 500ms cubic-bezier(0.22, 1, 0.36, 1)';
    overlay.style.clipPath   = `circle(${maxR}px at ${x}px ${y}px)`;

    const onEnd = () => {
      setTheme(next);
      overlay.style.transition = 'none';
      overlay.style.clipPath   = '';
      overlay.style.display    = 'none';
      setRippling(false);
    };

    overlay.addEventListener('transitionend', onEnd, { once: true });
  }, [theme, rippling]);

  const isDark = theme === 'dark';

  return (
    <>
      {/* Full-viewport clip-path overlay — covers the switch */}
      <div
        ref={overlayRef}
        className={styles.overlay}
        aria-hidden="true"
      />

      <button
        ref={btnRef}
        className={styles.toggle}
        onClick={toggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        <span className={styles.icon}>
          {isDark ? '☀️' : '🌙'}
        </span>
      </button>
    </>
  );
};

export default ThemeToggle;
