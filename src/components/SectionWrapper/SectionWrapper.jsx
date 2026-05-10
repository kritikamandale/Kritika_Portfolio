// src/components/SectionWrapper/SectionWrapper.jsx
// ============================================================
// SECTION WRAPPER
// Provides consistent padding, max-width centering, and an
// optional section header (label + title + subtitle).
// Also applies the scroll-reveal class to its children.
// ============================================================

import React from 'react';
import styles from './SectionWrapper.module.css';

const HeadingStar = () => (
  <svg viewBox="0 0 100 100" className="heading-star" fill="currentColor">
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

/**
 * @param {string}           props.id           - HTML id for nav linking
 * @param {string}           [props.label]      - small eyebrow label
 * @param {string}           [props.title]      - section heading
 * @param {string}           [props.subtitle]   - supporting paragraph
 * @param {boolean}          [props.alt]        - alternate bg tint
 * @param {'center'|'left'}  [props.align='center']
 * @param {React.ReactNode}  props.children
 */
const SectionWrapper = ({
  id,
  label,
  title,
  subtitle,
  alt = false,
  align = 'center',
  maxWidth,
  children,
}) => {
  return (
    <section
      id={id}
      className={[styles.section, alt ? styles.alt : ''].filter(Boolean).join(' ')}
    >
      <div className={styles.inner} style={maxWidth ? { maxWidth } : {}}>
        {/* Section header block */}
        {(label || title || subtitle) && (
          <div
            className={[
              styles.header,
              align === 'left' ? styles.left : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {label && (
              <span className="section-label">{label}</span>
            )}
            {title && (
              <h2 className="section-title">
                {title}
                <HeadingStar />
              </h2>
            )}
            {subtitle && (
              <p className="section-subtitle">{subtitle}</p>
            )}
          </div>
        )}

        {/* Section body content */}
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
