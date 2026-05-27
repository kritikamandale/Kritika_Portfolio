'use client';

import React, { useRef, useCallback } from 'react';
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
          className="
            grid gap-3
            grid-cols-1
            sm:grid-cols-6
            lg:grid-cols-12
            relative z-10
          "
        >
          {/* ── CARD A ── glass, col-span-3 row-span-2 ── */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            {...hoverProps}
            className={`${glassCard} col-span-1 sm:col-span-3 lg:col-span-3 lg:row-span-2 z-10`}
          >
            <div>
              <h3 className="font-heading text-[2rem] font-black leading-[1.1] text-[#1a0a06] dark:text-[#f5ede8]">
                Build AI<br />products<br />that ship<br />fast.
              </h3>
              <p className="mt-3 text-[12px] font-semibold text-[#C84B31] tracking-wide uppercase">
                End-to-end delivery
              </p>
            </div>
            <div className="mt-6">
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#C84B31] text-[#C84B31] px-4 py-1.5 text-[13px] font-semibold hover:bg-[#C84B31] hover:text-white transition-colors duration-200"
              >
                Explore Work ✦
              </a>
            </div>
          </motion.div>

          {/* ── CARD B ── solid terracotta, col-span-5 row-span-1 ── */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            {...hoverProps}
            className={`${solidTerracotta} col-span-1 sm:col-span-3 lg:col-span-5 z-10`}
          >
            {/* subtle inner glow */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 blur-[60px] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-heading text-[1.75rem] font-black text-white leading-[1.15]">
                Full-Stack AI{' '}
                <span className="italic text-[#F2C078]">Development.</span>
              </h3>
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                <span className="text-[#F2C078] text-base tracking-widest">★★★★★</span>
                <span className="text-white/70 text-[12px] font-medium">
                  Hackathon Winner · IIT Delhi Top 3
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── CARD C ── glass, col-span-4 row-span-1 ── */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            {...hoverProps}
            className={`${glassCard} col-span-1 sm:col-span-3 lg:col-span-4 z-10`}
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#C84B31] mb-1.5">
                AI Chatbot Development
              </p>
              <h3 className="font-heading text-[1rem] font-bold text-[#1a0a06] dark:text-[#f5ede8] leading-snug">
                Intelligent bots.<br />Real conversations.
              </h3>
            </div>
            <motion.div
              variants={mockupVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-3 rounded-xl bg-white/60 dark:bg-black/20 p-3 text-[11px] space-y-1.5"
            >
              <div className="bg-[#C84B31]/10 rounded-lg px-3 py-1.5 w-fit text-[#1a0a06] dark:text-[#f5ede8]">
                How can I automate support?
              </div>
              <div className="bg-[#C84B31] text-white rounded-lg px-3 py-1.5 w-fit ml-auto">
                I&apos;ll build you a custom AI bot →
              </div>
            </motion.div>
          </motion.div>

          {/* ── CARD D ── glass, col-span-5 row-span-1 ── */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            {...hoverProps}
            className={`${glassCard} col-span-1 sm:col-span-3 lg:col-span-5 z-10`}
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#C84B31] mb-1.5">
                Workflow Automation
              </p>
              <h3 className="font-heading text-[1.1rem] font-bold text-[#1a0a06] dark:text-[#f5ede8] leading-snug">
                Automate the repetitive.<br />Focus on what matters.
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['Zapier-style', 'LLM Pipelines', 'Custom APIs'].map((tag) => (
                <Pill
                  key={tag}
                  className="bg-[#C84B31]/10 border-[#C84B31]/20 text-[#C84B31] dark:bg-[#C84B31]/20"
                >
                  {tag}
                </Pill>
              ))}
            </div>
          </motion.div>

          {/* ── CARD E ── solid amber, col-span-2 row-span-1 ── */}
          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            {...hoverProps}
            className={`${solidAmber} col-span-1 sm:col-span-2 lg:col-span-2 z-10`}
          >
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/20 blur-[40px] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-heading text-[1.6rem] font-black text-white leading-[1.1]">
                Ship<br />faster.
              </h3>
              <p className="mt-3 text-white/75 text-[11px] font-semibold">
                Agile · MVP-first · Iterative
              </p>
            </div>
          </motion.div>

          {/* ── CARD F ── glass, col-span-2 row-span-1 ── */}
          <motion.div
            custom={5}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            {...hoverProps}
            className={`${glassCard} col-span-1 sm:col-span-2 lg:col-span-2 z-10`}
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#C84B31] mb-1">
                Dashboard & Admin Panels
              </p>
              <h3 className="font-heading text-[0.9rem] font-bold text-[#1a0a06] dark:text-[#f5ede8] leading-snug">
                Data that drives decisions.
              </h3>
            </div>
            <motion.div
              variants={mockupVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-end gap-1 mt-3 h-10"
            >
              {[40, 65, 50, 80, 70, 90].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-3 rounded-sm bg-[#C84B31] opacity-70 flex-1"
                />
              ))}
            </motion.div>
          </motion.div>

          {/* ── CARD G ── solid amber, col-span-3 row-span-2 ── */}
          <motion.div
            custom={6}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            {...hoverProps}
            className={`${solidAmber} col-span-1 sm:col-span-3 lg:col-span-3 z-10`}
          >
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white/20 blur-[50px] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-heading text-[1.65rem] font-black text-white leading-[1.1]">
                Build with<br />AI.<br />Scale with<br />confidence.
              </h3>
            </div>
            <motion.div
              variants={mockupVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative z-10 mt-4 rounded-xl bg-white/20 p-3 text-[11px] text-white space-y-2"
            >
              <div className="opacity-70">→ Generate API from schema</div>
              <div className="opacity-70">→ Deploy to Vercel in 1 click</div>
              <div className="font-semibold">✓ Done in 3 minutes.</div>
            </motion.div>
          </motion.div>

          {/* ── CARD H ── glass, col-span-3 row-span-1 ── */}
          <motion.div
            custom={7}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            {...hoverProps}
            className={`${glassCard} col-span-1 sm:col-span-3 lg:col-span-3 z-10`}
          >
            <div className="text-[3.5rem] font-black leading-none text-[#C84B31]">4+</div>
            <div>
              <p className="font-heading text-[0.95rem] font-bold text-[#1a0a06] dark:text-[#f5ede8] leading-snug mt-1">
                Hackathon wins &amp; top placements
              </p>
              <p className="text-[11px] text-[#C84B31]/70 dark:text-[#C84B31]/60 mt-1 font-medium">
                IIT Delhi · Smart India · State Level
              </p>
            </div>
          </motion.div>

          {/* ── CARD I ── glass, col-span-3 row-span-1 ── */}
          <motion.div
            custom={8}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            {...hoverProps}
            className={`${glassCard} col-span-1 sm:col-span-3 lg:col-span-3 z-10`}
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#C84B31] mb-1.5">
                API Integration
              </p>
              <h3 className="font-heading text-[1.05rem] font-bold text-[#1a0a06] dark:text-[#f5ede8] leading-snug">
                Connect anything.<br />Break nothing.
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['REST', 'GraphQL', 'OpenAI', 'WebSockets'].map((tag) => (
                <Pill
                  key={tag}
                  className="bg-[#C84B31]/10 border-[#C84B31]/20 text-[#C84B31] dark:bg-[#C84B31]/20"
                >
                  {tag}
                </Pill>
              ))}
            </div>
          </motion.div>

          {/* ── CARD J ── solid terracotta, col-span-3 row-span-1 ── */}
          <motion.div
            custom={9}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            {...hoverProps}
            className={`${solidTerracotta} col-span-1 sm:col-span-3 lg:col-span-3 z-10`}
          >
            <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-white/10 blur-[50px] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-heading text-[1.45rem] font-black text-white leading-[1.15]">
                AI-Powered<br />SaaS. Built<br />to grow.
              </h3>
              <p className="mt-3 text-[#F2C078] text-[12px] font-semibold">
                → From MVP to production
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services;
