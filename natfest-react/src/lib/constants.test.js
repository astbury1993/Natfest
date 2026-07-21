import { describe, it, expect } from 'vitest';
import { EVENT_DATE, SITE_META, NAV_LINKS } from './constants';

describe('constants', () => {
  it('EVENT_DATE is a valid ISO 8601 date string', () => {
    const parsed = new Date(EVENT_DATE);
    expect(parsed.toString()).not.toBe('Invalid Date');
  });

  it('SITE_META has name and description', () => {
    expect(SITE_META.name).toBe('Natfest');
    expect(SITE_META.description).toBeTruthy();
  });

  it('NAV_LINKS contains the expected pages', () => {
    const labels = NAV_LINKS.map((link) => link.label);
    expect(labels).toEqual([
      'Home',
      'About Us',
      'Lineup',
      'Vendors',
      'Gallery',
      'Tickets',
      'FAQs',
      'Our Partners',
    ]);
  });

  it('NAV_LINKS entries all have path and label', () => {
    NAV_LINKS.forEach((link) => {
      expect(link.path).toBeTruthy();
      expect(link.label).toBeTruthy();
    });
  });
});
