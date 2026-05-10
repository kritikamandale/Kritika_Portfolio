// src/sections/Projects/Projects.jsx
// ============================================================
// PROJECTS SECTION — Asymmetric Bento Grid
// 6 dummy project cards of varying sizes for editorial feel.
// ── Edit: PROJECTS array below ─────────────────────────────
// ============================================================

import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
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
    tags: ['PyTorch', 'SMP', 'Albumentations', 'Gemini API', 'Python'],
    githubUrl: 'https://github.com/kritikamandale/HackDaysNagpur',
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'p3',
    color: 'mint',
    icon: '🏛️',
    title: 'Smart Grievance System',
    subtitle: 'NLP Public Triage',
    image: '/SmartGrievance.png',
    desc: 'An automated public grievance triaging system. Uses Natural Language Processing to instantly categorize and route complaints to relevant departments.',
    tags: ['Python', 'NLP', 'Full-Stack', 'Machine Learning'],
    githubUrl: '#',
    liveUrl: '#',
    featured: false,
  },
];

const ProjectCard = ({ project, i }) => {
  const {
    color, icon, title, subtitle, desc, tags, liveUrl, demoVideoUrl, githubUrl, featured, image
  } = project;

  return (
    <div
      className={[
        styles.card,
        styles[color],
        'reveal',
        `reveal-delay-${i + 1}`
      ]
        .filter(Boolean)
        .join(' ')}
    >
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

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div className={styles.links}>
          {githubUrl && (
            <a href={githubUrl} className={styles.linkBtn} target="_blank" rel="noopener noreferrer">
              ⌥ Code
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} className={styles.linkBtn} target="_blank" rel="noopener noreferrer">
              ↗ Live Demo
            </a>
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
      <div className={styles.projectsGrid}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} i={i} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
