import { Target, Lightbulb, Award } from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { formatInlineBold } from '../utils/formatInline';
import { SectionBreak, SectionEyebrow } from './SectionBreak';

export function About() {
  const { about } = siteContent.home;

  return (
    <section id="despre-noi" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full sm:mb-8">
          <SectionBreak />
        </div>
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <SectionEyebrow>{about.sectionBadge}</SectionEyebrow>
          <h2 className="text-5xl md:text-6xl mb-4 font-semibold tracking-tight text-slate-900">{about.sectionTitle}</h2>
          <p className="text-xl text-slate-600 leading-relaxed">{about.sectionSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-slate-200/30 blur-3xl rounded-full" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1748171159071-d27f80d6774b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwZW5naW5lZXIlMjB3b3JraW5nfGVufDF8fHx8MTc3NDA5NTM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="GENE SYS SECURITY profesionist"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 to-transparent"></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            <div className="space-y-6 mb-8">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-lg text-slate-600 leading-relaxed">
                  {formatInlineBold(p)}
                </p>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 p-8 md:p-9 text-white shadow-xl shadow-blue-950/25 mb-8 border border-blue-800/50">
              <p className="text-sm uppercase tracking-widest text-blue-200/90 mb-2">{about.commitmentTitle}</p>
              <p className="text-lg md:text-xl leading-relaxed text-blue-50">{about.commitmentBody}</p>
            </div>

            <div className="space-y-6">
              {/* Misiunea Noastră */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm border-l-4 border-l-blue-600">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0 border border-blue-100 shadow-sm">
                    <Target className="w-6 h-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-slate-900">{about.missionTitle}</h3>
                    <p className="text-slate-600">{about.missionBody}</p>
                  </div>
                </div>
              </div>

              {/* Viziunea Noastră */}
              <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-md shadow-blue-950/5 ring-1 ring-blue-100/80">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-3 rounded-lg flex-shrink-0 border border-sky-200/80">
                    <Lightbulb className="w-6 h-6 text-sky-800" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-slate-900">{about.visionTitle}</h3>
                    <p className="text-slate-600">{about.visionBody}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4 border border-blue-100">
              <Award className="w-6 h-6 text-blue-800" />
            </div>
            <h4 className="text-slate-900 mb-2">Consultanță</h4>
            <p className="text-sm text-slate-600">Specializată și personalizată</p>
          </div>
          
          <div className="bg-gradient-to-b from-blue-950 to-blue-900 border border-blue-800 rounded-xl p-6 text-center shadow-lg shadow-blue-950/20 text-white">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-4 border border-white/20">
              <Lightbulb className="w-6 h-6 text-sky-200" />
            </div>
            <h4 className="mb-2 font-semibold">Proiectare</h4>
            <p className="text-sm text-blue-100">Tehnologii de vârf</p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-50 rounded-lg mb-4 border border-sky-100">
              <Target className="w-6 h-6 text-sky-800" />
            </div>
            <h4 className="text-slate-900 mb-2">Execuție</h4>
            <p className="text-sm text-slate-600">Profesională și eficientă</p>
          </div>
          
          <div className="bg-blue-50/90 border border-blue-100 rounded-xl p-6 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg mb-4 border border-blue-200 shadow-sm">
              <Award className="w-6 h-6 text-blue-800" />
            </div>
            <h4 className="text-slate-900 mb-2">Mentenanță</h4>
            <p className="text-sm text-slate-600">Suport continuu</p>
          </div>
        </div>
      </div>
    </section>
  );
}
