import { useEffect, useState } from 'react'

// setTimeout overflows above ~24.8 days, so long waits are re-checked in steps
const MAX_TIMEOUT_MS = 2 ** 31 - 1

/**
 * Whether a Site Settings banner should currently show.
 * True while `enabled` is set and `endDate` (if given) is in the future.
 * Re-renders at `endDate` so the banner disappears for visitors who already have the page open.
 *
 * @param {boolean} enabled - Site Settings → Show banner
 * @param {string|null} endDate - Site Settings → Show until (ISO datetime)
 * @returns {boolean}
 */
function useBannerActive(enabled, endDate) {
  const parsed = endDate ? new Date(endDate).getTime() : null
  const endTime = Number.isNaN(parsed) ? null : parsed
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!endTime) return undefined
    const remaining = endTime - Date.now()
    if (remaining <= 0) return undefined
    const timeout = setTimeout(() => setNow(Date.now()), Math.min(remaining, MAX_TIMEOUT_MS))
    return () => clearTimeout(timeout)
  }, [endTime, now])

  return Boolean(enabled) && (endTime === null || now < endTime)
}

export default useBannerActive
