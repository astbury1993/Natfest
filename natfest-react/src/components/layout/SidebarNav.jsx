import React from 'react'
import { useRef, useEffect, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import useFocusTrap from '../../hooks/useFocusTrap'
import { NAV_LINKS } from '../../lib/constants'
import styles from '../../styles/SidebarNav.module.css'

/**
 * Mobile sidebar navigation overlay.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Whether the sidebar is visible
 * @param {function} props.onClose - Handler to close the sidebar
 * @param {React.RefObject} props.triggerRef - Ref to the hamburger button (focus returns here on close)
 */
function SidebarNav({ isOpen, onClose, triggerRef }) {
  const sidebarRef = useRef(null)
  const closeButtonRef = useRef(null)

  // Activate focus trap when sidebar is open
  useFocusTrap(sidebarRef, isOpen)

  // Move focus to close button when sidebar opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [isOpen])

  // Return focus to trigger button when sidebar closes
  const handleClose = useCallback(() => {
    onClose()
    // Use requestAnimationFrame to ensure focus returns after DOM updates
    requestAnimationFrame(() => {
      if (triggerRef && triggerRef.current) {
        triggerRef.current.focus()
      }
    })
  }, [onClose, triggerRef])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleClose])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
        aria-hidden="true"
        onClick={handleClose}
      />

      {/* Sidebar panel */}
      <nav
        ref={sidebarRef}
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
      >
        <button
          ref={closeButtonRef}
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close navigation menu"
          type="button"
        >
          ✕
        </button>

        <ul className={styles.navList}>
          {NAV_LINKS.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
                onClick={handleClose}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default SidebarNav
