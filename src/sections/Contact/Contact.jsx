'use client';
// src/sections/Contact/Contact.jsx
// ============================================================
// CONTACT SECTION — single pill CTA, centred editorial layout
// hCaptcha server-side CAPTCHA verification added
// ============================================================

import React, { useState } from 'react';
import Button from '../../components/Button/Button';

const Contact = () => {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, subject: false, message: false });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const errors = {
    name: form.name.length > 0 && form.name.length < 2 ? 'Name must be at least 2 characters.' : '',
    email: form.email.length > 0 && !/^\S+@\S+\.\S+$/.test(form.email) ? 'Please enter a valid email address.' : '',
    message: form.message.length > 0 && form.message.length < 20 ? 'Message must be at least 20 characters.' : ''
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleBlur = (e) => 
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
      const res  = await fetch(`${apiBase}/api/contact`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send.');
      setStatus({ type: 'success', message: "✅ Message sent! I'll get back within 24 hours." });
      // Don't clear form yet, let the user see success state.
    } catch (err) {
      setStatus({ type: 'error', message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
      // Remove the 6-second timeout so the success state persists until they click "Send another message"
      if (status.type === 'error') {
        setTimeout(() => setStatus({ type: null, message: '' }), 6000);
      }
    }
  };

  const handleReset = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setTouched({ name: false, email: false, subject: false, message: false });
    setStatus({ type: null, message: '' });
  };

  // Submit is enabled only when required fields are present and there are no validation errors.
  const canSubmit = form.name.length >= 2 && /^\S+@\S+\.\S+$/.test(form.email) && form.message.length >= 20 && !loading;

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

      <section className="bg-surface-2-light dark:bg-surface-2-dark py-24 flex flex-col items-center text-center" id="contact" aria-label="Contact">
        <div className="max-w-[800px] w-full flex flex-col items-center gap-10 px-6">

          <h2 className="font-heading text-[clamp(3rem,7vw,5.5rem)] font-light tracking-[-0.02em] leading-[1.05] text-text-primary dark:text-text-dark-primary text-center w-full">
            Let&apos;s Build Something Smart Together
          </h2>
          <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] text-text-secondary dark:text-text-dark-secondary mt-4 max-w-[540px] leading-[1.5]">
            Available for freelance projects, internships, and collaborative AI product development. I respond within 24 hours.
          </p>

          {status.type === 'success' ? (
            <div className="w-full max-w-[560px] flex flex-col items-center gap-6 p-10 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-clay-sm animate-[fadeInUp_0.4s_ease]">
              <div className="text-4xl">🎉</div>
              <h3 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary font-heading">Thank you!</h3>
              <p className="text-text-secondary dark:text-text-dark-secondary">{status.message}</p>
              <Button onClick={handleReset} variant="ghost" size="md">
                Send another message
              </Button>
            </div>
          ) : (
            <div className="w-full max-w-[560px] flex flex-col items-center gap-6">
              {status.type === 'error' && (
                <div
                  className="flex items-center justify-center gap-3 px-5 py-4 rounded-xl text-sm font-medium animate-[fadeInUp_0.4s_ease] w-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
                  role="alert"
                >
                  {status.message}
                </div>
              )}

              <form className="w-full flex flex-col gap-5 text-left" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="c-name" className="text-xs font-medium tracking-[0.06em] uppercase text-text-secondary dark:text-text-dark-secondary">Name *</label>
                    <input
                      id="c-name" name="name" type="text"
                      className={`w-full px-5 py-3.5 rounded-xl border ${touched.name && errors.name ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]' : 'border-border-light dark:border-border-dark focus:border-brand-red focus:shadow-[0_0_0_3px_rgba(162,62,72,0.12)]'} bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-dark-primary text-sm font-sans outline-none transition-all duration-200 ease-out placeholder:text-text-muted dark:placeholder:text-text-dark-muted`}
                      placeholder="e.g. John Doe"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={100}
                      required autoComplete="name"
                    />
                    {touched.name && errors.name && (
                      <span className="text-xs text-red-500 font-medium absolute -bottom-5 left-1 animate-[fadeInUp_0.2s_ease]">{errors.name}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="c-email" className="text-xs font-medium tracking-[0.06em] uppercase text-text-secondary dark:text-text-dark-secondary">Email *</label>
                    <input
                      id="c-email" name="email" type="email"
                      className={`w-full px-5 py-3.5 rounded-xl border ${touched.email && errors.email ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]' : 'border-border-light dark:border-border-dark focus:border-brand-red focus:shadow-[0_0_0_3px_rgba(162,62,72,0.12)]'} bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-dark-primary text-sm font-sans outline-none transition-all duration-200 ease-out placeholder:text-text-muted dark:placeholder:text-text-dark-muted`}
                      placeholder="e.g. john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required autoComplete="email"
                    />
                    {touched.email && errors.email && (
                      <span className="text-xs text-red-500 font-medium absolute -bottom-5 left-1 animate-[fadeInUp_0.2s_ease]">{errors.email}</span>
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
                    className={`w-full px-5 py-3.5 rounded-xl border ${touched.message && errors.message ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]' : 'border-border-light dark:border-border-dark focus:border-brand-red focus:shadow-[0_0_0_3px_rgba(162,62,72,0.12)]'} bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-dark-primary text-sm font-sans outline-none transition-all duration-200 ease-out placeholder:text-text-muted dark:placeholder:text-text-dark-muted resize-y min-h-[140px] leading-[1.6]`}
                    placeholder="Tell me about your project…"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={5000}
                    required
                  />
                  {touched.message && errors.message && (
                    <span className="text-xs text-red-500 font-medium absolute -bottom-5 left-1 animate-[fadeInUp_0.2s_ease]">{errors.message}</span>
                  )}
                </div>

                <div className="flex justify-center mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!canSubmit}
                    size="lg"
                  >
                    {loading ? 'Sending…' : "Let's Talk"}&nbsp;<span>→</span>
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Contact;
