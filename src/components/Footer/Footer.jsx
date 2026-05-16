import React from 'react';
import styles from './Footer.module.css';

const StarIcon = () => (
  <svg viewBox="0 0 100 100" className={styles.starIcon} fill="currentColor">
    <path d="M50 0L56 44L100 50L56 56L50 100L44 56L0 50L44 44Z" />
    <path d="M75 25L50 50L75 75L50 50Z" opacity="0.5" />
    {/* Adding small diamonds on the sides like the reference */}
    <rect x="75" y="42" width="16" height="16" transform="rotate(45 83 50)" />
    <rect x="9" y="42" width="16" height="16" transform="rotate(45 17 50)" />
    <rect x="42" y="75" width="16" height="16" transform="rotate(45 50 83)" />
    <rect x="42" y="9" width="16" height="16" transform="rotate(45 50 17)" />
  </svg>
);

const BlobIcon = () => (
  <svg viewBox="0 0 100 100" className={styles.blobIcon} fill="currentColor">
    <g transform="translate(50, 50)">
      <ellipse cx="0" cy="-25" rx="14" ry="25" />
      <ellipse cx="0" cy="-25" rx="14" ry="25" transform="rotate(72)" />
      <ellipse cx="0" cy="-25" rx="14" ry="25" transform="rotate(144)" />
      <ellipse cx="0" cy="-25" rx="14" ry="25" transform="rotate(216)" />
      <ellipse cx="0" cy="-25" rx="14" ry="25" transform="rotate(288)" />
      <circle cx="0" cy="0" r="15" />
    </g>
  </svg>
);

const AsteriskLogo = () => (
  <svg viewBox="0 0 24 24" className={styles.asteriskLogo} fill="currentColor">
    <circle cx="12" cy="12" r="2" />
    <ellipse cx="12" cy="5" rx="3" ry="5" />
    <ellipse cx="12" cy="19" rx="3" ry="5" />
    <ellipse cx="5" cy="12" rx="5" ry="3" />
    <ellipse cx="19" cy="12" rx="5" ry="3" />
  </svg>
);

const Footer = () => {
  return (
    <footer className={styles.outerContainer}>
      <div className={styles.starWrapper}>
        <StarIcon />
      </div>
      <div className={styles.blobWrapper}>
        <BlobIcon />
      </div>

      <div className={styles.glassCard}>
        {/* Top Row */}
        <div className={styles.topRow}>
          <div className={styles.logoGroup}>
            <AsteriskLogo />
            <span className={styles.nameSmall}>KRITIKA MANDALE</span>
          </div>

          <div className={styles.linksContainer}>
            <div className={styles.linkCol}>
              <a href="#hero">Home</a>
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
            </div>
            <div className={styles.linkCol}>
              <a href="#skills">Skills</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </div>
            <div className={`${styles.linkCol} ${styles.socialsCol}`}>
              <a href="https://github.com/iamkritika" target="_blank" rel="noopener noreferrer">GITHUB</a>
              <a href="https://linkedin.com/in/kritikamandale" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
              <a href="https://twitter.com/kritikamandale" target="_blank" rel="noopener noreferrer">TWITTER</a>
            </div>
          </div>
        </div>

        {/* Big Name Row */}
        <div className={styles.bigNameContainer}>
          <div className={styles.glowBlob}></div>
          <h1 className={styles.bigName}>KRITIKALOG</h1>
          <p className={styles.tagline}>Every project. Every lesson. Catalogued.</p>
        </div>

        {/* Bottom Row */}
        <div className={styles.divider}></div>
        <div className={styles.bottomRow}>
          <span className={styles.copyright}>© {new Date().getFullYear()} Kritikalog All Rights Reserved.</span>
          <span className={styles.legal}>
            <span className={styles.badge}>Available for work</span>
            <span>Privacy Policy</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
