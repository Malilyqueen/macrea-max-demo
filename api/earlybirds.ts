/**
 * API Route: Early Birds Signup
 * Path: /api/earlybirds
 * 
 * Gère l'inscription au programme Early Birds
 * Stack: Vercel Serverless + Supabase
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

// ==========================
// Configuration
// ==========================

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

// ==========================
// Validation email simple
// ==========================

const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email.toLowerCase())
}

// ==========================
// Main Handler
// ==========================

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Seules requêtes POST acceptées
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const { 
      email, 
      firstName: inputFirstName, 
      company, 
      source, 
      offer,
      honeypot 
    } = req.body

    // Anti-spam honeypot
    if (honeypot) {
      console.warn('[SPAM BLOCKED] Honeypot filled:', email)
      return res.status(200).json({ ok: true, message: 'Success' })
    }

    // Validation email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Email invalide' })
    }

    // ==========================
    // 1. Init Supabase (service role)
    // ==========================

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // ==========================
    // 2. Upsert lead dans Supabase
    // ==========================

    const leadData = {
      email: email.toLowerCase().trim(),
      first_name: inputFirstName?.trim() || null,
      company: company?.trim() || null,
      source: source || 'direct',
      offer: offer || 'starter',
      status: 'pending' as const,
      created_at: new Date().toISOString(),
    }

    // Vérifier si l'email existe déjà
    const { data: existingLead } = await supabase
      .from('earlybirds_leads')
      .select('id, email, created_at, first_name, company')
      .eq('email', leadData.email)
      .single()

    if (existingLead) {
      // Lead déjà inscrit
      console.log('[DUPLICATE] Email already registered:', leadData.email)
      
      // Update optionnel des infos si elles sont nouvelles
      if (inputFirstName || company) {
        await supabase
          .from('earlybirds_leads')
          .update({
            first_name: leadData.first_name || existingLead.first_name,
            company: leadData.company || existingLead.company,
            source: leadData.source,
            offer: leadData.offer,
          })
          .eq('id', existingLead.id)
      }

      return res.status(200).json({
        ok: true,
        message: 'Inscription confirmée',
        alreadyRegistered: true
      })
    }

    // Nouveau lead
    const { data: newLead, error: insertError } = await supabase
      .from('earlybirds_leads')
      .insert([leadData])
      .select('id')
      .single()

    if (insertError) {
      console.error('[SUPABASE INSERT ERROR]', insertError)
      throw new Error(`Erreur enregistrement: ${insertError.message}`)
    }

    console.log('[SUCCESS] Early Bird registered:', leadData.email, '(ID:', newLead.id, ')')

    return res.status(200).json({
      ok: true,
      message: 'Inscription réussie'
    })

  } catch (error: any) {
    console.error('[EARLYBIRDS API ERROR]', error)
    console.error('[ERROR DETAILS]', {
      message: error.message,
      stack: error.stack,
      code: error.code
    })

    // Tentative d'enregistrer l'erreur dans Supabase
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
      const email = req.body?.email?.toLowerCase().trim()
      
      if (email) {
        await supabase
          .from('earlybirds_leads')
          .update({
            status: 'error',
            error_message: error.message || 'Unknown error'
          })
          .eq('email', email)
      }
    } catch (dbError) {
      console.error('[ERROR LOGGING FAILED]', dbError)
    }

    return res.status(500).json({
      ok: false,
      error: 'Une erreur est survenue. Veuillez réessayer dans quelques instants.',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}
