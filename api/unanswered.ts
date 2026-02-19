import type { VercelRequest, VercelResponse } from '@vercel/node'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const ADMIN_API_KEY = process.env.ADMIN_API_KEY

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const adminKey = (req.headers['x-admin-key'] as string) || req.query.admin_key as string
  if (!ADMIN_API_KEY || adminKey !== ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Supabase not configured' })
  }

  try {
    // Return unresolved questions from last 90 days, newest first
    const url = `${SUPABASE_URL}/rest/v1/unanswered_questions?resolved=eq.false&order=created_at.desc&limit=200`
    const r = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        apikey: SUPABASE_SERVICE_ROLE_KEY
      }
    })
    if (!r.ok) {
      const txt = await r.text()
      console.error('[unanswered] supabase fetch failed', txt)
      return res.status(502).json({ error: 'Supabase error', detail: txt })
    }
    const items = await r.json()
    return res.status(200).json({ ok: true, items })
  } catch (e: any) {
    console.error('[unanswered] error', e && e.message)
    return res.status(500).json({ error: 'internal' })
  }
}
