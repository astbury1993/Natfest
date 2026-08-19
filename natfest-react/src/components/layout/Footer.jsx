import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav aria-label="Footer navigation" className={styles.nav}>
          <ul className={styles.linkList}>
            <li>
              <Link to="/privacy" className={styles.link}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/cookies" className={styles.link}>
                Cookie Policy
              </Link>
            </li>
            <li>
              <a
                href="https://www.instagram.com/Natfestuk"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61593031510256"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Facebook
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.charity}>
          <a
            href="https://www.loros.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.lorosLink}
          >
            <img
              src="/loros-logo.jpg"
              alt="LOROS Hospice - the charity we raise money for"
              className={styles.lorosLogo}
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
