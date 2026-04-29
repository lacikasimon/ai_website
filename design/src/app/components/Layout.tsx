import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { JsonLdOrg } from '../seo/JsonLdOrg';
import { RouteScroll } from './RouteScroll';

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50">
      <JsonLdOrg />
      <RouteScroll />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
