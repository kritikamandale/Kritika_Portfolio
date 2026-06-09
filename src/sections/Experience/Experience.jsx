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
    desc: 'Focusing on real-world AI applications, model optimization, and integrating intelligent features into production environments.',
    achievements: [
      'Engineered and optimized machine learning models for production use cases.',
      'Bridged the gap between AI research and scalable deployment.',
    ],
    tags: ['AI/ML', 'Python', 'LLMs', 'Model Deployment'],
  },
  {
    id: 'e2',
    role: 'Full Stack Project Intern',
    company: 'Trust Fintech Limited',
    companyTag: 'Internship',
    period: 'Jun 2025 – Jan 2026',
    desc: 'Developed and deployed full-stack web modules as part of a fintech engineering team.',
    achievements: [
      'Built scalable modules using HTML, CSS, JavaScript, and SQL Server.',
      'Collaborated cross-functionally to improve core financial web applications.',
    ],
    tags: ['HTML/CSS', 'JavaScript', 'SQL Server', 'Full-Stack'],
  },
  {
    id: 'e3',
    role: 'Student Career Development Coordinator',
    company: 'SVPCET',
    companyTag: 'On-site',
    period: 'Jan 2025 – Present',
    desc: 'Acting as the primary point of contact between students and the Career Development Centre.',
    achievements: [
      'Facilitated communication and professional opportunities for the student body.',
      'Supported students in career planning and professional skill development.',
    ],
    tags: ['Leadership', 'Management', 'Communication'],
  },
  {
    id: 'e4',
    role: 'Co-Coordinator',
    company: 'HackronyX',
    companyTag: 'Event Management',
    period: 'Mar 2025 – Jul 2025',
    desc: 'Co-coordinated a National-level hackathon initiative.',
    achievements: [
      'Managed end-to-end event operations over a 5-month preparation cycle.',
      'Led teams and coordinated with sponsors to deliver a successful technical event.',
    ],
    tags: ['Team Leadership', 'Coordination', 'Event Management'],
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
      <RevealGroup staggerDelay={120} className="relative max-w-[1000px] mx-auto flex flex-col gap-0 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-[31px] max-sm:before:left-[15px] before:w-[2px] before:bg-[linear-gradient(to_bottom,transparent,var(--brand-yellow,#FFF275)_10%,var(--brand-orange,#FF8C42)_50%,var(--brand-red,#FF3C38)_90%,transparent)] before:z-0">
        {EXPERIENCE.map(({ id, role, company, companyTag, period, desc, achievements, tags }, i) => (
          <div
            key={id}
            className="grid grid-cols-[64px_1fr] max-sm:grid-cols-[36px_1fr] gap-6 max-sm:gap-4 pb-16 last:pb-0 relative z-[1] group"
          >
            {/* Left: dot column */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-[22px] h-[22px] rounded-full bg-[linear-gradient(135deg,var(--brand-orange,#FF8C42),var(--brand-red,#FF3C38))] shadow-[0_0_0_4px_rgba(255,140,66,0.2),0_4px_12px_rgba(255,140,66,0.3)] shrink-0 mt-4 relative transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_0_6px_rgba(255,140,66,0.25),0_6px_18px_rgba(255,140,66,0.4)]" aria-hidden="true" />
            </div>

            {/* Right: card */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 sm:p-8 border border-border-light dark:border-border-dark shadow-clay dark:shadow-none relative overflow-hidden transition-all duration-300 group-hover:translate-x-1.5 group-hover:border-black/25 dark:group-hover:border-white/25 group-hover:shadow-clay-lg dark:group-hover:shadow-none before:content-[''] before:absolute before:top-0 before:left-0 before:bottom-0 before:w-1 before:bg-[linear-gradient(to_bottom,var(--brand-orange,#FF8C42),var(--brand-red,#FF3C38))] before:rounded-l-xl">
              {/* Header: role + period */}
              <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                <h3 className="font-heading text-lg font-bold text-text-primary dark:text-text-dark-primary">{role}</h3>
                <span className="text-xs font-medium text-brand-orange bg-brand-orange/10 border border-brand-orange/15 px-3 py-1 rounded-full whitespace-nowrap">{period}</span>
              </div>

              {/* Company */}
              <div className="text-sm font-semibold text-text-secondary dark:text-text-dark-secondary mb-3 flex items-center gap-2">
                {company}
                <span className="text-[11px] bg-surface-2-light dark:bg-surface-2-dark border border-border-light dark:border-border-dark px-2 py-[1px] rounded-full text-text-muted dark:text-text-dark-muted">{companyTag}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-[1.75] mb-4">{desc}</p>

              {/* Key achievements */}
              <ul className="flex flex-col gap-2 pl-4" aria-label="Key achievements">
                {achievements.map((a) => (
                  <li key={a} className="text-sm text-text-secondary dark:text-text-dark-secondary leading-[1.5] flex items-start gap-2 before:content-['✦'] before:text-brand-orange before:text-[10px] before:shrink-0 before:mt-[4px]">{a}</li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mt-4" aria-label="Technologies used">
                {tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-text-secondary dark:text-text-dark-secondary bg-surface-2-light dark:bg-surface-2-dark border border-border-light dark:border-border-dark px-3 py-[2px] rounded-full">{tag}</span>
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
