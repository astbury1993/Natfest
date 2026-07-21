import { Link } from 'react-router-dom'
import useSanityQuery from '../hooks/useSanityQuery'
import styles from '../styles/HomePage.module.css'

const HOME_QUERY = `*[_type == "homePage"][0]{
  heroHeading,
  heroSubtext,
  "heroImageUrl": heroImage.asset->url,
  heroImageAlt,
  storyHeading,
  storyContent,
  galleryCta,
  historyHeading,
  historyText,
  "historyImageUrl": historyImage.asset->url,
  historyImageAlt
}`

/**
 * Renders Sanity block content as paragraphs.
 */
function renderBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return null
  return blocks.map((block, index) => {
    if (block._type === 'block' && block.children) {
      const text = block.children.map((child) => child.text || '').join('')
      return <p key={block._key || index} className={styles.storyParagraph}>{text}</p>
    }
    return null
  })
}

function HomePage() {
  const { data, loading } = useSanityQuery(HOME_QUERY)

  // Show loading state briefly, then render with CMS data or fallbacks
  if (loading) {
    return (
      <div className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.loadingText}>Loading...</p>
        </section>
      </div>
    )
  }

  const heroHeading = data?.heroHeading || 'Natfest 2026 is coming!'
  const heroImageUrl = data?.heroImageUrl || '/images/Natfest-Drone.jpg'
  const heroImageAlt = data?.heroImageAlt || 'Aerial drone view of the Natfest festival site'
  const storyHeading = data?.storyHeading || 'The Reason Behind Natfest, by Kellen'
  const galleryCta = data?.galleryCta || 'Check out what happened last year!'
  const historyHeading = data?.historyHeading || 'Our History'
  const historyText = data?.historyText || 'Founded in 2024, we successfully delivered our first Natfest in July 2025. With your support we were able to raise a whopping £12,068.34 for LOROS!'
  const historyImageUrl = data?.historyImageUrl || '/images/Loros-donation.jpg'
  const historyImageAlt = data?.historyImageAlt || 'Natfest team presenting a donation cheque to LOROS charity'

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h2 className={styles.heroHeading}>{heroHeading}</h2>
        {data?.heroSubtext ? (
          renderBlocks(data.heroSubtext)
        ) : (
          <>
            <p className={styles.heroSubtext}>
              Back for its second year, Natfest returns for 2026!
            </p>
            <p className={styles.heroSubtext}>
              Join us on Saturday 27th June 2026 for a day of incredible music,
              food, and fun at Natfest, a charity music festival in memory of
              Natalie Leader, raising funds for LOROS.
            </p>
          </>
        )}
        <div className={styles.heroImageWrapper}>
          <img
            src={heroImageUrl}
            alt={heroImageAlt}
            className={styles.heroImage}
          />
        </div>
      </section>

      {/* The Reason Behind Natfest */}
      <section className={styles.storySection}>
        <h2 className={styles.sectionHeading}>{storyHeading}</h2>
        {data?.storyContent ? (
          renderBlocks(data.storyContent)
        ) : (
          <>
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
          </>
        )}
        <p className={styles.storyEmoji} aria-hidden="true">
          ❤️💛🩷💚🧡💙🩵
        </p>
      </section>

      {/* Gallery CTA */}
      <section className={styles.galleryCta}>
        <h2 className={styles.sectionHeading}>{galleryCta}</h2>
        <Link to="/gallery" className={styles.galleryLink}>
          View our Gallery
        </Link>
      </section>

      {/* Our History */}
      <section className={styles.historySection}>
        <h2 className={styles.sectionHeading}>{historyHeading}</h2>
        <p className={styles.historyText}>{historyText}</p>
        <div className={styles.donationImageWrapper}>
          <img
            src={historyImageUrl}
            alt={historyImageAlt}
            className={styles.donationImage}
            loading="lazy"
          />
        </div>
      </section>
    </div>
  )
}

export default HomePage
