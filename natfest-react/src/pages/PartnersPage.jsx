import React from 'react'
import useSanityQuery from '../hooks/useSanityQuery'
import styles from '../styles/PartnersPage.module.css'

const PARTNERS_QUERY = `*[_type == "partner"] | order(displayOrder asc) {
  _id,
  name,
  description,
  "logoUrl": logo.asset->url,
  logoAlt,
  websiteUrl,
  linkText
}`

function PartnersPage() {
  const { data, loading, error } = useSanityQuery(PARTNERS_QUERY)

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.heading}>Our Partners</h1>
        <p className={styles.loadingText}>Loading partners...</p>
      </div>
    )
  }

  // Fallback to static content if CMS has no data
  const partners = data && data.length > 0 ? data : [
    {
      _id: 'fallback-loros',
      name: 'LOROS Hospice',
      description: 'LOROS is a local charity providing compassionate care for over 2,500 people each year living with terminal illness in Leicester, Leicestershire, and Rutland. All proceeds from Natfest go to supporting their incredible work.',
      logoUrl: '/images/LOROS_Event.png',
      logoAlt: 'LOROS Hospice logo',
      websiteUrl: 'https://www.loros.co.uk/',
      linkText: 'Visit LOROS website',
    },
    {
      _id: 'fallback-alpha',
      name: 'Alpha Power Cleaners',
      description: 'Alpha Power Cleaners are our proud sponsor and host. They generously provide the land for the festival, making the whole event possible.',
      logoUrl: '/images/Alpha.png',
      logoAlt: 'Alpha Power Cleaners logo',
      websiteUrl: 'https://www.alphapowercleaners.co.uk/',
      linkText: 'Visit Alpha Power Cleaners website',
    },
  ]

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Our Partners</h1>
      <p className={styles.intro}>
        Natfest would not be possible without the generous support of our partners.
      </p>

      <div className={styles.partnerList}>
        {partners.map((partner) => (
          <article key={partner._id} className={styles.partnerCard}>
            {partner.logoUrl && (
              <img
                src={partner.logoUrl}
                alt={partner.logoAlt || `${partner.name} logo`}
                className={styles.partnerLogo}
                loading="lazy"
              />
            )}
            <div className={styles.partnerInfo}>
              <h2 className={styles.partnerName}>{partner.name}</h2>
              {partner.description && (
                <p className={styles.partnerDescription}>{partner.description}</p>
              )}
              {partner.websiteUrl && (
                <a
                  href={partner.websiteUrl}
                  className={styles.partnerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {partner.linkText || `Visit ${partner.name} website`}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default PartnersPage
