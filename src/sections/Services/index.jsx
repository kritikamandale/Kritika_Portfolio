'use client';

import React, { useRef, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';

/* ─────────────────────────────────────────────
   CARD VARIANTS
───────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      delay: i * 0.07,
    },
  }),
};

const mockupVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.3 },
  },
};

/* ─────────────────────────────────────────────
   SHARED STYLE HELPERS
───────────────────────────────────────────── */
const glassCard =
  'relative overflow-hidden rounded-[1.25rem] p-5 flex flex-col justify-between ' +
  'border border-[rgba(200,75,49,0.18)] dark:border-[rgba(200,75,49,0.25)] ' +
  '[background:rgba(255,248,244,0.55)] dark:[background:rgba(30,15,10,0.45)] ' +
  '[backdrop-filter:blur(16px)] [-webkit-backdrop-filter:blur(16px)]';

const solidTerracotta =
  'relative overflow-hidden rounded-[1.25rem] p-5 flex flex-col justify-between ' +
  'bg-[#C84B31]';

const solidAmber =
  'relative overflow-hidden rounded-[1.25rem] p-5 flex flex-col justify-between ' +
  'bg-[#F2C078]';

/* ─────────────────────────────────────────────
   PILL BADGE
───────────────────────────────────────────── */
const Pill = ({ children, className = '' }) => (
  <span
    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${className}`}
  >
    {children}
  </span>
);

/* ─────────────────────────────────────────────
   SERVICES DATA
───────────────────────────────────────────── */
const services = [
  {
    icon: "ti-layout",  // Tabler icon
    title: "Full-Stack Web Development",
    description: "End-to-end React + Node.js applications — from UI design to REST API to database. I handle the full product, not just one layer.",
    tags: ["React", "Node.js", "PostgreSQL", "Vercel"],
    proof: "Delivered at Trust Fintech as Full Stack Project Intern"
  },
  {
    icon: "ti-brain",
    title: "AI/ML Integration",
    description: "I embed ML models, LLMs, and AI APIs directly into web products — not as demos, but as production features users actually interact with.",
    tags: ["Python", "TensorFlow", "LangChain", "OpenAI API"],
    proof: "Currently at Matverse Vision Pvt. Ltd."
  },
  {
    icon: "ti-plug",
    title: "API Development & Integration",
    description: "Custom REST and GraphQL APIs, third-party integrations (OpenAI, Firebase, payment gateways), and microservices architecture.",
    tags: ["Express.js", "REST", "GraphQL", "Docker"],
    proof: "SECUREID microservices architecture"
  },
  {
    icon: "ti-rocket",
    title: "Hackathon & MVP Development",
    description: "I build working, deployable MVPs under extreme time constraints. 4 national hackathon wins across IIT Delhi, IIM Indore, and NASA Space Apps.",
    tags: ["Fast delivery", "End-to-end", "Deployable"],
    proof: "4+ wins at national level competitions"
  }
];

/* ─────────────────────────────────────────────
   SERVICES COMPONENT
───────────────────────────────────────────── */
const Services = () => {
  const sectionRef = useRef(null);

  /* Mouse-tracking radial glow */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const handleMouseMove = useCallback(
    (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const hoverProps = {
    whileHover: { y: -4, scale: 1.01 },
    transition: { duration: 0.22, ease: 'easeOut' },
  };

  return (
    <SectionWrapper
      id="services"
      label="DOMAINS"
      title={
        <>
          What I Build <span className="text-[#E05A47]">✳</span>
        </>
      }
      subtitle="A breakdown of the domains I work across and the kind of problems I enjoy solving."
    >
      {/* Section background gradient */}
      <div
        ref={sectionRef}
        className="relative w-full mt-4 rounded-[2rem] p-4 sm:p-5
          [background:linear-gradient(135deg,#FDF8F5_0%,#F5E6DC_100%)]
          dark:[background:linear-gradient(135deg,#140a07_0%,#1e100a_100%)]"
        onMouseMove={handleMouseMove}
      >
        {/* Mouse-tracking radial glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[2rem] z-0"
          style={{
            background: `radial-gradient(500px circle at ${springX}px ${springY}px, rgba(200,75,49,0.08), transparent 70%)`,
          }}
        />

        {/* ── BENTO GRID ── */}
        <div
        <div
          className="
            grid gap-4
            grid-cols-1
            md:grid-cols-2
            relative z-10
          "
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              {...hoverProps}
              className={`${glassCard} flex flex-col gap-4 z-10`}
            >
              <div className="flex flex-col gap-2">
                <i className={`ti ${service.icon} text-3xl text-[#C84B31] mb-2`}></i>
                <h3 className="font-heading text-xl font-bold text-[#1a0a06] dark:text-[#f5ede8]">
                  {service.title}
                </h3>
                <p className="text-[14px] text-text-secondary dark:text-text-dark-secondary leading-[1.6]">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-auto pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <Pill
                      key={tag}
                      className="bg-[#C84B31]/10 border-[#C84B31]/20 text-[#C84B31] dark:bg-[#C84B31]/20"
                    >
                      {tag}
                    </Pill>
                  ))}
                </div>
                
                <div className="border-t border-[#C84B31]/10 dark:border-[#C84B31]/20 pt-3">
                  <p className="text-[11px] font-semibold tracking-wide text-[#C84B31]/70 dark:text-[#C84B31]/60 uppercase">
                    Proof: {service.proof}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 mb-4 text-center relative z-10"
        >
          <p className="text-text-secondary dark:text-text-dark-secondary text-[16px] font-medium">
            Have a project in mind?{' '}
            <a href="#contact" className="text-[#C84B31] font-bold hover:underline underline-offset-4 transition-all">
              Let&apos;s talk →
            </a>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Services;
