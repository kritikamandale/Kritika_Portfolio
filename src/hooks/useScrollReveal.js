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
    let observer;
    let timer;

    const initObserver = () => {
      const elements = document.querySelectorAll('.reveal');
      
      // If elements aren't in the DOM yet, retry shortly.
      if (elements.length === 0) {
        timer = setTimeout(initObserver, 100);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      elements.forEach((el) => observer.observe(el));
    };

    // Delay slightly to let hydration finish painting the DOM
    timer = setTimeout(initObserver, 50);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []);
};

export default useScrollReveal;
