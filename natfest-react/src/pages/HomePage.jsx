import { Link } from 'react-router-dom'
import styles from '../styles/HomePage.module.css'

function HomePage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h2 className={styles.heroHeading}>Natfest 2026 is coming!</h2>
        <p className={styles.heroSubtext}>
          Back for its second year, Natfest returns for 2026!
        </p>
        <p className={styles.heroSubtext}>
          Join us on Saturday 27th June 2026 for a day of incredible music,
          food, and fun at Natfest, a charity music festival in memory of
          Natalie Leader, raising funds for LOROS.
        </p>
        <div className={styles.heroImageWrapper}>
          <img
            src="/images/Natfest-Drone.jpg"
            alt="Aerial drone view of the Natfest festival site"
            className={styles.heroImage}
          />
        </div>
      </section>

      {/* The Reason Behind Natfest */}
      <section className={styles.storySection}>
        <h2 className={styles.sectionHeading}>
          The Reason Behind Natfest, by Kellen
        </h2>
        <p className={styles.storyParagraph}>
          In 2023, our Mum, Natalie, sadly passed away at LOROS after battling
          lung cancer. The day before her 60th birthday. This was the most
          horrendous day of mine, my sisters (Gemma &amp; Charlotte) and my
          dad&apos;s life.
        </p>
        <p className={styles.storyParagraph}>
          Our only comfort is knowing how well she was cared for in those last
          few days. The team at LOROS were nothing short of incredible.
          Completely attentive to her needs and they went above and beyond to
          care for not only her, but all of us too.
        </p>
        <p className={styles.storyParagraph}>
          I think mum would think we&apos;ve lost our marbles arranging a
          festival in her honour, but her passion was music, having been to many
          festivals herself and being a huge lover of bands in general.
        </p>
        <p className={styles.storyParagraph}>
          Natfest honours not only mum, but everyone who has been under the care
          of LOROS and I&apos;m sure many of you will have had friends and family
          need them.
        </p>
        <p className={styles.storyParagraph}>
          We really hope that by raising money we can make a real difference to
          families that unfortunately need the help of LOROS in the future.
        </p>
        <p className={styles.storyEmoji} aria-hidden="true">
          ❤️💛🩷💚🧡💙🩵
        </p>
      </section>

      {/* Gallery CTA */}
      <section className={styles.galleryCta}>
        <h2 className={styles.sectionHeading}>
          Check out what happened last year!
        </h2>
        <Link to="/gallery" className={styles.galleryLink}>
          View our Gallery
        </Link>
      </section>

      {/* Our History */}
      <section className={styles.historySection}>
        <h2 className={styles.sectionHeading}>Our History</h2>
        <p className={styles.historyText}>
          Founded in 2024, we successfully delivered our first Natfest in July
          2025. With your support we were able to raise a whopping £12,068.34 for
          LOROS!
        </p>
        <div className={styles.donationImageWrapper}>
          <img
            src="/images/Loros-donation.jpg"
            alt="Natfest team presenting a donation cheque to LOROS charity"
            className={styles.donationImage}
            loading="lazy"
          />
        </div>
      </section>
    </div>
  )
}

export default HomePage
