import { Link } from 'react-router';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'genesys_cookie_consent_v1';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setVisible(!stored);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = (value: 'all' | 'essential') => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

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
