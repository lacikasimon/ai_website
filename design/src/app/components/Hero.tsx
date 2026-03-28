import logo from '../../assets/logo.svg';
import { Shield, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { siteContent } from '../content/siteContent';

export function Hero() {
  const scrollToServices = () => {
    document.getElementById('servicii')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1770838773181-e1b17ec22fee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwaW5zdGFsbGF0aW9uJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NzQwOTUzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-cyan-900/80"></div>
      </div>

      {/* Hero Content */}
      <div id="home" className="relative z-10 container mx-auto px-4 text-center pt-24">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"></div>
            <img src={logo} alt="GENE SYS SECURITY" className="h-32 w-32 relative z-10" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white tracking-tight max-w-5xl mx-auto leading-tight">
          Soluții Complete de Instalații Electrice și Securitate pentru Viitor.
        </h1>
        
        <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 px-6 py-2 rounded-full mb-8">
          <p className="text-cyan-400 text-lg">GENE SYS SECURITY SRL</p>
        </div>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Transformăm spațiile prin tehnologie de vârf, oferind servicii de proiectare și execuție pentru construcții civile și industriale.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            to="/contact"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
          >
            Cere o Ofertă
          </Link>
          <button 
            onClick={scrollToServices}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg border border-white/20 transition-all backdrop-blur-sm"
          >
            Vezi Serviciile Noastre
          </button>
        </div>

        {/* Quick Contact Info */}
        <div className="flex flex-col gap-4 justify-center items-center text-slate-300">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-cyan-400" />
              <a
                href={`tel:${siteContent.contact.phones[0].tel}`}
                className="hover:text-cyan-400 transition-colors"
              >
                {siteContent.contact.phones[0].display}
              </a>
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-600" />
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-400" />
              <a
                href={`mailto:${siteContent.contact.emails[0]}`}
                className="hover:text-cyan-400 transition-colors"
              >
                {siteContent.contact.emails[0]}
              </a>
            </div>
          </div>
          <p className="text-sm text-slate-500 max-w-xl text-center">
            {siteContent.contact.coverage}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-slate-400 animate-bounce">
          <span className="text-sm">Derulați în jos</span>
          <Shield className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}