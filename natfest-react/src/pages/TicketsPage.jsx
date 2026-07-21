import styles from '../styles/TicketsPage.module.css'

function TicketsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Natfest ticket sales announcement! 🎫</h1>

      <div className={styles.card}>
        <p className={styles.announcement}>
          On sale Saturday 27th September for Natfest 2026
        </p>

        <div className={styles.details}>
          <p><strong>Date:</strong> 27/06/26</p>
          <p><strong>Time:</strong> 11:00 &ndash; 23:30</p>
          <p><strong>Location:</strong> Sileby, Leicestershire</p>
        </div>

        <div className={styles.includes}>
          <h2>What&apos;s Included</h2>
          <ul className={styles.includesList}>
            <li>Live music</li>
            <li>Food vendors</li>
            <li>Licensed bar</li>
            <li>Raffle</li>
            <li>Face painting</li>
            <li>Bouncy castles</li>
            <li>Competitions</li>
          </ul>
        </div>

        <div className={styles.pricing}>
          <h2>Pricing</h2>
          <ul className={styles.priceList}>
            <li>
              <span className={styles.priceLabel}>Adults</span>
              <span className={styles.priceValue}>£30</span>
            </li>
            <li>
              <span className={styles.priceLabel}>Children (5&ndash;16)</span>
              <span className={styles.priceValue}>£15</span>
            </li>
            <li>
              <span className={styles.priceLabel}>Under 5s</span>
              <span className={styles.priceValue}>FREE</span>
            </li>
          </ul>
        </div>

        <div className={styles.social}>
          <h2>Follow Us</h2>
          <div className={styles.socialLinks}>
            <a
              href="https://www.instagram.com/Natfest2026"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/groups/936096755035843"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>

        <p className={styles.notice}>
          This is an invite-only event. No tickets available on the gate.
        </p>
      </div>
    </div>
  )
}

export default TicketsPage
