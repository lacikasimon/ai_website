import { Contact } from '../components/Contact';
import { Link } from 'react-router';
import { siteContent } from '../content/siteContent';

export function ContactPage() {
  return (
    <div className="pt-24">
      <section className="py-8 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-slate-500 mb-4">
            <Link to="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-400">Contact</span>
          </nav>
          <h1 className="text-3xl md:text-4xl text-white mb-3">
            Solicită o ofertă sau o consultanță
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Echipa {siteContent.meta.ogTitle} din {siteContent.company.locality}, județul{' '}
            {siteContent.company.county}, răspunde solicitărilor pentru instalații electrice, sisteme
            fotovoltaice, securitate și mentenanță. Completați formularul sau sunați la numărul de mobil
            afișat mai jos — revenim în cel mai scurt timp posibil.
          </p>
        </div>
      </section>
      <Contact />
    </div>
  );
}
