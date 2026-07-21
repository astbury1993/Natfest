import { useState, useCallback, useEffect } from 'react'
import { initGA } from '../lib/analytics'

const COOKIE_NAME = 'natfest_cookie_preference'
const MAX_AGE_SECONDS = 365 * 24 * 60 * 60 // 12 months (approx)

/**
 * Read the cookie preference from document.cookie.
 * Returns 'accepted', 'rejected', or 'unset'.
 */
function getCookiePreference() {
  if (typeof document === 'undefined') return 'unset'
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + COOKIE_NAME + '=([^;]*)')
  )
  if (!match) return 'unset'
  const value = decodeURIComponent(match[1])
  if (value === 'accepted' || value === 'rejected') return value
  return 'unset'
}

/**
 * Write the cookie preference to document.cookie with 12-month max-age.
 */
function setCookiePreference(value) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; max-age=${MAX_AGE_SECONDS}; path=/; SameSite=Lax`
}

/**
 * Remove all Google Analytics cookies (_ga, _ga_*) from the browser.
 */
function removeAnalyticsCookies() {
  if (typeof document === 'undefined') return

  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const name = cookie.split('=')[0].trim()
    if (name === '_ga' || name.startsWith('_ga_')) {
      // Delete cookie by setting max-age=0 on common paths/domains
      document.cookie = `${name}=; max-age=0; path=/;`
      document.cookie = `${name}=; max-age=0; path=/; domain=${window.location.hostname};`
      // Also try with leading dot domain (common for GA cookies)
      document.cookie = `${name}=; max-age=0; path=/; domain=.${window.location.hostname};`
    }
  }
}

/**
 * Custom hook managing cookie consent state.
 *
 * Provides:
 * - consent: 'unset' | 'accepted' | 'rejected'
 * - accept(): transitions to 'accepted', sets cookie, enables analytics
 * - reject(): transitions to 'rejected', sets cookie, removes analytics cookies
 * - revoke(): alias for reject — transitions from 'accepted' to 'rejected'
 */
export function useCookieConsentLogic() {
  const [consent, setConsent] = useState(() => getCookiePreference())

  // On mount, if already accepted, initialise GA
  useEffect(() => {
    if (consent === 'accepted') {
      initGA(true)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const accept = useCallback(() => {
    setCookiePreference('accepted')
    setConsent('accepted')
    initGA(true)
  }, [])

  const reject = useCallback(() => {
    setCookiePreference('rejected')
    setConsent('rejected')
    removeAnalyticsCookies()
  }, [])

  const revoke = useCallback(() => {
    setCookiePreference('rejected')
    setConsent('rejected')
    removeAnalyticsCookies()
  }, [])

  return { consent, accept, reject, revoke }
}
