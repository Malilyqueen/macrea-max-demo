import { useEffect, useState } from 'react'

const COOKIE_KEY = 'mc_cookies_consent_v1'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [accepted, setAccepted] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY)
      if (stored === 'accepted') {
        setAccepted(true)
      } else if (stored === 'rejected') {
        setAccepted(false)
      } else {
        setVisible(true)
      }
    } catch (e) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try { localStorage.setItem(COOKIE_KEY, 'accepted') } catch {}
    setAccepted(true)
    setVisible(false)
  }

  const reject = () => {
    try { localStorage.setItem(COOKIE_KEY, 'rejected') } catch {}
    setAccepted(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[200000] max-w-3xl w-[calc(100%-2rem)] md:w-auto">
      <div className="bg-white/95 backdrop-blur-sm border border-[rgba(0,145,255,0.08)] rounded-lg px-4 py-3 shadow-md flex items-center gap-4">
        <div className="flex-shrink-0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0091ff" strokeWidth="1.5">
            <path d="M12 2v6" />
            <path d="M3 8v2a9 9 0 0 0 18 0V8" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-sm text-[#0f172a] font-semibold">Nous utilisons des cookies</div>
          <div className="text-xs text-[#64748b]">Pour améliorer l'expérience et analyser l'utilisation. Vous pouvez modifier vos choix à tout moment.</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={reject} className="text-sm px-3 py-1 rounded-md border border-transparent hover:bg-gray-100">Refuser</button>
          <a href="/cookies" className="text-sm px-3 py-1 rounded-md text-[#0091ff] hover:underline">En savoir plus</a>
          <button onClick={accept} className="ml-2 bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white px-4 py-1.5 rounded-md text-sm font-semibold">Accepter</button>
        </div>
      </div>
    </div>
  )
}
