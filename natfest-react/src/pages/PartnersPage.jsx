import styles from '../styles/PartnersPage.module.css'

function PartnersPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Our Partners</h1>
      <p className={styles.intro}>
        Natfest would not be possible without the generous support of our partners.
      </p>

      <div className={styles.partnerList}>
        <article className={styles.partnerCard}>
          <img
            src="/images/LOROS_Event.png"
            alt="LOROS Hospice logo"
            className={styles.partnerLogo}
            loading="lazy"
          />
          <div className={styles.partnerInfo}>
            <h2 className={styles.partnerName}>LOROS Hospice</h2>
            <p className={styles.partnerDescription}>
              LOROS is a local charity providing compassionate care for over 2,500
              people each year living with terminal illness in Leicester,
              Leicestershire, and Rutland. All proceeds from Natfest go to supporting
              their incredible work.
            </p>
            <a
              href="https://www.loros.co.uk/"
              className={styles.partnerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit LOROS website
            </a>
          </div>
        </article>

        <article className={styles.partnerCard}>
          <img
            src="/images/Alpha.png"
            alt="Alpha Power Cleaners logo"
            className={styles.partnerLogo}
            loading="lazy"
          />
          <div className={styles.partnerInfo}>
            <h2 className={styles.partnerName}>Alpha Power Cleaners</h2>
            <p className={styles.partnerDescription}>
              Alpha Power Cleaners are our proud sponsor and host. They generously
              provide the land for the festival, making the whole event possible.
            </p>
            <a
              href="https://www.alphapowercleaners.co.uk/"
              className={styles.partnerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Alpha Power Cleaners website
            </a>
          </div>
        </article>
      </div>
    </div>
  )
}

export default PartnersPage
