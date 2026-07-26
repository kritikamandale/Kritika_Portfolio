'use client';
// src/components/Navbar/PandaMascot.jsx
// ============================================================
// PANDA MASCOT
// Decorative panda resting on the navbar. Fixed horizontal spot
// (no walking), a slow CSS "breathing" loop, and a small speech
// bubble with a rotating message on hover/tap.
// ============================================================

import React, { useRef, useState } from 'react';
import Image from 'next/image';

const MESSAGES = [
  "Shh, I'm resting 😴",
  'Check out Projects ↓',
  "Resume's right there ↗",
];

// Horizontal anchor as a % of the pill's own width (the pill is `w-max`, so
// this scales with however wide the nav ends up). Sits just left of the
// divider/Resume button, over the gap after "Mindset". Tweak this value to
// reposition — it's the one number this whole placement hinges on.
const LEFT_PERCENT = '78%';

// How far the bamboo log's bottom edge sinks into the navbar's top edge.
const OVERLAP_PX = 18;

const PandaMascot = () => {
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const hideTimer = useRef(null);

  const showBubble = () => {
    setMessageIndex((i) => (i + 1) % MESSAGES.length);
    setBubbleOpen(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setBubbleOpen(false), 3500);
  };

  const hideBubble = () => {
    clearTimeout(hideTimer.current);
    setBubbleOpen(false);
  };

  return (
    <div
      className="absolute bottom-full hidden sm:block pointer-events-none"
      style={{ left: LEFT_PERCENT, transform: `translateY(${OVERLAP_PX}px)` }}
    >
      <div className="relative pointer-events-auto">
        {/* Speech bubble */}
        <div
          role="status"
          aria-live="polite"
          className={`
            absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2
            whitespace-nowrap px-3 py-1.5 rounded-xl
            bg-white dark:bg-surface-dark border border-accent/20 dark:border-border-dark
            shadow-clay-sm dark:shadow-none
            text-[12px] font-medium text-text-primary dark:text-text-dark-primary
            transition-all duration-200 ease-smooth
            ${bubbleOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95 pointer-events-none'}
          `}
        >
          {MESSAGES[messageIndex]}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-white dark:bg-surface-dark border-r border-b border-accent/20 dark:border-border-dark -mt-1.5" />
        </div>

        <button
          type="button"
          aria-label="Panda mascot, click for a message"
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
          onMouseEnter={showBubble}
          onMouseLeave={hideBubble}
          onFocus={showBubble}
          onBlur={hideBubble}
          onClick={showBubble}
        >
          <Image
            src="/panda-navbar.webp"
            alt=""
            aria-hidden="true"
            width={480}
            height={509}
            className="w-[160px] h-auto motion-safe:animate-panda-breathe"
            priority={false}
          />
        </button>
      </div>
    </div>
  );
};

export default PandaMascot;
