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
    id: 'p1',
    color: 'purple',
    icon: '🔐',
    title: 'SECUREID',
    subtitle: 'AI Student Identity Verification',
    image: '/secureid.jpg',
    desc: 'A full-stack, production-style platform for secure university student verification using KYC and AI facial authentication (DeepFace). Includes an admin analytics dashboard, microservices architecture, Docker orchestration, and Terraform IaC.',
    problem: 'Traditional KYC and student verifications are slow, prone to human error, and easily spoofed.',
    approach: 'Developed an automated FastAPI microservice using DeepFace for biometric matching and Terraform for scalable deployment.',
    outcome: 'Achieved sub-second verification times and integrated successfully into a production-grade admin dashboard.',
    tags: ['FastAPI', 'React', 'Docker', 'Terraform', 'PostgreSQL', 'DeepFace'],
    githubUrl: 'https://github.com/kritikamandale/SecureID',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'p4',
    color: 'yellow',
    icon: '🦠',
    title: 'CodeCure',
    subtitle: 'Epidemic Spread Prediction',
    image: '/Codecure.png',
    desc: 'An end-to-end AI-powered system for forecasting epidemic outbreaks, analyzing transmission dynamics, and generating actionable public health insights using ARIMA, LSTM, and SEIR models.',
    problem: 'Public health officials lack accessible, predictive tools to anticipate and respond to local epidemic outbreaks.',
    approach: 'Built an end-to-end pipeline leveraging ARIMA/LSTM for forecasting and Streamlit for interactive geographic visualization.',
    outcome: 'Provided actionable insights with SHAP explainability, reducing time to identify high-risk zones.',
    tags: ['Python', 'TensorFlow', 'Streamlit', 'Folium', 'SHAP'],
    liveUrl: 'https://codecuree.streamlit.app',
    githubUrl: 'https://github.com/kritikamandale/CodeCure',
    featured: true,
  },
  {
    id: 'p2',
    color: 'blue',
    icon: '🛣️',
    title: 'OffRoad Segmentation',
    subtitle: 'Autonomous Terrain Segmentation',
    image: 'Offroad_segmentation.jpg',
    desc: 'A hackathon project (Duality AI, Nagpur) featuring a glassmorphic UI to visualize offroad semantic segmentation. Upload terrain images, view side-by-side masks & overlays, and get Gemini-powered terrain risk insights.',
    problem: 'Navigating unstructured off-road environments is challenging for autonomous agents without clear lane markings.',
    approach: 'Trained a semantic segmentation model using PyTorch and SMP, and created a glassmorphic UI for side-by-side analysis.',
    outcome: 'Enhanced terrain understanding and risk assessment via Gemini AI integration in a hackathon-winning prototype.',
    tags: ['PyTorch', 'SMP', 'Albumentations', 'Gemini API', 'Python'],
    githubUrl: 'https://github.com/kritikamandale/HackDaysNagpur',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'p3',
    color: 'mint',
    icon: '🏛️',
    title: 'Smart Grievance System',
    subtitle: 'NLP Public Triage',
    image: '/SmartGrievance.png',
    desc: 'An automated public grievance triaging system. Uses Natural Language Processing to instantly categorize and route complaints to relevant departments.',
    problem: 'Citizen complaints are often misrouted or delayed due to manual triaging across multiple government departments.',
    approach: 'Implemented a full-stack NLP system to automatically classify, prioritize, and route grievances based on text context.',
    outcome: 'Decreased manual triage time significantly and improved tracking transparency for the public.',
    tags: ['Python', 'NLP', 'Full-Stack', 'Machine Learning'],
    githubUrl: '#',
    liveUrl: '#',
    featured: true,
  },
];

const ProjectCard = ({ project }) => {
  const {
    title, subtitle, desc, tags, liveUrl, githubUrl, featured, image
  } = project;

  return (
    <div
      className="group relative overflow-hidden cursor-pointer rounded-xl border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark-alt transition-all duration-250 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent hover:-translate-y-1.5 hover:shadow-card-hover hover:border-black/25 dark:hover:border-white/25 flex flex-col h-full"
      tabIndex={0}
      role="article"
      aria-label={title}
    >
      <div className="relative w-full overflow-hidden bg-surface-2-light dark:bg-surface-2-dark">
        <img src={image} alt={title} className="w-full h-auto block transition-transform duration-600 group-hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 flex items-center justify-center opacity-0 transition-opacity duration-250 group-hover:opacity-100">
          {featured && <span className="absolute top-4 left-4 bg-gradient-to-br from-brand-orange to-brand-red text-white text-xs font-bold px-3 py-1 rounded-pill shadow-[0_4px_12px_rgba(255,60,56,0.3)]">✦ Featured Project</span>}
        </div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col gap-4 flex-grow z-10 bg-bg-light dark:bg-bg-dark-alt">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xl font-heading font-extrabold text-text-primary dark:text-text-dark-primary leading-[1.1] tracking-[-0.01em]">{title}</h3>
          <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.1em]">{subtitle}</span>
        </div>

        <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-[1.7] line-clamp-3">{desc}</p>

        <div className="mt-3 flex flex-col gap-0.5">
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-accent mt-1.5">Problem</span>
          <span className="text-[14px] text-text-secondary dark:text-text-dark-secondary leading-[1.6]">{project.problem}</span>
          
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-accent mt-1.5">Approach</span>
          <span className="text-[14px] text-text-secondary dark:text-text-dark-secondary leading-[1.6]">{project.approach}</span>
          
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-accent mt-1.5">Outcome</span>
          <span className="text-[14px] text-text-secondary dark:text-text-dark-secondary leading-[1.6]">{project.outcome}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-medium text-text-secondary dark:text-text-dark-secondary bg-surface-2-light dark:bg-surface-2-dark border border-divider-light dark:border-divider-dark px-3 py-[2px] rounded-md transition-all duration-250 group-hover:bg-white dark:group-hover:bg-bg-dark group-hover:border-[#444] dark:group-hover:border-white/25">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-3">
          {githubUrl && (
            <a href={githubUrl} className="text-xs font-bold no-underline inline-flex items-center gap-1.5 px-4 py-[7px] rounded-pill border-[1.5px] border-border-light dark:border-border-dark text-text-primary dark:text-text-dark-primary bg-transparent transition-all duration-250 cursor-pointer whitespace-nowrap relative z-[1] hover:-translate-y-[2px] hover:bg-surface-2-light dark:hover:bg-surface-2-dark hover:border-text-primary dark:hover:border-text-dark-primary hover:shadow-[0_4px_14px_rgba(0,0,0,0.15)]" target="_blank" rel="noopener noreferrer">
              ⌥ Code
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} className="text-xs font-bold no-underline inline-flex items-center gap-1.5 px-4 py-[7px] rounded-pill border-[1.5px] border-transparent text-white bg-gradient-to-br from-[#ff6b35] to-[#e63946] shadow-[0_4px_14px_rgba(230,57,70,0.35)] transition-all duration-250 cursor-pointer whitespace-nowrap relative z-[1] hover:-translate-y-[2px] hover:from-[#ff8c5a] hover:to-[#ff3d4e] hover:shadow-[0_6px_20px_rgba(230,57,70,0.5)]" target="_blank" rel="noopener noreferrer">
              ↗ Live Demo
            </a>
          )}
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/[0.03] dark:bg-white/[0.03] flex items-center justify-center pointer-events-none z-20">
        <span className="text-xl text-accent transition-transform duration-200 delay-[60ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
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
      <RevealGroup staggerDelay={90} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </RevealGroup>
    </SectionWrapper>
  );
};

export default Projects;
