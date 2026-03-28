import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
