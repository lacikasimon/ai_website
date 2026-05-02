import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { JsonLdOrg } from '../seo/JsonLdOrg';
import { BreadcrumbJsonLd } from '../seo/BreadcrumbJsonLd';
import { RouteScroll } from './RouteScroll';
import { SupportWidget } from './SupportWidget';
import { AccessibilityPanel } from './AccessibilityPanel';

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50">
      <JsonLdOrg />
      <BreadcrumbJsonLd />
      <RouteScroll />
      <a href="#main-content" className="skip-link">
        Sari la conținutul principal
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <AccessibilityPanel />
      <SupportWidget />
      <CookieBanner />
    </div>
  );
}
