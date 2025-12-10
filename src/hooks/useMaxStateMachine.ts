import { useState } from 'react'
import { 
  MaxHeroHello, 
  MaxHeroThinking, 
  MaxSolution, 
  MaxHeroHappy 
} from '@/assets/max'

export type MaxState = 'ACCUEIL' | 'ANALYSE' | 'PROPOSITION' | 'EXECUTION'

export type MaxStateConfig = {
  state: MaxState
  image: string
  statusText: string
  feedMessage: string
}

const STATE_CONFIGS: Record<MaxState, MaxStateConfig> = {
  ACCUEIL: {
    state: 'ACCUEIL',
    image: MaxHeroHello,
    statusText: 'Prêt à vous assister',
    feedMessage: '👋 M.A.X. est en ligne et prêt à vous aider'
  },
  ANALYSE: {
    state: 'ANALYSE',
    image: MaxHeroThinking,
    statusText: 'Analyse de votre base CRM en cours...',
    feedMessage: '🔍 Scan de la base MaCréa CRM'
  },
  PROPOSITION: {
    state: 'PROPOSITION',
    image: MaxSolution,
    statusText: 'Corrections identifiées',
    feedMessage: '💡 Stratégie de correction proposée'
  },
  EXECUTION: {
    state: 'EXECUTION',
    image: MaxHeroHappy,
    statusText: 'Self-Healing appliqué avec succès !',
    feedMessage: '✅ Self-Healing exécuté - Base CRM optimisée'
  }
}

const STATE_TRIGGERS: Record<MaxState, string[]> = {
  ACCUEIL: ['Bonjour ! Je suis M.A.X'],
  ANALYSE: ['Je scanne votre base MaCréa CRM'],
  PROPOSITION: ['Je peux appliquer les corrections maintenant'],
  EXECUTION: ['Self-Healing appliqué']
}

export function useMaxStateMachine() {
  const [currentState, setCurrentState] = useState<MaxState>('ACCUEIL')
  const [stateHistory, setStateHistory] = useState<MaxState[]>(['ACCUEIL'])

  const detectStateFromMessage = (message: string): MaxState | null => {
    for (const [state, triggers] of Object.entries(STATE_TRIGGERS)) {
      if (triggers.some(trigger => message.includes(trigger))) {
        return state as MaxState
      }
    }
    return null
  }

  const transitionTo = (newState: MaxState) => {
    if (newState !== currentState) {
      setCurrentState(newState)
      setStateHistory(prev => [...prev, newState])
    }
  }

  const processMessage = (message: string) => {
    const detectedState = detectStateFromMessage(message)
    if (detectedState) {
      transitionTo(detectedState)
    }
  }

  const getCurrentConfig = (): MaxStateConfig => {
    return STATE_CONFIGS[currentState]
  }

  const reset = () => {
    setCurrentState('ACCUEIL')
    setStateHistory(['ACCUEIL'])
  }

  return {
    currentState,
    stateHistory,
    transitionTo,
    processMessage,
    getCurrentConfig,
    reset,
    allStates: STATE_CONFIGS
  }
}
