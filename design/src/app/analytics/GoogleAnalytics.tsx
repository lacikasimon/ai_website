import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import {
  allowsAnalyticsCookies,
  COOKIE_CONSENT_CHANGED_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
} from '../utils/cookieConsent';

const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID?.trim();
const googleTagScriptId = 'google-analytics-gtag';

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: Gtag;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

function getDisableKey(id: string): `ga-disable-${string}` {
  return `ga-disable-${id}`;
}

function setGaDisabled(id: string, disabled: boolean) {
  window[getDisableKey(id)] = disabled;
}

function ensureGtag(): Gtag {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  return window.gtag;
}

function consentPayload(analyticsGranted: boolean) {
  return {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
  };
}

function loadGoogleTag(id: string) {
  if (document.getElementById(googleTagScriptId)) {
    return;
  }

  const script = document.createElement('script');
  script.id = googleTagScriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

function initializeGoogleAnalytics(id: string) {
  const gtag = ensureGtag();
  gtag('consent', 'default', consentPayload(true));
  gtag('js', new Date());
  gtag('config', id, { send_page_view: false });
  setGaDisabled(id, false);
  loadGoogleTag(id);
}

function updateAnalyticsConsent(id: string, analyticsGranted: boolean) {
  const gtag = ensureGtag();
  setGaDisabled(id, !analyticsGranted);
  gtag('consent', 'update', consentPayload(analyticsGranted));
}

export function GoogleAnalytics() {
  const location = useLocation();
  const initializedRef = useRef(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    if (!measurementId || typeof window === 'undefined') {
      return;
    }

    const syncConsent = () => {
      const allowed = allowsAnalyticsCookies();
      setAnalyticsAllowed(allowed);

      if (allowed && !initializedRef.current) {
        initializeGoogleAnalytics(measurementId);
        initializedRef.current = true;
        return;
      }

      if (initializedRef.current) {
        updateAnalyticsConsent(measurementId, allowed);
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === COOKIE_CONSENT_STORAGE_KEY) {
        syncConsent();
      }
    };

    syncConsent();
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    if (!measurementId || !analyticsAllowed || !initializedRef.current || typeof window === 'undefined') {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      window.gtag?.('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: `${location.pathname}${location.search}${location.hash}`,
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [analyticsAllowed, location.pathname, location.search, location.hash]);

  return null;
}
