import { Zap, Sun, Camera, ShieldAlert, Wrench, Network } from 'lucide-react';
import { Link } from 'react-router';

export function Services() {
  const services = [
    {
      icon: Zap,
      title: 'Instalații Electrice & Proiectare',
      slug: 'instalatii-electrice',
      description: 'Servicii complete de proiectare și execuție pentru construcții civile și industriale.',
      features: ['Proiectare electrică', 'Execuție lucrări', 'Construcții civile', 'Proiecte industriale']
    },
    {
      icon: Sun,
      title: 'Sisteme Fotovoltaice (On-grid / Off-grid)',
      slug: 'fotovoltaice',
      description: 'Sisteme conectate sau independente de rețea, menite să reducă costurile și să promoveze energia regenerabilă.',
      features: ['Panouri solare', 'Sisteme On-grid', 'Sisteme Off-grid', 'Energie verde']
    },
    {
      icon: Camera,
      title: 'Sisteme de Securitate & Supraveghere (CCTV)',
      slug: 'securitate-cctv',
      description: 'Monitorizare video continuă de înaltă calitate pentru protecția proprietăților și infrastructurilor critice.',
      features: ['Camere CCTV', 'Monitorizare 24/7', 'Înaltă rezoluție', 'Stocare cloud']
    },
    {
      icon: ShieldAlert,
      title: 'Sisteme de Detecție la Efracție',
      slug: 'detectie-efractie',
      description: 'Identificarea incidentelor și a tentativelor de pătrundere pentru o gestionare eficientă a riscurilor.',
      features: ['Senzori de mișcare', 'Alarme sonore', 'Notificări instant', 'Gestionare riscuri']
    },
    {
      icon: Wrench,
      title: 'Mentenanță Tehnică',
      slug: 'mentenanta',
      description: 'Servicii personalizate pentru asigurarea funcționării optime și în siguranță a clădirilor și echipamentelor.',
      features: ['Service preventiv', 'Intervenții rapide', 'Actualizări sistem', 'Suport tehnic']
    },
    {
      icon: Network,
      title: 'Consultanță și Infrastructură',
      slug: 'consultanta',
      description: 'Oferim consultanță specializată, realizăm branșamente și extinderi de rețea electrică.',
      features: ['Consultanță tehnică', 'Branșamente electrice', 'Extinderi rețea', 'Infrastructură']
    }
  ];

  return (
    <section id="servicii" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-4">
            <span className="text-cyan-400">Servicii</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Soluții complete pentru nevoile tale
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Oferim servicii de înaltă calitate în domeniul instalațiilor electrice, energiei regenerabile și securității
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                to={`/servicii/${service.slug}`}
                className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 block"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-cyan-500/10 p-3 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <h3 className="text-xl mb-3 text-white group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-500">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-cyan-400 text-sm flex items-center gap-2">
                  Află mai multe →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}