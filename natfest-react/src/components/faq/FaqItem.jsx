import styles from '../../styles/FaqItem.module.css'

/**
 * Renders Sanity block content as simple paragraphs.
 * Extracts text from children spans within each block.
 */
function renderBlockContent(blocks) {
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
 * FaqItem — individual FAQ with accessible expand/collapse behavior.
 * Uses aria-expanded and aria-controls for screen reader support.
 * The hidden attribute hides the answer from both visual display and assistive tech.
 *
 * @param {{ id: string, question: string, answer: Array, isOpen: boolean, onToggle: function }} props
 */
function FaqItem({ id, question, answer, isOpen, onToggle }) {
  const panelId = `faq-panel-${id}`
  const buttonId = `faq-button-${id}`

  return (
    <div className={styles.item}>
      <h3 className={styles.heading}>
        <button
          id={buttonId}
          className={styles.trigger}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className={styles.questionText}>{question}</span>
          <span className={styles.icon} aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={styles.panel}
        hidden={!isOpen || undefined}
      >
        <div className={styles.panelContent}>
          {renderBlockContent(answer)}
        </div>
      </div>
    </div>
  )
}

export default FaqItem
