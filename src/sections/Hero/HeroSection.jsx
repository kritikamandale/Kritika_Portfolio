'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import Image from 'next/image';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubOutlineIcon, LinkedinIcon } from '../../components/Icons/BrandIcons';

/* ── Data ─────────────────────────────────────────────────── */
const SOCIAL_LINKS = [
  { icon: GithubOutlineIcon, href: 'https://github.com/kritikamandale', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/in/kritikamandale', label: 'LinkedIn' },
  { icon: Mail, href: '#contact', label: 'Email' },
];


/* ════════════════════════════════════════════════════════════
   INTERACTIVE GLOWING GRID COMPONENT
   ════════════════════════════════════════════════════════════ */
const InteractiveGlowingGrid = ({ heroRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const heroEl = heroRef.current;
    if (!container || !heroEl) return;

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#B02618';

    const spacing = 36;
    let cells = [];
    let cols = 0;
    let rows = 0;

    const createGrid = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const newCols = Math.ceil(width / spacing);
      const newRows = Math.ceil(height / spacing);

      if (cols === newCols && rows === newRows) return;
      
      cols = newCols;
      rows = newRows;
      container.innerHTML = '';
      cells = [];

      container.style.display = 'grid';
      container.style.gridTemplateColumns = `repeat(${cols}, ${spacing}px)`;
      container.style.gridTemplateRows = `repeat(${rows}, ${spacing}px)`;

      for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement('div');
        
        // Centered at top-left to perfectly overlap the linear-gradient intersections
        cell.style.background = `radial-gradient(circle at top left, var(--glow-color, ${accentColor}) 0%, transparent 70%)`;
        cell.style.setProperty('--glow-opacity', '0');
        cell.style.opacity = 'var(--glow-opacity)';
        cell.style.transition = 'opacity 0.15s ease, filter 0.15s ease';
        cell.style.willChange = 'opacity';
        
        const c = i % cols;
        const r = Math.floor(i / cols);
        const cx = c * spacing;
        const cy = r * spacing;

        cells.push({ el: cell, cx, cy });
        container.appendChild(cell);
      }
    };

    createGrid();
    window.addEventListener('resize', createGrid);

    let rafPending = false;
    const radius = 120;

    const handleMouseMove = (e) => {
      if (rafPending) return;
      rafPending = true;

      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        cells.forEach(cell => {
          const dx = cell.cx - mouseX;
          const dy = cell.cy - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            let opacity = 0.75 * (1 - dist / radius);
            cell.el.style.transition = 'opacity 0.15s ease, filter 0.15s ease';
            cell.el.style.setProperty('--glow-opacity', opacity.toFixed(3));
          } else {
            cell.el.style.transition = 'opacity 0.15s ease, filter 0.15s ease';
            cell.el.style.setProperty('--glow-opacity', '0');
          }
        });

        rafPending = false;
      });
    };

    const handleMouseLeave = () => {
      requestAnimationFrame(() => {
        cells.forEach(cell => {
          cell.el.style.transition = 'opacity 0.3s ease, filter 0.3s ease';
          cell.el.style.setProperty('--glow-opacity', '0');
        });
      });
    };

    heroEl.addEventListener('mousemove', handleMouseMove);
    heroEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', createGrid);
      heroEl.removeEventListener('mousemove', handleMouseMove);
      heroEl.removeEventListener('mouseleave', handleMouseLeave);
      container.innerHTML = '';
    };
  }, [heroRef]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

