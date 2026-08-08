'use client';
// src/sections/Projects/Projects.jsx
// ============================================================
// PROJECTS SECTION — Asymmetric Bento Grid
// ── Edit: PROJECTS array below ─────────────────────────────
// ============================================================

import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import RevealGroup from '../../components/RevealGroup/RevealGroup';



const PROJECTS = [
  {
    id: 'p6',
    color: 'teal',
    title: 'SKINEST',
    subtitle: 'DERMATOLOGIST-GRADE SKINCARE AI',
    image: '/kritika-mandale-project-skin-analysis.png',
    imagePosition: '30% top',
    desc: 'AI-powered skin analysis platform personalized for Indian skin tones. Features live camera skin scanning, smart product recommendations, a dermatologist review queue, and privacy-first image processing.',
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
    image: '/kritika-mandale-project-offroad-segmentation.png',
    desc: 'Hackathon-winning real-time offroad terrain segmentation system. Supports photo, video, and webcam inputs with automated traversability map generation and safety scoring for autonomous navigation.',
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
    image: '/kritika-mandale-project-milap.png',
    desc: 'AI-powered smart event platform connecting hosts with 10,000+ verified vendors across India. Features an AI event planning assistant, automated vendor discovery filters, budget estimation tools, and guest RSVP management.',
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
    image: '/kritika-mandale-project-snapverdict.png',
    desc: 'Automated visual evidence review system processing damage claims across cars, laptops, and packages. Powered by Gemini 2.5 Flash vision analysis, history-based risk assessment, a FastAPI backend, and API quota management.',
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
    image: '/kritika-mandale-project-secureid.png',
    desc: 'Production-grade student identity management system delivering sub-2s verification times with 99.7% accuracy. Features AI facial biometrics, 100% full audit coverage, and interactive admin analytics dashboards.',
    tags: ['FastAPI', 'React', 'PostgreSQL', 'DeepFace'],
    githubUrl: 'https://github.com/kritikamandale/SecureID',
    liveUrl: 'https://secureid-ten.vercel.app/',
    featured: true,
  },
  {
    id: 'p4',
    color: 'yellow',
    title: 'CODECURE',
    subtitle: 'EPIDEMIC SPREAD PREDICTION',
    image: '/kritika-mandale-project-codecure.png',
    desc: 'End-to-end epidemic spread forecasting system analyzing transmission dynamics using ARIMA and LSTM models. Features real-time outbreak forecasting, interactive geographic dashboards, SHAP AI explainability, and SEIR modeling.',
    tags: ['Python', 'TensorFlow', 'Streamlit', 'SHAP'],
    liveUrl: 'https://codecuree.streamlit.app',
    githubUrl: 'https://github.com/kritikamandale/CodeCure',
    featured: true,
  },
];

const SECONDARY_PROJECTS = [
  {
    id: 'p3',
    color: 'mint',
    title: 'Civicsense',
    subtitle: 'AI PUBLIC TRIAGE',
    image: '/kritika-mandale-project-smart-grievance.png',
    desc: 'Automated public grievance triaging system using Natural Language Processing to instantly categorize and route citizen complaints. Features instant department routing, public tracking dashboards, and a secure government portal.',
    tags: ['Python', 'NLP', 'Full-Stack', 'Machine Learning'],
    githubUrl: null,
    liveUrl: 'https://amravati-hackgen-x.vercel.app/',
    featured: false,
  },
];

const ProjectCard = ({ project }) => {
  const {
    title, subtitle, desc, tags, liveUrl, githubUrl, featured, image, imagePosition
  } = project;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border-light dark:border-border-dark bg-bg-light dark:bg-dark-alt transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:shadow-card-hover hover:border-black/25 dark:hover:border-white/25 flex flex-col lg:flex-row w-full"
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

      {/* Left Image / Mockup Column */}
      <div className="relative w-full lg:w-[48%] flex-shrink-0 overflow-hidden bg-surface-2-light dark:bg-surface-2-dark flex items-center justify-center p-4 lg:p-6">
        <div className="relative w-[115%] sm:w-[110%] lg:w-[125%] max-w-[700px] mx-auto group-hover:-translate-y-1 transition-transform duration-500">
          {/* Screen Content */}
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
                alt={`Kritika Mandale project screenshot - ${title}`}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-110"
                style={{ objectPosition: imagePosition || 'center top' }}
              />
            </picture>
          </div>

          <img
            src="/laptop_mockup_transparent.webp"
            alt=""
            aria-hidden="true"
            className="relative z-10 w-full h-auto pointer-events-none drop-shadow-lg transform-gpu [backface-visibility:hidden]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Right Content Column */}
      <div className="p-6 lg:p-8 flex flex-col justify-center gap-3.5 flex-grow z-10 bg-bg-light dark:bg-bg-dark-alt w-full lg:w-[52%]">
        
        {/* Main Titles */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-brand-orange uppercase tracking-[0.15em]">{subtitle}</span>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary dark:text-text-dark-primary leading-tight uppercase tracking-tight">{title}</h3>
        </div>

        {/* 2-3 Lines Description */}
        <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed">{desc}</p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1">
          {tags.map((tag) => (
             <span key={tag} className="text-[10px] sm:text-[11px] font-medium text-accent dark:text-brand-yellow bg-accent/8 dark:bg-brand-yellow/10 border border-accent/15 dark:border-brand-yellow/20 px-2 py-[1px] sm:px-2.5 sm:py-0.5 rounded-full uppercase tracking-normal sm:tracking-wider">{tag}</span>
          ))}
        </div>

        {/* Buttons: View on GitHub and Live Demo */}
        <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 mt-1 items-center">
          {githubUrl && (
            <a href={githubUrl} className="text-[11px] sm:text-[13px] font-bold no-underline inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-pill border-2 border-transparent text-white bg-[#3A2418] shadow-md transition-all duration-300 cursor-pointer whitespace-nowrap hover:-translate-y-0.5 hover:bg-[#251608] hover:shadow-lg" target="_blank" rel="noopener noreferrer">
              ↗ View on GitHub
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} className="text-[11px] sm:text-[13px] font-bold no-underline inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-pill border-2 border-transparent text-white bg-[#B02618] shadow-md transition-all duration-300 cursor-pointer whitespace-nowrap hover:-translate-y-0.5 hover:bg-[#8A1C10] hover:shadow-lg" target="_blank" rel="noopener noreferrer">
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
      <RevealGroup staggerDelay={90} className="flex flex-col gap-8 lg:gap-10 mt-4">
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

