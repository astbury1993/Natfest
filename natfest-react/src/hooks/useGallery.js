import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import sanityClient from '../lib/sanityClient'

const BATCH_SIZE = 20
const MAX_RETRIES = 3

const GALLERY_QUERY = `*[_type == "galleryImage"] | order(order asc) { _id, title, category, cloudinaryPublicId, alt, year, order }`

/**
 * Hook for managing gallery image pagination, filtering, and infinite scroll.
 *
 * Fetches all gallery images from Sanity, filters client-side by category,
 * and paginates results into batches of 20 with IntersectionObserver-based
 * infinite scroll.
 *
 * @param {string} category - Active category filter ('All', 'Acts', or 'Crowd')
 * @returns {{
 *   images: Array,
 *   loading: boolean,
 *   error: Error | null,
 *   hasMore: boolean,
 *   loadMore: function,
 *   retry: function | null,
 *   sentinelRef: React.RefObject
 * }}
 */
function useGallery(category = 'All') {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const sentinelRef = useRef(null)
  const observerRef = useRef(null)

  // Fetch gallery images from Sanity
  useEffect(() => {
    let cancelled = false
    const cacheKey = `sanity_cache_${GALLERY_QUERY}`

    async function fetchGallery() {
      setLoading(true)
      setError(null)

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const result = await sanityClient.fetch(GALLERY_QUERY, {}, { signal: controller.signal })
        clearTimeout(timeoutId)

        if (cancelled) return

        setData(result)
        setError(null)

        // Cache successful response
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(result))
        } catch {
          // sessionStorage may be full or unavailable
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

    fetchGallery()

    return () => {
      cancelled = true
    }
  }, [retryCount])

  // Filter images by category client-side for fast <500ms filtering
  const filteredImages = useMemo(() => {
    if (!data) return []
    if (category === 'All') return data
    return data.filter((img) => img.category === category)
  }, [data, category])

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE)
  }, [category])

  // Current page of visible images
  const images = useMemo(() => {
    return filteredImages.slice(0, visibleCount)
  }, [filteredImages, visibleCount])

  const hasMore = visibleCount < filteredImages.length

  const loadMore = useCallback(() => {
    if (hasMore) {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredImages.length))
    }
  }, [hasMore, filteredImages.length])

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    if (!hasMore || loading || error) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { rootMargin: '200px' }
    )

    const sentinel = sentinelRef.current
    if (sentinel) {
      observerRef.current.observe(sentinel)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, loading, error, loadMore])

  // Retry function - increments retry count to trigger re-fetch
  const retry = useCallback(() => {
    if (retryCount >= MAX_RETRIES) return
    setRetryCount((prev) => prev + 1)
  }, [retryCount])

  return {
    images,
    loading,
    error,
    hasMore,
    loadMore,
    retry: error && retryCount < MAX_RETRIES ? retry : null,
    sentinelRef,
  }
}

export default useGallery
