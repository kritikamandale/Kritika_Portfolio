// src/sections/Skills/Skills.jsx
// ============================================================
// SKILLS SECTION
// Claymorphic icon cards with category filter tabs.
// Proficiency shown as filled dots (1–5 scale).
// ── Edit: skills array below ────────────────────────────────
// ============================================================

import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import InteractiveGraph from '../../components/InteractiveGraph/InteractiveGraph';
import styles from './Skills.module.css';


const Skills = () => {
  return (
    <SectionWrapper
      id="skills"
      label="My Toolkit"
      title="Skill and Technology"
      subtitle="An interactive map of the tools I reach for to bring ideas to life."
      alt
    >
      <div className={styles.graphWrapper}>
        <InteractiveGraph />
      </div>
    </SectionWrapper>
  );
};

export default Skills;
