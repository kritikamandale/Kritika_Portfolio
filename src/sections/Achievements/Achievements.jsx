'use client';
import React, { useState, useEffect } from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import RevealGroup from '../../components/RevealGroup/RevealGroup';
import { motion } from 'framer-motion';

const EMOJI_POOL = ['🏆', '🥈', '✶', '⭐', '🎯', '🔥'];

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
    desc: "Developed a creative, data-driven solution utilizing NASA’s open-source space and Earth datasets.",
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
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    // Generate 14 randomised emoji floaters on the client to avoid SSR mismatch.
    const list = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      char: EMOJI_POOL[i % EMOJI_POOL.length],
      top:      `${5  + Math.random() * 85}%`,
      left:     `${2  + Math.random() * 93}%`,
      fontSize: `${1  + Math.random() * 1.5}rem`,
      duration: 7 + Math.random() * 7,
      delay:    Math.random() * 5,
    }));
    setEmojis(list);
  }, []);

  return (
    <SectionWrapper
      id="achievements"
      label="Trophy Case"
      title="Hackathons & Awards"
      subtitle="A showcase of national recognition, coding sprints, and competitive milestones."
      maxWidth="1400px"
    >
      {/* Floating Emojis Background */}
      {emojis.map((emoji) => (
        <motion.div
          key={emoji.id}
          className="absolute pointer-events-none select-none z-0"
          style={{
            top:      emoji.top,
            left:     emoji.left,
            fontSize: emoji.fontSize,
          }}
          animate={{
            y:       [0, -60, 0],
            x:       [0, 10, -10, 0],
            opacity: [0.07, 0.18, 0.07],
          }}
          transition={{
            duration: emoji.duration,
            delay:    emoji.delay,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
        >
          {emoji.char}
        </motion.div>
      ))}

      <div className="relative z-10">
        <RevealGroup staggerDelay={90} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full mx-auto">
          {ACHIEVEMENTS.map((item, i) => (
            <div 
              key={i} 
              className="group flex flex-col md:flex-row items-center md:items-center md:text-left text-center gap-4 md:gap-8 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-clay dark:shadow-none transition-all duration-300 md:hover:translate-x-2.5 max-md:hover:-translate-y-1.5 hover:border-brand-orange hover:shadow-clay-lg dark:hover:shadow-none focus-within:translate-x-2.5 focus-within:border-brand-orange focus-within:shadow-clay-lg"
            >
              <div 
                className="shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-brand-yellow to-brand-orange flex items-center justify-center text-[2.5rem] shadow-[0_8px_16px_rgba(255,140,66,0.2)] z-[2] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.04] group-focus-within:-translate-y-1 group-focus-within:scale-[1.04]" 
                aria-hidden="true"
              >
                {item.icon}
              </div>

              <div className="grow z-[2] transition-transform duration-300 md:group-hover:translate-x-1 md:group-focus-within:translate-x-1 max-md:group-hover:translate-y-0.5">
                <h3 className="font-heading text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-2">{item.title}</h3>
                <div className="flex items-center max-md:justify-center gap-3 mb-3 flex-wrap">
                  <span className="text-base font-bold text-brand-red">{item.event}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-surface-2-light dark:bg-surface-2-dark text-brand-mauve dark:text-brand-orange border border-border-light dark:border-border-dark font-semibold">{item.category}</span>
                </div>
                <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-[1.6]">{item.desc}</p>
              </div>

              {/* Faded background watermark */}
              <div 
                className="absolute -right-5 -bottom-10 text-[10rem] opacity-10 dark:opacity-[0.03] pointer-events-none -rotate-15 transition-all duration-300 z-0 group-hover:rotate-0 group-hover:scale-110 group-hover:opacity-20 dark:group-hover:opacity-10 group-focus-within:rotate-0 group-focus-within:scale-110 group-focus-within:opacity-20" 
                aria-hidden="true"
              >
                {item.icon}
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </SectionWrapper>
  );
};

export default Achievements;
