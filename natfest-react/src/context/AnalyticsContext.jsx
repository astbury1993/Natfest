import { createContext, useContext, useEffect, useRef, useCallback, useState } from 'react'
import { useCookieConsent } from './CookieConsentContext'
import { initGAWithTimeout, trackPageView as gaTrackPageView, trackEvent as gaTrackEvent, isGALoaded } from '../lib/analytics'

const AnalyticsContext = createContext({
  trackPageView: () => {},
  trackEvent: () => {},
})

export function AnalyticsProvider({ children }) {
  const { consent } = useCookieConsent()
  const [gaReady, setGaReady] = useState(false)
  const prevConsentRef = useRef(consent)

  // Load GA when consent becomes "accepted"
  useEffect(() => {
    if (consent === 'accepted') {
      // If GA is already loaded (e.g. from useCookieConsent hook), just mark ready
      if (isGALoaded()) {
        setGaReady(true)
        return
      }

      // Otherwise load with 5-second timeout
      let cancelled = false
      initGAWithTimeout(true, 5000).then((success) => {
        if (!cancelled) {
          setGaReady(success)
        }
      })

      return () => {
        cancelled = true
      }
    } else {
      // Consent is not accepted — stop tracking
      setGaReady(false)
    }
  }, [consent])

  // Detect consent revocation (was accepted, now isn't)
  useEffect(() => {
    const prevConsent = prevConsentRef.current
    prevConsentRef.current = consent

    if (prevConsent === 'accepted' && consent !== 'accepted') {
      // Consent revoked — analytics cookies are already removed by
      // useCookieConsent hook. We just stop tracking by setting gaReady=false.
      setGaReady(false)
    }
  }, [consent])

  const trackPageView = useCallback(
    (path) => {
      if (consent !== 'accepted' || !gaReady) return
      gaTrackPageView(path, true)
    },
    [consent, gaReady]
  )

  const trackEvent = useCallback(
    (eventName, params) => {
      if (consent !== 'accepted' || !gaReady) return
      gaTrackEvent(eventName, params, true)
    },
    [consent, gaReady]
  )

  return (
    <AnalyticsContext.Provider value={{ trackPageView, trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  return useContext(AnalyticsContext)
}

export default AnalyticsContext
