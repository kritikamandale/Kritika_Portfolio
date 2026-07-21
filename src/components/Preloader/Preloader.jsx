'use client';
// src/components/Preloader/Preloader.jsx
// ============================================================
// PRELOADER — pure CSS + vanilla JS, no animation libraries.
// Phases:  counting → hundred → bubbles → exit → done
// Exit: container fades to opacity:0 / visibility:hidden over
//       400ms. onComplete fires at start of exit so App.jsx
//       can begin the <main> fade-in immediately.
// ============================================================

import React, { useState, useEffect, useRef } from 'react';

const BUBBLES = [
  { id: 1, color: '#B02618',  size: 110, cx: -60,  cy: -80, sx: '-50vw', sy: '-50vh' },
  { id: 2, color: '#F5DE8F',  size: 95,  cx: 80,   cy: -40, sx: '50vw',  sy: '-50vh' },
  { id: 3, color: '#3A2418',  size: 80,  cx: -50,  cy: 90,  sx: '-50vw', sy: '50vh'  },
  { id: 4, color: '#F5DE8F',  size: 65,  cx: 60,   cy: 70,  sx: '50vw',  sy: '50vh'  },
  { id: 5, color: '#8A1C10',  size: 50,  cx: 20,   cy: 110, sx: '0vw',   sy: '60vh'  },
  { id: 6, color: '#B02618',  size: 40,  cx: -90,  cy: 20,  sx: '-60vw', sy: '0vh'   },
];

const Preloader = ({ onComplete }) => {
  // 'counting' | 'hundred' | 'bubbles' | 'exit' | 'done'
  const [phase, setPhase]   = useState('counting');
  const [count, setCount]   = useState(1);
  const canvasRef            = useRef(null);
  const rafCountRef          = useRef(null);

  // ── State-machine timeline ───────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hundred'), 1500);
    const t2 = setTimeout(() => setPhase('bubbles'), 2400);
    const t3 = setTimeout(() => {
      setPhase('exit');
      if (onComplete) onComplete();
    }, 3800);
    const t4 = setTimeout(() => setPhase('done'), 4200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  // ── Counter animation (rAF-driven, no library) ───────────
  useEffect(() => {
    if (phase !== 'counting') return;
    const start  = performance.now();
    const from   = 1;
    const to     = 99;
    const dur    = 1300; // ms

    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setCount(Math.round(from + (to - from) * eased));
      if (t < 1) rafCountRef.current = requestAnimationFrame(tick);
    };
    rafCountRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafCountRef.current);
  }, [phase]);

  // ── Canvas ripple background ─────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId, time = 0;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();

    const colors = [
      'rgba(176, 38, 24, 0.35)',
      'rgba(245, 222, 143, 0.35)',
      'rgba(138, 28, 16, 0.30)',
      'rgba(58, 36, 24, 0.25)',
    ];

    const draw = () => {
      time += 0.006;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width  / 2 + Math.sin(time * 1.5) * (canvas.width  * 0.15);
      const cy = canvas.height / 2 + Math.cos(time * 1.2) * (canvas.height * 0.15);
      const maxR = Math.max(canvas.width, canvas.height) * 1.2;
      ctx.lineWidth = 2;
      for (let i = 0; i < 16; i++) {
        const r = (time * 80 + i * (maxR / 16)) % maxR;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = colors[i % colors.length];
        ctx.stroke();
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafId); };
  }, []);

  if (phase === 'done') return null;

  const isExit      = phase === 'exit';
  const showHundred = ['hundred', 'bubbles', 'exit'].includes(phase);
  const showBubbles = ['bubbles', 'exit'].includes(phase);
  const formatted   = String(count).padStart(2, '0');

  return (
    <div
      className={`
        fixed inset-0 z-[9999] overflow-hidden pointer-events-auto transition-[opacity,visibility] duration-400 ease-out
        ${isExit ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}
      `}
      aria-hidden="true"
    >
      {/* Split exit panels */}
      <div className={`absolute top-0 h-full w-1/2 bg-bg-light dark:bg-bg-dark z-20 transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] left-0 ${isExit ? '-translate-x-full' : 'translate-x-0'}`} />
      <div className={`absolute top-0 h-full w-1/2 bg-bg-light dark:bg-bg-dark z-20 transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] right-0 delay-40 ${isExit ? 'translate-x-full' : 'translate-x-0'}`} />

      {/* Canvas ripple */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[25] w-full h-full pointer-events-none" />

      <div className="absolute inset-0 z-[30] flex justify-center items-center pointer-events-none">
        {/* Counting phase */}
        {phase === 'counting' && (
          <div className="font-['Playfair_Display',serif] font-black text-[6.5rem] max-md:text-[4rem] text-text-primary dark:text-text-dark-primary flex items-baseline absolute animate-slide-in-left">
            {formatted}<span className="text-[0.4em] align-super leading-none">%</span>
          </div>
        )}

        {/* 100% display */}
        {showHundred && (
          <div
            className={`
              flex items-baseline font-['Playfair_Display',serif] font-black text-[11rem] max-md:text-[7rem] text-text-primary dark:text-text-dark-primary absolute transition-[opacity,transform] duration-400 ease
              ${isExit ? 'opacity-0 scale-[0.85]' : 'opacity-100 scale-100 animate-pulse-split'}
            `}
          >
            <span className="inline-block animate-drop-in" style={{ '--delay': '0ms' }}>1</span>
            <span className="inline-block animate-rise-in" style={{ '--delay': '50ms' }}>00</span>
            <span className="inline-block text-[0.45em] align-super leading-none ml-[0.05em] animate-pop-in" style={{ '--delay': '150ms' }}>%</span>
          </div>
        )}

        {/* Bubbles */}
        {showBubbles && BUBBLES.map((b, i) => (
          <div
            key={b.id}
            className={`
              absolute rounded-full opacity-0
              ${isExit ? 'animate-fly-out-bubble' : 'animate-fly-in-bubble'}
            `}
            style={{
              backgroundColor: b.color,
              width:  b.size,
              height: b.size,
              top:    '50%',
              left:   '50%',
              marginTop:  -(b.size / 2),
              marginLeft: -(b.size / 2),
              '--sx': b.sx,
              '--sy': b.sy,
              '--tx': `${b.cx}px`,
              '--ty': `${b.cy}px`,
              '--delay': `${i * 80}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Preloader;
