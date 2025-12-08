import { motion, AnimatePresence } from 'framer-motion'

export type AutomationAction = {
  id: string
  type: 'email' | 'sms' | 'whatsapp' | 'call' | 'workflow'
  message: string
  timestamp: string
}

type DemoAutomationsFeedProps = {
  actions: AutomationAction[]
}

const ActionIcon = ({ type }: { type: AutomationAction['type'] }) => {
  switch (type) {
    case 'email':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    case 'sms':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <line x1="9" y1="10" x2="15" y2="10"/>
          <line x1="9" y1="14" x2="13" y2="14"/>
        </svg>
      )
    case 'whatsapp':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      )
    case 'call':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      )
    case 'workflow':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <polyline points="17 1 21 5 17 9"/>
          <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
          <polyline points="7 23 3 19 7 15"/>
          <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
        </svg>
      )
  }
}

const actionColors = {
  email: 'from-blue-500 to-blue-600',
  sms: 'from-purple-500 to-purple-600',
  whatsapp: 'from-green-500 to-green-600',
  call: 'from-orange-500 to-orange-600',
  workflow: 'from-cyan-500 to-cyan-600'
}

export default function DemoAutomationsFeed({ actions }: DemoAutomationsFeedProps) {
  return (
    <div className="bg-white rounded-2xl border border-[rgba(0,145,255,0.15)] shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#1e293b]">Actions M.A.X.</h3>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-500"
          />
          <span className="text-xs text-[#64748b]">En direct</span>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {actions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-[#64748b] text-sm"
            >
              <div className="mb-2 flex justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <p>En attente d'actions...</p>
              <p className="text-xs mt-1">Les automatisations apparaîtront ici</p>
            </motion.div>
          ) : (
            actions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 18,
                  delay: index * 0.1
                }}
                className="group relative"
              >
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#F6FAFF] to-white rounded-xl border border-[rgba(0,145,255,0.1)] hover:border-[rgba(0,145,255,0.3)] hover:shadow-md transition-all duration-300">
                  {/* Icon avec gradient */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${actionColors[action.type]} flex items-center justify-center shadow-sm`}>
                    <ActionIcon type={action.type} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1e293b] mb-1">
                      {action.message}
                    </p>
                    <p className="text-xs text-[#64748b] flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {action.timestamp}
                    </p>
                  </div>

                  {/* Status indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="flex-shrink-0"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Subtle shine effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 pointer-events-none"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Stats footer */}
      {actions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#64748b]"
        >
          <span className="flex items-center gap-1">
            <span className="font-semibold text-[#0091ff]">{actions.length}</span> action{actions.length > 1 ? 's' : ''} exécutée{actions.length > 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0091ff" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </motion.div>
            <span>M.A.X. en action</span>
          </span>
        </motion.div>
      )}
    </div>
  )
}
