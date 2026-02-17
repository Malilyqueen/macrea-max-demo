import EarlyBirdCountdown from './EarlyBirdCountdown'

export default function SectionTarifsEtEarlyBird() {
  return (
    <section id="tarifs" className="py-20 md:py-32 px-4 bg-gradient-to-b from-slate-100 via-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Choisissez votre niveau de puissance avec{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
              MAX
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Deux offres. Deux niveaux d'autonomie. Un seul objectif : vous libérer de l'opérationnel.
          </p>
        </div>

        {/* Early Bird Countdown */}
        <EarlyBirdCountdown />

        {/* Plans grid - 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* MAX Starter */}
          <div className="relative rounded-3xl border-2 border-cyan-400 bg-white p-8 md:p-10 shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(34,211,238,0.25)]">
            {/* En-tête de l'offre */}
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                MAX Starter
              </h3>
              <div className="mb-4">
                <div className="text-4xl font-bold text-cyan-600">
                  169€<span className="text-2xl text-slate-600 font-normal">/mois</span>
                </div>
              </div>
              <p className="text-lg text-cyan-600 font-semibold mb-4">
                L'automatisation intelligente, prête à l'emploi
              </p>
              <p className="text-slate-600 leading-relaxed">
                MAX Starter est conçu pour les indépendants, TPE et PME qui veulent automatiser leurs actions quotidiennes sans complexité ni paramétrage lourd.
              </p>
            </div>

            {/* Capacités */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                Capacités
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Jusqu'à <strong>5 000 contacts</strong></span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Accès complet au <strong>copilote intelligent µMAX</strong></span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span><strong>Email & WhatsApp</strong> : intégrations professionnelles</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span><strong>SMS</strong> : 25 SMS inclus (international)</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600 ml-8">
                  <span className="text-sm italic">SMS supplémentaires facturés au tarif local selon le pays sélectionné</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span><strong>WhatsApp</strong> : jusqu'à 30 000 échanges inclus</span>
                </li>
              </ul>
            </div>

            {/* Automatisation */}
            <div className="mb-8 p-6 bg-gradient-to-br from-cyan-50 to-sky-50 rounded-2xl border border-cyan-200">
              <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                </svg>
                Automatisation
              </h4>
              <p className="text-slate-700 leading-relaxed">
                Jusqu'à <strong className="text-cyan-700">1 000 actions automatisées par mois</strong><br/>
                <span className="text-sm text-slate-600">(relances, qualification, tri, enrichissement, suivi)</span>
              </p>
            </div>

            {/* Fonctionnalités MAX */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Fonctionnalités MAX
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Enrichissement intelligent des leads</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Nettoyage et structuration de fichiers CSV / Excel</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Exécution automatique de tâches</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Analyse stratégique des leads</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Veille et détection d'opportunités</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Recommandations avec passage à l'action automatique</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <a 
              href="/early-birds?src=tarifs&offer=starter"
              className="block w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-bold text-lg rounded-xl hover:from-cyan-400 hover:to-sky-400 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transform hover:scale-[1.02] text-center"
            >
              🚀 Accès Early Birds (Starter)
            </a>
            <p className="text-center text-sm text-cyan-600 font-semibold mt-3 italic">
              -30% pendant 3 mois · places limitées
            </p>
          </div>

          {/* ProMAX */}
          <div className="relative rounded-3xl border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-white p-8 md:p-10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-slate-400">
            {/* Badge */}
            <div className="absolute -top-4 right-8">
              <div className="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-600 text-white text-sm font-bold rounded-full shadow-lg">
                Disponible sur demande
              </div>
            </div>

            {/* En-tête de l'offre */}
            <div className="mb-8 mt-4">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                ProMAX
              </h3>
              <div className="mb-4">
                <div className="text-4xl font-bold text-slate-700">
                  389€<span className="text-2xl text-slate-600 font-normal">/mois</span>
                </div>
              </div>
              <p className="text-lg text-slate-700 font-semibold mb-4">
                La version souveraine de MAX avec CRM MaCréa dédié
              </p>
              <p className="text-slate-600 leading-relaxed">
                ProMAX s'adresse aux entreprises qui souhaitent un environnement dédié, sans mutualisation, avec une capacité d'automatisation avancée.
              </p>
            </div>

            {/* CRM MaCréa dédié */}
            <div className="mb-8 p-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl border border-slate-300">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                CRM MaCréa dédié
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span><strong>Environnement CRM entièrement dédié</strong> (non mutualisé)</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span><strong>Contacts et contrats illimités</strong></span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Infrastructure dédiée à votre entreprise</span>
                </li>
              </ul>
            </div>

            {/* Personnalisation avancée */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                </svg>
                Personnalisation avancée
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Tableaux de bord personnalisés</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Colonnes et champs illimités</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Structure adaptée à l'activité réelle du client</span>
                </li>
              </ul>
            </div>

            {/* Automatisation avancée */}
            <div className="mb-8 p-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl border border-slate-300">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                </svg>
                Automatisation avancée
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Jusqu'à <strong>10 000 actions automatisées par mois</strong></span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Scénarios multi-canaux complexes</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Logique décisionnelle pilotée par MAX</span>
                </li>
              </ul>
            </div>

            {/* Pilotage */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
                Pilotage
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Suivi précis des pipelines</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Actions déclenchées selon le comportement réel des leads</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span><strong>MAX agit comme un agent opérationnel autonome</strong></span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <button className="w-full px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-600 text-white font-bold text-lg rounded-xl hover:from-slate-600 hover:to-slate-500 transition-all shadow-lg hover:shadow-2xl transform hover:scale-[1.02]">
              Demander l'accès ProMAX
            </button>
          </div>
        </div>

        {/* Section Onboarding - La connexion entre vous et MAX */}
        <div className="mt-32 mb-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              La connexion entre vous, le pilote, et{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
                MAX
              </span>
              , le copilote
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              MAX apprend, s'adapte et agit selon votre façon de travailler.
            </p>
          </div>

          {/* Layout 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Colonne gauche - Les étapes */}
            <div className="space-y-12">
              {/* Étape 1 */}
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-sky-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    1
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-3">
                      Vous faites connaissance
                    </h4>
                    <p className="text-cyan-600 font-semibold mb-3">
                      Vous parlez. MAX se souvient.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      Vous pouvez dire à MAX votre nom, votre projet et vos objectifs.
                      MAX mémorise ces informations pour comprendre votre contexte et s'y adapter dans le temps.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Si vous souhaitez qu'il retienne quelque chose d'important, dites-lui simplement :<br/>
                      <span className="italic text-slate-700">« Souviens-toi que… »</span>
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                      </svg>
                      <span>MAX construit une mémoire utile, pas un profil figé.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Étape 2 */}
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-sky-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    2
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-3">
                      Vous confiez vos leads à MAX
                    </h4>
                    <p className="text-cyan-600 font-semibold mb-3">
                      Même désordonnés, MAX s'en charge.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      Si vous avez des leads en CSV incomplets, mal structurés ou inutilisables, donnez-les à MAX.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      MAX les nettoie, les organise et les intègre proprement dans la tour de contrôle des leads. Et si vous êtes sous ProMAX, MAX intègre tout dans le MaCréaCRM dédié.
                      Il peut ensuite vous proposer des enrichissements et des priorités.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>Vous validez. MAX exécute.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Étape 3 */}
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-sky-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    3
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-3">
                      Vous parlez stratégie, MAX gère le reste
                    </h4>
                    <p className="text-cyan-600 font-semibold mb-3">
                      Vous décidez. MAX agit.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      Une fois la stratégie définie, vous pouvez indiquer à MAX vos règles, vos canaux et vos automatisations.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      MAX applique la stratégie, déclenche les actions et suit les réponses automatiquement.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                      </svg>
                      <span>Vous pilotez. MAX s'occupe de l'opérationnel.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite - Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/docs/readme-assets/max-solution.png"
                  alt="MAX Solution - Architecture du copilote intelligent"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Message clé */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="p-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl border-2 border-slate-200 text-center">
              <p className="text-lg font-semibold text-slate-900">
                MAX n'agit jamais sans cadre.<br/>
                <span className="text-slate-700">Il agit selon ce que vous avez décidé.</span>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-bold text-xl rounded-xl hover:from-cyan-400 hover:to-sky-400 transition-all shadow-lg hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transform hover:scale-105">
              Adoptez MAX
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
