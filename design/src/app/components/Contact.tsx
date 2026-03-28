import { Mail, Phone, MapPin, Clock, Send, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { siteContent } from '../content/siteContent';

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
    <section id="contact" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-4">
            <span className="text-cyan-400">Contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Contactați-ne astăzi
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Suntem gata să răspundem întrebărilor dumneavoastră și să discutăm despre proiectul dumneavoastră
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {/* Contact Info Cards */}
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div 
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2 text-white">{info.title}</h3>
                    {info.lines.map((line, idx) => (
                      <p key={idx} className="text-slate-400 text-sm">
                        {line.href ? (
                          <a href={line.href} className="hover:text-cyan-400 transition-colors">
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
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
            <h3 className="text-2xl mb-6 text-white">Trimiteți-ne un mesaj</h3>
            
            {submitted ? (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
                  <Send className="w-8 h-8 text-cyan-400" />
                </div>
                <h4 className="text-xl text-white mb-2">Mulțumim pentru mesaj!</h4>
                <p className="text-slate-400">Vă vom contacta în cel mai scurt timp posibil.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2 text-slate-300">
                    Nume complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Numele dumneavoastră"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 text-slate-300">
                    Adresă email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="exemplu@email.ro"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm mb-2 text-slate-300">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder={siteContent.contact.phones[0].display}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm mb-2 text-slate-300">
                    Mesaj *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    placeholder="Descrieți proiectul dumneavoastră sau întrebările pe care le aveți..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
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
              <h3 className="text-2xl mb-2 text-white">Locație — sediu social</h3>
              <p className="text-slate-400 text-sm mb-1">
                {siteContent.company.street}, {siteContent.company.locality},{' '}
                {siteContent.company.postalCode}, județ {siteContent.company.county}
              </p>
              <a
                href={siteContent.contact.mapOpenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Deschide în Google Maps
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50 shadow-xl min-h-[320px] md:min-h-[420px] flex-1">
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
