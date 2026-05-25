'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const CARDS = [
  {
    category: 'National Level Hackathon',
    title: 'Top Finalist — Hackwise, IIM Indore',
    context: 'High-intensity, national competitive build bridging engineering and commercial logic.',
    focus: 'Built advanced architecture models unifying predictive data workflows and machine learning systems under rigorous constraints.'
  },
  {
    category: 'Engineering Excellence',
    title: 'Outstanding Performer — National AI Innovation Challenge',
    context: 'Evaluated against hundreds of technical submissions for robust system scalability.',
    focus: 'Recognized for deploying optimized natural language processing (NLP) architectures and high-throughput data parsing systems.'
  },
  {
    category: 'Full-Stack Systems',
    title: 'First Place — Advanced SaaS Buildathon',
    context: 'Fast-paced product cycle evaluating architecture maturity and interface design.',
    focus: 'Architected an autonomous workflow engine integrated with interactive real-time telemetry dashboards and dynamic metrics.'
  },
  {
    category: 'Open Source Contribution',
    title: 'Technical Innovation Honor — Elite Developer Summit',
    context: 'Awarded for excellence in creative automation and tool optimization.',
    focus: 'Engineered an automated pipeline toolkit designed to streamline third-party API dependencies and data visualizations.'
  }
];

const Achievements = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    // Only run GSAP on desktop (md breakpoint is usually 768px in Tailwind)
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      // Initial setup: hide all cards below the screen except the first one
      cards.forEach((card, i) => {
        if (i > 0) gsap.set(card, { y: '120vh' });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 12%", // Pin it when the container hits near the top
          end: `+=${cards.length * 90}%`, // Scroll duration scales with card count
          pin: true,
          scrub: 1, // Smooth scrub
        }
      });

      // Build the stacking sequence
      cards.forEach((card, i) => {
        if (i === 0) return;

        // Slide the current card up
        tl.to(card, {
          y: 0,
          duration: 1,
          ease: "power1.inOut"
        }, i);

        // Scale down and dim ALL previous cards to create depth
        for (let j = 0; j < i; j++) {
          const prevCard = cards[j];
          const overlay = prevCard.querySelector('.card-overlay');
          
          tl.to(prevCard, {
            scale: 1 - 0.04 * (i - j), // Scale down by 4% per depth level
            y: - (20 * (i - j)),       // Push slightly up to stack visually
            duration: 1,
            ease: "power1.inOut"
          }, i);

          if (overlay) {
            tl.to(overlay, {
              opacity: 0.25 * (i - j), // Darken by 25% per depth level
              duration: 1,
              ease: "power1.inOut"
            }, i);
          }
        }
      });
    });

    // Cleanup inline styles if returning to mobile
    return () => {
      gsap.set(cardsRef.current, { clearProps: "all" });
      const overlays = document.querySelectorAll('.card-overlay');
      gsap.set(overlays, { clearProps: "all" });
    };
  }, { scope: containerRef });

  return (
    <section 
      id="achievements" 
      ref={containerRef} 
      className="w-full relative bg-[#FFFDF9] dark:bg-bg-dark py-24 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-20 relative">
        
        {/* LEFT PANEL: Sticky Typography Header */}
        <div className="w-full md:w-[45%] flex flex-col md:sticky md:top-[12vh] h-fit z-10">
          <div className="bg-[#E05A47]/10 text-[#E05A47] text-[11px] font-bold uppercase tracking-[0.15em] py-1.5 px-4 rounded-full w-fit mb-6">
            RECOGNITIONS
          </div>
          
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-heading font-extrabold text-slate-900 dark:text-text-dark-primary leading-[1.1] mb-6 flex items-start gap-4">
            Hackathons & Awards
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#E05A47] shrink-0 mt-2">
              <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.8-6.3 4.8 2.3-7.4-6-4.6h7.6z" />
            </svg>
          </h2>
          
          <p className="text-slate-600 dark:text-text-dark-secondary leading-[1.8] text-lg font-medium">
            A chronicle of high-intensity builds, competitive engineering, and national-level technical triumphs.
          </p>
        </div>

        {/* RIGHT PANEL: Scroll-Driven Arena */}
        <div className="w-full md:w-[55%] relative md:h-[60vh] flex flex-col gap-6 md:block">
          {CARDS.map((card, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="md:absolute top-0 left-0 w-full bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-border-dark rounded-2xl p-8 md:p-10 flex flex-col gap-5 transform-gpu shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none"
              style={{ zIndex: i }}
            >
              {/* Darkening Overlay for 3D depth */}
              <div className="card-overlay absolute inset-0 bg-slate-900 dark:bg-black rounded-2xl pointer-events-none z-10" style={{ opacity: 0 }} />
              
              <div className="relative z-20 flex flex-col h-full">
                <span className="text-[#E05A47] text-sm font-bold uppercase tracking-wider mb-2">
                  {card.category}
                </span>
                
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-slate-800 dark:text-text-dark-primary mb-4 leading-[1.2]">
                  {card.title}
                </h3>
                
                <p className="text-slate-600 dark:text-text-dark-secondary font-medium leading-relaxed mb-6">
                  {card.context}
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-border-dark">
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    <strong className="text-slate-700 dark:text-slate-300 font-semibold mr-2">Core Focus:</strong>
                    {card.focus}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
