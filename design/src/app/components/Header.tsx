import logo from '../../assets/genesys-logo.svg';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { homeSectionHref } from '../utils/paths';
import { siteContent } from '../content/siteContent';

const primaryPhone = siteContent.contact.phones[0];

const ctaOfferClass =
  'rounded-md bg-amber-400 px-3 py-2 text-sm font-bold text-blue-950 shadow-md shadow-blue-950/20 transition-colors hover:bg-amber-300';
const ctaPhoneClass =
  'rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-950 shadow-md shadow-blue-950/20 transition-colors hover:bg-blue-50';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = homeSectionHref(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 backdrop-blur-md border-b border-blue-800/70 shadow-lg shadow-blue-950/35">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex min-w-0 shrink items-center gap-3 hover:opacity-90 transition-opacity">
            <img src={logo} alt="GENE SYS SECURITY" className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" />
            <div className="min-w-0">
              <div className="text-base font-bold tracking-wide text-white sm:text-xl">GENE SYS SECURITY</div>
              <div className="text-xs text-blue-200/90">SRL</div>
            </div>
          </Link>

          {/* Mobile: CTA-uri vizibile înainte de meniu */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
            <Link to="/contact" className={`${ctaOfferClass} px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm`}>
              Cere ofertă
            </Link>
            <a
              href={`tel:${primaryPhone.tel}`}
              className={`${ctaPhoneClass} px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm`}
              title={primaryPhone.display}
            >
              Contact
            </a>
            <button
              type="button"
              className="ml-0.5 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Meniu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop: CTA-uri primele, apoi nav */}
          <div className="hidden md:flex min-w-0 flex-1 items-center justify-end gap-3 lg:gap-4">
            <Link to="/contact" className={ctaOfferClass}>
              Cere ofertă
            </Link>
            <a href={`tel:${primaryPhone.tel}`} className={ctaPhoneClass} title={primaryPhone.display}>
              Contact
            </a>
            <div className="hidden h-8 w-px shrink-0 bg-white/25 lg:block" aria-hidden />
            <nav className="flex items-center gap-4 text-sm text-blue-100 lg:gap-6">
              <Link to="/" className="whitespace-nowrap transition-colors hover:text-white">
                Home
              </Link>
              {isHomePage ? (
                <>
                  <button
                    type="button"
                    onClick={() => scrollToSection('despre-noi')}
                    className="whitespace-nowrap transition-colors hover:text-white"
                  >
                    Despre Noi
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('servicii')}
                    className="whitespace-nowrap transition-colors hover:text-white"
                  >
                    Servicii
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('proces')}
                    className="whitespace-nowrap transition-colors hover:text-white"
                  >
                    Proces
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('certificari')}
                    className="whitespace-nowrap transition-colors hover:text-white"
                  >
                    Certificări
                  </button>
                </>
              ) : (
                <>
                  <a href={homeSectionHref('despre-noi')} className="whitespace-nowrap transition-colors hover:text-white">
                    Despre Noi
                  </a>
                  <a href={homeSectionHref('servicii')} className="whitespace-nowrap transition-colors hover:text-white">
                    Servicii
                  </a>
                  <a href={homeSectionHref('proces')} className="whitespace-nowrap transition-colors hover:text-white">
                    Proces
                  </a>
                  <a href={homeSectionHref('certificari')} className="whitespace-nowrap transition-colors hover:text-white">
                    Certificări
                  </a>
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 border-t border-blue-800/80 pb-4 pt-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                to="/contact"
                className={`${ctaOfferClass} text-center`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Cere ofertă
              </Link>
              <a
                href={`tel:${primaryPhone.tel}`}
                className={`${ctaPhoneClass} text-center`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact · {primaryPhone.display}
              </a>
            </div>
            <Link to="/" className="block text-blue-100 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            {isHomePage ? (
              <>
                <button onClick={() => scrollToSection('despre-noi')} className="block w-full text-left text-blue-100 hover:text-white transition-colors">
                  Despre Noi
                </button>
                <button onClick={() => scrollToSection('servicii')} className="block w-full text-left text-blue-100 hover:text-white transition-colors">
                  Servicii
                </button>
                <button onClick={() => scrollToSection('proces')} className="block w-full text-left text-blue-100 hover:text-white transition-colors">
                  Proces
                </button>
                <button onClick={() => scrollToSection('certificari')} className="block w-full text-left text-blue-100 hover:text-white transition-colors">
                  Certificări
                </button>
              </>
            ) : (
              <>
                <a href={homeSectionHref('despre-noi')} className="block text-blue-100 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Despre Noi
                </a>
                <a href={homeSectionHref('servicii')} className="block text-blue-100 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Servicii
                </a>
                <a href={homeSectionHref('proces')} className="block text-blue-100 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Proces
                </a>
                <a href={homeSectionHref('certificari')} className="block text-blue-100 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Certificări
                </a>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
