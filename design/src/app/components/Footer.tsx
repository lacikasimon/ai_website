import logo from '../../assets/genesys-logo.svg';
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
    { label: 'De ce noi', to: { pathname: '/', hash: 'de-ce-noi' } },
    { label: 'Servicii', to: { pathname: '/', hash: 'servicii' } },
    { label: 'Sectoare', to: { pathname: '/', hash: 'sectoare' } },
    { label: 'Proces', to: { pathname: '/', hash: 'proces' } },
    { label: 'Certificări', to: { pathname: '/', hash: 'certificari' } },
    { label: 'Experiență', to: { pathname: '/', hash: 'experienta' } },
    { label: 'Întrebări', to: { pathname: '/', hash: 'intrebari' } },
    { label: 'Proiecte', to: '/proiecte' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <footer className="bg-white border-t border-blue-200/80">
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 py-3 text-center">
        <p className="text-sm text-blue-100/95 tracking-wide">
          Instalații electrice · Fotovoltaice · Securitate — soluții integrate pentru proiectul tău
        </p>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="GENE SYS SECURITY" className="h-10 w-10" />
              <div>
                <div className="text-lg text-blue-950 tracking-wide font-semibold">GENE SYS SECURITY</div>
                <div className="text-xs text-slate-500">SRL</div>
              </div>
            </div>
            <p className="text-slate-600 mb-4 text-sm italic">
              Proiectare, execuție și mentenanță pentru instalații electrice, fotovoltaice și sisteme de securitate.
            </p>
            <p className="text-slate-600 mb-6 text-sm">
              Lucrăm cu beneficiari privați, firme de construcții și administratori de patrimoniu — oferte clare, documentație conformă și suport după recepție.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-lg flex items-center justify-center transition-all group shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-lg flex items-center justify-center transition-all group shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-lg flex items-center justify-center transition-all group shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-slate-900">Servicii</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={{ pathname: '/', hash: 'servicii' }}
                    className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-slate-900">Companie</h3>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-slate-900">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  {siteContent.contact.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="text-slate-600 hover:text-slate-900 transition-colors text-sm block"
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>
              {siteContent.contact.emails.length > 0 && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    {siteContent.contact.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="text-slate-600 hover:text-slate-900 transition-colors text-sm block"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <div className="text-slate-600 text-sm">
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

        <div className="border-t border-slate-200 pt-8 pb-8">
          <div className="text-center">
            <h4 className="text-slate-600 text-sm mb-4">Servicii complete:</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {['Consultanță', 'Proiectare', 'Execuție', 'Mentenanță'].map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <p className="text-slate-500 text-xs text-center md:text-left mb-6 max-w-4xl mx-auto md:mx-0 leading-relaxed">
            {siteContent.company.name} · CUI {siteContent.company.cui} · Reg. Com.{' '}
            {siteContent.company.regCom} · {siteContent.company.cuiNote} · EUID {siteContent.company.euid}
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">
              © {currentYear} GENE SYS SECURITY SRL. Toate drepturile rezervate.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:justify-end">
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                Politică de confidențialitate
              </a>
              <Link to="/politica-cookie-uri" className="text-slate-600 hover:text-slate-900 transition-colors">
                Politică cookie
              </Link>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                Termeni și condiții
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                GDPR
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
