import { NextResponse } from 'next/server';
import validator from 'validator';
import { Resend } from 'resend';

// ─── Constants ────────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://krimyportfolio.vercel.app,http://localhost:5173,http://localhost:3000').split(',');

for (const envVar of ['VERCEL_URL', 'VERCEL_BRANCH_URL', 'VERCEL_PROJECT_PRODUCTION_URL']) {
  if (process.env[envVar]) {
    const origin = `https://${process.env[envVar]}`;
    if (!ALLOWED_ORIGINS.includes(origin)) {
      ALLOWED_ORIGINS.push(origin);
    }
  }
}
if (!ALLOWED_ORIGINS.includes('http://localhost:3000')) {
  ALLOWED_ORIGINS.push('http://localhost:3000');
}
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;
const BODY_SIZE_LIMIT = 10 * 1024; // 10 KB

// ─── In-memory rate limiter ───────────────────────────────────────────────────

const rateLimitStore = new Map();

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

function getSecurityHeaders() {
  return {
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none';",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Referrer-Policy': 'no-referrer',
    'X-XSS-Protection': '0',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  };
}

// ─── CORS ─────────────────────────────────────────────────────────────────────

function applyCors(req) {
  let origin = req.headers.get('origin');
  if (!origin) return 'http://localhost:3000';
  
  origin = origin.trim();
  if (origin.endsWith('/')) origin = origin.slice(0, -1);
  
  if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
    return origin;
  }
  
  return ALLOWED_ORIGINS.includes(origin) ? origin : null;
}

function getCorsHeaders(allowedOrigin) {
  return {
    'Access-Control-Allow-Origin': allowedOrigin || '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

// ─── Input sanitisation helpers ───────────────────────────────────────────────

function stripNewlines(value) {
  return typeof value === 'string' ? value.replace(/[\r\n]/g, '') : '';
}

function toStr(value) {
  if (typeof value !== 'string') return '';
  return value.trim();
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export async function OPTIONS(request) {
  const allowedOrigin = applyCors(request);
  const headers = { ...getSecurityHeaders(), ...getCorsHeaders(allowedOrigin) };
  return new NextResponse(null, { status: 204, headers });
}

export async function POST(request) {
  const allowedOrigin = applyCors(request);
  const headers = { ...getSecurityHeaders(), ...getCorsHeaders(allowedOrigin) };

  if (!allowedOrigin) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403, headers });
  }

  const contentLength = parseInt(request.headers.get('content-length') ?? '0', 10);
  if (contentLength > BODY_SIZE_LIMIT) {
    return NextResponse.json({ error: 'Payload too large. Maximum body size is 10 KB.' }, { status: 413, headers });
  }

  const ip = (request.headers.get('x-forwarded-for') ?? 'unknown').toString().split(',')[0].trim();

  if (isRateLimited(ip)) {
    headers['Retry-After'] = String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000));
    return NextResponse.json({ error: 'Too many requests. Please wait before submitting again.' }, { status: 429, headers });
  }

  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith('re_xxx')) {
    console.error('[contact] RESEND_API_KEY is not configured.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500, headers });
  }

  let body = {};
  try {
    body = await request.json();
  } catch (e) {
    body = {};
  }

  const rawHoneypot= toStr(body.honeypot);
  if (rawHoneypot) {
    return NextResponse.json({ ok: true }, { status: 200, headers });
  }

  const rawName    = toStr(body.name);
  const rawEmail   = toStr(body.email);
  const rawSubject = toStr(body.subject);
  const rawMessage = toStr(body.message);

  const errors = [];

  if (!rawName || rawName.length < 2) {
    errors.push('Please enter your name.');
  } else if (rawName.length > 100) {
    errors.push('Name must be 100 characters or fewer.');
  }

  if (!rawEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
    errors.push('Please enter a valid email.');
  }

  if (rawSubject.length > 200) {
    errors.push('Subject must be 200 characters or fewer.');
  }

  if (!rawMessage || rawMessage.length < 20) {
    errors.push('Message must be at least 20 characters.');
  } else if (rawMessage.length > 5000) {
    errors.push('Message must be 5000 characters or fewer.');
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(' ') }, { status: 400, headers });
  }

  const name    = validator.escape(stripNewlines(rawName));
  const subject = stripNewlines(rawSubject);
  const email = validator.normalizeEmail(rawEmail) || rawEmail.toLowerCase();
  const messageSafe = validator.escape(rawMessage).replace(/\n/g, '<br>');

  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail   = process.env.RESEND_TO_EMAIL;

  if (!fromEmail || !toEmail) {
    console.error('[contact] Email configuration is missing.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500, headers });
  }

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
            <tr><td style="padding:6px 0;font-weight:600;width:120px;vertical-align:top">Name</td><td style="padding:6px 0">${name}</td></tr>
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
      return NextResponse.json({ error: resendError.message || 'Failed to send message.' }, { status: 400, headers });
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200, headers });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500, headers });
  }
}
