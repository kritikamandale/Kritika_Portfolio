import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import styles from './Preloader.module.css';

const BUBBLES = [
  // Use CSS variables directly for bubbles using the Sunset Bliss palette.
  { id: 1, color: 'var(--blue-grey)', size: 110, start: { x: -1200, y: -1200 }, cx: -60, cy: -80, dotMode: true, dotSize: 32, dotPos: { x: -160, y: 0 } },
  { id: 2, color: 'var(--pumpkin-spice)', size: 95, start: { x: 1200, y: -1200 }, cx: 80, cy: -40, dotMode: false },
  { id: 3, color: 'var(--dusty-mauve)', size: 80, start: { x: -1200, y: 1200 }, cx: -50, cy: 90, dotMode: true, dotSize: 28, dotPos: { x: 180, y: -20 } },
  { id: 4, color: 'var(--banana-cream)', size: 65, start: { x: 1200, y: 1200 }, cx: 60, cy: 70, dotMode: false },
  { id: 5, color: 'var(--cinnabar)', size: 50, start: { x: 0, y: 1200 }, cx: 20, cy: 110, dotMode: true, dotSize: 40, dotPos: { x: 0, y: 40 } },
  { id: 6, color: 'var(--pumpkin-spice)', size: 40, start: { x: -1200, y: 0 }, cx: -90, cy: 20, dotMode: false },
];

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState('counting');
  // 'counting' | 'hundred' | 'bubbles' | 'exit' | 'done'
  const [count, setCount] = useState(1);
  const canvasRef = useRef(null);

  // ── 1. STATE MACHINE TIMELINE ──────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hundred'), 1500);
    const t2 = setTimeout(() => setPhase('bubbles'), 2400);
    const t3 = setTimeout(() => setPhase('exit'),    3800);
    const t4 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 4700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  // ── 2. NUMBER ANIMATION ──────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'counting') return;
    const controls = animate(1, 99, {
      duration: 1.3,
      ease: 'easeInOut',
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [phase]);

  // ── 3. CANVAS RIPPLE ─────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // High and low contrast colors matching the Sunset Bliss portfolio theme
    const colors = [
      'rgba(255, 140, 66, 0.4)', // Pumpkin spice
      'rgba(102, 153, 204, 0.4)', // Blue-grey
      'rgba(255, 60, 56, 0.4)',   // Cinnabar
      'rgba(162, 62, 72, 0.3)'    // Dusty mauve
    ];

    const draw = () => {
      time += 0.006;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Drifting origin via sin/cos
      const centerX = canvas.width / 2 + Math.sin(time * 1.5) * (canvas.width * 0.15);
      const centerY = canvas.height / 2 + Math.cos(time * 1.2) * (canvas.height * 0.15);

      const maxRadius = Math.max(canvas.width, canvas.height) * 1.2;
      const numRipples = 16;

      ctx.lineWidth = 2; // slightly thicker for more visibility
      for (let i = 0; i < numRipples; i++) {
        let radius = ((time * 80 + i * (maxRadius / numRipples)) % maxRadius);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = colors[i % colors.length];
        ctx.stroke();
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const formattedCount = count.toString().padStart(2, '0');
  const isExit = phase === 'exit' || phase === 'done';
  const showHundred = ['hundred', 'bubbles', 'exit'].includes(phase);
  const showBubbles = ['bubbles', 'exit'].includes(phase);

  if (phase === 'done') return null;

  const panelTransition = { duration: 0.85, ease: [0.76, 0, 0.24, 1] };

  return (
    <div className={styles.container}>
      {/* LEFT PANEL */}
      <motion.div
        className={styles.panelLeft}
        animate={isExit ? { x: '-100%' } : { x: 0 }}
        transition={panelTransition}
      />
      {/* RIGHT PANEL */}
      <motion.div
        className={styles.panelRight}
        animate={isExit ? { x: '100%' } : { x: 0 }}
        transition={{ ...panelTransition, delay: 0.04 }}
      />
      {/* CANVAS RIPPLE BACKGROUND */}
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.contentLayer}>
        {/* PHASE 2: DRIFTING COUNTER */}
        <AnimatePresence>
          {phase === 'counting' && (
            <motion.div
              key="counting-counter"
              className={styles.counter}
              initial={{ x: '-20vw', opacity: 0 }}
              animate={{ x: '0vw', opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {formattedCount}<span className={styles.percent}>%</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHASE 3 & 5: 100 SPLIT ENTRY & EXIT */}
        <AnimatePresence>
          {showHundred && (
            <motion.div
              className={styles.splitHundred}
              initial={{ opacity: 1 }}
              animate={
                phase === 'exit'
                  ? { opacity: 0, scale: 0.85 }
                  : { opacity: 1, scale: [1, 1.08, 1] }
              }
              transition={
                phase === 'exit'
                  ? { duration: 0.4, ease: 'easeOut' }
                  : { times: [0, 0.4, 1], duration: 0.9 }
              }
            >
              <div className={styles.digitBox}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '-120vh' }}
                  animate={{ y: 0 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                >
                  1
                </motion.span>
              </div>
              <div className={styles.digitBox}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '120vh' }}
                  animate={{ y: 0 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                >
                  00
                </motion.span>
              </div>
              <div className={styles.digitBox}>
                <motion.span
                  style={{ display: 'inline-block', fontSize: '0.45em', verticalAlign: 'super', lineHeight: 0, marginLeft: '0.05em' }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                >
                  %
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHASE 4 & 5: BUBBLES & NAME */}
        {showBubbles && BUBBLES.map((b, i) => {
          const isDot   = false;  // dot mode only existed in name phase
          const fadeOut = phase === 'exit';
          const currentSize = b.size;

          return (
            <motion.div
              layout
              key={b.id}
              className={styles.bubble}
              style={{
                backgroundColor: b.color,
                width: currentSize,
                height: currentSize,
                top: '50%',
                left: '50%',
                marginTop: -(currentSize / 2),
                marginLeft: -(currentSize / 2),
              }}
              initial={{ x: b.start.x, y: b.start.y, opacity: 0 }}
              animate={
                fadeOut
                  ? { opacity: 0, scale: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                  : { x: b.cx, y: b.cy, opacity: 0.85 }
              }
              transition={
                fadeOut
                  ? {}
                  : {
                      type: 'spring',
                      stiffness: 40,
                      damping: 15,
                      delay: i * 0.08
                    }
              }
            />
          );
        })}

        {/* No name phase — removed */}

      </div>
    </div>
  );
};

export default Preloader;
