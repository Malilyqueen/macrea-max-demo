import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
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
  // Add promo context: explicit promo text on /tarifs starting 2026-02-21
  try {
    const promoStart = new Date('2026-02-21T00:00:00Z')
    const nowDate = new Date()
    const pageStr = page ? String(page) : ''
    if (nowDate >= promoStart && pageStr.includes('tarif')) {
      promptParts.push(
        'PROMO:\n- Offre promo : -20% sur 2 mois. Code : MAX20.\n- Applicable uniquement sur la page /tarifs.\n- NE PAS demander d\'email pour fournir ce code.'
      )
    }
  } catch (e) {
    // ignore date parsing errors
  }
  if (page_context) promptParts.push('Page context:\n' + String(page_context))
  if (lead_profile) promptParts.push('Lead profile:\n' + JSON.stringify(lead_profile))

  // Add last messages
  const lastMessages = messages.slice(-10).map((m: any) => `${m.role}: ${m.content}`).join('\n')
  promptParts.push('Conversation:\n' + lastMessages)

  const finalPrompt = promptParts.join('\n\n')

  // Call LLM client: prefer dynamic import using file:// absolute paths so
  // runtime bundlers (Vercel) can resolve the actual served file location.
  let sendToLLM: any = undefined
  const tryImportFile = async (absPath: string) => {
    try {
      const url = pathToFileURL(absPath).href
      const m = await import(url)
      return m
    } catch (e) {
      return null
    }
  }

  try {
    const cwd = process.cwd()
    const candidates = [
      // prefer an API-local copy (ensures function bundle contains the client)
      path.resolve(cwd, 'api', 'llmClient.cjs'),
      path.resolve(cwd, 'api', 'llmClient.js'),
      // then fall back to src variants if present in deployed package
      path.resolve(cwd, 'src', 'services', 'llmClient.cjs'),
      path.resolve(cwd, 'src', 'services', 'llmClient.js'),
      path.resolve(cwd, 'src', 'services', 'llmClient')
    ]
    for (const c of candidates) {
      const mod = await tryImportFile(c)
      if (mod) {
        sendToLLM = (mod && (mod.sendToLLM || (mod as any).default?.sendToLLM || (mod as any).default))
        if (sendToLLM) break
      }
    }
  } catch (e: unknown) {
    // ignore here; we'll handle below
  }

  // As a last resort, try legacy require if available in this runtime
  if (!sendToLLM) {
    try {
      // @ts-ignore
      if (typeof (global as any).require === 'function') {
        // attempt both cjs and js paths relative to project
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const r = (global as any).require(path.resolve(process.cwd(), 'src', 'services', 'llmClient.cjs'))
          sendToLLM = r && r.sendToLLM
        } catch (_) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const r2 = (global as any).require(path.resolve(process.cwd(), 'src', 'services', 'llmClient.js'))
            sendToLLM = r2 && r2.sendToLLM
          } catch (_) {}
        }
      }
    } catch (_) {}
  }

  if (!sendToLLM) {
    const errObj = new Error('LLM client import/require did not resolve')
    console.error('[api/chat] could not load llmClient', { message: errObj.message })
    const debugHeader = (req.headers && (req.headers['x-debug'] as string)) || ''
    const isDebug = debugHeader === '1' || debugHeader === 'true'
    if (isDebug) {
      return res.status(500).json({ error: 'LLM client import failed', detail: 'tried file:// imports and global.require fallbacks' })
    }
    return res.status(200).json({ reply: 'LLM non configuré. (client absent)', lead_profile: lead_profile || {} })
  }

  try {
    const start = Date.now()
    const llmResponse = await sendToLLM({ prompt: finalPrompt, page, lead_profile, messages: messages.slice(-10) })
    const duration = Date.now() - start

    // parse CTA if present at end of text (support several formats)
    let replyText = llmResponse.reply || ''
    let cta = llmResponse.cta || null

    const ctaPatterns: Array<{re: RegExp; groups: 'labelUrl' | 'urlOnly'}> = [
      { re: /\n?CTA:\s*(.+?)\s*\|\s*(https?:\/\/\S+)\s*$/m, groups: 'labelUrl' }, // Label | url
      { re: /\n?CTA:\s*(.+?)\s*\((https?:\/\/\S+)\)\s*$/m, groups: 'labelUrl' }, // Label (url)
      { re: /\n?CTA:\s*(.+?)\s*[-–]\s*(https?:\/\/\S+)\s*$/m, groups: 'labelUrl' }, // Label - url
      { re: /\n?CTA:\s*(https?:\/\/\S+)\s*$/m, groups: 'urlOnly' } // url only
    ]

    for (const p of ctaPatterns) {
      const m = replyText.match(p.re)
      if (m) {
        if (p.groups === 'labelUrl') {
          const label = m[1] && m[1].trim()
          const url = m[2] && m[2].trim()
          if (url) cta = { label: label || 'Voir', url }
        } else {
          const url = m[1] && m[1].trim()
          if (url) cta = { label: 'Voir', url }
        }
        // strip the CTA line from the reply text
        replyText = replyText.replace(m[0], '').trim()
        break
      }
    }

    // Minimal logging
    console.log('[api/chat] provider=%s status=success time_ms=%d', llmResponse.provider || 'none', duration)

    // Enforce internal URLs for CTAs: allow only macrea-max-demo.vercel.app
    try {
      const ALLOWED_BASE = 'https://macrea-max-demo.vercel.app/'
      if (cta) {
        if (cta.url) {
          try {
            const u = new URL(cta.url)
            if (!u.href.startsWith(ALLOWED_BASE)) {
              cta = null
            }
          } catch (_) {
            cta = null
          }
        } else if (cta.label && /tarif/i.test(cta.label)) {
          cta.url = ALLOWED_BASE + 'tarifs'
          cta.label = 'Voir les tarifs'
        }
      }

      if (!cta && /voir les tarifs/i.test(replyText)) {
        cta = { label: 'Voir les tarifs', url: 'https://macrea-max-demo.vercel.app/tarifs' }
      }
    } catch (_) {
      // keep existing behavior on unexpected errors
    }

    return res.status(200).json({ reply: replyText, lead_profile: llmResponse.lead_profile || lead_profile || {}, cta })
    } catch (err: unknown) {
      const e = toError(err)
      console.error('[api/chat] error', { message: e.message, stack: e.stack })
      // fallback stub
      const replyText = 'LLM non configuré ou erreur. Essayez plus tard.'
      // Log unanswered question server-side (don't include sensitive data)
      try {
        const logBody = { question: messages && messages.length ? messages[messages.length-1].content : '', page, clientId: payload && payload.clientId ? payload.clientId : undefined, snippet: e.message }
        await fetch('/api/log-unanswered', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(logBody) })
      } catch (loge) {
        // ignore logging errors
      }
      return res.status(200).json({ reply: replyText, lead_profile: lead_profile || {} })
    }
  } catch (err: any) {
    const e = toError(err)
    console.error('[api/chat] UNHANDLED ERROR', { message: e.message, stack: e.stack })
    return res.status(500).json({ error: 'Internal server error', message: e.message })
  }
}
