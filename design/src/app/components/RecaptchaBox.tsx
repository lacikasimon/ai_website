import { useEffect, useRef, useState } from 'react';

type RecaptchaBoxProps = {
  siteKey?: string;
  onTokenChange: (token: string) => void;
};

type RecaptchaApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: 'light' | 'dark';
      callback?: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
    },
  ) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
    __genesysRecaptchaReady?: () => void;
  }
}

export function RecaptchaBox({ siteKey, onTokenChange }: RecaptchaBoxProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [status, setStatus] = useState<'missing' | 'loading' | 'ready' | 'error'>(
    siteKey ? 'loading' : 'missing',
  );

  useEffect(() => {
    if (!siteKey) {
      setStatus('missing');
      onTokenChange('');
      return;
    }

    const renderWidget = () => {
      if (!containerRef.current || !window.grecaptcha || widgetIdRef.current !== null) {
        return;
      }

      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'light',
        callback: (token) => {
          setStatus('ready');
          onTokenChange(token);
        },
        'expired-callback': () => onTokenChange(''),
        'error-callback': () => {
          setStatus('error');
          onTokenChange('');
        },
      });
      setStatus('ready');
    };

    window.__genesysRecaptchaReady = renderWidget;

    if (window.grecaptcha) {
      renderWidget();
      return;
    }

    if (!document.querySelector('script[data-genesys-recaptcha="true"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?onload=__genesysRecaptchaReady&render=explicit&hl=ro';
      script.async = true;
      script.defer = true;
      script.dataset.genesysRecaptcha = 'true';
      script.onerror = () => setStatus('error');
      document.head.appendChild(script);
    }
  }, [onTokenChange, siteKey]);

  if (!siteKey) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        reCAPTCHA nu este configurat. Adăugați `VITE_RECAPTCHA_SITE_KEY` pentru activare.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div ref={containerRef} className="min-h-[78px]" />
      {status === 'loading' && <p className="text-xs text-slate-500">Se încarcă reCAPTCHA...</p>}
      {status === 'error' && (
        <p className="text-xs text-red-600">reCAPTCHA nu a putut fi încărcat. Reîncercați.</p>
      )}
    </div>
  );
}
