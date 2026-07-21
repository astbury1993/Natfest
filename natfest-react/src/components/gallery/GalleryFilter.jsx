import styles from '../../styles/GalleryFilter.module.css'

const CATEGORIES = ['All', 'Acts', 'Crowd']

/**
 * Filter buttons for gallery categories.
 * Renders a button group with active state highlighting.
 *
 * @param {object} props
 * @param {string} props.activeCategory - Currently selected category
 * @param {function} props.onCategoryChange - Callback when a category is selected
 */
function GalleryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className={styles.filterGroup} role="group" aria-label="Gallery category filter">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className={`${styles.filterButton} ${activeCategory === category ? styles.active : ''}`}
          onClick={() => onCategoryChange(category)}
          aria-pressed={activeCategory === category}
          type="button"
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default GalleryFilter
