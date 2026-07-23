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
    context: 'Built Proven.io, an AI-powered platform simulating "day-in-the-life" work environments for Behavioral & Technical Readiness Audits.',
    focus: 'Bridged the gap between certifications and job-readiness by evaluating candidates on adaptability, communication, and performance under pressure.'
  },
  {
    category: '30-Hour Hackathon',
    title: '1st Runner-Up — Openpools Doppelganger',
    context: 'Engineered SecureID from a blank whiteboard to a fully working prototype during a continuous 30-hour coding sprint.',
    focus: 'Integrated KYC verification, face recognition, and blockchain-based records into a single, tamper-proof student identity verification workflow.'
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


const CardContent = ({ card }) => (
  <div className="relative z-20 flex flex-col h-full">
    <span className="text-[#B02618] text-sm font-bold uppercase tracking-wider mb-2">
      {card.category}
    </span>

    <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-3 leading-[1.25]">
      {card.title}
    </h3>

    <p className="text-[17px] text-text-secondary dark:text-text-dark-secondary font-medium leading-relaxed mb-4">
      {card.context}
    </p>

    <div className="mt-6 pt-4 border-t border-divider-light dark:border-border-dark">
      <p className="text-[16px] text-text-muted dark:text-text-dark-muted leading-relaxed">
        <strong className="text-text-primary dark:text-text-dark-primary font-semibold mr-2">Core Focus:</strong>
        {card.focus}
      </p>
    </div>
  </div>
);

const Achievements = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const cardsRef = useRef([]);
  const arenaRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = cardsRef.current.filter(Boolean);
      const section = containerRef.current;
      const sticky = stickyRef.current;
      if (cards.length === 0 || !section || !sticky) return;

      // 1. Setup initial states
      gsap.set(cards, { clearProps: "all" });
      const overlays = document.querySelectorAll('.card-overlay');
      gsap.set(overlays, { opacity: 0 });

      // Cards 1-3 start hidden just below the container
      cards.forEach((card, i) => {
        if (i > 0) gsap.set(card, { y: '120%' });
      });

      // Each "beat" (a hold or a transition) gets an equal, explicit pixel
      // budget: 1 initial hold (card 0) + (N-1) transitions + 1 final hold
      // (card N-1, so it stays readable) = N+1 beats.
      const STEP = 380;
      const numBeats = CARDS.length + 1;
      const animPx = STEP * numBeats;

      // The section's height is driven explicitly from JS: sticky-pane height
      // (however tall it actually renders) plus the scroll distance the
      // animation needs. This guarantees the whole animation — including the
      // final hold — completes *before* native CSS sticky un-pins, instead of
      // racing/overlapping with the un-pin the way a bare `md:h-[Nvh]` class
      // (tied to "bottom bottom") would.
      const sizeSection = () => {
        section.style.height = `${sticky.offsetHeight + animPx}px`;
      };
      sizeSection();

      // 2. Create ScrollTrigger timeline tied to an explicit pixel range
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${animPx}`,
          scrub: true, // Set to true (instant) to prevent over-scrolling from lag
          invalidateOnRefresh: true,
          onRefresh: sizeSection,
          snap: {
            snapTo: 1 / numBeats,
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
          duration: STEP,
          ease: "none"
        }, i * STEP);

        // Scale down, push up slightly, and dim previous cards.
        // Distance is capped at 2 "steps back" so cards further back in the
        // stack don't keep drifting/shrinking — they settle just behind the
        // last visible card instead of fanning out above the viewport.
        for (let j = 0; j < i; j++) {
          const prevCard = cards[j];
          const overlay = prevCard.querySelector('.card-overlay');
          const dist = Math.min(i - j, 2);

          tl.to(prevCard, {
            scale: 1 - 0.03 * dist,
            y: - (8 * dist),
            duration: STEP,
            ease: "none"
          }, i * STEP);

          if (overlay) {
            tl.to(overlay, {
              opacity: Math.min(0.55, 0.22 * dist),
              duration: STEP,
              ease: "none"
            }, i * STEP);
          }
        }
      });

      // 4. Hold on the last card for one more full beat before the section
      // releases — without this, the final card arrives exactly as the
      // pinned scroll range ends, so it's yanked away before it can be read.
      tl.to({}, { duration: STEP });

      return () => {
        section.style.height = '';
        tl.scrollTrigger && tl.scrollTrigger.kill();
        tl.kill();
      };
    });

    // MOBILE (<768px): same pinned card-stacking as desktop — one scroll per
    // card — but the arena height is MEASURED from the tallest card at runtime
    // (desktop uses a fixed 48vh, which would clip these long cards on a narrow
    // screen). A small buffer absorbs late font reflow so nothing ever clips.
    mm.add("(max-width: 767px)", () => {
      const cards = cardsRef.current.filter(Boolean);
      const section = containerRef.current;
      const sticky = stickyRef.current;
      const arena = arenaRef.current;
      if (cards.length === 0 || !section || !sticky || !arena) return;

      // Reset, then measure natural heights while the cards are still in normal
      // flow, and lock the arena + every card to the tallest one so the stacked
      // (absolute) cards are uniform and never clip.
      gsap.set(cards, { clearProps: "all" });
      arena.style.height = '';
      const maxH = Math.max(...cards.map((c) => c.offsetHeight));
      const arenaH = Math.ceil(maxH * 1.06) + 8; // buffer for font reflow
      arena.style.height = `${arenaH}px`;

      const overlays = arena.querySelectorAll('.card-overlay');
      gsap.set(overlays, { opacity: 0 });

      cards.forEach((card, i) => {
        gsap.set(card, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: arenaH,
          y: i > 0 ? '120%' : '0%',
        });
      });

      // Scroll distance per card — ~half a screen, i.e. one normal swipe brings
      // in one card. Small enough that a swipe reaches the next snap point (so
      // it doesn't get pulled back and require repeated swipes), large enough
      // that momentum doesn't blow past two.
      const STEP = Math.round(window.innerHeight * 0.55);
      const numBeats = CARDS.length + 1;
      const animPx = STEP * numBeats;

      const sizeSection = () => {
        section.style.height = `${sticky.offsetHeight + animPx}px`;
      };
      sizeSection();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${animPx}`,
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: sizeSection,
          snap: {
            snapTo: 1 / numBeats,
            duration: { min: 0.2, max: 0.4 },
            delay: 0,
            directional: true, // snap forward in the direction of the swipe
            ease: "power2.out",
          },
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(card, { y: 0, duration: STEP, ease: "none" }, i * STEP);
        for (let j = 0; j < i; j++) {
          const prevCard = cards[j];
          const overlay = prevCard.querySelector('.card-overlay');
          const dist = Math.min(i - j, 2);
          tl.to(prevCard, {
            scale: 1 - 0.03 * dist,
            y: - (8 * dist),
            duration: STEP,
            ease: "none",
          }, i * STEP);
          if (overlay) {
            tl.to(overlay, {
              opacity: Math.min(0.55, 0.22 * dist),
              duration: STEP,
              ease: "none",
            }, i * STEP);
          }
        }
      });
      tl.to({}, { duration: STEP });

      // This section is lazy-loaded and sets its own (tall) height here, which
      // pushes the Certificates section below it further down the page. If
      // Certificates' ScrollTrigger measured its start before this ran, it would
      // begin its horizontal scroll early — while the user is still in Awards.
      // Refresh once on the next frame so every trigger below recomputes against
      // the final layout.
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        section.style.height = '';
        arena.style.height = '';
        tl.scrollTrigger && tl.scrollTrigger.kill();
        tl.kill();
        gsap.set(cards, { clearProps: "all" });
        gsap.set(overlays, { clearProps: "all" });
      };
    });

    return () => {
      mm.revert();
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
      // Fallback height for the instant before JS measures the sticky pane
      // and sets the real height explicitly (see sizeSection in useGSAP).
      className="w-full relative bg-bg-light dark:bg-bg-dark min-h-[95vh] md:h-[400vh]"
    >
      {/* NATIVE CSS PINNING via sticky — now on mobile too, so the card-stack
          plays one-scroll-per-card on phones just like desktop. */}
      <div ref={stickyRef} className="w-full sticky top-0 min-h-[90vh] md:min-h-[95vh] flex items-center overflow-hidden py-0">

        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row gap-6 md:gap-20 w-full relative">
          
          {/* LEFT PANEL: Typography */}
          <div className="w-full md:w-[45%] flex flex-col z-10 justify-center">
            <div className="bg-[#B02618]/10 text-[#B02618] text-[11px] font-bold uppercase tracking-[0.15em] py-1.5 px-4 rounded-full w-fit mb-6">
              RECOGNITIONS
            </div>

            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-heading font-extrabold text-text-primary dark:text-text-dark-primary leading-[1.1] mb-6 flex items-start gap-4">
              Hackathons & Awards
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-8 h-8 text-[#B02618] shrink-0 mt-2">
                <g transform="translate(50, 50)">
                  <ellipse cx="0" cy="-25" rx="14" ry="25" />
                  <ellipse cx="0" cy="-25" rx="14" ry="25" transform="rotate(72)" />
                  <ellipse cx="0" cy="-25" rx="14" ry="25" transform="rotate(144)" />
                  <ellipse cx="0" cy="-25" rx="14" ry="25" transform="rotate(216)" />
                  <ellipse cx="0" cy="-25" rx="14" ry="25" transform="rotate(288)" />
                  <circle cx="0" cy="0" r="15" />
                </g>
              </svg>
            </h2>
            
            {/* Hidden on mobile so the pinned card-stack has room to fit within
                one viewport; shown from md up. */}
            <p className="hidden md:block text-text-secondary dark:text-text-dark-secondary leading-[1.8] text-lg font-medium">
              A chronicle of high-intensity builds, competitive engineering, and national-level technical triumphs.
            </p>
          </div>

          {/* RIGHT PANEL: Stacking Arena — pinned card-stack on both mobile & desktop */}
          <div ref={arenaRef} className="w-full md:w-[55%] relative flex flex-col gap-6 md:gap-0 md:block md:h-[48vh]">
            {CARDS.map((card, i) => (
              <div
                key={i}
                ref={el => { cardsRef.current[i] = el; }}
                className="md:absolute top-0 left-0 w-full md:h-full bg-white dark:bg-[#1a1a1a] border border-border-light dark:border-border-dark rounded-2xl p-6 md:p-8 flex flex-col gap-4 transform-gpu shadow-[0_20px_40px_-15px_rgba(58,36,24,0.10)] dark:shadow-none"
                style={{ zIndex: i }}
              >
                {/* Darkening Overlay for 3D depth (desktop stacking only) */}
                <div className="card-overlay absolute inset-0 bg-[#3A2418] dark:bg-black rounded-2xl pointer-events-none z-10" style={{ opacity: 0 }} />
                <CardContent card={card} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Achievements;
