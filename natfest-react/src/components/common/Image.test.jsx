import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Image from './Image'

// Mock the env variable
beforeEach(() => {
  vi.stubEnv('VITE_CLOUDINARY_CLOUD_NAME', 'test-cloud')
})

describe('Image component', () => {
  it('renders a picture element with AVIF, WebP, and JPEG sources', () => {
    const { container } = render(
      <Image publicId="natfest/gallery/test" alt="Test image" />
    )

    const picture = container.querySelector('picture')
    expect(picture).toBeInTheDocument()

    const sources = picture.querySelectorAll('source')
    expect(sources).toHaveLength(2)
    expect(sources[0]).toHaveAttribute('type', 'image/avif')
    expect(sources[1]).toHaveAttribute('type', 'image/webp')

    const img = picture.querySelector('img')
    expect(img).toHaveAttribute('alt', 'Test image')
    expect(img.src).toContain('f_jpg')
  })

  it('builds correct Cloudinary URLs for each variant', () => {
    const { container } = render(
      <Image publicId="natfest/photo" alt="Photo" variant="thumbnail" />
    )

    const img = container.querySelector('img')
    expect(img.src).toContain('c_fill,w_400,h_267,f_jpg,q_auto')
    expect(img.src).toContain('natfest/photo')

    const sources = container.querySelectorAll('source')
    expect(sources[0].srcset).toContain('c_fill,w_400,h_267,f_avif,q_auto')
    expect(sources[1].srcset).toContain('c_fill,w_400,h_267,f_webp,q_auto')
  })

  it('uses medium variant by default', () => {
    const { container } = render(
      <Image publicId="natfest/photo" alt="Photo" />
    )

    const img = container.querySelector('img')
    expect(img.src).toContain('c_limit,w_1200,f_jpg,q_auto')
  })

  it('supports full variant', () => {
    const { container } = render(
      <Image publicId="natfest/photo" alt="Photo" variant="full" />
    )

    const img = container.querySelector('img')
    expect(img.src).toContain('c_limit,w_2400,f_jpg,q_auto')
  })

  it('applies loading="lazy" by default', () => {
    const { container } = render(
      <Image publicId="natfest/photo" alt="Photo" />
    )

    const img = container.querySelector('img')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('supports loading="eager"', () => {
    const { container } = render(
      <Image publicId="natfest/photo" alt="Photo" loading="eager" />
    )

    const img = container.querySelector('img')
    expect(img).toHaveAttribute('loading', 'eager')
  })

  it('passes width and height attributes to the img element', () => {
    const { container } = render(
      <Image publicId="natfest/photo" alt="Photo" width={400} height={267} />
    )

    const img = container.querySelector('img')
    expect(img).toHaveAttribute('width', '400')
    expect(img).toHaveAttribute('height', '267')
  })

  it('shows a placeholder when the image fails to load', () => {
    const { container } = render(
      <Image publicId="natfest/broken" alt="Broken image" />
    )

    const img = container.querySelector('img')
    fireEvent.error(img)

    // Should now show placeholder
    const placeholder = container.querySelector('[role="img"]')
    expect(placeholder).toBeInTheDocument()
    expect(placeholder).toHaveAttribute('aria-label', 'Broken image')
  })

  it('shows a custom fallback image when provided and image fails', () => {
    const { container } = render(
      <Image
        publicId="natfest/broken"
        alt="Broken image"
        fallback="/placeholder.jpg"
      />
    )

    const img = container.querySelector('img')
    fireEvent.error(img)

    const fallbackImg = container.querySelector('img')
    expect(fallbackImg).toHaveAttribute('src', '/placeholder.jpg')
    expect(fallbackImg).toHaveAttribute('alt', 'Broken image')
  })

  it('includes the cloud name from environment in URLs', () => {
    const { container } = render(
      <Image publicId="natfest/photo" alt="Photo" />
    )

    const img = container.querySelector('img')
    expect(img.src).toContain('res.cloudinary.com/test-cloud')
  })
})
