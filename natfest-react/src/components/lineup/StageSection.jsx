import React from 'react'
import ActCard from './ActCard'
import styles from '../../styles/StageSection.module.css'

function StageSection({ stageName, acts }) {
  // Sort: headliners first (maintaining CMS performanceOrder within each group)
  const headliners = acts.filter((act) => act.isHeadliner)
  const supporting = acts.filter((act) => !act.isHeadliner)

  return (
    <section className={styles.stageSection} aria-labelledby={`stage-${stageName}`}>
      <h2 id={`stage-${stageName}`} className={styles.stageHeading}>
        {stageName}
      </h2>
      {headliners.length > 0 && (
        <div className={styles.headliners}>
          {headliners.map((act) => (
            <ActCard key={act._id} act={act} isHeadliner />
          ))}
        </div>
      )}
      {supporting.length > 0 && (
        <div className={styles.supporting}>
          {supporting.map((act) => (
            <ActCard key={act._id} act={act} />
          ))}
        </div>
      )}
    </section>
  )
}

export default StageSection
