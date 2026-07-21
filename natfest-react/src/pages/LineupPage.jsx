import { Link } from 'react-router-dom'
import useSanityQuery from '../hooks/useSanityQuery'
import styles from '../styles/LineupPage.module.css'

function LineupPage() {
  const { data, loading, error } = useSanityQuery(
    `*[_type == "act"] { year } | order(year desc)`
  )

  // Deduplicate years and sort descending
  const years = data
    ? [...new Set(data.map((item) => item.year))].sort((a, b) => b - a)
    : []

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.heading}>Lineup</h1>
        <p className={styles.loadingText}>Loading lineup years...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.page}>
        <h1 className={styles.heading}>Lineup</h1>
        <p className={styles.errorText}>
          Unable to load lineup information. Please try again later.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Lineup</h1>
      {years.length === 0 ? (
        <p className={styles.emptyText}>No lineup years available yet.</p>
      ) : (
        <nav aria-label="Lineup years" className={styles.yearNav}>
          {years.map((year) => (
            <Link
              key={year}
              to={`/lineup/${year}`}
              className={styles.yearLink}
            >
              {year}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}

export default LineupPage
