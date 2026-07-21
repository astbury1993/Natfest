import React from 'react'
import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../../lib/constants'
import styles from '../../styles/Header.module.css'

function Navigation({ className }) {
  return (
    <nav className={className} aria-label="Main navigation">
      <ul className={styles.navList}>
        {NAV_LINKS.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
