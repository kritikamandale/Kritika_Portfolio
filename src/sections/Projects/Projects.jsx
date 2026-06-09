'use client';
// src/sections/Projects/Projects.jsx
// ============================================================
// PROJECTS SECTION — Asymmetric Bento Grid
// ── Edit: PROJECTS array below ─────────────────────────────
// ============================================================

import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import RevealGroup from '../../components/RevealGroup/RevealGroup';
import Button from '../../components/Button/Button';

const PROJECTS = [
  {
    id: 'p1',
    color: 'purple',
    icon: '🔐',
    title: 'SECUREID',
    subtitle: 'AI-POWERED STUDENT VERIFICATION',
    image: '/secureid.jpg',
    desc: 'Secure, production-grade identity management using KYC, AI Facial Biometrics, and a Microservices Architecture. Features deep analytics for universities.',
    features: [
      { icon: '⚡', text: '<2s Instant Verification Time' },
      { icon: '🎯', text: '99.7% Industry-Leading Accuracy' },
      { icon: '🛡️', text: '100% Full Audit Coverage' },
      { icon: '📊', text: 'Complete Admin Analytics' },
    ],
    problem: 'Traditional KYC is slow and vulnerable to deepfakes.',
    approach: 'Build a modern AI verification platform.',
    outcome: 'Sub-second verification times and zero identity fraud at scale.',
    builtFor: 'Universities | EdTech Platforms | Security Startups',
    businessValue: 'Zero manual overhead. Zero fraud. Scalable security.',
    tags: ['FastAPI', 'React', 'Docker', 'Terraform', 'PostgreSQL', 'DeepFace'],
    githubUrl: 'https://github.com/kritikamandale/SecureID',
    liveUrl: '',
    featured: true,
  },
  {
    id: 'p4',
    color: 'yellow',
    icon: '🦠',
    title: 'CODECURE',
    subtitle: 'EPIDEMIC SPREAD PREDICTION',
    image: '/Codecure.png',
    desc: 'End-to-end AI forecasting system analyzing transmission dynamics using ARIMA and LSTM models. Delivers actionable geographic public health insights.',
    features: [
      { icon: '📈', text: 'Real-time Outbreak Forecasting' },
      { icon: '🗺️', text: 'Interactive Geographic Dashboards' },
      { icon: '🧠', text: 'SHAP-powered AI Explainability' },
      { icon: '⏱️', text: 'Advanced SEIR Modeling' },
    ],
    problem: 'Public health teams lack accessible tools to forecast local outbreaks.',
    approach: 'End-to-end AI forecasting using ARIMA, LSTM, and geospatial mapping.',
    outcome: 'Identifies high-risk zones faster for proactive containment.',
    builtFor: 'Public Health Organizations | Research Teams | Government Analytics',
    businessValue: 'Data-driven resource allocation. Faster outbreak response. Proactive containment.',
    tags: ['Python', 'TensorFlow', 'Streamlit', 'Folium', 'SHAP'],
    liveUrl: 'https://codecuree.streamlit.app',
    githubUrl: 'https://github.com/kritikamandale/CodeCure',
    featured: true,
  },
  {
    id: 'p2',
    color: 'blue',
    icon: '🛣️',
    title: 'OFFROAD SEGMENTATION',
    subtitle: 'AUTONOMOUS TERRAIN SEGMENTATION',
    image: '/Offroad_segmentation.jpg',
    desc: 'Hackathon-winning glassmorphic UI platform visualizing offroad semantic segmentation. Features Gemini-powered terrain risk insights for autonomous agents.',
    features: [
      { icon: '🚙', text: 'Real-time Terrain Segmentation' },
      { icon: '🔍', text: 'Side-by-side Mask Overlays' },
      { icon: '🤖', text: 'Gemini AI Risk Analysis' },
      { icon: '✨', text: 'Modern Glassmorphic Interface' },
    ],
    problem: 'Autonomous agents struggle navigating unstructured terrain without lanes.',
    approach: 'Train a custom segmentation model paired with an interactive visualization UI.',
    outcome: 'Hackathon-winning prototype offering instant terrain hazard assessment.',
    builtFor: 'Autonomous Vehicle Teams | AI Research Labs | Defence Tech',
    businessValue: 'Reduces terrain mapping time. Accelerates autonomous training.',
    tags: ['PyTorch', 'SMP', 'Albumentations', 'Gemini API', 'Python'],
    githubUrl: 'https://github.com/kritikamandale/HackDaysNagpur',
    liveUrl: '',
    featured: true,
  },
  {
    id: 'p-coming-soon',
    color: 'gray',
    icon: '🚧',
    title: 'BUILDING IN PUBLIC',
    subtitle: 'MORE PROJECTS COMING SOON',
    image: '/secureid.jpg', // Using an existing image as placeholder
    desc: 'Currently engineering new MVPs and experimenting with cutting-edge AI tools in public. Follow my journey and open-source contributions.',
    features: [
      { icon: '🚀', text: 'Rapid MVP Prototyping' },
      { icon: '💡', text: 'AI Tool Exploration' },
      { icon: '📖', text: 'Open Source Contributions' },
      { icon: '🔄', text: 'Agile Iterative Development' },
    ],
    problem: 'The tech landscape evolves daily; staying ahead requires constant building.',
    approach: 'Transparent, agile development focused on solving real-world problems.',
    outcome: 'Continuous learning and an ever-expanding portfolio of robust applications.',
    builtFor: 'The Open Source Community | Fellow Developers | Tech Enthusiasts',
    businessValue: 'Continuous innovation. Transparent engineering.',
    tags: ['Coming Soon', 'Work in Progress'],
    githubUrl: 'https://github.com/kritikamandale',
    liveUrl: null,
    featured: true,
  },
];

