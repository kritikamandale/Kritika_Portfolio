// src/components/Loader/Loader.jsx
// ============================================================
// LOADER COMPONENT
// Full-screen loading screen with a morphing clay blob.
// Exits with blur + opacity fade after 2.2s.
// ============================================================

import React, { useEffect, useState } from 'react';
import styles from './Loader.module.css';

const Loader = ({ onComplete }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Start exit animation after 2.2 seconds
    const exitTimer = setTimeout(() => setHidden(true), 2200);

    // Notify parent when transition ends (0.7s transition)
    const doneTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2900);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={[styles.overlay, hidden ? styles.hidden : '']
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Animated clay blob */}
      <div className={styles.blobWrap}>
        <div className={styles.blobShadow} aria-hidden="true" />
        <div className={styles.blob} aria-hidden="true" />
      </div>

      {/* Loading text */}
      <p className={styles.text}>Crafting experience</p>

      {/* Bouncing dots */}
      <div className={styles.dots} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export default Loader;
