'use client';
// src/components/Navbar/PixelPanda.jsx
// ============================================================
// PIXEL PANDA - a small code-generated pixel-art companion that
// lives on the navbar. No image assets: the sprite is drawn to
// a <canvas> each frame from the data in pixelPandaSprite.js.
//
// Behaviour is a simple state machine, not a fixed loop:
//   IDLE   -> occasional blink (3-5s), rare bounce (20-40s),
//             and a randomized timer (15-30s) that triggers WALK.
//   WALK   -> picks a random spot along the navbar, steps toward
//             it every ~175ms (discrete moves, no CSS transition),
//             alternating the 2-frame leg cycle, then returns to IDLE.
//   DRAG   -> user can click/touch and grab the panda, dragging it
//             anywhere across the screen viewport. Portaled to
//             document.body while floating to prevent parent transform/opacity clipping.
//   RETURN -> 5s after drop, panda automatically steps across the screen
//             back to its home spot on the navbar.
// ============================================================

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { FRAMES, GRID_COLS, GRID_ROWS, COLORS } from './pixelPandaSprite';

const CELL = 3.6; // CSS px per sprite pixel (~58px width x ~65px height)
const SPRITE_W = GRID_COLS * CELL;
const SPRITE_H = GRID_ROWS * CELL;
const EDGE_MARGIN = 6; // keep this clear of the navbar's edges while walking
const STEP_PX = 5; // px moved per walk tick
const STEP_MS = 175; // ms per walk tick

const MESSAGES = [
  "Hi! I'm Panda, your portfolio pet 🐼",
  "Check out Kritika's projects below! ↓ ✨",
  "Resume's right up there! ↗ 📄",
  "Waving hi to you! 👋",
  "Nom nom 🎋",
  "Drag me around anytime! 🐾",
];

const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function drawFrame(ctx, frameKey, dpr) {
  const grid = FRAMES[frameKey];
  if (!grid || !ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, SPRITE_W, SPRITE_H);
  ctx.imageSmoothingEnabled = false;
  for (let y = 0; y < GRID_ROWS; y++) {
    const row = grid[y];
    if (!row) continue;
    for (let x = 0; x < GRID_COLS; x++) {
      const code = row[x];
      if (code === '.') continue;
      ctx.fillStyle = COLORS[code];
      ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
    }
  }
}

