import React from 'react'
import Preloader from '../src/components/Preloader/Preloader'
import Cursor from '../src/components/Cursor/Cursor'
import AvailabilityBanner from '../src/components/AvailabilityBanner/AvailabilityBanner'
import Navbar from '../src/components/Navbar/Navbar'
import HeroSection from '../src/sections/Hero/HeroSection'
import About from '../src/sections/About/About'
import Stack from '../src/sections/Stack/Stack'
import Projects from '../src/sections/Projects/Projects'
import Experience from '../src/sections/Experience/Experience'
import Contact from '../src/sections/Contact/Contact'
import Footer from '../src/components/Footer/Footer'
import PageClient from '../src/components/PageClient/PageClient'
import Mindset from '../src/sections/Mindset/Mindset'
// Client wrapper that holds ssr:false dynamic() imports (not allowed in Server Components)
import LazySections from '../src/components/LazySections/LazySections'

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
        <About />
        <Projects />
        <Experience />
        <Stack />
        <Mindset />

        <LazySections />

        <Contact />
      </main>
      <Footer />
    </>
  )
}

