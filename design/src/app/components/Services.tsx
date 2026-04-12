import type { LucideIcon } from 'lucide-react';
import { Zap, Sun, Camera, ShieldAlert, Wrench, Network } from 'lucide-react';
import { Link } from 'react-router';
import { siteContent } from '../content/siteContent';
import { SectionBreak, SectionEyebrow } from './SectionBreak';

const ICON_BY_SLUG: Record<string, LucideIcon> = {
  'instalatii-electrice': Zap,
  fotovoltaice: Sun,
  'securitate-cctv': Camera,
  'detectie-efractie': ShieldAlert,
  mentenanta: Wrench,
  consultanta: Network,
};

const accentBar = [
  'border-t-blue-700',
  'border-t-sky-500',
  'border-t-indigo-600',
  'border-t-blue-600',
  'border-t-cyan-600',
  'border-t-blue-800',
] as const;

export function Services() {
  const intro = siteContent.home.servicesIntro;
  const services = siteContent.servicesCatalog;

  return (
    <section id="servicii" className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/50 to-slate-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="mb-6 w-full sm:mb-8">
          <SectionBreak />
        </div>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionEyebrow>{intro.sectionLabel}</SectionEyebrow>
          <h2 className="text-5xl md:text-6xl mb-4 font-semibold tracking-tight text-slate-900">{intro.title}</h2>
          <p className="text-xl text-slate-600 leading-relaxed">{intro.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = ICON_BY_SLUG[service.slug] ?? Zap;
            const bar = accentBar[index % accentBar.length];
            return (
              <Link
                key={service.slug}
                to={`/servicii/${service.slug}`}
                className={`group bg-white border border-slate-200 border-t-4 ${bar} rounded-xl p-8 hover:border-x hover:border-b hover:border-blue-200/80 transition-all hover:shadow-xl hover:shadow-blue-950/10 block shadow-sm`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-3 rounded-lg border border-blue-100 group-hover:from-white group-hover:to-blue-50/80 transition-colors">
                    <Icon className="w-8 h-8 text-blue-800" />
                  </div>
                </div>
                <h3 className="text-xl mb-3 text-slate-900 group-hover:text-slate-950 transition-colors">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed text-[15px]">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-blue-700/80 group-hover:text-blue-900 text-sm font-medium flex items-center gap-2 transition-colors">
                  Detalii serviciu →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
