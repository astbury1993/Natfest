import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import GalleryModal from './GalleryModal'

// Mock the env variable
beforeEach(() => {
  vi.stubEnv('VITE_CLOUDINARY_CLOUD_NAME', 'test-cloud')
  document.body.style.overflow = ''
})

const mockImages = [
  { id: '1', publicId: 'natfest/gallery/img1', alt: 'First image', category: 'acts' },
  { id: '2', publicId: 'natfest/gallery/img2', alt: 'Second image', category: 'crowd' },
  { id: '3', publicId: 'natfest/gallery/img3', alt: 'Third image', category: 'acts' },
]

const defaultProps = {
  images: mockImages,
  currentIndex: 0,
  isOpen: true,
  onClose: vi.fn(),
  onPrev: vi.fn(),
  onNext: vi.fn(),
}

describe('GalleryModal', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(<GalleryModal {...defaultProps} isOpen={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when images array is empty', () => {
    const { container } = render(<GalleryModal {...defaultProps} images={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a dialog with aria-modal attribute when open', () => {
    render(<GalleryModal {...defaultProps} />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-label', 'Image gallery viewer')
  })

  it('displays the full-resolution image for the current index', () => {
    render(<GalleryModal {...defaultProps} currentIndex={1} />)
    const img = screen.getByAltText('Second image')
    expect(img).toBeInTheDocument()
    expect(img.src).toContain('c_limit,w_2400')
    expect(img.src).toContain('natfest/gallery/img2')
  })

  it('renders close, previous, and next navigation buttons', () => {
    render(<GalleryModal {...defaultProps} />)
    expect(screen.getByLabelText('Close gallery')).toBeInTheDocument()
    expect(screen.getByLabelText('Previous image')).toBeInTheDocument()
    expect(screen.getByLabelText('Next image')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<GalleryModal {...defaultProps} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Close gallery'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onPrev when previous button is clicked', () => {
    const onPrev = vi.fn()
    render(<GalleryModal {...defaultProps} onPrev={onPrev} />)
    fireEvent.click(screen.getByLabelText('Previous image'))
    expect(onPrev).toHaveBeenCalledTimes(1)
  })

  it('calls onNext when next button is clicked', () => {
    const onNext = vi.fn()
    render(<GalleryModal {...defaultProps} onNext={onNext} />)
    fireEvent.click(screen.getByLabelText('Next image'))
    expect(onNext).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn()
    render(<GalleryModal {...defaultProps} onClose={onClose} />)
    const dialog = screen.getByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onPrev when ArrowLeft key is pressed', () => {
    const onPrev = vi.fn()
    render(<GalleryModal {...defaultProps} onPrev={onPrev} />)
    const dialog = screen.getByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' })
    expect(onPrev).toHaveBeenCalledTimes(1)
  })

  it('calls onNext when ArrowRight key is pressed', () => {
    const onNext = vi.fn()
    render(<GalleryModal {...defaultProps} onNext={onNext} />)
    const dialog = screen.getByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'ArrowRight' })
    expect(onNext).toHaveBeenCalledTimes(1)
  })

  it('falls back to medium image when full-res fails', () => {
    render(<GalleryModal {...defaultProps} />)
    const fullImg = screen.getByAltText('First image')
    expect(fullImg.src).toContain('c_limit,w_2400')

    // Simulate error on full-res image
    fireEvent.error(fullImg)

    // Should now show medium variant
    const mediumImg = screen.getByAltText('First image')
    expect(mediumImg.src).toContain('c_limit,w_1200')
  })

  it('shows error placeholder when both full and medium images fail', () => {
    render(<GalleryModal {...defaultProps} />)

    // Fail full-res
    const fullImg = screen.getByAltText('First image')
    fireEvent.error(fullImg)

    // Fail medium
    const mediumImg = screen.getByAltText('First image')
    fireEvent.error(mediumImg)

    // Should show error placeholder
    const placeholder = screen.getByRole('img', { name: 'First image' })
    expect(placeholder).toBeInTheDocument()
    expect(screen.getByText('Image unavailable')).toBeInTheDocument()
  })

  it('keeps navigation working when image fails to load', () => {
    const onNext = vi.fn()
    render(<GalleryModal {...defaultProps} onNext={onNext} />)

    // Fail both images
    const fullImg = screen.getByAltText('First image')
    fireEvent.error(fullImg)
    const mediumImg = screen.getByAltText('First image')
    fireEvent.error(mediumImg)

    // Navigation should still work
    fireEvent.click(screen.getByLabelText('Next image'))
    expect(onNext).toHaveBeenCalledTimes(1)
  })

  it('disables body scroll when open', () => {
    render(<GalleryModal {...defaultProps} />)
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('re-enables body scroll when closed', () => {
    const { rerender } = render(<GalleryModal {...defaultProps} />)
    expect(document.body.style.overflow).toBe('hidden')

    rerender(<GalleryModal {...defaultProps} isOpen={false} />)
    expect(document.body.style.overflow).toBe('')
  })

  it('calls onClose when clicking the backdrop', () => {
    const onClose = vi.fn()
    render(<GalleryModal {...defaultProps} onClose={onClose} />)
    const dialog = screen.getByRole('dialog')
    fireEvent.click(dialog)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
