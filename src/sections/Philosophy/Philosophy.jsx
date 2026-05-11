import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import styles from './Philosophy.module.css';

const PHILOSOPHIES = [
  {
    id: '01',
    heading: 'Learning by Building',
    text: 'Tutorials can only take you so far. I believe true understanding comes from getting your hands dirty in the codebase, breaking things, and figuring out how to piece them back together. Every project is a stepping stone.',
  },
  {
    id: '02',
    quote: '"AI won\'t replace you... someone using AI will."',
    heading: 'AI is an Amplifier',
    text: 'Embracing intelligent tools isn\'t cheating; it\'s the key to modern engineering. I leverage AI to accelerate development, allowing me to focus on architecture, user experience, and solving the right problems.',
  }
];

const Philosophy = () => {
  return (
    <SectionWrapper
      id="philosophy"
      label="Mindset"
      title="Learning & Growth"
      subtitle="The core principles that drive my work and personal development."
    >
      <div className={styles.container}>
        {PHILOSOPHIES.map((item, index) => (
          <div key={item.id} className={`${styles.item} reveal reveal-delay-${index + 1}`}>
            <div className={styles.indexNum}>{item.id}</div>
            <div className={styles.content}>
              {item.quote && <span className={styles.quote}>{item.quote}</span>}
              <h3 className={styles.heading}>{item.heading}</h3>
              <p className={styles.text}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Philosophy;
