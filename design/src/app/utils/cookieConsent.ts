export const COOKIE_CONSENT_STORAGE_KEY = 'genesys_cookie_consent_v1';
export const COOKIE_CONSENT_CHANGED_EVENT = 'genesys-cookie-consent-change';

export type CookieConsentChoice = 'all' | 'essential';

export function readCookieConsent(): CookieConsentChoice | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    return stored === 'all' || stored === 'essential' ? stored : null;
  } catch {
    return null;
  }
}

export function allowsAnalyticsCookies(choice = readCookieConsent()): boolean {
  return choice === 'all';
}
