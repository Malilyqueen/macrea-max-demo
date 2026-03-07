import { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export default function EarlyBirdCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  })

  useEffect(() => {
    // Deadline: 20/02/2026 à 23:59:59 Europe/Paris
    // Création de la date en UTC puis conversion pour Europe/Paris
    const deadline = new Date('2026-02-20T22:59:59.000Z') // 23:59:59 Paris = 22:59:59 UTC

    const calculateTimeLeft = (): TimeLeft => {
      // Early Birds toujours actif - afficher un timer fictif
      return {
        days: 15,
        hours: 12,
        minutes: 30,
        seconds: 45,
        isExpired: false
      }
    }

    // Calcul initial
    setTimeLeft(calculateTimeLeft())

    // Mise à jour chaque seconde
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      // Timer toujours actif pour Early Birds
    }, 1000)

    // Cleanup
    return () => clearInterval(timer)
  }, [])

  // Early Birds toujours actif - pas de message d'expiration
  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-cyan-50 to-sky-50 border border-cyan-200 p-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">⌚</span>
          <h3 className="text-lg font-bold text-cyan-800">
            Offre Early Bird toujours disponible
          </h3>
        </div>
        <p className="text-cyan-700 text-sm mb-4">
          Profitez de -30% pendant 3 mois sur votre abonnement MAX
        </p>

        {/* Compteur */}
        <div className="flex justify-center items-center gap-2 md:gap-4">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cyan-900">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-cyan-700 uppercase tracking-wide">Jours</div>
          </div>

          <div className="text-cyan-400 text-2xl font-bold">:</div>

          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cyan-900">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-cyan-700 uppercase tracking-wide">Heures</div>
          </div>

          <div className="text-cyan-400 text-2xl font-bold">:</div>

          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cyan-900">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-cyan-700 uppercase tracking-wide">Minutes</div>
          </div>

          <div className="text-cyan-400 text-2xl font-bold">:</div>

          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cyan-900">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-cyan-700 uppercase tracking-wide">Secondes</div>
          </div>
        </div>

        <p className="text-cyan-600 text-xs mt-4 italic">
          Offre spéciale toujours disponible — MAX est prêt pour votre onboarding
        </p>
      </div>
    </div>
  )
}