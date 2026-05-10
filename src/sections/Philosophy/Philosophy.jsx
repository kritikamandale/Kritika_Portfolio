import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import styles from './Philosophy.module.css';

const Philosophy = () => {
  return (
    <SectionWrapper
      id="philosophy"
      label="Mindset"
      title="Learning & Growth"
      subtitle="The core principles that drive my work and personal development."
    >
      <div className={styles.container}>
        <div className={`${styles.block} reveal`}>
          <div className={styles.icon}>🛠️</div>
          <div className={styles.content}>
            <h3 className={styles.heading}>Learning by Building</h3>
            <p className={styles.text}>
              Tutorials can only take you so far. I believe true understanding comes from getting your hands dirty in the codebase, breaking things, and figuring out how to piece them back together. Every project is a stepping stone.
            </p>
          </div>
        </div>

        <div className={`${styles.block} reveal reveal-delay-2`}>
          <div className={styles.icon}>🤖</div>
          <div className={styles.content}>
            <h3 className={styles.heading}>AI is an Amplifier</h3>
            <p className={styles.text}>
              <em>"AI won't replace you... someone using AI will."</em> Embracing intelligent tools isn't cheating; it's the key to modern engineering. I leverage AI to accelerate development, allowing me to focus on architecture, user experience, and solving the right problems.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Philosophy;
