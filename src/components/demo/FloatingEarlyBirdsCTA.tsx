import { motion } from 'framer-motion'

export default function FloatingEarlyBirdsCTA() {
  return (
    <motion.a
      href="/early-birds?src=demo"
      className="fixed bottom-6 right-6 z-50 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Inscription Early Birds - Accès prioritaire avec -30% pendant 3 mois"
    >
      {/* Shadow layer for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
      
      {/* Main button */}
      <div className="relative bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] text-white px-6 py-4 rounded-full shadow-2xl border border-white/20 backdrop-blur-sm">
        <span className="absolute -top-2 -left-3 bg-blue-700 text-white text-[10px] px-1 py-0.5 rounded z-50">EARLY</span>
        <div className="flex items-center gap-3">
          {/* Icon */}
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </motion.div>
          
          {/* Text content */}
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-tight whitespace-nowrap">
              Early Birds
            </span>
            <span className="text-xs font-medium opacity-90 leading-tight whitespace-nowrap">
              -30% • 3 mois
            </span>
          </div>
          
          {/* Arrow */}
          <motion.svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5"
            animate={{ x: [0, 4, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </motion.svg>
        </div>
      </div>
      
      {/* Pulse animation on mobile */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-cyan-400 md:hidden"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 0, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
    </motion.a>
  )
}
