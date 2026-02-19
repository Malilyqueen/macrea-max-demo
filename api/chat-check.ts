import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    let client
    try {
      client = require('../src/services/llmClient.cjs')
    } catch (e) {
      try { client = require('../src/services/llmClient') } catch (e2) { throw { e, e2 } }
    }
    const ok = client && typeof client.sendToLLM === 'function'
    return res.status(200).json({ ok: true, client: ok ? 'sendToLLM available' : 'sendToLLM missing', keys: { LLM_PROVIDER: process.env.LLM_PROVIDER || null, OPENAI_API_KEY_SET: !!process.env.OPENAI_API_KEY } })
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err && (err.stack || err.message || String(err)) })
  }
}
