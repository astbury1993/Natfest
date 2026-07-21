/**
 * Cloudinary URL builder for gallery images.
 *
 * Supports three responsive variants:
 *   - thumbnail: c_fill,w_400,h_267,f_auto,q_auto (400px)
 *   - medium:    c_limit,w_1200,f_auto,q_auto     (1200px)
 *   - full:      c_limit,w_2400,f_auto,q_auto     (2400px)
 */

const TRANSFORMS = {
  thumbnail: 'c_fill,w_400,h_267,f_auto,q_auto',
  medium: 'c_limit,w_1200,f_auto,q_auto',
  full: 'c_limit,w_2400,f_auto,q_auto',
};

/**
 * Build a full Cloudinary delivery URL for a given public ID and variant.
 *
 * @param {string} publicId - The Cloudinary public ID (e.g. "natfest/gallery/acts/abc123")
 * @param {'thumbnail' | 'medium' | 'full'} variant - The size variant to use
 * @returns {string} The complete Cloudinary URL
 */
export function buildCloudinaryUrl(publicId, variant = 'medium') {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const transform = TRANSFORMS[variant] || TRANSFORMS.medium;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${publicId}`;
}
