import React from 'react'
import { useState } from 'react'
import styles from '../../styles/Image.module.css'

/**
 * Builds a Cloudinary URL with a specific format override.
 * Replaces f_auto with the given format (f_webp, f_avif, f_jpg).
 */
function buildUrlWithFormat(publicId, variant, format) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

  const TRANSFORMS = {
    thumbnail: 'c_fill,w_400,h_267',
    medium: 'c_limit,w_1200',
    full: 'c_limit,w_2400',
  }

  const base = TRANSFORMS[variant] || TRANSFORMS.medium
  const transform = `${base},f_${format},q_auto`
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${publicId}`
}

/**
 * Image component that renders a <picture> element with Cloudinary-optimised
 * WebP/AVIF sources and a JPEG fallback. Shows a placeholder on error.
 *
 * @param {object} props
 * @param {string} props.publicId - Cloudinary public ID
 * @param {string} props.alt - Alt text for accessibility
 * @param {number} [props.width] - Image width attribute
 * @param {number} [props.height] - Image height attribute
 * @param {'thumbnail' | 'medium' | 'full'} [props.variant='medium'] - Size variant
 * @param {'lazy' | 'eager'} [props.loading='lazy'] - Loading strategy
 * @param {string} [props.fallback] - Custom fallback/placeholder image URL
 * @param {string} [props.className] - Additional CSS class for the container
 */
function Image({
  publicId,
  alt,
  width,
  height,
  variant = 'medium',
  loading = 'lazy',
  fallback,
  className,
}) {
  const [hasError, setHasError] = useState(false)

  const avifSrc = buildUrlWithFormat(publicId, variant, 'avif')
  const webpSrc = buildUrlWithFormat(publicId, variant, 'webp')
  const jpgSrc = buildUrlWithFormat(publicId, variant, 'jpg')

  function handleError() {
    setHasError(true)
  }

  if (hasError) {
    return (
      <div
        className={`${styles.placeholder} ${className || ''}`}
        role="img"
        aria-label={alt}
        style={{ width: width || undefined, height: height || undefined }}
      >
        {fallback ? (
          <img
            src={fallback}
            alt={alt}
            className={styles.fallbackImage}
            width={width}
            height={height}
          />
        ) : (
          <span className={styles.placeholderIcon} aria-hidden="true">
            &#128247;
          </span>
        )}
      </div>
    )
  }

  return (
    <picture className={className || undefined}>
      <source srcSet={avifSrc} type="image/avif" />
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={jpgSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onError={handleError}
        className={styles.image}
      />
    </picture>
  )
}

export default Image
