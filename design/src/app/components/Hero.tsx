import { Shield, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { siteContent } from '../content/siteContent';
import { siteImages } from '../content/siteImages';

export function Hero() {
  const scrollToServices = () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    document.getElementById('servicii')?.scrollIntoView({ behavior });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${siteImages.hero.electricalInstallation}')`,
          backgroundPosition: 'center 42%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/72 via-white/84 to-blue-50/72" />
        <div className="absolute inset-0 bg-blue-950/10" />
      </div>

      {/* Hero Content */}
      <div id="home" className="relative z-10 container mx-auto px-4 pb-32 pt-48 text-center sm:pb-28 sm:pt-44 md:pt-40">
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-blue-950 tracking-tight max-w-5xl mx-auto leading-[1.1] font-semibold">
          {siteContent.home.hero.headline}
        </h1>
        
        <div className="inline-block border border-blue-200/90 bg-blue-50/95 shadow-sm px-6 py-2 rounded-full mb-8">
          <p className="text-blue-900 text-lg tracking-wide font-medium">{siteContent.home.hero.badge}</p>
        </div>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          {siteContent.home.hero.subheadline}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            to="/contact#formular-contact"
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg shadow-blue-900/25"
          >
            Cere o Ofertă
          </Link>
          <button 
            type="button"
            onClick={scrollToServices}
            className="bg-white/95 hover:bg-white text-blue-950 px-8 py-4 rounded-lg text-lg border-2 border-blue-200 hover:border-blue-400 transition-colors shadow-sm"
          >
            Vezi Serviciile Noastre
          </button>
        </div>

        {/* Quick Contact Info */}
        <div className="flex flex-col gap-4 justify-center items-center text-slate-600">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" aria-hidden />
              <a
                href={`tel:${siteContent.contact.phones[0].tel}`}
                className="hover:text-blue-800 transition-colors font-medium"
              >
                {siteContent.contact.phones[0].display}
              </a>
            </div>
            {siteContent.contact.emails.length > 0 && (
              <>
                <div className="hidden sm:block w-px h-6 bg-blue-200" />
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" aria-hidden />
                  <a
                    href={`mailto:${siteContent.contact.emails[0]}`}
                    className="hover:text-blue-800 transition-colors font-medium"
                  >
                    {siteContent.contact.emails[0]}
                  </a>
                </div>
              </>
            )}
          </div>
          <p className="text-sm text-blue-900/80 max-w-xl text-center border border-blue-100 bg-white/85 rounded-lg px-4 py-2 shadow-sm">
            {siteContent.contact.coverage}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-blue-700/70 animate-bounce">
          <span className="text-sm">Derulați în jos</span>
          <Shield className="w-6 h-6" aria-hidden />
        </div>
      </div>
    </div>
  );
}
