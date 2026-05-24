'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/Button/Button';
import useTextScramble from '../../hooks/useTextScramble';

const HERO_NAME = 'Kritika Mandale';

const Hero = ({ revealDone: propRevealDone }) => {
  const [localReveal, setLocalReveal] = useState(false);
  const revealDone = propRevealDone !== undefined ? propRevealDone : localReveal;

  useEffect(() => {
    if (propRevealDone === undefined) {
      const t = setTimeout(() => setLocalReveal(true), 3800);
      return () => clearTimeout(t);
    }
  }, [propRevealDone]);

  const scrambleRef = useTextScramble(HERO_NAME, revealDone);

  return (
    <>
      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(25deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(15deg); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.4; transform: scaleY(0.85); }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <section id="hero" className="h-screen max-h-screen flex items-center pt-20 px-6 pb-8 relative z-10 bg-bg-light dark:bg-bg-dark overflow-hidden">
        {/* ── Dot Background & Faded Mask ── */}
        <div 
          className="absolute inset-0 z-0 opacity-85 bg-[length:32px_32px] bg-[radial-gradient(rgba(58,43,50,0.3)_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(rgba(255,255,255,0.15)_1.2px,transparent_1.2px)]" 
          aria-hidden="true" 
        />
        <div 
          className="absolute inset-0 z-[1] pointer-events-none bg-bg-light dark:bg-bg-dark [mask-image:radial-gradient(ellipse_at_center,transparent_15%,black_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,transparent_15%,black_100%)]" 
          aria-hidden="true" 
        />

        {/* ── Aurora semicircle gradient — rises from bottom edge ── */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[60%] z-[1] pointer-events-none opacity-[0.22] blur-[36px] origin-bottom bg-[radial-gradient(ellipse_120%_100%_at_50%_100%,#fff275_0%,#ff8c42_20%,#ff3c38_42%,#a23e48_64%,transparent_85%)]" 
          aria-hidden="true" 
        />
        <div 
          className="absolute bottom-0 left-0 right-0 h-[55%] z-[1] pointer-events-none opacity-15 blur-[48px] origin-bottom bg-[radial-gradient(ellipse_50%_80%_at_0%_100%,#6699cc_0%,transparent_70%),radial-gradient(ellipse_50%_80%_at_100%_100%,#6699cc_0%,transparent_70%)]" 
          aria-hidden="true" 
        />

        <div className="max-w-[800px] mx-auto w-full flex flex-col items-center text-center relative z-[2]">
          {/* ── Copy ── */}
          <motion.div
            className="flex flex-col items-center gap-6 relative z-[2]"
            initial={{ opacity: 0, y: 40 }}
            animate={revealDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0 }}
          >
            {/* Greeting badge */}
            <div className="inline-flex items-center gap-2 bg-white dark:bg-bg-dark-alt border border-border-light dark:border-border-dark shadow-clay-sm dark:shadow-none rounded-pill px-5 py-2 w-fit font-heading text-sm font-semibold text-brand-mauve dark:text-brand-yellow">
              <span className="inline-block animate-[wave_2s_ease-in-out_infinite] origin-[70%_70%]" aria-hidden="true">👋</span>
              Hi there...
            </div>

            <div className="relative inline-block my-4 px-[clamp(20px,3vw,40px)] py-[clamp(30px,5vw,60px)] z-[2]">
              {/* Scribble squiggle */}
              <svg className="absolute bottom-0 left-[-20px] w-[90px] h-[30px] animate-[floatBadge_5s_ease-in-out_infinite] opacity-80 pointer-events-none" viewBox="0 0 100 30" fill="none" aria-hidden="true">
                <path d="M5,15 C15,5 25,25 35,15 C45,5 55,25 65,15 C75,5 85,25 95,15"
                  stroke="var(--brand-red, #FF3C38)" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>

              <h1
                ref={scrambleRef}
                className="text-[clamp(3.5rem,8vw,12rem)] font-heading font-extrabold leading-[1.05] tracking-[-0.04em] whitespace-nowrap text-center relative z-[2] text-text-primary dark:text-text-dark-primary"
                aria-label={HERO_NAME}
              >
                {HERO_NAME}
              </h1>

              {/* Wavy underline under Kritika */}
              <svg className="absolute bottom-[28px] left-[60px] w-[45%] h-[14px] pointer-events-none z-[2]" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,6 Q5,0 10,6 T20,6 T30,6 T40,6 T50,6 T60,6 T70,6 T80,6 T90,6 T100,6" fill="none" stroke="var(--brand-yellow, #FFF275)" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>

            {/* Role tagline */}
            <p className="text-[clamp(0.875rem,1.2vw,1.125rem)] text-text-secondary dark:text-text-dark-secondary max-w-[clamp(320px,40vw,560px)] leading-[1.6] tracking-[0.01em] mx-auto">
              Full Stack Developer &amp; AI/ML Engineer, building end-to-end intelligent applications.
            </p>
            <p className="text-[14px] text-[#999] tracking-[0.09em] font-normal text-center mt-[-12px] mx-auto">
              Every project. Every lesson. Catalogued.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap justify-center">
              <Button variant="primary" size="lg" href="#projects">
                View My Work ✦
              </Button>
              <Button variant="ghost" size="lg" href="#contact">
                Let's Talk →
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-mauve dark:text-brand-orange text-xs font-medium tracking-[0.1em]"
          aria-hidden="true"
          initial={{ opacity: 0, y: 12 }}
          animate={revealDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.5 }}
        >
          <span>scroll</span>
          <div className="w-[2px] h-[48px] bg-[linear-gradient(to_bottom,var(--brand-red,#FF3C38),transparent)] animate-[scrollPulse_1.5s_ease-in-out_infinite]" />
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
