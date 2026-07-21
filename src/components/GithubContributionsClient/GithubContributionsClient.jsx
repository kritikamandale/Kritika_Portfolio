'use client';
// src/components/GithubContributionsClient/GithubContributionsClient.jsx
// ─────────────────────────────────────────────────────────────────────────
// Client Component wrapper required by Next.js 15+.
//
// In Next.js 15, `ssr: false` inside next/dynamic is forbidden in Server
// Components (the compiler enforces this at build time). Moving the dynamic
// import here — into a Client Component — restores the behaviour while
// satisfying the new constraint.
// ─────────────────────────────────────────────────────────────────────────

import dynamic from 'next/dynamic';

const GithubContributions = dynamic(
  () => import('../../sections/GithubContributions/GithubContributions'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-48 animate-pulse rounded-2xl bg-surface-2-light dark:bg-surface-2-dark" />
    ),
  }
);

export default function GithubContributionsClient() {
  return <GithubContributions />;
}