const SECONDARY_PROJECTS = [
  {
    // Moved to secondary — no public repo available
    id: 'p3',
    color: 'mint',
    icon: '🏛️',
    title: 'SMART GRIEVANCE SYSTEM',
    subtitle: 'NLP PUBLIC TRIAGE',
    image: '/SmartGrievance.png',
    desc: 'Automated public grievance triaging system using Natural Language Processing to instantly categorize and route complaints.',
    features: [
      { icon: '📨', text: 'Automated NLP Triage' },
      { icon: '⚡', text: 'Instant Department Routing' },
      { icon: '📊', text: 'Public Tracking Dashboards' },
      { icon: '🔒', text: 'Secure Government Portal' },
    ],
    problem: 'Citizen complaints are misrouted and delayed due to manual government triaging.',
    approach: 'Automated NLP system that classifies, prioritizes, and routes grievances by text context.',
    outcome: 'Significantly reduces manual effort and improves public tracking transparency.',
    builtFor: 'Government Bodies | Municipal Corporations | Enterprise HR',
    businessValue: 'Cuts complaint resolution time and improves citizen trust.',
    tags: ['Python', 'NLP', 'Full-Stack', 'Machine Learning'],
    githubUrl: null,
    liveUrl: null,
    featured: false,
  },
];

