import { Accessibility, CheckCircle2, Contrast, Image, Keyboard, RotateCcw, Type, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { COOKIE_CONSENT_CHANGED_EVENT, COOKIE_CONSENT_STORAGE_KEY } from '../utils/cookieConsent';

type TextScale = 'normal' | 'large' | 'xlarge';

type AccessibilityPrefs = {
  highContrast: boolean;
  textScale: TextScale;
};

const STORAGE_KEY = 'syshub-accessibility-v1';
const DEFAULT_PREFS: AccessibilityPrefs = {
  highContrast: false,
  textScale: 'normal',
};

const textScalePx: Record<TextScale, number> = {
  normal: 16,
  large: 18,
  xlarge: 20,
};

function getStoredPrefs(): AccessibilityPrefs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;

    const parsed = JSON.parse(raw) as Partial<AccessibilityPrefs>;
    return {
      highContrast: parsed.highContrast === true,
      textScale: parsed.textScale === 'large' || parsed.textScale === 'xlarge' ? parsed.textScale : 'normal',
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

function applyPrefs(prefs: AccessibilityPrefs) {
  document.documentElement.style.setProperty('--font-size', `${textScalePx[prefs.textScale]}px`);
  document.documentElement.classList.toggle('a11y-high-contrast', prefs.highContrast);
}

function savePrefs(prefs: AccessibilityPrefs) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* localStorage can be unavailable in private contexts */
  }
}

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  const [prefs, setPrefs] = useState<AccessibilityPrefs>(DEFAULT_PREFS);

  useEffect(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const storedPrefs = getStoredPrefs();
    setPrefs(storedPrefs);
    applyPrefs(storedPrefs);

    const syncCookieState = (event?: Event) => {
      if (event instanceof CustomEvent && typeof event.detail?.visible === 'boolean') {
        setCookieVisible(event.detail.visible);
        return;
      }

      try {
        setCookieVisible(!window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
      } catch {
        setCookieVisible(false);
      }
    };

    syncCookieState();
    window.addEventListener('storage', syncCookieState);
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncCookieState);

    return () => {
      window.removeEventListener('storage', syncCookieState);
      window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncCookieState);
    };
  }, []);

  const updatePrefs = (nextPrefs: AccessibilityPrefs) => {
    setPrefs(nextPrefs);
    applyPrefs(nextPrefs);
    savePrefs(nextPrefs);
  };

  const setTextScale = (textScale: TextScale) => updatePrefs({ ...prefs, textScale });
  const setHighContrast = (highContrast: boolean) => updatePrefs({ ...prefs, highContrast });
  const resetPrefs = () => updatePrefs(DEFAULT_PREFS);

  const statusItems = [
    {
      icon: Contrast,
      label: 'Contrast cromatic',
      value: prefs.highContrast ? 'ridicat activ' : 'mod standard disponibil',
    },
    {
      icon: Type,
      label: 'Scalare text',
      value: prefs.textScale === 'normal' ? 'normal' : prefs.textScale === 'large' ? 'mare' : 'foarte mare',
    },
    {
      icon: Keyboard,
      label: 'Navigare tastatură',
      value: 'focus vizibil + skip link',
    },
    {
      icon: Image,
      label: 'Text alternativ imagini',
      value: 'configurat în site/CMS',
    },
    {
      icon: CheckCircle2,
      label: 'Structură semantică',
      value: 'landmarks, heading-uri, JSON-LD',
    },
  ];

  return (
    <aside
      className={`fixed left-4 z-[56] flex max-w-[calc(100vw-2rem)] flex-col items-start gap-3 transition-[bottom] duration-200 ${
        cookieVisible ? 'bottom-64 md:bottom-36' : 'bottom-20 md:bottom-20'
      }`}
      aria-label="Instrumente de accesibilitate"
    >
      {open && (
        <div className="w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-lg border border-blue-100 bg-white shadow-2xl shadow-blue-950/20">
          <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-blue-950 to-blue-900 px-4 py-4 text-white">
            <div>
              <h2 className="text-base font-semibold">Accesibilitate</h2>
              <p className="mt-1 text-sm text-blue-100">Setări rapide pentru citire, contrast și navigare.</p>
            </div>
            <button
              type="button"
              aria-label="Închide panoul de accesibilitate"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-blue-100 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="space-y-4 p-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-900">Dimensiune text</p>
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Dimensiune text">
                {[
                  { value: 'normal' as const, label: 'A', aria: 'Text normal' },
                  { value: 'large' as const, label: 'A+', aria: 'Text mare' },
                  { value: 'xlarge' as const, label: 'A++', aria: 'Text foarte mare' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    aria-label={item.aria}
                    aria-pressed={prefs.textScale === item.value}
                    className={`min-h-11 rounded-md border px-3 py-2 text-sm font-bold transition-colors ${
                      prefs.textScale === item.value
                        ? 'border-blue-800 bg-blue-800 text-white'
                        : 'border-slate-200 bg-white text-slate-900 hover:bg-blue-50'
                    }`}
                    onClick={() => setTextScale(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-pressed={prefs.highContrast}
              className={`flex w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                prefs.highContrast
                  ? 'border-blue-900 bg-blue-950 text-white'
                  : 'border-slate-200 bg-white text-slate-900 hover:bg-blue-50'
              }`}
              onClick={() => setHighContrast(!prefs.highContrast)}
            >
              <span className="flex items-center gap-2">
                <Contrast className="h-5 w-5" aria-hidden />
                Contrast ridicat
              </span>
              <span className="text-xs">{prefs.highContrast ? 'Activ' : 'Inactiv'}</span>
            </button>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a
                href="#main-content"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-blue-100 bg-blue-50 px-3 text-sm font-semibold text-blue-950 transition-colors hover:bg-blue-100"
                onClick={() => setOpen(false)}
              >
                <Keyboard className="h-4 w-4" aria-hidden />
                Sari la conținut
              </a>
              <button
                type="button"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                onClick={resetPrefs}
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                Resetează
              </button>
            </div>

            <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <p className="mb-2 text-sm font-semibold text-slate-900">Status WCAG 2.2</p>
              <ul className="space-y-2 text-sm">
                {statusItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-start gap-2 text-slate-700">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-blue-800" aria-hidden />
                      <span>
                        <span className="font-semibold text-slate-900">{item.label}:</span> {item.value}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? 'Închide accesibilitatea' : 'Deschide accesibilitatea'}
        aria-expanded={open}
        title="Accesibilitate"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-950 shadow-xl shadow-blue-950/20 ring-4 ring-blue-100 transition-colors hover:bg-blue-50"
        onClick={() => setOpen((value) => !value)}
      >
        <Accessibility className="h-5 w-5" aria-hidden />
      </button>
    </aside>
  );
}
