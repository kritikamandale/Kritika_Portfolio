'use client';
// src/sections/About/About.jsx
// ============================================================
// ABOUT SECTION
// Redesigned two-column layout focusing on AI/ML & full-stack edge.
// ============================================================

import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import Button from '../../components/Button/Button';
import RevealGroup from '../../components/RevealGroup/RevealGroup';
import { Trophy, Brain, Users, Layers, MapPin } from 'lucide-react';

// ── Static stat block (no counter animation) ─────────────────
const StatBlock = ({ num, label }) => (
  <div className="flex flex-col items-center gap-2 group cursor-default">
    <span className="text-2xl sm:text-3xl md:text-4xl w-[76px] h-[76px] sm:w-[92px] sm:h-[92px] rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex items-center justify-center font-heading font-extrabold text-text-primary dark:text-text-dark-primary leading-none shadow-clay dark:shadow-none transition-all duration-300 relative group-hover:scale-[1.08] group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-clay-lg group-hover:text-accent before:content-[''] before:absolute before:-inset-[8px] before:rounded-full before:bg-[radial-gradient(circle,rgba(176,38,24,0.12)_0%,transparent_70%)] before:-z-10 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">
      {num}
    </span>
    <span className="text-[12px] sm:text-sm text-text-muted dark:text-text-dark-muted font-bold tracking-[0.06em] uppercase mt-0.5">
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
    icon: Trophy,
    title: 'Proven under pressure',
    desc: 'From Openpools to NASA Space Apps, I thrive in high-stakes environments and deliver winning solutions under tight deadlines.',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    icon: Brain,
    title: 'AI-first thinking',
    desc: 'I architect intelligent systems, leveraging LLMs and ML models to solve real-world problems, not just write code.',
    iconBg: 'bg-brand-yellow/15',
    iconColor: 'text-brand-yellow',
  },
  {
    icon: Users,
    title: 'Community builder',
    desc: 'Co-coordinating HackronyX and leading student tech communities taught me that the best innovations come from collaboration.',
    iconBg: 'bg-brand-yellow/20',
    iconColor: 'text-brand-yellow',
  },
  {
    icon: Layers,
    title: 'End-to-end ownership',
    desc: 'I close the full loop, from fine-tuning ML models to deploying scalable web interfaces that users love.',
    iconBg: 'bg-brand-slate/10',
    iconColor: 'text-brand-slate',
  },
];

const About = () => {
  return (
    <div className="relative z-[9] bg-bg-light dark:bg-bg-dark">
      <SectionWrapper
        id="about"
        label="What I bring"
        title="The person behind the code"
        subtitle=""
        align="center"
        alt
      >
        <RevealGroup staggerDelay={100} className="flex flex-wrap justify-center gap-8 sm:gap-14 mt-1 mb-10 sm:mb-12 w-full">
          {STATS.map((stat, i) => (
            <StatBlock key={i} num={stat.num} label={stat.label} />
          ))}
        </RevealGroup>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          {/* ── LEFT COLUMN ── */}
          <RevealGroup staggerDelay={100} className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-5 shadow-clay-sm dark:shadow-none">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold text-accent dark:text-brand-yellow bg-surface-2-light dark:bg-surface-2-dark border border-border-light dark:border-border-dark px-3.5 py-1.5 rounded-pill w-fit">
                <MapPin className="w-4 h-4 text-accent dark:text-brand-yellow shrink-0" />
                Nagpur · Open to opportunities
              </div>

              <p className="text-sm sm:text-base text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                Hi, I&apos;m Kritika Mandale. I build intelligent web applications that pair AI with seamless user experiences. I handle end-to-end product development from fine-tuning ML models to shipping scalable interfaces fast. Open to internships, freelancing, and AI product builds.
              </p>

              <div className="flex flex-wrap gap-2 mt-1">
                {TECH_TAGS.map((tag, i) => (
                  <span
                    key={i}
                    className={`
                      text-xs font-medium px-3 py-1 rounded-full transition-all duration-250
                      ${tag.hot
                        ? 'bg-accent/10 dark:bg-brand-yellow/15 text-accent dark:text-brand-yellow border border-accent/20 dark:border-brand-yellow/30'
                        : 'bg-surface-2-light dark:bg-surface-2-dark text-text-secondary dark:text-text-dark-secondary border border-border-light dark:border-border-dark'}
                    `}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-3 border-t border-border-light dark:border-border-dark">
              <Button variant="primary" href="#contact" className="!px-5 !py-2.5 !text-sm !bg-[#3A2418] hover:!bg-[#2a180f]">
                Work with me
              </Button>
              <Button variant="ghost" href="/Kritika_Resume.pdf" target="_blank" rel="noopener noreferrer" className="!px-5 !py-2.5 !text-sm">
                View Resume ↗
              </Button>
            </div>
          </RevealGroup>

          {/* ── RIGHT COLUMN ── */}
          <RevealGroup staggerDelay={120} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {CARDS.map((card, i) => {
              const IconComp = card.icon;
              return (
                <div
                  key={i}
                  className={`bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-5 sm:p-6 flex flex-col gap-3 transition-all duration-300 relative overflow-hidden h-full hover:-translate-y-1 hover:shadow-clay-lg dark:hover:shadow-none hover:border-black/25 dark:hover:border-white/25`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl ${card.iconBg} ${card.iconColor} shrink-0`}>
                      <IconComp className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-text-primary dark:text-text-dark-primary">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </RevealGroup>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default About;
