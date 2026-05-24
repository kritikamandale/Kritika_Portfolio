import React from 'react';

const StarIcon = () => (
  <svg viewBox="0 0 100 100" className="absolute top-2.5 left-2.5 w-[300px] h-[300px] text-brand-yellow z-[1]" fill="currentColor">
    <path d="M50 0L56 44L100 50L56 56L50 100L44 56L0 50L44 44Z" />
    <path d="M75 25L50 50L75 75L50 50Z" opacity="0.5" />
    <rect x="75" y="42" width="16" height="16" transform="rotate(45 83 50)" />
    <rect x="9" y="42" width="16" height="16" transform="rotate(45 17 50)" />
    <rect x="42" y="75" width="16" height="16" transform="rotate(45 50 83)" />
    <rect x="42" y="9" width="16" height="16" transform="rotate(45 50 17)" />
  </svg>
);

const BlobIcon = () => (
  <svg viewBox="0 0 100 100" className="absolute bottom-2.5 right-2.5 w-[140px] h-[140px] text-brand-orange z-[1]" fill="currentColor">
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
    <footer className="w-full bg-footer-bg pt-24 pb-15 px-20 max-md:py-8 max-md:px-5 border-t border-divider-light dark:border-divider-dark relative overflow-hidden font-sans text-footer-text box-border">
      <StarIcon />
      <BlobIcon />

      <div className="relative z-[2] mx-auto my-6 max-w-[1000px] bg-[#FDEEEE]/[0.08] border border-[#FDEEEE]/[0.15] rounded-2xl backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.15)] px-10 py-8 box-border max-md:my-3 max-md:p-6">
        {/* Top Row */}
        <div className="flex justify-between items-start mb-10 flex-wrap gap-8 max-md:flex-col max-md:gap-10">
          <div className="flex items-center gap-3">
            <AsteriskLogo />
            <span className="text-sm font-bold tracking-wider uppercase text-footer-text">KRITIKA MANDALE</span>
          </div>

          <div className="flex gap-12 flex-wrap max-md:flex-col max-md:gap-8">
            <div className="flex flex-col gap-3">
              <a href="#hero" className="text-footer-text text-sm font-medium opacity-85 no-underline leading-loose transition-all duration-250 hover:opacity-100 hover:text-brand-yellow">Home</a>
              <a href="#about" className="text-footer-text text-sm font-medium opacity-85 no-underline leading-loose transition-all duration-250 hover:opacity-100 hover:text-brand-yellow">About</a>
              <a href="#projects" className="text-footer-text text-sm font-medium opacity-85 no-underline leading-loose transition-all duration-250 hover:opacity-100 hover:text-brand-yellow">Projects</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#skills" className="text-footer-text text-sm font-medium opacity-85 no-underline leading-loose transition-all duration-250 hover:opacity-100 hover:text-brand-yellow">Skills</a>
              <a href="#experience" className="text-footer-text text-sm font-medium opacity-85 no-underline leading-loose transition-all duration-250 hover:opacity-100 hover:text-brand-yellow">Experience</a>
              <a href="#contact" className="text-footer-text text-sm font-medium opacity-85 no-underline leading-loose transition-all duration-250 hover:opacity-100 hover:text-brand-yellow">Contact</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="https://github.com/iamkritika" target="_blank" rel="noopener noreferrer" className="text-footer-text text-sm font-medium opacity-85 leading-loose transition-all duration-250 hover:opacity-100 hover:text-brand-yellow uppercase underline underline-offset-4 p-3 -m-3 inline-block min-h-[44px] min-w-[44px]">GITHUB</a>
              <a href="https://linkedin.com/in/kritikamandale" target="_blank" rel="noopener noreferrer" className="text-footer-text text-sm font-medium opacity-85 leading-loose transition-all duration-250 hover:opacity-100 hover:text-brand-yellow uppercase underline underline-offset-4 p-3 -m-3 inline-block min-h-[44px] min-w-[44px]">LINKEDIN</a>
              <a href="https://twitter.com/kritikamandale" target="_blank" rel="noopener noreferrer" className="text-footer-text text-sm font-medium opacity-85 leading-loose transition-all duration-250 hover:opacity-100 hover:text-brand-yellow uppercase underline underline-offset-4 p-3 -m-3 inline-block min-h-[44px] min-w-[44px]">TWITTER</a>
            </div>
          </div>
        </div>

        {/* Big Name Row */}
        <div className="relative my-15 max-md:my-10">
          <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(255,140,66,0.4)_0%,transparent_70%)] z-0 pointer-events-none"></div>
          <h1 className="relative z-[1] font-heading text-[clamp(48px,9vw,88px)] font-extrabold tracking-tight m-0 leading-tight text-footer-text">KRITIKALOG</h1>
          <p className="relative z-[1] text-sm text-footer-text opacity-70 mt-3 ml-[3px] tracking-wide">Every project. Every lesson. Catalogued.</p>
        </div>

        {/* Bottom Row */}
        <div className="w-full h-[1px] bg-[#FDEEEE]/15 mb-6"></div>
        <div className="flex justify-between items-center flex-wrap gap-4 text-xs text-footer-text opacity-60 max-md:flex-col max-md:items-start">
          <span className="">© {new Date().getFullYear()} Kritikalog All Rights Reserved.</span>
          <span className="flex gap-4 items-center">
            <span className="bg-accent/10 text-accent rounded-pill text-[12px] px-3.5 py-1 font-medium">Available for work</span>
            <span>Privacy Policy</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
