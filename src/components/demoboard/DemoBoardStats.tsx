import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <p ref={ref} className="text-3xl font-bold text-[#1e293b] mb-1">
      {count.toLocaleString('fr-FR')}
    </p>
  )
}

export default function DemoBoardStats() {
  const stats = [
    {
      label: 'Leads importés',
      value: '247',
      change: '+18% vs mois dernier',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      color: 'from-[#0091ff] to-[#00cfff]'
    },
    {
      label: 'Champs corrigés',
      value: '1 842',
      change: 'Self-Healing activé',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
      color: 'from-[#0091ff] to-[#00cfff]'
    },
    {
      label: 'WhatsApp envoyés',
      value: '532',
      change: 'Ce mois',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
      color: 'from-[#0091ff] to-[#00cfff]'
    },
    {
      label: 'Workflows actifs',
      value: '12',
      change: 'Automatisations en cours',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
      color: 'from-[#0091ff] to-[#00cfff]'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: 'easeOut'
          }}
          whileHover={{ 
            scale: 1.05,
            y: -5,
            transition: { duration: 0.2 }
          }}
          className="bg-white rounded-2xl p-6 border border-[rgba(0,145,255,0.1)] shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
              animate={{ 
                boxShadow: [
                  '0 10px 30px rgba(0, 145, 255, 0.3)',
                  '0 15px 40px rgba(0, 207, 255, 0.4)',
                  '0 10px 30px rgba(0, 145, 255, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {stat.icon}
            </motion.div>
          </div>
          
          <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b] mb-1">
            {stat.label}
          </p>
          <AnimatedCounter target={parseInt(stat.value.replace(/\s/g, ''))} />
          <p className="text-xs text-[#64748b]">
            {stat.change}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
