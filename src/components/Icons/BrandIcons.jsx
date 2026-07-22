// src/components/Icons/BrandIcons.jsx
// ============================================================
// SHARED BRAND ICON MARKS
// Single source of truth for logos that were previously hand-
// redrawn in multiple sections (Hero, Services, Stack). Each
// icon is a self-contained <svg> sized via `className` so it
// drops into any context without a local wrapper component.
// ============================================================

import React from 'react';

// Outline/stroke GitHub mark — used for social link rows (Hero, Services).
export const GithubOutlineIcon = ({ className = 'w-5 h-5', strokeWidth = 2 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.3 5.3 0 0 0 19 4.5a5.2 5.2 0 0 0-.5-4.5s-1.5-.5-4.5 1.5a14.2 14.2 0 0 0-8 0c-3-2-4.5-1.5-4.5-1.5a5.2 5.2 0 0 0-.5 4.5 5.3 5.3 0 0 0 1.5 3.3c0 5.77 3.34 6.79 6.5 7.17A4.8 4.8 0 0 0 8 18v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Outline/stroke LinkedIn mark — used for social link rows (Hero, Services).
export const LinkedinIcon = ({ className = 'w-5 h-5', strokeWidth = 2 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Solid/filled GitHub mark — used for tech-stack chip rows (Services, Stack).
export const GithubFilledIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

// React logo mark — used for tech-stack chip rows (Services, Stack).
export const ReactLogoIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="64" cy="64" r="11.4" fill="#61DAFB" />
    <path fill="none" stroke="#61DAFB" strokeWidth="6" d="M64 27c21.7 0 41.7 3 56.6 7.9C136 40 144 47.1 144 55.5s-8 15.6-23.4 20.6C105.7 81 85.7 84 64 84s-41.7-3-56.6-7.9C-8 71.1-16 64 -16 55.5s8-15.6 23.4-20.6C22.3 30 42.3 27 64 27z" />
    <path fill="none" stroke="#61DAFB" strokeWidth="6" d="M46.2 37.3c10.8-18.8 23.5-33.9 34.7-43.2C92.1-14.7 101.4-17 108 -13.2c6.6 3.8 9.1 13.6 7.3 27.2-1.7 13.2-7.8 29.4-16.9 45.5-9.1 16.1-20 30.1-30.3 39.7C57 109.8 47.6 113.3 41 109.5c-6.6-3.8-9.1-13.5-7.3-27.1 1.7-13.3 7.7-29.4 12.5-45.1z" />
    <path fill="none" stroke="#61DAFB" strokeWidth="6" d="M46.2 73.7c-10.8-18.8-17.3-37.3-19.2-52.7C25.2 7.4 28.3-1.6 35 -5.3c6.6-3.8 16.2-.3 26.5 9.3 10.3 9.6 20.9 25.2 29.9 41.3 9.1 16.1 15.6 32.5 17.8 46.3 2.2 13.3-.4 22.4-7 26.2-6.6 3.8-16.1.2-26.3-9.3C66 99.1 57 84.6 46.2 73.7z" />
  </svg>
);
