import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TeamMember from './TeamMember'

describe('TeamMember', () => {
  const defaultProps = {
    name: 'Dave Leader',
    bio: 'Festival organiser and Natalie\'s husband.',
    photoUrl: 'https://cdn.sanity.io/images/test/photo.jpg',
    index: 0,
  }

  it('renders the team member name', () => {
    render(<TeamMember {...defaultProps} />)
    expect(screen.getByRole('heading', { name: 'Dave Leader' })).toBeInTheDocument()
  })

  it('renders the team member bio', () => {
    render(<TeamMember {...defaultProps} />)
    expect(screen.getByText(defaultProps.bio)).toBeInTheDocument()
  })

  it('renders the photo with correct alt text', () => {
    render(<TeamMember {...defaultProps} />)
    const img = screen.getByRole('img', { name: 'Photo of Dave Leader' })
    expect(img).toHaveAttribute('src', defaultProps.photoUrl)
  })

  it('applies image-left layout for even index (0-based)', () => {
    const { container } = render(<TeamMember {...defaultProps} index={0} />)
    const article = container.querySelector('article')
    expect(article.className).toMatch(/imageLeft/)
  })

  it('applies image-right layout for odd index (0-based)', () => {
    const { container } = render(<TeamMember {...defaultProps} index={1} />)
    const article = container.querySelector('article')
    expect(article.className).toMatch(/imageRight/)
  })

  it('renders a placeholder when photoUrl is not provided', () => {
    render(<TeamMember {...defaultProps} photoUrl={null} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByLabelText('No photo available for Dave Leader')).toBeInTheDocument()
  })

  it('uses lazy loading for the photo', () => {
    render(<TeamMember {...defaultProps} />)
    const img = screen.getByRole('img', { name: 'Photo of Dave Leader' })
    expect(img).toHaveAttribute('loading', 'lazy')
  })
})
