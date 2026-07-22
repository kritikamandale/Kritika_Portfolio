'use client';
// src/sections/Mindset/MindsetPageClient.jsx
// ============================================================
// STANDALONE /mindset PAGE
// Same site chrome as the homepage (Navbar/Footer/Cursor).
// ============================================================

import React from 'react';
import Cursor from '../../components/Cursor/Cursor';
import AvailabilityBanner from '../../components/AvailabilityBanner/AvailabilityBanner';
import Navbar from '../../components/Navbar/Navbar';
import PageClient from '../../components/PageClient/PageClient';
import Mindset from './Mindset';
import Footer from '../../components/Footer/Footer';

const MindsetPageClient = () => {
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
      <Navbar />
      <main id="main-content">
        {/* Visually-hidden — gives this standalone page a single proper <h1> for
            SEO/a11y, ordered before the section's own <h2> title. */}
        <h1 className="sr-only">Mindset — Kritika Mandale</h1>
        <Mindset />
      </main>
      <Footer />
    </>
  );
};

export default MindsetPageClient;
