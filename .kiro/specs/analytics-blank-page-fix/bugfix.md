# Bugfix Requirements Document

## Introduction

After implementing the AnalyticsContext and GA4 integration (task 9.1), the Natfest React app renders a blank page with only the yellow background colour visible. No React components mount into the `<div id="root">` element. The root cause is `sanityClient.js` crashing at module load time when `VITE_SANITY_PROJECT_ID` contains invalid characters (underscores in the placeholder value), which prevents the entire import chain from resolving and crashes React's initial render.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN `VITE_SANITY_PROJECT_ID` is set to a placeholder value containing underscores (e.g. `your_sanity_project_id`) THEN the system crashes at module load time with an unhandled error from `@sanity/client` (`projectId can only contain only a-z, 0-9 and dashes`), preventing the entire React app from rendering

1.2 WHEN `VITE_SANITY_PROJECT_ID` is missing or empty THEN the system crashes at module load time because `createClient` requires a `projectId` parameter, preventing the entire React app from rendering

### Expected Behavior (Correct)

2.1 WHEN `VITE_SANITY_PROJECT_ID` is set to an invalid value (contains characters other than a-z, 0-9, dashes) THEN the system SHALL gracefully skip Sanity client initialisation, export a null client, and allow the React app to render without CMS data

2.2 WHEN `VITE_SANITY_PROJECT_ID` is missing or empty THEN the system SHALL gracefully skip Sanity client initialisation, export a null client, and allow the React app to render without CMS data

### Unchanged Behavior (Regression Prevention)

3.1 WHEN `VITE_SANITY_PROJECT_ID` is a valid Sanity project ID (only a-z, 0-9, dashes) THEN the system SHALL CONTINUE TO create a properly configured Sanity client and fetch CMS data normally

3.2 WHEN the Sanity client is null (due to missing/invalid config) THEN `useSanityQuery` SHALL CONTINUE TO return `{ data: null, loading: false, error: null }` without throwing, and components using it (e.g. LineupBanner) SHALL CONTINUE TO handle null/empty data gracefully
