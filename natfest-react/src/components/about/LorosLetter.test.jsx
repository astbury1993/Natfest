import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import LorosLetter from './LorosLetter'

const mockIntro = 'This is the introductory paragraph of the LOROS letter.'
const mockFullContent = [
  {
    _type: 'block',
    _key: 'block1',
    children: [{ text: 'Second paragraph about LOROS services.' }],
  },
  {
    _type: 'block',
    _key: 'block2',
    children: [{ text: 'Third paragraph with thanks and acknowledgments.' }],
  },
]

describe('LorosLetter', () => {
  it('renders the intro paragraph visibly', () => {
    render(<LorosLetter intro={mockIntro} fullContent={mockFullContent} />)
    expect(screen.getByText(mockIntro)).toBeInTheDocument()
  })

  it('renders a "Read more" button', () => {
    render(<LorosLetter intro={mockIntro} fullContent={mockFullContent} />)
    expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument()
  })

  it('hides full content by default', () => {
    render(<LorosLetter intro={mockIntro} fullContent={mockFullContent} />)
    const fullContent = document.getElementById('loros-letter-full-content')
    expect(fullContent).toHaveAttribute('hidden')
  })

  it('has aria-expanded="false" on button by default', () => {
    render(<LorosLetter intro={mockIntro} fullContent={mockFullContent} />)
    const button = screen.getByRole('button', { name: /read more/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('expands content and changes button to "Read less" when clicked', async () => {
    const user = userEvent.setup()
    render(<LorosLetter intro={mockIntro} fullContent={mockFullContent} />)

    const button = screen.getByRole('button', { name: /read more/i })
    await user.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(button).toHaveTextContent('Read less')
    const fullContent = document.getElementById('loros-letter-full-content')
    expect(fullContent).not.toHaveAttribute('hidden')
  })

  it('collapses content when "Read less" is clicked', async () => {
    const user = userEvent.setup()
    render(<LorosLetter intro={mockIntro} fullContent={mockFullContent} />)

    const button = screen.getByRole('button', { name: /read more/i })
    await user.click(button) // expand
    await user.click(button) // collapse

    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveTextContent('Read more')
    const fullContent = document.getElementById('loros-letter-full-content')
    expect(fullContent).toHaveAttribute('hidden')
  })

  it('renders full content paragraphs when expanded', async () => {
    const user = userEvent.setup()
    render(<LorosLetter intro={mockIntro} fullContent={mockFullContent} />)

    await user.click(screen.getByRole('button', { name: /read more/i }))

    expect(screen.getByText('Second paragraph about LOROS services.')).toBeInTheDocument()
    expect(screen.getByText('Third paragraph with thanks and acknowledgments.')).toBeInTheDocument()
  })

  it('has aria-controls attribute on the button', () => {
    render(<LorosLetter intro={mockIntro} fullContent={mockFullContent} />)
    const button = screen.getByRole('button', { name: /read more/i })
    expect(button).toHaveAttribute('aria-controls', 'loros-letter-full-content')
  })
})
