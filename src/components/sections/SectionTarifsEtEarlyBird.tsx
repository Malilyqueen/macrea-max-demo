import { useState, FormEvent } from 'react'

const plans = [
  {
    id: 'early-bird',
    title: 'M.A.X. Early Birds – Accès anticipé',
    badge: 'En cours – Places limitées',
    badgeColor: 'bg-gradient-to-r from-cyan-500 to-sky-500 text-white',
    featured: true,
    features: [
      'Accès prioritaire à la version M.A.X.',
      'Vos retours influencent l\'évolution du produit',
      'Conditions préférentielles verrouillées pour la suite',
      'Tarif très avantageux par rapport aux futurs plans'
    ],
    cta: true
  },
  {
    id: 'standard',
    title: 'M.A.X. Standard',
    badge: 'Bientôt disponible',
    badgeColor: 'bg-slate-700 text-slate-300',
    featured: false,
    description: 'Accès complet à M.A.X. pour les PME et entrepreneurs. Automatisations, analyses et intégration MaCréa CRM.',
    cta: false
  },
  {
    id: 'pro',
    title: 'M.A.X. Pro',
    badge: 'Bientôt disponible',
    badgeColor: 'bg-slate-700 text-slate-300',
    featured: false,
    description: 'Fonctionnalités avancées, multi-utilisateurs, API complète et support prioritaire.',
    cta: false
  },
  {
    id: 'enterprise',
    title: 'M.A.X. Sur mesure',
    badge: 'Sur devis – après lancement',
    badgeColor: 'bg-slate-700 text-slate-300',
    featured: false,
    description: 'Solution personnalisée pour grandes structures avec besoins spécifiques.',
    cta: false
  }
]

const secteurs = [
  'Commerce / Retail',
  'Services',
  'E-commerce',
  'Coaching / Formation',
  'Logistique',
  'Artisanat',
  'Santé / Bien-être',
  'Technologie / IT',
  'Autre'
]

export default function SectionTarifsEtEarlyBird() {
  const [email, setEmail] = useState('')
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [secteur, setSecteur] = useState('')
  const [besoin, setBesoin] = useState('')
  const [contact, setContact] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const scrollToForm = () => {
    const form = document.getElementById('early-bird-form')
    form?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError("L'adresse email est obligatoire.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Veuillez entrer une adresse email valide.")
      return
    }

    // TODO: Appel API pour enregistrer le lead Early Bird
    console.log('Early Bird submission:', { email, prenom, nom, secteur, besoin, contact })

    setSuccess(true)
    setEmail('')
    setPrenom('')
    setNom('')
    setSecteur('')
    setBesoin('')
    setContact(false)
  }

  return (
    <section id="tarifs" className="py-20 md:py-32 px-4 bg-gradient-to-b from-slate-100 via-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Tarifs & accès à{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
              M.A.X.
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Aujourd'hui, seuls les Early Birds ont accès à M.A.X. Les autres formules arriveront après les premiers tests réels.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl border p-8 transition-all duration-300 ${
                plan.featured
                  ? 'bg-white border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)] scale-105'
                  : 'bg-slate-50 border-slate-200 opacity-70'
              }`}
            >
              {/* Badge */}
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 ${plan.badgeColor}`}>
                {plan.badge}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {plan.title}
              </h3>

              {/* Features or description */}
              {plan.features ? (
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-600 mb-6">
                  {plan.description}
                </p>
              )}

              {/* CTA */}
              {plan.cta && (
                <button
                  onClick={scrollToForm}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-sky-400 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transform hover:scale-105"
                >
                  Rejoindre les Early Birds
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Formulaire Early Birds */}
        <div id="early-bird-form" className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-cyan-400/50 bg-white backdrop-blur-xl p-8 md:p-12 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
            <h3 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Rejoindre les Early Birds{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
                M.A.X.
              </span>
            </h3>
            <p className="text-slate-600 text-center mb-8">
              Aucun spam. Juste des infos utiles sur le lancement et votre accès prioritaire.
            </p>

            {success ? (
              <div className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 rounded-2xl text-center">
                <div className="text-4xl mb-3">🎉</div>
                <p className="text-lg font-semibold text-slate-900 mb-2">
                  C'est noté !
                </p>
                <p className="text-slate-700">
                  M.A.X. vous a ajouté à sa liste prioritaire.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                    Adresse email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@entreprise.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    required
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-400">{error}</p>
                  )}
                </div>

                {/* Prénom & Nom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-semibold text-slate-900 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Jean"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="nom" className="block text-sm font-semibold text-slate-900 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Dupont"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                  </div>
                </div>

                {/* Secteur d'activité */}
                <div>
                  <label htmlFor="secteur" className="block text-sm font-semibold text-slate-900 mb-2">
                    Secteur d'activité
                  </label>
                  <select
                    id="secteur"
                    value={secteur}
                    onChange={(e) => setSecteur(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    <option value="">Sélectionnez votre secteur</option>
                    {secteurs.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Besoin principal */}
                <div>
                  <label htmlFor="besoin" className="block text-sm font-semibold text-slate-900 mb-2">
                    Votre besoin principal ?
                  </label>
                  <textarea
                    id="besoin"
                    value={besoin}
                    onChange={(e) => setBesoin(e.target.value)}
                    placeholder="Décrivez brièvement ce que vous attendez de M.A.X..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                  />
                </div>

                {/* Checkbox contact */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="contact"
                    checked={contact}
                    onChange={(e) => setContact(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 bg-slate-50 text-cyan-500 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <label htmlFor="contact" className="text-sm text-slate-700">
                    Je souhaite être contacté(e) en priorité lorsque M.A.X. sera prêt pour ma structure.
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-bold text-lg rounded-xl hover:from-cyan-400 hover:to-sky-400 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transform hover:scale-[1.02]"
                >
                  Rejoindre les Early Birds
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
