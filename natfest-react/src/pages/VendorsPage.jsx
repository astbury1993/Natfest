import React from 'react'
import { useState, useMemo } from 'react'
import useSanityQuery from '../hooks/useSanityQuery'
import styles from '../styles/VendorsPage.module.css'

const VENDORS_QUERY = `*[_type == "vendor"] | order(category asc, name asc) {
  _id,
  name,
  description,
  category,
  year,
  "imageUrl": image.asset->url
}`

/**
 * Groups an array of vendors by their category field.
 */
function groupByCategory(vendors) {
  return vendors.reduce((groups, vendor) => {
    const category = vendor.category || 'Other'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(vendor)
    return groups
  }, {})
}

/**
 * VendorsPage — displays vendors fetched from Sanity CMS, grouped by category.
 * Includes a year toggle defaulting to 2026.
 */
function VendorsPage() {
  const [activeYear, setActiveYear] = useState(2026)
  const { data, loading, error } = useSanityQuery(VENDORS_QUERY)

  // Get available years from the data
  const years = useMemo(() => {
    if (!data) return [2026]
    const uniqueYears = [...new Set(data.map(v => v.year).filter(Boolean))].sort((a, b) => b - a)
    return uniqueYears.length > 0 ? uniqueYears : [2026]
  }, [data])

  // Filter vendors by selected year
  const filteredVendors = useMemo(() => {
    if (!data) return []
    return data.filter(v => v.year === activeYear)
  }, [data, activeYear])

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.pageHeading}>Vendors</h1>
        <div className={styles.loadingState} aria-live="polite">
          <p>Loading vendors...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.page}>
        <h1 className={styles.pageHeading}>Vendors</h1>
        <div className={styles.errorState} role="alert">
          <p>We couldn&apos;t load the vendors right now. Please try again later.</p>
        </div>
      </div>
    )
  }

  const grouped = groupByCategory(filteredVendors)
  const categories = Object.keys(grouped)

  return (
    <div className={styles.page}>
      <h1 className={styles.pageHeading}>Vendors</h1>

      {years.length > 1 && (
        <div className={styles.yearToggle} role="group" aria-label="Vendor year">
          {years.map((year) => (
            <button
              key={year}
              className={`${styles.yearButton} ${activeYear === year ? styles.yearActive : ''}`}
              onClick={() => setActiveYear(year)}
              aria-pressed={activeYear === year}
              type="button"
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {categories.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Vendors will be announced soon — stay tuned!</p>
        </div>
      ) : (
        <>
          {categories.map((category) => (
            <section key={category} className={styles.categorySection}>
              <h2 className={styles.categoryHeading}>{category}</h2>

              {grouped[category].map((vendor, index) => {
                const isReversed = index % 2 !== 0
                const rowClass = isReversed
                  ? `${styles.vendorRow} ${styles.vendorRowReversed}`
                  : styles.vendorRow

                return (
                  <article key={vendor._id} className={rowClass}>
                    {vendor.imageUrl && (
                      <div className={styles.imageWrapper}>
                        <img
                          src={vendor.imageUrl}
                          alt={vendor.name}
                          className={styles.vendorImage}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className={styles.vendorContent}>
                      <h3 className={styles.vendorName}>{vendor.name}</h3>
                      {vendor.description && (
                        <p className={styles.vendorDescription}>{vendor.description}</p>
                      )}
                    </div>
                  </article>
                )
              })}
            </section>
          ))}
        </>
      )}
    </div>
  )
}

export default VendorsPage
