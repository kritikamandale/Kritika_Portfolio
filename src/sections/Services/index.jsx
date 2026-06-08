'use client';

import React, { useRef, useCallback } from 'react';
import { Rocket } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';

/* ─────────────────────────────────────────────
   SHARED STYLE HELPERS
───────────────────────────────────────────── */
const glassCard =
  'relative overflow-hidden rounded-[1.25rem] p-6 flex flex-col justify-between ' +
  'border border-[rgba(200,75,49,0.18)] dark:border-[rgba(200,75,49,0.25)] ' +
  '[background:rgba(255,248,244,0.55)] dark:[background:rgba(30,15,10,0.45)] ' +
  '[backdrop-filter:blur(16px)] [-webkit-backdrop-filter:blur(16px)] ' +
  'hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out';

const solidTerracotta =
  'relative overflow-hidden rounded-[1.25rem] p-6 flex flex-col justify-between ' +
  'bg-[#C84B31] ' +
  'hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out';

const solidAmber =
  'relative overflow-hidden rounded-[1.25rem] p-6 flex flex-col justify-between ' +
  'bg-[#F2C078] ' +
  'hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out';

/* ─────────────────────────────────────────────
   PILL BADGE
───────────────────────────────────────────── */
const Pill = ({ children, className = '' }) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-xs md:text-sm font-semibold border ${className}`}
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
          <div className={`${glassCard} col-span-1 sm:col-span-3 lg:col-span-3 lg:row-span-2 z-10`}>
            <div>
              <h3 className="font-heading text-[2.5rem] md:text-[3rem] font-black leading-[1.05] text-[#1a0a06] dark:text-[#f5ede8]">
                Build AI<br />products<br />that ship<br />fast.
              </h3>
              <p className="mt-4 text-[13px] md:text-[14px] font-bold text-[#C84B31] tracking-wider uppercase">
                End-to-end delivery
              </p>
            </div>
            <div className="mt-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#C84B31] text-[#C84B31] px-5 py-2 text-[14px] font-bold hover:bg-[#C84B31] hover:text-white transition-colors duration-200"
              >
                Explore Work ✦
              </a>
            </div>
          </div>

          {/* ── CARD B ── solid terracotta, col-span-5 row-span-1 ── */}
          <div className={`${solidTerracotta} col-span-1 sm:col-span-3 lg:col-span-5 z-10`}>
            {/* subtle inner glow */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 blur-[60px] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-heading text-[2.25rem] md:text-[2.75rem] font-black text-white leading-[1.1]">
                Full-Stack AI{' '}
                <span className="italic text-[#F2C078]">Development.</span>
              </h3>
              <div className="mt-5 flex items-center gap-4 flex-wrap">
                <span className="text-[#F2C078] text-lg tracking-widest">★★★★★</span>
                <span className="text-white/80 text-[14px] md:text-[15px] font-semibold">
                  Build and deployed several AI products.
                </span>
              </div>
            </div>
          </div>

          {/* ── CARD C ── glass, col-span-4 row-span-1 ── */}
          <div className={`${glassCard} col-span-1 sm:col-span-3 lg:col-span-4 z-10`}>
            <div>
              <p className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-[#C84B31] mb-2">
                AI Chatbot Development
              </p>
              <h3 className="font-heading text-[1.25rem] md:text-[1.5rem] font-extrabold text-[#1a0a06] dark:text-[#f5ede8] leading-tight">
                Intelligent bots.<br />Real conversations.
              </h3>
            </div>
            <div className="mt-4 rounded-xl bg-white/60 dark:bg-black/20 p-4 text-[12px] md:text-[13px] font-medium space-y-2">
              <div className="bg-[#C84B31]/10 rounded-lg px-4 py-2 w-fit text-[#1a0a06] dark:text-[#f5ede8]">
                How can I automate support?
              </div>
              <div className="bg-[#C84B31] text-white rounded-lg px-4 py-2 w-fit ml-auto">
                I&apos;ll build you a custom AI bot →
              </div>
            </div>
          </div>

          {/* ── CARD D ── glass, col-span-5 row-span-1 ── */}
          <div className={`${glassCard} col-span-1 sm:col-span-3 lg:col-span-5 z-10`}>
            <div>
              <p className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-[#C84B31] mb-2">
                Workflow Automation
              </p>
              <h3 className="font-heading text-[1.35rem] md:text-[1.75rem] font-extrabold text-[#1a0a06] dark:text-[#f5ede8] leading-tight">
                Automate the repetitive.<br />Focus on what matters.
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {['Zapier-style', 'LLM Pipelines', 'Custom APIs'].map((tag) => (
                <Pill
                  key={tag}
                  className="bg-[#C84B31]/10 border-[#C84B31]/20 text-[#C84B31] dark:bg-[#C84B31]/20"
                >
                  {tag}
                </Pill>
              ))}
            </div>
          </div>

          {/* ── CARD E ── solid amber, col-span-2 row-span-1 ── */}
          <div className={`${solidAmber} col-span-1 sm:col-span-2 lg:col-span-2 z-10`}>
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/20 blur-[40px] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-heading text-[2rem] md:text-[2.5rem] font-black text-white leading-[1.05]">
                Ship<br />faster.
              </h3>
              <p className="mt-4 text-white/80 text-[13px] md:text-[14px] font-bold">
                Agile · MVP-first · Iterative
              </p>
            </div>
          </div>

          {/* ── CARD F ── glass, col-span-2 row-span-1 ── */}
          <div className={`${glassCard} col-span-1 sm:col-span-2 lg:col-span-2 z-10`}>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-widest text-[#C84B31] mb-1.5">
                Dashboard & Admin
              </p>
              <h3 className="font-heading text-[1.1rem] md:text-[1.3rem] font-bold text-[#1a0a06] dark:text-[#f5ede8] leading-tight">
                Data that drives decisions.
              </h3>
            </div>
            <div className="flex items-end gap-1.5 mt-4 h-12">
              {[40, 65, 50, 80, 70, 90].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-3 md:w-4 rounded-sm bg-[#C84B31] opacity-70 flex-1"
                />
              ))}
            </div>
          </div>

          {/* ── CARD G ── solid amber, col-span-3 row-span-2 ── */}
          <div className={`${solidAmber} col-span-1 sm:col-span-3 lg:col-span-3 z-10`}>
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white/20 blur-[50px] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-heading text-[2.2rem] md:text-[2.8rem] font-black text-white leading-[1.05]">
                Build with<br />AI.<br />Scale with<br />confidence.
              </h3>
            </div>
            <div className="relative z-10 mt-6 rounded-xl bg-white/20 p-4 text-[13px] md:text-[14px] text-white font-medium space-y-2.5">
              <div className="opacity-80">→ Generate API from schema</div>
              <div className="opacity-80">→ Deploy to Vercel in 1 click</div>
              <div className="font-bold text-white">✓ Done in 3 minutes.</div>
            </div>
          </div>

          {/* ── CARD H ── glass, col-span-3 row-span-1 ── */}
          <div className={`${glassCard} col-span-1 sm:col-span-3 lg:col-span-3 z-10`}>
            <div className="text-[4.5rem] md:text-[5.5rem] font-black leading-none text-[#C84B31]">4+</div>
            <div className="mt-2">
              <p className="font-heading text-[1.1rem] md:text-[1.3rem] font-bold text-[#1a0a06] dark:text-[#f5ede8] leading-tight">
                Hackathon wins &amp; National level hackathon Organizer
              </p>
              <p className="text-[12px] md:text-[13px] text-[#C84B31]/80 dark:text-[#C84B31]/70 mt-2 font-bold">
                IIT Delhi  · IIM Indore · Smart India Hackathon
              </p>
            </div>
          </div>

          {/* ── CARD I ── glass, col-span-3 row-span-1 ── */}
          <div className={`${glassCard} col-span-1 sm:col-span-3 lg:col-span-3 z-10`}>
            <div>
              <p className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-[#C84B31] mb-2">
                API Integration
              </p>
              <h3 className="font-heading text-[1.25rem] md:text-[1.6rem] font-extrabold text-[#1a0a06] dark:text-[#f5ede8] leading-tight">
                Connect anything.<br />Break nothing.
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {['REST', 'GraphQL', 'OpenAI', 'WebSockets'].map((tag) => (
                <Pill
                  key={tag}
                  className="bg-[#C84B31]/10 border-[#C84B31]/20 text-[#C84B31] dark:bg-[#C84B31]/20"
                >
                  {tag}
                </Pill>
              ))}
            </div>
          </div>

          {/* ── CARD J ── solid terracotta, col-span-3 row-span-1 ── */}
          <div className={`${solidTerracotta} col-span-1 sm:col-span-3 lg:col-span-3 z-10`}>
            <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-white/10 blur-[50px] pointer-events-none" />
            <Rocket className="absolute -bottom-4 -right-4 w-36 h-36 text-white opacity-10 -rotate-12 pointer-events-none" strokeWidth={1} />
            <div className="relative z-10">
              <h3 className="font-heading text-[1.8rem] md:text-[2.2rem] font-black text-white leading-[1.1]">
                AI-Powered<br />SaaS. Built<br />to grow.
              </h3>
              <p className="mt-4 text-[#F2C078] text-[14px] md:text-[15px] font-bold">
                → From MVP to production
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services;
