import React from 'react'
import { useCountdown } from '../../hooks/useCountdown'
import styles from '../../styles/CountdownTimer.module.css'

/**
 * CountdownTimer displays the remaining days, hours, minutes, and seconds
 * until the target event date, or a celebration message once past.
 *
 * @param {{ targetDate: string }} props
 */
function CountdownTimer({ targetDate }) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(targetDate)

  return (
    <div className={styles.countdown} aria-live="polite" aria-atomic="true">
      {isPast ? (
        <span className={styles.pastMessage}>Natfest 2027 - Coming Soon</span>
      ) : (
        <div className={styles.segments}>
          <span className={styles.segment}>
            <span className={styles.value}>{days}</span>
            <span className={styles.label}>d</span>
          </span>
          <span className={styles.separator} aria-hidden="true">:</span>
          <span className={styles.segment}>
            <span className={styles.value}>{hours}</span>
            <span className={styles.label}>h</span>
          </span>
          <span className={styles.separator} aria-hidden="true">:</span>
          <span className={styles.segment}>
            <span className={styles.value}>{minutes}</span>
            <span className={styles.label}>m</span>
          </span>
          <span className={styles.separator} aria-hidden="true">:</span>
          <span className={styles.segment}>
            <span className={styles.value}>{seconds}</span>
            <span className={styles.label}>s</span>
          </span>
          <span className="sr-only">
            {days} days, {hours} hours, {minutes} minutes, {seconds} seconds until Natfest
          </span>
        </div>
      )}
    </div>
  )
}

export default CountdownTimer
