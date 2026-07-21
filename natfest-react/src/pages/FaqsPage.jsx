import React from 'react'
import useSanityQuery from '../hooks/useSanityQuery'
import FaqAccordion from '../components/faq/FaqAccordion'
import styles from '../styles/FaqsPage.module.css'

const FAQS_QUERY = `*[_type == "faq"] | order(order asc) { _id, question, answer, order }`

/**
 * FaqsPage — displays frequently asked questions fetched from Sanity CMS.
 * Renders an accessible accordion for expanding/collapsing answers.
 *
 * States handled:
 * - Loading: polite status message
 * - Error: friendly fallback message
 * - Empty: message when no FAQs are available
 * - Success: FAQ accordion with all items
 */
function FaqsPage() {
  const { data, loading, error } = useSanityQuery(FAQS_QUERY)

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.pageHeading}>FAQs</h1>
        <div className={styles.loadingState} aria-live="polite">
          <p>Loading FAQs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.page}>
        <h1 className={styles.pageHeading}>FAQs</h1>
        <div className={styles.errorState} role="alert">
          <p>We couldn&apos;t load the FAQs right now. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.pageHeading}>FAQs</h1>
        <div className={styles.emptyState}>
          <p>FAQs will be available soon — stay tuned!</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageHeading}>FAQs</h1>
      <FaqAccordion items={data} />
    </div>
  )
}

export default FaqsPage
