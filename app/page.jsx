'use client';
import React, { Suspense, lazy } from 'react'
import Preloader from '../src/components/Preloader/Preloader'
import Cursor from '../src/components/Cursor/Cursor'
import AvailabilityBanner from '../src/components/AvailabilityBanner/AvailabilityBanner'
import Navbar from '../src/components/Navbar/Navbar'
import Hero from '../src/sections/Hero/Hero'
import About from '../src/sections/About/About'
import Services from '../src/sections/Services/index'
import Stack from '../src/sections/Stack/index'
import Projects from '../src/sections/Projects/Projects'
import Experience from '../src/sections/Experience/Experience'
import Philosophy from '../src/sections/Philosophy/Philosophy'
import Contact from '../src/sections/Contact/Contact'
import Footer from '../src/components/Footer/Footer'
import PageClient from '../src/components/PageClient/PageClient'

// Lazy loaded heavy sections
const GithubContributions = lazy(() => import('../src/sections/GithubContributions/GithubContributions'))
const Achievements = lazy(() => import('../src/sections/Achievements/Achievements'))

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
        <Hero />
        <About />
        <Services />
        <Stack />
        <Experience />
        <Projects />
        
        <Suspense fallback={<div style={{ height: '400px', background: 'var(--color-background-secondary)' }} />}>
          <GithubContributions />
        </Suspense>

        <Suspense fallback={<div style={{ height: '100vh', background: 'var(--color-background-secondary)' }} />}>
          <Achievements />
        </Suspense>

        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
