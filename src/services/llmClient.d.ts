// Type declarations for dynamic LLM client imports used by api/chat.ts
declare module '../src/services/llmClient' {
  export type LLMArgs = { prompt: string; page?: any; lead_profile?: any; messages?: any[] }
  export type LLMResponse = { reply: string; provider?: string; raw?: any; lead_profile?: any; cta?: any }
  export function sendToLLM(args: LLMArgs): Promise<LLMResponse>
  const _default: { sendToLLM: typeof sendToLLM }
  export default _default
}

declare module '../src/services/llmClient.cjs' {
  export type LLMArgs = { prompt: string; page?: any; lead_profile?: any; messages?: any[] }
  export type LLMResponse = { reply: string; provider?: string; raw?: any; lead_profile?: any; cta?: any }
  export function sendToLLM(args: LLMArgs): Promise<LLMResponse>
  const _default: { sendToLLM: typeof sendToLLM }
  export default _default
}
