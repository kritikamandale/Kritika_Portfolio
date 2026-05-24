'use client';
// src/components/AvailabilityBanner/AvailabilityBanner.jsx
// ============================================================
// AVAILABILITY BANNER
// A dismissible top bar that slides in after 3 seconds on
// first visit. Hidden in sessionStorage after dismiss so it
// doesn't reappear on refresh within the same session.
// ============================================================

import React, { useState, useEffect } from 'react';
import styles from './AvailabilityBanner.module.css';

const STORAGE_KEY = 'availability_banner_dismissed';

const AvailabilityBanner = () => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setExiting(true);
    sessionStorage.setItem(STORAGE_KEY, '1');
    setTimeout(() => setVisible(false), 350); // wait for slide-out
  };

  if (!visible) return null;

  return (
    <div
      className={[styles.banner, exiting ? styles.exit : styles.enter].join(' ')}
      role="banner"
      aria-live="polite"
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.text}>
        Currently open to opportunities —{' '}
        <a href="#contact" className={styles.link} onClick={dismiss}>
          Let's talk ↗
        </a>
      </span>
      <button
        className={styles.close}
        onClick={dismiss}
        aria-label="Dismiss availability banner"
      >
        ✕
      </button>
    </div>
  );
};

export default AvailabilityBanner;
