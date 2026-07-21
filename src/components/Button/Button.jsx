'use client';
import React from 'react';
import useMagnetic from '../../hooks/useMagnetic';

/**
 * @param {object}                props
 * @param {'primary'|'secondary'|'ghost'} [props.variant='primary']
 * @param {'sm'|'base'|'lg'}      [props.size='base']
 * @param {string}                [props.href]
 * @param {Function}              [props.onClick]
 * @param {React.ReactNode}       [props.children]
 * @param {string}                [props.className]
 */
const Button = ({
  variant = 'primary',
  size = 'base',
  href,
  onClick,
  children,
  className = '',
  ...rest
}) => {
  const magneticRef = useMagnetic();

  const baseClasses = "inline-flex items-center gap-2 rounded-pill font-medium tracking-widest uppercase transition-all duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer group relative overflow-hidden";
  
  const variantClasses = {
    primary: "bg-accent text-white hover:-translate-y-0.5 hover:opacity-90",
    secondary: "bg-transparent text-text-primary dark:text-text-dark-primary border border-border-light dark:border-border-dark hover:border-accent hover:text-accent hover:-translate-y-0.5",
    ghost: "bg-transparent border-[1.5px] border-accent/40 text-text-primary dark:text-text-dark-primary hover:bg-accent/8 hover:border-accent hover:text-accent hover:-translate-y-0.5"
  };

  const sizeClasses = {
    sm: "px-4 py-1.5 text-xs",
    base: "px-9 py-3.5 text-sm",
    lg: "px-8 py-3 text-md",
  };

  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.base,
    className,
  ].filter(Boolean).join(' ');

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {variant === 'primary' && (
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
        )}
      </span>
      {/* Shine shimmer sweep on hover */}
      <div className="absolute inset-y-0 -left-full w-[60%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-[left] duration-500 ease-smooth pointer-events-none group-hover:left-[150%]"></div>
    </>
  );

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
