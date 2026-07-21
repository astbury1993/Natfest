import { useState, useEffect, useRef } from 'react'

/**
 * Pure calculation function that computes the countdown values
 * from a target date and a current time.
 *
 * @param {string} targetDate - ISO 8601 date string (interpreted in local timezone)
 * @param {Date} now - Current date/time
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, isPast: boolean }}
 */
export function calculateCountdown(targetDate, now) {
  const target = new Date(targetDate)
  const diff = target.getTime() - now.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, isPast: false }
}

/**
 * React hook that provides a live countdown to a target date.
 * Updates every second and stops when the target date has passed.
 *
 * @param {string} targetDate - ISO 8601 date string
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, isPast: boolean }}
 */
export function useCountdown(targetDate) {
  const [countdown, setCountdown] = useState(() =>
    calculateCountdown(targetDate, new Date())
  )
  const intervalRef = useRef(null)

  useEffect(() => {
    // Calculate immediately on mount/target change
    const initial = calculateCountdown(targetDate, new Date())
    setCountdown(initial)

    // Don't start interval if already past
    if (initial.isPast) {
      return
    }

    intervalRef.current = setInterval(() => {
      const updated = calculateCountdown(targetDate, new Date())
      setCountdown(updated)

      // Stop updating once past
      if (updated.isPast) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [targetDate])

  return countdown
}
