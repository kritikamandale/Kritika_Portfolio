// src/utils/colorLerp.js
// ============================================================
// COLOR INTERPOLATION UTILITY
// Interpolates smoothly between an ordered array of hex colour
// stops given a normalised progress value (0 → 1).
//
// Usage:
//   import { colorLerp, REVEAL_PALETTE } from '../utils/colorLerp';
//   const color = colorLerp(REVEAL_PALETTE, 0.5); // → "#d4cdfe" (approx)
// ============================================================

// ── Edit the palette here to retheme the reveal animation ──
// Stops are distributed evenly across the 0–1 progress range.
export const REVEAL_PALETTE = [
  '#c4b5fd', // pastel purple  (progress 0.00 of the colour phase)
  '#bae6fd', // pastel blue    (progress 0.33)
  '#fbcfe8', // soft blush     (progress 0.67)
  '#f5f0eb', // off-white bg   (progress 1.00) — matches --color-bg
];

// ─────────────────────────────────────────────────────────────
// hexToRgb — converts a CSS hex string (#rrggbb) to { r, g, b }
// ─────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  // Strip leading '#' and expand short-form (#abc → #aabbcc)
  const clean = hex.replace('#', '');
  const full  = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;

  return {
    r: parseInt(full.slice(0, 2), 16), // red   channel 0–255
    g: parseInt(full.slice(2, 4), 16), // green channel 0–255
    b: parseInt(full.slice(4, 6), 16), // blue  channel 0–255
  };
}

// ─────────────────────────────────────────────────────────────
// rgbToHex — converts { r, g, b } back to '#rrggbb'
// ─────────────────────────────────────────────────────────────
function rgbToHex({ r, g, b }) {
  // Math.round prevents sub-pixel fractional channels
  // toString(16) converts to hex; padStart ensures two digits
  return (
    '#' +
    [r, g, b]
      .map((v) => Math.round(v).toString(16).padStart(2, '0'))
      .join('')
  );
}

// ─────────────────────────────────────────────────────────────
// lerpNum — linearly interpolates between two numbers
// ─────────────────────────────────────────────────────────────
function lerpNum(a, b, t) {
  return a + (b - a) * t;
}

// ─────────────────────────────────────────────────────────────
// colorLerp — main export
//
// @param {string[]} stops   - ordered array of hex colour strings
// @param {number}   progress - 0 → 1 (clamped internally)
// @returns {string} interpolated hex colour string '#rrggbb'
// ─────────────────────────────────────────────────────────────
export function colorLerp(stops, progress) {
  // Guard: clamp progress to [0, 1]
  const t = Math.max(0, Math.min(1, progress));

  // Edge cases: at or beyond the palette bounds
  if (t <= 0) return stops[0];
  if (t >= 1) return stops[stops.length - 1];

  // Each adjacent pair of stops covers an equal segment of [0, 1]
  const segmentSize = 1 / (stops.length - 1);

  // Which segment does `t` fall into?
  const segmentIndex = Math.floor(t / segmentSize);

  // Clamp index so we never exceed the last valid pair
  const i = Math.min(segmentIndex, stops.length - 2);

  // Local progress within this segment [0, 1]
  const localT = (t - i * segmentSize) / segmentSize;

  // Decompose both stops into RGB channels
  const from = hexToRgb(stops[i]);
  const to   = hexToRgb(stops[i + 1]);

  // Interpolate each channel independently
  return rgbToHex({
    r: lerpNum(from.r, to.r, localT),
    g: lerpNum(from.g, to.g, localT),
    b: lerpNum(from.b, to.b, localT),
  });
}
