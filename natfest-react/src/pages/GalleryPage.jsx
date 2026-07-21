import React from 'react'
import { useState } from 'react'
import GalleryFilter from '../components/gallery/GalleryFilter'
import GalleryGrid from '../components/gallery/GalleryGrid'
import GalleryLightbox from '../components/gallery/GalleryLightbox'
import useGallery from '../hooks/useGallery'
import styles from '../styles/GalleryPage.module.css'

const YEARS = [2026, 2025]

/**
 * Gallery page with year toggle, category filtering, infinite scroll pagination,
 * and error/retry handling.
 */
function GalleryPage() {
  const [activeYear, setActiveYear] = useState(2026)
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)

  const { images, allImages, loading, error, hasMore, retry, sentinelRef } = useGallery(activeCategory, activeYear)

  function handleYearChange(year) {
    setActiveYear(year)
    setActiveCategory('All')
    setSelectedImageIndex(null)
  }

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

      <div className={styles.yearToggle} role="group" aria-label="Gallery year">
        {YEARS.map((year) => (
          <button
            key={year}
            className={`${styles.yearButton} ${activeYear === year ? styles.yearActive : ''}`}
            onClick={() => handleYearChange(year)}
            aria-pressed={activeYear === year}
            type="button"
          >
            {year}
          </button>
        ))}
      </div>

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

      {selectedImageIndex !== null && allImages.length > 0 && (
        <GalleryLightbox
          images={allImages}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onPrev={() => setSelectedImageIndex((i) => Math.max(0, i - 1))}
          onNext={() => setSelectedImageIndex((i) => Math.min(allImages.length - 1, i + 1))}
        />
      )}
    </div>
  )
}

export default GalleryPage
