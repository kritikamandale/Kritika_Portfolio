'use client';
import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';

const USERNAME = 'kritikamandale';

const GithubContributions = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${USERNAME}`)
      .then((r) => r.json())
      .then((data) => setProfile(data))
      .catch(() => {});
  }, []);

  // GitHub standard green theme
  const calendarTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  const stats = [
    {
      label: 'Public Repositories',
      value: profile?.public_repos ?? '—',
      sub: 'Open Source',
      colorClass: 'bg-[linear-gradient(135deg,#F4F8FC,#E6EFF8)] dark:bg-[linear-gradient(135deg,#1b2128,#12181d)]',
    },
    {
      label: 'Followers',
      value: profile?.followers ?? '—',
      sub: 'Community',
      colorClass: 'bg-[linear-gradient(135deg,#FFF5F7,#FDECEF)] dark:bg-[linear-gradient(135deg,#231d25,#1b151d)]',
    },
    {
      label: 'Following',
      value: profile?.following ?? '—',
      sub: 'Connections',
      colorClass: 'bg-[linear-gradient(135deg,#FFF2EB,#FFE6D8)] dark:bg-[linear-gradient(135deg,#251d18,#1d1510)]',
    },
  ];

  return (
    <SectionWrapper
      id="github"
      label="Open Source"
      title="GitHub Activity"
      subtitle={`@${USERNAME} — Contribution statistics`}
      alt
    >
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-8 border border-border-light dark:border-border-dark shadow-clay dark:shadow-none flex flex-col gap-8">

        {/* ── Stats row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map(({ label, value, sub, colorClass }) => (
            <div key={label} className={`rounded-xl p-6 flex flex-col gap-1 border border-border-light dark:border-border-dark shadow-clay-sm dark:shadow-none h-full ${colorClass}`}>
              <span className="text-sm font-semibold text-text-secondary dark:text-text-dark-secondary">{label}</span>
              <span className="font-heading text-4xl font-extrabold text-brand-orange leading-[1.1]">{value}</span>
              <span className="text-xs text-text-muted dark:text-text-dark-muted">{sub}</span>
            </div>
          ))}
        </div>

        {/* ── Contribution calendar ── */}
        <style>{`
          .calendarCard::-webkit-scrollbar { height: 5px; }
          .calendarCard::-webkit-scrollbar-track { background: transparent; }
          .calendarCard::-webkit-scrollbar-thumb { background: var(--dusty-mauve); border-radius: 9999px; }
          .calendarCard::-webkit-scrollbar-thumb:hover { background: var(--brand-orange, #FF8C42); }
        `}</style>
        <div className="flex justify-center overflow-x-auto calendarCard">
          <div className="dark:hidden">
            <GitHubCalendar
              username={USERNAME}
              theme={calendarTheme}
              colorScheme="light"
              blockSize={12}
              blockMargin={4}
              fontSize={14}
            />
          </div>
          <div className="hidden dark:block">
            <GitHubCalendar
              username={USERNAME}
              theme={calendarTheme}
              colorScheme="dark"
              blockSize={12}
              blockMargin={4}
              fontSize={14}
            />
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="flex justify-center">
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[linear-gradient(135deg,var(--brand-orange,#FF8C42),var(--brand-red,#FF3C38))] text-white text-base font-semibold px-8 py-4 rounded-full no-underline shadow-[0_4px_16px_rgba(255,60,56,0.25)] transition-all duration-300 ease-smooth hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(255,60,56,0.40)]"
          >
            View Full Profile ↗
          </a>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default GithubContributions;
