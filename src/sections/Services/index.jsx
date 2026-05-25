'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  MonitorSmartphone, 
  Bot, 
  Cpu, 
  GitMerge, 
  Unplug, 
  LayoutDashboard, 
  LineChart 
} from 'lucide-react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';

const SERVICES_DATA = [
  {
    id: 1,
    title: 'AI-Powered SaaS Applications',
    desc: 'Build and deploy intelligent SaaS products with subscription-ready architecture.',
    icon: Rocket,
    colSpan: 'col-span-1 md:col-span-2',
    rowSpan: 'md:row-span-2',
    tags: ['LLM Integration', 'Subscription Auth', 'Scalable APIs']
  },
  {
    id: 2,
    title: 'Full-Stack Web Development',
    desc: 'End-to-end web applications built with React, Next.js, Node.js, and scalable backends.',
    icon: MonitorSmartphone,
    colSpan: 'col-span-1 md:col-span-2',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 3,
    title: 'AI Automation Systems',
    desc: 'Automate repetitive workflows using intelligent agents and LLM-powered pipelines.',
    icon: Cpu,
    colSpan: 'col-span-1 md:col-span-2',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 4,
    title: 'AI Chatbot Development',
    desc: 'Custom AI chatbots trained for your business, integrated into your website or product.',
    icon: Bot,
    colSpan: 'col-span-1 md:col-span-2',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 5,
    title: 'Workflow Automation',
    desc: 'Streamline business operations with smart automation that reduces manual effort.',
    icon: GitMerge,
    colSpan: 'col-span-1 md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 6,
    title: 'API Integration',
    desc: 'Connect third-party services, AI APIs, and data sources into your existing systems.',
    icon: Unplug,
    colSpan: 'col-span-1 md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 7,
    title: 'Dashboard & Admin Panels',
    desc: 'Clean, data-driven dashboards for monitoring, analytics, and internal operations.',
    icon: LayoutDashboard,
    colSpan: 'col-span-1 md:col-span-2',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 8,
    title: 'Data Visualisation Dashboards',
    desc: 'Interactive charts and visual analytics built with D3.js or Recharts.',
    icon: LineChart,
    colSpan: 'col-span-1 md:col-span-2',
    rowSpan: 'md:row-span-1',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95, 
    rotateX: 15,
    y: 20 
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 120, 
      damping: 20, 
      mass: 1 
    },
  },
};

const Services = () => {
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
      <div 
        className="w-full max-w-[1200px] mx-auto mt-12"
        style={{ perspective: '1200px' }} // 3D perspective wrapper
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
                className={`
                  ${service.colSpan} ${service.rowSpan}
                  relative flex flex-col justify-between overflow-hidden rounded-[2rem]
                  p-8 md:p-10
                  bg-gradient-to-br from-white/60 to-white/20 dark:from-white/10 dark:to-white/5
                  backdrop-blur-md
                  border-[1.5px] border-white/50 dark:border-white/10
                  shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
                  hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)]
                  hover:border-white/80 dark:hover:border-white/20
                  transition-colors duration-300
                  transform-gpu
                  group
                `}
              >
                {/* Optional subtle gradient glow behind the icon */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E05A47]/5 dark:bg-[#E05A47]/10 rounded-full blur-[40px] pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" />
                
                <div className="relative z-10 flex flex-col gap-6 h-full">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 text-slate-800 dark:text-white shadow-sm">
                      <Icon 
                        size={24} 
                        strokeWidth={1.5} 
                        className="group-hover:text-[#E05A47] transition-colors duration-300"
                      />
                    </div>
                    
                    {/* Hero Card Featured Pill */}
                    {service.id === 1 && (
                      <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#E05A47]/10 text-[#E05A47] border border-[#E05A47]/20">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-slate-900 dark:text-text-dark-primary mb-3 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {service.desc}
                    </p>
                  </div>

                  {/* Sub-pills for large cards */}
                  {service.tags && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                      {service.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 rounded-full text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Services;
