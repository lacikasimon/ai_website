import { Link } from 'react-router';
import { siteContent } from '../content/siteContent';
import { useSeo } from '../seo/useSeo';

type GdprSection = (typeof siteContent.gdprPolicy.sections)[number];

function GdprSectionBlock({ section }: { section: GdprSection }) {
  const bullets = 'bullets' in section ? section.bullets : undefined;

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">{section.heading}</h2>
      <div className="space-y-4 text-slate-700 leading-relaxed">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {bullets && bullets.length > 0 && (
        <ul className="mt-5 list-disc space-y-2 pl-6 text-slate-700">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function GdprPage() {
  const { meta, gdprPolicy } = siteContent;

  useSeo({
    title: `${gdprPolicy.title} | ${meta.ogTitle}`,
    description:
      'Informare GDPR privind prelucrarea datelor personale de către GENE SYS SECURITY SRL: scopuri, temeiuri legale, destinatari, durată și drepturile persoanelor vizate.',
    path: '/gdpr',
    keywords: `${meta.keywords}, GDPR, protecția datelor personale, confidențialitate, drepturile persoanelor vizate`,
  });

  return (
    <div className="pt-24">
      <section className="border-b border-blue-100 bg-white py-10">
        <div className="container mx-auto max-w-4xl px-4">
          <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="text-blue-700 transition-colors hover:text-blue-900">
              Acasă
            </Link>
            <span className="mx-2" aria-hidden>/</span>
            <span className="text-slate-700" aria-current="page">{gdprPolicy.title}</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-800">GDPR</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{gdprPolicy.title}</h1>
          <p className="mt-2 text-sm text-slate-500">Ultima actualizare: {gdprPolicy.lastUpdated}</p>
        </div>
      </section>

      <article className="bg-white py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="max-w-3xl text-lg leading-relaxed text-slate-700">{gdprPolicy.intro}</p>

          <dl className="mt-10 grid gap-4 md:grid-cols-2">
            {gdprPolicy.quickFacts.map((item) => (
              <div key={item.label} className="rounded-lg border border-blue-100 bg-blue-50/45 p-5">
                <dt className="text-sm font-semibold uppercase tracking-wider text-blue-800">{item.label}</dt>
                <dd className="mt-2 text-base leading-relaxed text-slate-800">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 space-y-10">
            {gdprPolicy.sections.map((section) => (
              <GdprSectionBlock key={section.heading} section={section} />
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-slate-200 bg-slate-50 px-5 py-5 text-sm leading-relaxed text-slate-700">
            Pentru detalii despre cookie-uri, consultați{' '}
            <Link to="/politica-cookie-uri" className="font-medium text-blue-800 underline underline-offset-2 hover:text-blue-950">
              Politica privind fișierele cookie
            </Link>
            . Pentru solicitări directe, folosiți{' '}
            <Link to="/contact#contact" className="font-medium text-blue-800 underline underline-offset-2 hover:text-blue-950">
              pagina Contact
            </Link>
            .
          </div>
        </div>
      </article>
    </div>
  );
}
