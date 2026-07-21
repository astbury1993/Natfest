# Requirements Document

## Introduction

Natfest is a charity music festival website, currently built as a static HTML site. This document captures the requirements for rebuilding the site as a React application with improved performance, accessibility (WCAG AA), UK-compliant cookie consent, a headless CMS for content management, and cloud-based gallery image storage.

## Glossary

- **Application**: The React-based Natfest website serving all public-facing pages
- **CMS**: A headless content management system used by non-technical editors to manage page content
- **Editor**: A non-technical team member who updates content such as lineup acts, vendor details, and about page information
- **Visitor**: Any person browsing the Natfest website
- **Gallery_Service**: The cloud-based image storage and delivery service used for gallery photos
- **Cookie_Banner**: The UI component that collects cookie consent from visitors in compliance with UK PECR regulations
- **Analytics_Service**: The third-party tracking service (e.g. Google Analytics) used to collect visitor behaviour data
- **Navigation**: The responsive site navigation including desktop header nav and mobile sidebar nav
- **Countdown_Timer**: The component displaying days, hours, minutes, and seconds remaining until the festival date
- **Lineup_Banner**: The continuously scrolling horizontal banner displaying act names
- **Gallery_Modal**: The fullscreen overlay for viewing individual gallery images with previous/next navigation
- **FAQ_Accordion**: The expandable/collapsible section for displaying frequently asked questions and answers

## Requirements

### Requirement 1: React Application Foundation

**User Story:** As a developer, I want the website rebuilt as a React single-page application, so that the codebase is modular, maintainable, and supports modern tooling.

#### Acceptance Criteria

1. THE Application SHALL render all existing pages as React components using client-side routing: Home, About Us, Lineup (with sub-pages for 2025 and 2026), Vendors, Gallery, Tickets, FAQs, Our Partners, and Privacy Policy
2. THE Application SHALL use a component-based architecture where shared UI elements (header, footer, countdown timer, scrolling lineup banner, mobile sidebar navigation) are reusable components
3. THE Application SHALL preserve all existing interactive behaviours from the static HTML site, including: the countdown timer updating every 1 second targeting the event date, the FAQ accordion expanding and collapsing answers, the gallery lightbox with previous/next and keyboard navigation, the mobile navigation toggle opening and closing the sidebar, the scrolling lineup banner animation, and active navigation link highlighting based on the current route
4. WHEN a Visitor navigates between pages, THE Application SHALL update the view without a full page reload and SHALL update the browser URL and history so that the back and forward buttons navigate between previously visited pages
5. THE Application SHALL load the Quicksand font family (400 and 700 weights) for consistent typography with the existing site

### Requirement 2: Responsive Navigation

**User Story:** As a visitor, I want clear and accessible navigation on all devices, so that I can find pages easily regardless of my screen size.

#### Acceptance Criteria

1. WHILE the viewport width is 768px or wider, THE Navigation SHALL display a horizontal menu bar with links to all site pages (Home, About Us, Lineup, Vendors, Gallery, Tickets, FAQs, Our Partners) and SHALL hide the hamburger button and sidebar
2. WHILE the viewport width is below 768px, THE Navigation SHALL hide the horizontal menu bar and SHALL display a hamburger button that, when activated, opens a full-viewport-width sidebar menu sliding in from the left edge
3. WHEN a Visitor activates the hamburger button while the sidebar is closed, THE Navigation SHALL open the sidebar, set aria-expanded="true" on the toggle button, and move keyboard focus to the first link in the sidebar
4. WHEN a Visitor activates the hamburger button while the sidebar is open, THE Navigation SHALL close the sidebar, set aria-expanded="false" on the toggle button, and return keyboard focus to the hamburger button
5. WHEN a Visitor presses the Escape key while the sidebar is open, THE Navigation SHALL close the sidebar, set aria-expanded="false" on the toggle button, and return keyboard focus to the hamburger button
6. THE Navigation SHALL highlight the link corresponding to the current page by applying a visually distinct background color and setting the aria-current="page" attribute on that link
7. THE Navigation hamburger button SHALL be operable via keyboard (Enter and Space keys) and SHALL have an accessible label indicating its purpose (e.g., aria-label conveying "Open navigation" or "Close navigation" depending on state)

