'use client';

import React, { useRef, useCallback, useState } from 'react';
import Image from 'next/image';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import { GithubOutlineIcon, LinkedinIcon, GithubFilledIcon, ReactLogoIcon } from '../../components/Icons/BrandIcons';

/* ─────────────────────────────────────────────
   SHARED STYLE HELPERS
───────────────────────────────────────────── */
// Shared corner radius for every top-level bento card — keep in sync across all cells.
const cardRadius = 'rounded-[1.75rem]';

const glassCard =
  `relative overflow-hidden ${cardRadius} p-5 sm:p-6 flex flex-col justify-between ` +
  'border border-[rgba(58,36,24,0.15)] dark:border-[rgba(58,36,24,0.20)] ' +
  '[background:rgba(255,255,255,0.60)] dark:[background:rgba(28,16,8,0.45)] ' +
  '[backdrop-filter:blur(16px)] [-webkit-backdrop-filter:blur(16px)] ' +
  'hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out';

const solidTerracotta =
  `relative overflow-hidden ${cardRadius} p-4 sm:p-5 flex flex-col justify-between ` +
  'bg-[#B02618] ' +
  'hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out';

const solidAmber =
  `relative overflow-hidden ${cardRadius} p-5 sm:p-6 flex flex-col justify-between ` +
  'bg-[#F5DE8F] ' +
  'hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out';

const solidCoral =
  `relative overflow-hidden ${cardRadius} p-5 sm:p-6 flex flex-col justify-start gap-3 ` +
  'bg-[#3A2418] ' +
  'hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out';

/* ─────────────────────────────────────────────
   SOCIAL ICONS (monochrome → brand colour on hover)
───────────────────────────────────────────── */
const SocialSvg = ({ children }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/kritikamandale',
    color: '#1a0a06',
    icon: <GithubOutlineIcon className="w-9 h-9 shrink-0" strokeWidth={1.6} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/kritikamandale',
    color: '#0A66C2',
    icon: <LinkedinIcon className="w-9 h-9 shrink-0" strokeWidth={1.6} />,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/kritikamandale',
    color: '#1DA1F2',
    icon: (
      <SocialSvg>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </SocialSvg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/Kritikalog',
    color: '#26A5E4',
    icon: (
      <SocialSvg>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </SocialSvg>
    ),
  },
  {
    label: 'Hashnode',
    href: 'https://hashnode.com/@kritikam',
    color: '#2962FF',
    icon: (
      <SocialSvg>
        <path d="m22.351 8.019-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z" />
      </SocialSvg>
    ),
  },
  {
    label: 'Email',
    href: '#contact',
    color: '#EA4335',
    icon: (
      <SocialSvg>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </SocialSvg>
    ),
  },
];

// Single social link — monochrome, turns brand colour on hover, clickable
const SocialLink = ({ social }) => {
  const isInternal = social.href.startsWith('#') || social.href.startsWith('mailto:');
  return (
    <a
      href={social.href}
      target={isInternal ? undefined : '_blank'}
      rel={isInternal ? undefined : 'noopener noreferrer'}
      aria-label={social.label}
      title={social.label}
      style={{ '--brand': social.color }}
      className="w-full aspect-square max-h-[5.625rem] flex items-center justify-center rounded-[3rem] bg-white/70 dark:bg-white/[0.05] border border-[rgba(176,38,24,0.15)] dark:border-white/[0.08] shadow-sm text-[#8A6858] dark:text-[#9A7A60] transition-all duration-300 ease-out hover:-translate-y-1 hover:!bg-[var(--brand)] hover:!border-[var(--brand)] hover:!text-white hover:shadow-[0_8px_20px_rgba(30,20,15,0.2)]"
    >
      {social.icon}
    </a>
  );
};

/* ─────────────────────────────────────────────
   TECH CHIP ICONS (subset — self-contained, no cross-file deps)
───────────────────────────────────────────── */
const TechIcon = ({ children, viewBox = '0 0 128 128' }) => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

