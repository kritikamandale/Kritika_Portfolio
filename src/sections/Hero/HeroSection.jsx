'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import Image from 'next/image';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ── Icon components (inline SVG for social links) ───────── */
const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.3 5.3 0 0 0 19 4.5a5.2 5.2 0 0 0-.5-4.5s-1.5-.5-4.5 1.5a14.2 14.2 0 0 0-8 0c-3-2-4.5-1.5-4.5-1.5a5.2 5.2 0 0 0-.5 4.5 5.3 5.3 0 0 0 1.5 3.3c0 5.77 3.34 6.79 6.5 7.17A4.8 4.8 0 0 0 8 18v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);
const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwitterIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const TelegramIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z"/>
    <path d="M22 2 11 13"/>
  </svg>
);
const HashnodeIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m22.351 8.019-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z"/>
  </svg>
);

/* ── Data ─────────────────────────────────────────────────── */
const SOCIAL_LINKS = [
  { icon: GithubIcon, href: 'https://github.com/kritikamandale', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/in/kritikamandale', label: 'LinkedIn' },
  { icon: TwitterIcon, href: 'https://twitter.com/kritikamandale', label: 'Twitter' },
  { icon: TelegramIcon, href: 'https://t.me/Kritikalog', label: 'Telegram' },
  { icon: HashnodeIcon, href: 'https://hashnode.com/@kritikam', label: 'Hashnode' },
  { icon: Mail, href: 'mailto:kritikamandale@gmail.com', label: 'Email' },
];

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Certificates', href: '#certificates' },
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

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#FF8C42';

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
  const svgSize = isMobile ? 340 : 620;
  const circleR = isMobile ? 145 : 270;
  const circleCx = svgSize / 2;
  const circleCy = svgSize / 2;

  // The arc traces 70% of the circle starting from the top (12 o'clock) clockwise.
  // Endpoint is at 252° clockwise from top (≈ 8 o'clock, lower-left).
  // Screen coords: x = cx + r·sin(θ), y = cy − r·cos(θ)  (θ clockwise from top)
  const endAngleRad = (252 * Math.PI) / 180;
  const ctaX = circleCx + circleR * Math.sin(endAngleRad);  // ≈ 28
  const ctaY = circleCy - circleR * Math.cos(endAngleRad);  // ≈ 229

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
      className="relative w-full bg-[#FCFBFA]"
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
              linear-gradient(to right, rgba(58, 43, 50, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(58, 43, 50, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
        >
          <InteractiveGlowingGrid heroRef={sectionRef} />
        </motion.div>

        {/* ── Background ambient glow ── */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-[#E6B45B]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] bg-gradient-to-tl from-[#C9513D]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* ════════════════════════════════════════════════════════
            MAIN CONTENT GRID
            Left: Circle + Photo + CTA
            Right: Name + Tagline + Social + Nav
            ════════════════════════════════════════════════════════ */}
        <div className="relative flex-1 flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-8 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-28 md:pt-28 md:pb-32 lg:pt-32">


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
                  stroke="#ede8e2"
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
                    <stop offset="0%" stopColor="#C9513D" />
                    <stop offset="100%" stopColor="#E6B45B" />
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9513D]/5 to-[#E6B45B]/5 pointer-events-none" />
              </div>

              {/* "Let's talk" CTA — positioned at the arc endpoint */}
              <a
                ref={ctaBtnRef}
                href="#contact"
                className="absolute z-30 flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#C9513D] to-[#E6B45B] text-white text-sm md:text-base font-bold tracking-wide shadow-[0_4px_16px_rgba(201,81,61,0.35)] hover:shadow-[0_8px_28px_rgba(201,81,61,0.5)] hover:scale-105 transition-all duration-300 whitespace-nowrap"
                style={{
                  left: `${ctaX}px`,
                  top: `${ctaY}px`,
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
                  background: 'radial-gradient(circle, rgba(201,81,61,0.08) 0%, transparent 70%)',
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
            className="flex flex-col items-center md:items-end gap-6 md:gap-8 w-full md:w-[50%] lg:w-[48%] text-center md:text-right"
          >
            {/* 1. Name / Greeting */}
            <div>
              <p className="text-[#9D8F96] text-lg md:text-xl font-semibold tracking-widest uppercase mb-3">Welcome</p>
              <h1 className="font-heading font-extrabold tracking-tight text-[#3A2B32] flex flex-col items-center md:items-end">
                <span 
                  className="leading-none mb-1" 
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                >
                  Hey, it&apos;s
                </span>
                <span 
                  className="bg-gradient-to-r from-[#C9513D] to-[#E6B45B] bg-clip-text text-transparent leading-[1.05]"
                  style={{ fontSize: 'clamp(4rem, 9vw, 6.5rem)' }}
                >
                  Kritika Mandale
                </span>
              </h1>
            </div>

            {/* 2. Tagline & Resume */}
            <div className="flex flex-col items-center md:items-end gap-5">
              <p className="text-[#6B5B63] text-lg md:text-xl font-medium tracking-wide max-w-md">
                Web Developer &amp; AI/ML Integration
              </p>
              <a
                href="/Kritika_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full border-2 border-[#C9513D]/30 text-[#C9513D] font-bold text-[15px] hover:bg-[#C9513D] hover:text-white hover:border-[#C9513D] transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                View Resume ↗
              </a>
            </div>

            {/* 3. Social Icons */}
            <div className="flex items-center gap-3.5">
              {SOCIAL_LINKS.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-14 h-14 rounded-full border border-[#A23E48]/15 flex items-center justify-center text-[#3A2B32] hover:text-[#C9513D] hover:border-[#C9513D]/40 hover:bg-[#C9513D]/5 transition-all duration-300"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>

          </div>
        </div>



        {/* ── Scroll Cue ── */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        >
          <span className="text-[#9D8F96] text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-[#3A2B32]/20 flex justify-center pt-1.5">
            <div className="w-1 h-1.5 rounded-full bg-[#C9513D]/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
