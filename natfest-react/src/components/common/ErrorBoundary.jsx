import React from 'react'
import { Component } from 'react'
import styles from './ErrorBoundary.module.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer} role="alert">
          <div className={styles.errorCard}>
            <div className={styles.errorIcon} aria-hidden="true">
              ⚠️
            </div>
            <h2 className={styles.errorHeading}>Something went wrong</h2>
            <p className={styles.errorMessage}>
              Sorry, an unexpected error occurred while loading this page. Please
              try reloading.
            </p>
            <button
              className={styles.reloadButton}
              onClick={this.handleReload}
              type="button"
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
