'use client';
import React, { Suspense, lazy } from 'react'
import Preloader from '../src/components/Preloader/Preloader'
import Cursor from '../src/components/Cursor/Cursor'
import AvailabilityBanner from '../src/components/AvailabilityBanner/AvailabilityBanner'
import Navbar from '../src/components/Navbar/Navbar'
import HeroSection from '../src/sections/Hero/HeroSection'
import About from '../src/sections/About/About'
import Services from '../src/sections/Services/Services'
import Stack from '../src/sections/Stack/Stack'
import Projects from '../src/sections/Projects/Projects'
import Experience from '../src/sections/Experience/Experience'
import Contact from '../src/sections/Contact/Contact'
import Footer from '../src/components/Footer/Footer'
import PageClient from '../src/components/PageClient/PageClient'

// Lazy loaded heavy sections
const GithubContributions = lazy(() => import('../src/sections/GithubContributions/GithubContributions'))
const Achievements = lazy(() => import('../src/sections/Achievements/Achievements'))
const Certificates = lazy(() => import('../src/sections/Certificates/Certificates'))

export default function Home() {
  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:p-4 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-orange"
      >
        Skip to main content
      </a>
      <PageClient />
      <Cursor />
      <AvailabilityBanner />
      <Preloader />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <Services />
        <Projects />
        <About />
        <Experience />
        <Stack />
        
        <Suspense fallback={<div style={{ height: '400px', background: 'var(--color-background-secondary)' }} />}>
          <GithubContributions />
        </Suspense>

        <Suspense fallback={<div style={{ height: '100vh', background: 'var(--color-background-secondary)' }} />}>
          <Achievements />
        </Suspense>

        <Suspense fallback={<div style={{ height: '50vh', background: 'var(--color-background-secondary)' }} />}>
          <Certificates />
        </Suspense>

        <Contact />
      </main>
      <Footer />
    </>
  )
}
