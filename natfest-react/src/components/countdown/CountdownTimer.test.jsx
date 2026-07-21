import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CountdownTimer from './CountdownTimer'

describe('CountdownTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders countdown values when event is in the future', () => {
    vi.setSystemTime(new Date('2025-07-17T12:00:00'))
    render(<CountdownTimer targetDate="2025-07-19T12:00:00" />)

    // Days value should be 2
    expect(screen.getByText('2')).toBeInTheDocument()
    // Labels should be present
    expect(screen.getByText('d')).toBeInTheDocument()
    expect(screen.getByText('h')).toBeInTheDocument()
    expect(screen.getByText('m')).toBeInTheDocument()
    expect(screen.getByText('s')).toBeInTheDocument()
    // Should not show the past message
    expect(screen.queryByText("It's Natfest time!")).not.toBeInTheDocument()
  })

  it('renders "It\'s Natfest time!" when event date has passed', () => {
    vi.setSystemTime(new Date('2025-07-20T00:00:00'))
    render(<CountdownTimer targetDate="2025-07-19T12:00:00" />)

    expect(screen.getByText("It's Natfest time!")).toBeInTheDocument()
  })

  it('has an aria-live="polite" region for accessibility', () => {
    vi.setSystemTime(new Date('2025-07-17T12:00:00'))
    const { container } = render(
      <CountdownTimer targetDate="2025-07-19T12:00:00" />
    )

    const liveRegion = container.querySelector('[aria-live="polite"]')
    expect(liveRegion).toBeInTheDocument()
  })

  it('has aria-atomic="true" so the entire region is announced', () => {
    vi.setSystemTime(new Date('2025-07-17T12:00:00'))
    const { container } = render(
      <CountdownTimer targetDate="2025-07-19T12:00:00" />
    )

    const liveRegion = container.querySelector('[aria-atomic="true"]')
    expect(liveRegion).toBeInTheDocument()
  })

  it('provides screen reader text with full countdown description', () => {
    vi.setSystemTime(new Date('2025-07-17T08:55:55'))
    render(<CountdownTimer targetDate="2025-07-19T12:00:00" />)

    expect(
      screen.getByText(/2 days, 3 hours, 4 minutes, 5 seconds until Natfest/)
    ).toBeInTheDocument()
  })
})
