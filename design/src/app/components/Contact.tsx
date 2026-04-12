import { Mail, Phone, MapPin, Clock, Send, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { siteContent } from '../content/siteContent';
import { SectionBreak, SectionEyebrow } from './SectionBreak';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon / mobil',
      lines: siteContent.contact.phones.map((p) => ({
        text: p.display,
        href: `tel:${p.tel}` as const,
      })),
    },
    ...(siteContent.contact.emails.length > 0
      ? [
          {
            icon: Mail,
            title: 'Email',
            lines: siteContent.contact.emails.map((email) => ({
              text: email,
              href: `mailto:${email}` as const,
            })),
          },
        ]
      : []),
    {
      icon: MapPin,
      title: 'Adresă sediu',
      lines: siteContent.contact.addressLines.map((text) => ({ text, href: null as const })),
    },
    {
      icon: Clock,
      title: 'Program',
      lines: siteContent.contact.hours.map((text) => ({ text, href: null as const })),
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 overflow-hidden rounded-2xl border border-blue-200/80 shadow-xl shadow-blue-950/10">
          <div className="bg-gradient-to-r from-blue-950 via-blue-800 to-blue-900 px-6 py-12 md:py-14 text-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
            <div className="relative">
              <div className="mb-6 w-full sm:mb-7">
                <SectionBreak variant="onDark" />
              </div>
              <SectionEyebrow variant="onDark">Contact</SectionEyebrow>
              <h2 className="text-5xl md:text-6xl mb-4 font-semibold tracking-tight text-white">
                Contactați-ne astăzi
              </h2>
              <p className="text-lg md:text-xl text-blue-100/95 max-w-2xl mx-auto leading-relaxed">
                Suntem gata să răspundem întrebărilor dumneavoastră și să discutăm despre proiectul dumneavoastră
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {/* Contact Info Cards */}
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div 
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-200 transition-all shadow-sm hover:shadow-md hover:shadow-blue-950/5"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <Icon className="w-6 h-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2 text-slate-900">{info.title}</h3>
                    {info.lines.map((line, idx) => (
                      <p key={idx} className="text-slate-600 text-sm">
                        {line.href ? (
                          <a href={line.href} className="hover:text-slate-900 transition-colors">
                            {line.text}
                          </a>
                        ) : (
                          line.text
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 border border-blue-100 rounded-xl p-8 shadow-md shadow-blue-950/5">
            <h3 className="text-2xl mb-6 text-blue-950">Trimiteți-ne un mesaj</h3>
            
            {submitted ? (
              <div className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4 border border-slate-200">
                  <Send className="w-8 h-8 text-slate-700" />
                </div>
                <h4 className="text-xl text-slate-900 mb-2">Mulțumim pentru mesaj!</h4>
                <p className="text-slate-600">Vă vom contacta în cel mai scurt timp posibil.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2 text-slate-700">
                    Nume complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition-colors"
                    placeholder="Numele dumneavoastră"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 text-slate-700">
                    Adresă email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition-colors"
                    placeholder="exemplu@email.ro"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm mb-2 text-slate-700">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition-colors"
                    placeholder={siteContent.contact.phones[0].display}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm mb-2 text-slate-700">
                    Mesaj *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition-colors resize-none"
                    placeholder="Descrieți proiectul dumneavoastră sau întrebările pe care le aveți..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-950/25"
                >
                  <Send className="w-5 h-5" />
                  Trimite mesajul
                </button>
              </form>
            )}
          </div>

          {/* Hartă sediu */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-2xl mb-2 text-slate-900">Locație — sediu social</h3>
              <p className="text-slate-600 text-sm mb-1">
                {siteContent.company.street}, {siteContent.company.locality},{' '}
                {siteContent.company.postalCode}, județ {siteContent.company.county}
              </p>
              <a
                href={siteContent.contact.mapOpenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Deschide în Google Maps
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-lg min-h-[320px] md:min-h-[420px] flex-1">
              <iframe
                title="Hartă — GENE SYS SECURITY SRL, Satu Mare"
                src={siteContent.contact.mapEmbedUrl}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
