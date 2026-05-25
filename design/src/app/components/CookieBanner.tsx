import { Link } from 'react-router';
import { Cookie } from 'lucide-react';
import { useEffect, useState } from 'react';
import { COOKIE_CONSENT_CHANGED_EVENT, COOKIE_CONSENT_STORAGE_KEY } from '../utils/cookieConsent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
      setVisible(!stored);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = (value: 'all' | 'essential') => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
      window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_CHANGED_EVENT, { detail: { visible: false } }));
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  const reopenBanner = () => {
    try {
      window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_CHANGED_EVENT, { detail: { visible: true } }));
    } catch {
      /* ignore */
    }
    setVisible(true);
  };

  if (!visible) {
    return (
      <button
        type="button"
        aria-label="Deschide setările cookie"
        title="Setări cookie"
        className="fixed bottom-5 left-4 z-[54] inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-900 shadow-xl shadow-blue-950/20 ring-4 ring-white transition-colors hover:bg-blue-50 md:bottom-6"
        onClick={reopenBanner}
      >
        <Cookie className="h-5 w-5" aria-hidden />
      </button>
    );
  }

  return (
    <>
      <div
        role="dialog"
        aria-label="Informare cookie"
        className="fixed bottom-0 left-0 right-0 z-[60] border-t border-slate-200 bg-white p-4 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] md:p-5"
      >
        <div className="container mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-relaxed text-slate-700">
            Acest site folosește cookie-uri pentru funcționare și, cu acordul dumneavoastră, pentru îmbunătățirea experienței.{' '}
            <Link to="/politica-cookie-uri" className="font-medium text-blue-800 underline underline-offset-2 hover:text-blue-950">
              Politica cookie
            </Link>
            .
          </p>
          <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => dismiss('essential')}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
            >
              Doar esențiale
            </button>
            <button
              type="button"
              onClick={() => dismiss('all')}
              className="rounded-lg bg-blue-950 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-900"
            >
              Accept toate
            </button>
          </div>
        </div>
      </div>
      {/* Spațiu în flux ca ultimul conținut să nu rămână sub banner */}
      <div className="h-36 shrink-0 md:h-32" aria-hidden />
    </>
  );
}
