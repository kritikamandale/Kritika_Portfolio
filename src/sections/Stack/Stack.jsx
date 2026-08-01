/* eslint-disable no-unused-vars */
'use client';
// src/sections/Stack/Stack.jsx
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiCss,
  SiNodedotjs,
  SiPostman,
  SiDocker,
  SiPostgresql,
  SiTensorflow,
  SiPytorch,
  SiKeras,
  SiScikitlearn,
  SiStreamlit,
  SiPython,
  SiCplusplus,
  SiGit,
  SiGithub,
  SiFigma,
  SiLinux,
} from 'react-icons/si';

import { TbApi, TbSql, TbBrain } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';

const ICONS = {
  React: () => <SiReact className="w-7 h-7 text-[#61DAFB] shrink-0" />,
  Nextjs: () => <SiNextdotjs className="w-7 h-7 text-black dark:text-white shrink-0" />,
  TypeScript: () => <SiTypescript className="w-7 h-7 text-[#3178C6] shrink-0" />,
  JavaScript: () => <SiJavascript className="w-7 h-7 text-[#F7DF1E] shrink-0" />,
  Tailwind: () => <SiTailwindcss className="w-7 h-7 text-[#06B6D4] shrink-0" />,
  CSS: () => <SiCss className="w-7 h-7 text-[#1572B6] shrink-0" />,
  Nodejs: () => <SiNodedotjs className="w-7 h-7 text-[#5FA04E] shrink-0" />,
  RestAPI: () => <TbApi className="w-8 h-8 text-[#B02618] shrink-0" />,
  Postman: () => <SiPostman className="w-7 h-7 text-[#FF6C37] shrink-0" />,
  Docker: () => <SiDocker className="w-7 h-7 text-[#2496ED] shrink-0" />,
  PostgreSQL: () => <SiPostgresql className="w-7 h-7 text-[#4169E1] shrink-0" />,
  TensorFlow: () => <SiTensorflow className="w-7 h-7 text-[#FF6F00] shrink-0" />,
  PyTorch: () => <SiPytorch className="w-7 h-7 text-[#EE4C2C] shrink-0" />,
  Keras: () => <SiKeras className="w-7 h-7 text-[#D00000] shrink-0" />,
  ScikitLearn: () => <SiScikitlearn className="w-7 h-7 text-[#F7931E] shrink-0" />,
  NLP: () => <TbBrain className="w-7 h-7 text-[#B02618] shrink-0" />,
  Streamlit: () => <SiStreamlit className="w-7 h-7 text-[#FF4B4B] shrink-0" />,
  Python: () => <SiPython className="w-7 h-7 text-[#3776AB] shrink-0" />,
  CPlusPlus: () => <SiCplusplus className="w-7 h-7 text-[#00599C] shrink-0" />,
  SQL: () => <TbSql className="w-8 h-8 text-[#4479A1] shrink-0" />,
  Git: () => <SiGit className="w-7 h-7 text-[#F05032] shrink-0" />,
  GitHub: () => <SiGithub className="w-7 h-7 text-black dark:text-white shrink-0" />,
  Figma: () => <SiFigma className="w-7 h-7 text-[#F24E1E] shrink-0" />,
  VSCode: () => <VscVscode className="w-7 h-7 text-[#007ACC] shrink-0" />,
  Linux: () => <SiLinux className="w-7 h-7 text-[#FCC624] shrink-0" />,
};

const EmojiPill = ({ emoji }) => (
  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, fontSize: 20, flexShrink: 0, lineHeight: 1 }} aria-hidden="true">
    {emoji}
  </span>
);

const CircularSkillRing = ({ name, iconKey, emoji, accentColor }) => {
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = iconKey ? ICONS[iconKey] : null;

  const size = 76;
  const strokeWidth = 4;
  const center = size / 2;
  const radius = center - strokeWidth - 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.88, y: 12 },
        show: { opacity: 1, scale: 1, y: 0 },
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col items-center gap-2 group p-1 rounded-xl cursor-default transition-colors duration-200"
      title={name}
    >
      <div className="relative flex items-center justify-center w-[76px] h-[76px] shrink-0">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={center} cy={center} r={radius} stroke="currentColor" strokeWidth={strokeWidth} className="text-border-light dark:text-border-dark fill-transparent opacity-60" />
          <motion.circle cx={center} cy={center} r={radius} stroke={accentColor || '#B02618'} strokeWidth={strokeWidth} strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} whileInView={{ strokeDashoffset: strokeDashoffset }} viewport={{ once: false, margin: '-40px' }} transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease: 'easeOut' }} strokeLinecap="round" className="fill-transparent" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {IconComponent ? <IconComponent /> : <EmojiPill emoji={emoji || '✦'} />}
        </div>
      </div>
      <span className="text-[13px] font-semibold text-text-primary dark:text-text-dark-primary text-center tracking-tight max-w-[84px] leading-tight mt-0.5">
        {name}
      </span>
    </motion.div>
  );
};

