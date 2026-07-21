# Implementation Plan: Natfest React Rebuild

## Overview

Rebuild the Natfest charity festival website from static HTML/CSS/JS into a modern React SPA using Vite, React Router v6, Sanity CMS, Cloudinary image hosting, and UK-compliant cookie consent. The implementation follows an incremental approach: scaffolding first, then shared layout, then individual features, then cross-cutting concerns (accessibility, analytics, performance), then testing and CI/CD.

## Tasks

- [x] 1. Project scaffolding and configuration
  - [x] 1.1 Initialize Vite + React project
    - Run `npm create vite@latest natfest-react -- --template react`
    - Install core dependencies: `react-router-dom`, `@sanity/client`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `msw`, `fast-check`
    - Create `vite.config.js` with React plugin and Vitest configuration
    - Create `.env.example` with placeholders for `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_GA_MEASUREMENT_ID`
    - Create `public/_redirects` with `/* /index.html 200` for SPA fallback
    - Set up directory structure as defined in design: `src/components/`, `src/pages/`, `src/hooks/`, `src/context/`, `src/lib/`, `src/styles/`, `src/assets/`
    - _Requirements: 1.1, 1.4_

  - [x] 1.2 Configure global styles and CSS custom properties
    - Create `src/styles/global.css` with CSS reset, custom properties (colours, spacing, typography), and base typography rules using Quicksand font family (400, 700 weights)
    - Add `rel="preload"` link for Quicksand font in `index.html`
    - Define responsive breakpoint variables (768px mobile/desktop threshold)
    - _Requirements: 1.5, 5.1, 5.8, 6.5_

  - [x] 1.3 Set up constants and utility modules
    - Create `src/lib/constants.js` with `EVENT_DATE` (ISO 8601), site metadata, and navigation link definitions
    - Create `src/lib/sanityClient.js` with configured Sanity client using environment variables
    - Create `src/lib/cloudinary.js` with URL builder function supporting thumbnail/medium/full variants and `f_auto,q_auto` parameters
    - Create `src/lib/analytics.js` with GA4 helper functions (`initGA`, `trackPageView`, `trackEvent`) that check consent before firing
    - _Requirements: 3.1, 7.7, 10.1, 10.2_

- [x] 2. Shared layout components
  - [x] 2.1 Create Layout shell with React Router outlet
    - Create `src/components/layout/Layout.jsx` wrapping Header, secondary header (CountdownTimer + LineupBanner), `<main><Outlet /></main>`, Footer, and CookieBanner
    - Create `src/components/common/SkipLink.jsx` rendering "Skip to main content" link visible on focus, targeting `<main id="main-content">`
    - Set up `src/App.jsx` with React Router v6 `createBrowserRouter` and route definitions for all pages
    - Create `src/main.jsx` entry point wrapping App with CookieConsentContext and AnalyticsContext providers
    - _Requirements: 1.1, 1.2, 1.4, 5.3, 5.5, 5.9_

  - [x] 2.2 Implement Header and Navigation components
    - Create `src/components/layout/Header.jsx` rendering logo, social badge links (Facebook, Instagram), and desktop Navigation
    - Create `src/components/layout/Navigation.jsx` using `NavLink` with `aria-current="page"` for active state styling
    - Create `src/styles/Header.module.css` with responsive styles: show nav + hide hamburger at ≥768px, hide nav + show hamburger at <768px
    - Hamburger button with `aria-label` and `aria-expanded` attributes, operable via Enter/Space
    - _Requirements: 2.1, 2.2, 2.6, 2.7, 5.2, 5.3_

  - [x] 2.3 Implement SidebarNav with focus trapping
    - Create `src/components/layout/SidebarNav.jsx` receiving `isOpen` and `onClose` props
    - Create `src/hooks/useFocusTrap.js` hook that traps Tab/Shift+Tab within the sidebar when open
    - Implement Escape key handler to close sidebar and return focus to hamburger button
    - CSS transition with `transform: translateX()` for slide-in animation
    - Move focus to first link on open; return focus to trigger on close
    - _Requirements: 2.3, 2.4, 2.5, 5.9_

  - [x] 2.4 Implement Footer component
    - Create `src/components/layout/Footer.jsx` with links to Privacy Policy, Cookie Policy, Instagram, Facebook
    - LOROS charity logo with descriptive alt text, linking to https://www.loros.co.uk/ with `target="_blank" rel="noopener noreferrer"`
    - All external links open in new tab with `rel="noopener noreferrer"`
    - Minimum 24×24px touch targets, all links keyboard-focusable
    - Create `src/styles/Footer.module.css`
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