const ProjectCard = ({ project }) => {
  const {
    title, subtitle, desc, features, problem, approach, outcome, builtFor, businessValue, tags, liveUrl, githubUrl, featured, image
  } = project;

  return (
    <div
      className="group relative overflow-hidden cursor-pointer rounded-2xl border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark-alt transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent hover:-translate-y-1.5 hover:shadow-card-hover hover:border-black/25 dark:hover:border-white/25 flex flex-col lg:flex-row h-full min-h-[400px]"
      tabIndex={0}
      role="article"
      aria-label={title}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute z-30 top-4 left-4 sm:top-5 sm:left-5">
           <span className="bg-gradient-to-br from-brand-orange to-brand-red text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-pill shadow-[0_4px_12px_rgba(255,60,56,0.3)]">
             ✦ Featured
           </span>
        </div>
      )}

      <div className="relative w-full lg:w-[50%] flex-shrink-0 overflow-hidden bg-surface-2-light dark:bg-surface-2-dark flex items-center justify-center p-6 lg:p-10">
        {/* The Laptop Mockup Container */}
        <div className="relative w-[90%] max-w-[800px] mx-auto group-hover:-translate-y-1 transition-transform duration-500">
          
          {/* Screen Content - Positioned behind the laptop hole */}
          <div 
             className="absolute z-0 overflow-hidden bg-black"
             style={{
               top: '7.19%',
               left: '13.23%',
               width: '73.84%',
               height: '78.43%',
             }}
          >
            <picture>
              <source srcSet={image.replace(/\.(png|jpg|jpeg)$/i, '.webp')} type="image/webp" />
              <img 
                src={image} 
                alt={title} 
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-110" 
              />
            </picture>
          </div>

          {/* Laptop Mockup Image (Transparent Hole) */}
          <img 
             src="/laptop-mockup-final.png" 
             alt="Laptop Mockup" 
             className="relative z-10 w-full h-auto pointer-events-none drop-shadow-2xl"
             loading="lazy"
          />
        </div>
      </div>

      <div className="p-6 lg:p-8 flex flex-col gap-4 flex-grow z-10 bg-bg-light dark:bg-bg-dark-alt justify-center w-full lg:w-[50%]">
        
        {/* Main Titles */}
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-text-primary dark:text-text-dark-primary leading-[1.1] uppercase tracking-tight">{title}</h3>
          <span className="text-[11px] font-extrabold text-brand-orange uppercase tracking-[0.2em]">{subtitle}</span>
        </div>

        {/* Description */}
        <p className="text-[13px] font-bold text-text-secondary dark:text-text-dark-secondary leading-[1.6]">{desc}</p>

        {/* Key Features */}
        {features && features.length > 0 && (
          <div className="flex flex-col gap-2 mt-1">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-text-muted dark:text-text-dark-muted mb-1">KEY FEATURES:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
              {features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm">{feat.icon}</span>
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
          <div className="flex items-start gap-2">
            <span className="text-[10px] font-black tracking-[0.15em] uppercase text-text-primary dark:text-text-dark-primary whitespace-nowrap pt-[2px]">BUILT FOR:</span>
            <span className="text-[12px] font-bold text-text-secondary dark:text-text-dark-secondary leading-[1.4]">{builtFor}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[10px] font-black tracking-[0.15em] uppercase text-text-primary dark:text-text-dark-primary whitespace-nowrap pt-[2px]">BUSINESS VALUE:</span>
            <span className="text-[12px] font-bold text-text-secondary dark:text-text-dark-secondary leading-[1.4]">{businessValue}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 pt-3 mt-auto items-center">
          {githubUrl && liveUrl && (
            <a href={githubUrl} className="text-[13px] font-bold no-underline inline-flex items-center gap-2 px-6 py-2.5 rounded-pill border-2 border-border-light dark:border-border-dark text-text-primary dark:text-text-dark-primary bg-transparent transition-all duration-300 cursor-pointer whitespace-nowrap hover:-translate-y-1 hover:bg-surface-2-light dark:hover:bg-surface-2-dark hover:border-text-primary dark:hover:border-text-dark-primary hover:shadow-lg" target="_blank" rel="noopener noreferrer">
              ⌥ Code
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} className="text-[13px] font-bold no-underline inline-flex items-center gap-2 px-6 py-2.5 rounded-pill border-2 border-transparent text-white bg-gradient-to-br from-[#ff6b35] to-[#e63946] shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap hover:-translate-y-1 hover:from-[#ff8c5a] hover:to-[#ff3d4e] hover:shadow-xl hover:shadow-[#e63946]/40" target="_blank" rel="noopener noreferrer">
              ↗ Live Demo
            </a>
          )}
          {!liveUrl && githubUrl && (
            <a href={githubUrl} className="text-[13px] font-bold no-underline inline-flex items-center gap-2 px-6 py-2.5 rounded-pill border-2 border-transparent text-white bg-gradient-to-br from-[#ff6b35] to-[#e63946] shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap hover:-translate-y-1 hover:from-[#ff8c5a] hover:to-[#ff3d4e] hover:shadow-xl hover:shadow-[#e63946]/40" target="_blank" rel="noopener noreferrer">
              ↗ View on GitHub
            </a>
          )}
          {!liveUrl && (
            <span style={{ color: 'var(--color-text-tertiary, #888)', fontSize: '13px' }} className="ml-1 opacity-90 font-medium tracking-wide">
              No live deployment
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <SectionWrapper
      id="projects"
      label="My Portfolio"
      title="My Projects"
      subtitle="Engineering intelligent systems at the intersection of AI, Full-Stack, and High-Performance Web."
    >
      <RevealGroup staggerDelay={90} className="flex flex-col gap-12 mt-4">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </RevealGroup>

      <div className="mt-16 flex justify-center w-full">
        <Button 
          href="https://github.com/kritikamandale" 
          variant="primary" 
          size="base" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View More Projects
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
