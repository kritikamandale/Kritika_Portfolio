// src/sections/Experience/Experience.jsx
// ============================================================
// EXPERIENCE SECTION
// Vertical timeline with claymorphic milestone cards.
// ── Edit: EXPERIENCE array below ────────────────────────────
// ============================================================

import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import styles from './Experience.module.css';

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
      <div className={styles.timeline}>
        {EXPERIENCE.map(({ id, role, company, companyTag, period, desc, achievements, tags }, i) => (
          <div
            key={id}
            className={`${styles.item} reveal reveal-delay-${(i % 4) + 1}`}
          >
            {/* Left: dot column */}
            <div className={styles.dotCol}>
              <div className={styles.dot} aria-hidden="true" />
            </div>

            {/* Right: card */}
            <div className={styles.card}>
              {/* Header: role + period */}
              <div className={styles.cardHeader}>
                <h3 className={styles.role}>{role}</h3>
                <span className={styles.period}>{period}</span>
              </div>

              {/* Company */}
              <div className={styles.company}>
                {company}
                <span className={styles.companyTag}>{companyTag}</span>
              </div>

              {/* Description */}
              <p className={styles.desc}>{desc}</p>

              {/* Key achievements */}
              <ul className={styles.achievements} aria-label="Key achievements">
                {achievements.map((a) => (
                  <li key={a} className={styles.achievement}>{a}</li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className={styles.cardTags} aria-label="Technologies used">
                {tags.map((tag) => (
                  <span key={tag} className={styles.cardTag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Experience;
