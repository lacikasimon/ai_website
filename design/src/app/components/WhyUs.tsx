import { FileText, ShieldCheck, MessageSquare, Wrench } from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { SectionBreak, SectionEyebrow } from './SectionBreak';

const icons = [FileText, ShieldCheck, MessageSquare, Wrench] as const;

export function WhyUs() {
  const { whyUs } = siteContent.home;

  return (
    <section id="de-ce-noi" className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white border-y border-blue-100/80">
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full sm:mb-7">
          <SectionBreak />
        </div>
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <SectionEyebrow>{whyUs.sectionLabel}</SectionEyebrow>
          <h2 className="text-5xl md:text-6xl mb-4 font-semibold tracking-tight text-slate-900">{whyUs.title}</h2>
          <p className="text-lg text-slate-600 leading-relaxed">{whyUs.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {whyUs.pillars.map((pillar, index) => {
            const Icon = icons[index] ?? icons[0];
            return (
              <div
                key={pillar.title}
                className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-200/80 transition-all"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-950 to-blue-800 text-white shadow-md">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{pillar.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{pillar.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
