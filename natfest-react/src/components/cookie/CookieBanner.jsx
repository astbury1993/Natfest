import { useCookieConsent } from '../../context/CookieConsentContext'
import styles from '../../styles/CookieBanner.module.css'

/**
 * Cookie consent banner.
 *
 * Visible only when consent is "unset" (visitor has not made a choice).
 * Provides two equally-prominent buttons: "Accept" and "Reject".
 * No pre-ticked options, no auto-dismiss behaviour.
 *
 * Satisfies: Requirements 9.1, 9.2, 9.9, 9.10
 */
function CookieBanner() {
  const { consent, accept, reject } = useCookieConsent()

  if (consent !== 'unset') {
    return null
  }

  return (
    <aside
      className={styles.banner}
      role="region"
      aria-label="Cookie consent"
    >
      <div className={styles.content}>
        <h2 className={styles.heading}>Cookie preferences</h2>
        <p className={styles.description}>
          This site uses cookies for analytics to help us understand how visitors
          interact with our content. No personal data is sold or shared with
          third parties. You can accept or reject non-essential cookies below.
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.buttonAccept}
            onClick={accept}
          >
            Accept
          </button>
          <button
            type="button"
            className={styles.buttonReject}
            onClick={reject}
          >
            Reject
          </button>
        </div>
      </div>
    </aside>
  )
}

export default CookieBanner
