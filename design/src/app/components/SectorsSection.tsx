import { Building2, Factory, Home, Shield, Sun, Waypoints } from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { SectionBreak, SectionEyebrow } from './SectionBreak';

const icons = [Home, Building2, Factory, Sun, Shield, Waypoints] as const;

export function SectorsSection() {
  const { sectors } = siteContent.home;

  return (
    <section id="sectoare" className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full sm:mb-7">
          <SectionBreak />
        </div>
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <SectionEyebrow>{sectors.sectionLabel}</SectionEyebrow>
          <h2 className="text-5xl md:text-6xl mb-4 font-semibold tracking-tight text-slate-900">{sectors.title}</h2>
          <p className="text-lg text-slate-600 leading-relaxed">{sectors.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.items.map((item, index) => {
            const Icon = icons[index] ?? icons[0];
            return (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-200/80 transition-all"
              >
                <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 border border-blue-100">
                  <Icon className="h-6 w-6 text-blue-800" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
