// src/components/Navbar/Navbar.jsx
// ============================================================
// NAVBAR COMPONENT
// Floating pill nav with smooth active section detection via
// IntersectionObserver. Includes mobile hamburger menu.
// ============================================================

import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Skills', href: '#skills' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenu] = useState(false);

  /* ── Active section detection ── */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));

    // Use a single observer for better performance and consistency
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      // rootMargin helps trigger active state when section is near center of viewport
      // threshold: 0.1 ensures tall sections still trigger
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Close mobile menu on resize ── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenu(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMobileLink = (href) => {
    setMenu(false);
    // Smooth scroll
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={styles.navbar} aria-label="Primary navigation">
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#hero" className={styles.logo}>
          ✦ <span>kritikalog</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={[
                  styles.link,
                  active === href.slice(1) ? styles.active : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className={styles.navCta}>
          <Button
            variant="ghost"
            size="sm"
            href="/Kritika_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume ↗
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={[styles.hamburger, menuOpen ? styles.open : '']
            .filter(Boolean)
            .join(' ')}
          onClick={() => setMenu((p) => !p)}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={[styles.mobileMenu, menuOpen ? styles.open : '']
          .filter(Boolean)
          .join(' ')}
        role="menu"
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className={[
              styles.mobileLink,
              active === href.slice(1) ? styles.active : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => handleMobileLink(href)}
            role="menuitem"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
