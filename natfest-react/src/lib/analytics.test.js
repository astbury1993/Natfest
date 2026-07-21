import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initGA, trackPageView, trackEvent, _resetForTesting } from './analytics';

describe('analytics', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-TESTID123');
    // Reset DOM and module state
    document.head.innerHTML = '';
    delete window.dataLayer;
    delete window.gtag;
    _resetForTesting();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('initGA', () => {
    it('does not load the script when consent is not given', () => {
      initGA(false);
      const scripts = document.head.querySelectorAll('script');
      expect(scripts.length).toBe(0);
    });

    it('loads the GA script when consent is given', () => {
      initGA(true);
      const scripts = document.head.querySelectorAll('script');
      expect(scripts.length).toBe(1);
      expect(scripts[0].src).toContain('googletagmanager.com/gtag/js');
      expect(scripts[0].src).toContain('G-TESTID123');
      expect(scripts[0].async).toBe(true);
    });

    it('sets up window.gtag function', () => {
      initGA(true);
      expect(typeof window.gtag).toBe('function');
    });

    it('does not load the script twice', () => {
      initGA(true);
      initGA(true);
      const scripts = document.head.querySelectorAll('script');
      expect(scripts.length).toBe(1);
    });
  });

  describe('trackPageView', () => {
    it('does nothing when consent is not given', () => {
      initGA(true);
      const gtagSpy = vi.fn();
      window.gtag = gtagSpy;
      trackPageView('/about', false);
      expect(gtagSpy).not.toHaveBeenCalled();
    });

    it('sends a page_view event when consent is given and GA is loaded', () => {
      initGA(true);
      const gtagSpy = vi.fn();
      window.gtag = gtagSpy;
      trackPageView('/about', true);
      expect(gtagSpy).toHaveBeenCalledWith('event', 'page_view', {
        page_path: '/about',
      });
    });
  });

  describe('trackEvent', () => {
    it('does nothing when consent is not given', () => {
      initGA(true);
      const gtagSpy = vi.fn();
      window.gtag = gtagSpy;
      trackEvent('click', { target: 'ticket' }, false);
      expect(gtagSpy).not.toHaveBeenCalled();
    });

    it('sends a custom event when consent is given', () => {
      initGA(true);
      const gtagSpy = vi.fn();
      window.gtag = gtagSpy;
      trackEvent('ticket_click', { link: 'main' }, true);
      expect(gtagSpy).toHaveBeenCalledWith('event', 'ticket_click', {
        link: 'main',
      });
    });

    it('limits params to 5 key-value pairs', () => {
      initGA(true);
      const gtagSpy = vi.fn();
      window.gtag = gtagSpy;
      const params = { a: '1', b: '2', c: '3', d: '4', e: '5', f: '6' };
      trackEvent('test', params, true);
      const sentParams = gtagSpy.mock.calls[0][2];
      expect(Object.keys(sentParams).length).toBe(5);
    });
  });
});
