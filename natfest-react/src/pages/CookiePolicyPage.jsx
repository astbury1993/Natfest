import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../styles/CookiePolicyPage.module.css'

const COOKIE_NAME = 'natfest_cookie_preference'
const MAX_AGE_SECONDS = 365 * 24 * 60 * 60 // 12 months (approx)

function getCookiePreference() {
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + COOKIE_NAME + '=([^;]*)')
  )
  return match ? decodeURIComponent(match[1]) : null
}

function setCookiePreference(value) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; max-age=${MAX_AGE_SECONDS}; path=/; SameSite=Lax`
}

function CookiePolicyPage() {
  const [preference, setPreference] = useState(null)
  const [confirmationMessage, setConfirmationMessage] = useState('')

  useEffect(() => {
    setPreference(getCookiePreference())
  }, [])

  function handleAccept() {
    setCookiePreference('accepted')
    setPreference('accepted')
    setConfirmationMessage('Your preference has been saved. Analytics cookies are now enabled.')
  }

  function handleReject() {
    setCookiePreference('rejected')
    setPreference('rejected')
    setConfirmationMessage('Your preference has been saved. Analytics cookies are now disabled.')
  }

  function getPreferenceLabel() {
    if (preference === 'accepted') return 'Accepted'
    if (preference === 'rejected') return 'Rejected'
    return 'Not set'
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Cookie Policy</h1>
      <p className={styles.lastUpdated}>Last updated: 24/09/2025</p>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>What Cookies We Use</h2>
          <p>
            We use cookies on this website to help us understand how visitors
            interact with our site. This information helps us improve the experience
            for everyone.
          </p>
          <table className={styles.cookieTable}>
            <thead>
              <tr>
                <th scope="col">Cookie</th>
                <th scope="col">Purpose</th>
                <th scope="col">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>natfest_cookie_preference</td>
                <td>Stores your cookie consent choice</td>
                <td>12 months</td>
              </tr>
              <tr>
                <td>_ga, _ga_*</td>
                <td>Google Analytics &ndash; understanding visitor behaviour</td>
                <td>Up to 2 years</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Their Purpose</h2>
          <p>
            Analytics cookies (provided by Google Analytics) help us understand how
            visitors use the site, which pages are most popular, and where people
            spend the most time. This data is anonymous and helps us make decisions
            about improving the website for future festivals.
          </p>
          <p>
            The preference cookie simply remembers whether you have accepted or
            rejected analytics cookies, so you are not asked again on every visit.
            This cookie expires after 12 months.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>How to Change Your Preference</h2>
          <p>
            You can change your cookie preference at any time using the buttons
            below. If you reject cookies, any existing analytics cookies will be
            removed and no further data will be collected.
          </p>
        </section>
      </div>

      <div className={styles.preferenceSection}>
        <h2 className={styles.preferenceHeading}>Your Cookie Preference</h2>
        <p className={styles.currentPreference}>
          Current preference:{' '}
          <span className={styles.preferenceStatus}>{getPreferenceLabel()}</span>
        </p>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.acceptButton}
            onClick={handleAccept}
            aria-label="Accept analytics cookies"
          >
            Accept
          </button>
          <button
            type="button"
            className={styles.rejectButton}
            onClick={handleReject}
            aria-label="Reject analytics cookies"
          >
            Reject
          </button>
        </div>
        {confirmationMessage && (
          <p className={styles.confirmationMessage} role="status" aria-live="polite">
            {confirmationMessage}
          </p>
        )}
      </div>
    </div>
  )
}

export default CookiePolicyPage
