import { useState } from 'react'
import GalleryFilter from '../components/gallery/GalleryFilter'
import GalleryGrid from '../components/gallery/GalleryGrid'
import useGallery from '../hooks/useGallery'
import styles from '../styles/GalleryPage.module.css'

/**
 * Gallery page with category filtering, infinite scroll pagination,
 * and error/retry handling.
 *
 * Manages selectedImageIndex state for future modal integration (task 7.3).
 */
function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)

  const { images, loading, error, hasMore, retry, sentinelRef } = useGallery(activeCategory)

  function handleCategoryChange(category) {
    setActiveCategory(category)
    setSelectedImageIndex(null)
  }

  function handleImageSelect(index) {
    setSelectedImageIndex(index)
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Gallery</h1>

      <GalleryFilter
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {loading && (
        <div className={styles.loadingContainer} aria-live="polite">
          <p className={styles.loadingText}>Loading gallery...</p>
        </div>
      )}

      {error && (
        <div className={styles.errorContainer} role="alert">
          <p className={styles.errorMessage}>
            Unable to load gallery images. Please try again.
          </p>
          {retry && (
            <button
              className={styles.retryButton}
              onClick={retry}
              type="button"
            >
              Retry
            </button>
          )}
        </div>
      )}

      {!loading && !error && (
        <GalleryGrid
          images={images}
          hasMore={hasMore}
          sentinelRef={sentinelRef}
          onSelect={handleImageSelect}
        />
      )}
    </div>
  )
}

export default GalleryPage
