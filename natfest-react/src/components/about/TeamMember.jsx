import React from 'react'
import styles from '../../styles/TeamMember.module.css'

/**
 * Individual team member card with alternating left-right layout.
 * Odd-indexed members (1st, 3rd, 5th...) show image left, text right.
 * Even-indexed members (2nd, 4th, 6th...) show image right, text left.
 *
 * Props:
 *  - name: string
 *  - bio: string
 *  - photoUrl: string (image URL from Sanity)
 *  - index: number (0-based position in the list)
 */
function TeamMember({ name, bio, photoUrl, index }) {
  // index is 0-based; requirement says odd-numbered profiles (1st, 3rd) = image left
  // So 0-based even indices = image left, 0-based odd indices = image right
  const isImageLeft = index % 2 === 0

  return (
    <article
      className={`${styles.member} ${isImageLeft ? styles.imageLeft : styles.imageRight}`}
    >
      <div className={styles.imageWrapper}>
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`Photo of ${name}`}
            className={styles.photo}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder} aria-label={`No photo available for ${name}`}>
            <span aria-hidden="true">📷</span>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.bio}>{bio}</p>
      </div>
    </article>
  )
}

export default TeamMember
