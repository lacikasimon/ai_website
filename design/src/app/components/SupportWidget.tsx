import { Link } from 'react-router';
import { MessageCircle, PhoneCall, Send, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { siteContent } from '../content/siteContent';
import { COOKIE_CONSENT_CHANGED_EVENT, COOKIE_CONSENT_STORAGE_KEY } from '../utils/cookieConsent';

export function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  const phone = siteContent.contact.phones[0];
  const whatsappNumber = phone.tel.replace(/\D/g, '');
  const whatsappMessage = encodeURIComponent('Bună ziua, doresc informații despre un proiect.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
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

  return (
    <div
      className={`fixed right-4 z-[55] flex flex-col items-end gap-3 transition-[bottom] duration-200 ${
        cookieVisible ? 'bottom-64 md:bottom-36' : 'bottom-5 md:bottom-6'
      }`}
    >
      {open && (
        <div className="w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-lg border border-blue-100 bg-white shadow-2xl shadow-blue-950/20">
          <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-blue-950 to-blue-900 px-4 py-4 text-white">
            <div>
              <h2 className="text-base font-semibold">Suport client</h2>
              <p className="mt-1 text-sm text-blue-100">Răspundem la întrebări despre proiecte, oferte și intervenții.</p>
            </div>
            <button
              type="button"
              aria-label="Închide suportul"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-blue-100 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="space-y-3 p-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-900 transition-colors hover:bg-green-100"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Chat WhatsApp
            </a>
            <a
              href={`tel:${phone.tel}`}
              className="flex items-center gap-3 rounded-md border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-blue-950 transition-colors hover:bg-blue-50"
            >
              <PhoneCall className="h-5 w-5" aria-hidden />
              Sună la {phone.display}
            </a>
            <Link
              to="/contact#formular-contact"
              className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              <Send className="h-5 w-5" aria-hidden />
              Trimite o cerere
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? 'Închide suport client' : 'Deschide suport client'}
        aria-expanded={open}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-900 text-white shadow-xl shadow-blue-950/25 ring-4 ring-white transition-colors hover:bg-blue-800"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-6 w-6" aria-hidden /> : <MessageCircle className="h-6 w-6" aria-hidden />}
      </button>
    </div>
  );
}
