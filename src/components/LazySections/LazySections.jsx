'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// These sections use localStorage, GSAP ScrollTrigger, and other browser-only
// APIs - they cannot run on the server. Keeping the dynamic() calls here in a
// 'use client' component is the correct Next.js 15 pattern; ssr:false is not
// allowed inside Server Components.
const GithubContributions = dynamic(
  () => import('../../sections/GithubContributions/GithubContributions'),
  { ssr: false }
);
const Achievements = dynamic(
  () => import('../../sections/Achievements/Achievements'),
  { ssr: false }
);
const Certificates = dynamic(
  () => import('../../sections/Certificates/Certificates'),
  { ssr: false }
);

export default function LazySections() {
  return (
    <>
      <Suspense fallback={<div style={{ height: '400px', background: 'var(--color-background-secondary)' }} />}>
        <GithubContributions />
      </Suspense>

      <Suspense fallback={<div style={{ height: '100vh', background: 'var(--color-background-secondary)' }} />}>
        <Achievements />
      </Suspense>

      <Suspense fallback={<div style={{ height: '50vh', background: 'var(--color-background-secondary)' }} />}>
        <Certificates />
      </Suspense>
    </>
  );
}
