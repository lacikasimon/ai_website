import { ShieldCheck, FileCheck, Award, CheckCircle2 } from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { SectionBreak, SectionEyebrow } from './SectionBreak';

const ICON_BY_KEY = {
  anre: ShieldCheck,
  igpr: FileCheck,
} as const;

export function Certifications() {
  const cc = siteContent.home.certificationsContent;

  return (
    <section id="certificari" className="py-20 bg-gradient-to-b from-blue-50/90 via-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full sm:mb-8">
          <SectionBreak />
        </div>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionEyebrow>{cc.sectionLabel}</SectionEyebrow>
          <h2 className="text-5xl md:text-6xl mb-4 font-semibold tracking-tight text-slate-900">{cc.title}</h2>
          <p className="text-xl text-slate-600 leading-relaxed">{cc.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {cc.cards.map((cert, index) => {
            const Icon = ICON_BY_KEY[cert.key];
            const stripe = index === 0 ? 'border-l-blue-700' : 'border-l-sky-600';
            return (
              <div
                key={cert.key}
                className={`bg-white border border-slate-200 border-l-4 ${stripe} rounded-2xl p-8 hover:border-slate-300 hover:shadow-xl hover:shadow-blue-950/10 transition-all shadow-md`}
              >
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl flex-shrink-0 border border-blue-100 shadow-sm">
                    <Icon className="w-10 h-10 text-blue-800" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="text-2xl text-slate-900">{cert.title}</h3>
                      <span className="bg-green-50 border border-green-200 text-green-800 text-xs px-3 py-1 rounded-full">
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-slate-700 mb-3 text-sm">{cert.fullName}</p>
                    <p className="text-slate-600 text-[15px] leading-relaxed">{cert.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-2xl border border-blue-200/80 bg-white shadow-lg shadow-blue-950/5">
          <div className="h-1.5 bg-gradient-to-r from-blue-800 via-sky-500 to-blue-700" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-950 rounded-full mb-6 border border-blue-800 shadow-lg">
                <Award className="w-8 h-8 text-amber-100" />
              </div>
              <h3 className="text-3xl mb-4 text-slate-900">{cc.qualityTitle}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{cc.qualityLead}</p>
            </div>
            <div className="space-y-4">
              {cc.qualityBullets.map((standard, index) => (
                <div
                  key={standard}
                  className={`flex items-start gap-3 rounded-lg p-4 border ${
                    index % 2 === 0 ? 'bg-blue-50/80 border-blue-100' : 'bg-slate-50 border-slate-100'
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6 text-blue-700 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-800 text-[15px] leading-relaxed">{standard}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">{cc.closingNote}</p>
        </div>
      </div>
    </section>
  );
}
