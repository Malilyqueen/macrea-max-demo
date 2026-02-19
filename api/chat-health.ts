import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.method === 'OPTIONS') return res.status(200).end()

    const info = {
      ok: true,
      node: process.version,
      env: {
        LLM_PROVIDER: process.env.LLM_PROVIDER || null,
        OPENAI_API_KEY_SET: !!process.env.OPENAI_API_KEY,
        OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || null,
      }
    }
    return res.status(200).json(info)
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e && (e.message || String(e)) })
  }
}
