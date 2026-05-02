import { CalendarDays, FileText, Info, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { FundingLogos } from '../components/FundingLogos';
import { useSeo } from '../seo/useSeo';
import { siteContent } from '../content/siteContent';

const updates = [
  {
    title: 'Comunicat de lansare',
    body: 'Anunțul de lansare al proiectului va fi publicat pe această pagină după aprobarea conținutului.',
    icon: FileText,
  },
  {
    title: 'Stadiul proiectului',
    body: 'Descrierile privind progresul proiectului vor fi actualizate cel puțin o dată la 6 luni, cu fotografii, ilustrații sau alte materiale vizuale relevante.',
    icon: RefreshCw,
  },
  {
    title: 'Comunicat de finalizare',
    body: 'La finalizarea proiectului va fi publicat comunicatul final, împreună cu informațiile despre rezultatele obținute.',
    icon: CalendarDays,
  },
];

export function FundingPage() {
  useSeo({
    title: `Finanțare UE | ${siteContent.meta.ogTitle}`,
    description:
      'Pagină dedicată proiectului cofinanțat de Uniunea Europeană prin Programul Regional Nord-Vest 2021-2027.',
    path: '/finantare-ue',
    keywords: `${siteContent.meta.keywords}, finanțare UE, REGIO Nord-Vest, proiect cofinanțat`,
  });

  return (
    <div className="pt-24">
      <section className="border-b border-blue-100 bg-gradient-to-b from-white via-blue-50/60 to-white py-8 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-xl border border-blue-100 bg-white/90 px-4 py-5 shadow-sm shadow-blue-950/5 sm:px-6">
            <FundingLogos />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="text-blue-700 transition-colors hover:text-blue-950">
              Acasă
            </Link>
            <span className="mx-2" aria-hidden>/</span>
            <span className="text-slate-700" aria-current="page">Finanțare UE</span>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-800">
              Proiect cofinanțat
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-blue-950 sm:text-5xl">
              Pagină dedicată proiectului finanțat prin Programul Regional Nord-Vest 2021-2027
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-700">
              Această pagină prezintă informațiile publice privind proiectul pentru care GENE SYS SECURITY
              SRL beneficiază de sprijin financiar acordat prin Programul Regional Nord-Vest 2021-2027.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-blue-100 bg-blue-50/45 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-white">
                <Info className="h-5 w-5 text-blue-800" aria-hidden />
              </div>
              <p className="text-sm leading-relaxed text-slate-700">
                Pentru informații detaliate despre celelalte programe cofinanțate de Uniunea Europeană,
                vă invităm să vizitați{' '}
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
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {updates.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                    <Icon className="h-5 w-5 text-blue-800" aria-hidden />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
