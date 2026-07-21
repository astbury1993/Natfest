import React from 'react'
import Image from '../common/Image'
import styles from '../../styles/GalleryGrid.module.css'

/**
 * Responsive grid of gallery image thumbnails with infinite scroll sentinel.
 *
 * @param {object} props
 * @param {Array} props.images - Array of gallery image objects to display
 * @param {boolean} props.hasMore - Whether more images are available to load
 * @param {React.RefObject} props.sentinelRef - Ref for the IntersectionObserver sentinel element
 * @param {function} props.onSelect - Callback when an image is clicked, receives the image index
 */
function GalleryGrid({ images, hasMore, sentinelRef, onSelect }) {
  if (!images || images.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No images found for this category.</p>
      </div>
    )
  }

  return (
    <div className={styles.grid} role="list" aria-label="Gallery images">
      {images.map((image, index) => (
        <button
          key={image._id}
          className={styles.gridItem}
          onClick={() => onSelect(index)}
          type="button"
          role="listitem"
          aria-label={image.alt || image.title || `Gallery image ${index + 1}`}
        >
          <Image
            publicId={image.cloudinaryPublicId}
            alt={image.alt || image.title || ''}
            variant="thumbnail"
            loading="lazy"
            width={400}
            height={267}
            className={styles.thumbnail}
          />
        </button>
      ))}

      {/* Sentinel element for infinite scroll */}
      {hasMore && (
        <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      )}
    </div>
  )
}

export default GalleryGrid
