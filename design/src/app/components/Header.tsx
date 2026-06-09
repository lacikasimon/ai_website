import logo from '../../assets/genesys-logo.svg';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SiteSearch } from './SiteSearch';
import { FundingLogos } from './FundingLogos';
import {
  CmsMenuItem,
  cmsContentChangedEvent,
  fetchVisibleCmsMenuItems,
  getVisibleCmsMenuItems,
} from '../utils/contentManagement';

const offerPath = '/contact#formular-contact';
const contactPath = '/contact#contact';

const ctaButtonBaseClass =
  'inline-flex min-h-10 w-[6.5rem] items-center justify-center whitespace-nowrap rounded-md px-2 py-2 text-sm font-semibold leading-none shadow-sm transition-colors sm:w-[6.75rem] sm:px-3';
const ctaOfferClass = `${ctaButtonBaseClass} bg-amber-400 font-bold text-blue-950 shadow-amber-300/30 hover:bg-amber-300`;
const ctaContactClass = `${ctaButtonBaseClass} border border-blue-100 bg-white text-blue-950 shadow-blue-950/5 hover:bg-blue-50`;

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<CmsMenuItem[]>(() => getVisibleCmsMenuItems());
  const isHomePage = location.pathname === '/';

  const getAriaCurrent = (href: string): 'page' | 'location' | undefined => {
    if (isExternalHref(href)) return undefined;

    const [pathname, hash] = href.split('#');
    const targetPath = pathname || '/';

    if (targetPath !== location.pathname) return undefined;
    if (hash) return location.hash === `#${hash}` ? 'location' : undefined;
    return 'page';
  };

  useEffect(() => {
    let active = true;

    const syncMenu = () => {
      void fetchVisibleCmsMenuItems()
        .then((items) => {
          if (active) {
            setMenuItems(items);
          }
        })
        .catch(() => {
          if (active) {
            setMenuItems(getVisibleCmsMenuItems());
          }
        });
    };

    syncMenu();
    window.addEventListener(cmsContentChangedEvent, syncMenu);
    window.addEventListener('storage', syncMenu);
    return () => {
      active = false;
      window.removeEventListener(cmsContentChangedEvent, syncMenu);
      window.removeEventListener('storage', syncMenu);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    element?.scrollIntoView({ behavior });
    setMobileMenuOpen(false);
  };

  const renderMenuItem = (item: CmsMenuItem, mobile = false) => {
    const className = mobile
      ? 'block text-sm font-medium leading-5 text-blue-950/80 transition-colors hover:text-blue-950'
      : 'whitespace-nowrap text-sm font-medium leading-5 transition-colors hover:text-blue-950';

    if (isExternalHref(item.href)) {
      return (
        <a key={item.id} href={item.href} className={className} onClick={() => setMobileMenuOpen(false)}>
          {item.label}
        </a>
      );
    }

    if (isHomePage && item.href.startsWith('/#')) {
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => scrollToSection(item.href.slice(2))}
          className={mobile ? `w-full text-left ${className}` : className}
          aria-current={getAriaCurrent(item.href)}
        >
          {item.label}
        </button>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.href}
        className={className}
        onClick={() => setMobileMenuOpen(false)}
        aria-current={getAriaCurrent(item.href)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-blue-100/80 bg-gradient-to-r from-white via-blue-50/80 to-white shadow-sm shadow-blue-950/5 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex min-w-0 shrink items-center gap-3 hover:opacity-90 transition-opacity"
            aria-label="GENE SYS SECURITY SRL — pagina principală"
          >
            <img src={logo} alt="GENE SYS SECURITY" className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" />
            <div className="min-w-0">
              <div className="text-xs font-bold leading-tight tracking-wide text-blue-950 sm:text-xl">GENE SYS SECURITY</div>
              <div className="text-xs font-medium text-blue-800/80">SRL</div>
            </div>
          </Link>

          {/* Mobile: CTA-uri vizibile înainte de meniu */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:hidden">
            <Link
              to={offerPath}
              className={`${ctaOfferClass} min-h-9 w-[5.75rem] text-xs sm:min-h-10 sm:w-[6.75rem] sm:text-sm`}
              aria-current={getAriaCurrent(offerPath)}
            >
              Cere ofertă
            </Link>
            <Link
              to={contactPath}
              className={`${ctaContactClass} min-h-9 w-[5.75rem] text-xs sm:min-h-10 sm:w-[6.75rem] sm:text-sm`}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={getAriaCurrent(contactPath)}
            >
              Contact
            </Link>
            <div className="hidden sm:block">
              <SiteSearch />
            </div>
            <button
              type="button"
              className="ml-0.5 text-blue-950"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Închide meniul' : 'Deschide meniul'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden /> : <Menu className="w-6 h-6" aria-hidden />}
            </button>
          </div>

          {/* Desktop: CTA-uri primele, apoi nav */}
          <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 xl:flex xl:gap-4">
            <Link to={offerPath} className={ctaOfferClass} aria-current={getAriaCurrent(offerPath)}>
              Cere ofertă
            </Link>
            <Link to={contactPath} className={ctaContactClass} aria-current={getAriaCurrent(contactPath)}>
              Contact
            </Link>
            <SiteSearch />
            <div className="hidden h-8 w-px shrink-0 bg-blue-200/80 lg:block" aria-hidden />
            <nav className="flex items-center gap-4 text-sm font-medium text-blue-950/75 lg:gap-6" aria-label="Navigare principală">
              {menuItems.map((item) => renderMenuItem(item))}
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="mt-4 space-y-3 border-t border-blue-100/90 pb-4 pt-4 xl:hidden"
            aria-label="Navigare mobilă"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                to={offerPath}
                className={`${ctaOfferClass} text-center`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={getAriaCurrent(offerPath)}
              >
                Cere ofertă
              </Link>
              <Link
                to={contactPath}
                className={`${ctaContactClass} text-center`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={getAriaCurrent(contactPath)}
              >
                Contact
              </Link>
            </div>
            <SiteSearch variant="menu" onNavigate={() => setMobileMenuOpen(false)} />
            {menuItems.map((item) => renderMenuItem(item, true))}
          </nav>
        )}
      </div>
      <div className="border-t border-blue-100/80 bg-white py-3">
        <div className="container mx-auto px-4">
          <FundingLogos />
        </div>
      </div>
    </header>
  );
}
