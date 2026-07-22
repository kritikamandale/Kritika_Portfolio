'use client';
// src/sections/Stack/Stack.jsx
// ============================================================
// MY STACK SECTION — Aesthetic inline logo+name layout
// Inspired by bold category headings + bare icon+label rows.
// Category accent bars rotate between the site's brick-red and
// warm-gold accents. Icon logos keep their real brand colors.
// ============================================================

import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import { ReactLogoIcon, GithubFilledIcon } from '../../components/Icons/BrandIcons';

// ── Inline SVG helper ────────────────────────────────────────
const SvgIcon = ({ children, viewBox = '0 0 128 128', size = 34 }) => (
  <svg width={size} height={size} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    {children}
  </svg>
);

// ── Icon definitions (same SVGs, now rendered bare — no card) ─
const ICONS = {
  React: () => <ReactLogoIcon className="w-[2.125rem] h-[2.125rem] shrink-0" />,
  Nextjs: () => (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.057.5-.057z" fill="currentColor" />
    </SvgIcon>
  ),
  TypeScript: () => (
    <SvgIcon viewBox="0 0 400 400">
      <rect width="400" height="400" rx="50" fill="#007ACC" />
      <path fill="#fff" d="M222 302v37c6 3 14 5 22 7s17 2 25 2c9 0 17-1 25-3s14-5 20-9 10-10 13-17 5-15 5-25c0-7-1-14-3-19s-5-10-9-14-9-8-14-11-12-6-19-9l-13-5c-4-2-7-3-10-5s-5-4-6-6-2-5-2-8c0-3 0-5 2-7s3-4 5-5 5-3 8-3 6-1 10-1c3 0 5 0 8 1s6 1 9 3 6 2 8 4l7 5v-35c-5-2-11-4-18-5s-15-2-24-2c-8 0-16 1-23 3s-14 5-20 9-10 10-14 17-5 15-5 24c0 12 3 22 10 30s17 14 30 19l13 5c5 2 9 3 12 5s6 4 8 6 3 5 3 8c0 3-1 5-2 7s-3 4-6 6-6 3-9 3-7 1-11 1c-7 0-14-1-20-4s-12-6-18-11zM183 220h-48v126h-36V220H52v-31h131z" />
    </SvgIcon>
  ),
  JavaScript: () => (
    <SvgIcon viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#F7DF1E" />
      <path d="M318 328c7 13 17 22 34 22 14 0 23-7 23-17 0-12-9-16-25-22l-9-4c-25-10-41-23-41-50 0-25 19-44 49-44 21 0 36 7 47 26l-26 17c-6-10-12-14-21-14-10 0-16 6-16 14 0 10 6 14 20 20l9 4c29 12 46 25 46 53 0 30-24 46-56 46-31 0-51-15-61-34zm-118 3c5 10 10 18 21 18 11 0 17-4 17-21V168h34v162c0 35-20 51-50 51-27 0-43-14-51-31z" />
    </SvgIcon>
  ),
  Tailwind: () => (
    <SvgIcon viewBox="0 0 32 32">
      <path fill="#38BDF8" d="M9 13.7q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1zm-7 8.4q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1z" />
    </SvgIcon>
  ),
  CSS: () => (
    <SvgIcon>
      <path fill="#264de4" d="M3.4 0L0 128h128L124.6 0z" />
      <path fill="#2965f1" d="M64 116.8l50.3-14 6.8-76H64z" />
      <path fill="#ebebeb" d="M64 52H38.7l1.2 13.4H64V52zM64 90.8l-.3.1-14.7-4-1-11H34.2l2 22.2 27.5 7.6.3-.1z" />
      <path fill="#fff" d="M63.9 52h25.3l-2.4 26.8-22.9 6.3V71.7l13-3.6 1-10.7H63.9V52zm0 38.8v13.7l27.6-7.6 2.3-25.2H80.5l-1.2 13.6-15.4 4.2z" />
    </SvgIcon>
  ),
  Nodejs: () => (
    <SvgIcon viewBox="0 0 448 512">
      <path fill="#539E43" d="M224 508c-6.7 0-13.5-1.8-19.4-5.2l-61.7-36.5c-9.2-5.2-4.7-7-1.7-8 12.3-4.3 14.8-5.2 27.9-12.7 1.4-.8 3.2-.5 4.6.4l47.4 28.1c1.7 1 4.1 1 5.7 0l184.7-106.6c1.7-1 2.8-3 2.8-5V149.3c0-2.1-1.1-4-2.9-5.1L226.8 37.7c-1.7-1-4-1-5.7 0L36.6 144.3c-1.8 1.1-2.9 3-2.9 5.1v213.1c0 2 1.1 4 2.9 4.9l50.6 29.2c27.5 13.7 44.3-2.4 44.3-18.7V167.5c0-3 2.4-5.3 5.4-5.3h23.4c2.9 0 5.4 2.3 5.4 5.3V378c0 36.6-20 57.6-54.7 57.6-10.7 0-19.1 0-42.5-11.6l-48.4-27.9C8.1 389.2.7 376.3.7 362.4V149.3c0-13.8 7.4-26.8 19.4-33.7L204.6 9c11.7-6.6 27.2-6.6 38.8 0l184.7 106.7c12 6.9 19.4 19.8 19.4 33.7v213.1c0 13.8-7.4 26.7-19.4 33.7L243.4 502.8c-5.9 3.4-12.6 5.2-19.4 5.2z" />
    </SvgIcon>
  ),
  Docker: () => (
    <SvgIcon viewBox="0 0 24 24">
      <path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
    </SvgIcon>
  ),
  PostgreSQL: () => (
    <SvgIcon viewBox="0 0 32 32">
      <path fill="#336791" d="M28.3 14.2c-.4-3.7-2.1-6.5-5.1-8.3-1-.6-2.1-1-3.2-1.3-.1-.9-.4-2.1-1.3-3-.8-.8-1.9-1.2-3.2-1.2-1.1 0-2.1.3-2.9.9-.6-.1-1.2-.1-1.8-.1C5.8 1.2 2.1 5.4 2.1 10.7c0 2.5.8 4.8 2.3 6.4 1 1.1 2.4 1.8 3.8 2 .1 1.3.7 2.7 1.8 3.7 1.2 1 2.6 1.5 4.1 1.5.5 0 1-.1 1.5-.2.5.5 1 .9 1.6 1.2.9.5 2 .8 3.1.8 1.4 0 2.7-.4 3.7-1.1.9-.6 1.5-1.5 1.8-2.5 1.3-.3 2.5-1 3.3-2 1-1.2 1.5-2.8 1.5-4.5 0-.6-.1-1.3-.3-1.8h-.3z" />
      <path fill="#fff" d="M22.3 7.4c.7.4 1.3.9 1.7 1.5-1.3-.3-2.4-.4-3.4-.4-.3-.8-.7-1.6-1.2-2.3.9.2 1.9.6 2.9 1.2zm-5.8-4.5c.7 0 1.3.2 1.8.7.3.3.5.7.7 1.2-.7-.1-1.5-.1-2.3-.1-.8 0-1.5.1-2.3.2.2-.5.4-.9.7-1.2.5-.5 1.1-.8 1.4-.8zm-5.3 1.5c.3-.2.7-.4 1-.5-.5.7-.9 1.6-1.2 2.5-1 .1-1.9.3-2.8.6.9-1.2 1.9-2 3-2.6zm-5 8.7c0-4.4 3.1-7.8 6.9-8.1l-.1.1c-.8 1.2-1.3 2.9-1.5 4.6-.4.3-.7.6-1 1-.7 1-1.1 2.3-1.1 3.6 0 1 .2 2 .5 2.9-.8-.6-1.5-1.4-2.1-2.4-.6-.9-.6-1.7-.6-1.7zm4.5 6.8c-1-.9-1.4-2.1-1.4-3.3 0-1.6.6-3.1 1.7-4.1.3-.3.7-.6 1.1-.8.1-1.6.4-3.3 1.1-4.7.7-1.3 1.7-2.1 2.8-2.1 1.1 0 2.1.8 2.8 2.1.7 1.4 1.1 3.1 1.1 4.7.4.2.8.5 1.1.8 1.1 1 1.7 2.5 1.7 4.1 0 1.2-.4 2.4-1.4 3.3-1 .9-2.3 1.3-3.6 1.3h-.4c-1.2-.1-2.4-.5-3.2-1.2l-.4-.1zm7.5 3.8c-.8.5-1.8.8-2.7.8-1.7 0-3.1-.7-4-1.9.4.1.8.1 1.2.1 1.5 0 3-.4 4.1-1.3.7.4 1.5.7 2.3.9-.2.5-.5.9-.9 1.4zm4.8-3.3c-.7.9-1.7 1.5-2.9 1.7.3-.5.5-1 .6-1.6.1-.4.1-.8.1-1.2 0-1.4-.4-2.7-1.1-3.8.5.2 1 .5 1.5.9.8.7 1.4 1.6 1.8 2.6.3.4.3.9.3 1.4-.1 0-.2 0-.3 0z" />
    </SvgIcon>
  ),
  MongoDB: () => (
    <SvgIcon viewBox="0 0 32 32">
      <path fill="#599636" d="M15.9 2C9.7 2 6.4 6.7 6.4 11c0 4.1 2.2 6.9 5.3 8.2l.7 9.5c0 .3.2.5.5.5h6c.3 0 .5-.2.5-.5l.7-9.5c3.1-1.3 5.3-4.1 5.3-8.2C25.4 6.7 22.1 2 15.9 2z" />
      <path fill="#6cac48" d="M16.3 2v26.6h3c.3 0 .5-.2.5-.5l.7-9.5c3.1-1.3 5.3-4.1 5.3-8.2C25.8 6.4 21.4 2 16.3 2z" />
    </SvgIcon>
  ),
  Python: () => (
    <SvgIcon viewBox="0 0 32 32">
      <defs>
        <linearGradient id="pa" x1="12.959" y1="2.547" x2="15.35" y2="22.656" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#387EB8" /><stop offset="1" stopColor="#366994" />
        </linearGradient>
        <linearGradient id="pb" x1="20.779" y1="10.317" x2="15.924" y2="28.434" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFE052" /><stop offset="1" stopColor="#FFC331" />
        </linearGradient>
      </defs>
      <path fill="url(#pa)" d="M15.885 2.1c-7.1 0-6.651 3.07-6.651 3.07v3.19h6.752v1H6.545S2 8.8 2 16.005s4.013 6.912 4.013 6.912H8.33v-3.361s-.13-4.013 3.9-4.013h6.765s3.769.06 3.769-3.64V5.14s.572-3.04-6.849-3.04zm-3.74 1.96a1.094 1.094 0 11-1.09 1.09 1.097 1.097 0 011.09-1.09z" />
      <path fill="url(#pb)" d="M16.085 29.91c7.1 0 6.651-3.07 6.651-3.07v-3.19h-6.752v-1h9.441S30 23.22 30 16.015s-4.013-6.912-4.013-6.912H23.67v3.361s.13 4.013-3.9 4.013h-6.765s-3.769-.06-3.769 3.64v6.663s-.572 3.13 6.849 3.13zm3.74-1.96a1.094 1.094 0 111.09-1.09 1.097 1.097 0 01-1.09 1.09z" />
    </SvgIcon>
  ),
  TensorFlow: () => (
    <SvgIcon viewBox="0 0 32 32">
      <path fill="#FF6F00" d="M3 4.5v23l5 3v-9.5l8 4.5V31l5-3V4.5L16 1zM8 22v-4.5l8 4.5v4.5zm13-5.5v5L8 16V9l13 7.5z" />
    </SvgIcon>
  ),
  PyTorch: () => (
    <SvgIcon viewBox="0 0 32 32">
      <path fill="#EE4C2C" d="M16 3l-3.5 3.5c-4.6 4.6-4.6 12 0 16.6 4.6 4.6 12 4.6 16.6 0s4.6-12 0-16.6L25.5 3v5.7c2.5 2.8 4 6.5 4 10.5 0 8.8-7.2 16-16 16S-2.5 28-.5 19.2 6.7 3.2 15.5 3.2c.2 0 .3 0 .5 0z" />
      <circle fill="#EE4C2C" cx="22" cy="10" r="2" />
    </SvgIcon>
  ),
  Keras: () => (
    <SvgIcon viewBox="0 0 32 32">
      <path fill="#D00000" d="M6 2v28h20V2zm10 20.5L9.5 16l6.5-6.5L22.5 16z" />
    </SvgIcon>
  ),
  ScikitLearn: () => (
    <SvgIcon viewBox="0 0 32 32">
      <ellipse fill="#3499CD" cx="16" cy="10" rx="8" ry="3" />
      <ellipse fill="#F89939" cx="16" cy="22" rx="8" ry="3" />
      <path fill="#3499CD" d="M8 10v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6c0 1.7-3.6 3-8 3s-8-1.3-8-3z" />
      <path fill="#F89939" d="M8 16v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6c0 1.7-3.6 3-8 3s-8-1.3-8-3z" />
    </SvgIcon>
  ),
  GitHub: () => <GithubFilledIcon className="w-[2.125rem] h-[2.125rem] shrink-0" />,
  Figma: () => (
    <SvgIcon viewBox="0 0 24 24">
      <path fill="#F24E1E" d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" />
      <path fill="#FF7262" d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" />
      <path fill="#A259FF" d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" />
      <path fill="#1ABCFE" d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" />
      <path fill="#0ACF83" d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" />
    </SvgIcon>
  ),
  VSCode: () => (
    <SvgIcon viewBox="0 0 32 32">
      <path fill="#007ACC" d="M29.5 4.8L22.6 1 12 11.3 5.2 5.8 2 7.2v17.5l3.2 1.4 6.7-5.5L22.6 31l6.9-3.8V4.8zm-3.1 19.4l-9.3-5.5 9.3-5.5v11z" />
    </SvgIcon>
  ),
  Linux: () => (
    <SvgIcon viewBox="0 0 32 32">
      <path fill="#FCC624" d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 2c2.7 0 5.2.9 7.3 2.4-1.2.5-2.3 1.3-3.1 2.4-.8 1.1-1.2 2.4-1.2 3.7 0 1.3.4 2.5 1.1 3.6.7 1 1.7 1.8 2.8 2.2-1 2-2.1 3.8-3.4 5.3-1.3-1.5-2.4-3.3-3.4-5.3 1.1-.4 2.1-1.2 2.8-2.2.7-1 1.1-2.3 1.1-3.6 0-1.3-.4-2.6-1.2-3.7-.8-1.1-1.9-1.9-3.1-2.4C19.2 4.9 16 4 16 4z" />
    </SvgIcon>
  ),
  Postman: () => (
    <SvgIcon viewBox="0 0 32 32">
      <circle fill="#FF6C37" cx="16" cy="16" r="14" />
      <path fill="#fff" d="M23 16c0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7 7-3.1 7-7zm-11 0c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4zm5.7-1.3l-2.4 2.4-1-1 2.4-2.4 1 1z" />
    </SvgIcon>
  ),
  Streamlit: () => (
    <SvgIcon viewBox="0 0 32 32">
      <path fill="#FF4B4B" d="M16 2L2 24h6l8-13.8L24 24h6L16 2zm0 6.9L20.6 16H16l-4.6-7.1 4.6-7.1 4.6 7.1z" />
    </SvgIcon>
  ),
  CPlusPlus: () => (
    <SvgIcon viewBox="0 0 32 32">
      <path fill="#00599C" d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 22c-4.4 0-8-3.6-8-8s3.6-8 8-8c2.7 0 5.1 1.3 6.5 3.3l-2.5 1.4C19.2 11.7 17.7 11 16 11c-2.8 0-5 2.2-5 5s2.2 5 5 5c1.7 0 3.2-.8 4.1-2.1l2.5 1.4C21.1 22.6 18.7 24 16 24zm7-7h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1zm4 0h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1z" />
    </SvgIcon>
  ),
  Git: () => (
    <SvgIcon viewBox="0 0 24 24">
      <path fill="#F05032" d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
    </SvgIcon>
  ),
  RestAPI: () => (
    <SvgIcon viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="none" stroke="#B02618" strokeWidth="2" />
      <path fill="#B02618" d="M10 13h12v6H10z" opacity="0.3" />
      <path fill="#B02618" d="M8 12h16v2H8zm0 6h16v2H8zm4-3h8v2h-8z" />
    </SvgIcon>
  ),
  HuggingFace: () => (
    <SvgIcon viewBox="0 0 24 24">
      <text y="18" fontSize="18">🤗</text>
    </SvgIcon>
  ),
  OpenAI: () => (
    <SvgIcon viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="#10a37f" opacity="0.15" />
      <path fill="#10a37f" d="M22 10.5a6 6 0 00-11.2-2.9A6 6 0 0016 22a6 6 0 006-6 6 6 0 00-.8-3z" opacity="0.8" />
      <circle cx="16" cy="16" r="3" fill="#10a37f" />
    </SvgIcon>
  ),
};

