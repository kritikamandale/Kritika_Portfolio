// src/sections/Experience/Experience.jsx
// ============================================================
// EXPERIENCE SECTION
// Vertical timeline with claymorphic milestone cards.
// ── Edit: EXPERIENCE array below ────────────────────────────
// ============================================================

import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import RevealGroup from '../../components/RevealGroup/RevealGroup';

// ── Edit your experience here ────────────────────────────────
const EXPERIENCE = [
  {
    id: 'e1',
    role: 'AI/ML Intern',
    company: 'Matverse Vision Pvt. Ltd.',
    companyTag: 'Internship',
    period: 'Mar 2026 – Present',
    desc: 'Engineered a 7-stage AI irrigation advisory system for smallholder farmers integrating CHIRPS, ERA5, SMAP, Random Forests, and PINNs. Delivered real-time predictive alerts with 97.1% accuracy, 98.9% precision, and a 0.984 F1-score.',
    tags: ['Physics-Informed AI', 'Random Forests', 'Machine Learning', 'PINN'],
  },
  {
    id: 'e2',
    role: 'Full Stack Project Intern',
    company: 'Trust Fintech Limited',
    companyTag: 'Internship',
    period: 'Aug 2025 – Jan 2026',
    desc: 'Built production-grade fintech modules, engineering a Python face authentication system that cut identity verification time by 40%. Architected an end-to-end SQL KYC verification pipeline for secure data compliance, reducing manual effort by 35%.',
    tags: ['Python', 'Face Authentication', 'SQL Server', 'Full Stack'],
  },
  {
    id: 'e3',
    role: 'Student Career Development Coordinator',
    company: 'SVPCET',
    companyTag: 'On-site',
    period: 'Jan 2025 – Present',
    desc: 'Served as primary liaison between students, faculty, and the Career Development Centre. Coordinated campus career workshops, skill-building sessions, and student outreach campaigns to align institutional initiatives with placement readiness goals.',
    tags: ['Leadership', 'Student Outreach', 'Stakeholder Coordination', 'Mentorship'],
  },
  {
    id: 'e4',
    role: 'Co-Coordinator',
    company: 'HackronyX',
    companyTag: 'Event Management',
    period: 'Mar 2025 – Jul 2025',
    desc: 'Co-coordinated a national-level hackathon, managing cross-functional teams across a 5-month cycle. Directed event logistics, sponsor relations, technical tracks, and live operations for 250+ participants from institutions across India.',
    tags: ['Team Leadership', 'Event Management', 'Technical Tracks', 'Hackathon Execution'],
  },
];

const Experience = () => {
  return (
    <SectionWrapper
      id="experience"
      label="Career"
      title="Work Experience"
      subtitle="My professional journey — the roles, companies, and impact I've made along the way."
      alt
    >
      <RevealGroup staggerDelay={120} className="relative w-full flex flex-col gap-0 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-[31px] max-sm:before:left-[15px] before:w-[2px] before:bg-[linear-gradient(to_bottom,transparent,#F5DE8F_10%,#B02618_50%,#8A1C10_90%,transparent)] before:z-0">
        {EXPERIENCE.map(({ id, role, company, companyTag, period, desc, tags }) => (
          <div
            key={id}
            className="grid grid-cols-[64px_1fr] max-sm:grid-cols-[36px_1fr] gap-6 max-sm:gap-4 pb-8 last:pb-0 relative z-[1] group"
          >
            {/* Left: dot column */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-[22px] h-[22px] rounded-full bg-[linear-gradient(135deg,#F5DE8F,#B02618)] shadow-[0_0_0_4px_rgba(176,38,24,0.15),0_4px_12px_rgba(176,38,24,0.25)] shrink-0 mt-4 relative transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_0_6px_rgba(176,38,24,0.20),0_6px_18px_rgba(176,38,24,0.35)]" aria-hidden="true" />
            </div>

            {/* Right: card */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 sm:p-5 border border-border-light dark:border-border-dark shadow-clay dark:shadow-none relative overflow-hidden transition-all duration-300 group-hover:translate-x-1.5 group-hover:border-black/25 dark:group-hover:border-white/25 group-hover:shadow-clay-lg dark:group-hover:shadow-none before:content-[''] before:absolute before:top-0 before:left-0 before:bottom-0 before:w-1 before:bg-[linear-gradient(to_bottom,#F5DE8F,#B02618)] before:rounded-l-xl">
              {/* Header: role + period */}
              <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
                <h3 className="font-heading text-lg font-bold text-text-primary dark:text-text-dark-primary">{role}</h3>
                <span className="text-xs font-medium text-accent bg-accent/10 border border-accent/15 px-3 py-1 rounded-full whitespace-nowrap">{period}</span>
              </div>

              {/* Company */}
              <div className="text-sm font-semibold text-text-secondary dark:text-text-dark-secondary mb-2 flex items-center gap-2">
                {company}
                <span className="text-[11px] bg-surface-2-light dark:bg-surface-2-dark border border-border-light dark:border-border-dark px-2 py-[1px] rounded-full text-text-muted dark:text-text-dark-muted">{companyTag}</span>
              </div>

              {/* Description — 2-3 line concise summary covering all accomplishments */}
              <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-[1.6] mb-3">{desc}</p>

              {/* Tech tags — lightened and refined to complement description text */}
              <div className="flex flex-wrap gap-1.5 mt-3" aria-label="Technologies used">
                {tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-medium text-accent dark:text-brand-yellow bg-accent/8 dark:bg-brand-yellow/10 border border-accent/15 dark:border-brand-yellow/20 px-2.5 py-0.5 rounded-full transition-colors">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </RevealGroup>
    </SectionWrapper>
  );
};

export default Experience;
