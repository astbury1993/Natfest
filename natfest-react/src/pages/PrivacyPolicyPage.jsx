import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/PrivacyPolicyPage.module.css'

function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Privacy Policy</h1>
      <p className={styles.lastUpdated}>Last updated: 21/07/2026</p>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>What Data We Collect</h2>
          <p>
            This website does not require you to create an account or log in.
            The only personal data we collect is information you voluntarily
            provide through our{' '}
            <Link to="/contact" className={styles.contactLink}>
              contact form
            </Link>
            : your name, email address, and message content.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>How We Use Your Data</h2>
          <p>
            Information submitted through the contact form is used solely to
            respond to your enquiry. Your data is sent to our form provider
            (Formspree) and forwarded to us via email. We do not sell, share,
            or use your personal data for marketing purposes.
          </p>
          <p>
            Contact form submissions are retained only for as long as needed to
            respond to your enquiry and are not added to any mailing list.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Cookies</h2>
          <p>
            This website uses analytics cookies only when you have given your
            explicit consent via our cookie banner. If you have not accepted cookies,
            no non-essential cookies are placed on your device. A preference cookie
            is stored to remember your choice for up to 12 months.
          </p>
          <p>
            For full details of cookies used, see our{' '}
            <Link to="/cookies" className={styles.contactLink}>
              Cookie Policy
            </Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Your Rights</h2>
          <p>
            Under UK GDPR, you have the right to request access to, correction of,
            or deletion of any personal data we hold about you. To exercise these
            rights, please contact us using the details below.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>External Links</h2>
          <p>
            This website contains links to external sites such as social media
            platforms and partner organisations. We are not responsible for the
            privacy practices or content of these external sites. We encourage you
            to read the privacy policies of any external site you visit.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be
            posted on this page with an updated revision date.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Contact</h2>
          <p>
            If you have any questions about this Privacy Policy or wish to
            exercise your data rights, please{' '}
            <Link to="/contact" className={styles.contactLink}>
              get in touch
            </Link>{' '}
            or contact us via{' '}
            <a
              href="https://www.instagram.com/Natfestuk"
              className={styles.contactLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{' '}
            or{' '}
            <a
              href="https://www.facebook.com/profile.php?id=61593031510256"
              className={styles.contactLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>.
          </p>
        </section>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
