'use client';
// src/sections/Projects/Projects.jsx
// ============================================================
// PROJECTS SECTION — Asymmetric Bento Grid
// ── Edit: PROJECTS array below ─────────────────────────────
// ============================================================

import React, { useRef } from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import RevealGroup from '../../components/RevealGroup/RevealGroup';
import styles from './Projects.module.css';

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
    color, title, subtitle, desc, tags, liveUrl, githubUrl, featured, image
  } = project;

  const cardRef = useRef(null);
  const specRef = useRef(null);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMouseMove = (e) => {
    if (prefersReduced) return;
    const card = cardRef.current;
    const spec = specRef.current;
    if (!card || !spec) return;
    const rect = card.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    const rotY =  nx * 8;
    const rotX = -ny * 8;
    card.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    spec.style.opacity = '1';
    spec.style.background =
      `radial-gradient(circle at ${50 - nx * 30}% ${50 - ny * 30}%, rgba(255,255,255,0.22) 0%, transparent 65%)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const spec = specRef.current;
    if (!card || !spec) return;
    card.style.transform = '';
    spec.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      className={[styles.card, styles[color]].filter(Boolean).join(' ')}
      data-hover="true"
      tabIndex={0}
      role="article"
      aria-label={title}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Specular highlight — moves opposite to tilt */}
      <div ref={specRef} className={styles.specular} aria-hidden="true" />

      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.projectImage} />
        <div className={styles.imageOverlay}>
          {featured && <span className={styles.featuredBadge}>✦ Featured Project</span>}
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.headerRow}>
          <div className={styles.titles}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <span className={styles.cardSubtitle}>{subtitle}</span>
          </div>
        </div>

        <p className={styles.cardDesc}>{desc}</p>

        <div className={styles.caseStudy}>
          <span className={styles.caseLabel}>Problem</span>
          <span className={styles.caseText}>{project.problem}</span>
          <span className={styles.caseLabel}>Approach</span>
          <span className={styles.caseText}>{project.approach}</span>
          <span className={styles.caseLabel}>Outcome</span>
          <span className={styles.caseText}>{project.outcome}</span>
        </div>

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div className={styles.links}>
          {githubUrl && (
            <a href={githubUrl} className={styles.linkBtn} target="_blank" rel="noopener noreferrer" data-hover="true">
              ⌥ Code
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} className={styles.linkBtn} target="_blank" rel="noopener noreferrer" data-hover="true">
              ↗ Live Demo
            </a>
          )}
        </div>
      </div>

      <div className={styles.cardOverlay} aria-hidden="true">
        <span className={styles.cardOverlayArrow}>↗</span>
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
      <RevealGroup staggerDelay={90} className={styles.projectsGrid}>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </RevealGroup>
    </SectionWrapper>
  );
};

export default Projects;
