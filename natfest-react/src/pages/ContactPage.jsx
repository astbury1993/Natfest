import React, { useState } from 'react'
import styles from '../styles/ContactPage.module.css'

const FORMSPREE_URL = 'https://formspree.io/f/mnpalzbb'

function ContactPage() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.target
    const data = new FormData(form)

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.page}>
        <h1 className={styles.heading}>Contact Us</h1>
        <div className={styles.successCard}>
          <h2 className={styles.successHeading}>Message sent!</h2>
          <p className={styles.successText}>
            Thanks for getting in touch. We'll get back to you as soon as we can.
          </p>
          <button
            className={styles.resetButton}
            onClick={() => setStatus('idle')}
            type="button"
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Contact Us</h1>
      <p className={styles.intro}>
        Got a question about Natfest? Drop us a message and we'll get back to you.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="message" className={styles.label}>Message</label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            rows="6"
            required
          />
        </div>

        {status === 'error' && (
          <p className={styles.errorMessage} role="alert">
            Something went wrong. Please try again.
          </p>
        )}

        <p className={styles.privacyNotice}>
          By submitting this form, you agree to us using your name and email to
          respond to your enquiry. See our{' '}
          <a href="/privacy" className={styles.privacyLink}>Privacy Policy</a>{' '}
          for details.
        </p>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}

export default ContactPage
