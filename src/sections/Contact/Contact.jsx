// src/sections/Contact/Contact.jsx
// ============================================================
// CONTACT SECTION
// ============================================================

import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import styles from './Contact.module.css';

const getContactEndpoint = () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
  if (apiBaseUrl) return `${apiBaseUrl}/api/contact`;
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
      if (!response.ok) throw new Error(data.error || 'Failed to send message.');

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
    <section className={styles.contactSection} id="contact">
      <div className={`${styles.container} reveal`}>
        <h2 className={styles.mainHeading}>Got a project?<br />Let's talk.</h2>
        <p className={styles.subtext}>Drop me a message and I'll respond within 24 hours.</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="contact-name" className={styles.label}>Name *</label>
              <input id="contact-name" name="name" type="text" className={styles.input} placeholder="e.g. John Doe" value={form.name} onChange={handleChange} required autoComplete="name" />
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-email" className={styles.label}>Email *</label>
              <input id="contact-email" name="email" type="email" className={styles.input} placeholder="e.g. john@example.com" value={form.email} onChange={handleChange} required autoComplete="email" />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-subject" className={styles.label}>Subject</label>
            <input id="contact-subject" name="subject" type="text" className={styles.input} placeholder="e.g. Collaboration or just saying Hi!" value={form.subject} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-message" className={styles.label}>Message *</label>
            <textarea id="contact-message" name="message" className={styles.textarea} placeholder="Tell me about your project..." value={form.message} onChange={handleChange} required />
          </div>
          <div className={styles.submitRow}>
            <Button type="submit" variant="primary" size="lg" disabled={!form.name || !form.email || !form.message || loading}>
              {loading ? 'Sending...' : 'Send Message ✦'}
            </Button>
          </div>
        </form>

        {status.type && (
          <div className={status.type === 'error' ? styles.errorMsg : styles.successMsg} role="alert">
            {status.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
