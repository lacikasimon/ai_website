import logo from '../../assets/logo.svg';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { homeSectionHref } from '../utils/paths';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="GENE SYS SECURITY" className="h-12 w-12" />
            <div>
              <div className="text-xl font-bold text-white tracking-wide">GENE SYS SECURITY</div>
              <div className="text-xs text-cyan-400">SRL</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-white">
            <Link to="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
            {isHomePage ? (
              <>
                <button onClick={() => scrollToSection('despre-noi')} className="hover:text-cyan-400 transition-colors">
                  Despre Noi
                </button>
                <button onClick={() => scrollToSection('servicii')} className="hover:text-cyan-400 transition-colors">
                  Servicii
                </button>
                <button onClick={() => scrollToSection('certificari')} className="hover:text-cyan-400 transition-colors">
                  Certificări
                </button>
              </>
            ) : (
              <>
                <a href={homeSectionHref('despre-noi')} className="hover:text-cyan-400 transition-colors">
                  Despre Noi
                </a>
                <a href={homeSectionHref('servicii')} className="hover:text-cyan-400 transition-colors">
                  Servicii
                </a>
                <a href={homeSectionHref('certificari')} className="hover:text-cyan-400 transition-colors">
                  Certificări
                </a>
              </>
            )}
            <Link to="/contact" className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-all">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4 space-y-3">
            <Link to="/" className="block text-white hover:text-cyan-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            {isHomePage ? (
              <>
                <button onClick={() => scrollToSection('despre-noi')} className="block w-full text-left text-white hover:text-cyan-400 transition-colors">
                  Despre Noi
                </button>
                <button onClick={() => scrollToSection('servicii')} className="block w-full text-left text-white hover:text-cyan-400 transition-colors">
                  Servicii
                </button>
                <button onClick={() => scrollToSection('certificari')} className="block w-full text-left text-white hover:text-cyan-400 transition-colors">
                  Certificări
                </button>
              </>
            ) : (
              <>
                <a href={homeSectionHref('despre-noi')} className="block text-white hover:text-cyan-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Despre Noi
                </a>
                <a href={homeSectionHref('servicii')} className="block text-white hover:text-cyan-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Servicii
                </a>
                <a href={homeSectionHref('certificari')} className="block text-white hover:text-cyan-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Certificări
                </a>
              </>
            )}
            <Link to="/contact" className="block bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-all text-center" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
