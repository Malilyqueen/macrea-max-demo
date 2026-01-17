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
import path from 'path'
import fs from 'fs'

// ==========================
// Configuration
// ==========================

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const SMTP_HOST = process.env.SMTP_HOST || 'ssl0.ovh.net'
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10)
const SMTP_USER = process.env.SMTP_USER || 'max@studiomacrea.cloud'
const SMTP_PASS = process.env.SMTP_PASS!

const PDF_PATH = path.join(process.cwd(), 'public', 'pdf', 'macrea-crm-max-guide.pdf')

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
    const { email, firstName, company, industry, honeypot } = req.body

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
      first_name: firstName?.trim() || null,
      company: company?.trim() || null,
      industry: industry?.trim() || null,
      source: 'landing-demo',
      status: 'pending',
      pdf_sent: false,
      error_message: null,
      created_at: new Date().toISOString(),
    }

    const { data: existingLead, error: selectError } = await supabase
      .from('demo_leads')
      .select('id, email, pdf_sent, last_sent_at')
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
    // 3. Vérifier que le PDF existe
    // ==========================

    if (!fs.existsSync(PDF_PATH)) {
      console.error('[PDF NOT FOUND]', PDF_PATH)
      
      // Update status error dans Supabase
      await supabase
        .from('demo_leads')
        .update({
          status: 'error',
          error_message: 'PDF file not found on server'
        })
        .eq('id', leadId)

      return res.status(500).json({ ok: false, error: 'PDF introuvable sur le serveur' })
    }

    // ==========================
    // 4. Envoi email via Nodemailer SMTP OVH
    // ==========================

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true, // SSL
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    })

    const firstName = leadData.first_name || 'vous'

    const mailOptions = {
      from: `"M.A.X. — MaCréa Studio" <${SMTP_USER}>`,
      to: leadData.email,
      subject: '🚀 Votre démo M.A.X. + Guide MaCréa CRM',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3BA0FF 0%, #00C8FF 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 28px; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; }
    .button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #3BA0FF, #00C8FF); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    .badge { background: #e3f2fd; padding: 12px; border-left: 4px solid #3BA0FF; margin: 15px 0; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Bienvenue dans la démo M.A.X. !</h1>
    </div>
    
    <div class="content">
      <p>Bonjour${firstName !== 'vous' ? ' ' + firstName : ''} 👋</p>
      
      <p>Merci d'avoir testé la <strong>démo interactive de M.A.X.</strong> (MaCréa Assistant eXpert).</p>
      
      <div class="badge">
        <strong>📎 Pièce jointe incluse :</strong><br>
        Le guide complet <strong>"MaCréa CRM + M.A.X."</strong> avec captures d'écran, scénarios d'usage et exemples de corrections/automations.
      </div>
      
      <h3>🔍 Ce que vous découvrirez dans le PDF :</h3>
      <ul>
        <li>Comment M.A.X. s'intègre dans MaCréa CRM</li>
        <li>Les scénarios où M.A.X. intervient automatiquement</li>
        <li>Des exemples concrets de corrections, enrichissements et automations</li>
        <li>L'architecture Self-Healing CRM™ en action</li>
      </ul>
      
      <p style="text-align: center;">
        <a href="https://macrea-max-demo.vercel.app/demoboard" class="button">
          🚀 Retourner à la démo
        </a>
      </p>
      
      <p><strong>Questions ? Besoin d'une démo personnalisée ?</strong><br>
      Répondez simplement à cet email, nous serons ravis d'échanger avec vous.</p>
      
      <p>À très bientôt,<br>
      <strong>L'équipe MaCréa Studio</strong></p>
    </div>
    
    <div class="footer">
      <p>MaCréa Studio • studiomacrea.cloud<br>
      Vous recevez cet email car vous avez demandé la démo M.A.X.</p>
    </div>
  </div>
</body>
</html>
      `,
      text: `
Bonjour${firstName !== 'vous' ? ' ' + firstName : ''} 👋

Merci d'avoir testé la démo interactive de M.A.X. (MaCréa Assistant eXpert).

📎 Pièce jointe incluse : Le guide complet "MaCréa CRM + M.A.X." avec captures d'écran, scénarios d'usage et exemples de corrections/automations.

Ce que vous découvrirez dans le PDF :
- Comment M.A.X. s'intègre dans MaCréa CRM
- Les scénarios où M.A.X. intervient automatiquement
- Des exemples concrets de corrections, enrichissements et automations
- L'architecture Self-Healing CRM™ en action

Retourner à la démo : https://macrea-max-demo.vercel.app/demoboard

Questions ? Besoin d'une démo personnalisée ?
Répondez simplement à cet email, nous serons ravis d'échanger avec vous.

À très bientôt,
L'équipe MaCréa Studio

MaCréa Studio • studiomacrea.cloud
Vous recevez cet email car vous avez demandé la démo M.A.X.
      `,
      attachments: [
        {
          filename: 'macrea-crm-max-guide.pdf',
          path: PDF_PATH
        }
      ]
    }

    await transporter.sendMail(mailOptions)

    // ==========================
    // 5. Update Supabase: status=sent
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