### Requirement 3: Countdown Timer

**User Story:** As a visitor, I want to see how long until the festival starts, so that I can feel excitement building toward the event day.

#### Acceptance Criteria

1. THE Countdown_Timer SHALL display the remaining days, hours, minutes, and seconds until the target event date and time, where the target date is defined as a single hardcoded value in the site's JavaScript source
2. THE Countdown_Timer SHALL update the displayed values every 1 second
3. WHEN the event date and time has passed (based on the visitor's local system clock), THE Countdown_Timer SHALL display the text "It's Natfest time!" instead of the countdown values and SHALL cease updating
4. THE Countdown_Timer SHALL be rendered on every page of the site within the secondary header area, positioned below the page heading and above the scrolling announcement banner
5. THE Countdown_Timer SHALL calculate remaining time by comparing the visitor's local system clock against the target event date, interpreting the target date in the visitor's local time zone

### Requirement 4: Scrolling Lineup Banner

**User Story:** As a visitor, I want to see the announced acts scrolling across the page, so that I am aware of who is performing.

#### Acceptance Criteria

1. THE Lineup_Banner SHALL continuously scroll a list of act names horizontally using a CSS animation that loops indefinitely with a cycle duration between 10 and 30 seconds
2. THE Lineup_Banner SHALL source act names from the CMS content for the current year lineup, displaying each act name separated by a visible delimiter character
3. WHEN the animation completes one full cycle, THE Lineup_Banner SHALL seamlessly restart by translating duplicated content such that no visible gap or jump occurs between the end and start of the sequence
4. THE Lineup_Banner SHALL include role="region" and aria-label describing it as a scrolling lineup announcement, and mark all duplicated content elements with aria-hidden="true" to prevent screen readers from reading repeated text
5. WHILE the user hovers over or places keyboard focus within the Lineup_Banner, THE Lineup_Banner SHALL pause the scrolling animation
6. IF the user has enabled prefers-reduced-motion in their operating system settings, THEN THE Lineup_Banner SHALL disable the scrolling animation and display the act names statically

### Requirement 5: WCAG AA Accessibility Compliance

**User Story:** As a visitor with a disability, I want the website to meet WCAG 2.1 AA standards, so that I can access all content and functionality without barriers.

#### Acceptance Criteria

1. THE Application SHALL ensure all text content meets a minimum contrast ratio of 4.5:1 against its background for normal text (below 18pt regular or 14pt bold) and 3:1 for large text (18pt regular or 14pt bold and above)
2. THE Application SHALL provide focus indicators on all interactive elements when navigated via keyboard, where each indicator has a minimum 2px outline with at least a 3:1 contrast ratio against adjacent colours
3. THE Application SHALL ensure all interactive elements are operable using keyboard alone without requiring a mouse
4. THE Application SHALL provide alt text of no more than 150 characters for all informational images that conveys the image's purpose, and mark decorative images with empty alt attributes
5. THE Application SHALL use semantic HTML elements (nav, main, header, footer, section, article) to convey document structure
6. THE Application SHALL ensure all form controls have associated visible labels or accessible names
7. WHEN content updates dynamically (countdown timer), THE Application SHALL use an ARIA live region with politeness level "polite" to communicate the updated value to assistive technologies without interrupting the user's current task
8. THE Application SHALL not rely solely on colour to convey information or indicate interactive states, and SHALL provide at least one additional visual indicator (such as underline, icon, border, or text label) alongside colour changes
9. WHEN the gallery modal or sidebar navigation overlay is open, THE Application SHALL trap keyboard focus within the overlay, prevent tabbing to background content, and return focus to the triggering element when the overlay is closed
10. THE Application SHALL provide a visible mechanism to pause, stop, or hide any automatically moving or scrolling content (such as the announcement banner), and SHALL respect the user's operating system reduced-motion preference by disabling animations

### Requirement 6: Performance Optimisation

**User Story:** As a visitor, I want pages to load quickly, so that I can access information without frustrating delays.

#### Acceptance Criteria

1. THE Application SHALL implement code splitting so that each route loads only the JavaScript bundle specific to that route, with shared vendor and framework code in a separate common bundle
2. THE Application SHALL lazy-load images that are not in the initial viewport using native loading="lazy" or an intersection observer
3. THE Application SHALL serve images in WebP or AVIF format with a fallback to JPEG or PNG for browsers that do not support modern formats, using a picture element or content negotiation
4. THE Application SHALL achieve a Lighthouse Performance score of 90 or above on the Home page when tested using Lighthouse default mobile throttling (simulated slow 4G with 4x CPU slowdown)
5. THE Application SHALL preload fonts and above-the-fold hero images via rel="preload" link elements in the document head so they begin loading before being discovered by the parser
6. IF an image fails to load, THEN THE Application SHALL display a placeholder or fallback visual indicator in place of the image without breaking the page layout

### Requirement 7: Gallery with External Image Storage

**User Story:** As a visitor, I want the gallery to load quickly and display images in a lightbox, so that I can browse festival photos without long waits.

#### Acceptance Criteria

1. THE Gallery_Service SHALL store all gallery images externally in a cloud storage provider (e.g. Cloudinary, AWS S3 with CloudFront, or equivalent CDN-backed storage)
2. THE Application SHALL load gallery thumbnails progressively using pagination or infinite scroll, loading no more than 20 images per batch, with each batch rendering within 2 seconds on a standard 4G connection
3. WHEN a Visitor selects a gallery thumbnail, THE Gallery_Modal SHALL open within 1 second displaying the full-resolution image with visible previous and next navigation controls, and the full-resolution image SHALL render within 3 seconds on a standard 4G connection
4. WHEN the Gallery_Modal is open and a Visitor presses Escape or activates the close control, THE Gallery_Modal SHALL close and return keyboard focus to the thumbnail that triggered it
5. WHEN the Gallery_Modal is open and a Visitor presses the left arrow key or activates the previous navigation control, THE Gallery_Modal SHALL display the previous image in the current filtered set, or remain on the current image if it is the first image
6. WHEN the Gallery_Modal is open and a Visitor presses the right arrow key or activates the next navigation control, THE Gallery_Modal SHALL display the next image in the current filtered set, or remain on the current image if it is the last image
7. THE Gallery_Service SHALL serve responsive image sizes where thumbnails are no larger than 400px on their longest edge, medium images are no larger than 1200px on their longest edge, and full images are no larger than 2400px on their longest edge, selected based on the display context
8. THE Application SHALL organise gallery images into filterable categories (Acts, Crowd, or All), where "All" is the default selected category and selecting a category displays only images belonging to that category within 500 milliseconds
9. IF the Gallery_Service fails to load a batch of images, THEN THE Application SHALL display an error message indicating the images could not be loaded and provide a retry control that re-attempts the failed request up to 3 times
10. IF a full-resolution image fails to load in the Gallery_Modal, THEN THE Gallery_Modal SHALL display the medium-size fallback image, or if unavailable, display an error indication in place of the image while keeping navigation controls functional

### Requirement 8: Headless CMS Integration for Content Management

**User Story:** As an Editor, I want to manage lineup acts, vendor details, and about page content without editing code, so that I can publish updates when new acts are announced.

#### Acceptance Criteria

1. THE CMS SHALL provide an editing interface where an Editor can create, update, and delete lineup act entries including act name (maximum 100 characters), description (maximum 500 characters), image, stage assignment (Main Stage or Marquee Stage), year (e.g. 2025, 2026), performance order (integer starting from 1), and up to 5 external links per act
2. THE CMS SHALL provide an editing interface where an Editor can create, update, and delete vendor entries including vendor name (maximum 100 characters), description (maximum 300 characters), and category selected from a predefined list managed within the CMS
3. THE CMS SHALL provide an editing interface where an Editor can update the About Us page content including team member bios (maximum 500 characters each), names (maximum 100 characters), photos, display order, and the LOROS letter text
4. WHEN an Editor publishes content changes in the CMS, THE Application SHALL reflect the updated content within 5 minutes without requiring a code deployment
5. THE CMS SHALL support image uploads for act photos, vendor images, and team member headshots in JPEG, PNG, or WebP format with a maximum file size of 5 MB per image
6. THE CMS SHALL require authentication before an Editor can make content changes
7. IF the Application cannot retrieve content from the CMS, THEN THE Application SHALL display the most recently cached version of the content and shall not show an error page to Visitors
8. THE CMS SHALL prevent an Editor from publishing a lineup act entry that is missing act name, stage assignment, or year, and SHALL indicate which required fields are incomplete

### Requirement 9: UK-Compliant Cookie Consent

**User Story:** As a site operator, I want to comply with UK PECR and UK GDPR regulations for cookie usage, so that the website operates lawfully and respects visitor privacy.

#### Acceptance Criteria

1. WHEN a Visitor first lands on the Application and has not previously set a cookie preference, THE Cookie_Banner SHALL display a banner that is visible without scrolling, explaining that the site uses cookies for analytics
2. THE Cookie_Banner SHALL provide two action buttons with equal visual prominence: "Accept" to consent to analytics cookies and "Reject" to refuse non-essential cookies
3. WHEN a Visitor selects "Reject", THE Application SHALL not load any Analytics_Service scripts or set any non-essential cookies
4. WHEN a Visitor selects "Accept", THE Application SHALL load the Analytics_Service scripts and set the analytics cookies
5. THE Cookie_Banner SHALL store the Visitor preference in a cookie with a maximum expiry of 12 months so the banner does not reappear on subsequent visits within that period
6. THE Application SHALL provide a link in the footer to a Cookie Policy page explaining what cookies are used, their purpose, and how to change preferences
7. WHEN a Visitor accesses the Cookie Policy page, THE Application SHALL allow the Visitor to change their previously stored cookie preference
8. IF a Visitor changes their preference from "Accept" to "Reject", THEN THE Application SHALL remove all previously set analytics cookies and stop transmitting data to the Analytics_Service
9. WHILE the Cookie_Banner is displayed and the Visitor has not made a selection, THE Application SHALL not load any Analytics_Service scripts, set any non-essential cookies, or dismiss the banner automatically
10. THE Cookie_Banner SHALL not use pre-ticked checkboxes or default any option to a selected state

### Requirement 10: Analytics Tracking Integration

**User Story:** As a site operator, I want to track visitor behaviour on the site, so that I can understand which pages are popular and improve the user experience.

#### Acceptance Criteria

1. WHEN a Visitor has accepted analytics cookies via the cookie consent mechanism, THE Analytics_Service SHALL record a page view event containing the page path for each route navigation, within 2 seconds of the page becoming visible
2. WHEN a Visitor has accepted analytics cookies, THE Analytics_Service SHALL support tracking of custom events identified by an event name and up to 5 key-value parameter pairs (e.g. ticket link clicks, gallery views)
3. IF a Visitor has not accepted analytics cookies or has declined them, THEN THE Application SHALL not load, initialise, or transmit any data to the Analytics_Service, and SHALL not store any analytics-related cookies or identifiers on the Visitor's device
4. THE Application SHALL load the Analytics_Service script using the async attribute so that it does not block page rendering or delay the document DOMContentLoaded event
5. IF the Analytics_Service script fails to load within 5 seconds or returns a network error, THEN THE Application SHALL continue to function without analytics capability and SHALL not display any error to the Visitor
6. WHEN a Visitor revokes analytics cookie consent after previously accepting, THE Application SHALL cease transmitting data to the Analytics_Service and SHALL remove any analytics-related cookies from the Visitor's device within the same browsing session

### Requirement 11: FAQ Accordion

**User Story:** As a visitor, I want to expand individual FAQ items to read answers, so that I can quickly find the information relevant to me.

#### Acceptance Criteria

1. THE FAQ_Accordion SHALL display all questions in a collapsed state by default, with answer content hidden from both visual display and assistive technology, showing only the question text and an expand indicator
2. WHEN a Visitor activates a question button, THE FAQ_Accordion SHALL expand that section to reveal the answer, set aria-expanded to true on the button, and retain keyboard focus on the activated button
3. WHEN a Visitor activates an already-expanded question button, THE FAQ_Accordion SHALL collapse that section, set aria-expanded to false on the button, and retain keyboard focus on the activated button
4. THE FAQ_Accordion SHALL allow multiple sections to be open simultaneously
5. THE FAQ_Accordion SHALL be operable entirely via keyboard, where Tab moves focus between question buttons and Enter or Space toggles the focused section
6. THE FAQ_Accordion SHALL associate each question button with its answer panel using aria-controls referencing the panel's id

### Requirement 12: Lineup Pages with Year Navigation

**User Story:** As a visitor, I want to browse lineup information by year, so that I can see who played previously and who is performing this year.

#### Acceptance Criteria

1. THE Application SHALL display a lineup landing page with navigation links to each year's lineup (2025, 2026, and future years as added via CMS), ordered with the most recent year first
2. WHEN a Visitor selects a year, THE Application SHALL display the acts for that year grouped by stage (Main Stage, Marquee Stage), with acts listed in the display order defined in the CMS
3. THE Application SHALL display each act with its name, image, description (maximum 500 characters), and up to 5 external links as provided by the CMS
4. THE Application SHALL visually distinguish headliner acts from supporting acts by displaying headliner acts before supporting acts within each stage section, using image dimensions at least twice the width of supporting act images
5. IF a year's lineup contains no acts, THEN THE Application SHALL display that year's page with a message indicating the lineup has not yet been announced
6. IF an act has no image provided in the CMS, THEN THE Application SHALL display a placeholder image in place of the act's image

### Requirement 13: About Us Page

**User Story:** As a visitor, I want to learn about the team behind Natfest and its charitable purpose, so that I feel connected to the cause.

#### Acceptance Criteria

1. THE Application SHALL display the LOROS letter with the content beyond the first paragraph hidden by default and a "Read more" button visible below the initial paragraph
2. THE Application SHALL display team member profiles each containing a photo, name, and bio text, arranged in an alternating left-right layout where odd-numbered profiles show the image on the left and even-numbered profiles show the image on the right
3. WHEN a Visitor activates the "Read more" button, THE Application SHALL expand the hidden letter content, change the button text to "Read less", and set aria-expanded to true; WHEN the Visitor activates the "Read less" button, THE Application SHALL collapse the letter content back to the initial state, change the button text to "Read more", and set aria-expanded to false
4. THE Application SHALL source team member data and the LOROS letter content from the CMS
5. IF the CMS content for team members or the LOROS letter is unavailable, THEN THE Application SHALL display a message indicating that content could not be loaded rather than rendering an empty or broken section

### Requirement 14: Footer and Social Links

**User Story:** As a visitor, I want quick access to social media links and legal pages from the footer, so that I can follow Natfest or read the privacy policy.

#### Acceptance Criteria

1. THE Application SHALL display a footer on every page containing links to the Privacy Policy, Cookie Policy, Instagram, and Facebook pages, where each link label is visible text of at least 1 character identifying the destination
2. THE Application SHALL display the LOROS charity logo in the footer as an image with descriptive alt text, linking to the LOROS website (https://www.loros.co.uk/)
3. WHEN a Visitor activates a social media link or the LOROS charity link, THE Application SHALL open the link in a new browser tab with the attributes target="_blank" and rel="noopener noreferrer"
4. IF the LOROS charity logo image fails to load, THEN THE Application SHALL display the alt text as a fallback so the link remains identifiable and activatable
5. THE Application SHALL ensure all footer links have a minimum touch-target size of 24×24 CSS pixels and are keyboard-focusable in DOM order