/* ════════════════════════════════════════════════════════════
   HERO SECTION COMPONENT
   ════════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const arcRef = useRef(null);
  const photoRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const rightColRef = useRef(null);
  const scrollCueRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  /* ── Detect mobile for graceful degradation ── */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* ── GSAP ScrollTrigger animation ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const arcCircle = arcRef.current;
      const photo = photoRef.current;
      const ctaBtn = ctaBtnRef.current;
      const scrollCue = scrollCueRef.current;

      if (!arcCircle || !photo || !ctaBtn) return;

      // Get the SVG circle's circumference for stroke animation
      const circumference = arcCircle.getTotalLength();
      // Arc covers 70% of the circle (greater than semi, not full)
      // Start with ~8% visible at the top, animate to 70%
      const arcGap = circumference * 0.30; // 30% always hidden
      gsap.set(arcCircle, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference * 0.92, // nearly invisible — tiny hint at top
      });

      // Photo starts hidden
      gsap.set(photo, { opacity: 0, scale: 0.5 });
      // CTA button starts hidden
      gsap.set(ctaBtn, { opacity: 0, scale: 0.6 });

      if (isMobile) {
        // ── MOBILE: simpler fade-in, no pin ──
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(arcCircle, { strokeDashoffset: arcGap, duration: 1.2, ease: 'power2.out' });
            gsap.to(photo, { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: 'back.out(1.7)' });
            gsap.to(ctaBtn, { opacity: 1, scale: 1, duration: 0.6, delay: 0.6, ease: 'back.out(1.7)' });
          },
          once: true,
        });
      } else {
        // ── DESKTOP: Full pinned scrub animation ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=300%', // 3 viewport scrolls: ~2 for animation, ~1 for pause
            pin: pinRef.current,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        // ─── Scroll cue fades out immediately ───
        tl.to(scrollCue, {
          opacity: 0,
          y: 20,
          ease: 'power2.in',
          duration: 0.15,
        }, 0);

        // ─── ARC TRACE (0% → 50%): Arc color draws from top to Let's Talk endpoint ───
        tl.to(arcCircle, {
          strokeDashoffset: arcGap,
          ease: 'none',
          duration: 1,
        }, 0);

        // ─── PHOTO REVEAL (15% → 55%): Image appears while arc is drawing ───
        tl.to(photo, {
          opacity: 1,
          scale: 1,
          ease: 'power3.out',
          duration: 0.6,
        }, 0.15);

        // ─── CTA REVEAL (50% → 75%): "Let's Talk" appears once arc reaches its endpoint ───
        tl.to(ctaBtn, {
          opacity: 1,
          scale: 1,
          ease: 'back.out(1.7)',
          duration: 0.5,
        }, 0.5);

        // Removed RIGHT COL DIM to keep name opaque

        // ─── PAUSE SPACER: ~1 viewport scroll of pinned dead time before unpinning ───
        // All animations complete by ~1.0. This empty tween extends the timeline
        // so the section stays pinned for one additional scroll-worth with nothing changing.
        tl.to({}, { duration: 1 }, 1.0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  /* ── SVG arc parameters ── */
  const svgSize = isMobile ? 320 : 500;
  const circleR = isMobile ? 135 : 220;
  const circleCx = svgSize / 2;
  const circleCy = svgSize / 2;

  // The arc traces 70% of the circle starting from the top (12 o'clock) clockwise.
  // Endpoint is at 252° clockwise from top (≈ 8 o'clock, lower-left).
  // Screen coords: x = cx + r·sin(θ), y = cy − r·cos(θ)  (θ clockwise from top)
  const endAngleRad = (252 * Math.PI) / 180;
  const ctaX = circleCx + circleR * Math.sin(endAngleRad);
  const ctaY = circleCy - circleR * Math.cos(endAngleRad);
  
  const ctaXPercent = (ctaX / svgSize) * 100;
  const ctaYPercent = (ctaY / svgSize) * 100;

  // Helper to dynamically draw a perfectly smooth tapered crescent along the arc
  const getTaperedPath = () => {
    const startAngle = 0;
    const endAngle = 252;
    const startW = isMobile ? 18 : 28; // wider at start (top)
    const endW = isMobile ? 4 : 6;     // thinner at end (let's talk)
    const segments = 120; // high poly count for perfect smoothness
    
    const pointsOuter = [];
    const pointsInner = [];
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = startAngle + t * (endAngle - startAngle);
      const width = startW + t * (endW - startW);
      
      const rad = (angle * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      
      const ox = circleCx + (circleR + width / 2) * cos;
      const oy = circleCy + (circleR + width / 2) * sin;
      const ix = circleCx + (circleR - width / 2) * cos;
      const iy = circleCy + (circleR - width / 2) * sin;
      
      pointsOuter.push({ x: ox.toFixed(2), y: oy.toFixed(2) });
      pointsInner.push({ x: ix.toFixed(2), y: iy.toFixed(2) });
    }
    
    let d = `M ${pointsOuter[0].x} ${pointsOuter[0].y} `;
    for (let i = 1; i <= segments; i++) {
      d += `L ${pointsOuter[i].x} ${pointsOuter[i].y} `;
    }
    
    const endCapR = (endW / 2).toFixed(2);
    d += `A ${endCapR} ${endCapR} 0 0 1 ${pointsInner[segments].x} ${pointsInner[segments].y} `;
    
    for (let i = segments - 1; i >= 0; i--) {
      d += `L ${pointsInner[i].x} ${pointsInner[i].y} `;
    }
    
    const startCapR = (startW / 2).toFixed(2);
    d += `A ${startCapR} ${startCapR} 0 0 1 ${pointsOuter[0].x} ${pointsOuter[0].y} `;
    d += "Z";
    
    return d;
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full bg-bg-light dark:bg-bg-dark"
      style={{ minHeight: isMobile ? '100vh' : 'auto' }}
    >
      <div
        ref={pinRef}
        className="relative w-full min-h-screen flex flex-col overflow-hidden"
      >
        {/* ── Background animated grid ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(58, 36, 24, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(58, 36, 24, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
        >
          <InteractiveGlowingGrid heroRef={sectionRef} />
        </motion.div>

        {/* ── Background ambient glow ── */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-[#F5DE8F]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] bg-gradient-to-tl from-[#B02618]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* ════════════════════════════════════════════════════════
            MAIN CONTENT GRID
            Left: Circle + Photo + CTA
            Right: Name + Tagline + Social + Nav
            ════════════════════════════════════════════════════════ */}
        <div className="relative flex-1 flex flex-col-reverse md:flex-row items-center justify-center gap-6 md:gap-4 lg:gap-6 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-20 pb-28 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28">


          {/* ─────────────────────────────────────────────────────
              LEFT COLUMN — Circle Arc + Photo + Let's Talk
              ───────────────────────────────────────────────────── */}
          <div className="relative flex items-center justify-center w-full md:w-[50%] lg:w-[50%]" style={{ marginTop: '-40px' }}>
            <div className="relative w-full" style={{ width: svgSize, height: svgSize, maxWidth: '100%', maxHeight: '85vh' }}>

              {/* SVG Arc / Circle */}
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${svgSize} ${svgSize}`}
                className="absolute inset-0 z-10"
                style={{ transform: 'rotate(-90deg)' }}
              >
                {/* Faint background ring */}
                <circle
                  cx={circleCx}
                  cy={circleCy}
                  r={circleR}
                  fill="none"
                  stroke="rgba(58, 36, 24, 0.12)"
                  strokeWidth="8"
                />
                {/* Mask for the animated tapered arc */}
                <mask id="heroArcMask">
                  <circle
                    ref={arcRef}
                    cx={circleCx}
                    cy={circleCy}
                    r={circleR}
                    fill="none"
                    stroke="white"
                    strokeWidth="40"
                    strokeLinecap="round"
                  />
                </mask>
                {/* Tapered animated coral arc */}
                <path
                  d={getTaperedPath()}
                  fill="url(#heroArcGradient)"
                  mask="url(#heroArcMask)"
                />
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="heroArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B02618" />
                    <stop offset="100%" stopColor="#F5DE8F" />
                  </linearGradient>
                  {/* Circular clip for the photo */}
                  <clipPath id="heroPhotoClip">
                    <circle cx={circleCx} cy={circleCy} r={circleR - 16} />
                  </clipPath>
                </defs>
              </svg>

              {/* Profile Photo — masked inside the circle */}
              <div
                ref={photoRef}
                className="absolute inset-0 z-0"
                style={{ clipPath: `circle(${circleR - 16}px at ${circleCx}px ${circleCy}px)` }}
              >
                <Image
                  src="/profile.webp"
                  alt="Kritika Mandale"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 340px, 620px"
                  priority
                />
                {/* Subtle warm overlay for brand tone */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#B02618]/5 to-[#F5DE8F]/5 pointer-events-none" />
              </div>

              {/* "Let's talk" CTA — positioned at the arc endpoint */}
              <a
                ref={ctaBtnRef}
                href="#contact"
                className="absolute z-30 flex items-center gap-2 px-6 py-3 rounded-full bg-[#B02618] hover:bg-[#8A1C10] text-white text-sm md:text-base font-bold tracking-wide shadow-[0_4px_16px_rgba(176,38,24,0.35)] hover:shadow-[0_8px_28px_rgba(176,38,24,0.5)] hover:scale-105 transition-all duration-300 whitespace-nowrap"
                style={{
                  left: `${ctaXPercent}%`,
                  top: `${ctaYPercent}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                Let&apos;s talk
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>

              {/* Subtle glow behind the circle (visible after photo appears) */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: circleR * 2 + 40,
                  height: circleR * 2 + 40,
                  left: circleCx - circleR - 20,
                  top: circleCy - circleR - 20,
                  background: 'radial-gradient(circle, rgba(176,38,24,0.08) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  zIndex: -1,
                }}
              />
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────
              RIGHT COLUMN — Name, Tagline, Social Icons, Nav
              ───────────────────────────────────────────────────── */}
          <div
            ref={rightColRef}
            className="flex flex-col items-center md:items-end gap-5 md:gap-6 w-full md:w-[50%] lg:w-[48%] text-center md:text-right"
          >
            {/* 1. Name / Greeting */}
            <div>
              <p className="text-[#8A6858] text-lg md:text-xl font-semibold tracking-widest uppercase mb-2">Welcome</p>
              <h1 className="font-heading font-bold tracking-tight text-[#3A2418] flex flex-col items-center md:items-end">
                <span
                  className="leading-none mb-1"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  Hey, it&apos;s
                </span>
                <span
                  className="name-yeseva bg-gradient-to-r from-[#B02618] to-[#3A2418] bg-clip-text text-transparent leading-[1.05]"
                  style={{ fontSize: 'clamp(3rem, 7.5vw, 5.5rem)' }}
                >
                  Kritika Mandale
                </span>
              </h1>
            </div>

            {/* 2. Tagline & Resume */}
            <div className="flex flex-col items-center md:items-end gap-5">
              <p className="text-[#5C3D2C] text-lg md:text-xl font-medium tracking-wide max-w-md">
                Web and AI developer
              </p>
              <a
                href="/Kritika_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full border-2 border-[#B02618]/30 text-[#B02618] font-bold text-[15px] hover:bg-[#B02618] hover:text-white hover:border-[#B02618] transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                View Resume ↗
              </a>
            </div>

            {/* 3. Social Icons */}
            <div className="flex items-center gap-3.5">
              {SOCIAL_LINKS.map((social, i) => {
                const isInternal = social.href.startsWith('#');
                return (
                  <a
                    key={i}
                    href={social.href}
                    target={isInternal ? undefined : '_blank'}
                    rel={isInternal ? undefined : 'noopener noreferrer'}
                    aria-label={social.label}
                    className="w-14 h-14 rounded-full border border-[#B02618]/15 flex items-center justify-center text-[#3A2418] hover:text-[#B02618] hover:border-[#B02618]/40 hover:bg-[#B02618]/5 transition-all duration-300"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>

          </div>
        </div>



        {/* ── Scroll Cue ── */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        >
          <span className="text-[#8A6858] text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-[#3A2418]/20 flex justify-center pt-1.5">
            <div className="w-1 h-1.5 rounded-full bg-[#B02618]/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
