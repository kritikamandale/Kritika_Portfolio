'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';

const SERVICES_DATA = [
  {
    id: 1,
    title: 'AI-Powered SaaS Applications',
    desc: 'Build and deploy intelligent SaaS products with subscription-ready architecture.',
    icon: '🚀',
    size: 'LARGE',
    colSpan: 'lg:col-span-5',
    rowSpan: 'lg:row-span-2',
    iconAnim: { y: [0, -8, 0] },
    iconTransition: { duration: 0.5 },
    tags: ['LLM Integration', 'Subscription Auth', 'Scalable APIs']
  },
  {
    id: 2,
    title: 'Full-Stack Web Development',
    desc: 'End-to-end web applications built with React, Next.js, Node.js, and scalable backends.',
    icon: '🌐',
    size: 'MEDIUM',
    colSpan: 'lg:col-span-4',
    rowSpan: 'lg:row-span-1',
    iconAnim: { rotate: 360 },
    iconTransition: { duration: 0.6 }
  },
  {
    id: 3,
    title: 'AI Chatbot Development',
    desc: 'Custom AI chatbots trained for your business, integrated into your website or product.',
    icon: '🤖',
    size: 'SMALL',
    colSpan: 'lg:col-span-3',
    rowSpan: 'lg:row-span-1',
    iconAnim: { rotate: [0, -10, 10, 0] }
  },
  {
    id: 4,
    title: 'AI Automation Systems',
    desc: 'Automate repetitive workflows using intelligent agents and LLM-powered pipelines.',
    icon: '⚡',
    size: 'MEDIUM',
    colSpan: 'lg:col-span-4',
    rowSpan: 'lg:row-span-1',
    iconAnim: { scale: [1, 1.3, 1] }
  },
  {
    id: 5,
    title: 'Dashboard & Admin Panels',
    desc: 'Clean, data-driven dashboards for monitoring, analytics, and internal operations.',
    icon: '📊',
    size: 'MEDIUM-TALL',
    colSpan: 'lg:col-span-3',
    rowSpan: 'lg:row-span-2',
    iconAnim: { scaleY: [1, 1.15, 1] },
    tags: ['Real-time Data', 'User Management']
  },
  {
    id: 6,
    title: 'Workflow Automation',
    desc: 'Streamline business operations with smart automation that reduces manual effort.',
    icon: '🔄',
    size: 'SMALL',
    colSpan: 'lg:col-span-3',
    rowSpan: 'lg:row-span-1',
    iconAnim: { rotate: 360 },
    iconTransition: { duration: 0.7, ease: 'linear' }
  },
  {
    id: 7,
    title: 'API Integration',
    desc: 'Connect third-party services, AI APIs, and data sources into your existing systems.',
    icon: '🔗',
    size: 'SMALL',
    colSpan: 'lg:col-span-3',
    rowSpan: 'lg:row-span-1',
    iconAnim: { x: [0, 4, -4, 0] }
  },
  {
    id: 8,
    title: 'Data Visualisation Dashboards',
    desc: 'Interactive charts and visual analytics built with D3.js or Recharts.',
    icon: '📈',
    size: 'SMALL',
    colSpan: 'lg:col-span-3',
    rowSpan: 'lg:row-span-1',
    iconAnim: { scaleX: [1, 1.1, 1] }
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <SectionWrapper
      id="services"
      label="Domains"
      title="What I Build"
      subtitle="A breakdown of the domains I work across and the kind of problems I enjoy solving"
      alt
    >
      <div 
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mt-8 w-full max-w-[1200px] mx-auto"
      >
        {/* Global Mouse Tracking Radial Glow - Light Mode */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 dark:hidden"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(200,75,49,0.06), transparent 70%)`
          }}
        />
        {/* Global Mouse Tracking Radial Glow - Dark Mode */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(200,75,49,0.1), transparent 70%)`
          }}
        />

        {/* 12-Column Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
          {SERVICES_DATA.map((service, index) => {
            const isFeatured = service.size === 'LARGE';
            const isRowSpan2 = service.size === 'LARGE' || service.size === 'MEDIUM-TALL';
            
            // Map MD breakpoints to keep it tidy on tablet
            let mdColSpan = 'md:col-span-3';
            if (isFeatured) mdColSpan = 'md:col-span-6';
            else if (service.size === 'MEDIUM-TALL') mdColSpan = 'md:col-span-6';
            else if (service.size === 'MEDIUM') mdColSpan = 'md:col-span-3';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                whileHover={{ y: -5 }}
                className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a1a] p-7 flex flex-col justify-between
                  border border-[rgba(200,75,49,0.12)] dark:border-[rgba(200,75,49,0.18)]
                  shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(200,75,49,0.15)]
                  transition-shadow duration-300
                  ${service.colSpan} ${mdColSpan} sm:col-span-full
                  ${service.rowSpan} ${isRowSpan2 ? 'md:row-span-2 sm:row-span-1' : 'md:row-span-1'}
                `}
              >
                {/* Featured Card Diagonal Gradient Background */}
                {isFeatured && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FDF0EC] to-white dark:from-[#2a1a16] dark:to-[#1a1a1a] opacity-50 z-0" />
                )}

                <div className="relative z-10 flex flex-col items-start gap-4 h-full">
                  <div className="w-full flex justify-between items-start">
                    <motion.span
                      className={`inline-block ${isFeatured ? 'text-4xl' : 'text-2xl'}`}
                      whileHover={service.iconAnim}
                      transition={service.iconTransition || { duration: 0.4, ease: 'easeInOut' }}
                    >
                      {service.icon}
                    </motion.span>
                    
                    {isFeatured && (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full text-[#C84B31] bg-[#C84B31]/10 font-bold">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <h3 className={`font-heading font-semibold text-text-primary dark:text-text-dark-primary
                      ${isFeatured ? 'text-xl' : service.size === 'MEDIUM' || service.size === 'MEDIUM-TALL' ? 'text-lg' : 'text-base'}`}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Tags for row-span-2 cards */}
                {isRowSpan2 && service.tags && (
                  <div className="relative z-10 mt-5 pt-5 border-t border-current border-opacity-10 dark:border-opacity-10">
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full border border-current opacity-60 text-text-primary dark:text-text-dark-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services;
