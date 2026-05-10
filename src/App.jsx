// src/App.jsx
// ============================================================
// ROOT APP COMPONENT
// Assembles all sections in order and manages the initial Preloader.
// Initializes the DOM scroll-reveal observer for section entries.
// ============================================================

import React, { useEffect, useRef, useState } from 'react';

// Global styles (must be imported before components)
import './styles/global.css';

// Hooks
import useScrollReveal from './hooks/useScrollReveal';

// Components
import Preloader from './components/Preloader/Preloader';
import Navbar  from './components/Navbar/Navbar';
import Footer  from './components/Footer/Footer';

// Sections
import Hero                from './sections/Hero/Hero';
import About               from './sections/About/About';
import Experience          from './sections/Experience/Experience';
import GithubContributions from './sections/GithubContributions/GithubContributions';
import Projects            from './sections/Projects/Projects';
import Achievements        from './sections/Achievements/Achievements';
import Skills              from './sections/Skills/Skills';
import Philosophy          from './sections/Philosophy/Philosophy';
import Contact             from './sections/Contact/Contact';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // ── Scroll progress bar — direct DOM write, zero re-renders ──
  const progressRef = useRef(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total   = document.documentElement.scrollHeight - window.innerHeight;
      const pct     = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = `${pct}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Initialize IntersectionObserver for section entry animations
  // (.reveal → .reveal.visible driven by this hook)
  useScrollReveal();

  // Disable scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);


  return (
    <>
      {/* Scroll progress bar — styled in global.css, driven by direct DOM write */}
      <div id="scroll-progress" ref={progressRef} style={{ width: '0%' }} />
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* ── Sticky floating navbar (appears after intro) ── */}
      {!isLoading && <Navbar />}

      {/* Page sections in order */}
      <main id="main-content">
        <Hero revealDone={!isLoading} />
        <About />
        <Experience />
        <Projects />
        <GithubContributions />
        <Achievements />
        <Skills />
        <Philosophy />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
