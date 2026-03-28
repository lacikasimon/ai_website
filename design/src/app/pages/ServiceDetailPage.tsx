import { useParams, Link } from 'react-router';
import { Zap, Sun, Camera, ShieldAlert, Wrench, Network, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export function ServiceDetailPage() {
  const { serviceSlug } = useParams();

  const servicesData = {
    'instalatii-electrice': {
      icon: Zap,
      title: 'Instalații Electrice & Proiectare',
      tagline: 'Soluții complete pentru construcții civile și industriale',
      image: 'https://images.unsplash.com/photo-1770838773181-e1b17ec22fee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwaW5zdGFsbGF0aW9uJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NzQwOTUzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Oferim servicii complete de proiectare și execuție pentru instalații electrice, atât pentru construcții civile cât și industriale. Echipa noastră de specialiști asigură respectarea strictă a normelor de siguranță și a standardelor de calitate.',
      features: [
        'Proiectare instalații electrice pentru construcții noi',
        'Modernizare și reabilitare instalații existente',
        'Instalații pentru clădiri rezidențiale și comerciale',
        'Instalații industriale și de forță',
        'Tablouri electrice de distribuție',
        'Sisteme de iluminat interior și exterior',
        'Branșamente și racorduri electrice',
        'Autorizații și avize ANRE'
      ],
      benefits: [
        { title: 'Experiență Comprobată', desc: 'Peste 15 ani în domeniul instalațiilor electrice' },
        { title: 'Echipă Calificată', desc: 'Personal autorizat ANRE și format continuu' },
        { title: 'Materiale Premium', desc: 'Utilizăm doar echipamente certificate' },
        { title: 'Garanție Extinsă', desc: 'Toate lucrările beneficiază de garanție' }
      ],
      process: [
        { step: '1', title: 'Consultanță', desc: 'Evaluarea necesităților și propunerea soluțiilor optime' },
        { step: '2', title: 'Proiectare', desc: 'Realizarea documentației tehnice complete' },
        { step: '3', title: 'Execuție', desc: 'Implementarea conform standardelor' },
        { step: '4', title: 'Verificare', desc: 'Teste și punere în funcțiune' }
      ]
    },
    'fotovoltaice': {
      icon: Sun,
      title: 'Sisteme Fotovoltaice (On-grid / Off-grid)',
      tagline: 'Energie regenerabilă pentru un viitor sustenabil',
      image: 'https://images.unsplash.com/photo-1724041875334-0a6397111c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHBob3Rvdm9sdGFpYyUyMHN5c3RlbXxlbnwxfHx8fDE3NzM5OTUzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Implementăm sisteme fotovoltaice personalizate pentru reducerea costurilor energetice și promovarea energiei verzi. Oferim atât sisteme conectate la rețea (on-grid) cât și sisteme independente (off-grid) cu baterii de stocare.',
      features: [
        'Sisteme fotovoltaice on-grid (conectate la rețea)',
        'Sisteme fotovoltaice off-grid (autonome)',
        'Sisteme hibride cu baterii de stocare',
        'Panouri solare de ultimă generație',
        'Invertoare de înaltă eficiență',
        'Monitorizare și management energie',
        'Întreținere și service preventiv',
        'Optimizare producție energetică'
      ],
      benefits: [
        { title: 'Economii Semnificative', desc: 'Reducere cu până la 70% a facturilor la energie' },
        { title: 'Independență Energetică', desc: 'Sistem propriu de producere energie' },
        { title: 'Eco-friendly', desc: 'Zero emisii, energie curată' },
        { title: 'ROI Rapid', desc: 'Recuperarea investiției în 5-7 ani' }
      ],
      process: [
        { step: '1', title: 'Analiza Locației', desc: 'Evaluare potențial solar și consumuri' },
        { step: '2', title: 'Dimensionare', desc: 'Proiectare sistem optim pentru nevoile dvs.' },
        { step: '3', title: 'Instalare', desc: 'Montaj profesional și certificat' },
        { step: '4', title: 'Conectare', desc: 'Punere în funcțiune și monitorizare' }
      ]
    },
    'securitate-cctv': {
      icon: Camera,
      title: 'Sisteme de Securitate & Supraveghere (CCTV)',
      tagline: 'Protecție completă 24/7 pentru bunurile dumneavoastră',
      image: 'https://images.unsplash.com/photo-1765121689322-6befc57dc8db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYSUyMHN1cnZlaWxsYW5jZSUyMHN5c3RlbXxlbnwxfHx8fDE3NzQwNTc1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Proiectăm și instalăm sisteme complete de supraveghere video CCTV de ultimă generație. Oferim soluții personalizate pentru securizarea locuințelor, clădirilor comerciale și obiectivelor industriale.',
      features: [
        'Camere de supraveghere HD/4K',
        'Sisteme de înregistrare video (NVR/DVR)',
        'Vizualizare remotă prin internet',
        'Detectare mișcare și analiză video AI',
        'Stocare cloud și locală',
        'Camere cu vedere nocturnă infraroșu',
        'Monitorizare 24/7',
        'Integrare cu alte sisteme de securitate'
      ],
      benefits: [
        { title: 'Protecție Continuă', desc: 'Supraveghere non-stop a proprietății' },
        { title: 'Acces Remote', desc: 'Vizualizare live de pe orice dispozitiv' },
        { title: 'Rezoluție Superioară', desc: 'Imagini clare și detaliate 4K' },
        { title: 'Autorizat IGPR', desc: 'Instalare conform reglementărilor' }
      ],
      process: [
        { step: '1', title: 'Evaluare', desc: 'Analiza perimetrului și punctelor critice' },
        { step: '2', title: 'Proiectare', desc: 'Schema de amplasare și cablare' },
        { step: '3', title: 'Instalare', desc: 'Montaj camere și configurare sistem' },
        { step: '4', title: 'Training', desc: 'Instruire utilizare și acces remote' }
      ]
    },
    'detectie-efractie': {
      icon: ShieldAlert,
      title: 'Sisteme de Detecție la Efracție',
      tagline: 'Protecție activă împotriva intruziunilor',
      image: 'https://images.unsplash.com/photo-1697382608786-bcf4c113b86e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGFybSUyMHNlY3VyaXR5JTIwc3lzdGVtJTIwaW5zdGFsbGF0aW9ufGVufDF8fHx8MTc3NDA5NzMwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Instalăm sisteme avansate de detecție la efracție pentru identificarea rapidă a tentativelor de pătrundere neautorizată. Soluțiile noastre asigură protecție completă și gestionare eficientă a riscurilor de securitate.',
      features: [
        'Senzori de mișcare cu infraroșu',
        'Contacte magnetice pentru uși și ferestre',
        'Detectoare de spargere geam',
        'Centrale de alarmare smart',
        'Alarmare sonoră și vizuală',
        'Notificări instant pe telefon',
        'Integrare cu servicii de pază',
        'Sisteme antijamming'
      ],
      benefits: [
        { title: 'Răspuns Rapid', desc: 'Alertare instantanee la încercări de efracție' },
        { title: 'Descurajare', desc: 'Prezența vizibilă descurajează infractorii' },
        { title: 'Conectare Pază', desc: 'Alertare automată firme de securitate' },
        { title: 'Tehnologie Avansată', desc: 'Detectoare cu multiple tehnologii' }
      ],
      process: [
        { step: '1', title: 'Audit Securitate', desc: 'Identificare vulnerabilități' },
        { step: '2', title: 'Soluție Personalizată', desc: 'Proiectare sistem optim' },
        { step: '3', title: 'Implementare', desc: 'Instalare și configurare echipamente' },
        { step: '4', title: 'Testare', desc: 'Verificare funcționare și scenarii' }
      ]
    },
    'mentenanta': {
      icon: Wrench,
      title: 'Mentenanță Tehnică',
      tagline: 'Service preventiv și corectiv pentru funcționare optimă',
      image: 'https://images.unsplash.com/photo-1744302448183-b401c7bcaac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljaWFuJTIwbWFpbnRlbmFuY2UlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc0MDk3MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Oferim servicii complete de mentenanță pentru asigurarea funcționării optime și în siguranță a instalațiilor și echipamentelor. Contracte personalizate de service preventiv și intervenții rapide în caz de defecțiuni.',
      features: [
        'Mentenanță preventivă programată',
        'Intervenții de urgență 24/7',
        'Verificări periodice instalații electrice',
        'Service sisteme fotovoltaice',
        'Mentenanță sisteme securitate',
        'Actualizări software și firmware',
        'Rapoarte detaliate de service',
        'Contracte de mentenanță pe termen lung'
      ],
      benefits: [
        { title: 'Disponibilitate Maximă', desc: 'Prevenire defecțiuni prin mentenanță preventivă' },
        { title: 'Costuri Reduse', desc: 'Evitare reparații costisitoare' },
        { title: 'Siguranță Sporită', desc: 'Funcționare conform normelor' },
        { title: 'Răspuns Rapid', desc: 'Echipe de intervenție disponibile 24/7' }
      ],
      process: [
        { step: '1', title: 'Planificare', desc: 'Stabilire program de mentenanță' },
        { step: '2', title: 'Inspecție', desc: 'Verificări tehnice și teste' },
        { step: '3', title: 'Intervenție', desc: 'Reparații și înlocuiri componente' },
        { step: '4', title: 'Raportare', desc: 'Documentare și recomandări' }
      ]
    },
    'consultanta': {
      icon: Network,
      title: 'Consultanță și Infrastructură',
      tagline: 'Expertiză tehnică pentru proiecte de succes',
      image: 'https://images.unsplash.com/photo-1748171159071-d27f80d6774b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwZW5naW5lZXIlMjB3b3JraW5nfGVufDF8fHx8MTc3NDA5NTM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Oferim consultanță specializată în domeniul instalațiilor electrice și al infrastructurii energetice. Echipa noastră de ingineri vă ghidează în realizarea branșamentelor, extinderi de rețea și optimizări energetice.',
      features: [
        'Consultanță tehnică specializată',
        'Studii de fezabilitate',
        'Proiectare infrastructură electrică',
        'Branșamente electrice noi',
        'Extinderi de rețea electrică',
        'Optimizare consum energetic',
        'Audit energetic',
        'Asistență tehnică de specialitate'
      ],
      benefits: [
        { title: 'Expertiză Tehnică', desc: 'Ingineri cu experiență vastă' },
        { title: 'Soluții Optime', desc: 'Recomandări personalizate pentru fiecare proiect' },
        { title: 'Reducere Costuri', desc: 'Optimizare buget și resurse' },
        { title: 'Conformitate', desc: 'Respectare normative și standarde' }
      ],
      process: [
        { step: '1', title: 'Analiza Necesităților', desc: 'Înțelegere cerințe și obiective' },
        { step: '2', title: 'Studiu Tehnic', desc: 'Evaluare soluții și variante' },
        { step: '3', title: 'Recomandări', desc: 'Propunere soluție optimă' },
        { step: '4', title: 'Implementare', desc: 'Suport în execuție proiect' }
      ]
    }
  };

  const service = serviceSlug ? servicesData[serviceSlug as keyof typeof servicesData] : null;

  if (!service) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4 text-white">Serviciu negăsit</h1>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">
            Înapoi la pagina principală
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-slate-800/90"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Înapoi la pagina principală
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-cyan-500/10 p-4 rounded-xl">
                <Icon className="w-12 h-12 text-cyan-400" />
              </div>
              <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full">
                <span className="text-cyan-400">Servicii</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl mb-6 text-white">
              {service.title}
            </h1>
            <p className="text-2xl text-cyan-400 mb-6">
              {service.tagline}
            </p>
            <p className="text-xl text-slate-300 leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl mb-12 text-white text-center">
            Ce oferim
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {service.features.map((feature, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-slate-300">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl mb-12 text-white text-center">
            Avantajele noastre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {service.benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 text-center"
              >
                <h3 className="text-xl mb-3 text-white">{benefit.title}</h3>
                <p className="text-slate-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl mb-12 text-white text-center">
            Procesul nostru de lucru
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {service.process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-full mb-4 text-cyan-400 text-xl">
                    {step.step}
                  </div>
                  <h3 className="text-xl mb-3 text-white">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                </div>
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-cyan-400/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-4 text-white">
              Pregătit să începem?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Contactați-ne astăzi pentru o consultanță gratuită și o ofertă personalizată
            </p>
            <Link 
              to="/contact"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
            >
              Solicită o Ofertă Gratuită
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
