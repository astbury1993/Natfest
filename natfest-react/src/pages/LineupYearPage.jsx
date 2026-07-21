import { useParams, Link } from 'react-router-dom'
import useSanityQuery from '../hooks/useSanityQuery'
import StageSection from '../components/lineup/StageSection'
import styles from '../styles/LineupYearPage.module.css'

// Years that display a poster image instead of individual acts
const POSTER_YEARS = {
  2025: 'Natfest-2025_i5jt6u',
}

function LineupYearPage() {
  const { year } = useParams()
  const yearNum = Number(year)

  // If this year has a poster, show it directly
  if (POSTER_YEARS[yearNum]) {
    const publicId = POSTER_YEARS[yearNum]
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const posterUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`

    return (
      <div className={styles.page}>
        <h1 className={styles.heading}>Lineup {year}</h1>
        <Link to="/lineup" className={styles.backLink}>
          ← Back to all lineups
        </Link>
        <div className={styles.posterContainer}>
          <img
            src={posterUrl}
            alt={`Natfest ${year} lineup poster`}
            className={styles.posterImage}
            loading="eager"
          />
        </div>
      </div>
    )
  }

  const { data, loading, error } = useSanityQuery(
    `*[_type == "act" && year == ${year}] | order(performanceOrder asc) { _id, name, description, "imageUrl": image.asset->url, stage, year, performanceOrder, isHeadliner, links }`
  )

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.heading}>Lineup {year}</h1>
        <p className={styles.loadingText}>Loading lineup...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.page}>
        <h1 className={styles.heading}>Lineup {year}</h1>
        <p className={styles.errorText}>
          Unable to load the lineup. Please try again later.
        </p>
      </div>
    )
  }

  // Handle empty lineup
  if (!data || data.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.heading}>Lineup {year}</h1>
        <p className={styles.notAnnounced}>
          The {year} lineup has not yet been announced. Check back soon!
        </p>
        <Link to="/lineup" className={styles.backLink}>
          ← Back to all lineups
        </Link>
      </div>
    )
  }

  // Group acts by stage
  const stageOrder = ['Main Stage', 'Marquee Stage']
  const groupedByStage = stageOrder
    .map((stageName) => ({
      stageName,
      acts: data.filter((act) => act.stage === stageName),
    }))
    .filter((group) => group.acts.length > 0)

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Lineup {year}</h1>
      <Link to="/lineup" className={styles.backLink}>
        ← Back to all lineups
      </Link>
      <div className={styles.stages}>
        {groupedByStage.map((group) => (
          <StageSection
            key={group.stageName}
            stageName={group.stageName}
            acts={group.acts}
          />
        ))}
      </div>
    </div>
  )
}

export default LineupYearPage
