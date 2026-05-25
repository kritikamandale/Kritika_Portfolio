'use client';
// src/sections/Services/index.jsx
// ============================================================
// BENTO GRID SERVICES SECTION
// Premium, asymmetrical layout with mouse-tracking radial glow,
// card lift, and custom animated SVG icons per card.
// ============================================================

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';

// ── CUSTOM ANIMATED ICONS ───────────────────────────────────────────────

const IconGlobe = ({ isHovered }) => (
  <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    animate={isHovered ? { rotate: 180 } : { rotate: 0 }}
    transition={{ duration: 0.8, ease: "circOut" }}
    className="w-12 h-12 text-brand-orange"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </motion.svg>
);

const IconRocket = ({ isHovered }) => (
  <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    animate={isHovered ? { y: -6, x: 6, scale: 1.1 } : { y: 0, x: 0, scale: 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className="w-12 h-12 text-brand-orange"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </motion.svg>
);

const IconLightning = ({ isHovered }) => (
  <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    animate={isHovered ? { filter: "drop-shadow(0px 0px 8px rgba(224, 90, 71, 0.8))", scale: 1.1 } : { filter: "drop-shadow(0px 0px 0px rgba(224, 90, 71, 0))", scale: 1 }}
    transition={{ duration: 0.3 }}
    className="w-10 h-10 text-brand-orange"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </motion.svg>
);

const IconRobot = ({ isHovered }) => (
  <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    className="w-10 h-10 text-brand-orange"
  >
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="2" strokeLinecap="round" />
    <AnimatePresence>
      {isHovered && (
        <motion.rect x="7" y="15" width="2" height="2" fill="currentColor" stroke="none"
          initial={{ scaleY: 1 }} animate={{ scaleY: [1, 0, 1, 1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
      )}
      {isHovered && (
        <motion.rect x="15" y="15" width="2" height="2" fill="currentColor" stroke="none"
          initial={{ scaleY: 1 }} animate={{ scaleY: [1, 0, 1, 1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
      )}
    </AnimatePresence>
  </motion.svg>
);

const IconLoop = ({ isHovered }) => (
  <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    className="w-8 h-8 text-brand-orange"
  >
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
  </motion.svg>
);

const IconChain = ({ isHovered }) => (
  <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    animate={isHovered ? { scale: [1, 0.9, 1.1, 1] } : { scale: 1 }}
    transition={{ duration: 0.5 }}
    className="w-8 h-8 text-brand-orange"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </motion.svg>
);

const IconChart = ({ isHovered }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-brand-orange">
    <path d="M3 3v18h18" />
    <motion.path d="M18 17V9" animate={isHovered ? { y: [0, -4, 2, 0] } : { y: 0 }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} />
    <motion.path d="M13 17V5" animate={isHovered ? { y: [0, 4, -2, 0] } : { y: 0 }} transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse" }} />
    <motion.path d="M8 17v-3" animate={isHovered ? { y: [0, -2, 3, 0] } : { y: 0 }} transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }} />
  </svg>
);

const IconTrend = ({ isHovered }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-brand-orange">
    <path d="M3 3v18h18" />
    <motion.path d="m19 9-5 5-4-4-3 3" animate={isHovered ? { pathLength: [0, 1] } : { pathLength: 1 }} transition={{ duration: 1 }} />
  </svg>
);

// ── DATA MAPPING ────────────────────────────────────────────────────────

const SERVICES = [
  {
    title: 'Full-Stack Web Development',
    desc: 'End-to-end web applications built with React, Next.js, Node.js, and scalable backends.',
    icon: IconGlobe,
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    layout: 'vertical',
  },
  {
    title: 'AI-Powered SaaS Applications',
    desc: 'Build and deploy intelligent SaaS products with subscription-ready architecture.',
    icon: IconRocket,
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    layout: 'vertical',
  },
  {
    title: 'AI Automation Systems',
    desc: 'Automate repetitive workflows using intelligent agents and LLM-powered pipelines.',
    icon: IconLightning,
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    layout: 'horizontal',
  },
  {
    title: 'AI Chatbot Development',
    desc: 'Custom AI chatbots trained for your business, integrated into your website or product.',
    icon: IconRobot,
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    layout: 'horizontal',
  },
  {
    title: 'Workflow Automation',
    desc: 'Streamline business operations with smart automation that reduces manual effort.',
    icon: IconLoop,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    layout: 'vertical-small',
  },
  {
    title: 'API Integration',
    desc: 'Connect third-party services, AI APIs, and data sources into your existing systems.',
    icon: IconChain,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    layout: 'vertical-small',
  },
  {
    title: 'Dashboard & Admin Panels',
    desc: 'Clean, data-driven dashboards for monitoring, analytics, and internal operations.',
    icon: IconChart,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    layout: 'vertical-small',
  },
  {
    title: 'Data Visualisation Dashboards',
    desc: 'Interactive charts and visual analytics built with D3.js or Recharts.',
    icon: IconTrend,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    layout: 'vertical-small',
  },
];

// ── BENTO CARD WRAPPER ──────────────────────────────────────────────────

const BentoCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const IconComponent = service.icon;

  // Determine sizing classes based on layout type
  const isLarge = service.layout === 'vertical';
  const isHorizontal = service.layout === 'horizontal';
  const isSmall = service.layout === 'vertical-small';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex ${isHorizontal ? 'flex-col sm:flex-row items-start sm:items-center' : 'flex-col'} gap-6 
        bg-white dark:bg-[#111] border border-border-light dark:border-border-dark 
        rounded-2xl p-8 overflow-hidden 
        transition-all duration-300 ease-out
        hover:-translate-y-1.5 hover:shadow-[0_12px_40px_-15px_rgba(224,90,71,0.25)] 
        dark:hover:shadow-none hover:border-[#E05A47]/40 dark:hover:border-[#E05A47]/40
        ${service.colSpan} ${service.rowSpan} cursor-default`}
    >
      {/* Radial Hover Glow Background */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 dark:group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(224, 90, 71, 0.06),
              transparent 40%
            )
          `,
        }}
      />
      {/* Radial Hover Glow Border Highlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(224, 90, 71, 0.3),
              transparent 40%
            )
          `,
          WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E")`,
          maskImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Icon Container */}
      <div className={`relative z-10 shrink-0 flex items-center justify-center rounded-2xl 
        bg-[linear-gradient(135deg,rgba(224,90,71,0.1),rgba(224,90,71,0.02))] 
        dark:bg-[linear-gradient(135deg,rgba(224,90,71,0.15),rgba(224,90,71,0.05))] 
        border border-[#E05A47]/10 dark:border-[#E05A47]/20
        ${isLarge ? 'w-20 h-20 mb-2' : isHorizontal ? 'w-16 h-16' : 'w-14 h-14 mb-1'}`}
      >
        <IconComponent isHovered={isHovered} />
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col gap-2.5">
        <h3 className={`font-heading font-bold text-slate-800 dark:text-text-dark-primary leading-[1.2] tracking-[-0.02em]
          ${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}
        >
          {service.title}
        </h3>
        <p className={`text-slate-500 dark:text-text-dark-secondary leading-[1.6]
          ${isLarge ? 'text-base sm:text-lg max-w-sm' : 'text-sm'}`}
        >
          {service.desc}
        </p>
      </div>
    </motion.div>
  );
};

// ── MAIN COMPONENT ──────────────────────────────────────────────────────

const Services = () => {
  return (
    <SectionWrapper
      id="services"
      label="Domains"
      title="What I Build"
      subtitle="A breakdown of the domains I work across and the kind of problems I enjoy solving"
      alt
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 max-w-7xl mx-auto w-full">
        {SERVICES.map((service, i) => (
          <BentoCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Services;
