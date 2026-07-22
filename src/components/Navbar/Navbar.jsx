'use client';
// src/components/Navbar/Navbar.jsx
// ============================================================
// NAVBAR COMPONENT
// Floating pill nav with smooth active section detection via
// IntersectionObserver. Includes mobile hamburger menu.
// ============================================================

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Button from '../Button/Button';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Mindset', href: '/mindset', route: true },
];

const Navbar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Route-based links (e.g. /mindset) navigate to a real page; hash links
  // (e.g. #hero) scroll within the homepage. When we're not on the homepage,
  // hash links need a leading "/" so they navigate back home first.
  const resolveHref = (href) => (href.startsWith('#') && pathname !== '/' ? `/${href}` : href);
  const isLinkActive = (link) => (link.route ? pathname === link.href : active === link.href.slice(1));

  /* ── Hover top space detection ── */
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Re-show navbar if mouse is within bottom 120px
      if (window.innerHeight - e.clientY < 120) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* ── Active section detection ── */
  useEffect(() => {
    // Old browsers without IntersectionObserver: skip active-link tracking
    // rather than throwing — the nav itself still works fine without it.
    if (typeof IntersectionObserver === 'undefined') return;

    const sectionIds = NAV_LINKS.filter((l) => !l.route).map((l) => l.href.slice(1));

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

  const isVisible = active === 'hero' || isHovered || menuOpen;

  return (
    <nav 
      className={`fixed left-1/2 -translate-x-1/2 z-[100] w-max max-w-[calc(100%-2rem)] md:max-w-none md:w-max max-md:w-[calc(100%-2rem)] transition-all duration-500 ease-out bottom-8
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0 pointer-events-none'}`} 
      aria-label="Primary navigation"
    >
      <div className="flex items-center justify-between gap-6 px-6 py-2.5 bg-gradient-to-r from-[#B02618] to-[#8A1C10] backdrop-blur-md rounded-full shadow-lg border-none">
        {/* Logo */}
        <a href={resolveHref('#hero')} className="font-heading text-15 font-bold text-white tracking-[-0.02em] flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md">
          ✦ <span>kritikalog</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => {
            const { label, href } = link;
            const isActive = isLinkActive(link);
            return (
              <li key={href}>
                <a
                  href={resolveHref(href)}
                  className={`
                    text-13 px-4 py-1.5 rounded-full transition-colors duration-250 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                    ${isActive 
                      ? 'text-white bg-white/20 font-bold' 
                      : 'font-semibold text-white/90 hover:text-white hover:bg-white/20'
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
          <div className="w-[1px] h-5 bg-white/30 shrink-0 mx-1" />
          <a
            href="/Kritika_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] whitespace-nowrap px-4 py-1.5 rounded-full font-bold border border-white/40 text-white hover:bg-white/20 transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`
            md:hidden flex flex-col gap-[5px] cursor-pointer p-2 rounded-md transition-colors duration-250 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
          `}
          onClick={() => setMenu((p) => !p)}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-[22px] h-[2px] bg-white rounded-sm transition-all duration-250 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-white rounded-sm transition-all duration-250 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-white rounded-sm transition-all duration-250 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown menu (opens UPWARDS) */}
      <div
        id="mobile-menu"
        className={`
          ${menuOpen ? 'flex' : 'hidden'}
          absolute bottom-[calc(100%+0.5rem)] left-0 right-0 
          bg-white/98 dark:bg-bg-dark/98 backdrop-blur-md rounded-xl 
          shadow-clay dark:shadow-none p-4 flex-col gap-1 
          border border-border-light dark:border-border-dark
          max-h-[60vh] overflow-y-auto
        `}
        role="menu"
      >
        {NAV_LINKS.map((link) => {
          const { label, href } = link;
          const isActive = isLinkActive(link);
          return (
            <a
              key={href}
              href={resolveHref(href)}
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
