import React from 'react'
import { useState } from 'react'
import useSanityQuery from '../../hooks/useSanityQuery'
import styles from '../../styles/LineupBanner.module.css'

const ACTS_QUERY = '*[_type == "act" && year == 2026]{name}'

/**
 * Scrolling lineup banner that displays act names in a continuous loop.
 * Sources act names from Sanity CMS, falls back to an optional `acts` prop.
 *
 * Accessibility:
 * - role="region" with descriptive aria-label
 * - Duplicated content marked aria-hidden="true"
 * - Pauses on hover and focus-within (CSS)
 * - Visible pause button for keyboard/pointer users (requirement 5.10)
 * - Respects prefers-reduced-motion (static display via CSS)
 */
function LineupBanner({ acts: fallbackActs }) {
  const { data } = useSanityQuery(ACTS_QUERY)
  const [isPaused, setIsPaused] = useState(false)

  // Derive act names: CMS data > fallback prop > empty
  const actNames = data?.length
    ? data.map((act) => act.name)
    : fallbackActs?.length
      ? fallbackActs
      : null

  // Don't render if no acts are available
  if (!actNames || actNames.length === 0) {
    return null
  }

  const bannerClasses = [
    styles.banner,
    isPaused ? styles.paused : '',
  ]
    .filter(Boolean)
    .join(' ')

  function renderActList(hidden = false) {
    return (
      <span className={styles.actList} aria-hidden={hidden || undefined}>
        {actNames.map((name, index) => (
          <span key={`${name}-${index}`}>
            <span className={styles.actName}>{name}</span>
            {index < actNames.length - 1 && (
              <span className={styles.separator} aria-hidden="true">
                {' '}
                ★{' '}
              </span>
            )}
          </span>
        ))}
        {/* Trailing separator to connect with the duplicate */}
        <span className={styles.separator} aria-hidden="true">
          {' '}
          ★{' '}
        </span>
      </span>
    )
  }

  return (
    <div
      className={bannerClasses}
      role="region"
      aria-label="Scrolling lineup announcement"
    >
      <div className={styles.track}>
        {/* First copy — read by screen readers */}
        {renderActList(false)}
        {/* Second copy — hidden from assistive tech, provides seamless visual loop */}
        {renderActList(true)}
      </div>
      <button
        type="button"
        className={styles.pauseButton}
        onClick={() => setIsPaused((p) => !p)}
        aria-pressed={isPaused}
        aria-label={isPaused ? 'Play lineup animation' : 'Pause lineup animation'}
      >
        {isPaused ? '▶' : '⏸'}
      </button>
    </div>
  )
}

export default LineupBanner
