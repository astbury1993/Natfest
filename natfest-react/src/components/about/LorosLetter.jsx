import React from 'react'
import { useState } from 'react'
import styles from '../../styles/LorosLetter.module.css'

/**
 * Renders a block of Sanity rich text (array of blocks) as paragraphs.
 * Extracts text from children spans for simple rendering.
 */
function renderBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return null
  return blocks.map((block, index) => {
    if (block._type === 'block' && block.children) {
      const text = block.children
        .map((child) => child.text || '')
        .join('')
      return <p key={block._key || index}>{text}</p>
    }
    return null
  })
}

/**
 * LOROS letter component with first paragraph visible and
 * expand/collapse toggle for the full content.
 *
 * Props:
 *  - intro: string (first paragraph text)
 *  - fullContent: array of Sanity block objects (rich text)
 */
function LorosLetter({ intro, fullContent }) {
  const [expanded, setExpanded] = useState(false)
  const contentId = 'loros-letter-full-content'

  return (
    <section className={styles.letter} aria-labelledby="loros-letter-heading">
      <h2 id="loros-letter-heading" className={styles.heading}>
        A Letter from LOROS
      </h2>

      <div className={styles.introWrapper}>
        <p className={styles.intro}>{intro}</p>
      </div>

      <div
        id={contentId}
        className={styles.fullContent}
        hidden={!expanded}
      >
        {renderBlocks(fullContent)}
      </div>

      <button
        className={styles.toggleButton}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-controls={contentId}
      >
        {expanded ? 'Read less' : 'Read more'}
      </button>
    </section>
  )
}

export default LorosLetter
