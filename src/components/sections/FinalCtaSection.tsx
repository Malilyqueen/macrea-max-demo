import { useNavigate } from 'react-router-dom'
import { MaxHeroHappy } from '@/assets/max'

export default function FinalCtaSection() {
  const navigate = useNavigate()

  const handleEarlyBirds = () => {
    navigate('/tarifs')
  }

  return (
    <section className="relative bg-gradient-to-b from-white to-[#F6FAFF] py-16 md:py-20 overflow-hidden">
      {/* Glow background décoratif */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-[#0091ff]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        {/* Avatar MAX flottant */}
        <div className="mb-6 flex justify-center animate-fade-in-up">
          <img
            src={MaxHeroHappy}
            alt="M.A.X. heureux"
            className="h-20 w-20 animate-float"
          />
        </div>

        {/* Titre */}
        <h2 
          className="text-2xl font-bold text-[#1e293b] md:text-3xl lg:text-4xl animate-fade-in-up"
          style={{ animationDelay: '100ms', animationFillMode: 'both' }}
        >
          <span className="bg-gradient-to-r from-[#0091ff] to-[#00cfff] bg-clip-text text-transparent">M.A.X.</span> ouvre ses portes aux premières entreprises.
          <span className="block mt-2">Prenez une longueur d'avance.</span>
        </h2>

        {/* Sous-titre */}
        <p 
          className="mx-auto mt-4 max-w-2xl text-base text-[#64748b] md:text-lg leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '200ms', animationFillMode: 'both' }}
        >
          Lancez la démo interactive ou réservez votre accès Early Birds pour faire partie des premiers à utiliser M.A.X. avec MaCréa CRM.
        </p>

        {/* Boutons CTA */}
        <div 
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center animate-fade-in-up"
          style={{ animationDelay: '300ms', animationFillMode: 'both' }}
        >
          {/* Bouton principal */}
          <button
            onClick={() => navigate('/demoboard')}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#0091ff] to-[#00cfff] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#0091ff]/30"
          >
            <span className="relative z-10">Voir la démo interactive</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00cfff] to-[#0091ff] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>

          {/* Bouton secondaire */}
          <button
            onClick={handleEarlyBirds}
            className="rounded-full border-2 border-[#0091ff] bg-white/80 px-8 py-3.5 text-base font-semibold text-[#0091ff] backdrop-blur-sm transition-all duration-300 hover:bg-[#0091ff] hover:text-white hover:shadow-lg hover:shadow-[#0091ff]/20"
          >
            Rejoindre les Early Birds
          </button>
        </div>

        {/* Texte de réassurance */}
        <p 
          className="mt-6 text-xs text-[#64748b] md:text-sm animate-fade-in"
          style={{ animationDelay: '400ms', animationFillMode: 'both' }}
        >
          <span className="font-semibold">Places limitées.</span> Aucune carte bancaire demandée pour l'inscription Early Birds.
        </p>
      </div>


    </section>
  )
}
