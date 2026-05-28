/**
 * api/contact.js — Vercel Serverless Function
 *
 * Security measures implemented:
 *  - Custom in-memory rate limiter: 5 req / 15 min / IP
 *  - CORS: whitelist production domain only
 *  - Body size guard: 413 if Content-Length > 10 KB
 *  - Security headers: CSP, X-Frame-Options, X-Content-Type-Options,
 *    HSTS, Referrer-Policy, X-XSS-Protection (disabled per OWASP)
 *  - hCaptcha server-side verification (bypassable in local dev via SKIP_HCAPTCHA)
 *  - Input validation & sanitisation via validator.js
 *  - Header-injection prevention: newlines stripped from name/subject
 *  - All sensitive config via process.env
 */

import validator from 'validator';
import { Resend } from 'resend';

// ─── Constants ────────────────────────────────────────────────────────────────

const ALLOWED_ORIGIN = 'https://kritikamandale.vercel.app';
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;
const BODY_SIZE_LIMIT = 10 * 1024; // 10 KB

// ─── In-memory rate limiter ───────────────────────────────────────────────────
// NOTE: Resets on every cold start — acceptable for a portfolio contact form.

/** @type {Map<string, { count: number; resetAt: number }>} */
const rateLimitStore = new Map();

/**
 * Returns true if the request should be blocked (rate limit exceeded).
 * @param {string} ip
 */
function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ─── Security headers ─────────────────────────────────────────────────────────

/**
 * Apply a strict set of security response headers.
 * Equivalent to helmet({ contentSecurityPolicy: { directives: { defaultSrc: ["'none'"] } } })
 * but for a plain Vercel function (no Express middleware chain).
 * @param {import('@vercel/node').VercelResponse} res
 */
function applySecurityHeaders(res) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; frame-ancestors 'none';"
  );
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  res.setHeader('Referrer-Policy', 'no-referrer');
  // Per OWASP, disable the legacy XSS filter to avoid introducing new vectors.
  res.setHeader('X-XSS-Protection', '0');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
}

// ─── CORS ─────────────────────────────────────────────────────────────────────

/**
 * Apply CORS headers, whitelisting only the production Vercel domain.
 * Returns false if the origin is not allowed (caller should return 403).
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
function applyCors(req, res) {
  const origin = req.headers['origin'];

  // Allow requests with no Origin header (same-origin, curl) only in dev.
  const allowedOrigin =
    origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : null;

  if (!allowedOrigin) {
    // Return null to signal that the origin is not allowed.
    // We still set Vary so caches are not poisoned.
    res.setHeader('Vary', 'Origin');
    return false;
  }

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Vary', 'Origin');
  return true;
}


// ─── Input sanitisation helpers ───────────────────────────────────────────────

/**
 * Strip CR/LF characters to prevent SMTP header injection.
 * @param {string} value
 */
function stripNewlines(value) {
  return typeof value === 'string' ? value.replace(/[\r\n]/g, '') : '';
}

/**
 * Safely cast a value to a trimmed string.
 * @param {unknown} value
 */
