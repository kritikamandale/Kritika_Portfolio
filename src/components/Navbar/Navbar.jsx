'use client';
// src/components/Navbar/Navbar.jsx
// ============================================================
// NAVBAR COMPONENT
// Floating pill nav with smooth active section detection via
// IntersectionObserver. Includes mobile hamburger menu.
// ============================================================

import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
];

const Navbar = () => {
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenu] = useState(false);
  const [bannerActive, setBannerActive] = useState(false);

  /* ── Banner change event listener ── */
  useEffect(() => {
    const handleBannerChange = (e) => {
      setBannerActive(e.detail.visible);
    };
    window.addEventListener('banner-change', handleBannerChange);
    return () => window.removeEventListener('banner-change', handleBannerChange);
  }, []);

  /* ── Active section detection ── */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
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

  const handleMobileLink = () => {
    setMenu(false);
  };

  return (
    <nav 
      className={`fixed left-1/2 -translate-x-1/2 z-[100] w-max max-w-[calc(100%-2rem)] md:max-w-none md:w-max max-md:w-[calc(100%-2rem)] transition-all duration-300 ${bannerActive ? 'top-[76px] md:top-[72px]' : 'top-8'}`} 
      aria-label="Primary navigation"
    >
      <div className="flex items-center justify-between gap-6 px-3.75 py-10px bg-navbar-light dark:bg-navbar-dark backdrop-blur-md rounded-pill shadow-navbar dark:shadow-none border border-border-light dark:border-border-dark">
        {/* Logo */}
        <a href="#hero" className="font-heading text-15 font-bold text-text-primary dark:text-text-dark-primary tracking-[-0.02em] flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-md">
          ✦ <span className="text-brand-orange">kritikalog</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = active === href.slice(1);
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`
                    text-13 px-14px py-1.5 rounded-pill transition-colors duration-250 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange
                    ${isActive 
                      ? 'text-brand-red bg-brand-orange/15 font-semibold' 
                      : 'font-medium text-text-secondary dark:text-text-dark-secondary hover:text-brand-red hover:bg-brand-orange/10'
                    }
                  `}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            href="/Kritika_Resume.pdf"
            download="Kritika_Mandale_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            Resume ↗
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          className={`
            md:hidden flex flex-col gap-[5px] cursor-pointer p-2 rounded-md transition-colors duration-250 hover:bg-brand-orange/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange
          `}
          onClick={() => setMenu((p) => !p)}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-[22px] h-[2px] bg-brand-mauve rounded-sm transition-all duration-250 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-brand-mauve rounded-sm transition-all duration-250 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-brand-mauve rounded-sm transition-all duration-250 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        id="mobile-menu"
        className={`
          ${menuOpen ? 'flex' : 'hidden'}
          absolute top-[calc(100%+0.5rem)] left-0 right-0 
          bg-white/98 dark:bg-bg-dark/98 backdrop-blur-md rounded-xl 
          shadow-clay dark:shadow-none p-4 flex-col gap-1 
          border border-border-light dark:border-border-dark
        `}
        role="menu"
      >
        <div className="flex justify-end mb-2">
          <ThemeToggle />
        </div>
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = active === href.slice(1);
          return (
            <a
              key={href}
              href={href}
              className={`
                text-base px-4 py-3 rounded-lg transition-colors duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange
                ${isActive
                  ? 'text-brand-red bg-brand-orange/10 font-semibold'
                  : 'font-medium text-text-secondary dark:text-text-dark-secondary hover:text-brand-red hover:bg-brand-orange/10'
                }
              `}
              onClick={handleMobileLink}
              role="menuitem"
            >
              {label}
            </a>
          );
        })}
        <div className="mt-2 pt-2 border-t border-border-light dark:border-border-dark">
          <Button
            variant="ghost"
            size="sm"
            href="/Kritika_Resume.pdf"
            download="Kritika_Mandale_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full justify-center"
          >
            Resume ↗
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
