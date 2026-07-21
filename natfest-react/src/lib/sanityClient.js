import { createClient } from '@sanity/client';

/**
 * Pre-configured Sanity client for fetching CMS content.
 * Project ID and dataset are read from Vite environment variables.
 *
 * If the environment variables are missing or invalid (e.g. placeholder values),
 * a null client is exported. Consumers (useSanityQuery) should handle null gracefully.
 */
let sanityClient = null;

try {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  if (projectId && /^[a-z0-9-]+$/.test(projectId)) {
    sanityClient = createClient({
      projectId,
      dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
      useCdn: true,
      apiVersion: '2024-01-01',
    });
  }
} catch {
  // Sanity client failed to initialise — app continues without CMS data
}

export default sanityClient;
