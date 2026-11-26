import React from 'react'
import { Link } from 'react-router-dom'
import useBannerActive from '../../hooks/useBannerActive'
import styles from '../../styles/PromoCard.module.css'

/**
 * Homepage promo card, managed in Sanity under Site Settings → Site Banner.
 * Shares "Show banner" and "Show until" with the site-wide SiteBanner, so both
 * appear and disappear together. Renders nothing without a heading.
 */
function PromoCard({ enabled, endDate, eyebrow, heading, text, buttonLabel, buttonLink }) {
  const active = useBannerActive(enabled, endDate)
  if (!active || !heading) return null

  const label = buttonLabel || 'Get my tickets'
  const isInternal = (link) => typeof link === 'string' && link.startsWith('/') && !link.startsWith('//')
  const isExternal = (link) => typeof link === 'string' && /^https?:\/\//i.test(link)
  // Only allow site paths or http(s) URLs from the CMS; anything else falls back to /tickets
  const href = isInternal(buttonLink) || isExternal(buttonLink) ? buttonLink : '/tickets'

  return (
    <section className={styles.card} aria-labelledby="promo-card-heading">
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id="promo-card-heading" className={styles.heading}>{heading}</h2>
      {text && <p className={styles.text}>{text}</p>}
      {isInternal(href) ? (
        <Link to={href} className={styles.button}>{label}</Link>
      ) : (
        <a href={href} className={styles.button} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      )}
    </section>
  )
}

export default PromoCard
