'use client';
// src/hooks/useScrollReveal.js
// ============================================================
// SCROLL REVEAL HOOK
// Attaches an IntersectionObserver to all elements with the
// .reveal class and toggles .visible when they enter viewport.
// Call this once at the App level.
// ============================================================

import { useEffect } from 'react';

const useScrollReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Un-observe after animation so it doesn't re-trigger
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12, // trigger when 12% of element is visible
        rootMargin: '0px 0px -40px 0px', // slight bottom offset
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default useScrollReveal;
