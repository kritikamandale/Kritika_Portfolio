// src/App.jsx
// ============================================================
// ROOT APP COMPONENT
// - Preloader fires onComplete at start of its exit (t=3.8s)
// - <main> fades in (opacity 0→1, 600ms, 100ms delay) once
//   isLoading becomes false. No layout shift or flash.
// - Cursor component renders above everything on desktop only.
// ============================================================

import React, { useEffect, useRef, useState, useCallback } from 'react';

// Global styles
import './styles/global.css';

// Hooks
import useScrollReveal from './hooks/useScrollReveal';

// Components
import Preloader from './components/Preloader/Preloader';
import Cursor    from './components/Cursor/Cursor';
import Navbar    from './components/Navbar/Navbar';
import Footer    from './components/Footer/Footer';

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
  // isLoading: blocks scroll & shows/hides Navbar.
  // Becomes false the moment onComplete fires (start of exit).
  const [isLoading,      setIsLoading]      = useState(true);
  // showPreloader: keeps the Preloader DOM node alive for 400ms
  // so the CSS fade-out has time to play before unmounting.
  const [showPreloader,  setShowPreloader]  = useState(true);
  // mainVisible: triggers the <main> opacity 0→1 transition.
  const [mainVisible,    setMainVisible]    = useState(false);

  const progressRef = useRef(null);

  // ── Scroll progress bar ───────────────────────────────────
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${total > 0 ? (scrolled / total) * 100 : 0}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── DOM scroll-reveal (.reveal → .visible) ────────────────
  useScrollReveal();

  // ── Prevent scroll during preloader ──────────────────────
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isLoading]);

  // ── Preloader complete handler ────────────────────────────
  // Called at the START of the preloader's 400ms fade-out.
  // 1. Unlock scroll + show Navbar immediately.
  // 2. Start main fade-in (double-rAF avoids painting before mount).
  // 3. Unmount Preloader DOM after fade completes (400ms).
  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    // Start main fade after two paint frames to avoid flash
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMainVisible(true));
    });
    // Remove Preloader from DOM after its CSS fade-out finishes
    setTimeout(() => setShowPreloader(false), 420);
  }, []);

  return (
    <>
      {/* Custom cursor — renders nothing on touch devices */}
      <Cursor />

      {/* Scroll progress bar */}
      <div id="scroll-progress" ref={progressRef} style={{ width: '0%' }} />

      {/* Preloader — stays in DOM for 400ms fade-out, then unmounts */}
      {showPreloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Navbar appears after preloader */}
      {!isLoading && <Navbar />}

      {/* Main content: opacity 0 → 1 after preloader exits */}
      <main
        id="main-content"
        style={{
          opacity:    mainVisible ? 1 : 0,
          transition: mainVisible
            ? 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) 100ms'
            : 'none',
        }}
      >
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

      <Footer />
    </>
  );
};

export default App;
