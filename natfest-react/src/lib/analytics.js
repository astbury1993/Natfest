/**
 * Google Analytics 4 helper functions.
 *
 * All tracking functions check consent before firing. If consent has not been
 * given or the GA script has not loaded, calls are silent no-ops.
 */

let gaLoaded = false;

/**
 * Reset internal GA loaded state. Used for testing only.
 * @internal
 */
export function _resetForTesting() {
  gaLoaded = false;
}

/**
 * Dynamically load the GA4 gtag.js script (async) if not already loaded.
 * Should only be called after the visitor has accepted analytics cookies.
 *
 * @param {boolean} consentGiven - Whether the visitor has consented to analytics
 */
export function initGA(consentGiven) {
  if (!consentGiven) return;
  if (gaLoaded) return;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;

  // Create the gtag script element
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialise the dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });

  gaLoaded = true;
}

/**
 * Load GA4 script with a timeout. Returns a promise that resolves to true
 * if the script loaded successfully, or false if it timed out or failed.
 * Continues silently without analytics if the script fails to load.
 *
 * @param {boolean} consentGiven - Whether the visitor has consented to analytics
 * @param {number} [timeoutMs=5000] - Timeout in milliseconds
 * @returns {Promise<boolean>} Whether GA loaded successfully
 */
export function initGAWithTimeout(consentGiven, timeoutMs = 5000) {
  if (!consentGiven) return Promise.resolve(false);
  if (gaLoaded) return Promise.resolve(true);

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return Promise.resolve(false);

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;

    const timeout = setTimeout(() => {
      // Script failed to load within timeout — continue without analytics
      script.onload = null;
      script.onerror = null;
      resolve(false);
    }, timeoutMs);

    script.onload = () => {
      clearTimeout(timeout);
      // Initialise the dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', measurementId, { send_page_view: false });
      gaLoaded = true;
      resolve(true);
    };

    script.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };

    document.head.appendChild(script);
  });
}

/**
 * Check if GA has been loaded.
 * @returns {boolean}
 */
export function isGALoaded() {
  return gaLoaded;
}

/**
 * Track a page view event via GA4.
 *
 * @param {string} path - The page path to record (e.g. "/about")
 * @param {boolean} consentGiven - Whether the visitor has consented to analytics
 */
export function trackPageView(path, consentGiven) {
  if (!consentGiven || !gaLoaded || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path,
  });
}

/**
 * Track a custom event via GA4.
 *
 * @param {string} eventName - The event name (e.g. "ticket_link_click")
 * @param {Record<string, string>} params - Up to 5 key-value parameter pairs
 * @param {boolean} consentGiven - Whether the visitor has consented to analytics
 */
export function trackEvent(eventName, params, consentGiven) {
  if (!consentGiven || !gaLoaded || !window.gtag) return;

  // Limit to 5 key-value pairs
  const entries = Object.entries(params || {}).slice(0, 5);
  const limitedParams = Object.fromEntries(entries);

  window.gtag('event', eventName, limitedParams);
}
