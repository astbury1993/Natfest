import React from 'react'
import styles from '../styles/PrivacyPolicyPage.module.css'

function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Privacy Policy</h1>
      <p className={styles.lastUpdated}>Last updated: 24/09/2025</p>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>No Personal Data Collection</h2>
          <p>
            This website does not collect, store, or process any personal data from
            its visitors. We do not use contact forms, user accounts, or any other
            mechanism that would require you to provide personal information.
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
            posted on this page with an updated revision date. We encourage you to
            review this policy periodically.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us
            via our social media channels on{' '}
            <a
              href="https://www.instagram.com/Natfest2026"
              className={styles.contactLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{' '}
            or{' '}
            <a
              href="https://www.facebook.com/groups/936096755035843"
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