const TECH_CHIPS = [
  {
    name: 'Next.js',
    icon: (
      <TechIcon viewBox="0 0 24 24">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.057.5-.057z" fill="currentColor" />
      </TechIcon>
    ),
  },
  {
    name: 'React',
    icon: <ReactLogoIcon className="w-3.5 h-3.5 shrink-0" />,
  },
  {
    name: 'JavaScript',
    icon: (
      <TechIcon viewBox="0 0 400 400">
        <rect width="400" height="400" fill="#F7DF1E" rx="50" />
        <path d="M318 328c7 13 17 22 34 22 14 0 23-7 23-17 0-12-9-16-25-22l-9-4c-25-10-41-23-41-50 0-25 19-44 49-44 21 0 36 7 47 26l-26 17c-6-10-12-14-21-14-10 0-16 6-16 14 0 10 6 14 20 20l9 4c29 12 46 25 46 53 0 30-24 46-56 46-31 0-51-15-61-34zm-118 3c5 10 10 18 21 18 11 0 17-4 17-21V168h34v162c0 35-20 51-50 51-27 0-43-14-51-31z" />
      </TechIcon>
    ),
  },
  {
    name: 'SQL',
    icon: (
      <TechIcon viewBox="0 0 32 32">
        <path fill="#336791" d="M28.3 14.2c-.4-3.7-2.1-6.5-5.1-8.3-1-.6-2.1-1-3.2-1.3-.1-.9-.4-2.1-1.3-3-.8-.8-1.9-1.2-3.2-1.2-1.1 0-2.1.3-2.9.9-.6-.1-1.2-.1-1.8-.1C5.8 1.2 2.1 5.4 2.1 10.7c0 2.5.8 4.8 2.3 6.4 1 1.1 2.4 1.8 3.8 2 .1 1.3.7 2.7 1.8 3.7 1.2 1 2.6 1.5 4.1 1.5.5 0 1-.1 1.5-.2.5.5 1 .9 1.6 1.2.9.5 2 .8 3.1.8 1.4 0 2.7-.4 3.7-1.1.9-.6 1.5-1.5 1.8-2.5 1.3-.3 2.5-1 3.3-2 1-1.2 1.5-2.8 1.5-4.5 0-.6-.1-1.3-.3-1.8h-.3z" />
      </TechIcon>
    ),
  },
  {
    name: 'Python',
    icon: (
      <TechIcon viewBox="0 0 32 32">
        <path fill="#387EB8" d="M15.885 2.1c-7.1 0-6.651 3.07-6.651 3.07v3.19h6.752v1H6.545S2 8.8 2 16.005s4.013 6.912 4.013 6.912H8.33v-3.361s-.13-4.013 3.9-4.013h6.765s3.769.06 3.769-3.64V5.14s.572-3.04-6.849-3.04zm-3.74 1.96a1.094 1.094 0 11-1.09 1.09 1.097 1.097 0 011.09-1.09z" />
        <path fill="#FFC331" d="M16.085 29.91c7.1 0 6.651-3.07 6.651-3.07v-3.19h-6.752v-1h9.441S30 23.22 30 16.015s-4.013-6.912-4.013-6.912H23.67v3.361s.13 4.013-3.9 4.013h-6.765s-3.769-.06-3.769 3.64v6.663s-.572 3.13 6.849 3.13zm3.74-1.96a1.094 1.094 0 111.09-1.09 1.097 1.097 0 01-1.09 1.09z" />
      </TechIcon>
    ),
  },
  {
    name: 'CSS',
    icon: (
      <TechIcon>
        <path fill="#264de4" d="M3.4 0L0 128h128L124.6 0z" />
        <path fill="#2965f1" d="M64 116.8l50.3-14 6.8-76H64z" />
        <path fill="#ebebeb" d="M64 52H38.7l1.2 13.4H64V52zM64 90.8l-.3.1-14.7-4-1-11H34.2l2 22.2 27.5 7.6.3-.1z" />
        <path fill="#fff" d="M63.9 52h25.3l-2.4 26.8-22.9 6.3V71.7l13-3.6 1-10.7H63.9V52zm0 38.8v13.7l27.6-7.6 2.3-25.2H80.5l-1.2 13.6-15.4 4.2z" />
      </TechIcon>
    ),
  },
  {
    name: 'GitHub',
    icon: <GithubFilledIcon className="w-3.5 h-3.5 shrink-0" />,
  },
];