// ── Emoji pill for skills without proper SVG ─────────────────
const EmojiPill = ({ emoji }) => (
  <span
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 34,
      height: 34,
      fontSize: 22,
      flexShrink: 0,
      lineHeight: 1,
    }}
    aria-hidden="true"
  >
    {emoji}
  </span>
);

// ── Single skill chip — bare logo + name, no card ─────────────
const SkillChip = ({ name, iconKey, emoji }) => {
  const IconComponent = iconKey ? ICONS[iconKey] : null;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -4 }}
      whileTap={{ y: -2 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 14px 8px 10px',
        borderRadius: '10px',
        cursor: 'default',
        transition: 'background 200ms ease',
        position: 'relative',
      }}
      className="skill-chip"
      title={name}
    >
      {IconComponent ? (
        <IconComponent />
      ) : (
        <EmojiPill emoji={emoji || '✦'} />
      )}
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: '1.025rem',
          color: 'var(--color-text-primary)',
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </span>
    </motion.div>
  );
};

// ── Category heading — bold, warm, expressive ─────────────────
const CategoryHeading = ({ label, index }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '24px',
    }}
  >
    {/* accent bar — fades in with the heading */}
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        width: '4px',
        height: '36px',
        borderRadius: '4px',
        background: ACCENT_COLORS[index % ACCENT_COLORS.length],
        flexShrink: 0,
        transformOrigin: 'top',
      }}
    />
    {/* h3 slides in from the left */}
    <motion.h3
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
        letterSpacing: '-0.01em',
        color: 'var(--color-text-primary)',
        lineHeight: 1,
        textTransform: 'uppercase',
      }}
    >
      {label}
    </motion.h3>
  </div>
);

