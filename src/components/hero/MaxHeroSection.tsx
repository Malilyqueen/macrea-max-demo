import { MaxHeroGuide } from '@/assets/max'

export default function MaxHeroSection() {
  return (
    <section className="bg-[#F6FAFF] relative overflow-hidden">
      {/* Neural background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[rgba(0,145,255,0.04)] via-transparent to-transparent" style={{ backgroundPosition: '20% 30%', backgroundSize: '80% 80%' }}></div>
        <div className="absolute inset-0 bg-gradient-radial from-[rgba(0,207,255,0.03)] via-transparent to-transparent" style={{ backgroundPosition: '80% 70%', backgroundSize: '80% 80%' }}></div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-16 md:flex-row md:py-20 relative z-10">
        {/* Colonne gauche : texte */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-medium text-[#0091ff] shadow-sm border border-[rgba(0,145,255,0.2)]">
            <span className="h-2 w-2 rounded-full bg-[#00E4FF] animate-pulse" />
            <span>Nouveau · Self-Healing CRM™</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight text-[#1e293b] md:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-[#0091ff] to-[#00cfff] bg-clip-text text-transparent">M.A.X.</span>, votre expert marketing IA
            <span className="block text-[#0091ff] italic">qui pilote votre CRM tout seul.</span>
          </h1>

          <p className="max-w-xl text-base text-[#64748b] leading-relaxed">
            <span className="font-bold text-[#1e293b]">NON ! Je ne suis pas un outil.</span><br />
            <span className="font-bold text-[#0091ff]">Je suis M.A.X votre copilote marketing IA.</span><br />
            Je pilote vos campagnes, j'organise votre CRM, je relance vos clients et je nettoie vos données… pendant que vous avancez.
          </p>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#1e293b]">Ce que je sais faire :</p>
            <ul className="space-y-3 text-sm text-[#64748b]">
              <li className="flex gap-3 items-start">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-[#00E4FF] flex-shrink-0" />
                <span className="font-semibold italic">Corriger et structurer automatiquement votre base MaCréa CRM.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-[#00E4FF] flex-shrink-0" />
                <span className="font-semibold italic">Automatiser WhatsApp, SMS, emails et appels avec vos modèles.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-[#00E4FF] flex-shrink-0" />
                <span className="font-semibold italic">Nettoyer vos fichiers CSV (20 000+ lignes) avant insertion.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-[#00E4FF] flex-shrink-0" />
                <span className="font-semibold italic">Agir comme un directeur marketing IA qui priorise vos leads.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="/demoboard" className="rounded-lg bg-gradient-to-r from-[#0091ff] to-[#00cfff] px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-[0_0_25px_rgba(0,207,255,0.5)] transition-all inline-block">
              Voir la démo interactive
            </a>
            <a href="/early-birds?src=home" className="text-sm font-semibold text-[#0091ff] hover:text-[#00cfff] underline-offset-4 hover:underline transition-colors">
              Rejoindre les Early Birds
            </a>
          </div>

          <p className="text-xs text-[#64748b]">
            Aucun engagement. Démo guidée + aperçu de votre cas réel.
          </p>
        </div>

        {/* Colonne droite : visuel MAX */}
        <div className="relative flex-1">
          <div className="relative mx-auto flex max-w-sm justify-center">
            <img
              src={MaxHeroGuide}
              alt="Mascotte M.A.X."
              className="drop-shadow-2xl w-full h-auto animate-float"
            />
          </div>

          {/* Petite carte flottante - hidden on mobile to avoid overlapping mobile controls */}
          <div className="hidden md:block absolute bottom-6 right-4 rounded-2xl bg-white/90 backdrop-blur-sm px-4 py-3 text-xs shadow-lg border border-[rgba(0,145,255,0.15)] animate-fade-in max-w-[240px] relative">
            <span className="absolute -top-2 -left-3 bg-yellow-600 text-white text-[10px] px-1 py-0.5 rounded z-50">HERO</span>
            <p className="font-semibold text-[#1e293b] mb-1">Bonjour Chef.</p>
            <p className="text-[11px] text-[#64748b] leading-relaxed">
              J'ai déjà nettoyé votre base et optimisé vos workflows.<br />
              Quelle est la prochaine mission ?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
