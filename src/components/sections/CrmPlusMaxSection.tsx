import { MacreaCrmMaxScene } from '@/assets/max'

export default function CrmPlusMaxSection() {
  return (
    <section className="bg-[#F6FAFF] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Titre + intro */}
        <div className="mb-10 text-center animate-fade-in-up">
          <h2 className="text-2xl font-bold text-[#1e293b] md:text-3xl">
            <span className="bg-gradient-to-r from-[#0091ff] to-[#00cfff] bg-clip-text text-transparent">MaCréa CRM</span> organise votre business.
            <span className="block text-[#0091ff] mt-1">
              M.A.X. le fait travailler pour vous.
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#64748b] md:text-base leading-relaxed">
            MaCréa CRM est votre base solide pour gérer clients, prospects et activités.
            Quand vous ajoutez M.A.X. par-dessus, votre CRM devient intelligent,
            auto-correcteur et capable d'exécuter des actions à votre place.
          </p>
        </div>

        {/* 2 colonnes + visuel */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_minmax(0,1.2fr)] lg:items-center">
          {/* Colonne gauche : MaCréa CRM seul */}
          <div
            className="rounded-2xl bg-white/90 p-6 shadow-sm border border-[rgba(0,145,255,0.1)] animate-slide-in-scale"
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">
              Sans M.A.X.
            </p>
            <h3 className="mt-1 text-base font-bold text-[#1e293b] md:text-lg">
              Ce que MaCréa CRM fait déjà pour vous
            </h3>

            <ul className="mt-4 space-y-2 text-sm text-[#64748b]">
              <li className="flex gap-2 items-start">
                <span className="text-[#0091ff] font-bold">•</span>
                <span>Gestion des comptes, contacts, prospects et opportunités.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-[#0091ff] font-bold">•</span>
                <span>Suivi des emails, rendez-vous, appels, tâches et calendrier.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-[#0091ff] font-bold">•</span>
                <span>Pipelines, vues filtrées et tableaux personnalisés.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-[#0091ff] font-bold">•</span>
                <span>Champs personnalisables pour adapter le CRM à votre métier.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-[#0091ff] font-bold">•</span>
                <span>Imports / exports CSV pour garder vos données à jour.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-[#0091ff] font-bold">•</span>
                <span>Rôles, permissions et sécurité au niveau entreprise.</span>
              </li>
            </ul>
          </div>

          {/* Colonne droite : visuel + MaCréa CRM + MAX */}
          <div
            className="space-y-5 animate-slide-in-scale"
            style={{ animationDelay: '400ms', animationFillMode: 'both' }}
          >
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[#00E4FF]/20 blur-2xl" />
              <img
                src={MacreaCrmMaxScene}
                alt="M.A.X. qui agit sur MaCréa CRM"
                className="relative w-full rounded-[2rem] shadow-xl animate-float-slow"
              />
            </div>

            <div className="rounded-2xl bg-white/95 p-6 shadow-sm border border-[rgba(0,228,255,0.2)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                Avec M.A.X. par-dessus
              </p>
              <h3 className="mt-1 text-base font-bold text-[#1e293b] md:text-lg">
                Ce que devient votre CRM quand vous ajoutez <span className="bg-gradient-to-r from-[#0091ff] to-[#00cfff] bg-clip-text text-transparent">M.A.X.</span>
              </h3>

              <ul className="mt-4 space-y-2 text-sm text-[#64748b]">
                <li className="flex gap-2 items-start">
                  <span className="text-[#00E4FF] font-bold">✓</span>
                  <span><span className="font-semibold">Analyse IA</span> de vos données : erreurs, doublons, champs manquants.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#00E4FF] font-bold">✓</span>
                  <span><span className="font-semibold">Self-Healing :</span> M.A.X. propose et applique des corrections dans MaCréa CRM.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#00E4FF] font-bold">✓</span>
                  <span><span className="font-semibold">Import CSV intelligent :</span> nettoyage, enrichissement, insertion propre.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#00E4FF] font-bold">✓</span>
                  <span><span className="font-semibold">Exécution automatique :</span> WhatsApp, SMS, emails, workflows automatisation.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#00E4FF] font-bold">✓</span>
                  <span><span className="font-semibold">Priorisation IA</span> des leads et suggestions de relance ciblée.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#00E4FF] font-bold">✓</span>
                  <span>Modes <span className="font-semibold">Auto, Assisté et Conseil</span> selon le niveau d'autonomie souhaité.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <p className="mt-8 text-center text-sm text-[#64748b] animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
          <span className="font-semibold">Sans M.A.X.</span>, vous avez un CRM structuré. <span className="font-semibold text-[#0091ff]">Avec M.A.X.</span>, vous avez un CRM qui pense et agit pour vous.
        </p>
      </div>
    </section>
  )
}
