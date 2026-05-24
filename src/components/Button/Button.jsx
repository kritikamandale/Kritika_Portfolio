// src/components/Button/Button.jsx
// ============================================================
// BUTTON COMPONENT
// Two variants: primary (filled accent) and secondary (outline).
// Primary auto-appends an animated → arrow span.
// Renders as <a> when href is supplied.
// Magnetic attraction effect on primary + ghost variants.
// ============================================================

import React from 'react';
import useMagnetic from '../../hooks/useMagnetic';
import styles from './Button.module.css';

/**
 * @param {object}                props
 * @param {'primary'|'secondary'|'ghost'} [props.variant='primary']
 * @param {string}                [props.href]
 * @param {Function}              [props.onClick]
 * @param {React.ReactNode}       [props.children]
 * @param {string}                [props.className]
 */
const Button = ({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  ...rest
}) => {
  const magneticRef = useMagnetic();

  const classes = [
    styles.btn,
    styles[variant] ?? styles.primary,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      {children}
      {variant === 'primary' && (
        <span className={styles.arrow} aria-hidden="true">→</span>
      )}
    </>
  );

  // Apply magnetic ref only on primary and ghost (CTA buttons)
  const isMagnetic = variant === 'primary' || variant === 'ghost';

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        data-hover="true"
        ref={isMagnetic ? magneticRef : undefined}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      data-hover="true"
      ref={isMagnetic ? magneticRef : undefined}
      {...rest}
    >
      {inner}
    </button>
  );
};

export default Button;
