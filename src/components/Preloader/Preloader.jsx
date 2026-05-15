// src/components/Preloader/Preloader.jsx
// ============================================================
// PRELOADER — pure CSS + vanilla JS, no animation libraries.
// Phases:  counting → hundred → bubbles → exit → done
// Exit: container fades to opacity:0 / visibility:hidden over
//       400ms. onComplete fires at start of exit so App.jsx
//       can begin the <main> fade-in immediately.
// ============================================================

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Preloader.module.css';

const BUBBLES = [
  { id: 1, color: 'var(--blue-grey)',     size: 110, cx: -60,  cy: -80, sx: '-50vw', sy: '-50vh' },
  { id: 2, color: 'var(--pumpkin-spice)', size: 95,  cx: 80,   cy: -40, sx: '50vw',  sy: '-50vh' },
  { id: 3, color: 'var(--dusty-mauve)',   size: 80,  cx: -50,  cy: 90,  sx: '-50vw', sy: '50vh'  },
  { id: 4, color: 'var(--banana-cream)',  size: 65,  cx: 60,   cy: 70,  sx: '50vw',  sy: '50vh'  },
  { id: 5, color: 'var(--cinnabar)',      size: 50,  cx: 20,   cy: 110, sx: '0vw',   sy: '60vh'  },
  { id: 6, color: 'var(--pumpkin-spice)', size: 40,  cx: -90,  cy: 20,  sx: '-60vw', sy: '0vh'   },
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
      // Fire onComplete at the START of the exit so App.jsx
      // can begin its own fade-in during the 400ms fade-out.
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
      // easeInOut cubic
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
      'rgba(255, 140, 66, 0.4)',
      'rgba(102, 153, 204, 0.4)',
      'rgba(255, 60, 56, 0.4)',
      'rgba(162, 62, 72, 0.3)',
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
      className={[styles.container, isExit ? styles.containerExit : ''].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {/* Split exit panels */}
      <div className={[styles.panelLeft,  isExit ? styles.panelLeftExit  : ''].filter(Boolean).join(' ')} />
      <div className={[styles.panelRight, isExit ? styles.panelRightExit : ''].filter(Boolean).join(' ')} />

      {/* Canvas ripple */}
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.contentLayer}>
        {/* Counting phase */}
        {phase === 'counting' && (
          <div className={styles.counter}>
            {formatted}<span className={styles.percent}>%</span>
          </div>
        )}

        {/* 100% display */}
        {showHundred && (
          <div
            className={[
              styles.splitHundred,
              isExit ? styles.splitHundredExit : styles.splitHundredVisible,
            ].filter(Boolean).join(' ')}
          >
            <span className={styles.digitDrop} style={{ '--delay': '0ms' }}>1</span>
            <span className={styles.digitRise} style={{ '--delay': '50ms' }}>00</span>
            <span className={styles.digitPop}  style={{ '--delay': '150ms' }}>%</span>
          </div>
        )}

        {/* Bubbles */}
        {showBubbles && BUBBLES.map((b, i) => (
          <div
            key={b.id}
            className={[
              styles.bubble,
              isExit ? styles.bubbleExit : styles.bubbleVisible,
            ].filter(Boolean).join(' ')}
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
