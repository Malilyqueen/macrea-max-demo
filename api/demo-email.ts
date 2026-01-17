/**
 * API Route: Demo Email Sender
 * Path: /api/demo-email.ts
 * 
 * Gère l'envoi du PDF MaCréa CRM + enregistrement lead dans Supabase
 * Stack: Vercel Serverless + Nodemailer SMTP OVH + Supabase
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'
import { createClient } from '@supabase/supabase-js'

// ==========================
// Configuration
// ==========================

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const SMTP_HOST = process.env.SMTP_HOST || 'ssl0.ovh.net'
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10)
const SMTP_USER = process.env.SMTP_USER || 'max@studiomacrea.cloud'
const SMTP_PASS = process.env.SMTP_PASS!

const PDF_URL = 'https://v6vkemne4uy1mygr.public.blob.vercel-storage.com/MACREACRM-MAX-PRESENTATION.pdf'

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
  // CORS headers (si besoin)
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
    const { email, firstName: inputFirstName, company, industry: inputIndustry, honeypot } = req.body

    // Anti-spam honeypot (si champ caché rempli = bot)
    if (honeypot) {
      console.warn('[SPAM BLOCKED] Honeypot filled:', email)
      return res.status(200).json({ ok: true, message: 'Success' }) // Fake success pour le bot
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
      industry: inputIndustry?.trim() || null,
      source: 'landing-demo',
      status: 'pending' as const,
      pdf_sent: false,
      error_message: null,
      created_at: new Date().toISOString(),
    }

    const { data: existingLead } = await supabase
      .from('demo_leads')
      .select('id, email, pdf_sent, last_sent_at, first_name, company, industry')
      .eq('email', leadData.email)
      .single()

    let leadId: string

    if (existingLead) {
      // Lead existe déjà
      leadId = existingLead.id

      // Si déjà envoyé dans les 24h, on skip l'envoi
      if (existingLead.pdf_sent && existingLead.last_sent_at) {
        const lastSent = new Date(existingLead.last_sent_at).getTime()
        const now = Date.now()
        const hoursSinceLastSend = (now - lastSent) / (1000 * 60 * 60)

        if (hoursSinceLastSend < 24) {
          console.log('[SKIP] Email already sent recently:', leadData.email)
          return res.status(200).json({
            ok: true,
            message: 'PDF déjà envoyé récemment',
            alreadySent: true
          })
        }
      }

      // Update du lead existant
      const { error: updateError } = await supabase
        .from('demo_leads')
        .update({
          first_name: leadData.first_name || existingLead.first_name,
          company: leadData.company || existingLead.company,
          industry: leadData.industry || existingLead.industry,
          status: 'pending'
        })
        .eq('id', leadId)

      if (updateError) {
        console.error('[SUPABASE UPDATE ERROR]', updateError)
      }
    } else {
      // Nouveau lead
      const { data: newLead, error: insertError } = await supabase
        .from('demo_leads')
        .insert([leadData])
        .select('id')
        .single()

      if (insertError) {
        console.error('[SUPABASE INSERT ERROR]', insertError)
        throw new Error(`Erreur enregistrement: ${insertError.message}`)
      }

      leadId = newLead.id
    }

    // ==========================
    // 3. Envoi email via Nodemailer SMTP OVH
    // ==========================

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true, // SSL sur port 465
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false // Pour contourner les problèmes de certificat OVH
      }
    })

    // TEST SIMPLE : Email texte uniquement (pas de HTML, pas de PDF)
    const mailOptions = {
      from: `"M.A.X." <${SMTP_USER}>`,
      to: leadData.email,
      subject: `Test SMTP - Validation envoi`,
      text: `Bonjour,\n\nCeci est un email de test pour valider la configuration SMTP OVH.\n\nSi vous recevez ce message, l'authentification SMTP fonctionne correctement.\n\nÀ bientôt,\nM.A.X.`
    }

    await transporter.sendMail(mailOptions)

    // ==========================
    // 4. Update Supabase: status=sent
    // ==========================

    const { error: updateStatusError } = await supabase
      .from('demo_leads')
      .update({
        status: 'sent',
        pdf_sent: true,
        last_sent_at: new Date().toISOString(),
        error_message: null
      })
      .eq('id', leadId)

    if (updateStatusError) {
      console.error('[SUPABASE UPDATE STATUS ERROR]', updateStatusError)
    }

    console.log('[SUCCESS] Email sent to:', leadData.email)

    return res.status(200).json({
      ok: true,
      message: 'Email envoyé avec succès'
    })

  } catch (error: any) {
    console.error('[DEMO EMAIL API ERROR]', error)

    // Tentative d'enregistrer l'erreur dans Supabase
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
      const email = req.body?.email?.toLowerCase().trim()
      
      if (email) {
        await supabase
          .from('demo_leads')
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
      error: 'Erreur lors de l\'envoi. Nous allons corriger ça rapidement.'
    })
  }
}
