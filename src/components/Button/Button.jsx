// src/components/Button/Button.jsx
// ============================================================
// BUTTON COMPONENT
// Two variants: primary (filled accent) and secondary (outline).
// Primary auto-appends an animated → arrow span.
// Renders as <a> when href is supplied.
// ============================================================

import React from 'react';
import styles from './Button.module.css';

/**
 * @param {object}                props
 * @param {'primary'|'secondary'} [props.variant='primary']
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

  if (href) {
    return (
      <a href={href} className={classes} data-hover="true" {...rest}>
        {inner}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} data-hover="true" {...rest}>
      {inner}
    </button>
  );
};

export default Button;