- [x] 3. CountdownTimer and LineupBanner
  - [x] 3.1 Implement CountdownTimer component and useCountdown hook
    - Create `src/hooks/useCountdown.js` with pure calculation function (targetDate, now) → {days, hours, minutes, seconds, isPast} and a `setInterval` at 1000ms
    - Create `src/components/countdown/CountdownTimer.jsx` rendering d/h/m/s or "It's Natfest time!" when past
    - Wrap updating value in `aria-live="polite"` region
    - Create `src/styles/CountdownTimer.module.css`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 5.7_

  - [ ]* 3.2 Write property tests for countdown calculation
    - **Property 1: Countdown calculation correctness** — for any future target date and current date, output values are non-negative with hours<24, minutes<60, seconds<60, and reconstructed ms equals original difference within 999ms
    - **Property 2: Countdown expiry display** — for any current date >= target date, result indicates expiry (isPast=true) with no negative values
    - **Validates: Requirements 3.1, 3.2, 3.3**

  - [x] 3.3 Implement LineupBanner component
    - Create `src/components/banner/LineupBanner.jsx` with duplicated content for seamless CSS animation loop
    - Source act names from CMS via `useSanityQuery` hook (fallback to props)
    - Pause animation on hover and focus (`animation-play-state: paused`)
    - Respect `prefers-reduced-motion`: show static text
    - Mark duplicated elements with `aria-hidden="true"`, container with `role="region"` and `aria-label`
    - Create `src/styles/LineupBanner.module.css` with keyframe animation (10-30s cycle)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.10_

- [x] 4. Sanity CMS setup
  - [x] 4.1 Create Sanity schema definitions
    - Create `sanity/schemas/act.js` with fields: name, description, image, stage, year, performanceOrder, isHeadliner, links (array of URLs, max 5)
    - Create `sanity/schemas/vendor.js` with fields: name, description, category, image
    - Create `sanity/schemas/teamMember.js` with fields: name, bio, photo, displayOrder
    - Create `sanity/schemas/faq.js` with fields: question, answer (rich text block), order
    - Create `sanity/schemas/galleryImage.js` with fields: title, category, cloudinaryPublicId, alt, year, order
    - Create `sanity/schemas/siteSettings.js` with fields: eventDate, lorosLetterIntro, lorosLetterFull, vendorCategories
    - Create `sanity/sanity.config.js` referencing all schemas
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.6, 8.8_

  - [x] 4.2 Implement useSanityQuery hook with caching
    - Create `src/hooks/useSanityQuery.js` — generic hook accepting a GROQ query string, returning `{data, loading, error}`
    - Cache successful responses in `sessionStorage` keyed by query
    - On fetch error or timeout (>5s), return cached data if available
    - If no cache available, return error state with user-friendly message
    - _Requirements: 8.4, 8.7_

- [x] 5. Checkpoint - Core foundation complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Page components — Content pages
  - [x] 6.1 Implement HomePage
    - Create `src/pages/HomePage.jsx` rendering hero section, intro content, and any CMS-driven homepage blocks
    - Lazy-load below-fold images with `loading="lazy"`
    - _Requirements: 1.1, 6.2_

  - [x] 6.2 Implement AboutPage with team members and LOROS letter
    - Create `src/pages/AboutPage.jsx` fetching team members and LOROS letter from Sanity
    - Create `src/components/about/TeamMember.jsx` with alternating left-right layout (odd=image left, even=image right)
    - Create `src/components/about/LorosLetter.jsx` with first paragraph visible, "Read more"/"Read less" toggle, `aria-expanded` attribute
    - Handle CMS unavailability with fallback message
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

  - [x] 6.3 Implement LineupPage and LineupYearPage
    - Create `src/pages/LineupPage.jsx` as landing page with year navigation links (most recent first)
    - Create `src/pages/LineupYearPage.jsx` fetching acts for the selected year from Sanity, grouped by stage
    - Create `src/components/lineup/StageSection.jsx` rendering acts in CMS-defined order with headliners first and visually larger
    - Create `src/components/lineup/ActCard.jsx` displaying name, image, description, external links
    - Handle empty lineup with "not yet announced" message; missing image with placeholder
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

  - [x] 6.4 Implement VendorsPage
    - Create `src/pages/VendorsPage.jsx` fetching vendors from Sanity, grouped/filtered by category
    - _Requirements: 8.2, 1.1_

  - [x] 6.5 Implement FaqsPage with FaqAccordion
    - Create `src/pages/FaqsPage.jsx` fetching FAQ items from Sanity
    - Create `src/components/faq/FaqAccordion.jsx` managing open/closed state for multiple items
    - Create `src/components/faq/FaqItem.jsx` with `<button aria-expanded aria-controls>` for question and `<div id role="region" hidden>` for answer
    - All collapsed by default; multiple can be open simultaneously; Enter/Space toggle; Tab between questions
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

  - [x] 6.6 Implement TicketsPage, PartnersPage, PrivacyPolicyPage, CookiePolicyPage
    - Create `src/pages/TicketsPage.jsx` with ticket link/info content
    - Create `src/pages/PartnersPage.jsx` displaying partner logos/info
    - Create `src/pages/PrivacyPolicyPage.jsx` with static privacy policy content
    - Create `src/pages/CookiePolicyPage.jsx` with cookie policy content and mechanism to change stored cookie preference
    - _Requirements: 1.1, 9.6, 9.7_

