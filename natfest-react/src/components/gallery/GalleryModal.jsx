import { useRef, useEffect, useCallback, useState } from 'react'
import useFocusTrap from '../../hooks/useFocusTrap'
import { buildCloudinaryUrl } from '../../lib/cloudinary'
import styles from '../../styles/Gallery.module.css'

/**
 * GalleryModal - Full-screen image lightbox with keyboard navigation.
 *
 * Displays a full-resolution Cloudinary image with prev/next navigation
 * and accessible focus management. Falls back to medium variant on error.
 *
 * @param {object} props
 * @param {Array<{id: string, publicId: string, alt: string, category?: string}>} props.images
 * @param {number} props.currentIndex
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {() => void} props.onPrev
 * @param {() => void} props.onNext
 */
function GalleryModal({ images, currentIndex, isOpen, onClose, onPrev, onNext }) {
  const modalRef = useRef(null)
  const triggerRef = useRef(null)
  const [imageError, setImageError] = useState(false)
  const [fallbackError, setFallbackError] = useState(false)

  // Activate focus trap when modal is open
  useFocusTrap(modalRef, isOpen)

  // Store the triggering element and manage focus + body scroll
  useEffect(() => {
    if (isOpen) {
      // Store the element that triggered the modal
      triggerRef.current = document.activeElement

      // Disable background scroll
      document.body.style.overflow = 'hidden'

      // Move focus into the modal after a brief tick (to allow render)
      requestAnimationFrame(() => {
        if (modalRef.current) {
          const closeBtn = modalRef.current.querySelector('[data-close-btn]')
          if (closeBtn) {
            closeBtn.focus()
          }
        }
      })
    } else {
      // Re-enable background scroll
      document.body.style.overflow = ''

      // Return focus to the triggering element
      if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus()
      }
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Reset error state when image changes
  useEffect(() => {
    setImageError(false)
    setFallbackError(false)
  }, [currentIndex])

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault()
          onClose()
          break
        case 'ArrowLeft':
          event.preventDefault()
          onPrev()
          break
        case 'ArrowRight':
          event.preventDefault()
          onNext()
          break
        default:
          break
      }
    },
    [onClose, onPrev, onNext]
  )

  // Handle click on the backdrop (close modal)
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  // Image error handlers
  function handleFullResError() {
    setImageError(true)
  }

  function handleFallbackError() {
    setFallbackError(true)
  }

  if (!isOpen || !images || images.length === 0) {
    return null
  }

  const currentImage = images[currentIndex]
  if (!currentImage) return null

  const fullUrl = buildCloudinaryUrl(currentImage.publicId, 'full')
  const mediumUrl = buildCloudinaryUrl(currentImage.publicId, 'medium')

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery viewer"
      ref={modalRef}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        {/* Close button */}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close gallery"
          data-close-btn
          type="button"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        {/* Previous navigation */}
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={onPrev}
          aria-label="Previous image"
          type="button"
        >
          <span aria-hidden="true">&#8249;</span>
        </button>

        {/* Image display area */}
        <div className={styles.imageContainer}>
          {!imageError && !fallbackError && (
            <img
              src={fullUrl}
              alt={currentImage.alt || ''}
              className={styles.image}
              onError={handleFullResError}
            />
          )}
          {imageError && !fallbackError && (
            <img
              src={mediumUrl}
              alt={currentImage.alt || ''}
              className={styles.image}
              onError={handleFallbackError}
            />
          )}
          {imageError && fallbackError && (
            <div className={styles.errorPlaceholder} role="img" aria-label={currentImage.alt || 'Image unavailable'}>
              <span className={styles.errorIcon} aria-hidden="true">&#128247;</span>
              <span>Image unavailable</span>
            </div>
          )}
        </div>

        {/* Next navigation */}
        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={onNext}
          aria-label="Next image"
          type="button"
        >
          <span aria-hidden="true">&#8250;</span>
        </button>
      </div>
    </div>
  )
}

export default GalleryModal
