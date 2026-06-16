'use client';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useRef } from 'react';

// ── Scroll word component for Hero highlight effect ─────────
const HeroScrollWord = ({ word, index, totalWords, scrollYProgress }) => {
  const wordStart = index / totalWords;
  const wordEnd = (index + 1) / totalWords;

  const color = useTransform(
    scrollYProgress,
    [wordStart, wordEnd],
    ['#B0A6AD', '#C9513D'] // Grey to brand orange/red
  );

  const finalColor = useTransform(scrollYProgress, (latest) => {
    if (latest >= wordEnd + 0.02) return '#2B2028'; // Dark primary
    if (latest >= wordStart) return undefined;
    return '#B0A6AD'; // Grey
  });

  const resolvedColor = useTransform(
    [color, finalColor],
    ([animatedColor, overrideColor]) => overrideColor !== undefined ? overrideColor : animatedColor
  );

  return (
    <motion.span style={{ color: resolvedColor }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
};

const TelegramIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z"/>
    <path d="M22 2 11 13"/>
  </svg>
);

const GithubIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.3 5.3 0 0 0 19 4.5a5.2 5.2 0 0 0-.5-4.5s-1.5-.5-4.5 1.5a14.2 14.2 0 0 0-8 0c-3-2-4.5-1.5-4.5-1.5a5.2 5.2 0 0 0-.5 4.5 5.3 5.3 0 0 0 1.5 3.3c0 5.77 3.34 6.79 6.5 7.17A4.8 4.8 0 0 0 8 18v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const TwitterIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const HashnodeIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="m22.351 8.019-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z"/>
  </svg>
);
import Image from 'next/image';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Map the text reveal precisely to the 100vh scroll duration of the pinned section
    offset: ["start start", "end end"]
  });

  const revealText = "Building AI-powered web applications and intelligent systems for real-world impact. Full-Stack & AI/ML Developer — I design and build end-to-end products that combine scalable web interfaces with intelligent ML systems.";
  const revealWords = revealText.split(' ');



  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative h-[150vh] md:h-[200vh] w-full bg-[#F8F5F2] z-10"
    >
      <div className="sticky top-0 w-full min-h-[95vh] overflow-hidden flex flex-col justify-center pt-24 pb-12">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-bl from-[#E6B45B]/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gradient-to-tr from-[#C9513D]/10 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 flex-1 flex flex-col">
        {/* Main 2-column layout */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 lg:gap-12 flex-1">
          
          {/* LEFT COLUMN - Portrait Area */}
          <motion.div 
            className="w-full md:w-5/12 lg:w-4/12 flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              className="relative w-[320px] h-[360px] lg:w-[420px] lg:h-[480px]"
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              {/* Decorative dotted pattern */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-[radial-gradient(#C9513D_2px,transparent_2px)] [background-size:16px_16px] opacity-20" />
              
              {/* Floating accent circle */}
              <motion.div 
                className="absolute top-12 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#E6B45B] to-[#C9513D] shadow-lg z-20"
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              />

              {/* Organic blob container */}
              <div className="absolute inset-0 z-10 overflow-hidden shadow-[0_20px_50px_rgba(201,81,61,0.2)] border-4 border-white"
                   style={{
                     borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                     background: 'linear-gradient(135deg, #E6B45B 0%, #C9513D 100%)'
                   }}>
                
                {/* Glow effect inside blob */}
                <div className="absolute inset-0 bg-white/20 blur-xl mix-blend-overlay" />
                
                {/* Fallback structure (user must provide /profile.png) */}
                <div className="relative w-full h-full">
                  {/* Next Image for actual profile picture */}
                  <Image
                    src="/profile.png"
                    alt="Kritika Mandale"
                    fill
                    className="object-cover object-top transition-all duration-700"
                    sizes="(max-width: 768px) 320px, 420px"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - Content Area */}
          <motion.div 
            className="w-full md:w-7/12 lg:w-8/12 flex flex-col items-center md:items-start text-center md:text-left z-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={itemVariants} className="text-[#6B5B63] font-medium tracking-wide mb-2 inline-block">
              Hello, I'm
            </motion.span>
            
            <motion.h1 variants={itemVariants} className="text-[clamp(3.5rem,6vw,6rem)] font-heading font-extrabold leading-[1.1] text-[#2B2028] tracking-tight relative">
              Kritika Mandale
              
              {/* Handcrafted SVG Waves */}
              <div className="absolute -bottom-4 left-0 w-full flex flex-col gap-1 items-center md:items-start opacity-80">
                <svg className="w-16 h-2 ml-2" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="#C9513D" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <svg className="w-32 h-2" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q25,20 50,10 T100,10" fill="none" stroke="#E6B45B" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </motion.h1>

            <motion.div 
              variants={itemVariants} 
              className="mt-10 text-xl lg:text-2xl font-medium leading-relaxed w-full max-w-[800px]"
            >
              {revealWords.map((word, i) => (
                <HeroScrollWord
                  key={`${word}-${i}`}
                  word={word}
                  index={i}
                  totalWords={revealWords.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4 mt-8">
              {[
                { icon: GithubIcon, href: "https://github.com/kritikamandale" },
                { icon: LinkedinIcon, href: "https://linkedin.com/in/kritikamandale" },
                { icon: TwitterIcon, href: "https://twitter.com/kritikamandale" },
                { icon: TelegramIcon, href: "https://t.me/Kritikalog" },
                { icon: HashnodeIcon, href: "https://hashnode.com/@kritikam" },
                { icon: Mail, href: "mailto:hello@example.com" }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl border border-[#C9513D]/20 flex items-center justify-center text-[#2B2028] bg-white hover:bg-[#F8F5F2] hover:border-[#C9513D] hover:text-[#C9513D] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <social.icon size={20} strokeWidth={2} />
                </a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-10">
              <a 
                href="#projects" 
                className="group relative px-8 py-3.5 rounded-pill bg-gradient-to-r from-[#C9513D] to-[#E6B45B] text-white font-semibold text-sm tracking-wide flex items-center gap-2 overflow-hidden shadow-[0_8px_20px_rgba(201,81,61,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(201,81,61,0.4)] transition-all duration-300"
              >
                <span className="relative z-10">VIEW MY WORK ✦</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </a>
              <a 
                href="#contact" 
                className="group px-8 py-3.5 rounded-pill border-2 border-[#2B2028] text-[#2B2028] font-semibold text-sm tracking-wide flex items-center gap-2 hover:bg-[#2B2028] hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                LET'S TALK
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>

          </motion.div>
        </div>


      </div>
      </div>
    </section>
  );
};

export default HeroSection;
