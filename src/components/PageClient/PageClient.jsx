'use client';

import React, { useEffect, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

const PageClient = () => {
  const progressRef = useRef(null);

  // ── Scroll progress bar ───────────────────────────────────
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? scrolled / total : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── DOM scroll-reveal (.reveal → .visible) ────────────────
  useScrollReveal();

  return (
    <div id="scroll-progress" ref={progressRef} style={{ transform: 'scaleX(0)' }} />
  );
};

export default PageClient;