- [x] 7. Gallery with Cloudinary integration
  - [x] 7.1 Implement Image utility component
    - Create `src/components/common/Image.jsx` building Cloudinary URLs with appropriate transforms per variant
    - Render `<picture>` with WebP/AVIF sources and JPEG fallback (leveraging Cloudinary `f_auto`)
    - Show placeholder on error; support `loading="lazy"` prop
    - _Requirements: 6.3, 6.6, 7.7_

  - [x] 7.2 Implement GalleryPage with GalleryGrid and filtering
    - Create `src/pages/GalleryPage.jsx` with category filter controls (All, Acts, Crowd) defaulting to "All"
    - Create `src/components/gallery/GalleryFilter.jsx` rendering filter buttons with active state
    - Create `src/components/gallery/GalleryGrid.jsx` using `useGallery` hook for pagination (20 images per batch)
    - Create `src/hooks/useGallery.js` managing pagination state, filtering, IntersectionObserver for infinite scroll, and error/retry logic (up to 3 retries)
    - Category change filters within 500ms; error state shows retry control
    - _Requirements: 7.1, 7.2, 7.8, 7.9_

  - [x] 7.3 Implement GalleryModal with keyboard navigation
    - Create `src/components/gallery/GalleryModal.jsx` with focus trap, Escape to close, ArrowLeft/ArrowRight navigation
    - Display full-resolution Cloudinary image; fall back to medium on error
    - Return focus to triggering thumbnail on close
    - Stay on current image at first/last boundaries
    - Create `src/styles/Gallery.module.css`
    - _Requirements: 7.3, 7.4, 7.5, 7.6, 7.10, 5.9_

  - [ ]* 7.4 Write property tests for gallery logic
    - **Property 3: Cloudinary URL builder produces valid URLs** — for any valid publicId and variant, output URL contains publicId, correct width transform, and matches expected pattern
    - **Property 4: Gallery category filter preserves image set integrity** — filtering by category returns only matching images; "All" returns full list; no duplicates introduced
    - **Property 5: Gallery pagination batch size invariant** — paginating N images with batch size 20 produces ceil(N/20) batches; concatenation reproduces original list
    - **Validates: Requirements 7.7, 7.8, 7.2**

- [x] 8. Cookie consent implementation
  - [x] 8.1 Implement CookieConsentContext and useCookieConsent hook
    - Create `src/context/CookieConsentContext.jsx` providing consent state (unset/accepted/rejected) and actions (accept, reject, revoke)
    - Create `src/hooks/useCookieConsent.js` reading/writing preference cookie with 12-month max expiry
    - On reject or revoke: remove all analytics cookies; on accept: enable analytics
    - _Requirements: 9.3, 9.4, 9.5, 9.7, 9.8_

  - [x] 8.2 Implement CookieBanner component
    - Create `src/components/cookie/CookieBanner.jsx` — visible only when preference is "unset"
    - Two buttons "Accept" and "Reject" with equal visual prominence
    - No pre-ticked options; never auto-dismisses
    - Explain that the site uses cookies for analytics
    - Create `src/styles/CookieBanner.module.css`
    - _Requirements: 9.1, 9.2, 9.9, 9.10_

  - [ ]* 8.3 Write property test for cookie consent state machine
    - **Property 6: Cookie consent state machine consistency** — for any sequence of accept/reject actions, state is always exactly one of "unset"/"accepted"/"rejected"; stored preference matches logical state
    - **Validates: Requirements 9.3, 9.4, 9.5, 9.7, 9.8**

