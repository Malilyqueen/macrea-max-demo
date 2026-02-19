// Admin-only endpoint to trigger the DB purge of unanswered_questions
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  const headerKey = (req.headers['x-admin-api-key'] || (req.headers.authorization || '').split(' ')[1]) as string | undefined;
  if (!headerKey || headerKey !== process.env.ADMIN_API_KEY) {
    res.statusCode = 401;
    return res.end(JSON.stringify({ error: 'Unauthorized' }));
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: 'Supabase not configured' }));
  }

  try {
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/rpc/purge_unanswered_questions`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'params=single-object'
      },
      body: JSON.stringify({})
    });

    const text = await resp.text();
    let data: any = text;
    try { data = JSON.parse(text); } catch (_) { /* leave as text */ }

    if (!resp.ok) {
      res.statusCode = 502;
      return res.end(JSON.stringify({ error: 'Supabase RPC failed', status: resp.status, body: data }));
    }

    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true, result: data }));
  } catch (err: any) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: String(err) }));
  }
}
