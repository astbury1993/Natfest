import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAnalytics } from '../../context/AnalyticsContext'

/**
 * Tracks page view events on every route navigation.
 * Must be rendered inside a Router context (e.g. within Layout).
 */
function PageViewTracker() {
  const location = useLocation()
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname, trackPageView])

  return null
}

export default PageViewTracker
