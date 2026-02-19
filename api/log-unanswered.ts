import type { VercelRequest, VercelResponse } from '@vercel/node'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function sanitize(s: any, max = 2000) {
  if (typeof s !== 'string') return ''
  return s.trim().slice(0, max)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Supabase not configured' })
  }

  const { question, page, clientId, snippet } = req.body || {}
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'question required' })
  }

  // Anonymize / enforce limits
  const payload = {
    client_id: sanitize(clientId, 200),
    question: sanitize(question, 2000),
    page: sanitize(page, 1000),
    snippet: sanitize(snippet, 2000),
    resolved: false
  }

  try {
    const url = `${SUPABASE_URL}/rest/v1/unanswered_questions`
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        apikey: SUPABASE_SERVICE_ROLE_KEY
      },
      body: JSON.stringify(payload)
    })
    if (!r.ok) {
      const txt = await r.text()
      console.error('[log-unanswered] supabase insert failed', txt)
      return res.status(502).json({ error: 'Supabase error', detail: txt })
    }
    const created = await r.json()
    return res.status(200).json({ ok: true, created })
  } catch (e: any) {
    console.error('[log-unanswered] error', e && e.message)
    return res.status(500).json({ error: 'internal' })
  }
}
