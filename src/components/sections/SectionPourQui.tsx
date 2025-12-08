import { motion } from 'framer-motion'

const personas = [
  {
    title: "Vous cherchez plus qu'un outil.",
    text: "Vous ne voulez pas un tableau Excel maquillé. Vous voulez un copilote qui comprend vos objectifs et travaille pour vous pendant que vous avancez.",
    tag: "Copilote",
    highlight: 'copilote qui comprend vos objectifs',
    boldItalic: true
  },
  {
    title: 'Vous êtes fatigué des CRM hors de prix.',
    text: "Les CRM robustes à 500 €/mois restent froids et compliqués. M.A.X. est accessible, humain, connecté à un CRM open-source solide.",
    tag: "Accessible",
    highlight: 'M.A.X. est accessible',
    boldItalic: true
  },
  {
    title: "Vous n'avez pas le temps d'être partout.",
    text: 'M.A.X. gère relances, messages, segmentation et rappels pendant que vous travaillez, créez ou vivez.',
    tag: "Gain de temps"
  },
  {
    title: 'Peu importe votre domaine.',
    text: "Entrepreneur, commerce, service, e-commerce, coaching ou entreprise avec 20 000 prospects… M.A.X. s'adapte, organise et exécute.",
    tag: "Universel",
    highlight: "s'adapte"
  }
]

const highlightWord = (text: string, word?: string, boldItalic?: boolean) => {
  if (!word) return text
  
  const parts = text.split(word)
  return (
    <>
      {parts[0]}
      <span className="relative group/word inline-block">
        <span className={`relative z-10 ${boldItalic ? 'font-bold italic' : ''}`}>{word}</span>
        <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-cyan-400 to-sky-400 scale-x-0 origin-left transition-transform duration-500 group-hover/word:scale-x-100" />
      </span>
      {parts[1]}
    </>
  )
}

export default function SectionPourQui() {
  return (
    <section id="pour-qui" className="relative py-20 md:py-32 px-4 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50">
      {/* Orbes flottantes en arrière-plan */}
      <div className="pointer-events-none absolute top-40 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="pointer-events-none absolute bottom-40 right-1/4 w-80 h-80 bg-fuchsia-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '4s' }} />
      
      <div className="max-w-7xl mx-auto relative">
        {/* 1️⃣ BLOC NARRATIF (effet manifesto) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative max-w-3xl mx-auto text-center mb-20"
        >
          {/* Halo animé derrière le texte */}
          <div className="pointer-events-none absolute -inset-x-10 -top-10 h-40 bg-cyan-500/10 blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '3s' }} />
          
          {/* Surtitre */}
          <p className="relative z-10 text-sm font-semibold uppercase tracking-wider text-cyan-600 mb-4">
            Pour qui est fait M.A.X. ?
          </p>

          {/* Titre principal */}
          <h2 className="relative z-10 text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Si vous êtes ici,{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
              ce n'est pas un hasard.
            </span>
          </h2>

          {/* Paragraphe manifesto */}
          <p className="relative z-10 text-lg md:text-xl text-slate-600 leading-relaxed">
            <span className="font-bold italic">On n'arrive pas sur M.A.X. par accident.</span> On y arrive après les outils trop compliqués, 
            les CRM hors de prix et la charge mentale qui ne descend jamais. 
            Si vous cherchez un vrai{' '}
            <span className="font-semibold text-cyan-600">copilote</span>, 
            pas un énième logiciel, vous êtes au bon endroit.
          </p>
        </motion.div>

        {/* 2️⃣ SCÈNE VISUELLE (effet cockpit MAX) */}
        <div className="relative mt-16 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] items-stretch">
          {/* Colonne gauche : Cartes personas */}
          <div className="space-y-6">
            {personas.map((persona, index) => (
              <motion.div
                key={persona.tag}
                initial={{ opacity: 0, y: 30, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white backdrop-blur-xl p-6 md:p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:-rotate-1 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
              >
                {/* Halo interne */}
                <div className="pointer-events-none absolute inset-px rounded-3xl bg-gradient-to-br from-cyan-400/5 via-transparent to-fuchsia-500/5 z-0" />
                
                {/* Contenu */}
                <div className="relative z-10">
                  {/* Tag */}
                  <span className="inline-flex items-center rounded-full border border-cyan-400 bg-cyan-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-cyan-600 shadow-sm">
                    {persona.tag}
                  </span>
                  
                  {/* Titre */}
                  <h3 className="mt-4 text-base md:text-lg font-semibold text-slate-900">
                    {persona.title}
                  </h3>
                  
                  {/* Texte */}
                  <p className="text-sm md:text-[15px] text-slate-700 leading-relaxed">
                    {highlightWord(persona.text, persona.highlight, persona.boldItalic)}
                  </p>
                </div>

                {/* Shine effect au hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Colonne droite : Carte copilote MAX */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative h-full rounded-3xl border border-slate-200 backdrop-blur-xl p-8 flex flex-col justify-between overflow-hidden bg-white"
          >
            {/* Halo interne animé */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-sky-500/5 to-fuchsia-500/5" />
            <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 blur-[80px] rounded-full" />

            {/* Image MAX avec effet flottant */}
            <div className="relative z-10 flex justify-center mb-8">
              <div 
                className="relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.3)] animate-float border border-cyan-400"
                style={{
                  animation: 'float 6s ease-in-out infinite alternate'
                }}
              >
                <img 
                  src="/docs/readme-assets/max-hero-hello.png" 
                  alt="M.A.X. Dashboard" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50/30 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Contenu */}
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                M.A.X. vous lit{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                  entre les lignes.
                </span>
              </h3>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Il ne voit pas seulement vos données. Il comprend vos objectifs, 
                vos contraintes et votre rythme. Et il adapte ses actions pour vous 
                faire avancer.
              </p>

              {/* CTA Démo */}
              <a
                href="/demoboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-sky-400 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transform hover:scale-105"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10 8 16 12 10 16 10 8"/>
                </svg>
                Voir la démo interactive
              </a>
            </div>

            {/* Pulse effect */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-cyan-400/30 animate-ping" style={{ animationDuration: '3s' }} />
            </div>
          </motion.div>
        </div>

        {/* 3️⃣ CONCLUSION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            M.A.X. n'est pas réservé à un secteur. Il est fait pour celles et ceux qui veulent enfin un{' '}
            <span className="font-semibold bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
              vrai partenaire
            </span>{' '}
            pour réussir.
          </p>
        </motion.div>
      </div>

      {/* Keyframes CSS pour l'animation float */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(-4px);
          }
          50% {
            transform: translateY(4px);
          }
        }
      `}</style>
    </section>
  )
}
