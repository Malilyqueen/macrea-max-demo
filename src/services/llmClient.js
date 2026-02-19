let fetch
let AbortController
try {
  fetch = globalThis.fetch
  AbortController = globalThis.AbortController
} catch (e) {
  // ignore
}
try {
  if (!fetch) fetch = require('node-fetch')
} catch (e) {
  // node-fetch not installed; fetch may exist in runtime (Vercel) or not
}
try {
  if (!AbortController) AbortController = require('abort-controller').AbortController
} catch (e) {
  // optional
}

const timeoutFetch = async (url, opts = {}, timeout = 15000) => {
  const controller = AbortController ? new AbortController() : undefined
  const id = setTimeout(() => controller && controller.abort(), timeout)
  try {
    const res = await (fetch)(url, { ...opts, signal: controller && controller.signal })
    clearTimeout(id)
    return res
  } catch (e) {
    clearTimeout(id)
    throw e
  }
}

const sendToOpenAI = async ({ prompt, model }) => {
  const key = process.env.OPENAI_API_KEY || process.env.LLM_OPENAI_KEY || process.env.LLM_PROVIDER_OPENAI_KEY
  if (!key) throw new Error('OPENAI_API_KEY not set')

  const body = {
    const chosenModel = model || process.env.LLM_MODEL || process.env.OPENAI_MODEL || process.env.MODEL || 'gpt-4o-mini'
    model: chosenModel,
    messages: [{ role: 'system', content: prompt }],
    max_tokens: 600
  }

  const res = await timeoutFetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error('OpenAI error: ' + txt)
  }
  const json = await res.json()
  const reply = json.choices && json.choices[0] && (json.choices[0].message?.content || json.choices[0].text) || ''
  return { reply, provider: 'openai', raw: json }
}

const sendToOllama = async ({ prompt, model }) => {
  const base = process.env.OLLAMA_BASE_URL
  if (!base) throw new Error('OLLAMA_BASE_URL not set')
  const url = `${base.replace(/\/$/, '')}/api/chat` // or /api/generate depending on Ollama

  const res = await timeoutFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: model || process.env.MODEL, messages: [{ role: 'system', content: prompt }] })
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error('Ollama error: ' + txt)
  }
  const json = await res.json()
  // Ollama may return a different shape; attempt to extract
  const reply = json.output || (json.choices && json.choices[0] && json.choices[0].message?.content) || ''
  return { reply, provider: 'ollama', raw: json }
}

async function sendToLLM({ prompt, page, lead_profile, messages }) {
  const provider = process.env.LLM_PROVIDER || process.env.LLM_PROVIDER_OPENAI || process.env.PROVIDER || ''
  if (!provider) {
    // stub response when not configured
    return { reply: "LLM non configuré. Contacte l'administrateur.", provider: 'stub', lead_profile: lead_profile || {} }
  }

  const start = Date.now()
  try {
    if (provider === 'openai') {
      const result = await sendToOpenAI({ prompt })
      return { ...result, lead_profile: lead_profile || {} }
    }
    if (provider === 'ollama') {
      const result = await sendToOllama({ prompt })
      return { ...result, lead_profile: lead_profile || {} }
    }
    throw new Error('Unknown LLM_PROVIDER: ' + provider)
  } catch (err) {
    const duration = Date.now() - start
    console.error('[llmClient] provider=%s error=%s time_ms=%d', provider, err && err.message, duration)
    throw err
  }
}

module.exports = { sendToLLM }
