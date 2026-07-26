import React from 'react';

const StarIcon = () => (
  <svg viewBox="0 0 100 100" className="absolute top-2.5 left-2.5 hidden md:block md:w-[300px] md:h-[300px] text-brand-yellow z-[1]" fill="currentColor">
    <path d="M50 0L56 44L100 50L56 56L50 100L44 56L0 50L44 44Z" />
    <path d="M75 25L50 50L75 75L50 50Z" opacity="0.5" />
    <rect x="75" y="42" width="16" height="16" transform="rotate(45 83 50)" />
    <rect x="9" y="42" width="16" height="16" transform="rotate(45 17 50)" />
    <rect x="42" y="75" width="16" height="16" transform="rotate(45 50 83)" />
    <rect x="42" y="9" width="16" height="16" transform="rotate(45 50 17)" />
  </svg>
);

const BlobIcon = () => (
  <svg viewBox="0 0 100 100" className="absolute bottom-2.5 right-2.5 hidden md:block md:w-[140px] md:h-[140px] text-brand-orange z-[1]" fill="currentColor">
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

const AsteriskLogo = () => (
  <svg viewBox="0 0 24 24" className="w-9 h-9 text-brand-yellow" fill="currentColor">
    <circle cx="12" cy="12" r="2" />
    <ellipse cx="12" cy="5" rx="3" ry="5" />
    <ellipse cx="12" cy="19" rx="3" ry="5" />
    <ellipse cx="5" cy="12" rx="5" ry="3" />
    <ellipse cx="19" cy="12" rx="5" ry="3" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="w-full bg-footer-bg pt-5 pb-4 px-20 max-md:py-8 max-md:px-5 border-t border-divider-light dark:border-divider-dark relative overflow-hidden font-sans text-footer-text box-border">
      <StarIcon />
      <BlobIcon />

      <div className="relative z-[2] mx-auto my-2 max-w-[1000px] bg-white/[0.08] border border-white/[0.15] rounded-2xl backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.15)] max-md:shadow-[0_4px_16px_rgba(0,0,0,0.12)] px-10 py-3 box-border max-md:my-3 max-md:p-6">
        {/* Top Row */}
        <div className="flex justify-between items-start mb-3 flex-wrap gap-8 max-md:flex-col max-md:items-center max-md:gap-6 max-md:mb-6 max-md:text-center">
          <div className="flex items-center gap-3">
            <AsteriskLogo />
            <span className="text-sm font-bold tracking-wider uppercase text-footer-text">KRITIKA MANDALE</span>
          </div>

          <div className="flex gap-12 flex-wrap max-md:w-full max-md:flex-col max-md:items-center max-md:gap-6">
            {/* On mobile these two link columns sit side by side (half the
                stacked height of before); `md:contents` makes this wrapper
                disappear on desktop so the 3 groups go back to being flat
                siblings in the `flex gap-12` row above, unchanged. */}
            <div className="flex gap-10 max-md:justify-center md:contents">
              <div className="flex flex-col gap-1.5 max-md:items-center">
                <a href="#hero" className="text-footer-text text-sm font-medium opacity-85 no-underline leading-snug transition-all duration-250 hover:opacity-100 hover:text-brand-yellow">Home</a>
                <a href="#about" className="text-footer-text text-sm font-medium opacity-85 no-underline leading-snug transition-all duration-250 hover:opacity-100 hover:text-brand-yellow">About</a>
                <a href="#projects" className="text-footer-text text-sm font-medium opacity-85 no-underline leading-snug transition-all duration-250 hover:opacity-100 hover:text-brand-yellow">Projects</a>
              </div>
              <div className="flex flex-col gap-1.5 max-md:items-center">
                <a href="#stack" className="text-footer-text text-sm font-medium opacity-85 no-underline leading-snug transition-all duration-250 hover:opacity-100 hover:text-brand-yellow">My Stack</a>
                <a href="#experience" className="text-footer-text text-sm font-medium opacity-85 no-underline leading-snug transition-all duration-250 hover:opacity-100 hover:text-brand-yellow">Experience</a>
                <a href="#contact" className="text-footer-text text-sm font-medium opacity-85 no-underline leading-snug transition-all duration-250 hover:opacity-100 hover:text-brand-yellow">Contact</a>
              </div>
            </div>
            {/* Social links: horizontal wrapped row on mobile instead of a
                5-row vertical stack, back to a vertical column from md up. */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 max-w-[260px] md:max-w-none md:flex-col md:gap-1.5 md:justify-start">
              <a href="https://github.com/kritikamandale" target="_blank" rel="noopener noreferrer" className="text-footer-text text-sm font-medium opacity-85 leading-snug transition-all duration-250 hover:opacity-100 hover:text-brand-yellow uppercase underline underline-offset-4 p-3 -m-3 inline-block min-h-[44px] min-w-[44px]">GITHUB</a>
              <a href="https://linkedin.com/in/kritikamandale" target="_blank" rel="noopener noreferrer" className="text-footer-text text-sm font-medium opacity-85 leading-snug transition-all duration-250 hover:opacity-100 hover:text-brand-yellow uppercase underline underline-offset-4 p-3 -m-3 inline-block min-h-[44px] min-w-[44px]">LINKEDIN</a>
              <a href="https://twitter.com/kritikamandale" target="_blank" rel="noopener noreferrer" className="text-footer-text text-sm font-medium opacity-85 leading-snug transition-all duration-250 hover:opacity-100 hover:text-brand-yellow uppercase underline underline-offset-4 p-3 -m-3 inline-block min-h-[44px] min-w-[44px]">TWITTER</a>
              <a href="https://t.me/Kritikalog" target="_blank" rel="noopener noreferrer" className="text-footer-text text-sm font-medium opacity-85 leading-snug transition-all duration-250 hover:opacity-100 hover:text-brand-yellow uppercase underline underline-offset-4 p-3 -m-3 inline-block min-h-[44px] min-w-[44px]">TELEGRAM</a>
              <a href="https://hashnode.com/@kritikam" target="_blank" rel="noopener noreferrer" className="text-footer-text text-sm font-medium opacity-85 leading-snug transition-all duration-250 hover:opacity-100 hover:text-brand-yellow uppercase underline underline-offset-4 p-3 -m-3 inline-block min-h-[44px] min-w-[44px]">HASHNODE</a>
            </div>
          </div>
        </div>

        {/* Big Name Row */}
        <div className="relative my-2 max-md:my-4 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="absolute top-1/2 right-[5%] -translate-y-1/2 hidden md:block md:w-[300px] md:h-[300px] bg-[radial-gradient(circle,rgba(245,222,143,0.25)_0%,transparent_70%)] z-0 pointer-events-none"></div>
          <p className="relative z-[1] font-heading text-[clamp(1.25rem,6.2vw,5.5rem)] font-bold tracking-tight m-0 leading-tight text-footer-text text-center md:text-left max-w-full">
            KRITIKALOG
          </p>
          <p className="relative z-[1] text-sm text-footer-text opacity-70 mt-2 tracking-wide text-center md:text-left">
            Every project. Every lesson. Catalogued.
          </p>
        </div>

        {/* Bottom Row */}
        <div className="w-full h-[1px] bg-white/15 mb-2"></div>
        <div className="flex justify-between items-center flex-wrap gap-4 text-xs text-footer-text opacity-60 max-md:flex-col max-md:items-center max-md:text-center max-md:gap-3">
          <span className="">© {new Date().getFullYear()} Kritikalog. All Rights Reserved.</span>
          <span className="flex gap-4 items-center">
            <span className="bg-brand-yellow/15 text-brand-yellow rounded-pill text-[12px] px-3.5 py-1 font-medium">Available for work</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
