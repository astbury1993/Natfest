import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import useSanityQuery from './useSanityQuery'

// Mock the sanity client
vi.mock('../lib/sanityClient', () => ({
  default: {
    fetch: vi.fn(),
  },
}))

import sanityClient from '../lib/sanityClient'

describe('useSanityQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    sessionStorage.clear()
  })

  afterEach(() => {
    sessionStorage.clear()
  })

  it('returns loading state initially', () => {
    sanityClient.fetch.mockImplementation(() => new Promise(() => {}))
    const { result } = renderHook(() => useSanityQuery('*[_type == "act"]'))

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('returns data on successful fetch', async () => {
    const mockData = [{ name: 'Act One' }, { name: 'Act Two' }]
    sanityClient.fetch.mockResolvedValue(mockData)

    const { result } = renderHook(() => useSanityQuery('*[_type == "act"]'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBeNull()
  })

  it('caches successful responses in sessionStorage', async () => {
    const mockData = [{ name: 'Cached Act' }]
    sanityClient.fetch.mockResolvedValue(mockData)
    const query = '*[_type == "act"]'

    const { result } = renderHook(() => useSanityQuery(query))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    const cached = JSON.parse(sessionStorage.getItem(`sanity_cache_${query}`))
    expect(cached).toEqual(mockData)
  })

  it('returns cached data on fetch error', async () => {
    const query = '*[_type == "act"]'
    const cachedData = [{ name: 'From Cache' }]
    sessionStorage.setItem(`sanity_cache_${query}`, JSON.stringify(cachedData))

    sanityClient.fetch.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useSanityQuery(query))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual(cachedData)
    expect(result.current.error).toBeNull()
  })

  it('returns error state when fetch fails and no cache exists', async () => {
    sanityClient.fetch.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useSanityQuery('*[_type == "act"]'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error.message).toBe('Network error')
  })

  it('does not fetch when query is empty', () => {
    const { result } = renderHook(() => useSanityQuery(''))

    expect(result.current.loading).toBe(false)
    expect(sanityClient.fetch).not.toHaveBeenCalled()
  })
})