const CategoryHeading = ({ label, index }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
    <motion.div initial={{ opacity: 0, scaleY: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} viewport={{ once: false, margin: '-40px' }} transition={{ duration: 0.3, ease: 'easeOut' }} style={{ width: '4px', height: '36px', borderRadius: '4px', background: ACCENT_COLORS[index % ACCENT_COLORS.length], flexShrink: 0, transformOrigin: 'top' }} />
    <motion.h3 initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: '-40px' }} transition={{ duration: 0.35, ease: 'easeOut' }} style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.01em', color: 'var(--color-text-primary)', lineHeight: 1, textTransform: 'uppercase' }}>
      {label}
    </motion.h3>
  </div>
);

const ACCENT_COLORS = ['#B02618', '#B02618', '#B02618', '#B02618', '#B02618', '#B02618'];

const ROW1_GROUPS = [
  { label: 'Frontend', skills: [{ name: 'React', iconKey: 'React' }, { name: 'Next.js', iconKey: 'Nextjs' }, { name: 'TypeScript', iconKey: 'TypeScript' }, { name: 'JavaScript', iconKey: 'JavaScript' }, { name: 'Tailwind CSS', iconKey: 'Tailwind' }, { name: 'CSS / SCSS', iconKey: 'CSS' }] },
  { label: 'Backend', skills: [{ name: 'Node.js', iconKey: 'Nodejs' }, { name: 'REST API', iconKey: 'RestAPI' }, { name: 'Postman', iconKey: 'Postman' }] },
  { label: 'Databases & DevOps', skills: [{ name: 'Docker', iconKey: 'Docker' }, { name: 'PostgreSQL', iconKey: 'PostgreSQL' }] },
];

const ROW2_GROUPS = [
  { label: 'AI / ML', skills: [{ name: 'TensorFlow', iconKey: 'TensorFlow' }, { name: 'PyTorch', iconKey: 'PyTorch' }, { name: 'Keras', iconKey: 'Keras' }, { name: 'Scikit-Learn', iconKey: 'ScikitLearn' }, { name: 'NLP', iconKey: 'NLP' }, { name: 'Streamlit', iconKey: 'Streamlit' }] },
  { label: 'Languages', skills: [{ name: 'Python', iconKey: 'Python' }, { name: 'C / C++', iconKey: 'CPlusPlus' }, { name: 'SQL', iconKey: 'SQL' }] },
  { label: 'Developer Tools', skills: [{ name: 'Git', iconKey: 'Git' }, { name: 'GitHub', iconKey: 'GitHub' }, { name: 'Figma', iconKey: 'Figma' }, { name: 'VS Code', iconKey: 'VSCode' }, { name: 'Linux', iconKey: 'Linux' }] },
];

const CategoryGroupCard = ({ group, gIdx }) => {
  const accent = ACCENT_COLORS[gIdx % ACCENT_COLORS.length];
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-5 sm:p-6 shadow-clay-sm dark:shadow-none flex flex-col h-full transition-all duration-300 hover:border-black/20 dark:hover:border-white/20">
      <CategoryHeading label={group.label} index={gIdx} />
      <div className="w-full h-[2px] rounded-full mt-1 mb-5" style={{ background: `linear-gradient(90deg, ${accent} 0%, rgba(176, 38, 24, 0.2) 60%, transparent 100%)` }} />
      <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }} initial="hidden" whileInView="show" viewport={{ once: false, margin: '-40px' }} className="grid grid-cols-3 gap-y-4 gap-x-2 justify-items-center items-start flex-grow">
        {group.skills.map((skill) => (
          <CircularSkillRing key={skill.name} name={skill.name} iconKey={skill.iconKey} emoji={skill.emoji} accentColor={accent} />
        ))}
      </motion.div>
    </div>
  );
};

const Stack = () => (
  <SectionWrapper id="stack" label="Technologies" title="My Stack" subtitle="Tools and technologies I work with across the full product lifecycle." alt>
    <div className="flex flex-col gap-10 lg:gap-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
        {ROW1_GROUPS.map((group, idx) => (
          <CategoryGroupCard key={group.label} group={group} gIdx={idx} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
        {ROW2_GROUPS.map((group, idx) => (
          <CategoryGroupCard key={group.label} group={group} gIdx={idx + 3} />
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default Stack;
