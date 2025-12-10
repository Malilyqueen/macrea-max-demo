import { motion } from 'framer-motion'
import { useState } from 'react'
import DemoBoardSidebar from './DemoBoardSidebar'
import DemoBoardHeader from './DemoBoardHeader'
import DemoBoardStats from './DemoBoardStats'
import DemoBoardChat from './DemoBoardChat'
import DemoBoardCrm from './DemoBoardCrm'
import DemoBoardAutomations from './DemoBoardAutomations'
import DemoBoardReports from './DemoBoardReports'
import DemoAutomationsFeed, { type AutomationAction } from './DemoAutomationsFeed'
import { useMaxStateMachine } from '../../hooks/useMaxStateMachine'

export default function DemoBoardLayout() {
  const [activeTab, setActiveTab] = useState('chat')
  const [automations, setAutomations] = useState<AutomationAction[]>([])
  const maxStateMachine = useMaxStateMachine()

  const handleAutomationTriggered = (action: AutomationAction) => {
    setAutomations(prev => [action, ...prev]) // Nouveau en premier
  }

  const handleMaxStateChange = (message: string) => {
    maxStateMachine.processMessage(message)
    const config = maxStateMachine.getCurrentConfig()
    
    // Ajouter automatiquement au feed lors du changement d'état
    if (config.feedMessage) {
      handleAutomationTriggered({
        id: `state-${Date.now()}`,
        type: 'workflow',
        message: config.feedMessage,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      })
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F6FAFF]">
      <DemoBoardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <DemoBoardHeader />
        </motion.div>
        
        {/* Main content area */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <>
              {/* Welcome banner */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
                  Bienvenue sur votre Dashboard <span className="bg-gradient-to-r from-[#0091ff] to-[#00cfff] bg-clip-text text-transparent">M.A.X.</span>
                </h1>
                <p className="text-[#64748b]">
                  Votre CRM est surveillé en temps réel. M.A.X. travaille pour vous 24/7.
                </p>
              </motion.div>

              {/* Stats cards */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <DemoBoardStats />
              </motion.div>

              {/* Main content grid */}
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {/* Quick Actions Widget */}
                <div className="bg-white rounded-2xl border border-[rgba(0,145,255,0.15)] shadow-sm p-6">
                  <h3 className="text-lg font-bold text-[#1e293b] mb-4">Actions rapides</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setActiveTab('chat')}
                      className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white rounded-xl hover:opacity-90 transition-opacity"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      <span className="font-semibold">Parler à M.A.X.</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-4 bg-[#F6FAFF] text-[#1e293b] rounded-xl hover:bg-[#EBF4FF] transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      <span className="font-semibold">Importer un CSV</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-4 bg-[#F6FAFF] text-[#1e293b] rounded-xl hover:bg-[#EBF4FF] transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                      <span className="font-semibold">Créer une automatisation</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('crm')}
                      className="w-full flex items-center gap-3 p-4 bg-[#F6FAFF] text-[#1e293b] rounded-xl hover:bg-[#EBF4FF] transition-colors"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                      </svg>
                      <span className="font-semibold">Voir mes leads</span>
                    </button>
                  </div>
                </div>

                {/* Activity chart placeholder */}
                <div className="bg-white rounded-2xl border border-[rgba(0,145,255,0.15)] shadow-sm p-6">
                  <h3 className="text-lg font-bold text-[#1e293b] mb-4">Activité récente</h3>
                  
                  {/* Activity timeline */}
                  <div className="space-y-4">
                    <motion.div 
                      className="flex gap-3 pb-4 border-b border-gray-100"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#0091ff] to-[#00cfff] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="16" y1="13" x2="8" y2="13"/>
                          <line x1="16" y1="17" x2="8" y2="17"/>
                          <polyline points="10 9 9 9 8 9"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#1e293b]">Analyse CSV terminée</p>
                        <p className="text-xs text-[#64748b] mt-1">20 000 lignes traitées • 184 doublons supprimés</p>
                        <p className="text-xs text-[#0091ff] mt-1">Il y a 2 min</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex gap-3 pb-4 border-b border-gray-100"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.7 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#0091ff] to-[#00cfff] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#1e293b]">Self-Healing appliqué</p>
                        <p className="text-xs text-[#64748b] mt-1">47 champs manquants créés • Structure CRM cohérente</p>
                        <p className="text-xs text-[#0091ff] mt-1">Il y a 5 min</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex gap-3 pb-4 border-b border-gray-100"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.9 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#0091ff] to-[#00cfff] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#1e293b]">Intégration de nouveaux leads</p>
                        <p className="text-xs text-[#64748b] mt-1">247 leads importés • Score de priorité calculé</p>
                        <p className="text-xs text-[#0091ff] mt-1">Il y a 12 min</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex gap-3 pb-4 border-b border-gray-100"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.1 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#0091ff] to-[#00cfff] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#1e293b]">Campagne WhatsApp lancée</p>
                        <p className="text-xs text-[#64748b] mt-1">132 messages programmés • Template "RELANCE_PANIER"</p>
                        <p className="text-xs text-[#0091ff] mt-1">Il y a 28 min</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.3 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#0091ff] to-[#00cfff] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#1e293b]">Workflow automatique activé</p>
                        <p className="text-xs text-[#64748b] mt-1">Relance automatique des leads inactifs</p>
                        <p className="text-xs text-[#0091ff] mt-1">Il y a 1 heure</p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="mt-6 p-4 bg-[#F6FAFF] rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8 }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#64748b]">
                        <span className="font-semibold text-[#0091ff]">M.A.X.</span> a traité 5 tâches aujourd'hui
                      </p>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="w-6 h-6"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0091ff" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Alert banner */}
              <motion.div 
                className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#0091ff]">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <p className="text-sm text-[#0091ff] font-medium">
                  Nouvelle mise à jour M.A.X. 2.1 disponible - Performances améliorées de 40%
                </p>
              </motion.div>
            </>
          )}

          {/* CRM Tab */}
          {activeTab === 'crm' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DemoBoardCrm />
            </motion.div>
          )}

          {/* Automations Tab */}
          {activeTab === 'automatisations' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DemoBoardAutomations />
            </motion.div>
          )}

          {/* Reports Tab */}
          {activeTab === 'rapports' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DemoBoardReports />
            </motion.div>
          )}

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
                  Chat avec <span className="bg-gradient-to-r from-[#0091ff] to-[#00cfff] bg-clip-text text-transparent">M.A.X.</span>
                </h1>
                <p className="text-[#64748b]">
                  Posez vos questions, demandez des analyses ou lancez des actions automatiques.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <DemoBoardChat 
                    onAutomationTriggered={handleAutomationTriggered}
                    onMessageSent={handleMaxStateChange}
                    maxStateConfig={maxStateMachine.getCurrentConfig()}
                  />
                </div>
                <div>
                  <DemoAutomationsFeed actions={automations} />
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
