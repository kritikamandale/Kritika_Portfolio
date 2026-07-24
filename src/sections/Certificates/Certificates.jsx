'use client';
// src/sections/Certificates/Certificates.jsx
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import useIsMobile from '../../hooks/useIsMobile';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
  },
  {
    id: 'c5',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud Skills Boost',
    date: 'Issued Mar 2025',
    skills: ['Cloud Computing'],
    image: '/certificates/google_cloud.png',
  },
  {
    id: 'c6',
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: 'Issued Jun 2026',
    credentialId: 'z9d74azusmky',
    skills: ['Artificial Intelligence (AI)', 'Full-Stack Development', '+1 skill'],
    image: '/certificates/claudecode.png',
  },
];

const HeadingStar = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-7 h-7 text-accent shrink-0">
    <g transform="translate(50, 50)">
      <ellipse cx="0" cy="-25" rx="14" ry="25" />
      <ellipse cx="0" cy="-25" rx="14" ry="25" transform="rotate(72)" />
      <ellipse cx="0" cy="-25" rx="14" ry="25" transform="rotate(144)" />
      <ellipse cx="0" cy="-25" rx="14" ry="25" transform="rotate(216)" />
      <ellipse cx="0" cy="-25" rx="14" ry="25" transform="rotate(288)" />
      <circle cx="0" cy="0" r="15" />
    </g>
  </svg>
);

const CertCard = ({ cert, onOpen }) => (
  <div className="group relative flex flex-col shrink-0 snap-center snap-always w-[80vw] max-w-[340px] md:w-[360px] bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-5 lg:p-6 transition-shadow duration-300 hover:shadow-card-hover">
    <div
      className="relative mb-5 h-40 overflow-hidden rounded-lg cursor-pointer border border-border-light dark:border-border-dark bg-white dark:bg-black/20"
      onClick={() => onOpen(cert.image)}
      title="Click to view full certificate"
    >
      <Image
        src={cert.image}
        alt={`${cert.title} Certificate`}
        fill
        sizes="(max-width: 768px) 90vw, 360px"
        className="object-contain transition-transform duration-300 group-hover:scale-105"
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
      {cert.skills.map((skill) => (
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
);

const Certificates = () => {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const lenis = useLenis();
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  // Lock scroll when the modal is open. With Lenis `syncTouch` enabled, touch
  // scrolling is driven by Lenis rather than the browser, so a plain
  // `overflow: hidden` on <body> no longer stops the page moving behind the
  // modal on mobile — stop Lenis explicitly (and still set overflow for the
  // wheel / scrollbar case).
  React.useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      lenis?.start();
    };
  }, [selectedImage, lenis]);

  // DESKTOP ONLY (>=768px): pinned sticky pane + GSAP-driven horizontal rail.
  // Untouched. Mobile now uses a native CSS x-scroll-snap rail (see render) and
  // never runs GSAP.
  useGSAP(() => {
    // Skip on reduced-motion and on mobile (native scroll-snap handles those).
    if (prefersReduced || isMobile) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // Horizontal distance the track must travel so the last card ends flush.
      const getDistance = () =>
        Math.max(0, track.scrollWidth - track.parentElement.clientWidth);

      // Extra pinned scroll room held at the end (after the track finishes
      // moving) so the last card stays fully visible and readable instead of
      // the section releasing into the next one the instant it arrives.
      const HOLD = 500;

      // Pinned scroll room held at the START, before any horizontal movement
      // begins, so the section settles in view and the FIRST card is fully read
      // before the track starts sliding.
      const LEAD = Math.round(window.innerHeight * 0.5);

      // Grow the section tall enough that the sticky pane stays pinned for the
      // leading hold, the entire horizontal travel, and the trailing hold.
      const sizeSection = () => {
        section.style.height = `${window.innerHeight + LEAD + getDistance() + HOLD}px`;
      };
      sizeSection();

      const dist = getDistance() || 1;

      // Ensure the rail always starts parked on the first card.
      gsap.set(track, { x: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${LEAD + getDistance() + HOLD}`,
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: sizeSection,
        },
      });

      tl.to({}, { duration: LEAD }) // lead-in — plain vertical scroll first
        .to(track, { x: -dist, ease: 'none', duration: dist })
        .to({}, { duration: HOLD }); // hold — track stays parked at its final x

      return () => {
        section.style.height = '';
        tl.scrollTrigger && tl.scrollTrigger.kill();
        tl.kill();
        gsap.set(track, { clearProps: 'transform' });
      };
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [prefersReduced, isMobile] });

  return (
    <section
      ref={sectionRef}
      id="certificates"
      aria-label="Certifications"
      className="relative w-full bg-bg-light dark:bg-bg-dark"
    >
      {/* DESKTOP: native sticky pinning pane (GSAP drives the horizontal rail).
          MOBILE / reduced-motion: static pane — the rail is a plain, natively
          swipeable x-scroll-snap row, no pin. */}
      <div
        ref={stickyRef}
        className={
          prefersReduced || isMobile
            ? "static py-16 md:py-24 flex flex-col justify-center"
            : "sticky top-0 h-screen overflow-hidden flex flex-col justify-center"
        }
      >
        {/* Header */}
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 w-full mb-8 md:mb-10">
          <span className="section-label">Continuous Upskilling</span>
          <h2 className="section-title !mb-3 flex items-center gap-3">
            Validated Expertise
            <HeadingStar />
          </h2>
          <p className="section-subtitle !text-left !mx-0 max-w-2xl">
            Relentless learning and official accreditations across AI and Full-Stack technologies.
            <span> Scroll to browse →</span>
          </p>
        </div>

        {/* Track — DESKTOP: a `w-max` rail translated by GSAP as you scroll.
            MOBILE: native horizontal scroll-snap; `scroll-snap-stop: always`
            on each card (see CertCard) guarantees one certificate per swipe and
            the scroller ends exactly on the last card — zero dead scroll.
            Reduced motion: a plain horizontally-scrollable row. */}
        <div
          ref={trackRef}
          className={
            prefersReduced
              ? "flex flex-row gap-6 px-4 md:px-8 lg:px-12 overflow-x-auto max-w-full"
              : isMobile
                ? "flex flex-row gap-6 px-4 overflow-x-auto snap-x snap-mandatory overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                : "flex flex-row gap-6 px-4 md:px-8 lg:px-12 w-max will-change-transform"
          }
        >
          {CERTIFICATES.map((cert) => (
            <CertCard key={cert.id} cert={cert} onOpen={setSelectedImage} />
          ))}
        </div>
      </div>

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
    </section>
  );
};

export default Certificates;
