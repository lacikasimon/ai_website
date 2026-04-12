import { Building2, Factory, Home, ShoppingBag, Zap, Sun, Camera, Award } from 'lucide-react';
import { Link } from 'react-router';
import { siteContent } from '../content/siteContent';
import { useSeo } from '../seo/useSeo';
import { SectionBreak, SectionEyebrow } from '../components/SectionBreak';

export function ProjectsPage() {
  const { meta, company } = siteContent;
  useSeo({
    title: `Proiecte și referințe | ${meta.ogTitle}`,
    description: `Portofoliu de proiecte ${meta.ogTitle} — instalații electrice, fotovoltaice și securitate în ${company.locality} și la nivel național.`,
    path: '/proiecte',
    keywords: `${meta.keywords}, proiecte, referințe, portofoliu`,
  });

  const projects = [
    {
      id: 1,
      title: 'Complex Rezidențial Green Valley',
      category: 'Instalații Electrice',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1765378025264-ca795700291f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBwcm9qZWN0JTIwZW5naW5lZXJpbmd8ZW58MXx8fHwxNzc0MDk3MzAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Instalații electrice complete pentru 150 de apartamente, sistem de iluminat inteligent și infrastructură modernă.',
      stats: { surface: '12,000 m²', duration: '8 luni', year: '2024' }
    },
    {
      id: 2,
      title: 'Parc Solar Fotovoltaic',
      category: 'Sisteme Fotovoltaice',
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1724041875334-0a6397111c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHBob3Rvdm9sdGFpYyUyMHN5c3RlbXxlbnwxfHx8fDE3NzM5OTUzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Implementare sistem fotovoltaic on-grid de 500 kW pentru clădire de birouri, reducere de 70% a costurilor energetice.',
      stats: { power: '500 kW', panels: '1,250', year: '2023' }
    },
    {
      id: 3,
      title: 'Centru Comercial Security Plus',
      category: 'Securitate CCTV',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1765121689322-6befc57dc8db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYSUyMHN1cnZlaWxsYW5jZSUyMHN5c3RlbXxlbnwxfHx8fDE3NzQwNTc1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Sistem complet de supraveghere video cu 120 camere 4K, analiză video AI și stocare cloud pentru 90 de zile.',
      stats: { cameras: '120', resolution: '4K', year: '2024' }
    },
    {
      id: 4,
      title: 'Fabrică Producție Industrială',
      category: 'Instalații Electrice',
      icon: Factory,
      image: 'https://images.unsplash.com/photo-1770838773181-e1b17ec22fee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwaW5zdGFsbGF0aW9uJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NzQwOTUzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Proiectare și execuție instalații electrice industriale, tablouri electrice de medie și joasă tensiune.',
      stats: { power: '2 MW', area: '25,000 m²', year: '2023' }
    },
    {
      id: 5,
      title: 'Sistem de Alarmare Bancă',
      category: 'Detecție Efracție',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1697382608786-bcf4c113b86e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGFybSUyMHNlY3VyaXR5JTIwc3lzdGVtJTIwaW5zdGFsbGF0aW9ufGVufDF8fHx8MTc3NDA5NzMwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Sistem integrat de detecție la efracție cu senzori perimetrali, detectori de mișcare și alarmare centralizată.',
      stats: { sensors: '45', locations: '3', year: '2024' }
    },
    {
      id: 6,
      title: 'Contract Mentenanță Multisite',
      category: 'Mentenanță',
      icon: ShoppingBag,
      image: 'https://images.unsplash.com/photo-1744302448183-b401c7bcaac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljaWFuJTIwbWFpbnRlbmFuY2UlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc0MDk3MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Servicii de mentenanță preventivă și corectivă pentru rețea de 15 magazine retail, disponibilitate 24/7.',
      stats: { locations: '15', uptime: '99.8%', year: '2023-2024' }
    }
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden border-b border-blue-900/40 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(147 197 253 / 0.35) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="absolute -right-20 top-10 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <nav className="text-sm text-blue-200/90 mb-6 text-left md:text-center">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/95">Proiecte</span>
            </nav>
            <div className="mb-6 w-full sm:mb-8">
              <SectionBreak variant="onDark" />
            </div>
            <SectionEyebrow variant="onDark">Portofoliu</SectionEyebrow>
            <h1 className="text-5xl md:text-7xl mb-6 text-white font-semibold tracking-tight leading-tight">
              Proiecte realizate
            </h1>
            <p className="text-xl text-blue-100/90 leading-relaxed">
              Exemple reprezentative de lucrări pentru {siteContent.meta.ogTitle}: instalații electrice,
              energie regenerabilă și sisteme de securitate. Portofoliul poate fi completat cu proiecte
              și referințe concrete, după validare internă.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-blue-50/90 to-white border-b border-blue-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center rounded-xl bg-white border border-blue-100 py-4 shadow-sm">
              <div className="text-4xl md:text-5xl text-blue-900 mb-2 font-semibold tabular-nums">
                {siteContent.statsKpi[1].value}+
              </div>
              <div className="text-slate-600 text-sm">Proiecte livrate (estimare)</div>
            </div>
            <div className="text-center rounded-xl bg-white border border-sky-100 py-4 shadow-sm">
              <div className="text-4xl md:text-5xl text-sky-800 mb-2 font-semibold tabular-nums">50+</div>
              <div className="text-slate-600 text-sm">Clienți și parteneri</div>
            </div>
            <div className="text-center rounded-xl bg-white border border-indigo-100 py-4 shadow-sm">
              <div className="text-4xl md:text-5xl text-indigo-900 mb-2 font-semibold tabular-nums">
                {siteContent.statsKpi[0].value}+
              </div>
              <div className="text-slate-600 text-sm">Ani experiență</div>
            </div>
            <div className="text-center rounded-xl bg-gradient-to-br from-blue-950 to-blue-900 py-4 shadow-md text-white border border-blue-800">
              <div className="text-4xl md:text-5xl mb-2 font-semibold tabular-nums">24/7</div>
              <div className="text-blue-100 text-sm">Intervenții urgență</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <div 
                  key={project.id}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-all hover:shadow-lg hover:shadow-slate-900/5 shadow-sm"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                      <span className="text-slate-700 text-sm">{project.category}</span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/95 p-2 rounded-lg border border-slate-200 shadow-sm">
                        <Icon className="w-6 h-6 text-slate-700" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl mb-3 text-slate-900 group-hover:text-slate-950 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                          <span className="capitalize">{key}: {value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/40 border-t border-blue-100">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-8 md:p-12 text-center shadow-xl shadow-blue-950/25">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 border border-white/20">
              <Award className="w-8 h-8 text-amber-100" />
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 font-semibold tracking-tight text-white">
              Aveți un proiect în minte?
            </h2>
            <p className="text-xl text-blue-100/95 mb-8 max-w-2xl mx-auto">
              Contactați-ne astăzi pentru o consultanță gratuită și transformăm viziunea dumneavoastră în realitate
            </p>
            <Link 
              to="/contact"
              className="inline-block bg-white text-blue-950 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg"
            >
              Discutați cu Noi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
