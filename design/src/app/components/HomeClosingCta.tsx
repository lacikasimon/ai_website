import { Link } from 'react-router';
import { ArrowRight, Phone } from 'lucide-react';
import { siteContent } from '../content/siteContent';

export function HomeClosingCta() {
  const { closingCta } = siteContent.home;
  const phone = siteContent.contact.phones[0];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_30%_20%,rgba(56,189,248,0.15),transparent_50%)]" aria-hidden />
      <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">{closingCta.title}</h2>
        <p className="text-lg text-blue-100/95 mb-10 leading-relaxed">{closingCta.body}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-950 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg min-w-[200px]"
          >
            {closingCta.primary}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/proiecte"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-medium px-8 py-4 rounded-lg text-lg transition-colors min-w-[200px]"
          >
            {closingCta.secondary}
          </Link>
        </div>
        <a
          href={`tel:${phone.tel}`}
          className="mt-10 inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors"
        >
          <Phone className="w-4 h-4" />
          sau sunați direct: <span className="font-semibold">{phone.display}</span>
        </a>
      </div>
    </section>
  );
}
