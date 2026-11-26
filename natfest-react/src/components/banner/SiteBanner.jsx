import React from 'react'
import useBannerActive from '../../hooks/useBannerActive'
import styles from '../../styles/SiteBanner.module.css'

/**
 * Site-wide announcement strip, managed in Sanity under Site Settings → Site Banner.
 * Shows while `enabled` is true, `text` is set, and `endDate` (if given) is in the future.
 */
function SiteBanner({ enabled, text, endDate }) {
  const active = useBannerActive(enabled, endDate)
  if (!active || !text) return null

  return (
    <div className={styles.banner} role="region" aria-label="Site announcement">
      {text}
    </div>
  )
}

export default SiteBanner
