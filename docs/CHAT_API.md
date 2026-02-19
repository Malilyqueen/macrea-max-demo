POST /api/chat

Payload (JSON):
{
  "messages": [{"role":"user","content":"..."}, ...],
  "page": "/tarifs",
  "lead_profile": { ... },
  "page_context": "optional context string"
}

Response:
{ reply: string, lead_profile: object, cta?: {label,url} }

Env vars (do NOT commit keys):
- LLM_PROVIDER=openai|ollama
- OPENAI_API_KEY=...
- OLLAMA_BASE_URL=http://localhost:11434
- MODEL=your-model

Quick curl (stub mode if no key):

curl -X POST https://your-site.example/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"C\'est quoi MAX ?"}]}'

Notes:
- Rate limit: 30 req / hour per IP
- Max 10 messages, max 2000 chars per message
- If LLM not configured, endpoint returns a friendly stub reply
