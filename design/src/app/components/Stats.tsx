import { Award, Briefcase, Cpu } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { siteContent } from '../content/siteContent';

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
    <span className="text-4xl md:text-5xl font-bold text-cyan-400 tabular-nums">
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

  return (
    <section
      ref={sectionRef}
      id="experienta"
      className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-4">
            <span className="text-cyan-400">Experiență</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Valorile care ne definesc
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Dedicare, profesionalism și inovație în fiecare proiect
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/10 rounded-full mb-6 group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="mb-4 flex justify-center">
                    <StatCounter
                      target={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      animate={countersOn}
                    />
                  </div>
                  <h3 className="text-2xl mb-2 text-white group-hover:text-cyan-400 transition-colors">
                    {stat.title}
                  </h3>
                  <p className="text-cyan-400/90 mb-3 text-sm font-medium">{stat.highlight}</p>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl mb-4 text-white">
              Soluții electrice personalizate pentru nevoile tale
            </h3>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Contactează-ne astăzi pentru o consultanță gratuită și descoperă cum putem transforma proiectul tău
            </p>
            <Link
              to="/contact"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
            >
              Solicită o Ofertă
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
