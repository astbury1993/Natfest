import { useState } from 'react'
import FaqItem from './FaqItem'
import styles from '../../styles/FaqAccordion.module.css'

/**
 * FaqAccordion — manages open/closed state for multiple FAQ items.
 * Multiple items can be open simultaneously.
 * All items are collapsed by default.
 *
 * @param {{ items: Array<{ _id: string, question: string, answer: Array, order: number }> }} props
 */
function FaqAccordion({ items }) {
  const [openIds, setOpenIds] = useState(new Set())

  function handleToggle(id) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <FaqItem
          key={item._id}
          id={item._id}
          question={item.question}
          answer={item.answer}
          isOpen={openIds.has(item._id)}
          onToggle={() => handleToggle(item._id)}
        />
      ))}
    </div>
  )
}

export default FaqAccordion
