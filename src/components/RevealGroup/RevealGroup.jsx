// src/components/RevealGroup/RevealGroup.jsx
// ============================================================
// REVEAL GROUP — IntersectionObserver stagger wrapper
// Observes the container; when it enters the viewport each
// direct child animates in with index × staggerDelay offset.
// Uses only native CSS + vanilla JS — no animation libraries.
// ============================================================

import React, { useRef, useEffect } from 'react';

const RevealGroup = ({ children, staggerDelay = 0, className = '', style = {} }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // elements already visible at natural opacity

    const directChildren = Array.from(container.children);

    // Set initial hidden state on each child
    directChildren.forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(20px)';
      child.style.transition = [
        `opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) ${i * staggerDelay}ms`,
        `transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${i * staggerDelay}ms`,
      ].join(', ');
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          directChildren.forEach((child) => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          });
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [staggerDelay]);

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
};

export default RevealGroup;
