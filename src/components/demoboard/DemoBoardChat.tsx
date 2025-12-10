import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AutomationAction } from './DemoAutomationsFeed'
import type { MaxStateConfig } from '../../hooks/useMaxStateMachine'

type Message = {
  from: 'user' | 'max'
  text: string
  timestamp: string
  isScanning?: boolean
}

type DemoBoardChatProps = {
  onAutomationTriggered?: (action: AutomationAction) => void
  onMessageSent?: (message: string) => void
  maxStateConfig?: MaxStateConfig
}

export default function DemoBoardChat({ 
  onAutomationTriggered, 
  onMessageSent,
  maxStateConfig 
}: DemoBoardChatProps = {}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [canStart, setCanStart] = useState(false)
  const [conversationStarted, setConversationStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Démarrage automatique du chat quand le composant est monté
  useEffect(() => {
    // Démarrage immédiat dans l'onglet Chat
    const timer = setTimeout(() => {
      setCanStart(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Animation d'entrée - Messages initiaux qui se jouent automatiquement
  useEffect(() => {
    if (!canStart || conversationStarted) return

    setConversationStarted(true)

    const initialConversation = [
      {
        from: 'max' as const,
        text: 'Bonjour ! Je suis M.A.X., votre copilot marketing IA. Comment puis-je vous aider aujourd\'hui ?',
        delay: 0,
        thinking: false
      },
      {
        from: 'user' as const,
        text: 'MAX, peux-tu analyser ma base CRM et me dire s\'il y a des problèmes ?',
        delay: 2500
      },
      {
        from: 'max' as const,
        text: 'Je scanne votre base MaCréa CRM...\n\nAnalyse terminée :\n• 184 champs manquants détectés\n• 47 doublons trouvés\n• 312 erreurs de format corrigées\n\nJe peux appliquer les corrections maintenant. Voulez-vous que je procède ?',
        delay: 3000,
        scanning: true
      },
      {
        from: 'user' as const,
        text: 'Oui, vas-y !',
        delay: 3500
      },
      {
        from: 'max' as const,
        text: 'Self-Healing appliqué avec succès !\n\n• Tous les champs manquants ont été créés\n• Doublons fusionnés intelligemment\n• Formats standardisés\n\nVotre CRM est maintenant propre et cohérent. Que voulez-vous faire maintenant ?',
        delay: 2500,
        thinking: true
      }
    ]

    let cumulativeDelay = 0

    initialConversation.forEach((msg) => {
      cumulativeDelay += msg.delay

      setTimeout(() => {
        if (msg.from === 'max') {
          // MAX avec animation appropriée
          if (msg.scanning) {
            setIsScanning(true)
            setTimeout(() => {
              setIsScanning(false)
              const newMessage = {
                from: msg.from,
                text: msg.text,
                timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
              }
              setMessages(prev => [...prev, newMessage])
              // Détecter changement d'état
              onMessageSent?.(msg.text)
            }, 1200)
          } else if (msg.thinking) {
            setIsThinking(true)
            setTimeout(() => {
              setIsThinking(false)
              const newMessage = {
                from: msg.from,
                text: msg.text,
                timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
              }
              setMessages(prev => [...prev, newMessage])
              // Détecter changement d'état
              onMessageSent?.(msg.text)
            }, 1000)
          } else {
            // Premier message de MAX sans thinking
            const newMessage = {
              from: msg.from,
              text: msg.text,
              timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => [...prev, newMessage])
            // Détecter changement d'état
            onMessageSent?.(msg.text)
          }
        } else {
          // Message utilisateur
          setMessages(prev => [...prev, {
            from: msg.from,
            text: msg.text,
            timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
          }])
        }
      }, cumulativeDelay)
    })
  }, [canStart, conversationStarted])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking, isScanning])

  // Détection et génération d'automatisations
  const detectAndTriggerAutomation = (userMessage: string) => {
    const lowerMsg = userMessage.toLowerCase()
    let automationType: AutomationAction['type'] | null = null
    let automationMessage = ''

    if (lowerMsg.includes('email') || lowerMsg.includes('mail')) {
      automationType = 'email'
      if (lowerMsg.includes('prospect')) {
        automationMessage = 'Email envoyé aux prospects inactifs'
      } else if (lowerMsg.includes('client')) {
        automationMessage = 'Email de suivi envoyé aux clients'
      } else {
        automationMessage = 'Email personnalisé programmé'
      }
    } else if (lowerMsg.includes('sms')) {
      automationType = 'sms'
      automationMessage = 'SMS de relance programmé pour 16h30'
    } else if (lowerMsg.includes('whatsapp')) {
      automationType = 'whatsapp'
      automationMessage = 'Message WhatsApp envoyé (Template RELANCE_PANIER)'
    } else if (lowerMsg.includes('appel') || lowerMsg.includes('appeler')) {
      automationType = 'call'
      automationMessage = 'Appel automatisé programmé pour demain 10h'
    } else if (lowerMsg.includes('workflow') || lowerMsg.includes('tag') || lowerMsg.includes('statut') || lowerMsg.includes('mise à jour')) {
      automationType = 'workflow'
      if (lowerMsg.includes('tag')) {
        automationMessage = 'Tag "Prospect Chaud" appliqué sur 47 leads'
      } else if (lowerMsg.includes('statut')) {
        automationMessage = 'Statut CRM mis à jour : "En négociation"'
      } else {
        automationMessage = 'Workflow "Relance automatique" activé'
      }
    }

    if (automationType && onAutomationTriggered) {
      const action: AutomationAction = {
        id: Date.now().toString(),
        type: automationType,
        message: automationMessage,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      }
      
      // Délai pour que l'action apparaisse après la réponse de MAX
      setTimeout(() => {
        onAutomationTriggered(action)
      }, 1500)
    }
  }

  const getMaxResponse = (userMessage: string) => {
    const lowerMsg = userMessage.toLowerCase()

    // Réponses pour les automatisations
    if (lowerMsg.includes('email') || lowerMsg.includes('mail')) {
      return '📧 Email programmé avec succès !\n\nJe prépare un email personnalisé basé sur :\n• Le statut du lead\n• Son historique d\'interaction\n• Les templates approuvés\n\nL\'envoi sera effectué dans les 5 prochaines minutes.'
    }

    if (lowerMsg.includes('sms')) {
      return '💬 SMS programmé !\n\nMessage préparé :\n"Bonjour, votre commande est prête. Répondez OUI pour confirmer la livraison."\n\nEnvoi prévu : Aujourd\'hui à 16h30'
    }

    if (lowerMsg.includes('whatsapp')) {
      return '🟢 Campagne WhatsApp prête !\n\n• 132 clients ciblés\n• Template "RELANCE_PANIER" approuvé\n• Envoi programmé sur 3 heures\n\nLancement dans 5 minutes. Veux-tu ajuster quelque chose ?'
    }

    if (lowerMsg.includes('appel') || lowerMsg.includes('appeler')) {
      return '📞 Appel automatisé programmé !\n\nScénario vocal :\n1. Message d\'accueil personnalisé\n2. Proposition de rendez-vous\n3. Option de rappel\n\nPremier appel : Demain à 10h00'
    }

    if (lowerMsg.includes('workflow') || lowerMsg.includes('tag') || lowerMsg.includes('statut') || lowerMsg.includes('mise à jour')) {
      return '🔁 Workflow activé !\n\nActions appliquées :\n• Mise à jour du statut CRM\n• Attribution des tags intelligents\n• Déclenchement des relances automatiques\n\nTout est prêt !'
    }

    if (lowerMsg.includes('csv') || lowerMsg.includes('fichier') || lowerMsg.includes('import')) {
      return 'Analyse CSV terminée !\n\n• 20 000 lignes détectées\n• 184 doublons supprimés\n• 312 erreurs de format corrigées\n• Numéros normalisés\n\nJe peux maintenant insérer ces leads proprement dans MaCréa CRM. Tu confirmes ?'
    }

    if (lowerMsg.includes('whatsapp') || lowerMsg.includes('campagne') || lowerMsg.includes('message')) {
      return 'Campagne WhatsApp prête !\n\n• 132 clients ciblés\n• Template "RELANCE_PANIER" approuvé\n• Envoi programmé sur 3 heures\n\nLancement dans 5 minutes. Veux-tu ajuster quelque chose ?'
    }

    if (lowerMsg.includes('champ') || lowerMsg.includes('self healing') || lowerMsg.includes('répare') || lowerMsg.includes('erreur')) {
      return 'Self-Healing appliqué avec succès !\n\n• 47 champs manquants créés\n• 23 doublons fusionnés\n• Structure CRM cohérente\n\nTon CRM est maintenant propre et optimisé !'
    }

    if (lowerMsg.includes('lead') || lowerMsg.includes('priorité') || lowerMsg.includes('analyse')) {
      return 'Analyse des leads terminée !\n\n• 247 leads actifs détectés\n• Top 25 leads à forte conversion identifiés\n• Score de priorité calculé\n\nJe t\'affiche le tableau trié ?'
    }

    return 'J\'ai bien reçu ta demande ! Je peux t\'aider avec :\n\n• Nettoyage de fichiers CSV\n• Lancement de campagnes WhatsApp/SMS\n• Réparation automatique du CRM (Self-Healing)\n• Analyse et priorisation des leads\n\nQue veux-tu que je fasse ?'
  }

  const handleSend = async () => {
    if (!inputValue.trim() || isThinking || !conversationStarted) return

    const userMessage: Message = {
      from: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Détection et déclenchement d'automatisations
    detectAndTriggerAutomation(userMessage.text)

    // Détection de scan
    const needsScan = userMessage.text.toLowerCase().includes('csv') || 
                      userMessage.text.toLowerCase().includes('champ') ||
                      userMessage.text.toLowerCase().includes('analyse')

    if (needsScan) {
      setIsScanning(true)
      await new Promise(resolve => setTimeout(resolve, 1200))
      setIsScanning(false)
    }

    // Thinking animation
    setIsThinking(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const maxMessage: Message = {
      from: 'max',
      text: getMaxResponse(userMessage.text),
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, maxMessage])
    setIsThinking(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[rgba(0,145,255,0.15)] shadow-sm flex flex-col h-[600px]">
      {/* Header with MAX state */}
      <div className="px-6 py-4 border-b border-[rgba(0,145,255,0.1)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#1e293b]">Chat avec M.A.X.</h3>
            <p className="text-xs text-[#64748b]">Votre copilote marketing IA</p>
          </div>
          
          {/* Mascotte avec état */}
          {maxStateConfig && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-semibold text-[#0091ff]">{maxStateConfig.statusText}</p>
              </div>
              <motion.div
                key={maxStateConfig.state}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F6FAFF] to-white border-2 border-[#0091ff] shadow-md flex items-center justify-center overflow-hidden"
              >
                <img 
                  src={maxStateConfig.image} 
                  alt="M.A.X" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[75%] ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <motion.div 
                  className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.from === 'max' 
                      ? 'bg-gradient-to-br from-[#0091ff] to-[#00cfff]' 
                      : 'bg-[#64748b]'
                  }`}
                  animate={msg.from === 'max' ? { 
                    boxShadow: [
                      '0 0 0 0 rgba(0, 207, 255, 0.4)',
                      '0 0 0 8px rgba(0, 207, 255, 0)',
                      '0 0 0 0 rgba(0, 207, 255, 0)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {msg.from === 'max' && <div className="h-3 w-3 rounded-full bg-white" />}
                  {msg.from === 'user' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  )}
                </motion.div>

                {/* Message bubble */}
                <div>
                  <motion.div 
                    className={`rounded-2xl px-4 py-3 ${
                      msg.from === 'max'
                        ? 'bg-[#F6FAFF] border border-[rgba(0,145,255,0.2)]'
                        : 'bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className={`text-sm whitespace-pre-line ${
                      msg.from === 'max' ? 'text-[#1e293b]' : 'text-white'
                    }`}>
                      {msg.text}
                    </p>
                  </motion.div>
                  <span className="text-xs text-[#64748b] mt-1 block px-4">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Scanning animation */}
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 max-w-[75%]">
                <div className="h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0091ff] to-[#00cfff]">
                  <div className="h-3 w-3 rounded-full bg-white" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-[#F6FAFF] border border-[rgba(0,145,255,0.2)]">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0091ff" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                    </motion.div>
                    <p className="text-sm text-[#0091ff] font-medium">M.A.X. scanne votre demande...</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Thinking animation */}
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 max-w-[75%]">
                <div className="h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0091ff] to-[#00cfff]">
                  <div className="h-3 w-3 rounded-full bg-white" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-[#F6FAFF] border border-[rgba(0,145,255,0.2)]">
                  <div className="flex items-center gap-1">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 rounded-full bg-[#0091ff]"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-[#0091ff]"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-[#0091ff]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-[rgba(0,145,255,0.1)]">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Parlez à M.A.X..."
            disabled={isThinking || isScanning || !conversationStarted}
            className="flex-1 px-4 py-3 bg-[#F6FAFF] border border-[rgba(0,145,255,0.2)] rounded-xl text-sm focus:outline-none focus:border-[#0091ff] transition-colors disabled:opacity-50"
          />
          <motion.button 
            onClick={handleSend}
            disabled={isThinking || isScanning || !inputValue.trim() || !conversationStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Envoyer
          </motion.button>
        </div>
        <div className="flex items-center gap-2 mt-2 px-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0091ff" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
          <p className="text-xs text-[#64748b]">
            Essayez : "Analyse ma base CRM" ou "Lance une campagne WhatsApp"
          </p>
        </div>
      </div>
    </div>
  )
}
