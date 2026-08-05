import React from 'react'
import { useCountdown } from '../../hooks/useCountdown'
import styles from '../../styles/CountdownTimer.module.css'

/**
 * CountdownTimer displays the remaining days, hours, minutes, and seconds
 * until the target event date. If no date is provided or the date has passed,
 * shows a fallback message.
 *
 * @param {{ targetDate: string | null, label: string }} props
 */
function CountdownTimer({ targetDate, label = 'Natfest 2027' }) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(targetDate || '2000-01-01T00:00:00Z')

  // No date set or date has passed — show fallback message
  if (!targetDate || isPast) {
    return (
      <div className={styles.countdown} aria-live="polite" aria-atomic="true">
        <span className={styles.pastMessage}>{label} - Coming Soon</span>
      </div>
    )
  }

  return (
    <div className={styles.countdown} aria-live="polite" aria-atomic="true">
      <p className={styles.title}>{label}</p>
      <div className={styles.segments}>
        <div className={styles.segment}>
          <span className={styles.value}>{days}</span>
          <span className={styles.label}>days</span>
        </div>
        <span className={styles.separator} aria-hidden="true">:</span>
        <div className={styles.segment}>
          <span className={styles.value}>{hours}</span>
          <span className={styles.label}>hours</span>
        </div>
        <span className={styles.separator} aria-hidden="true">:</span>
        <div className={styles.segment}>
          <span className={styles.value}>{minutes}</span>
          <span className={styles.label}>mins</span>
        </div>
        <span className={styles.separator} aria-hidden="true">:</span>
        <div className={styles.segment}>
          <span className={styles.value}>{seconds}</span>
          <span className={styles.label}>secs</span>
        </div>
      </div>
      <span className="sr-only">
        {days} days, {hours} hours, {minutes} minutes, {seconds} seconds until Natfest
      </span>
    </div>
  )
}

export default CountdownTimer
