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
      const now = new Date()
      const difference = deadline.getTime() - now.getTime()

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        }
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return {
        days,
        hours,
        minutes,
        seconds,
        isExpired: false
      }
    }

    // Calcul initial
    setTimeLeft(calculateTimeLeft())

    // Mise à jour chaque seconde
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      // Arrêter le timer quand c'est terminé
      if (newTimeLeft.isExpired) {
        clearInterval(timer)
      }
    }, 1000)

    // Cleanup
    return () => clearInterval(timer)
  }, [])

  if (timeLeft.isExpired) {
    return (
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 p-6 text-center">
        <div className="text-red-600 font-semibold text-lg">
          🚫 Early Bird terminé
        </div>
        <p className="text-red-500 text-sm mt-1">
          Les inscriptions Early Bird sont closes depuis le 20/02 à minuit
        </p>
      </div>
    )
  }

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-cyan-50 to-sky-50 border border-cyan-200 p-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">⌚</span>
          <h3 className="text-lg font-bold text-cyan-800">
            Dernières inscriptions Early Bird
          </h3>
        </div>
        <p className="text-cyan-700 text-sm mb-4">
          Fin le 20/02 à minuit (heure de Paris)
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
          MAX est prêt pour votre onboarding — inscriptions jusqu'au 20/02 à minuit
        </p>
      </div>
    </div>
  )
}