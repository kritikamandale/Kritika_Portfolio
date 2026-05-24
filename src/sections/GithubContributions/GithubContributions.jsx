'use client';
import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import styles from './GithubContributions.module.css';

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
  };

  const stats = [
    {
      label: 'Public Repositories',
      value: profile?.public_repos ?? '—',
      sub: 'Open Source',
      colorClass: styles.statBlue,
    },
    {
      label: 'Followers',
      value: profile?.followers ?? '—',
      sub: 'Community',
      colorClass: styles.statPurple,
    },
    {
      label: 'Following',
      value: profile?.following ?? '—',
      sub: 'Connections',
      colorClass: styles.statPink,
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
      <div className={styles.dashboard}>

        {/* ── Stats row ── */}
        <div className={styles.statsRow}>
          {stats.map(({ label, value, sub, colorClass }) => (
            <div key={label} className={`${styles.statCard} ${colorClass}`}>
              <span className={styles.statLabel}>{label}</span>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statSub}>{sub}</span>
            </div>
          ))}
        </div>

        {/* ── Contribution calendar ── */}
        <div className={styles.calendarCard}>
          <GitHubCalendar
            username={USERNAME}
            theme={calendarTheme}
            colorScheme="light"
            blockSize={12}
            blockMargin={4}
            fontSize={14}
          />
        </div>

        {/* ── CTA ── */}
        <div className={styles.ctaRow}>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            View Full Profile ↗
          </a>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default GithubContributions;
