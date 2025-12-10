import { useEffect, useState } from 'react'
import {
  MaxHeroHello,
  MaxHeroThinking,
  MaxHeroSolution,
  MaxHeroIdea,
} from '@/assets/max'

const items = [
  {
    title: "1. Je t'accueille",
    description:
      "Je commence par comprendre ton activité, ton CRM et tes priorités. Tu parles en langage humain, je traduis en actions techniques.",
    image: MaxHeroHello,
  },
  {
    title: "2. J'analyse ta base",
    description:
      "Je scanne ta base MaCréa CRM : je détecte les champs manquants, les doublons, les erreurs d'import et les données incohérentes. Je suis ton contrôleur qualité IA.",
    image: MaxHeroThinking,
  },
  {
    title: "3. Je propose la meilleure stratégie",
    description:
      "Je priorise tes leads, je suggère les bons tags, je recommande les relances et les campagnes à lancer. Tu choisis mon mode : Auto, Assisté ou Conseil.",
    image: MaxHeroSolution,
  },
  {
    title: "4. J'exécute pour toi",
    description:
      "Je déclenche tes messages WhatsApp, SMS, emails et workflows n8n. Tu gardes le contrôle. Je gère l'exécution.",
    image: MaxHeroIdea,
  },
]

export default function MaxHowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Fait défiler automatiquement les cartes actives
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, 4000) // toutes les 4 secondes
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Titre & sous-titre */}
        <div className="mb-8 text-center md:mb-10 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-[#1e293b] md:text-3xl">
            Je suis <span className="bg-gradient-to-r from-[#0091ff] to-[#00cfff] bg-clip-text text-transparent">M.A.X</span>, voici comment je travaille pour vous
          </h2>
          <p className="mt-3 text-sm text-[#64748b] md:text-base max-w-2xl mx-auto leading-relaxed">
            Je suis un copilote marketing qui ne se contente pas d'écrire :<br />
            <span className="font-semibold">j'accueille, j'analyse, je propose… et j'exécute.</span>
          </p>
          <p className="mt-2 text-xs font-medium text-[#0091ff] md:text-sm">
            Petite démonstration :
          </p>
        </div>

        {/* Cartes animées */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const isActive = index === activeIndex

            return (
              <div
                key={item.title}
                className={[
                  'group flex flex-col items-center rounded-2xl px-4 py-6 text-center shadow-sm transition-all duration-700',
                  'bg-[#F6FAFF] hover:-translate-y-2 hover:scale-105 hover:shadow-[0_8px_20px_rgba(0,145,255,0.15)]',
                  'animate-slide-in-scale',
                  isActive ? 'scale-110 -translate-y-3 border-2 border-[#00E4FF] shadow-[0_12px_30px_rgba(0,228,255,0.4)] z-10' : 'border border-[rgba(0,145,255,0.1)] scale-100',
                ].join(' ')}
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Image flottante */}
                <div
                  className={[
                    'mb-3 h-24 w-24 overflow-hidden rounded-full bg-white shadow-md border-2 transition-all duration-300',
                    'group-hover:scale-110 group-hover:rotate-3',
                    isActive ? 'border-[#00E4FF] animate-float' : 'border-[rgba(0,145,255,0.2)] animate-float-slow'
                  ].join(' ')}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h3 className={[
                  'text-sm font-bold md:text-base transition-colors',
                  isActive ? 'text-[#0091ff]' : 'text-[#1e293b]'
                ].join(' ')}>
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-[#64748b] md:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

        <p className="mt-8 text-center text-sm text-[#64748b] max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
          <span className="font-semibold">Résultat :</span> ton CRM reste propre, tes leads sont traités, et ton business tourne même quand tu n'es pas devant l'écran.
        </p>
      </div>
    </section>
  )
}
