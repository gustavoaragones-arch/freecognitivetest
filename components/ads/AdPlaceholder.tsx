/**
 * Reserved for a future React/Next shell. The live site uses `window.ADS_ENABLED` in assets/js/common.js.
 */
declare global {
  interface Window {
    ADS_ENABLED?: boolean;
  }
}

export default function AdPlaceholder() {
  if (typeof window === "undefined" || !window.ADS_ENABLED) return null;
  return null;
}
