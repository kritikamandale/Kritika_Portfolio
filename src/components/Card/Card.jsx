// src/components/Card/Card.jsx
// ============================================================
// CARD COMPONENT
// Base claymorphic surface. Used across Skills, Projects, and
// Experience sections. Accepts accent color and bg variant.
// ============================================================

import React from 'react';
import styles from './Card.module.css';

/**
 * @param {object}  props
 * @param {'purple'|'blue'|'pink'|'mint'|'yellow'} [props.accent]
 *   - adds a colored top-border strip
 * @param {'purple'|'blue'|'pink'|'mint'}           [props.bg]
 *   - subtle tinted background gradient
 * @param {string}          [props.className] - extra classes
 * @param {React.ReactNode} props.children
 */
const Card = ({ accent, bg, className = '', children, ...rest }) => {
  const classes = [
    styles.card,
    accent ? styles[`accent-${accent}`] : '',
    bg ? styles[`bg-${bg}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default Card;
