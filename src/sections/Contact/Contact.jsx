'use client';
// src/sections/Contact/Contact.jsx
// ============================================================
// CONTACT SECTION — single pill CTA, centred editorial layout
// Bot mitigation is a honeypot field only — hCaptcha is not wired up
// (see .env.example) despite the env vars/CSP allowances existing.
// ============================================================

import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import RevealGroup from '../../components/RevealGroup/RevealGroup';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', honeypot: '' });
  const [touched, setTouched] = useState({ name: false, email: false, subject: false, message: false });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const errors = {
    name: touched.name && (!form.name || form.name.length < 2) ? 'Please enter your name.' : '',
    email: touched.email && (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) ? 'Please enter a valid email.' : '',
    message: touched.message && (!form.message || form.message.length < 20) ? 'Message must be at least 20 characters.' : ''
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleBlur = (e) =>
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus({ type: null, message: '' });

    let didError = false;
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
      const res = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error('API route not found. (Note: "npm run dev" does not serve Vercel serverless functions in the root /api folder. Use "vercel dev" or test in production.)');
      }

      if (!res.ok) throw new Error(data.error || 'Failed to send.');
      setStatus({ type: 'success', message: "✅ Message sent! I'll get back within 24 hours." });
      // Don't clear form yet, let the user see success state.
    } catch (err) {
      didError = true;
      setStatus({ type: 'error', message: err.message || "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
      // Auto-dismiss error messages after 6 seconds; success state persists until "Send another message"
      if (didError) {
        setTimeout(() => setStatus({ type: null, message: '' }), 6000);
      }
    }
  };

  const handleReset = () => {
    setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
    setTouched({ name: false, email: false, subject: false, message: false });
    setStatus({ type: null, message: '' });
  };

  // Submit is enabled only when required fields are present and there are no validation errors.
  const canSubmit = form.name.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.message.length >= 20 && !loading;

  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0);   }
          }
        }
      `}</style>

      <section className="bg-surface-2-light dark:bg-surface-2-dark py-12 md:py-16 sm:py-8 flex flex-col items-center justify-center text-center" id="contact" aria-label="Contact">
        <div className="max-w-[1800px] mx-auto w-full flex flex-col items-center gap-4 px-4 md:px-8 lg:px-12">

          <RevealGroup staggerDelay={100} className="w-full flex flex-col items-center gap-4">
            <h2 className="font-heading text-[clamp(3rem,7vw,5.5rem)] font-light tracking-[-0.02em] leading-[1.05] text-text-primary dark:text-text-dark-primary text-center w-full">
              Let&apos;s Build Something <br /> Smart Together
            </h2>
            <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] text-text-secondary dark:text-text-dark-secondary mt-2 max-w-[540px] leading-[1.5]">
              Available for projects, internships, and collaborative AI product development. I respond within 24 hours.
            </p>
          </RevealGroup>

          {status.type === 'success' ? (
            <RevealGroup staggerDelay={100} className="w-full max-w-[560px] flex flex-col items-center gap-6 p-10 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-clay-sm animate-[fadeInUp_0.4s_ease]">
              <div className="text-4xl">🎉</div>
              <h3 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary font-heading">Thank you!</h3>
              <p className="text-text-secondary dark:text-text-dark-secondary">{status.message}</p>
              <Button onClick={handleReset} variant="ghost" size="base">
                Send another message
              </Button>
            </RevealGroup>
          ) : (
            <RevealGroup staggerDelay={100} className="w-full max-w-[560px] flex flex-col items-center gap-6">
              {status.type === 'error' && (
                <div
                  className="flex items-center justify-center gap-3 px-5 py-4 rounded-xl text-sm font-medium animate-[fadeInUp_0.4s_ease] w-full bg-[#B02618]/10 border border-[#B02618]/20 text-[#B02618] dark:text-[#F5DE8F]"
                  role="alert"
                >
                  {status.message}
                </div>
              )}

              <form className="w-full flex flex-col gap-5 text-left" onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  name="honeypot"
                  autoComplete="off"
                  tabIndex="-1"
                  aria-hidden="true"
                  style={{ display: "none", position: "absolute", left: "-9999px" }}
                  value={form.honeypot}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="c-name" className="text-xs font-medium tracking-[0.06em] uppercase text-text-secondary dark:text-text-dark-secondary">Name *</label>
                    <input
                      id="c-name" name="name" type="text"
                      className={`w-full px-5 py-3.5 rounded-xl border ${touched.name && errors.name ? 'border-[#B02618] focus:shadow-[0_0_0_3px_rgba(176,38,24,0.2)]' : 'border-border-light dark:border-border-dark focus:border-brand-red focus:shadow-[0_0_0_3px_rgba(162,62,72,0.12)]'} bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-dark-primary text-sm font-sans outline-none transition-all duration-200 ease-out placeholder:text-text-muted dark:placeholder:text-text-dark-muted`}
                      placeholder="e.g. John Doe"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={100}
                      required autoComplete="name"
                    />
                    {touched.name && errors.name && (
                      <span className="font-medium absolute -bottom-5 left-1 animate-[fadeInUp_0.2s_ease]" style={{ color: 'var(--color-text-danger, #B02618)', fontSize: '13px' }}>{errors.name}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="c-email" className="text-xs font-medium tracking-[0.06em] uppercase text-text-secondary dark:text-text-dark-secondary">Email *</label>
                    <input
                      id="c-email" name="email" type="email"
                      className={`w-full px-5 py-3.5 rounded-xl border ${touched.email && errors.email ? 'border-[#B02618] focus:shadow-[0_0_0_3px_rgba(176,38,24,0.2)]' : 'border-border-light dark:border-border-dark focus:border-brand-red focus:shadow-[0_0_0_3px_rgba(162,62,72,0.12)]'} bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-dark-primary text-sm font-sans outline-none transition-all duration-200 ease-out placeholder:text-text-muted dark:placeholder:text-text-dark-muted`}
                      placeholder="e.g. john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required autoComplete="email"
                    />
                    {touched.email && errors.email && (
                      <span className="font-medium absolute -bottom-5 left-1 animate-[fadeInUp_0.2s_ease]" style={{ color: 'var(--color-text-danger, #B02618)', fontSize: '13px' }}>{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <label htmlFor="c-subject" className="text-xs font-medium tracking-[0.06em] uppercase text-text-secondary dark:text-text-dark-secondary">Subject</label>
                  <input
                    id="c-subject" name="subject" type="text"
                    className="w-full px-5 py-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-dark-primary text-sm font-sans outline-none transition-all duration-200 ease-out placeholder:text-text-muted dark:placeholder:text-text-dark-muted focus:border-brand-red focus:shadow-[0_0_0_3px_rgba(162,62,72,0.12)]"
                    placeholder="e.g. Collaboration or just saying Hi!"
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={200}
                  />
                </div>

                <div className="flex flex-col gap-2 relative mt-2">
                  <label htmlFor="c-message" className="text-xs font-medium tracking-[0.06em] uppercase text-text-secondary dark:text-text-dark-secondary">Message *</label>
                  <textarea
                    id="c-message" name="message"
                    className={`w-full px-5 py-3.5 rounded-xl border ${touched.message && errors.message ? 'border-[#B02618] focus:shadow-[0_0_0_3px_rgba(176,38,24,0.2)]' : 'border-border-light dark:border-border-dark focus:border-brand-red focus:shadow-[0_0_0_3px_rgba(162,62,72,0.12)]'} bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-dark-primary text-sm font-sans outline-none transition-all duration-200 ease-out placeholder:text-text-muted dark:placeholder:text-text-dark-muted resize-y min-h-[140px] leading-[1.6]`}
                    placeholder="Tell me about your project…"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={5000}
                    required
                  />
                  {touched.message && errors.message && (
                    <span className="font-medium absolute -bottom-5 left-1 animate-[fadeInUp_0.2s_ease]" style={{ color: 'var(--color-text-danger, #B02618)', fontSize: '13px' }}>{errors.message}</span>
                  )}
                </div>

                <div className="flex justify-center mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!canSubmit}
                    size="lg"
                  >
                    {loading ? (
                      <>Sending... <span className="inline-block animate-spin">↻</span></>
                    ) : (
                      "Let's Talk"
                    )}
                  </Button>
                </div>
              </form>
            </RevealGroup>
          )}
        </div>
      </section>
    </>
  );
};

export default Contact;
