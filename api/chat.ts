import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs'
import path from 'path'
// We'll require the LLM client inside the handler to avoid module-load crashes
// (if require throws at module initialization, the function would fail before responding).

// Simple in-memory rate limiter: map IP -> {count, windowStart}
const RATE_LIMIT = 30 // requests
const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const rateMap: Map<string, { count: number; windowStart: number }> = new Map()

// Helpers
const safeRead = (p: string) => {
  try {
    return fs.readFileSync(p, 'utf8')
  } catch {
    return ''
  }
}

function toError(err: unknown): Error {
  return err instanceof Error ? err : new Error(String(err))
}

const summarizeJson = (jsonStr: string, maxLen = 2000) => {
  try {
    const obj = JSON.parse(jsonStr)
    // simple summary: list plan names and early birds
    if (obj.plans && Array.isArray(obj.plans)) {
      const plans = obj.plans.map((p: any) => `${p.name}: ${p.ideal_for}`).join('\n')
      const eb = obj.early_birds ? `Early Birds: ${obj.early_birds.label} ${obj.early_birds.discount}` : ''
      return `${eb}\n${plans}`.slice(0, maxLen)
    }
    return JSON.stringify(obj).slice(0, maxLen)
  } catch (e) {
    return jsonStr.slice(0, maxLen)
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') return res.status(200).end()
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // Rate limit by IP
  const ip = req.headers['x-real-ip'] as string || req.headers['x-forwarded-for'] as string || req.connection.remoteAddress || 'unknown'
  const now = Date.now()
  const state = rateMap.get(ip) || { count: 0, windowStart: now }
  if (now - state.windowStart > WINDOW_MS) {
    state.count = 0
    state.windowStart = now
  }
  if (state.count >= RATE_LIMIT) {
    return res.status(429).json({ error: 'Rate limit exceeded' })
  }
  state.count += 1
  rateMap.set(ip, state)

  const payload = req.body || {}
  const { messages, page, lead_profile, page_context } = payload

  // Validation
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' })
  }
  if (messages.length > 10) return res.status(400).json({ error: 'max 10 messages allowed' })
  for (const m of messages) {
    if (!m || typeof m.content !== 'string' || typeof m.role !== 'string') {
      return res.status(400).json({ error: 'invalid message format' })
    }
    if (m.content.length > 2000) return res.status(400).json({ error: 'message too long' })
  }

  // Build prompt in required order
  const root = path.resolve('.')
  const systemPrompt = safeRead(path.join(root, 'src', 'services', 'system_prompt.txt'))
  const maxContext = safeRead(path.join(root, 'src', 'context', 'max_context.md'))
  const pricingRaw = safeRead(path.join(root, 'src', 'context', 'pricing.json'))
  const faqRaw = safeRead(path.join(root, 'src', 'context', 'faq.json'))

  const pricingSummary = summarizeJson(pricingRaw)
  const faqSummary = (() => {
    try {
      const fa = JSON.parse(faqRaw)
      return fa.slice(0, 6).map((q: any) => `${q.q} - ${q.a}`).join('\n')
    } catch { return faqRaw }
  })()

  const promptParts: string[] = []
  if (systemPrompt) promptParts.push(systemPrompt)
  if (maxContext) promptParts.push(maxContext)
  if (pricingSummary) promptParts.push('Pricing:\n' + pricingSummary)
  if (faqSummary) promptParts.push('FAQ:\n' + faqSummary)
  if (page_context) promptParts.push('Page context:\n' + String(page_context))
  if (lead_profile) promptParts.push('Lead profile:\n' + JSON.stringify(lead_profile))

  // Add last messages
  const lastMessages = messages.slice(-10).map((m: any) => `${m.role}: ${m.content}`).join('\n')
  promptParts.push('Conversation:\n' + lastMessages)

  const finalPrompt = promptParts.join('\n\n')

  // Call LLM client: prefer dynamic ESM import, gracefully handle CommonJS fallback
  let sendToLLM: any = undefined
  try {
    // try importing the CJS build first (dynamic import will expose CommonJS as `default`)
    try {
      const mod = await import('../src/services/llmClient.cjs')
      sendToLLM = (mod && (mod.sendToLLM || (mod as any).default?.sendToLLM || (mod as any).default))
    } catch (e) {
      // try ESM/regular JS variant
      const mod2 = await import('../src/services/llmClient')
      sendToLLM = (mod2 && (mod2.sendToLLM || (mod2 as any).default?.sendToLLM || (mod2 as any).default))
    }
  } catch (e: unknown) {
    // final attempt: if `require` exists (older runtimes), use it
    try {
      // @ts-ignore
      if (typeof (global as any).require === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const r = (global as any).require('../src/services/llmClient.cjs')
        sendToLLM = r && r.sendToLLM
      }
    } catch (e3: unknown) {
      // ignore
    }
    const errObj = toError(e)
    console.error('[api/chat] could not import llmClient', { message: errObj.message, stack: errObj.stack })
    const debugHeader = (req.headers && (req.headers['x-debug'] as string)) || ''
    const isDebug = debugHeader === '1' || debugHeader === 'true'
    if (!sendToLLM) {
      if (isDebug) {
        return res.status(500).json({ error: 'LLM client import failed', stack: [errObj.stack || errObj.message] })
      }
      return res.status(200).json({ reply: 'LLM non configuré. (client absent)', lead_profile: lead_profile || {} })
    }
  }

  try {
    const start = Date.now()
    const llmResponse = await sendToLLM({ prompt: finalPrompt, page, lead_profile, messages: messages.slice(-10) })
    const duration = Date.now() - start

    // parse CTA if present at end of text
    let replyText = llmResponse.reply || ''
    let cta = llmResponse.cta || null
    const ctaMatch = replyText.match(/\n?CTA:\s*(.+?)\s*\|\s*(https?:\/\/\S+)\s*$/m)
    if (ctaMatch) {
      cta = { label: ctaMatch[1].trim(), url: ctaMatch[2].trim() }
      replyText = replyText.replace(ctaMatch[0], '').trim()
    }

    // Minimal logging
    console.log('[api/chat] provider=%s status=success time_ms=%d', llmResponse.provider || 'none', duration)

    return res.status(200).json({ reply: replyText, lead_profile: llmResponse.lead_profile || lead_profile || {}, cta })
    } catch (err: unknown) {
      const e = toError(err)
      console.error('[api/chat] error', { message: e.message, stack: e.stack })
      // fallback stub
      return res.status(200).json({ reply: 'LLM non configuré ou erreur. Essayez plus tard.', lead_profile: lead_profile || {} })
    }
  } catch (err: any) {
    const e = toError(err)
    console.error('[api/chat] UNHANDLED ERROR', { message: e.message, stack: e.stack })
    return res.status(500).json({ error: 'Internal server error', message: e.message })
  }
}
