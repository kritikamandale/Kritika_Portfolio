'use client';
// src/sections/Contact/Contact.jsx
// ============================================================
// CONTACT SECTION — single pill CTA, centred editorial layout
// ============================================================

import React, { useState } from 'react';
import Button from '../../components/Button/Button';

const Contact = () => {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: `❌ ${err.message}` });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: null, message: '' }), 6000);
    }
  };

  const canSubmit = form.name && form.email && form.message && !loading;

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
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

          <form className="w-full max-w-[560px] flex flex-col gap-5 text-left" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="c-name" className="text-xs font-medium tracking-[0.06em] uppercase text-text-secondary dark:text-text-dark-secondary">Name *</label>
                <input
                  id="c-name" name="name" type="text"
                  className="w-full px-5 py-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-dark-primary text-sm font-sans outline-none transition-all duration-200 ease-out placeholder:text-text-muted dark:placeholder:text-text-dark-muted focus:border-brand-red focus:shadow-[0_0_0_3px_rgba(162,62,72,0.12)]"
                  placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required autoComplete="name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="c-email" className="text-xs font-medium tracking-[0.06em] uppercase text-text-secondary dark:text-text-dark-secondary">Email *</label>
                <input
                  id="c-email" name="email" type="email"
                  className="w-full px-5 py-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-dark-primary text-sm font-sans outline-none transition-all duration-200 ease-out placeholder:text-text-muted dark:placeholder:text-text-dark-muted focus:border-brand-red focus:shadow-[0_0_0_3px_rgba(162,62,72,0.12)]"
                  placeholder="e.g. john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required autoComplete="email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="c-subject" className="text-xs font-medium tracking-[0.06em] uppercase text-text-secondary dark:text-text-dark-secondary">Subject</label>
              <input
                id="c-subject" name="subject" type="text"
                className="w-full px-5 py-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-dark-primary text-sm font-sans outline-none transition-all duration-200 ease-out placeholder:text-text-muted dark:placeholder:text-text-dark-muted focus:border-brand-red focus:shadow-[0_0_0_3px_rgba(162,62,72,0.12)]"
                placeholder="e.g. Collaboration or just saying Hi!"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="c-message" className="text-xs font-medium tracking-[0.06em] uppercase text-text-secondary dark:text-text-dark-secondary">Message *</label>
              <textarea
                id="c-message" name="message"
                className="w-full px-5 py-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary dark:text-text-dark-primary text-sm font-sans outline-none transition-all duration-200 ease-out placeholder:text-text-muted dark:placeholder:text-text-dark-muted focus:border-brand-red focus:shadow-[0_0_0_3px_rgba(162,62,72,0.12)] resize-y min-h-[140px] leading-[1.6]"
                placeholder="Tell me about your project…"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-center mt-2">
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

          {status.type && (
            <div
              className={`flex items-center justify-center gap-3 px-5 py-4 rounded-xl text-sm font-medium animate-[fadeInUp_0.4s_ease] w-full max-w-[560px] ${status.type === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400' : 'bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400'}`}
              role="alert"
            >
              {status.message}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Contact;
