import { siteContent } from '../content/siteContent';
import { SectionBreak, SectionEyebrow } from './SectionBreak';

export function ProcessSection() {
  const { process } = siteContent.home;

  return (
    <section id="proces" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full sm:mb-7">
          <SectionBreak />
        </div>
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <SectionEyebrow>{process.sectionLabel}</SectionEyebrow>
          <h2 className="text-5xl md:text-6xl mb-4 font-semibold tracking-tight text-slate-900">{process.title}</h2>
          <p className="text-lg text-slate-600 leading-relaxed">{process.subtitle}</p>
        </div>

        <ol className="max-w-3xl mx-auto relative border-l-2 border-blue-200 pl-8 md:pl-10 space-y-10">
          {process.steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span
                className="absolute -left-[2.125rem] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-950 text-xs font-bold text-white ring-4 ring-white shadow-md md:-left-[2.375rem]"
                aria-hidden
              >
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