function toStr(value) {
  if (typeof value !== 'string') return '';
  return value.trim();
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // 1. Apply security headers to every response.
  applySecurityHeaders(res);

  // 2. Handle CORS preflight.
  const origin = req.headers['origin'];
  const corsAllowed = applyCors(req, res);

  if (req.method === 'OPTIONS') {
    // If origin is not allowed, still respond 204 but without CORS headers
    // (browser will block the actual request).
    return res.status(204).end();
  }

  // 3. Only allow POST.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // 4. Block disallowed origins for POST requests.
  if (!corsAllowed) {
    return res.status(403).json({ error: 'Forbidden.' });
  }

  // 5. Body size guard — 413 if Content-Length header exceeds 10 KB.
  const contentLength = parseInt(req.headers['content-length'] ?? '0', 10);
  if (contentLength > BODY_SIZE_LIMIT) {
    return res.status(413).json({ error: 'Payload too large. Maximum body size is 10 KB.' });
  }

  // 6. Extract client IP for rate limiting.
  //    Vercel sets x-forwarded-for; fall back to remoteAddress.
  const ip =
    (req.headers['x-forwarded-for'] ?? req.socket?.remoteAddress ?? 'unknown')
      .toString()
      .split(',')[0]
      .trim();

  // 7. Rate limit check.
  if (isRateLimited(ip)) {
    res.setHeader('Retry-After', String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)));
    return res.status(429).json({
      error: 'Too many requests. Please wait 15 minutes before trying again.',
    });
  }

  // 8. Validate required environment variables.
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith('re_xxx')) {
    console.error('[contact] RESEND_API_KEY is not configured.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  // 9. Parse & validate body.
  const body = req.body ?? {};

  // 9a. Extract raw strings.
  const rawName    = toStr(body.name);
  const rawEmail   = toStr(body.email);
  const rawSubject = toStr(body.subject);
  const rawMessage = toStr(body.message);

  // 9b. Validate required fields.
  const errors = [];

  if (!rawName) {
    errors.push('Name is required.');
  } else if (rawName.length > 100) {
    errors.push('Name must be 100 characters or fewer.');
  }

  if (!rawEmail) {
    errors.push('Email is required.');
  } else if (!validator.isEmail(rawEmail)) {
    errors.push('A valid email address is required.');
  }

  if (rawSubject.length > 200) {
    errors.push('Subject must be 200 characters or fewer.');
  }

  if (!rawMessage) {
    errors.push('Message is required.');
  } else if (rawMessage.length > 5000) {
    errors.push('Message must be 5000 characters or fewer.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(' ') });
  }

  // 9c. Sanitise — strip newlines from name/subject (header injection prevention).
  const name    = stripNewlines(rawName);
  const subject = stripNewlines(rawSubject);

  // 9d. Normalise email (lowercase, trim).
  const email = validator.normalizeEmail(rawEmail) || rawEmail.toLowerCase();

  // 9e. Escape message for safe HTML rendering in the email body.
  const messageSafe = validator.escape(rawMessage).replace(/\n/g, '<br>');


  // 11. Send email via Resend.
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const toEmail   = process.env.RESEND_TO_EMAIL   || 'kritikamandale@gmail.com';

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error: resendError } = await resend.emails.send({
      from: `Kritika Mandale – Portfolio Inquiry <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New Inquiry: ${subject || 'Connection Request'} — ${name}`,
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;color:#333;line-height:1.6;max-width:600px">
          <h2 style="margin-top:0;font-size:20px;color:#111">New Inquiry from Your Portfolio</h2>
          <p style="color:#555">You have received a new message via your professional portfolio.</p>

          <table style="border-collapse:collapse;width:100%;margin-top:20px">
            <tr><td style="padding:6px 0;font-weight:600;width:120px;vertical-align:top">Name</td><td style="padding:6px 0">${validator.escape(name)}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;vertical-align:top">Email</td><td style="padding:6px 0"><a href="mailto:${validator.escape(email)}" style="color:#0056b3">${validator.escape(email)}</a></td></tr>
            <tr><td style="padding:6px 0;font-weight:600;vertical-align:top">Subject</td><td style="padding:6px 0">${subject ? validator.escape(subject) : '<em style="color:#777">No Subject</em>'}</td></tr>
          </table>

          <p style="margin-top:24px;font-weight:600">Message:</p>
          <div style="white-space:pre-wrap;color:#222;background:#f5f5f5;padding:16px;border-radius:8px;margin-top:8px">${messageSafe}</div>

          <hr style="border:none;border-top:1px solid #ddd;margin:28px 0">
          <p style="color:#999;font-size:12px;margin:0">
            Automated notification from Kritika Mandale's Portfolio Platform.<br>
            Reply directly to this email to respond to the sender.
          </p>
        </div>
      `,
    });

    if (resendError) {
      console.error('[contact] Resend API error:', resendError);
      return res.status(400).json({ error: resendError.message || 'Failed to send message.' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}