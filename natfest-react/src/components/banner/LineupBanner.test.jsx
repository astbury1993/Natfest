import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LineupBanner from './LineupBanner'

// Mock the useSanityQuery hook
vi.mock('../../hooks/useSanityQuery', () => ({
  default: vi.fn(() => ({ data: null, loading: false, error: null })),
}))

import useSanityQuery from '../../hooks/useSanityQuery'

const mockActs = ['The Headliners', 'Echo Band', 'Sunset Crew', 'River Sound']

describe('LineupBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders nothing when no acts are available from CMS or props', () => {
    useSanityQuery.mockReturnValue({ data: null, loading: false, error: null })
    const { container } = render(<LineupBanner />)
    expect(container.firstChild).toBeNull()
  })

  it('renders act names from the acts prop as fallback', () => {
    useSanityQuery.mockReturnValue({ data: null, loading: false, error: null })
    render(<LineupBanner acts={mockActs} />)

    // Each name appears twice (original + duplicate for seamless scroll)
    expect(screen.getAllByText('The Headliners')).toHaveLength(2)
    expect(screen.getAllByText('Echo Band')).toHaveLength(2)
    expect(screen.getAllByText('Sunset Crew')).toHaveLength(2)
    expect(screen.getAllByText('River Sound')).toHaveLength(2)
  })

  it('renders act names from CMS data when available', () => {
    const cmsData = [{ name: 'CMS Act One' }, { name: 'CMS Act Two' }]
    useSanityQuery.mockReturnValue({ data: cmsData, loading: false, error: null })
    render(<LineupBanner acts={mockActs} />)

    // CMS data takes priority over prop data
    expect(screen.getAllByText('CMS Act One')).toHaveLength(2)
    expect(screen.getAllByText('CMS Act Two')).toHaveLength(2)
    expect(screen.queryByText('The Headliners')).not.toBeInTheDocument()
  })

  it('has role="region" with an aria-label', () => {
    useSanityQuery.mockReturnValue({ data: null, loading: false, error: null })
    render(<LineupBanner acts={mockActs} />)

    const region = screen.getByRole('region', {
      name: 'Scrolling lineup announcement',
    })
    expect(region).toBeInTheDocument()
  })

  it('marks the duplicated content with aria-hidden="true"', () => {
    useSanityQuery.mockReturnValue({ data: null, loading: false, error: null })
    const { container } = render(<LineupBanner acts={mockActs} />)

    const track = container.querySelector('[class*="track"]')
    const actLists = track.children
    // Second span (duplicate) should be aria-hidden
    expect(actLists[1]).toHaveAttribute('aria-hidden', 'true')
    // First span should NOT be aria-hidden
    expect(actLists[0]).not.toHaveAttribute('aria-hidden')
  })

  it('renders a visible pause button', () => {
    useSanityQuery.mockReturnValue({ data: null, loading: false, error: null })
    render(<LineupBanner acts={mockActs} />)

    const pauseBtn = screen.getByRole('button', {
      name: 'Pause lineup animation',
    })
    expect(pauseBtn).toBeInTheDocument()
  })

  it('toggles pause state when the pause button is clicked', async () => {
    useSanityQuery.mockReturnValue({ data: null, loading: false, error: null })
    const user = userEvent.setup()
    render(<LineupBanner acts={mockActs} />)

    const pauseBtn = screen.getByRole('button', {
      name: 'Pause lineup animation',
    })
    expect(pauseBtn).toHaveAttribute('aria-pressed', 'false')

    await user.click(pauseBtn)

    const playBtn = screen.getByRole('button', {
      name: 'Play lineup animation',
    })
    expect(playBtn).toHaveAttribute('aria-pressed', 'true')
  })

  it('renders star separators between act names', () => {
    useSanityQuery.mockReturnValue({ data: null, loading: false, error: null })
    const { container } = render(<LineupBanner acts={['Act A', 'Act B']} />)

    const separators = container.querySelectorAll('[class*="separator"]')
    // Each copy has: (acts.length - 1) separators + 1 trailing separator = acts.length
    // Two copies = acts.length * 2
    expect(separators.length).toBe(4)
  })
})
