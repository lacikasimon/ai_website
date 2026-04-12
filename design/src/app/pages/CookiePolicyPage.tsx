import { Link } from 'react-router';
import { siteContent } from '../content/siteContent';
import { useSeo } from '../seo/useSeo';

export function CookiePolicyPage() {
  const { meta, cookiePolicy } = siteContent;

  useSeo({
    title: `${cookiePolicy.title} | ${meta.ogTitle}`,
    description:
      'Informare privind fișierele cookie utilizate pe site-ul GENE SYS SECURITY SRL — tipuri, durată și gestionarea preferințelor.',
    path: '/politica-cookie-uri',
    keywords: `${meta.keywords}, politică cookie, GDPR România`,
  });

  return (
    <div className="pt-24">
      <section className="border-b border-blue-100 bg-white py-10">
        <div className="container mx-auto max-w-3xl px-4">
          <nav className="mb-6 text-sm text-slate-500">
            <Link to="/" className="text-blue-700 transition-colors hover:text-blue-900">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-700">{cookiePolicy.title}</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{cookiePolicy.title}</h1>
          <p className="mt-2 text-sm text-slate-500">Ultima actualizare: {cookiePolicy.lastUpdated}</p>
        </div>
      </section>

      <article className="py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <p className="mb-10 leading-relaxed text-slate-700">{cookiePolicy.intro}</p>
          <div className="space-y-10">
            {cookiePolicy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">{section.heading}</h2>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-12 text-sm text-slate-600">
            Pentru solicitări:{' '}
            <Link to="/contact" className="font-medium text-blue-800 underline underline-offset-2 hover:text-blue-950">
              pagina Contact
            </Link>
            .
          </p>
        </div>
      </article>
    </div>
  );
}
