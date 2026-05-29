'use client';
import React, { useState, useEffect } from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';

const USERNAME = 'kritikamandale';

const GithubContributions = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGithubData = async () => {
      const cacheKey = 'github_stats_cache';
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          const ageHours = (Date.now() - timestamp) / (1000 * 60 * 60);
          
          if (ageHours < 1) {
            setProfile(data);
            setIsLoading(false);
            return; // Cache is fresh
          }
        } catch (e) {
          // Cache invalid, continue to fetch
        }
      }

      try {
        const r = await fetch(`https://api.github.com/users/${USERNAME}`);
        if (!r.ok) throw new Error('API Error');
        const data = await r.json();
        
        localStorage.setItem(cacheKey, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
        
        setProfile(data);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  const stats = [
    {
      label: 'Public Repositories',
      value: profile?.public_repos,
      sub: 'Open Source',
      colorClass: 'bg-[linear-gradient(135deg,#F4F8FC,#E6EFF8)] dark:bg-[linear-gradient(135deg,#1b2128,#12181d)]',
    },
    {
      label: 'Followers',
      value: profile?.followers,
      sub: 'Community',
      colorClass: 'bg-[linear-gradient(135deg,#FFF5F7,#FDECEF)] dark:bg-[linear-gradient(135deg,#231d25,#1b151d)]',
    },
    {
      label: 'Following',
      value: profile?.following,
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
              {isLoading ? (
                <div className="h-10 w-20 bg-black/5 dark:bg-white/10 rounded animate-pulse my-1"></div>
              ) : error ? (
                <span className="text-sm font-medium text-brand-red leading-[1.1] py-2">Stats unavailable</span>
              ) : (
                <span className="font-heading text-4xl font-extrabold text-brand-orange leading-[1.1]">{value}</span>
              )}
              <span className="text-xs text-text-muted dark:text-text-dark-muted">{sub}</span>
            </div>
          ))}
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
