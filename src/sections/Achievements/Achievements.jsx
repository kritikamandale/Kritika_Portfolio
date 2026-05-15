import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import RevealGroup from '../../components/RevealGroup/RevealGroup';
import styles from './Achievements.module.css';

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    title: 'National Finalist',
    event: 'Hackwise 2026, IIM Indore',
    category: 'National Level Hackathon',
    desc: 'Selected among the top teams nationwide for delivering an innovative and highly technical solution.',
  },
  {
    icon: '🥈',
    title: '1st Runner-Up',
    event: 'Openpools Doppelganger',
    category: '30-Hour Hackathon',
    desc: 'Engineered an outstanding project under extreme time constraints during a continuous 30-hour coding sprint.',
  },
  {
    icon: '🥈',
    title: '1st Runner-Up',
    event: 'NASA Space Apps Challenge',
    category: 'Nagpur Chapter',
    desc: "Developed a creative, data-driven solution utilizing NASA\u2019s open-source space and Earth datasets.",
  },
  {
    icon: '🥈',
    title: '1st Runner-Up',
    event: 'Stellar Ragnarok',
    category: 'Blockchain Event',
    desc: 'Secured top honors by conceptualizing and building an innovative decentralized application on the blockchain.',
  },
];

const Achievements = () => {
  return (
    <SectionWrapper
      id="achievements"
      label="Trophy Case"
      title="Hackathons & Awards"
      subtitle="A showcase of national recognition, coding sprints, and competitive milestones."
      maxWidth="1400px"
    >
      <RevealGroup staggerDelay={90} className={styles.list}>
        {ACHIEVEMENTS.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.iconWrapper} aria-hidden="true">
              {item.icon}
            </div>

            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <div className={styles.eventWrap}>
                <span className={styles.event}>{item.event}</span>
                <span className={styles.category}>{item.category}</span>
              </div>
              <p className={styles.desc}>{item.desc}</p>
            </div>

            {/* Faded background watermark */}
            <div className={styles.watermark} aria-hidden="true">
              {item.icon}
            </div>
          </div>
        ))}
      </RevealGroup>
    </SectionWrapper>
  );
};

export default Achievements;
