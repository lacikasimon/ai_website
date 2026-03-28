import { ShieldCheck, FileCheck, Award, CheckCircle2 } from 'lucide-react';

export function Certifications() {
  const certifications = [
    {
      icon: ShieldCheck,
      title: 'ANRE',
      fullName: 'Autoritatea Națională de Reglementare în domeniul Energiei',
      description: 'Certificare pentru instalații electrice și sisteme energetice',
      status: 'Autorizat'
    },
    {
      icon: FileCheck,
      title: 'IGPR',
      fullName: 'Inspectoratul General al Poliției Române',
      description:
        'Autorizație pentru instalarea și mentenanța sistemelor de securitate (inclusiv CCTV și detecție la efracție), conform reglementărilor pentru firme de specialitate.',
      status: 'Autorizat'
    }
  ];

  const qualityStandards = [
    'Sisteme certificate de management al calității',
    'Personal calificat și instruit continuu',
    'Echipamente și materiale de ultimă generație',
    'Conformitate cu standardele europene'
  ];

  return (
    <section id="certificari" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-4">
            <span className="text-cyan-400">Certificări și Autorizații</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Credibilitate și conformitate
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Operăm în conformitate cu cele mai înalte standarde de calitate și siguranță
          </p>
        </div>

        {/* Certifications Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div 
                key={index}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-cyan-500/10 p-4 rounded-xl flex-shrink-0">
                    <Icon className="w-10 h-10 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl text-white">{cert.title}</h3>
                      <span className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full">
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-cyan-400 mb-3">
                      {cert.fullName}
                    </p>
                    <p className="text-slate-400">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Standards */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-6">
                <Award className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-3xl mb-4 text-white">
                Standarde de calitate
              </h3>
              <p className="text-lg text-slate-400 leading-relaxed">
                Ne mândrim cu respectarea strictă a tuturor reglementărilor și standardelor de calitate în toate proiectele noastre.
              </p>
            </div>
            <div className="space-y-4">
              {qualityStandards.map((standard, index) => (
                <div key={index} className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-4">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{standard}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-12 text-center">
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Toate soluțiile furnizate sunt personalizate pentru fiecare proiect în parte, 
            asigurând conformitatea cu cerințele legale și satisfacția completă a clienților noștri.
          </p>
        </div>
      </div>
    </section>
  );
}
