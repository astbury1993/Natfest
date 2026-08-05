/**
 * Site-wide constants for Natfest.
 */

/** Target event date for the countdown timer (ISO 8601, UK midday BST) */
export const EVENT_DATE = '2027-07-03T11:00:00Z';

/** Site metadata */
export const SITE_META = {
  name: 'Natfest',
  description:
    'Natfest is a charity music festival raising money for LOROS Hospice.',
};

/** Navigation link definitions used by the header and sidebar nav */
export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/lineup', label: 'Lineup' },
  { path: '/vendors', label: 'Vendors' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/tickets', label: 'Tickets' },
  { path: '/faqs', label: 'FAQs' },
  { path: '/partners', label: 'Our Partners' },
];
