import { siteContent } from '../content/siteContent';
import { SectionBreak, SectionEyebrow } from './SectionBreak';

export function FaqSection() {
  const { faq } = siteContent.home;

  return (
    <section id="intrebari" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full sm:mb-7">
          <SectionBreak />
        </div>
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <SectionEyebrow>{faq.sectionLabel}</SectionEyebrow>
            <h2 className="text-5xl md:text-6xl mb-4 font-semibold tracking-tight text-slate-900">{faq.title}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{faq.subtitle}</p>
          </div>

          <div className="space-y-3">
            {faq.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-1 open:bg-white open:shadow-md open:border-blue-200/80 transition-all"
              >
                <summary className="cursor-pointer list-none py-4 font-medium text-slate-900 flex items-start justify-between gap-3 [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="text-blue-700 text-xl leading-none group-open:rotate-45 transition-transform select-none" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
