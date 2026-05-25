'use client';
// src/components/AvailabilityBanner/AvailabilityBanner.jsx
// ============================================================
// AVAILABILITY BANNER
// A dismissible top bar that slides in after 3 seconds on
// first visit. Hidden in sessionStorage after dismiss so it
// doesn't reappear on refresh within the same session.
// ============================================================

import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'availability_banner_dismissed';

const AvailabilityBanner = () => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (visible) {
      window.dispatchEvent(new CustomEvent('banner-change', { detail: { visible: true } }));
    }
  }, [visible]);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setExiting(true);
    sessionStorage.setItem(STORAGE_KEY, '1');
    window.dispatchEvent(new CustomEvent('banner-change', { detail: { visible: false } }));
    setTimeout(() => setVisible(false), 350); // wait for slide-out
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(0);     opacity: 1; }
          to   { transform: translateY(-100%); opacity: 0; }
        }
        @keyframes customPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
      <div
        className={`fixed top-0 left-0 right-0 z-[110] flex items-center justify-center gap-2.5 py-2.5 px-5 bg-brand-mauve text-white font-sans text-[13px] font-medium tracking-[0.02em] motion-reduce:animate-none ${exiting ? 'animate-[slideUp_300ms_ease-in_both]' : 'animate-[slideDown_350ms_cubic-bezier(0.22,1,0.36,1)_both]'}`}
        role="banner"
        aria-live="polite"
      >
        <span className="w-2 h-2 rounded-full bg-[#6ee7b7] shrink-0 animate-[customPulse_2s_ease-in-out_infinite] motion-reduce:animate-none" aria-hidden="true" />
        <span className="text-center">
          Currently open to opportunities —{' '}
          <a href="#contact" className="text-brand-yellow font-bold underline underline-offset-[3px] transition-opacity duration-150 ease hover:opacity-80" onClick={dismiss}>
            Let's talk ↗
          </a>
        </span>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-inherit opacity-60 cursor-pointer text-xs leading-none px-2 py-1 rounded transition-all duration-150 ease hover:opacity-100 hover:bg-white/12"
          onClick={dismiss}
          aria-label="Dismiss availability banner"
        >
          ✕
        </button>
      </div>
    </>
  );
};

export default AvailabilityBanner;
