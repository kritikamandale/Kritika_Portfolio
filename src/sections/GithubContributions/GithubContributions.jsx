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
        } catch {
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
      } catch {
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
      colorClass: 'bg-surface-2-light dark:bg-surface-2-dark',
    },
    {
      label: 'Followers',
      value: profile?.followers,
      sub: 'Community',
      colorClass: 'bg-[linear-gradient(135deg,rgba(245,222,143,0.35),rgba(245,222,143,0.10))] dark:bg-[linear-gradient(135deg,rgba(245,222,143,0.14),rgba(245,222,143,0.04))]',
    },
    {
      label: 'Following',
      value: profile?.following,
      sub: 'Connections',
      colorClass: 'bg-[linear-gradient(135deg,rgba(176,38,24,0.12),rgba(176,38,24,0.03))] dark:bg-[linear-gradient(135deg,rgba(176,38,24,0.18),rgba(176,38,24,0.06))]',
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
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-8 border border-border-light dark:border-border-dark shadow-clay dark:shadow-none flex flex-col gap-8 max-w-4xl mx-auto w-full">

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

        {/* ── Contribution Graph ── */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-secondary dark:text-text-dark-secondary tracking-wide uppercase">
              Contribution Activity
            </h3>
            <span className="text-xs text-text-muted dark:text-text-dark-muted">
              Last 12 months
            </span>
          </div>
          <div
            className="rounded-xl border border-border-light dark:border-border-dark overflow-x-auto p-4 md:p-6"
            style={{
              background: '#ffffff',
            }}
          >
            <style>{`
              [data-theme="dark"] .gh-chart-container {
                background: linear-gradient(135deg, #0d1117 0%, #161b22 100%) !important;
              }
            `}</style>
            <div className="gh-chart-container" style={{ minWidth: '680px' }}>
              <img
                src={`https://ghchart.rshah.org/${USERNAME}`}
                alt={`${USERNAME}'s GitHub contribution chart`}
                className="gh-chart-img w-full h-auto block"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div
                className="hidden items-center justify-center text-text-muted dark:text-text-dark-muted text-sm py-8"
                style={{ display: 'none' }}
              >
                Contribution graph unavailable — check back later.
              </div>
            </div>
          </div>
          <p className="text-xs text-text-muted dark:text-text-dark-muted text-center mt-1">
            Each square represents a day. Darker shades indicate more contributions.
          </p>
        </div>

        {/* ── CTA ── */}
        <div className="flex justify-center">
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#B02618] hover:bg-[#8A1C10] text-white text-base font-semibold px-8 py-4 rounded-full no-underline shadow-[0_4px_16px_rgba(176,38,24,0.25)] transition-all duration-300 ease-smooth hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(176,38,24,0.40)]"
          >
            View Full Profile ↗
          </a>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default GithubContributions;
