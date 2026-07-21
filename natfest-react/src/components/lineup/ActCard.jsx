import React from 'react'
import { useState } from 'react'
import styles from '../../styles/ActCard.module.css'

const TRUNCATE_LENGTH = 150

function ActCard({ act, isHeadliner = false }) {
  const { name, description, imageUrl, links } = act
  const [expanded, setExpanded] = useState(false)

  const needsTruncation = description && description.length > TRUNCATE_LENGTH
  const displayDescription = expanded || !needsTruncation
    ? description
    : `${description.slice(0, TRUNCATE_LENGTH)}...`

  // Limit links to 5
  const displayLinks = links ? links.slice(0, 5) : []

  return (
    <article className={`${styles.card} ${isHeadliner ? styles.headliner : ''}`}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder} aria-label={`No image available for ${name}`}>
            <span className={styles.placeholderIcon} aria-hidden="true">♪</span>
            <span className={styles.placeholderText}>No image available</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        {displayDescription && (
          <p className={styles.description}>{displayDescription}</p>
        )}
        {needsTruncation && (
          <button
            className={styles.readMore}
            onClick={() => setExpanded(!expanded)}
            type="button"
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
        {displayLinks.length > 0 && (
          <ul className={styles.links} aria-label={`Links for ${name}`}>
            {displayLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {getLinkLabel(link)}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

/**
 * Derive a human-readable label from a URL.
 */
function getLinkLabel(url) {
  try {
    const hostname = new URL(url).hostname.replace('www.', '')
    if (hostname.includes('facebook')) return 'Facebook'
    if (hostname.includes('instagram')) return 'Instagram'
    if (hostname.includes('twitter') || hostname.includes('x.com')) return 'X / Twitter'
    if (hostname.includes('spotify')) return 'Spotify'
    if (hostname.includes('youtube')) return 'YouTube'
    if (hostname.includes('soundcloud')) return 'SoundCloud'
    if (hostname.includes('bandcamp')) return 'Bandcamp'
    return hostname
  } catch {
    return 'Link'
  }
}

export default ActCard
