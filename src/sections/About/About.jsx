'use client';
// src/sections/About/About.jsx
// ============================================================
// ABOUT SECTION
// Redesigned two-column layout focusing on AI/ML & full-stack edge.
// ============================================================

import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import Button from '../../components/Button/Button';


// ── Static stat block (no counter animation) ─────────────────
const StatBlock = ({ num, label }) => (
  <div className="flex flex-col items-center gap-4 group cursor-default">
    <span className="text-2xl w-[90px] h-[90px] max-sm:text-2xl rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex items-center justify-center font-heading font-extrabold text-text-primary dark:text-text-dark-primary leading-none shadow-clay-sm dark:shadow-none transition-all duration-300 relative group-hover:scale-[1.08] group-hover:-translate-y-1 group-hover:border-brand-orange group-hover:shadow-clay group-hover:text-brand-orange before:content-[''] before:absolute before:-inset-[10px] before:rounded-full before:bg-[radial-gradient(circle,rgba(255,140,66,0.12)_0%,transparent_70%)] before:-z-10 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">
      {num}
    </span>
    <span className="text-[14px] text-text-muted dark:text-text-dark-muted font-semibold tracking-[0.05em] uppercase">
      {label}
    </span>
  </div>
);


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
    desc: 'From OpenPools to NASA Space Apps, I thrive in high-stakes environments and deliver winning solutions under tight deadlines.',
    barColor: 'bg-brand-red',
    iconBg: 'bg-brand-red/10',
    iconColor: 'text-brand-red',
  },
  {
    icon: '🧠',
    title: 'AI-first thinking',
    desc: 'I architect intelligent systems — leveraging LLMs and ML models to solve real-world problems, not just write code.',
    barColor: 'bg-brand-orange',
    iconBg: 'bg-brand-orange/10',
    iconColor: 'text-brand-orange',
  },
  {
    icon: '🤝',
    title: 'Community builder',
    desc: 'Co-coordinating HackronyX and leading student tech communities taught me that the best innovations come from collaboration.',
    barColor: 'bg-brand-yellow',
    iconBg: 'bg-brand-yellow/20',
    iconColor: 'text-brand-yellow',
  },
  {
    icon: '⚙️',
    title: 'End-to-end ownership',
    desc: 'I close the full loop — from fine-tuning ML models to deploying scalable web interfaces that users love.',
    barColor: 'bg-brand-blue',
    iconBg: 'bg-brand-blue/10',
    iconColor: 'text-brand-blue',
  },
];

const About = () => {
  return (
    <div className="relative z-[9] min-h-screen rounded-t-[32px] overflow-hidden bg-bg-light dark:bg-bg-dark shadow-[0_-20px_40px_rgba(0,0,0,0.1)] dark:shadow-none">
      <SectionWrapper
        id="about"
        label="What I bring"
        title="The person behind the code"
        subtitle=""
        align="center"
        alt
      >
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mb-10 w-full reveal">
          {STATS.map((stat, i) => (
            <StatBlock key={i} num={stat.num} label={stat.label} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-6 reveal">
            <div className="inline-flex items-center gap-2 font-heading text-[14px] font-semibold text-brand-mauve dark:text-brand-yellow bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark px-4 py-2 rounded-pill w-fit">
              📍 Nagpur · Open to opportunities
            </div>

            <p className="text-[16px] text-text-secondary dark:text-text-dark-secondary leading-[1.8]">
              I enjoy building intelligent web applications that combine AI with seamless user experiences. My focus is on end-to-end product development — from fine-tuning ML models to deploying scalable web interfaces that solve real workflow challenges. Whether it’s a startup, a business, or a hackathon team, I build things that work and ship fast. Currently interning at Matverse Vision (AI/ML) and open to internships and collaborative AI product builds.
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              {TECH_TAGS.map((tag, i) => (
                <span 
                  key={i} 
                  className={`
                    text-[14px] font-medium px-4 py-2 rounded-pill transition-all duration-250
                    ${tag.hot 
                      ? 'bg-[linear-gradient(135deg,var(--brand-orange,#FF8C42),var(--brand-red,#FF3C38))] text-white font-semibold shadow-[0_4px_12px_rgba(255,60,56,0.2)]' 
                      : 'bg-surface-light dark:bg-surface-dark text-text-secondary dark:text-text-dark-secondary border border-divider-light dark:border-divider-dark'}
                  `}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mt-4 reveal reveal-delay-3">
              <Button variant="primary" href="#contact" className="!px-4 !py-2 !text-14">
                Work with me →
              </Button>
              <Button variant="ghost" href="/Kritika_Resume.pdf" download="Kritika_Mandale_Resume.pdf" target="_blank" rel="noopener noreferrer" className="!px-4 !py-2 !text-14">
                Download Resume ↗
              </Button>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CARDS.map((card, i) => (
              <div
                key={i}
                className={`bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6 flex flex-col gap-2 transition-[transform,box-shadow,border-color] duration-300 relative overflow-hidden h-full hover:-translate-y-1 hover:shadow-clay-lg dark:hover:shadow-none hover:border-black/25 dark:hover:border-white/25 reveal reveal-delay-${i + 1}`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${card.barColor}`} />
                <h3 className="font-heading text-md font-bold text-text-primary dark:text-text-dark-primary">
                  {card.title}
                </h3>
                <p className="text-[14px] text-text-secondary dark:text-text-dark-secondary leading-[1.6]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default About;
