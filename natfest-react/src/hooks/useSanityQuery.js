import { useState, useEffect } from 'react'
import sanityClient from '../lib/sanityClient'

/**
 * Generic hook for fetching data from Sanity CMS via GROQ queries.
 * Caches successful responses in sessionStorage keyed by the query string.
 * On fetch error or timeout (>5s), returns cached data if available.
 *
 * @param {string} query - GROQ query string
 * @returns {{ data: any | null, loading: boolean, error: Error | null }}
 */
function useSanityQuery(query) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query || !sanityClient) {
      setLoading(false)
      return
    }

    const cacheKey = `sanity_cache_${query}`
    let cancelled = false

    async function fetchData() {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const result = await sanityClient.fetch(query, {}, { signal: controller.signal })
        clearTimeout(timeoutId)

        if (cancelled) return

        setData(result)
        setError(null)

        // Cache successful response
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(result))
        } catch {
          // sessionStorage may be full or unavailable — ignore
        }
      } catch (err) {
        if (cancelled) return

        // Attempt to return cached data on error
        try {
          const cached = sessionStorage.getItem(cacheKey)
          if (cached) {
            setData(JSON.parse(cached))
            setError(null)
            return
          }
        } catch {
          // sessionStorage unavailable
        }

        setError(err)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [query])

  return { data, loading, error }
}

export default useSanityQuery
