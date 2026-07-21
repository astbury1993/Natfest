import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCookieConsentLogic } from './useCookieConsent'

// Mock the analytics module
vi.mock('../lib/analytics', () => ({
  initGA: vi.fn(),
}))

import { initGA } from '../lib/analytics'

const COOKIE_NAME = 'natfest_cookie_preference'

function clearCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim()
    document.cookie = `${name}=; max-age=0; path=/;`
  })
}

describe('useCookieConsentLogic', () => {
  beforeEach(() => {
    clearCookies()
    vi.clearAllMocks()
  })

  afterEach(() => {
    clearCookies()
  })

  it('returns "unset" when no cookie exists', () => {
    const { result } = renderHook(() => useCookieConsentLogic())
    expect(result.current.consent).toBe('unset')
  })

  it('returns "accepted" when cookie is set to accepted', () => {
    document.cookie = `${COOKIE_NAME}=accepted; path=/;`
    const { result } = renderHook(() => useCookieConsentLogic())
    expect(result.current.consent).toBe('accepted')
  })

  it('returns "rejected" when cookie is set to rejected', () => {
    document.cookie = `${COOKIE_NAME}=rejected; path=/;`
    const { result } = renderHook(() => useCookieConsentLogic())
    expect(result.current.consent).toBe('rejected')
  })

  it('returns "unset" when cookie has an invalid value', () => {
    document.cookie = `${COOKIE_NAME}=something_else; path=/;`
    const { result } = renderHook(() => useCookieConsentLogic())
    expect(result.current.consent).toBe('unset')
  })

  it('accept() sets consent to "accepted" and writes cookie', () => {
    const { result } = renderHook(() => useCookieConsentLogic())

    act(() => {
      result.current.accept()
    })

    expect(result.current.consent).toBe('accepted')
    expect(document.cookie).toContain(`${COOKIE_NAME}=accepted`)
  })

  it('accept() calls initGA(true)', () => {
    const { result } = renderHook(() => useCookieConsentLogic())

    act(() => {
      result.current.accept()
    })

    expect(initGA).toHaveBeenCalledWith(true)
  })

  it('reject() sets consent to "rejected" and writes cookie', () => {
    const { result } = renderHook(() => useCookieConsentLogic())

    act(() => {
      result.current.reject()
    })

    expect(result.current.consent).toBe('rejected')
    expect(document.cookie).toContain(`${COOKIE_NAME}=rejected`)
  })

  it('reject() removes GA cookies', () => {
    // Set up fake GA cookies
    document.cookie = '_ga=GA1.1.12345; path=/;'
    document.cookie = '_ga_ABCDEF=value; path=/;'

    const { result } = renderHook(() => useCookieConsentLogic())

    act(() => {
      result.current.reject()
    })

    expect(document.cookie).not.toContain('_ga=')
    expect(document.cookie).not.toContain('_ga_ABCDEF')
  })

  it('revoke() sets consent to "rejected" and removes GA cookies', () => {
    document.cookie = `${COOKIE_NAME}=accepted; path=/;`
    document.cookie = '_ga=GA1.1.12345; path=/;'

    const { result } = renderHook(() => useCookieConsentLogic())
    expect(result.current.consent).toBe('accepted')

    act(() => {
      result.current.revoke()
    })

    expect(result.current.consent).toBe('rejected')
    expect(document.cookie).toContain(`${COOKIE_NAME}=rejected`)
    expect(document.cookie).not.toContain('_ga=GA1')
  })

  it('initialises GA on mount when consent is already accepted', () => {
    document.cookie = `${COOKIE_NAME}=accepted; path=/;`
    renderHook(() => useCookieConsentLogic())

    expect(initGA).toHaveBeenCalledWith(true)
  })

  it('does not initialise GA on mount when consent is rejected', () => {
    document.cookie = `${COOKIE_NAME}=rejected; path=/;`
    renderHook(() => useCookieConsentLogic())

    expect(initGA).not.toHaveBeenCalled()
  })

  it('does not initialise GA on mount when consent is unset', () => {
    renderHook(() => useCookieConsentLogic())
    expect(initGA).not.toHaveBeenCalled()
  })

  it('accept from rejected transitions to accepted', () => {
    document.cookie = `${COOKIE_NAME}=rejected; path=/;`
    const { result } = renderHook(() => useCookieConsentLogic())

    expect(result.current.consent).toBe('rejected')

    act(() => {
      result.current.accept()
    })

    expect(result.current.consent).toBe('accepted')
    expect(initGA).toHaveBeenCalledWith(true)
  })

  it('reject from accepted transitions to rejected', () => {
    document.cookie = `${COOKIE_NAME}=accepted; path=/;`
    const { result } = renderHook(() => useCookieConsentLogic())

    expect(result.current.consent).toBe('accepted')

    act(() => {
      result.current.reject()
    })

    expect(result.current.consent).toBe('rejected')
  })
})
