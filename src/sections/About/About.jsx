'use client';
// src/sections/About/About.jsx
// ============================================================
// ABOUT SECTION
// Redesigned two-column layout focusing on AI/ML & full-stack edge.
// ============================================================

import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import Button from '../../components/Button/Button';
import useCountUp from '../../hooks/useCountUp';
import styles from './About.module.css';

// ── Animated stat block ──────────────────────────────────────
// Extracts numeric part and suffix (e.g. "10+" → 10, "+")
const StatBlock = ({ num, label }) => {
  const match   = num.match(/^(\d+)(.*)$/);
  const target  = match ? parseInt(match[1], 10) : 0;
  const suffix  = match ? match[2] : '';
  const { ref, display } = useCountUp(target, 1400);
  return (
    <div ref={ref} className={styles.statBlock}>
      <span className={styles.statNum}>{display}{suffix}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
};


const TECH_TAGS = [
  { label: 'LLMs & GenAI', hot: true },
  { label: 'Full Stack Dev', hot: true },
  { label: 'ML Engineering', hot: true },
  { label: 'React/Node', hot: true },
  { label: 'Python', hot: true },
];

const STATS = [
  { num: '2+', label: 'Years Coding' },
  { num: '10+', label: 'Projects Built' },
  { num: '4+', label: 'Hackathon Wins' },
];

const CARDS = [
  {
    icon: '🏆',
    title: 'Proven under pressure',
    desc: 'From OpenPools to NASA Space Apps, I thrive in high-stakes environments, rapid prototyping, and delivering winning solutions under tight 30-hour deadlines.',
    colorClass: styles.cardColor1, // Cinnabar
  },
  {
    icon: '🧠',
    title: 'AI-first thinking',
    desc: 'I don\'t just write code; I architect intelligent systems. My philosophy revolves around leveraging LLMs and ML models to solve real-world problems efficiently.',
    colorClass: styles.cardColor2, // Pumpkin
  },
  {
    icon: '🤝',
    title: 'Community builder',
    desc: 'Co-coordinating HackronyX and leading student tech communities taught me that the most impactful innovations stem from collaboration and shared knowledge.',
    colorClass: styles.cardColor3, // Banana Cream
  },
  {
    icon: '⚙️',
    title: 'End-to-end ownership',
    desc: 'I close the full loop—from conceptualizing complex AI algorithms to deploying scalable web interfaces that users actually love to interact with.',
    colorClass: styles.cardColor4, // Blue-grey
  },
];

const About = () => {
  return (
    <SectionWrapper
      id="about"
      label="What I bring"
      title="The person behind the code"
      subtitle=""
      align="center"
      alt
    >
      <div className={`${styles.statsRow} reveal`}>
        {STATS.map((stat, i) => (
          <StatBlock key={i} num={stat.num} label={stat.label} />
        ))}
      </div>

      <div className={styles.grid}>

        {/* ── LEFT COLUMN ── */}
        <div className={`${styles.leftCol} reveal`}>
          <div className={styles.locationRow}>
            📍 Nagpur · Open to opportunities
          </div>

          <p className={styles.bio}>
            Technology started as curiosity for me, but it quickly evolved into a relentless drive to build intelligent systems that matter. As an <strong>AI/ML Engineer and Full-Stack Developer</strong>, my edge lies in bridging the gap between cutting-edge artificial intelligence and robust, scalable web architectures.
          </p>
          <p className={styles.bio}>
            Whether I'm fine-tuning machine learning models or engineering seamless user interfaces, I approach every problem with an <strong>AI-first, end-to-end mindset</strong>. I thrive on rapid execution, learning by building, and turning complex ideas into award-winning digital realities.
          </p>

          <div className={styles.tagsContainer}>
            {TECH_TAGS.map((tag, i) => (
              <span key={i} className={`${styles.techTag} ${tag.hot ? styles.hotTag : ''}`}>
                {tag.label}
              </span>
            ))}
          </div>



          <div className={`${styles.ctaRow} reveal reveal-delay-3`}>
            <Button variant="primary" href="#contact" className={styles.hireBtn} size="lg">
              Work with me →
            </Button>
            <Button variant="ghost" href="/Kritika_Resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.resumeBtn} size="lg">
              Download Resume ↗
            </Button>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className={styles.rightCol}>
          {CARDS.map((card, i) => (
            <div key={i} className={`${styles.featureCard} ${card.colorClass} reveal reveal-delay-${i + 1}`}>
              <div className={styles.cardIcon}>{card.icon}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};

export default About;
