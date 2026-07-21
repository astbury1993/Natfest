import useSanityQuery from '../hooks/useSanityQuery'
import styles from '../styles/VendorsPage.module.css'

const VENDORS_QUERY = `*[_type == "vendor"] | order(category asc, name asc) {
  _id,
  name,
  description,
  category,
  "imageUrl": image.asset->url
}`

/**
 * Groups an array of vendors by their category field.
 * @param {Array} vendors
 * @returns {Object} e.g. { Bar: [...], Food: [...] }
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
 * Uses an alternating image-text layout mirroring the original static page.
 *
 * States handled:
 * - Loading: skeleton/spinner indicator
 * - Error: friendly fallback message
 * - Empty: message when no vendors are available yet
 * - Success: vendors grouped by category with alternating layout
 */
function VendorsPage() {
  const { data, loading, error } = useSanityQuery(VENDORS_QUERY)

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

  if (!data || data.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.pageHeading}>Vendors</h1>
        <div className={styles.emptyState}>
          <p>Vendors will be announced soon — stay tuned!</p>
        </div>
      </div>
    )
  }

  const grouped = groupByCategory(data)
  const categories = Object.keys(grouped)

  return (
    <div className={styles.page}>
      <h1 className={styles.pageHeading}>Vendors</h1>

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

      <p className={styles.moreAnnouncement}>...plus many more to be announced!</p>
    </div>
  )
}

export default VendorsPage
