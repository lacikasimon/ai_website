import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import { useSeo } from '../seo/useSeo';
import { siteContent } from '../content/siteContent';

const projectTitle = 'Investiții pentru digitalizarea societății GENE SYS SECURITY SRL, cod SMIS 334780';
const launchPressPdfUrl = '/docs/smis-334780-comunicat-demarare.pdf';
const launchPressUrl = 'https://portalsm.ro/2025/12/comunicat-de-presa-gene-sys-security-srl/';
const regionalLinks = [
  { label: 'www.regionordvest.ro', href: 'https://regionordvest.ro/' },
  { label: 'www.nord-vest.ro', href: 'https://www.nord-vest.ro/' },
];

const projectObjectives = {
  general:
    'Obiectivul general al proiectului este de a valorifica avantajele digitalizării în beneficiul companiei, prin realizarea unor investiții ce conduc la atingerea unui nivel de intensitate digitală ridicat în cadrul activității desfășurate de către societate, activitate circumscrisă codului CAEN 4321 - Lucrări de instalații electrice.',
  specific: [
    'realizarea unei investiții pentru adoptarea tehnologiilor și a instrumentelor digitale care conduce la inovarea modelului de afaceri, prin achiziția de echipamente și tehnologii necesare pentru transformarea digitală, inclusiv pentru derularea proceselor interne, interacțiunea cu clienții, distribuția serviciilor oferite și colectarea și analiza de date (laptop-uri, monitoare, telefoane mobile, soluție cloud privat, imprimantă multifuncțională, soluție de securitate cibernetică, program de gestiune completă a afacerii (ERP/CRM), robot software RPA);',
    'realizarea unei investiții pentru creșterea utilizării tehnologiei digitale de către societate în scopul creșterii vizibilității, prin crearea unui website adaptat activității de e-commerce și cu un grad ridicat de interactivitate, crearea unei prezențe active pe rețelele sociale și implementarea unei soluții pentru promovarea online.',
  ],
};

const projectDescription = [
  'Proiectul propus își va aduce contribuția în mod direct la atingerea obiectivului Priorității 1 - O regiune competitivă prin inovare, digitalizare și întreprinderi dinamice din cadrul Programului Regional Nord-Vest 2021-2027.',
  'Inițiativele propuse vor conduce la consolidarea culturii digitale în cadrul societății, la transformarea și îmbunătățirea experienței utilizatorilor și a clienților acesteia și la eficientizarea activităților derulate.',
];

const implementationStages = [
  {
    date: '28.11.2025',
    title: 'Semnare Contract de finanțare',
  },
  {
    date: '29.12.2025',
    title: 'Publicare comunicat de presă demarare proiect',
    href: launchPressPdfUrl,
    label: 'Descarcă comunicatul PDF',
    secondaryHref: launchPressUrl,
    secondaryLabel: 'Vezi comunicatul pe PresaSM',
  },
];

const communications = [
  {
    title: 'Comunicat de lansare proiect',
    href: launchPressPdfUrl,
    label: 'Descarcă comunicatul PDF',
    secondaryHref: launchPressUrl,
    secondaryLabel: 'Vezi comunicatul pe PresaSM',
  },
  {
    title: 'Comunicat de presă finalizare proiect',
    body: 'Va fi publicat la finalizarea proiectului.',
  },
];

export function FundingPage() {
  useSeo({
    title: `${projectTitle} | ${siteContent.meta.ogTitle}`,
    description: `${projectTitle}. Proiect finanțat prin Programul Regional Nord-Vest 2021-2027.`,
    path: '/finantare-ue',
    keywords: `${siteContent.meta.keywords}, finanțare UE, REGIO Nord-Vest, Programul Regional Nord-Vest 2021-2027, proiect finanțat, SMIS 334780`,
  });

  return (
    <div className="bg-white pt-48 sm:pt-44 md:pt-40">
      <main className="bg-white py-10 sm:py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="text-blue-700 transition-colors hover:text-blue-950">
              Acasă
            </Link>
            <span className="mx-2" aria-hidden>/</span>
            <span className="text-slate-700" aria-current="page">Finanțare UE</span>
          </nav>

          <article className="space-y-10">
            <header className="max-w-4xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-blue-800">
                Proiect finanțat prin Programul Regional Nord-Vest 2021-2027
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-blue-950 sm:text-4xl">
                {projectTitle}
              </h1>
            </header>

            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-950">Descrierea proiectului</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">
                {projectDescription.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div className="border-l-4 border-blue-700 pl-4">
                  <h3 className="text-lg font-semibold text-slate-950">Obiectivul general</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{projectObjectives.general}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">Obiective specifice</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
                    {projectObjectives.specific.map((objective) => (
                      <li key={objective} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-700" aria-hidden />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-950">Stadiile implementării proiectului</h2>
              <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                {implementationStages.map((stage) => (
                  <div key={`${stage.date}-${stage.title}`} className="grid gap-2 py-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
                    <time className="text-sm font-semibold text-blue-800">{stage.date}</time>
                    <div>
                      <p className="font-medium text-slate-950">{stage.title}</p>
                      {stage.href ? (
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                          <a
                            href={stage.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-800 underline underline-offset-2 hover:text-blue-950"
                          >
                            {stage.label}
                            <ExternalLink className="h-4 w-4" aria-hidden />
                          </a>
                          {stage.secondaryHref ? (
                            <a
                              href={stage.secondaryHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 underline underline-offset-2 hover:text-blue-950"
                            >
                              {stage.secondaryLabel}
                              <ExternalLink className="h-4 w-4" aria-hidden />
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 border-t border-slate-200 pt-8 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-xl font-semibold text-slate-950">Galerie foto</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Materialele foto relevante pentru evoluția proiectului vor fi publicate pe această pagină pe
                  parcursul implementării.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-xl font-semibold text-slate-950">Galerie video</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Materialele video sau alte materiale grafice elocvente vor fi adăugate atunci când vor fi
                  disponibile.
                </p>
              </div>
            </section>

            <section className="border-t border-slate-200 pt-8">
              <div className="rounded-lg bg-blue-950 px-5 py-6 text-white sm:px-6">
                <p className="text-2xl font-semibold">Investim în viitorul regiunii!</p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-blue-100">
                  {regionalLinks.map((link, index) => (
                    <span key={link.href} className="inline-flex items-center gap-3">
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        {link.label}
                      </a>
                      {index < regionalLinks.length - 1 ? <span aria-hidden>I</span> : null}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-blue-100 bg-blue-50 p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-slate-700">
                Pentru informații detaliate despre celelalte programe cofinanțate de Uniunea Europeană, vă
                invităm să vizitați{' '}
                <a
                  href="https://oportunitati-ue.gov.ro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-800 underline underline-offset-2 hover:text-blue-950"
                >
                  www.oportunitati-ue.gov.ro
                </a>
                .
              </p>
            </section>

            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-950">Comunicate de presă</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {communications.map((item) => (
                  <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
                    <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                    {item.body ? <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p> : null}
                    {item.href ? (
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-800 underline underline-offset-2 hover:text-blue-950"
                        >
                          {item.label}
                          <ExternalLink className="h-4 w-4" aria-hidden />
                        </a>
                        {item.secondaryHref ? (
                          <a
                            href={item.secondaryHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 underline underline-offset-2 hover:text-blue-950"
                          >
                            {item.secondaryLabel}
                            <ExternalLink className="h-4 w-4" aria-hidden />
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}
