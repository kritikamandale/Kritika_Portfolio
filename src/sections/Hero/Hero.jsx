'use client';
// src/sections/Hero/Hero.jsx
// ============================================================
// HERO SECTION
// Full-viewport landing. Centered name, tagline, CTA buttons, stats.
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/Button/Button';
import useTextScramble from '../../hooks/useTextScramble';
import styles from './Hero.module.css';

const HERO_NAME = 'Kritika Mandale';

const Hero = ({ revealDone }) => {
  // Scramble the name when the hero reveals
  const scrambleRef = useTextScramble(HERO_NAME, revealDone);

  return (
    <section id="hero" className={styles.hero}>
      {/* ── Dot Background & Faded Mask ── */}
      <div className={styles.dotBackground} aria-hidden="true" />
      <div className={styles.dotMask} aria-hidden="true" />

      {/* ── Aurora semicircle gradient — rises from bottom edge ── */}
      <div className={styles.heroAurora} aria-hidden="true" />
      <div className={styles.heroAuroraEdge} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ── Copy ── */}
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 40 }}
          animate={revealDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0 }}
        >

          {/* Greeting badge */}
          <div className={styles.greeting}>
            <span className={styles.wave} aria-hidden="true">👋</span>
            Hi there...
          </div>

          <div className={styles.nameWrap}>

            {/* Scribble squiggle */}
            <svg className={styles.doodle4} viewBox="0 0 100 30" fill="none" aria-hidden="true">
              <path d="M5,15 C15,5 25,25 35,15 C45,5 55,25 65,15 C75,5 85,25 95,15"
                stroke="var(--cinnabar)" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>

            <h1
              ref={scrambleRef}
              className={styles.nameTitle}
              aria-label={HERO_NAME}
            >
              {HERO_NAME}
            </h1>

            {/* Wavy underline under Kritika */}
            <svg className={styles.wavyUnderline} viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,6 Q5,0 10,6 T20,6 T30,6 T40,6 T50,6 T60,6 T70,6 T80,6 T90,6 T100,6" fill="none" stroke="var(--banana-cream)" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          {/* Role tagline */}
          <p className={styles.sub}>
            Full Stack Developer &amp; AI/ML Engineer, building end-to-end intelligent applications.
          </p>
          <p className={styles.heroTagline}>
            Every project. Every lesson. Catalogued.
          </p>

          {/* CTA Buttons */}
          <div className={styles.cta}>
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
        className={styles.scrollHint}
        aria-hidden="true"
        initial={{ opacity: 0, y: 12 }}
        animate={revealDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 1.0, ease: 'easeOut', delay: 0.5 }}
      >
        <span>scroll</span>
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
};

export default Hero;
