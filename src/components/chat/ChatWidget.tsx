import React, { useEffect, useRef, useState } from 'react'

type Message = { role: 'user' | 'assistant' | 'system'; content: string; cta?: { label: string; url: string } | null }

export default function ChatWidget() {
  const [clientId, setClientId] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [leadProfile, setLeadProfile] = useState<Record<string, any>>({})
  const boxRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // initialize persistent client id and restore state from localStorage (shared per browser)
    if (typeof window === 'undefined') return
    try {
      let id = localStorage.getItem('chat_client_id')
      if (!id) {
        id = 'client_' + Math.random().toString(36).slice(2)
        localStorage.setItem('chat_client_id', id)
      }
      setClientId(id)
      const raw = localStorage.getItem('chat_state_' + id)
      if (raw) {
        const obj = JSON.parse(raw)
        if (Array.isArray(obj.messages)) setMessages(obj.messages)
        if (obj.leadProfile) setLeadProfile(obj.leadProfile)
        if (typeof obj.open === 'boolean') setOpen(obj.open)
      } else {
        // initial quick replies when no saved state
        setMessages([{ role: 'system', content: 'Bonjour 👋 Je suis votre Guide, que désirez-vous savoir sur MAX ?' }])
      }
    } catch (e) {
      setMessages([{ role: 'system', content: 'Bonjour 👋 Je suis votre Guide, que désirez-vous savoir sur MAX ?' }])
    }
  }, [])

  useEffect(() => {
    if (open && boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight
  }, [open, messages])

  const quick = ['Tarifs', 'Ce que MAX fait', 'Early Birds -30%']

  async function sendMessage(text: string) {
    if (!text) return
    setError(null)
    const userMsg: Message = { role: 'user', content: text }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages.slice(-9), userMsg], page: window.location.pathname, lead_profile: leadProfile })
      })
      const json = await res.json()
      let reply = json.reply || 'Désolé, pas de réponse.'
      // remove any trailing CTA line present in reply text to avoid duplication
      reply = reply.replace(/\n?CTA:\s*[\s\S]*$/m, '').trim()
      const cta = json.cta || null
      setMessages((m) => [...m, { role: 'assistant', content: reply, cta }])
      if (json.lead_profile) setLeadProfile(json.lead_profile)
      // save immediately for persistence
      try {
        if (clientId && typeof localStorage !== 'undefined') {
          const state = { messages: [...messages.slice(-9), userMsg, { role: 'assistant', content: reply, cta }], leadProfile: json.lead_profile || leadProfile, open }
          localStorage.setItem('chat_state_' + clientId, JSON.stringify(state))
        }
      } catch (e) {
        // ignore localStorage failures
      }
      setLoading(false)
    } catch (e: any) {
      setLoading(false)
      setError('Erreur réseau ou serveur')
      setMessages((m) => [...m, { role: 'assistant', content: 'Erreur serveur — réessaye plus tard.' }])
    }
  }

  // Persist state on every messages or leadProfile change
  useEffect(() => {
    if (!clientId) return
    try {
      if (typeof localStorage !== 'undefined') {
        const state = { messages, leadProfile, open }
        localStorage.setItem('chat_state_' + clientId, JSON.stringify(state))
      }
    } catch (e) {
      // ignore
    }
  }, [messages, leadProfile, open, clientId])

  return (
    <div>
      {/* Floating button */}
      <div className="fixed right-5 bottom-5 z-50">
        <button
          aria-label="Ouvrir le chat MAX"
          onClick={() => setOpen((s) => !s)}
          className="bg-gradient-to-br from-sky-400 to-indigo-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
        >
          {open ? '×' : '💬'}
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div className="fixed right-5 bottom-20 z-50 w-80 md:w-96 bg-white border rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="px-4 py-2 bg-gray-50 border-b flex items-center justify-between">
            <div className="font-semibold">MAX · Assistant</div>
            <button onClick={() => setOpen(false)} className="text-gray-500">Fermer</button>
          </div>

          <div ref={boxRef} className="p-3 flex-1 overflow-auto max-h-80">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right mb-3' : 'text-left mb-3'}>
                <div className={m.role === 'user' ? 'inline-block bg-sky-100 text-sky-900 px-3 py-2 rounded-lg' : 'inline-block bg-gray-100 text-gray-900 px-3 py-2 rounded-lg'}>
                  {m.content}
                </div>
                {m.role === 'assistant' && m.cta && (
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); window.open(m.cta!.url, '_blank', 'noopener,noreferrer') }}
                      className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-3 py-2 rounded"
                      aria-label={m.cta.label}
                    >
                      {m.cta.label}
                    </button>
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="text-left text-sm text-gray-500">...</div>}
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2 mb-2">
              {quick.map((q) => (
                <button key={q} onClick={() => sendMessage(q)} className="text-xs px-2 py-1 bg-gray-100 rounded">{q}</button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage(input)
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pose ta question..."
                className="flex-1 border rounded px-3 py-2"
              />
              <button type="submit" disabled={loading} className="bg-sky-600 text-white px-3 py-2 rounded">
                Envoyer
              </button>
            </form>
            {error && <div className="text-xs text-red-600 mt-2">{error}</div>}
          </div>
        </div>
      )}
    </div>
  )
}
