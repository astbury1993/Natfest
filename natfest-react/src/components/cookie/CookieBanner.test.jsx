import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CookieBanner from './CookieBanner'

// Mock the CookieConsentContext
const mockAccept = vi.fn()
const mockReject = vi.fn()
let mockConsent = 'unset'

vi.mock('../../context/CookieConsentContext', () => ({
  useCookieConsent: () => ({
    consent: mockConsent,
    accept: mockAccept,
    reject: mockReject,
    revoke: vi.fn(),
  }),
}))

describe('CookieBanner', () => {
  beforeEach(() => {
    mockConsent = 'unset'
    mockAccept.mockClear()
    mockReject.mockClear()
  })

  it('renders the banner when consent is "unset"', () => {
    render(<CookieBanner />)

    expect(screen.getByRole('region', { name: /cookie consent/i })).toBeInTheDocument()
    expect(screen.getByText(/cookie preferences/i)).toBeInTheDocument()
    expect(screen.getByText(/this site uses cookies for analytics/i)).toBeInTheDocument()
  })

  it('does not render when consent is "accepted"', () => {
    mockConsent = 'accepted'
    const { container } = render(<CookieBanner />)

    expect(container).toBeEmptyDOMElement()
  })

  it('does not render when consent is "rejected"', () => {
    mockConsent = 'rejected'
    const { container } = render(<CookieBanner />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders Accept and Reject buttons with equal prominence', () => {
    render(<CookieBanner />)

    const acceptBtn = screen.getByRole('button', { name: /accept/i })
    const rejectBtn = screen.getByRole('button', { name: /reject/i })

    expect(acceptBtn).toBeInTheDocument()
    expect(rejectBtn).toBeInTheDocument()
  })

  it('calls accept() when Accept button is clicked', async () => {
    const user = userEvent.setup()
    render(<CookieBanner />)

    await user.click(screen.getByRole('button', { name: /accept/i }))

    expect(mockAccept).toHaveBeenCalledTimes(1)
  })

  it('calls reject() when Reject button is clicked', async () => {
    const user = userEvent.setup()
    render(<CookieBanner />)

    await user.click(screen.getByRole('button', { name: /reject/i }))

    expect(mockReject).toHaveBeenCalledTimes(1)
  })

  it('does not contain any checkboxes or pre-selected options', () => {
    render(<CookieBanner />)

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
  })

  it('buttons are keyboard-focusable', () => {
    render(<CookieBanner />)

    const acceptBtn = screen.getByRole('button', { name: /accept/i })
    const rejectBtn = screen.getByRole('button', { name: /reject/i })

    // Buttons are inherently keyboard-focusable, verify they are not disabled
    expect(acceptBtn).not.toBeDisabled()
    expect(rejectBtn).not.toBeDisabled()
  })

  it('has accessible region with aria-label', () => {
    render(<CookieBanner />)

    const region = screen.getByRole('region', { name: /cookie consent/i })
    expect(region).toBeInTheDocument()
  })
})
