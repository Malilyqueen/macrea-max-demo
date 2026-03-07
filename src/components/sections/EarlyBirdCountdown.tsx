export default function EarlyBirdCountdown() {
  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-cyan-50 to-sky-50 border border-cyan-200 p-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-2xl">🎁</span>
          <h3 className="text-xl font-bold text-cyan-800">
            Offre Early Bird Active
          </h3>
        </div>
        <p className="text-cyan-700 text-base mb-3">
          Profitez de <span className="font-bold text-cyan-900">-30% pendant 3 mois</span> sur votre abonnement MAX Starter
        </p>
        <p className="text-cyan-600 text-sm italic">
          Inscription prioritaire • Onboarding personnalisé • Offre toujours disponible
        </p>
      </div>
    </div>
  )
}