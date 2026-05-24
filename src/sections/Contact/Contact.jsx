'use client';
// src/sections/Contact/Contact.jsx
// ============================================================
// CONTACT SECTION — single pill CTA, centred editorial layout
// ============================================================

import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import styles from './Contact.module.css';

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
    <section className={styles.contactSection} id="contact" aria-label="Contact">
      <div className={styles.container}>

        <h2 className={styles.mainHeading}>
          Got a project?<br />Let's talk.
        </h2>
        <p className={styles.subtext}>
          Drop me a message and I'll get back to you within 24 hours.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="c-name"  className={styles.label}>Name *</label>
              <input
                id="c-name" name="name" type="text"
                className={styles.input}
                placeholder="e.g. John Doe"
                value={form.name}
                onChange={handleChange}
                required autoComplete="name"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="c-email" className={styles.label}>Email *</label>
              <input
                id="c-email" name="email" type="email"
                className={styles.input}
                placeholder="e.g. john@example.com"
                value={form.email}
                onChange={handleChange}
                required autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="c-subject" className={styles.label}>Subject</label>
            <input
              id="c-subject" name="subject" type="text"
              className={styles.input}
              placeholder="e.g. Collaboration or just saying Hi!"
              value={form.subject}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="c-message" className={styles.label}>Message *</label>
            <textarea
              id="c-message" name="message"
              className={styles.textarea}
              placeholder="Tell me about your project…"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.submitRow}>
            <Button
              type="submit"
              variant="primary"
              disabled={!canSubmit}
            >
              {loading ? 'Sending…' : "Let's Talk"}&nbsp;<span>→</span>
            </Button>
          </div>
        </form>

        {status.type && (
          <div
            className={status.type === 'error' ? styles.errorMsg : styles.successMsg}
            role="alert"
          >
            {status.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
