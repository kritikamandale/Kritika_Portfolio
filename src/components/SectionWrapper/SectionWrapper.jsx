// src/components/SectionWrapper/SectionWrapper.jsx
// ============================================================
// SECTION WRAPPER
// Provides consistent padding, max-width centering, and an
// optional section header (label + title + subtitle).
// Also applies the scroll-reveal class to its children.
// ============================================================

import React from 'react';

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
      className={`
        w-full
        py-20 md:py-16 sm:py-10
        transition-colors duration-400
        ${alt ? 'bg-surface-2-light dark:bg-surface-2-dark' : 'bg-bg-light dark:bg-bg-dark'}
      `}
    >
      <div 
        className="max-w-6xl mx-auto px-6 md:px-8 w-full"
        style={maxWidth ? { maxWidth } : {}}
      >
        {/* Section header block */}
        {(label || title || subtitle) && (
          <div
            className={`
              mb-16 flex flex-col
              ${align === 'left' ? 'text-left items-start' : 'text-center items-center'}
            `}
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