const PixelPanda = () => {
  const prefersReduced = usePrefersReducedMotion();
  const mounted = useMounted();
  const [isFloatingState, setIsFloatingState] = useState(false);
  const [isSleepingState, setIsSleepingState] = useState(false);

  const wrapperRef = useRef(null); // spans the full navbar width
  const positionRef = useRef(null); // gets translateX + scaleX or fixed positioning
  const bounceRef = useRef(null);
  const bubbleRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const dprRef = useRef(1);

  const [bubbleOpen, setBubbleOpen] = useState(false);
  const messageIndexRef = useRef(-1);
  const [message, setMessage] = useState(MESSAGES[0]);

  const posX = useRef(20);
  const facing = useRef(1); // 1 = facing right, -1 = facing left
  const walking = useRef(false);
  const currentFrame = useRef('idle');

  // Interactive drag & drop & sleep state
  const isPlaced = useRef(false);
  const isDragging = useRef(false);
  const isReturning = useRef(false);
  const isSleepingRef = useRef(false);
  const dragPos = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  const timers = useRef({});

  const setFrame = useCallback((key) => {
    currentFrame.current = key;
    if (!ctxRef.current) return;
    drawFrame(ctxRef.current, key, dprRef.current);
  }, []);

  const applyTransform = useCallback(() => {
    if (positionRef.current) {
      if (isPlaced.current || isDragging.current || isReturning.current) {
        positionRef.current.style.position = 'fixed';
        positionRef.current.style.left = `${dragPos.current.x}px`;
        positionRef.current.style.top = `${dragPos.current.y}px`;
        positionRef.current.style.bottom = 'auto';
        positionRef.current.style.zIndex = '99999';
        positionRef.current.style.transform = `scaleX(${facing.current})`;
      } else {
        positionRef.current.style.position = 'absolute';
        positionRef.current.style.left = '0px';
        positionRef.current.style.top = 'auto';
        positionRef.current.style.bottom = '0px';
        positionRef.current.style.zIndex = 'auto';
        positionRef.current.style.transform = `translateX(${posX.current}px) scaleX(${facing.current})`;
      }
    }
    if (bubbleRef.current) {
      bubbleRef.current.style.transform = `translateX(-50%) scaleX(${facing.current})`;
    }
  }, []);

  const clampX = useCallback((x) => {
    const maxW = wrapperRef.current?.clientWidth || SPRITE_W + EDGE_MARGIN * 2;
    const max = Math.max(EDGE_MARGIN, maxW - SPRITE_W - EDGE_MARGIN);
    return Math.min(max, Math.max(EDGE_MARGIN, x));
  }, []);

  const stopWalking = useCallback(() => {
    clearInterval(timers.current.walk);
    walking.current = false;
    setFrame('idle');
  }, [setFrame]);

  const showBubbleText = useCallback((txt, duration = 3000) => {
    stopWalking();
    clearTimeout(timers.current.bubbleHide);
    setMessage(txt);
    setBubbleOpen(true);
    timers.current.bubbleHide = setTimeout(() => setBubbleOpen(false), duration);
  }, [stopWalking]);

  const showBubble = useCallback(() => {
    stopWalking();
    clearTimeout(timers.current.bubbleHide);
    messageIndexRef.current = (messageIndexRef.current + 1) % MESSAGES.length;
    setMessage(MESSAGES[messageIndexRef.current]);
    setBubbleOpen(true);
    timers.current.bubbleHide = setTimeout(() => setBubbleOpen(false), 3000);
  }, [stopWalking]);

  const startWalkRef = useRef(null);

  const startWalk = useCallback(() => {
    if (isPlaced.current || isDragging.current || isReturning.current || isSleepingRef.current) return;
    const maxW = wrapperRef.current?.clientWidth || SPRITE_W + EDGE_MARGIN * 2;
    const max = Math.max(EDGE_MARGIN, maxW - SPRITE_W - EDGE_MARGIN);

    let target = EDGE_MARGIN + Math.random() * (max - EDGE_MARGIN);
    let attempts = 0;
    while (Math.abs(target - posX.current) < 40 && attempts < 10) {
      target = EDGE_MARGIN + Math.random() * (max - EDGE_MARGIN);
      attempts++;
    }

    walking.current = true;
    facing.current = target > posX.current ? 1 : -1;
    let toggle = false;

    clearInterval(timers.current.walk);
    timers.current.walk = setInterval(() => {
      if (isPlaced.current || isDragging.current || isReturning.current || isSleepingRef.current) {
        stopWalking();
        return;
      }
      const dir = target > posX.current ? 1 : -1;
      posX.current = clampX(posX.current + dir * STEP_PX);
      applyTransform();

      const arrived = (dir === 1 && posX.current >= target) || (dir === -1 && posX.current <= target);
      if (arrived) {
        clearInterval(timers.current.walk);
        walking.current = false;
        if (!isSleepingRef.current && !isDragging.current && !isPlaced.current && !isReturning.current) {
          startWalkRef.current?.(); // Continuously walk to next destination!
        }
        return;
      }
      toggle = !toggle;
      setFrame(toggle ? 'walkA' : 'walkB');
    }, STEP_MS);
  }, [applyTransform, clampX, setFrame, stopWalking]);

  useEffect(() => {
    startWalkRef.current = startWalk;
  }, [startWalk]);

  // Walk back to navbar rapidly after being placed somewhere
  const startReturnWalk = useCallback(() => {
    if (isDragging.current || (!isPlaced.current && !isReturning.current)) return;

    isReturning.current = true;
    showBubbleText("Walking back home! 🐾", 2000);

    clearInterval(timers.current.returnWalk);
    let toggle = false;

    timers.current.returnWalk = setInterval(() => {
      if (!wrapperRef.current || !positionRef.current) {
        clearInterval(timers.current.returnWalk);
        return;
      }

      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const targetX = wrapperRect.left + posX.current;
      const targetY = wrapperRect.bottom - SPRITE_H;

      const currentX = dragPos.current.x;
      const currentY = dragPos.current.y;

      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const dist = Math.hypot(dx, dy);

      if (dist < 10) {
        // Reached navbar home
        clearInterval(timers.current.returnWalk);
        isReturning.current = false;
        isPlaced.current = false;
        setIsFloatingState(false);
        applyTransform();

        if (isSleepingRef.current) {
          setFrame('sleep');
        } else {
          setFrame('idle');
          showBubbleText("Home sweet home! 🐼", 2000);
          startWalk(); // Resume continuous walking when back home
        }
        return;
      }

      facing.current = dx >= 0 ? 1 : -1;
      const step = 5; // Smooth, gentle walking speed
      const ratio = step / dist;

      dragPos.current.x = currentX + dx * ratio;
      dragPos.current.y = currentY + dy * ratio;
      applyTransform();

      toggle = !toggle;
      setFrame(toggle ? 'walkA' : 'walkB');
    }, 45);
  }, [applyTransform, setFrame, showBubbleText, startWalk]);

  const scheduleReturnHome = useCallback(() => {
    clearTimeout(timers.current.returnTimer);
    timers.current.returnTimer = setTimeout(() => {
      startReturnWalk();
    }, 1500); // 1.5 seconds after drop, walks back home
  }, [startReturnWalk]);

  // 20-Second Idle Screen Detection & Sleeping logic
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const resetIdleTimer = () => {
      clearTimeout(timers.current.idleTimer);
      timers.current.idleTimer = setTimeout(() => {
        // Screen has been completely idle for 20 seconds!
        if (isDragging.current) return;

        if (isPlaced.current || isReturning.current) {
          startReturnWalk();
        }

        stopWalking();
        isSleepingRef.current = true;
        setIsSleepingState(true);
        setFrame('sleep');
      }, 20000); // 20 seconds idle threshold
    };

    const handleUserActivity = (e) => {
      if (e && e.type === 'mousemove') {
        const dx = Math.abs(e.clientX - lastMousePos.current.x);
        const dy = Math.abs(e.clientY - lastMousePos.current.y);
        if (dx < 15 && dy < 15) {
          return; // Ignore micro-jitters so 20s idle sleep triggers reliably!
        }
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }

      if (isSleepingRef.current) {
        isSleepingRef.current = false;
        setIsSleepingState(false);
        setFrame('idle');
        showBubbleText("Yawn... I'm awake! 🐾", 2000);
        startWalk(); // Resume continuous walking on wake-up!
      }

      resetIdleTimer();
    };

    resetIdleTimer();

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);

    const activeTimers = timers.current;
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      clearTimeout(activeTimers.idleTimer);
    };
  }, [setFrame, showBubbleText, startReturnWalk, startWalk, stopWalking]);

  const handlePointerDown = useCallback((e) => {
    if (e.button && e.button !== 0) return;

    if (isSleepingRef.current) {
      isSleepingRef.current = false;
      setIsSleepingState(false);
    }

    stopWalking();
    clearInterval(timers.current.returnWalk);
    clearTimeout(timers.current.returnTimer);
    isReturning.current = false;

    const rect = positionRef.current?.getBoundingClientRect();
    if (!rect) return;

    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    hasMovedRef.current = false;
    dragPos.current = { x: rect.left, y: rect.top };

    const handlePointerMove = (moveEvt) => {
      const moveDist = Math.hypot(
        moveEvt.clientX - (dragPos.current.x + dragOffset.current.x),
        moveEvt.clientY - (dragPos.current.y + dragOffset.current.y)
      );

      if (moveDist > 3) {
        hasMovedRef.current = true;
        isDragging.current = true;
        isPlaced.current = true;

        if (!isFloatingState) {
          setIsFloatingState(true);
        }

        const maxW = window.innerWidth - SPRITE_W;
        const maxH = window.innerHeight - SPRITE_H;
        const nextX = Math.min(maxW, Math.max(0, moveEvt.clientX - dragOffset.current.x));
        const nextY = Math.min(maxH, Math.max(0, moveEvt.clientY - dragOffset.current.y));

        if (nextX > dragPos.current.x) facing.current = 1;
        else if (nextX < dragPos.current.x) facing.current = -1;

        dragPos.current = { x: nextX, y: nextY };
        applyTransform();
        setFrame('walkA');
        showBubbleText("Wheee! 🐼", 1500);
      }
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      if (isDragging.current) {
        isDragging.current = false;
        setFrame('idle');
        showBubbleText("Put me here? I'll walk home soon! 🐾", 2000);
        scheduleReturnHome();
      } else if (!hasMovedRef.current) {
        showBubble();
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  }, [applyTransform, isFloatingState, scheduleReturnHome, setFrame, showBubble, showBubbleText, stopWalking]);

  // Init canvas and timers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    dprRef.current = dpr;
    canvas.width = SPRITE_W * dpr;
    canvas.height = SPRITE_H * dpr;
    canvas.style.width = `${SPRITE_W}px`;
    canvas.style.height = `${SPRITE_H}px`;
    ctxRef.current = canvas.getContext('2d');
    setFrame(currentFrame.current || 'idle');

    if (!isPlaced.current && !isDragging.current && !isReturning.current) {
      posX.current = clampX(EDGE_MARGIN + Math.random() * ((wrapperRef.current?.clientWidth || 200) - SPRITE_W - EDGE_MARGIN * 2));
    }
    applyTransform();

    if (prefersReduced) return undefined;

    const scheduleBlink = () => {
      timers.current.blink = setTimeout(() => {
        if (!walking.current && !isDragging.current && !isPlaced.current && !isReturning.current && !isSleepingRef.current) {
          setFrame('blink');
          timers.current.blinkClose = setTimeout(() => {
            if (!walking.current && !isDragging.current && !isPlaced.current && !isReturning.current && !isSleepingRef.current) setFrame('idle');
          }, 150);
        }
        scheduleBlink();
      }, 3000 + Math.random() * 2000);
    };

    const scheduleBounce = () => {
      timers.current.bounceTrigger = setTimeout(() => {
        if (!walking.current && !isDragging.current && !isPlaced.current && !isReturning.current && !isSleepingRef.current && bounceRef.current) {
          bounceRef.current.classList.add('animate-panda-bounce');
          setTimeout(() => bounceRef.current?.classList.remove('animate-panda-bounce'), 420);
        }
        scheduleBounce();
      }, 20000 + Math.random() * 20000);
    };

    const scheduleAction = () => {
      timers.current.actionTrigger = setTimeout(() => {
        if (!isDragging.current && !isPlaced.current && !isReturning.current && !isSleepingRef.current) {
          stopWalking(); // Temporarily pause walking for action
          const rand = Math.random();
          if (rand < 0.25) {
            // Wave paw to user (5.5 seconds)
            showBubbleText("Waving hi to you! 👋", 5500);
            setFrame('waveA');
            timers.current.waveInterval = setInterval(() => {
              setFrame((prev) => (prev === 'waveA' ? 'waveB' : 'waveA'));
            }, 250);
            setTimeout(() => {
              clearInterval(timers.current.waveInterval);
              setFrame('idle');
              if (!isSleepingRef.current) startWalk();
            }, 5500);
          } else if (rand < 0.50) {
            // Munch green bamboo stick (6.0 seconds)
            showBubbleText("Nom nom 🎋", 6000);
            setFrame('bamboo');
            setTimeout(() => {
              setFrame('idle');
              if (!isSleepingRef.current) startWalk();
            }, 6000);
          } else if (rand < 0.75) {
            // Suggest Projects (6 seconds)
            showBubbleText("Check out Kritika's projects below! ↓ ✨", 6000);
            setTimeout(() => {
              setFrame('idle');
              if (!isSleepingRef.current) startWalk();
            }, 6000);
          } else {
            // Suggest Resume (6 seconds)
            showBubbleText("Resume's right up there! ↗ 📄", 6000);
            setTimeout(() => {
              setFrame('idle');
              if (!isSleepingRef.current) startWalk();
            }, 6000);
          }
        }
        scheduleAction();
      }, 5000 + Math.random() * 3000);
    };

    scheduleBlink();
    scheduleBounce();

    // Cute initial self-introduction when page opens (8.0 seconds)
    timers.current.introTimer = setTimeout(() => {
      if (!isDragging.current && !isPlaced.current && !isReturning.current && !isSleepingRef.current) {
        showBubbleText("Hi! I'm Panda, your portfolio pet 🐼", 8000);
        setFrame('waveA');
        timers.current.waveIntro = setInterval(() => {
          setFrame((prev) => (prev === 'waveA' ? 'waveB' : 'waveA'));
        }, 250);
        setTimeout(() => {
          clearInterval(timers.current.waveIntro);
          setFrame('idle');
          if (!isSleepingRef.current) startWalk();
        }, 8000);
      } else {
        startWalk();
      }
    }, 400);

    scheduleAction();

    const onResize = () => {
      if (!isPlaced.current) {
        posX.current = clampX(posX.current);
      } else {
        dragPos.current.x = Math.min(window.innerWidth - SPRITE_W, Math.max(0, dragPos.current.x));
        dragPos.current.y = Math.min(window.innerHeight - SPRITE_H, Math.max(0, dragPos.current.y));
      }
      applyTransform();
    };
    window.addEventListener('resize', onResize);

    const activeTimers = timers.current;
    return () => {
      window.removeEventListener('resize', onResize);
      Object.values(activeTimers).forEach((id) => {
        clearTimeout(id);
        clearInterval(id);
      });
    };
  }, [clampX, applyTransform, isFloatingState, prefersReduced, setFrame, startWalk, showBubbleText, stopWalking]);

  // Re-draw canvas whenever floating portal state changes
  useEffect(() => {
    if (mounted) {
      setFrame(currentFrame.current || 'idle');
      applyTransform();
    }
  }, [isFloatingState, mounted, setFrame, applyTransform]);

  const pandaContent = (
    <div
      ref={positionRef}
      className={`will-change-transform ${isFloatingState ? 'fixed z-[99999]' : 'absolute bottom-0 left-0'}`}
    >
      <div ref={bounceRef} className="relative">
        <div
          ref={bubbleRef}
          role="status"
          aria-live="polite"
          className={`
            absolute bottom-[calc(100%+8px)] left-1/2
            whitespace-nowrap px-2.5 py-1.5
            bg-white dark:bg-surface-dark border-2 border-text-primary dark:border-brand-yellow
            font-mono text-[11px] font-medium text-text-primary dark:text-text-dark-primary
            transition-opacity duration-150
            ${(bubbleOpen || isSleepingState) ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        >
          {isSleepingState ? (
            <span className="inline-flex items-center gap-1 font-bold text-accent dark:text-brand-yellow animate-pulse">
              Z z z 💤
            </span>
          ) : (
            message
          )}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white dark:bg-surface-dark border-r-2 border-b-2 border-text-primary dark:border-brand-yellow" />
        </div>

        <button
          type="button"
          aria-label="Pixel panda, drag to play or click for a message"
          onPointerDown={handlePointerDown}
          className="block pointer-events-auto cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white select-none touch-none"
        >
          <canvas ref={canvasRef} aria-hidden="true" style={{ imageRendering: 'pixelated', display: 'block' }} />
        </button>
      </div>
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-x-0 bottom-full block pointer-events-none"
      aria-hidden="true"
    >
      {mounted && isFloatingState
        ? createPortal(pandaContent, document.body)
        : pandaContent}
    </div>
  );
};

export default PixelPanda;
