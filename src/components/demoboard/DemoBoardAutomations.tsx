import { motion } from 'framer-motion'
import { useState } from 'react'

const ActionIcon = ({ type }: { type: 'email' | 'sms' | 'whatsapp' | 'call' | 'workflow' }) => {
  switch (type) {
    case 'email':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    case 'sms':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <line x1="9" y1="10" x2="15" y2="10"/>
          <line x1="9" y1="14" x2="13" y2="14"/>
        </svg>
      )
    case 'whatsapp':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      )
    case 'call':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      )
    case 'workflow':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <polyline points="17 1 21 5 17 9"/>
          <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
          <polyline points="7 23 3 19 7 15"/>
          <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
        </svg>
      )
  }
}

type AutomationTemplate = {
  id: string
  name: string
  description: string
  type: 'email' | 'sms' | 'whatsapp' | 'call' | 'workflow'
  status: 'active' | 'inactive' | 'draft'
  executions: number
}

const automationTemplates: AutomationTemplate[] = [
  {
    id: '1',
    name: 'Relance panier abandonné',
    description: 'Email automatique 24h après abandon de panier',
    type: 'email',
    status: 'active',
    executions: 247
  },
  {
    id: '2',
    name: 'SMS confirmation RDV',
    description: 'SMS envoyé 1h avant le rendez-vous',
    type: 'sms',
    status: 'active',
    executions: 132
  },
  {
    id: '3',
    name: 'WhatsApp bienvenue',
    description: 'Message de bienvenue aux nouveaux leads',
    type: 'whatsapp',
    status: 'active',
    executions: 89
  },
  {
    id: '4',
    name: 'Appel prospects chauds',
    description: 'Appel automatisé pour les leads à fort score',
    type: 'call',
    status: 'inactive',
    executions: 0
  },
  {
    id: '5',
    name: 'Tag prospect qualifié',
    description: 'Application automatique du tag après 3 interactions',
    type: 'workflow',
    status: 'active',
    executions: 156
  },
  {
    id: '6',
    name: 'Email de relance J+7',
    description: 'Relance automatique 7 jours après premier contact',
    type: 'email',
    status: 'active',
    executions: 198
  },
  {
    id: '7',
    name: 'WhatsApp offre spéciale',
    description: 'Campagne promotionnelle ciblée',
    type: 'whatsapp',
    status: 'draft',
    executions: 0
  },
  {
    id: '8',
    name: 'Workflow lead inactif',
    description: 'Réactivation automatique des leads dormants',
    type: 'workflow',
    status: 'active',
    executions: 73
  }
]

const statusConfig = {
  active: { label: 'Actif', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  inactive: { label: 'Inactif', color: 'bg-gray-100 text-gray-700', dot: 'bg-gray-500' },
  draft: { label: 'Brouillon', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' }
}

export default function DemoBoardAutomations() {
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const filteredAutomations = automationTemplates.filter(auto => {
    if (filter === 'all') return true
    return auto.status === filter
  })

  const totalExecutions = automationTemplates.reduce((sum, auto) => sum + auto.executions, 0)
  const activeCount = automationTemplates.filter(a => a.status === 'active').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
          Automatisations <span className="bg-gradient-to-r from-[#0091ff] to-[#00cfff] bg-clip-text text-transparent">M.A.X.</span>
        </h1>
        <p className="text-[#64748b]">
          Gérez vos automatisations marketing et CRM en un seul endroit.
        </p>
      </motion.div>

      {/* Stats cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="bg-white rounded-xl border border-[rgba(0,145,255,0.15)] p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#64748b]">Automatisations actives</span>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0091ff" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <p className="text-3xl font-bold text-[#0091ff]">{activeCount}</p>
        </div>

        <div className="bg-white rounded-xl border border-[rgba(0,145,255,0.15)] p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#64748b]">Exécutions ce mois</span>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0091ff" strokeWidth="2">
              <line x1="12" y1="20" x2="12" y2="10"/>
              <line x1="18" y1="20" x2="18" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="16"/>
            </svg>
          </div>
          <p className="text-3xl font-bold text-[#0091ff]">{totalExecutions}</p>
        </div>

        <div className="bg-white rounded-xl border border-[rgba(0,145,255,0.15)] p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#64748b]">Taux de réussite</span>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <p className="text-3xl font-bold text-[#0091ff]">98.2%</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            filter === 'all'
              ? 'bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white shadow-lg'
              : 'bg-white text-[#64748b] hover:bg-[#F6FAFF]'
          }`}
        >
          Toutes ({automationTemplates.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            filter === 'active'
              ? 'bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white shadow-lg'
              : 'bg-white text-[#64748b] hover:bg-[#F6FAFF]'
          }`}
        >
          Actives ({activeCount})
        </button>
        <button
          onClick={() => setFilter('inactive')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            filter === 'inactive'
              ? 'bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white shadow-lg'
              : 'bg-white text-[#64748b] hover:bg-[#F6FAFF]'
          }`}
        >
          Inactives
        </button>
      </motion.div>

      {/* Automations grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {filteredAutomations.map((automation, index) => (
          <motion.div
            key={automation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-[rgba(0,145,255,0.15)] p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0091ff] to-[#00cfff] flex items-center justify-center shadow-md">
                  <ActionIcon type={automation.type} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1e293b] group-hover:text-[#0091ff] transition-colors">
                    {automation.name}
                  </h3>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-1 ${statusConfig[automation.status].color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[automation.status].dot}`} />
                    {statusConfig[automation.status].label}
                  </span>
                </div>
              </div>
              
              <button className="text-[#64748b] hover:text-[#0091ff] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                </svg>
              </button>
            </div>

            <p className="text-sm text-[#64748b] mb-4">
              {automation.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-[#64748b]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                <span className="font-semibold text-[#1e293b]">{automation.executions}</span> exécutions
              </div>
              
              {automation.status === 'active' && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Create new automation button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center"
      >
        <button className="px-6 py-3 bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Créer une nouvelle automatisation
        </button>
      </motion.div>
    </div>
  )
}
