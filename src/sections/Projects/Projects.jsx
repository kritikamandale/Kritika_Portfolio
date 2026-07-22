'use client';
// src/sections/Projects/Projects.jsx
// ============================================================
// PROJECTS SECTION — Asymmetric Bento Grid
// ── Edit: PROJECTS array below ─────────────────────────────
// ============================================================

import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import RevealGroup from '../../components/RevealGroup/RevealGroup';

// ── Feature icons — monochrome outline SVGs (no emoji) ────────
const FeatureIconSvg = ({ children }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
    {children}
  </svg>
);

const FEATURE_ICONS = {
  camera: (
    <FeatureIconSvg>
      <path d="M4 8h3l2-2h6l2 2h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="14" r="3.5" />
    </FeatureIconSvg>
  ),
  bot: (
    <FeatureIconSvg>
      <rect x="4" y="9" width="16" height="11" rx="2" />
      <path d="M12 9V5m-3 0h6" />
      <circle cx="9" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M2 13v3M22 13v3" />
    </FeatureIconSvg>
  ),
  doctor: (
    <FeatureIconSvg>
      <path d="M8 3v5a4 4 0 0 0 8 0V3" />
      <path d="M8 3H6v6a6 6 0 0 0 12 0V3h-2" />
      <circle cx="19" cy="15" r="2.5" />
      <path d="M19 12.5V11" />
    </FeatureIconSvg>
  ),
  lock: (
    <FeatureIconSvg>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </FeatureIconSvg>
  ),
  car: (
    <FeatureIconSvg>
      <path d="M4 16V11l2.5-5h11L20 11v5" />
      <path d="M2 16h20v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
      <circle cx="7.5" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </FeatureIconSvg>
  ),
  search: (
    <FeatureIconSvg>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </FeatureIconSvg>
  ),
  sparkles: (
    <FeatureIconSvg>
      <path d="M12 3l1.8 4.9L18.5 9l-4.7 1.9L12 16l-1.8-5.1L5.5 9l4.7-1.1z" />
      <path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </FeatureIconSvg>
  ),
  chart: (
    <FeatureIconSvg>
      <path d="M4 20V10M12 20V4M20 20v-7" />
      <path d="M2 20h20" />
    </FeatureIconSvg>
  ),
  eye: (
    <FeatureIconSvg>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </FeatureIconSvg>
  ),
  shield: (
    <FeatureIconSvg>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </FeatureIconSvg>
  ),
  zap: (
    <FeatureIconSvg>
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </FeatureIconSvg>
  ),
  refresh: (
    <FeatureIconSvg>
      <path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" />
      <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" />
      <path d="M3 16v4h4M21 8V4h-4" />
    </FeatureIconSvg>
  ),
  target: (
    <FeatureIconSvg>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </FeatureIconSvg>
  ),
  trending: (
    <FeatureIconSvg>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </FeatureIconSvg>
  ),
  map: (
    <FeatureIconSvg>
      <path d="M9 4L3 6.5v13L9 17l6 3 6-2.5v-13L15 7z" />
      <path d="M9 4v13M15 7v13" />
    </FeatureIconSvg>
  ),
  brain: (
    <FeatureIconSvg>
      <rect x="4" y="6" width="16" height="12" rx="3" />
      <path d="M8 6V4h8v2M12 9v6M8 12h8M9 15.5h.01M15 15.5h.01M9 9.5h.01M15 9.5h.01" />
    </FeatureIconSvg>
  ),
  clock: (
    <FeatureIconSvg>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </FeatureIconSvg>
  ),
  mail: (
    <FeatureIconSvg>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </FeatureIconSvg>
  ),
  users: (
    <FeatureIconSvg>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16.5 5.5a3.5 3.5 0 0 1 0 6.8" />
      <path d="M18.5 13.5a6.5 6.5 0 0 1 3 5.5" />
    </FeatureIconSvg>
  ),
};

