'use client';
// src/sections/Services/index.jsx
// ============================================================
// SERVICES SECTION
// 8-card grid with Framer Motion staggered reveal animations.
// Matches portfolio design language: dark/light mode, spacing,
// typography, and surface tokens.
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';

const SERVICES = [
  {
    icon: '🤖',
    title: 'AI Chatbot Development',
    desc: 'Custom AI chatbots trained for your business, integrated into your website or product.',
  },
  {
    icon: '⚡',
    title: 'AI Automation Systems',
    desc: 'Automate repetitive workflows using intelligent agents and LLM-powered pipelines.',
  },
  {
    icon: '🌐',
    title: 'Full-Stack Web Development',
    desc: 'End-to-end web applications built with React, Next.js, Node.js, and scalable backends.',
  },
  {
    icon: '📊',
    title: 'Dashboard & Admin Panels',
    desc: 'Clean, data-driven dashboards for monitoring, analytics, and internal operations.',
  },
  {
    icon: '🔗',
    title: 'API Integration',
    desc: 'Connect third-party services, AI APIs, and data sources into your existing systems.',
  },
  {
    icon: '🚀',
    title: 'AI-Powered SaaS Applications',
    desc: 'Build and deploy intelligent SaaS products with subscription-ready architecture.',
  },
  {
    icon: '🔄',
    title: 'Workflow Automation',
    desc: 'Streamline business operations with smart automation that reduces manual effort.',
  },
  {
    icon: '📈',
    title: 'Data Visualisation Dashboards',
    desc: 'Interactive charts and visual analytics built with D3.js or Recharts.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Services = () => {
  return (
    <SectionWrapper
      id="services"
      label="Domains"
      title="What I Build"
      subtitle="A breakdown of the domains I work across and the kind of problems I enjoy solving"
      alt
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group flex flex-col gap-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6 transition-all duration-300 relative overflow-hidden hover:-translate-y-1.5 hover:shadow-clay-lg dark:hover:shadow-none hover:border-black/25 dark:hover:border-white/25 cursor-default"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[linear-gradient(90deg,var(--brand-orange,#FF8C42),var(--brand-red,#FF3C38))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-[linear-gradient(135deg,rgba(255,140,66,0.12),rgba(255,60,56,0.08))] dark:bg-[linear-gradient(135deg,rgba(255,140,66,0.15),rgba(255,60,56,0.1))] flex items-center justify-center text-2xl border border-border-light dark:border-border-dark transition-transform duration-300 group-hover:scale-110 shrink-0">
              {service.icon}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-[15px] font-bold text-text-primary dark:text-text-dark-primary leading-[1.3] tracking-[-0.01em]">
                {service.title}
              </h3>
              <p className="text-[13px] text-text-secondary dark:text-text-dark-secondary leading-[1.65]">
                {service.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Services;
