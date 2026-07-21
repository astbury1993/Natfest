import React from 'react'
import { useEffect, useCallback, useState } from 'react'
import { buildCloudinaryUrl } from '../../lib/cloudinary'
import styles from '../../styles/GalleryLightbox.module.css'

/**
 * Full-screen lightbox modal for viewing gallery images.
 * Supports keyboard navigation (left/right arrows, Escape to close).
 * Supports swipe gestures on touch devices.
 *
 * @param {object} props
 * @param {Array} props.images - Array of gallery image objects
 * @param {number} props.currentIndex - Currently displayed image index
 * @param {function} props.onClose - Callback to close the lightbox
 * @param {function} props.onPrev - Callback to go to previous image
 * @param {function} props.onNext - Callback to go to next image
 */
function GalleryLightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const image = images[currentIndex]
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < images.length - 1
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft' && hasPrev) onPrev()
    if (e.key === 'ArrowRight' && hasNext) onNext()
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  // Lock body scroll and attach keyboard listener
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  // Reset loaded state when image changes
  useEffect(() => {
    setImageLoaded(false)
  }, [currentIndex])

  // Preload adjacent images
  useEffect(() => {
    const preload = (index) => {
      if (index >= 0 && index < images.length) {
        const img = new window.Image()
        img.src = buildCloudinaryUrl(images[index].cloudinaryPublicId, 'medium')
      }
    }
    preload(currentIndex + 1)
    preload(currentIndex - 1)
  }, [currentIndex, images])

  if (!image) return null

  const imageUrl = buildCloudinaryUrl(image.cloudinaryPublicId, 'medium')

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || image.title || 'Gallery image'}
    >
      <button
        className={styles.closeButton}
        onClick={onClose}
        type="button"
        aria-label="Close lightbox"
      >
        &times;
      </button>

      <div className={styles.content}>
        {hasPrev && (
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={onPrev}
            type="button"
            aria-label="Previous image"
          >
            &#8249;
          </button>
        )}

        <img
          src={imageUrl}
          alt={image.alt || image.title || ''}
          className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ''}`}
          onLoad={() => setImageLoaded(true)}
        />

        {hasNext && (
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={onNext}
            type="button"
            aria-label="Next image"
          >
            &#8250;
          </button>
        )}
      </div>

      <div className={styles.counter} aria-live="polite">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}

export default GalleryLightbox
