import { useState, FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import { MaxHeroHappy } from '@/assets/max'

export default function EarlyBirdsPage() {
  const [searchParams] = useSearchParams()
  const source = searchParams.get('src') || 'direct'
  const offer = searchParams.get('offer') || 'starter'

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [company, setCompany] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setStatus('error')
      setErrorMessage('Veuillez entrer votre adresse email')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/earlybirds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          firstName: firstName.trim() || undefined,
          company: company.trim() || undefined,
          source,
          offer,
          honeypot,
        }),
      })

      const data = await response.json()

      if (data.ok) {
        setStatus('success')
        setEmail('')
        setFirstName('')
        setCompany('')
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Une erreur est survenue')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout>
      <section className="min-h-screen bg-gradient-to-b from-[#F6FAFF] via-white to-slate-50 py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <img
                src={MaxHeroHappy}
                alt="M.A.X."
                className="w-20 h-20 animate-float"
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Rejoignez le programme{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
                Early Birds
              </span>
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Soyez parmi les premiers à découvrir M.A.X. et profitez de conditions fondatrices exclusives.
            </p>
          </div>

          {/* Bénéfices */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-white rounded-2xl border-2 border-cyan-100 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-sky-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">-30% pendant 3 mois</h3>
              <p className="text-slate-600 text-sm">
                Bénéficiez d'une réduction exclusive sur votre abonnement MAX Starter
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border-2 border-cyan-100 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-sky-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Accès prioritaire</h3>
              <p className="text-slate-600 text-sm">
                Activez votre compte dès le lancement officiel sans liste d'attente
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border-2 border-cyan-100 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-sky-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Support dédié</h3>
              <p className="text-slate-600 text-sm">
                Accompagnement personnalisé pendant votre onboarding
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="max-w-xl mx-auto">
            {status === 'success' ? (
              <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Inscription confirmée !</h3>
                <p className="text-slate-700 mb-6">
                  Vous recevrez un email de confirmation dès que le programme Early Birds sera lancé.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="text-cyan-600 font-semibold hover:text-cyan-700 transition-colors"
                >
                  ← Retour
                </button>
              </div>
            ) : (
              <div className="p-8 md:p-10 bg-white rounded-2xl shadow-xl border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                  Réservez votre place maintenant
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot (hidden) */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ position: 'absolute', left: '-9999px' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                      Adresse email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre.email@entreprise.com"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none transition-colors disabled:bg-slate-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-slate-900 mb-2">
                      Prénom <span className="text-slate-400 font-normal">(optionnel)</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jean"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none transition-colors disabled:bg-slate-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2">
                      Entreprise <span className="text-slate-400 font-normal">(optionnel)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Votre entreprise"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none transition-colors disabled:bg-slate-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-bold text-lg rounded-xl hover:from-cyan-400 hover:to-sky-400 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-cyan-500 disabled:hover:to-sky-500 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Inscription en cours...
                      </>
                    ) : (
                      <>
                        🚀 Rejoindre les Early Birds
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center leading-relaxed">
                    <span className="font-semibold">Places limitées.</span> Aucune carte bancaire demandée.
                    <br />
                    Vous recevrez un email de confirmation lors du lancement.
                  </p>
                </form>
              </div>
            )}
          </div>

          {/* Réassurance */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              Des questions ? Contactez-nous à{' '}
              <a href="mailto:max@studiomacrea.cloud" className="text-cyan-600 hover:text-cyan-700 font-semibold">
                max@studiomacrea.cloud
              </a>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
