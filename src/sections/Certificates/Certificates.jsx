'use client';
// src/sections/Certificates/Certificates.jsx
import React, { useState } from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import RevealGroup from '../../components/RevealGroup/RevealGroup';

const CERTIFICATES = [
  {
    id: 'c1',
    title: 'Introduction to Machine Learning',
    issuer: 'Kaggle',
    date: 'Issued Feb 2026',
    skills: ['Machine Learning', 'Python', '+1 skill'],
    image: '/certificates/kaggle.png', 
  },
  {
    id: 'c2',
    title: 'Nestle E-learning 2025 | sustainability',
    issuer: 'Nestlé',
    date: 'Issued Mar 2025',
    skills: ['Sustainable Design'],
    image: '/certificates/nestle.png',
  },
  {
    id: 'c3',
    title: 'Postman API Fundamentals Student Expert',
    issuer: 'Postman',
    date: 'Issued Mar 2025',
    skills: ['Full-Stack Development'],
    image: '/certificates/postman.png',
  },
  {
    id: 'c4',
    title: 'Data Analysis with Python',
    issuer: 'freeCodeCamp',
    date: 'Issued Jul 2025',
    credentialId: 'iamkritical-dawp',
    skills: ['Data Analysis', 'Python'],
    image: '/certificates/freecodecamp.png',
    link: '#', 
  },
  {
    id: 'c5',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud Skills Boost',
    date: 'Issued Mar 2025',
    skills: ['Cloud Computing'],
    image: '/certificates/google_cloud.png',
    link: '#', 
  }
];

const Certificates = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <SectionWrapper
      id="certificates"
      label="Continuous Upskilling"
      title="Validated Expertise"
      subtitle="Relentless learning and official accreditations across AI, Full-Stack, and Cloud technologies."
    >
      <RevealGroup staggerDelay={100} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {CERTIFICATES.map((cert) => (
          <div
            key={cert.id}
            className="group relative flex flex-col h-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-5 lg:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover hover:border-black/25 dark:hover:border-white/25"
          >
            <div 
              className="mb-5 overflow-hidden rounded-lg cursor-pointer border border-border-light dark:border-border-dark bg-white dark:bg-black/20"
              onClick={() => setSelectedImage(cert.image)}
              title="Click to view full certificate"
            >
              <img 
                src={cert.image} 
                alt={`${cert.title} Certificate`} 
                className="w-full h-32 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            <div className="flex flex-col flex-grow">
              <h3 className="font-heading text-base leading-tight font-bold text-text-primary dark:text-text-dark-primary mb-1 min-h-[2.5rem] line-clamp-2">
                {cert.title}
              </h3>
              
              <div className="text-[13px] font-semibold text-text-secondary dark:text-text-dark-secondary mb-1">
                {cert.issuer}
              </div>
              
              <div className="text-xs text-text-muted dark:text-text-dark-muted mb-2">
                {cert.date}
              </div>
              
              {cert.credentialId && (
                <div className="text-[11px] font-mono text-text-muted dark:text-text-dark-muted mb-2 line-clamp-1">
                  ID {cert.credentialId}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4 mt-auto pt-2">
              {cert.skills.map(skill => (
                <span 
                  key={skill} 
                  className="text-[11px] font-medium text-text-secondary dark:text-text-dark-secondary bg-surface-2-light dark:bg-surface-2-dark border border-border-light dark:border-border-dark px-2.5 py-1 rounded-full whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-divider-light dark:border-divider-dark">
              {cert.link ? (
                <a 
                  href={cert.link} 
                  className="text-[13px] font-bold text-brand-orange hover:text-brand-red transition-colors flex items-center gap-1 w-fit"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Show credential ↗
                </a>
              ) : (
                <span className="text-[13px] font-bold text-text-muted dark:text-text-dark-muted flex items-center gap-1">
                  Credential verified
                </span>
              )}
            </div>
          </div>
        ))}
      </RevealGroup>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
          aria-modal="true"
          role="dialog"
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center cursor-default" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Certificate Full View" 
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <button 
              className="absolute -top-4 -right-4 md:top-4 md:right-4 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              onClick={() => setSelectedImage(null)}
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

export default Certificates;
