// src/sections/Skills/Skills.jsx
// ============================================================
// SKILLS SECTION
// Wraps the interactive graph in a RevealGroup for stagger entry.
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
