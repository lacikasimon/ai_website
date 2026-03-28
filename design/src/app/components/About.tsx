import { Target, Lightbulb, Award } from 'lucide-react';

export function About() {
  return (
    <section id="despre-noi" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-4">
            <span className="text-cyan-400">Despre Noi</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Partenerul tău de încredere în era transformării digitale
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1748171159071-d27f80d6774b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwZW5naW5lZXIlMjB3b3JraW5nfGVufDF8fHx8MTc3NDA5NTM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="GENE SYS SECURITY profesionist"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              <strong className="text-white">GENE SYS SECURITY SRL</strong> este o companie dedicată furnizării de soluții inovatoare și eficiente pentru sectoarele rezidențial, comercial și industrial. Ne axăm pe o creștere durabilă și pe adaptabilitate constantă la cerințele pieței.
            </p>

            <div className="space-y-6">
              {/* Misiunea Noastră */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-lg flex-shrink-0">
                    <Target className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-white">Misiunea Noastră</h3>
                    <p className="text-slate-400">
                      Misiunea noastră este să implementăm cele mai noi tehnologii și soluții durabile, asigurând în același timp un nivel înalt de calitate și siguranță pentru fiecare proiect.
                    </p>
                  </div>
                </div>
              </div>

              {/* Viziunea Noastră */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-lg flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-white">Viziunea Noastră</h3>
                    <p className="text-slate-400">
                      Ne propunem să devenim lideri în furnizarea de soluții tehnice care să răspundă celor mai complexe nevoi ale clienților noștri.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg mb-4">
              <Award className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="text-white mb-2">Consultanță</h4>
            <p className="text-sm text-slate-400">Specializată și personalizată</p>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg mb-4">
              <Lightbulb className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="text-white mb-2">Proiectare</h4>
            <p className="text-sm text-slate-400">Tehnologii de vârf</p>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg mb-4">
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="text-white mb-2">Execuție</h4>
            <p className="text-sm text-slate-400">Profesională și eficientă</p>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg mb-4">
              <Award className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="text-white mb-2">Mentenanță</h4>
            <p className="text-sm text-slate-400">Suport continuu</p>
          </div>
        </div>
      </div>
    </section>
  );
}
