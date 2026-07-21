import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { calculateCountdown, useCountdown } from './useCountdown'

describe('calculateCountdown', () => {
  it('returns correct d/h/m/s for a future date', () => {
    const target = '2025-07-19T12:00:00'
    // 2 days, 3 hours, 4 minutes, 5 seconds before the target
    const now = new Date('2025-07-17T08:55:55')
    const result = calculateCountdown(target, now)

    expect(result.days).toBe(2)
    expect(result.hours).toBe(3)
    expect(result.minutes).toBe(4)
    expect(result.seconds).toBe(5)
    expect(result.isPast).toBe(false)
  })

  it('returns isPast=true and zeroes when target is in the past', () => {
    const target = '2025-07-19T12:00:00'
    const now = new Date('2025-07-20T00:00:00')
    const result = calculateCountdown(target, now)

    expect(result.days).toBe(0)
    expect(result.hours).toBe(0)
    expect(result.minutes).toBe(0)
    expect(result.seconds).toBe(0)
    expect(result.isPast).toBe(true)
  })

  it('returns isPast=true when now equals the target exactly', () => {
    const target = '2025-07-19T12:00:00'
    const now = new Date('2025-07-19T12:00:00')
    const result = calculateCountdown(target, now)

    expect(result.isPast).toBe(true)
  })

  it('hours, minutes, seconds are always within valid ranges', () => {
    const target = '2025-12-31T23:59:59'
    const now = new Date('2025-01-01T00:00:00')
    const result = calculateCountdown(target, now)

    expect(result.hours).toBeGreaterThanOrEqual(0)
    expect(result.hours).toBeLessThan(24)
    expect(result.minutes).toBeGreaterThanOrEqual(0)
    expect(result.minutes).toBeLessThan(60)
    expect(result.seconds).toBeGreaterThanOrEqual(0)
    expect(result.seconds).toBeLessThan(60)
  })
})

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns initial countdown values for a future date', () => {
    vi.setSystemTime(new Date('2025-07-17T12:00:00'))
    const { result } = renderHook(() => useCountdown('2025-07-19T12:00:00'))

    expect(result.current.days).toBe(2)
    expect(result.current.hours).toBe(0)
    expect(result.current.minutes).toBe(0)
    expect(result.current.seconds).toBe(0)
    expect(result.current.isPast).toBe(false)
  })

  it('updates every second', () => {
    vi.setSystemTime(new Date('2025-07-19T11:59:57'))
    const { result } = renderHook(() => useCountdown('2025-07-19T12:00:00'))

    expect(result.current.seconds).toBe(3)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.seconds).toBe(2)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.seconds).toBe(1)
  })

  it('transitions to isPast when target is reached', () => {
    vi.setSystemTime(new Date('2025-07-19T11:59:59'))
    const { result } = renderHook(() => useCountdown('2025-07-19T12:00:00'))

    expect(result.current.isPast).toBe(false)
    expect(result.current.seconds).toBe(1)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.isPast).toBe(true)
  })

  it('does not start interval when already past', () => {
    vi.setSystemTime(new Date('2025-07-20T00:00:00'))
    const { result } = renderHook(() => useCountdown('2025-07-19T12:00:00'))

    expect(result.current.isPast).toBe(true)

    // Advancing time should not cause errors or state changes
    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.isPast).toBe(true)
  })
})
