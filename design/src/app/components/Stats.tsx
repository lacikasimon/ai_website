import { Award, Briefcase, Cpu } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { siteContent } from '../content/siteContent';
import { SectionBreak, SectionEyebrow } from './SectionBreak';

const statIcons = [Award, Briefcase, Cpu] as const;

function useCountUp(target: number, durationMs: number, enabled: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, enabled]);

  return value;
}

function StatCounter({
  target,
  prefix,
  suffix,
  animate,
}: {
  target: number;
  prefix: string;
  suffix: string;
  animate: boolean;
}) {
  const count = useCountUp(target, 1400, animate);
  return (
    <span className="text-4xl md:text-5xl font-bold text-slate-900 tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [countersOn, setCountersOn] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stats = siteContent.statsKpi.map((s, index) => ({
    ...s,
    icon: statIcons[index] ?? statIcons[0],
  }));

  const copy = siteContent.home.statsSection;

  return (
    <section
      ref={sectionRef}
      id="experienta"
      className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 border-y border-blue-900/50"
    >
      <div className="absolute inset-0 opacity-[0.12]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(147 197 253 / 0.35) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-6 w-full sm:mb-8">
          <SectionBreak variant="onDark" />
        </div>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionEyebrow variant="onDark">{copy.sectionLabel}</SectionEyebrow>
          <h2 className="text-5xl md:text-6xl mb-4 font-semibold tracking-tight text-white">{copy.title}</h2>
          <p className="text-xl text-blue-100/90 leading-relaxed">{copy.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-white/98 border border-white/60 rounded-xl p-8 hover:border-blue-200 transition-all hover:shadow-2xl hover:shadow-blue-950/30 shadow-xl shadow-blue-950/20">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6 border border-blue-100 group-hover:bg-white transition-colors">
                    <Icon className="w-8 h-8 text-blue-800" />
                  </div>
                  <div className="mb-4 flex justify-center">
                    <StatCounter
                      target={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      animate={countersOn}
                    />
                  </div>
                  <h3 className="text-2xl mb-2 text-slate-900 group-hover:text-slate-950 transition-colors">
                    {stat.title}
                  </h3>
                  <p className="text-slate-600 mb-3 text-sm font-medium">{stat.highlight}</p>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="rounded-2xl p-8 md:p-12 shadow-2xl shadow-blue-950/40 border border-white/15 bg-gradient-to-br from-blue-900/80 to-slate-900/90 backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl mb-4 text-white font-medium">{copy.ctaTitle}</h3>
            <p className="text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto leading-relaxed">{copy.ctaBody}</p>
            <Link
              to="/contact"
              className="inline-block bg-white text-blue-950 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg"
            >
              {copy.ctaButton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
