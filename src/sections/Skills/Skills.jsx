// src/sections/Skills/Skills.jsx
// ============================================================
// SKILLS SECTION
// Infinite scrolling marquee for skills
// ============================================================

import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import RevealGroup from '../../components/RevealGroup/RevealGroup';
import styles from './Skills.module.css';

const SKILLS_ROW_1 = [
  'React', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Figma', 
  'Deep Learning', 'AI / ML', 'NLP', 'RAG', 'Hugging Face'
];
const SKILLS_ROW_2 = [
  'Python', 'Data Science', 'Streamlit', 'TensorFlow', 'PyTorch', 'LLMs', 
  'Prompt Engineering', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'
];

const Skills = () => {
  return (
    <SectionWrapper
      id="skills"
      label="My Toolkit"
      title="Skill and Technology"
      subtitle="An interactive map of the tools I reach for to bring ideas to life."
      alt
    >
      <RevealGroup staggerDelay={90}>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {[...SKILLS_ROW_1, ...SKILLS_ROW_1].map((skill, index) => (
              <div key={`r1-${index}`} className={styles.skillItem}>
                {skill} <span className={styles.separator}>·</span>
              </div>
            ))}
          </div>
          <div className={`${styles.marqueeTrack} ${styles.reverse}`}>
            {[...SKILLS_ROW_2, ...SKILLS_ROW_2].map((skill, index) => (
              <div key={`r2-${index}`} className={styles.skillItem}>
                {skill} <span className={styles.separator}>·</span>
              </div>
            ))}
          </div>
        </div>
      </RevealGroup>
    </SectionWrapper>
  );
};

export default Skills;
