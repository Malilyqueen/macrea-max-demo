import { useState } from 'react'
import DemoBoardLayout from '../components/demoboard/DemoBoardLayout'
import DemoEmailGate from '../components/demo/DemoEmailGate'

export default function DemoBoardPage() {
  const [isUnlocked, setIsUnlocked] = useState(false)

  if (!isUnlocked) {
    return <DemoEmailGate onUnlock={() => setIsUnlocked(true)} />
  }

  return <DemoBoardLayout />
}