- [x] 9. Analytics integration
  - [x] 9.1 Implement AnalyticsContext and GA4 integration
    - Create `src/context/AnalyticsContext.jsx` that conditionally loads GA4 script (async attribute) only when consent is "accepted"
    - Track page view on every route navigation via React Router listener
    - Support custom events with event name + up to 5 key-value params
    - 5-second timeout: if script fails to load, continue without analytics silently
    - On consent revoke: stop tracking and remove analytics cookies
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [~] 10. Checkpoint - All features implemented
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Accessibility and error handling
  - [x] 11.1 Implement ErrorBoundary component
    - Create `src/components/common/ErrorBoundary.jsx` catching render errors per page
    - Display fallback UI with "Reload page" option
    - Wrap each page route with ErrorBoundary
    - _Requirements: 1.3_

  - [x] 11.2 Accessibility audit and refinements
    - Verify all interactive elements have visible focus indicators (2px outline, 3:1 contrast)
    - Verify all images have appropriate alt text (≤150 chars for informational, empty for decorative)
    - Verify semantic HTML usage (nav, main, header, footer, section)
    - Verify no colour-only information conveyed (additional indicators present)
    - Verify all form controls have accessible labels
    - Test `prefers-reduced-motion` disables animations
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.8, 5.10_

- [x] 12. Performance optimisation
  - [x] 12.1 Implement code splitting and lazy loading
    - Add `React.lazy()` + `Suspense` for each page component in `App.jsx`
    - Configure Vite to split vendor chunks from route-specific bundles
    - Add `rel="preload"` for hero images and fonts in `index.html`
    - Verify all below-fold images use `loading="lazy"`
    - _Requirements: 6.1, 6.2, 6.4, 6.5_

- [ ] 13. Unit testing setup and key test suites
  - [ ]* 13.1 Configure Vitest and testing infrastructure
    - Create `vitest.config.ts` (or configure in `vite.config.js`) with jsdom environment
    - Create test setup file mocking `IntersectionObserver`, `window.matchMedia`
    - Configure MSW handlers for Sanity API mock responses
    - Set up coverage reporting with Istanbul

  - [ ]* 13.2 Write unit tests for layout components
    - Test Header renders nav links and logo; hamburger hidden at ≥768px
    - Test Navigation applies active class and `aria-current` for current route
    - Test SidebarNav focus trap, Escape closes, aria-expanded toggles
    - Test Footer renders all links with correct `target` and `rel` attributes
    - _Requirements: 2.1-2.7, 14.1-14.5_

  - [ ]* 13.3 Write unit tests for interactive components
    - Test CountdownTimer displays correct values and switches to "It's Natfest time!" (fake timers)
    - Test FaqAccordion: all collapsed by default, expand/collapse, multiple open, keyboard navigation
    - Test GalleryModal: open/close, Escape, ArrowKeys, boundary behaviour, fallback image
    - Test CookieBanner: visible when unset, hidden after action, no pre-ticked state
    - Test LineupBanner: reduced motion, aria-hidden on duplicates, pause on hover
    - _Requirements: 3.1-3.5, 7.3-7.6, 9.1-9.10, 11.1-11.6_

  - [ ]* 13.4 Write unit tests for hooks and utility functions
    - Test `useCountdown` returns correct values and cleans up interval
    - Test `useSanityQuery` returns data, handles error with cache fallback
    - Test `useGallery` pagination, filtering, retry logic
    - Test `useCookieConsent` state transitions and cookie persistence
    - Test Cloudinary URL builder for all variants
    - _Requirements: 3.1, 7.2, 7.7, 7.8, 8.7, 9.3-9.8_

- [ ] 14. CI/CD pipeline setup
  - [~] 14.1 Create GitHub Actions workflow
    - Create `.github/workflows/ci.yml` that runs on pull requests
    - Steps: checkout, install (`npm ci`), lint, run `vitest --run --coverage`, fail on test failure or coverage drop
    - Upload coverage report as workflow artefact
    - _Requirements: 6.4_

  - [~] 14.2 Configure deployment
    - Create `netlify.toml` or `vercel.json` with build command (`npm run build`), publish directory (`dist`), and SPA redirect rules
    - Verify existing CNAME is configured for custom domain
    - _Requirements: 1.4_

- [~] 15. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The Sanity Studio (task 4.1) can be deployed separately or as part of the same repo — this plan keeps schemas in a `sanity/` folder at project root
- Environment variables must be set before CMS/Cloudinary features work locally — use `.env.example` as a guide

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["2.1", "4.1"] },
    { "id": 3, "tasks": ["2.2", "2.3", "2.4", "4.2"] },
    { "id": 4, "tasks": ["3.1", "3.3", "6.1", "6.4", "6.6"] },
    { "id": 5, "tasks": ["3.2", "6.2", "6.3", "6.5", "7.1"] },
    { "id": 6, "tasks": ["7.2", "7.3", "8.1"] },
    { "id": 7, "tasks": ["7.4", "8.2", "8.3", "9.1"] },
    { "id": 8, "tasks": ["11.1", "11.2", "12.1"] },
    { "id": 9, "tasks": ["13.1", "14.1", "14.2"] },
    { "id": 10, "tasks": ["13.2", "13.3", "13.4"] }
  ]
}
```