// Accent bar rotation per category — alternates the two palette accents
const ACCENT_COLORS = [
  '#B02618', // brick red
  '#F5DE8F', // warm gold
  '#B02618',
  '#F5DE8F',
  '#B02618',
  '#F5DE8F',
];

// ── Data ──────────────────────────────────────────────────────
const GROUPS = [
  {
    label: 'Frontend',
    skills: [
      { name: 'React', iconKey: 'React' },
      { name: 'Next.js', iconKey: 'Nextjs' },
      { name: 'TypeScript', iconKey: 'TypeScript' },
      { name: 'JavaScript', iconKey: 'JavaScript' },
      { name: 'Tailwind CSS', iconKey: 'Tailwind' },
      { name: 'CSS / SCSS', iconKey: 'CSS' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', iconKey: 'Nodejs' },
      { name: 'REST API', iconKey: 'RestAPI' },
      { name: 'Postman', iconKey: 'Postman' },
    ],
  },
  {
    label: 'Databases & DevOps',
    skills: [
      { name: 'Docker', iconKey: 'Docker' },
      { name: 'PostgreSQL', iconKey: 'PostgreSQL' },
    ],
  },
  {
    label: 'AI / ML',
    skills: [
      { name: 'Python', iconKey: 'Python' },
      { name: 'TensorFlow', iconKey: 'TensorFlow' },
      { name: 'PyTorch', iconKey: 'PyTorch' },
      { name: 'Keras', iconKey: 'Keras' },
      { name: 'Scikit-Learn', iconKey: 'ScikitLearn' },
      { name: 'NLP', emoji: '💬' },
      { name: 'Streamlit', iconKey: 'Streamlit' },
    ],
  },
  {
    label: 'Languages',
    skills: [
      { name: 'C / C++', iconKey: 'CPlusPlus' },
      { name: 'SQL', emoji: '🗄️' },
    ],
  },
  {
    label: 'Developer Tools',
    skills: [
      { name: 'Git', iconKey: 'Git' },
      { name: 'GitHub', iconKey: 'GitHub' },
      { name: 'Figma', iconKey: 'Figma' },
      { name: 'VS Code', iconKey: 'VSCode' },
      { name: 'Linux', iconKey: 'Linux' },
    ],
  },
];

// ── Section ───────────────────────────────────────────────────
const Stack = () => (
  <SectionWrapper
    id="stack"
    label="Technologies"
    title="My Stack"
    subtitle="Tools and technologies I work with across the full product lifecycle."
    alt
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
      {GROUPS.map((group, gIdx) => (
        <div key={group.label}>
          <CategoryHeading label={group.label} index={gIdx} />
          <div className="stack-divider" />
          {/* Chips cascade in as the group enters the viewport */}
          <motion.div
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.06,
                  delayChildren: 0.05,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: '-40px' }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px 8px',
            }}
          >
            {group.skills.map((skill) => (
              <SkillChip
                key={skill.name}
                name={skill.name}
                iconKey={skill.iconKey}
                emoji={skill.emoji}
              />
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default Stack;
