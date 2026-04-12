import { Contact } from '../components/Contact';
import { Link } from 'react-router';
import { siteContent } from '../content/siteContent';
import { useSeo } from '../seo/useSeo';

export function ContactPage() {
  const { meta, company } = siteContent;
  useSeo({
    title: `Contact și oferte | ${meta.ogTitle}`,
    description: `Contact ${meta.ogTitle} — ${company.locality}, ${company.county}. Solicită ofertă pentru instalații electrice, fotovoltaice și securitate.`,
    path: '/contact',
    keywords: `${meta.keywords}, contact, ofertă ${company.locality}`,
  });

  return (
    <div className="pt-24">
      <section className="py-8 bg-white border-b border-blue-100">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-slate-500 mb-4">
            <Link to="/" className="text-blue-700 hover:text-blue-900 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-700">Contact</span>
          </nav>
          <h1 className="text-4xl md:text-5xl text-blue-950 font-semibold tracking-tight mb-3">
            Solicită o ofertă sau o consultanță
          </h1>
          <p className="text-slate-600 max-w-2xl leading-relaxed">
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
