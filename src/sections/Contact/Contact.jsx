// src/sections/Contact/Contact.jsx
// ============================================================
// CONTACT SECTION
// Soft UI form with neumorphic inset inputs, availability
// indicator, and social links sidebar.
// ── Edit: email, socials, availability text below ──────────
// ============================================================

import React, { useState } from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import Button from '../../components/Button/Button';
import styles from './Contact.module.css';

// ── Edit your contact info ──────────────────────────────────
const CONTACT_INFO = [
  { icon: '📧', label: 'kritikamandale@gmail.com' },
  { icon: '📍', label: 'Nagpur, Maharashtra' },
  { icon: '⏰', label: 'Response within 24h' },
];

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const HuggingFaceIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624"/>
  </svg>
);

const SOCIALS = [
  { icon: <LinkedInIcon />,    label: 'LinkedIn',     href: 'https://www.linkedin.com/in/kritikamandale' },
  { icon: <GitHubIcon />,      label: 'GitHub',       href: 'https://github.com/kritikamandale' },
  { icon: <HuggingFaceIcon />, label: 'Hugging Face', href: 'https://huggingface.co/Critika' },
  { icon: <XIcon />,           label: 'Twitter',      href: 'https://x.com/KritikaMandale' },
];

const getContactEndpoint = () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

  if (apiBaseUrl) {
    return `${apiBaseUrl}/api/contact`;
  }

  return '/api/contact';
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch(getContactEndpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus({ type: 'success', message: "✅ Message sent! I'll get back to you within 24 hours." });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ type: 'error', message: `❌ Error: ${error.message}` });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: null, message: '' }), 6000);
    }
  };

  return (
    <SectionWrapper
      id="contact"
      label="Get in Touch"
      title="Let's Work Together"
      subtitle="Have a project in mind? I'd love to hear about it. Drop me a message and I'll respond within 24 hours."
    >
      <div className={styles.grid}>

        {/* ── Form card ── */}
        <div className={`${styles.formCard} reveal`}>
          <div className={styles.availabilityHeader}>
            <div className={styles.availDotSmall} aria-hidden="true" />
            <span>Available for work</span>
          </div>
          <h3 className={styles.formTitle}>
            Got a project?<br />
            Let's talk.
          </h3>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* Name + Email row */}
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="contact-name" className={styles.label}>Name *</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className={styles.input}
                  placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-email" className={styles.label}>Email *</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder="e.g. john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Subject */}
            <div className={styles.field}>
              <label htmlFor="contact-subject" className={styles.label}>Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                className={styles.input}
                placeholder="e.g. Collaboration, Project Inquiry, or just saying Hi!"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            {/* Message */}
            <div className={styles.field}>
              <label htmlFor="contact-message" className={styles.label}>Message *</label>
              <textarea
                id="contact-message"
                name="message"
                className={styles.textarea}
                placeholder="Tell me about your project, what you're working on, or just say hi!"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit row */}
            <div className={styles.submitRow}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={!form.name || !form.email || !form.message || loading}
              >
                {loading ? 'Sending...' : 'Send Message ✦'}
              </Button>
            </div>
          </form>

          {/* Status message */}
          {status.type && (
            <div className={status.type === 'error' ? styles.errorMsg : styles.successMsg} role="alert">
              {status.message}
            </div>
          )}
        </div>

        {/* ── Social Links ── */}
        <div className={`${styles.socialCard} reveal reveal-delay-2`}>
            <h4>Follow Me</h4>
            <div className={styles.socialGrid}>
              {SOCIALS.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </a>
              ))}
            </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