/* ─────────────────────────────────────────────
   PROJECT SHOWCASE CARD (3 thumbnails, hover-lift)
───────────────────────────────────────────── */
const SHOWCASE_PROJECTS = [
  { name: 'Skinest', image: '/SkinAnalysis.png' },
  { name: 'Milap', image: '/Milap.png' },
  { name: 'SnapVerdict', image: '/SnapVerdict.png' },
  { name: 'SecureID', image: '/secureid.png' },
];

const ProjectShowcaseCard = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className={`${glassCard} sm:col-span-2 bento:col-start-2 bento:col-span-2 bento:row-start-1 z-10`}>
      <span className="inline-block px-3 py-1 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border bg-[#B02618]/10 border-[#B02618]/20 text-[#B02618] dark:bg-[#B02618]/20 w-fit">
        Selected work
      </span>
      <div className="flex items-center mt-5 h-[7.625rem] md:h-[9.125rem]">
        {SHOWCASE_PROJECTS.map((project, i) => {
          const isHovered = hovered === i;
          const isDimmed = hovered !== null && !isHovered;
          return (
            <motion.a
              key={project.name}
              href="#projects"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className={`relative flex-1 min-w-0 h-full rounded-[0.8rem] overflow-hidden border border-[rgba(176,38,24,0.2)] dark:border-[rgba(176,38,24,0.3)] bg-[#f3ece4] dark:bg-[#1b120c] cursor-pointer shadow-[0_6px_16px_rgba(30,20,15,0.18)] ${i > 0 ? '-ml-[6%]' : ''}`}
              style={{ zIndex: isHovered ? 30 : SHOWCASE_PROJECTS.length - i }}
              animate={{
                scale: isHovered ? 1.18 : 1,
                y: isHovered ? -18 : 0,
                filter: isDimmed ? 'brightness(0.82)' : 'brightness(1)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 120px, 180px"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
              />
              <span className="absolute bottom-0 left-0 right-0 px-2 pb-1.5 text-[0.625rem] md:text-[0.75rem] font-bold text-white text-center leading-tight">
                {project.name}
              </span>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SERVICES COMPONENT
───────────────────────────────────────────── */
const Services = () => {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  /* Mouse-tracking radial glow */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  /* useMotionTemplate properly composes MotionValues into a reactive string */
  const glowBackground = useMotionTemplate`radial-gradient(500px circle at ${springX}px ${springY}px, rgba(176,38,24,0.08), transparent 70%)`;

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
          What I Build
        </>
      }
      subtitle="A breakdown of the domains I work across and the kind of problems I enjoy solving."
    >
      {/* Section background gradient */}
      <div
        ref={sectionRef}
        className="relative w-full mt-4 rounded-[2rem] p-4 sm:p-5
          [background:linear-gradient(135deg,#FFFFFF_0%,#FBF6E8_100%)]
          dark:[background:linear-gradient(135deg,#1c1008_0%,#251608_100%)]"
        onMouseMove={handleMouseMove}
      >
        {/* Mouse-tracking radial glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[2rem] z-0"
          style={{
            background: glowBackground,
          }}
        />

        {/* ── BENTO GRID ── */}
        <div
          className="
            grid gap-4 sm:gap-5
            grid-cols-1
            sm:grid-cols-2
            bento:grid-cols-[1fr_1.05fr_1.15fr]
            relative z-10
          "
        >
          {/* ── CELL 1 ── name / tagline — glass, col1 row1 ── */}
          <div className={`${glassCard} bento:col-start-1 bento:row-start-1 z-10`}>
            <div className="flex flex-col justify-center h-full">
              <h3
                className="font-heading text-[2.75rem] sm:text-[3.25rem] md:text-[3.9rem] font-black leading-[1.03] bg-gradient-to-r from-[#B02618] to-[#3A2418] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(176,38,24,0.4)]"
              >
                Kritika<br />Mandale
              </h3>
              <p className="mt-5 text-[0.875rem] md:text-[0.9375rem] font-bold text-[#B02618] tracking-wider uppercase">
                Web and AI Developer
              </p>
            </div>
          </div>

          {/* ── CELL 2 ── project showcase (hover-lift thumbnails) ── */}
          <ProjectShowcaseCard />

          {/* ── CELL 3 ── contact CTA + capability CTA, col1 rows2-3 (split in two) ── */}
          <div className="bento:col-start-1 bento:row-start-2 bento:row-span-2 z-10 flex flex-col gap-4 sm:gap-5 overflow-hidden min-w-0">
            {/* Upper — Contact Me */}
            <div className={`${solidCoral} flex-1`}>
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/20 blur-[40px] pointer-events-none" />
              {/* Background icon — large faint paper-plane, purely decorative */}
              <svg
                className="absolute -bottom-6 -right-6 w-40 h-40 text-white/10 rotate-[10deg] pointer-events-none z-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              <div className="relative z-10">
                <h3 className="font-heading text-[1.3rem] sm:text-[1.5rem] md:text-[1.7rem] font-black text-white leading-[1.15]">
                  Let&apos;s build something together
                </h3>
                <p className="mt-2 text-[0.8125rem] md:text-[0.875rem] text-white/85 font-medium">
                  Have a project in mind? Let&apos;s talk.
                </p>
              </div>
              <a
                href="#contact"
                className="relative z-10 flex-1 flex items-center justify-center gap-3 w-full whitespace-nowrap text-[2.125rem] md:text-[2.625rem] font-black text-white hover:text-[#F5DE8F] hover:scale-[1.03] transition-all duration-300 ease-out"
              >
                Contact Me →
              </a>
            </div>

            {/* Lower — capability CTA (unchanged content) */}
            <div className={`${solidAmber} flex-1`}>
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white/20 blur-[50px] pointer-events-none" />
              <div className="relative z-10">
                <h3 className="font-heading text-[1.4rem] sm:text-[1.7rem] md:text-[2.1rem] font-black text-[#3A2418] leading-[1.05]">
                  Build with<br />AI.<br />Scale with<br />confidence.
                </h3>
              </div>
              <div className="relative z-10 mt-3 rounded-xl bg-[#3A2418]/15 p-3 text-[0.75rem] md:text-[0.8125rem] text-[#3A2418] font-medium space-y-1.5">
                <div className="opacity-80">→ Generate from schema</div>
                <div className="opacity-80">→ Deploy in one click</div>
                <div className="font-bold text-white">✓ Done in minutes.</div>
              </div>
            </div>
          </div>

          {/* ── CELL 4+5 ── portrait + location, col2 rows2-3 (grouped so the
               location card fills the remaining height with no gap and its
               bottom edge lines up with col1/col3) ── */}
          <div className="bento:col-start-2 bento:row-start-2 bento:row-span-2 z-10 flex flex-col gap-4 sm:gap-5 overflow-hidden min-w-0">
            {/* portrait — static photo */}
            <motion.div
              className={`relative overflow-hidden ${cardRadius} border border-[rgba(176,38,24,0.18)] dark:border-[rgba(176,38,24,0.25)] aspect-square shrink-0 bg-[#e2d5c3] dark:bg-[#2a180f]`}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Image
                src="/profile.webp"
                alt="Kritika Mandale"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 340px, 420px"
              />
            </motion.div>

            {/* location — dark card w/ map + scan line, fills remaining height */}
            <div className={`relative overflow-hidden ${cardRadius} p-8 flex-1 text-[#FDFAF0] flex flex-col justify-between min-h-[10.3125rem]`}>
              {/* vintage world map background */}
              <Image
                src="/world.jpg"
                alt=""
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 340px, 420px"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 pointer-events-none" />

              {/* faint dot-grid overlay */}
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none"
                viewBox="0 0 400 200"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                aria-hidden="true"
              >
                {Array.from({ length: 20 }).map((_, row) =>
                  Array.from({ length: 40 }).map((_, col) => {
                    const x = col * 10 + 5;
                    const y = row * 10 + 5;
                    const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
                    const show = seed - Math.floor(seed) > 0.55;
                    return show ? (
                      <circle key={`${row}-${col}`} cx={x} cy={y} r="1.1" fill="#FDFAF0" />
                    ) : null;
                  })
                )}
              </svg>

              <div className="relative z-10">
                <h3 className="font-heading text-[1.3rem] md:text-[1.5rem] font-bold text-[#FDFAF0]">
                  Nagpur, Maharashtra
                </h3>
                <p className="text-[0.6875rem] md:text-[0.75rem] text-[#FDFAF0]/65 mt-1">
                  21.1458° N, 79.0882° E · GMT+5:30
                </p>
              </div>

              <div className="relative z-10 mt-4 space-y-2">
                <div className="flex items-center gap-2 text-[0.75rem] text-[#FDFAF0]/65">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5DE8F] shrink-0" />
                  Open to remote & on-site roles
                </div>
                <div className="flex items-center gap-2 text-[0.75rem] text-[#FDFAF0]/65">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5DE8F] shrink-0" />
                  Available for hackathons & collabs
                </div>
              </div>

              {!reduceMotion && (
                <motion.div
                  className="absolute top-0 bottom-0 w-[0.125rem] bg-[#F5DE8F] pointer-events-none"
                  style={{ boxShadow: '0 0 12px 2px rgba(245,222,143,0.85), 0 0 28px 6px rgba(176,38,24,0.35)' }}
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </div>
          </div>

          {/* ── CELL 6+7 ── terracotta text (cut to content) + socials fill the rest, col3 rows2-3 ── */}
          <div className="bento:col-start-3 bento:row-start-2 bento:row-span-2 z-10 flex flex-col gap-3 overflow-hidden min-w-0">
          <div className={`${solidTerracotta} shrink-0`}>
            <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-white/10 blur-[50px] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-heading text-[1.6rem] sm:text-[1.8rem] md:text-[2.2rem] font-black text-white leading-[1.1]">
                Full-stack AI development.
              </h3>
              <p className="mt-3 text-[0.8125rem] md:text-[0.875rem] text-white/85 leading-relaxed">
                Apps, websites, and automations — built to survive contact with real users.
              </p>

              {/* tech marquee */}
              <div
                className="relative mt-4 overflow-hidden group"
                style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
              >
                {reduceMotion ? (
                  <div className="flex flex-wrap gap-2.5" role="list" aria-label="Technologies">
                    {TECH_CHIPS.map((chip) => (
                      <span
                        key={chip.name}
                        role="listitem"
                        className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] rounded-[1.25rem] px-4 py-1.5 text-[0.8125rem] text-white"
                      >
                        {chip.icon}
                        {chip.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="sr-only" role="list" aria-label="Technologies">
                      {TECH_CHIPS.map((chip) => (
                        <span key={chip.name} role="listitem">{chip.name}</span>
                      ))}
                    </div>
                    <div
                      className="flex gap-2.5 w-max animate-[marqueeLeft_14s_linear_infinite] group-hover:pause-animation"
                      aria-hidden="true"
                    >
                      {[...TECH_CHIPS, ...TECH_CHIPS].map((chip, i) => (
                        <span
                          key={`${chip.name}-${i}`}
                          className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] rounded-[1.25rem] px-4 py-1.5 text-[0.8125rem] text-white whitespace-nowrap"
                        >
                          {chip.icon}
                          {chip.name}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 text-[0.75rem] text-white/85">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5DE8F] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5DE8F]" />
                </span>
                Open to hackathons and collaboration
              </div>

              <p className="mt-5 text-[0.8125rem] md:text-[0.875rem] text-white/80 leading-relaxed max-w-[38ch]">
                Active hackathon competitor with 4+ wins, always down to team up on a bold idea and ship it fast.
              </p>
            </div>
          </div>

            {/* socials — fills the remaining space below the red card, no extra grid growth */}
            <div id="connect" className="flex-1 flex flex-col justify-center gap-4 min-h-0 scroll-mt-24">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border bg-[#B02618]/10 border-[#B02618]/20 text-[#B02618] dark:bg-[#B02618]/20 w-fit">
                  Let&apos;s connect
                </span>
                <p className="mt-2 text-[0.75rem] md:text-[0.8125rem] text-[#5C3D2C] dark:text-[#D4B896]">
                  Find me across the web & reach out anytime.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {SOCIALS.map((social) => (
                  <SocialLink key={social.label} social={social} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services;
