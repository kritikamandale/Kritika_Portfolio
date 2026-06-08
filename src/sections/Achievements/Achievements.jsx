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
    title: 'National Finalist — Hackwise 2026, IIM Indore',
    context: 'Selected among the top teams nationwide for delivering an innovative and highly technical solution.',
    focus: 'Demonstrated rapid prototyping and robust system architecture under high-stakes competitive evaluation.'
  },
  {
    category: '30-Hour Hackathon',
    title: '1st Runner-Up — Openpools Doppelganger',
    context: 'Engineered an outstanding project under extreme time constraints during a continuous 30-hour coding sprint.',
    focus: 'Optimized development workflows for rapid iteration and stable deployment in a high-pressure environment.'
  },
  {
    category: 'Nagpur Chapter',
    title: '1st Runner-Up — NASA Space Apps Challenge',
    context: "Developed a creative, data-driven solution utilizing NASA's open-source space and Earth datasets.",
    focus: 'Engineered data parsing pipelines to process and visualize complex open-source satellite telemetry.'
  },
  {
    category: 'Blockchain Event',
    title: '1st Runner-Up — Stellar Ragnarok',
    context: 'Secured top honors by conceptualizing and building an innovative decentralized application on the blockchain.',
    focus: 'Architected secure smart contracts and seamless Web3 wallet integrations for a decentralized ecosystem.'
  },
  {
    category: 'IIT Delhi · Case Competition',
    title: '3rd Place — OpVasion \'26, IIT Delhi',
    context: 'Podium finish at a national case study competition by PARIVARTAN, IIT Delhi — cracking India\'s cold chain crisis and proving food spoilage emits 28× more carbon than all direct transport.',
    focus: 'Applied systems-thinking as a tech engineer to build a carbon strategy framework that outpaced conventional business analysis.'
  }
];


const Achievements = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      // 1. Setup initial states
      gsap.set(cards, { clearProps: "all" });
      const overlays = document.querySelectorAll('.card-overlay');
      gsap.set(overlays, { opacity: 0 });

      // Cards 1-3 start hidden below the viewport
      cards.forEach((card, i) => {
        if (i > 0) gsap.set(card, { y: '100vh' });
      });

      // 2. Create ScrollTrigger timeline tied to the 400vh section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", 
          end: "bottom bottom", 
          scrub: true, // Set to true (instant) to prevent over-scrolling from lag
          snap: {
            snapTo: 1 / (CARDS.length - 1),
            duration: { min: 0.2, max: 0.4 },
            delay: 0,
            ease: "power2.out",
          },
          // Note: NO GSAP PINNING used. 
          // We rely on native CSS 'sticky' for buttery smooth, layout-shift-free pinning!
        }
      });

      // 3. Build Stacking Animation
      cards.forEach((card, i) => {
        if (i === 0) return;

        // Slide the incoming card up to 0
        tl.to(card, {
          y: 0,
          duration: 1,
          ease: "none"
        }, i);

        // Scale down, push up slightly, and dim all previous cards
        for (let j = 0; j < i; j++) {
          const prevCard = cards[j];
          const overlay = prevCard.querySelector('.card-overlay');
          
          tl.to(prevCard, {
            scale: 1 - 0.05 * (i - j),
            y: - (20 * (i - j)),
            duration: 1,
            ease: "none"
          }, i);

          if (overlay) {
            tl.to(overlay, {
              opacity: 0.25 * (i - j),
              duration: 1,
              ease: "none"
            }, i);
          }
        }
      });
    });

    return () => {
      // Cleanup for mobile resize
      gsap.set(cardsRef.current, { clearProps: "all" });
      const overlays = document.querySelectorAll('.card-overlay');
      gsap.set(overlays, { clearProps: "all" });
    };
  }, { scope: containerRef });

  return (
    <section 
      id="achievements" 
      aria-label="Hackathons & Awards"
      ref={containerRef} 
      // The section is 400vh on desktop to provide a solid 1:1 scroll track.
      className="w-full relative bg-[#FFFDF9] dark:bg-bg-dark min-h-[95vh] md:h-[400vh]"
    >
      {/* NATIVE CSS PINNING via sticky */}
      <div className="w-full md:sticky md:top-0 md:min-h-[95vh] flex items-center overflow-hidden py-24 md:py-0">
        
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row gap-12 md:gap-20 w-full relative">
          
          {/* LEFT PANEL: Typography */}
          <div className="w-full md:w-[45%] flex flex-col z-10 justify-center">
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

          {/* RIGHT PANEL: Stacking Arena */}
          <div className="w-full md:w-[55%] relative flex flex-col gap-6 md:block md:h-[60vh] perspective-1000">
            {CARDS.map((card, i) => (
              <div 
                key={i}
                ref={el => { cardsRef.current[i] = el; }}
                className="md:absolute top-0 left-0 w-full md:h-full bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-border-dark rounded-2xl p-6 md:p-8 flex flex-col gap-4 transform-gpu shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none"
                style={{ zIndex: i }}
              >
                {/* Darkening Overlay for 3D depth */}
                <div className="card-overlay absolute inset-0 bg-slate-900 dark:bg-black rounded-2xl pointer-events-none z-10" style={{ opacity: 0 }} />
                
                <div className="relative z-20 flex flex-col h-full">
                  <span className="text-[#E05A47] text-sm font-bold uppercase tracking-wider mb-2">
                    {card.category}
                  </span>
                  
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-slate-800 dark:text-text-dark-primary mb-3 leading-[1.25]">
                    {card.title}
                  </h3>
                  
                  <p className="text-[14px] text-slate-600 dark:text-text-dark-secondary font-medium leading-relaxed mb-4">
                    {card.context}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-border-dark">
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
      </div>
    </section>
  );
};

export default Achievements;
