import { motion } from 'framer-motion'
import { useState } from 'react'

type DemoEmailGateProps = {
  onUnlock: () => void
}

export default function DemoEmailGate({ onUnlock }: DemoEmailGateProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [industry, setIndustry] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      return
    }

    setIsSubmitting(true)

    // Débloquer la démo IMMÉDIATEMENT (UX non bloquante)
    onUnlock()

    // Envoi email + enregistrement lead en background (async, non bloquant)
    try {
      const response = await fetch('/api/demo-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          firstName: firstName.trim() || undefined,
          industry: industry.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (data.ok) {
        console.log('[SUCCESS] PDF envoyé à', email)
      } else {
        console.warn('[API ERROR]', data.error)
      }
    } catch (error) {
      console.error('[FETCH ERROR] Envoi email échoué:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6FAFF] to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-2xl w-full"
      >
        {/* Mascotte MAX flottante */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#3BA0FF] to-[#00C8FF] flex items-center justify-center shadow-2xl">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <path d="M9 10h.01"/>
              <path d="M15 10h.01"/>
              <path d="M9.5 15a3.5 3.5 0 0 0 5 0"/>
            </svg>
          </div>
        </motion.div>

        {/* Carte principale */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
        >
          {/* Titre */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Avant de lancer la démo de{' '}
            <span className="bg-gradient-to-r from-[#3BA0FF] to-[#00C8FF] bg-clip-text text-transparent">
              M.A.X.
            </span>
          </h1>

          {/* Explication */}
          <div className="mb-8 space-y-4">
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              Cette démo vous montre uniquement le{' '}
              <span className="font-semibold text-gray-900">tableau de bord interactif de M.A.X.</span>
              <br />
              Elle n'inclut pas l'interface MaCréa CRM.
            </p>

            <div className="p-6 bg-gradient-to-br from-[#F6FAFF] to-white rounded-2xl border border-[#3BA0FF]/20">
              <p className="text-gray-700 leading-relaxed mb-4">
                Pour comprendre comment{' '}
                <span className="font-semibold text-gray-900">M.A.X. réagit dans MaCréa CRM</span>,
                vous recevrez un PDF explicatif incluant :
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8FF" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Des captures d'écran MaCréa CRM</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8FF" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Les scénarios dans lesquels M.A.X. intervient</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8FF" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Des exemples de corrections, automations et analyses</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-center gap-2 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <p className="text-sm font-medium text-amber-800">
                Les données de la démo sont 100% simulées, mais inspirées de cas réels.
              </p>
            </div>
          </div>

          {/* Badge info */}
          <div className="mb-8 p-6 bg-gradient-to-br from-[#3BA0FF]/5 to-transparent rounded-2xl border border-[#3BA0FF]/20">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#3BA0FF]">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              En entrant votre e-mail :
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8FF" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Vous débloquez l'accès au tableau de bord M.A.X. (démo interactive)</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8FF" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Vous recevez le PDF "MaCréa CRM + M.A.X." avec captures et scénarios</span>
              </li>
            </ul>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900 mb-2">
                Votre prénom <span className="text-gray-500 font-normal">(optionnel)</span>
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Votre prénom"
                disabled={isSubmitting}
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#3BA0FF] focus:outline-none text-lg transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-semibold text-gray-900 mb-2">
                Votre secteur d'activité <span className="text-gray-500 font-normal">(optionnel)</span>
              </label>
              <input
                type="text"
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Ex: Immobilier, Formation, Conseil..."
                disabled={isSubmitting}
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#3BA0FF] focus:outline-none text-lg transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Votre adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@entreprise.com"
                required
                disabled={isSubmitting}
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#3BA0FF] focus:outline-none text-lg transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="w-full px-8 py-5 bg-gradient-to-r from-[#3BA0FF] to-[#00C8FF] text-white font-bold text-lg rounded-xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" opacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75"/>
                  </svg>
                  Enregistrement...
                </>
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  Débloquer la démo & recevoir le PDF CRM
                </>
              )}
            </button>
          </form>

          {/* Réassurance */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Aucun spam. Vos données ne seront jamais partagées.
            </p>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800 font-medium flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Vérifiez votre boîte de réception (et les spams/promotions)
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Vous recevrez uniquement :
            </p>
            <ul className="text-sm text-gray-600 mt-2 inline-block text-left">
              <li>• la démo,</li>
              <li>• le PDF MaCréa CRM,</li>
              <li>• et des communications liées à M.A.X. et à l'écosystème MaCréa Studio.</li>
            </ul>
            <p className="text-sm font-medium text-gray-700 mt-2">
              Rien de plus.
            </p>
          </div>
        </motion.div>

        {/* Badge confiance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8FF" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Données 100% simulées</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8FF" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Aucune installation requise</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C8FF" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Accès immédiat</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
