// src/components/Button/Button.jsx
// ============================================================
// BUTTON COMPONENT
// Reusable claymorphic button with primary/ghost variants and
// optional size modifiers. Accepts onClick, href, and icon slot.
// ============================================================

import React from 'react';
import styles from './Button.module.css';

/**
 * @param {object}   props
 * @param {'primary'|'ghost'} [props.variant='primary'] - visual style
 * @param {'sm'|'md'|'lg'}   [props.size='md']          - size preset
 * @param {string}           [props.href]               - renders as <a> if provided
 * @param {Function}         [props.onClick]
 * @param {React.ReactNode}  [props.children]
 * @param {string}           [props.className]          - extra class names
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  className = '',
  ...rest
}) => {
  const classes = [
    styles.btn,
    styles[variant],
    size !== 'md' ? styles[size] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Render as anchor tag when href is provided
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
