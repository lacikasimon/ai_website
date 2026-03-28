import { Building2, Factory, Home, ShoppingBag, Zap, Sun, Camera, Award } from 'lucide-react';
import { Link } from 'react-router';
import { siteContent } from '../content/siteContent';

export function ProjectsPage() {
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

  const categories = [
    { name: 'Toate', count: projects.length },
    { name: 'Instalații Electrice', count: 2 },
    { name: 'Sisteme Fotovoltaice', count: 1 },
    { name: 'Securitate CCTV', count: 1 },
    { name: 'Detecție Efracție', count: 1 },
    { name: 'Mentenanță', count: 1 }
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <nav className="text-sm text-slate-500 mb-6 text-left md:text-center">
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-400">Proiecte</span>
            </nav>
            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-4">
              <span className="text-cyan-400">Portofoliu</span>
            </div>
            <h1 className="text-4xl md:text-6xl mb-6 text-white">
              Proiecte realizate
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Exemple reprezentative de lucrări pentru {siteContent.meta.ogTitle}: instalații electrice,
              energie regenerabilă și sisteme de securitate. Portofoliul poate fi completat cu proiecte
              și referințe concrete, după validare internă.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-cyan-400 mb-2">
                {siteContent.statsKpi[1].value}+
              </div>
              <div className="text-slate-400">Proiecte livrate (estimare)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-cyan-400 mb-2">50+</div>
              <div className="text-slate-400">Clienți și parteneri</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-cyan-400 mb-2">
                {siteContent.statsKpi[0].value}+
              </div>
              <div className="text-slate-400">Ani experiență</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-cyan-400 mb-2">24/7</div>
              <div className="text-slate-400">Intervenții urgență</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <div 
                  key={project.id}
                  className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 px-3 py-1 rounded-full">
                      <span className="text-cyan-400 text-sm">{project.category}</span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-cyan-500/10 p-2 rounded-lg">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
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
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-6">
              <Award className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-3xl md:text-4xl mb-4 text-white">
              Aveți un proiect în minte?
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Contactați-ne astăzi pentru o consultanță gratuită și transformăm viziunea dumneavoastră în realitate
            </p>
            <Link 
              to="/contact"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
            >
              Discutați cu Noi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
