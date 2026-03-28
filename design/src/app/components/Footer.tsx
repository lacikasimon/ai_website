import logo from '../../assets/logo.svg';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router';
import { siteContent } from '../content/siteContent';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    'Instalații Electrice',
    'Sisteme Fotovoltaice',
    'Securitate CCTV',
    'Detecție Efracție',
    'Mentenanță Tehnică',
    'Consultanță',
  ];

  const companyLinks: { label: string; to: { pathname: string; hash?: string } | string }[] = [
    { label: 'Despre Noi', to: { pathname: '/', hash: 'despre-noi' } },
    { label: 'Servicii', to: { pathname: '/', hash: 'servicii' } },
    { label: 'Certificări', to: { pathname: '/', hash: 'certificari' } },
    { label: 'Experiență', to: { pathname: '/', hash: 'experienta' } },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="GENE SYS SECURITY" className="h-10 w-10" />
              <div>
                <div className="text-lg text-white tracking-wide">GENE SYS SECURITY</div>
                <div className="text-xs text-cyan-400">SRL</div>
              </div>
            </div>
            <p className="text-slate-400 mb-4 text-sm italic">
              Soluții electrice personalizate pentru nevoile tale
            </p>
            <p className="text-slate-400 mb-6 text-sm">
              Transformăm spațiile prin tehnologie de vârf, oferind servicii complete de instalații electrice și securitate.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 rounded-lg flex items-center justify-center transition-all group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 rounded-lg flex items-center justify-center transition-all group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 rounded-lg flex items-center justify-center transition-all group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-white">Servicii</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={{ pathname: '/', hash: 'servicii' }}
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-white">Companie</h3>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-white">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  {siteContent.contact.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="text-slate-400 hover:text-cyan-400 transition-colors text-sm block"
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  {siteContent.contact.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="text-slate-400 hover:text-cyan-400 transition-colors text-sm block"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="text-slate-400 text-sm">
                  {siteContent.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 pb-8">
          <div className="text-center">
            <h4 className="text-slate-500 text-sm mb-4">Servicii complete:</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {['Consultanță', 'Proiectare', 'Execuție', 'Mentenanță'].map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-800/50 border border-slate-700/50 px-4 py-2 rounded-lg text-sm text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} GENE SYS SECURITY SRL. Toate drepturile rezervate.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                Politică de confidențialitate
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                Termeni și condiții
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                GDPR
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