const PROJECTS = [
  {
    id: 'p6',
    color: 'teal',
    title: 'SKINEST',
    subtitle: 'DERMATOLOGIST-GRADE SKINCARE AI',
    image: '/SkinAnalysis.png',
    imagePosition: '30% top',
    desc: 'AI-powered skin analysis, personalized for Indian skin tones and conditions.',
    features: [
      { icon: 'camera', text: 'Live Camera Skin Scanning' },
      { icon: 'bot', text: 'Smart Product Recommendations' },
      { icon: 'doctor', text: 'Dermatologist Review Queue' },
      { icon: 'lock', text: 'Privacy-first Image Handling' },
    ],
    problem: 'Indian users lack accessible, clinically accurate skincare guidance tailored to their skin tones and conditions.',
    approach: 'TensorFlow.js + FastAPI + OpenCV, with an AI engine matching skin conditions to real products.',
    outcome: 'End-to-end platform with 10,000+ analyses, 95% accuracy, and dermatologist-verified results.',
    builtForBusinessValue: 'Built for D2C beauty brands & dermatology clinics, personalized skincare at scale, reduced consultation costs.',
    tags: ['Next.js 14', 'FastAPI', 'TensorFlow.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/kritikamandale/skin-analysis-platform',
    liveUrl: 'https://skiinest.vercel.app/',
    featured: true,
  },
  {
    id: 'p2',
    color: 'blue',
    title: 'OFFROAD SEGMENTATION',
    subtitle: 'AUTONOMOUS TERRAIN SEGMENTATION',
    image: '/Offroad_segmentation.png',
    desc: 'Hackathon-winning glassmorphic UI for real-time offroad terrain segmentation.',
    features: [
      { icon: 'camera', text: 'Photo, Video & Webcam Input' },
      { icon: 'car', text: 'Real-Time Terrain Segmentation' },
      { icon: 'search', text: 'Traversability Map Generation' },
      { icon: 'sparkles', text: 'Automated Safety Scoring' },
    ],
    problem: 'Autonomous agents struggle navigating unstructured terrain without lanes.',
    approach: 'Train a custom segmentation model paired with an interactive visualization UI.',
    outcome: 'Hackathon-winning prototype offering instant terrain hazard assessment.',
    builtForBusinessValue: 'Built for autonomous vehicle & defence tech teams, faster terrain mapping, accelerated training.',
    tags: ['PyTorch', 'SMP', 'Albumentations', 'Gemini API', 'Python'],
    githubUrl: 'https://github.com/kritikamandale/HackDaysNagpur',
    liveUrl: 'https://huggingface.co/spaces/Critika/offroad-terrain-segmentation',
    featured: true,
  },
  {
    id: 'p7',
    color: 'maroon',
    title: 'MILAP',
    subtitle: 'AI-POWERED SMART EVENT PLATFORM',
    image: '/Milap.png',
    desc: 'AI-powered event platform connecting hosts with 10,000+ verified vendors across India.',
    features: [
      { icon: 'sparkles', text: 'Pichwai-Inspired Design' },
      { icon: 'bot', text: 'AI Event Planning Assistant' },
      { icon: 'search', text: 'Advanced Vendor Discovery & Filters' },
      { icon: 'users', text: 'Guest & RSVP Management' },
    ],
    problem: 'Luxury event planning in India is fragmented, no single platform connects verified premium vendors with discerning hosts.',
    approach: 'Next.js 15, AI planning assistant, and a Pichwai-inspired design.',
    outcome: '50,000+ events planned, 4.9/5 rating, 2,400+ reviews, and 10,000+ verified vendors onboarded.',
    builtForBusinessValue: 'Built for wedding planners & luxury hosts, faster vendor sourcing, AI-guided budgeting.',
    tags: ['Next.js 15', 'TypeScript', 'Groq AI', 'Framer Motion', 'Prisma', 'Tailwind CSS'],
    githubUrl: 'https://github.com/kritikamandale/milap',
    liveUrl: 'https://milaap-five.vercel.app/',
    featured: true,
  },
  {
    id: 'p5',
    color: 'orange',
    title: 'SNAPVERDICT',
    subtitle: 'MULTI-MODAL EVIDENCE REVIEW',
    image: '/SnapVerdict.png',
    desc: 'Automated visual review system for damage claims across cars, laptops, and packages using Google Gemini Vision API.',
    features: [
      { icon: 'eye', text: 'Gemini 2.5 Flash Vision Analysis' },
      { icon: 'shield', text: 'History-based Risk Assessment' },
      { icon: 'zap', text: 'FastAPI Backend Pipeline' },
      { icon: 'refresh', text: 'API Key Quota Management' },
    ],
    problem: 'Manual damage claim verification is slow, expensive, and subject to inconsistent standards.',
    approach: 'Multi-stage pipeline merging deterministic evidence gates with Gemini 2.5 Flash visual inspection.',
    outcome: 'Automated verification processing claims in under 10 seconds across 4 evidence stages and 3 claim categories, with structured, auditable outputs.',
    builtFor: 'Insurers | Warranty Providers | E-Commerce & Logistics | Rental & Leasing',
    businessValue: 'Reduces manual review time, identifies risky claims, and ensures consistent evidence.',
    tags: ['Python', 'FastAPI', 'Gemini API', 'Pandas'],
    githubUrl: 'https://github.com/kritikamandale/SnapVerdict',
    liveUrl: 'https://snap-verdict.vercel.app/',
    featured: true,
  },
  {
    id: 'p1',
    color: 'purple',
    title: 'SECUREID',
    subtitle: 'AI-POWERED STUDENT VERIFICATION',
    image: '/secureid.png',
    desc: 'Secure, production-grade identity management using KYC, AI Facial Biometrics, and a Microservices Architecture. Features deep analytics for universities.',
    features: [
      { icon: 'zap', text: '<2s Instant Verification Time' },
      { icon: 'target', text: '99.7% Industry-Leading Accuracy' },
      { icon: 'shield', text: '100% Full Audit Coverage' },
      { icon: 'chart', text: 'Complete Admin Analytics' },
    ],
    problem: 'Traditional KYC is slow and vulnerable to deepfakes.',
    approach: 'Build a modern AI verification platform.',
    outcome: 'Sub-second verification times and zero identity fraud at scale.',
    builtFor: 'Universities | EdTech Platforms | Security Startups',
    businessValue: 'Zero manual overhead. Zero fraud. Scalable security.',
    tags: ['FastAPI', 'React', 'PostgreSQL', 'DeepFace'],
    githubUrl: 'https://github.com/kritikamandale/SecureID',
    liveUrl: '',
    featured: true,
  },
  {
    id: 'p4',
    color: 'yellow',
    title: 'CODECURE',
    subtitle: 'EPIDEMIC SPREAD PREDICTION',
    image: '/Codecure.png',
    desc: 'End-to-end AI forecasting system analyzing transmission dynamics using ARIMA and LSTM models. Delivers actionable geographic public health insights.',
    features: [
      { icon: 'trending', text: 'Real-time Outbreak Forecasting' },
      { icon: 'map', text: 'Interactive Geographic Dashboards' },
      { icon: 'brain', text: 'SHAP-powered AI Explainability' },
      { icon: 'clock', text: 'Advanced SEIR Modeling' },
    ],
    problem: 'Public health teams lack accessible tools to forecast local outbreaks.',
    approach: 'End-to-end AI forecasting using ARIMA, LSTM, and geospatial mapping.',
    outcome: 'Identifies high-risk zones faster for proactive containment.',
    builtFor: 'Public Health Organizations | Research Teams | Government Analytics',
    businessValue: 'Data-driven resource allocation. Faster outbreak response. Proactive containment.',
    tags: ['Python', 'TensorFlow', 'Streamlit', 'SHAP'],
    liveUrl: 'https://codecuree.streamlit.app',
    githubUrl: 'https://github.com/kritikamandale/CodeCure',
    featured: true,
  },
];

const SECONDARY_PROJECTS = [
  {
    // Moved to secondary — no public repo available
    id: 'p3',
    color: 'mint',
    title: 'Civicsense',
    subtitle: 'AI PUBLIC TRIAGE',
    image: '/SmartGrievance.png',
    desc: 'Automated public grievance triaging system using Natural Language Processing to instantly categorize and route complaints.',
    features: [
      { icon: 'mail', text: 'Automated NLP Triage' },
      { icon: 'zap', text: 'Instant Department Routing' },
      { icon: 'chart', text: 'Public Tracking Dashboards' },
      { icon: 'lock', text: 'Secure Government Portal' },
    ],
    problem: 'Citizen complaints are misrouted and delayed due to manual government triaging.',
    approach: 'Automated NLP system that classifies, prioritizes, and routes grievances by text context.',
    outcome: 'Significantly reduces manual effort and improves public tracking transparency.',
    builtFor: 'Government Bodies | Municipal Corporations | Enterprise HR',
    businessValue: 'Cuts complaint resolution time and improves citizen trust.',
    tags: ['Python', 'NLP', 'Full-Stack', 'Machine Learning'],
    githubUrl: null,
    liveUrl: 'https://amravati-hackgen-x.vercel.app/',
    featured: false,
  },
];

const ProjectCard = ({ project }) => {
  const {
    title, subtitle, desc, features, problem, approach, outcome, builtFor, businessValue, builtForBusinessValue, tags, liveUrl, githubUrl, featured, image, imagePosition
  } = project;

  return (
    <div
      className="group relative overflow-hidden cursor-pointer rounded-2xl border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark-alt transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent hover:-translate-y-1.5 hover:shadow-card-hover hover:border-black/25 dark:hover:border-white/25 flex flex-col lg:flex-row h-full min-h-[520px]"
      tabIndex={0}
      role="article"
      aria-label={title}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute z-30 top-4 left-4 sm:top-5 sm:left-5">
           <span className="bg-brand-red text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-pill shadow-[0_4px_12px_rgba(176,38,24,0.3)]">
             ✦ Featured
           </span>
        </div>
      )}

      <div className="relative w-full lg:w-[50%] flex-shrink-0 overflow-hidden bg-surface-2-light dark:bg-surface-2-dark flex items-center justify-center p-0 lg:p-4">
        {/* The Laptop Mockup Container */}
        <div className="relative w-[130%] sm:w-[125%] lg:w-[140%] max-w-[1000px] mx-auto group-hover:-translate-y-1 transition-transform duration-500">

          {/* Screen Content — sits behind the transparent screen hole in the laptop PNG */}
          <div
            className="absolute z-0 overflow-hidden bg-white"
            style={{
              top: '13.35%',
              left: '27.88%',
              width: '44.28%',
              height: '48.83%',
            }}
          >
            <picture className="block w-full h-full">
              <source srcSet={image.replace(/\.(png|jpg|jpeg)$/i, '.webp')} type="image/webp" />
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-110"
                style={{ objectPosition: imagePosition || 'center top' }}
              />
            </picture>
          </div>

          {/* Laptop Mockup (transparent screen area lets the screenshot show through) */}
          {/* drop-shadow-lg, not -2xl — a large-radius filter shadow recomputed
              against this image's full alpha silhouette on every repaint was
              a real scroll-jank cost, multiplied across every project card. */}
          <img
            src="/laptop_mockup_transparent.webp"
            alt="Laptop Mockup"
            className="relative z-10 w-full h-auto pointer-events-none drop-shadow-lg"
            loading="lazy"
          />
        </div>
      </div>

      <div className="p-6 lg:p-10 flex flex-col gap-4 flex-grow z-10 bg-bg-light dark:bg-bg-dark-alt justify-center w-full lg:w-[50%]">
        
        {/* Main Titles */}
        <div className="flex flex-col gap-1">
          <h3 className="text-3xl sm:text-4xl font-heading font-medium text-text-primary dark:text-text-dark-primary leading-[1.1] uppercase tracking-tight">{title}</h3>
          <span className="text-[11px] font-extrabold text-brand-orange uppercase tracking-[0.2em]">{subtitle}</span>
        </div>

        {/* Description */}
        <p className="text-[14px] font-bold text-text-secondary dark:text-text-dark-secondary leading-[1.6]">{desc}</p>

        {/* Key Features */}
        {features && features.length > 0 && (
          <div className="flex flex-col gap-2 mt-1">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-text-muted dark:text-text-dark-muted mb-1">KEY FEATURES:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
              {features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-brand-red dark:text-brand-orange">{FEATURE_ICONS[feat.icon]}</span>
                  <span className="text-[12px] font-extrabold text-text-secondary dark:text-text-dark-secondary">{feat.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Problem / Approach / Outcome */}
        <div className="flex flex-col gap-2 mt-1 xl:mt-2">
          <div className="flex flex-col xl:flex-row xl:items-baseline gap-1 xl:gap-3">
            <span className="text-[10px] font-black tracking-[0.15em] uppercase text-brand-red shrink-0 xl:w-20">PROBLEM</span>
            <span className="text-[12px] font-medium text-text-secondary dark:text-text-dark-secondary leading-[1.5]">{problem}</span>
          </div>
          <div className="flex flex-col xl:flex-row xl:items-baseline gap-1 xl:gap-3">
            <span className="text-[10px] font-black tracking-[0.15em] uppercase text-brand-red shrink-0 xl:w-20">APPROACH</span>
            <span className="text-[12px] font-medium text-text-secondary dark:text-text-dark-secondary leading-[1.5]">{approach}</span>
          </div>
          <div className="flex flex-col xl:flex-row xl:items-baseline gap-1 xl:gap-3">
            <span className="text-[10px] font-black tracking-[0.15em] uppercase text-brand-red shrink-0 xl:w-20">OUTCOME</span>
            <span className="text-[12px] font-medium text-text-secondary dark:text-text-dark-secondary leading-[1.5]">{outcome}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag) => (
             <span key={tag} className="text-[10px] font-extrabold text-text-secondary dark:text-text-dark-secondary bg-transparent border-[1.5px] border-border-light dark:border-border-dark px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
          ))}
        </div>

        {/* Built For / Business Value */}
        <div className="flex flex-col gap-1.5 pt-3 mt-1 border-t-[1px] border-divider-light dark:border-divider-dark">
          {builtForBusinessValue ? (
            <div className="flex items-start gap-2">
              <span className="text-[12px] font-bold text-text-secondary dark:text-text-dark-secondary leading-[1.4]">{builtForBusinessValue}</span>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-black tracking-[0.15em] uppercase text-text-primary dark:text-text-dark-primary whitespace-nowrap pt-[2px]">BUILT FOR:</span>
                <span className="text-[12px] font-bold text-text-secondary dark:text-text-dark-secondary leading-[1.4]">{builtFor}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-black tracking-[0.15em] uppercase text-text-primary dark:text-text-dark-primary whitespace-nowrap pt-[2px]">BUSINESS VALUE:</span>
                <span className="text-[12px] font-bold text-text-secondary dark:text-text-dark-secondary leading-[1.4]">{businessValue}</span>
              </div>
            </>
          )}
        </div>

        {/* Buttons — every card gets the same two possible actions: View on GitHub and Live Demo */}
        <div className="flex flex-wrap gap-3 pt-3 mt-auto items-center">
          {githubUrl && (
            <a href={githubUrl} className="text-[13px] font-bold no-underline inline-flex items-center gap-2 px-6 py-2.5 rounded-pill border-2 border-transparent text-white bg-[#3A2418] shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap hover:-translate-y-1 hover:bg-[#251608] hover:shadow-xl hover:shadow-[#3A2418]/40" target="_blank" rel="noopener noreferrer">
              ↗ View on GitHub
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} className="text-[13px] font-bold no-underline inline-flex items-center gap-2 px-6 py-2.5 rounded-pill border-2 border-transparent text-white bg-[#B02618] shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap hover:-translate-y-1 hover:bg-[#8A1C10] hover:shadow-xl hover:shadow-[#B02618]/40" target="_blank" rel="noopener noreferrer">
              ↗ Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [expanded, setExpanded] = React.useState(false);

  const visibleProjects = expanded ? PROJECTS : PROJECTS.slice(0, 4);

  return (
    <SectionWrapper
      id="projects"
      label="My Portfolio"
      title="My Projects"
      subtitle="Engineering intelligent systems at the intersection of AI, Full-Stack, and High-Performance Web."
    >
      <RevealGroup staggerDelay={90} className="flex flex-col gap-16 mt-4">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </RevealGroup>

      {/* Expandable secondary projects */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: expanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="flex flex-col gap-12 mt-12">
            {SECONDARY_PROJECTS.map((project, i) => (
              <div
                key={project.id}
                style={{
                  opacity: expanded ? 1 : 0,
                  transform: expanded ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.5s ease ${i * 120 + 200}ms, transform 0.5s ease ${i * 120 + 200}ms`,
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons row */}
      <div className="mt-16 flex flex-col items-center gap-5 w-full">
        {/* Show more / show less toggle */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="text-[13px] font-bold inline-flex items-center gap-2 px-8 py-3 rounded-pill border-2 border-text-primary/25 dark:border-text-dark-primary/25 text-text-primary dark:text-text-dark-primary bg-surface-2-light dark:bg-surface-2-dark shadow-md transition-all duration-300 cursor-pointer whitespace-nowrap hover:-translate-y-1 hover:border-text-primary dark:hover:border-text-dark-primary hover:shadow-lg"
        >
          {expanded ? '↑ Show Less' : '↓ View All Projects'}
        </button>

        {/* GitHub button — appears after expanding */}
        <div
          style={{
            opacity: expanded ? 1 : 0,
            transform: expanded ? 'translateY(0)' : 'translateY(12px)',
            pointerEvents: expanded ? 'auto' : 'none',
            transition: 'opacity 0.4s ease 0.5s, transform 0.4s ease 0.5s',
          }}
        >
          <a
            href="https://github.com/kritikamandale"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-bold no-underline inline-flex items-center gap-2 px-8 py-3 rounded-pill border-2 border-transparent text-white bg-[#B02618] shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap hover:-translate-y-1 hover:bg-[#8A1C10] hover:shadow-xl hover:shadow-[#B02618]/40"
          >
            ↗ View All Projects
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;

