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

// MAILJET API (remplace SMTP OVH)
const MAILJET_API_KEY = process.env.MAILJET_API_KEY || ''
const MAILJET_SECRET_KEY = process.env.MAILJET_SECRET_KEY || ''
const MAILJET_SENDER_EMAIL = 'max@studiomacrea.cloud'

// Flag temporaire : désactiver envoi tant que sender Mailjet n'est pas validé
const EMAIL_SENDING_ENABLED = true // ✅ Activé maintenant que le domaine est validé

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
    // 3. Envoi email via Mailjet API
    // ==========================

    if (!EMAIL_SENDING_ENABLED) {
      // Mode attente validation sender Mailjet
      console.log('[EMAIL DISABLED] Sender Mailjet en attente de validation:', leadData.email)
      
      await supabase
        .from('demo_leads')
        .update({
          status: 'pending',
          error_message: 'Email en attente - Validation Mailjet sender en cours'
        })
        .eq('id', leadId)

      return res.status(200).json({
        ok: true,
        message: 'Enregistrement réussi. Envoi email en attente de validation Mailjet.',
        emailPending: true
      })
    }

    // Variables template
    const userFirstName = leadData.first_name
    const greetingLine = userFirstName ? `Bonjour ${userFirstName},` : 'Bonjour,'
    const userIndustry = leadData.industry
    const industryLine = userIndustry 
      ? `Vous évoluez dans le secteur ${userIndustry} — un environnement où la structure, le temps et la clarté sont déterminants.`
      : `Vous explorez actuellement comment je peux transformer la gestion de votre entreprise.`

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; 
      line-height: 1.75; 
      color: #1a1a1a; 
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .container { 
      max-width: 650px; 
      margin: 40px auto; 
      padding: 0 20px;
    }
    .content { 
      background: #ffffff;
      padding: 0;
      font-size: 16px;
      letter-spacing: 0.01em;
    }
    .content p { 
      margin: 0 0 20px 0;
      line-height: 1.75;
    }
    .content ul {
      margin: 20px 0;
      padding-left: 20px;
      list-style: none;
    }
    .content ul li {
      margin-bottom: 12px;
      padding-left: 20px;
      position: relative;
    }
    .content ul li:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #3BA0FF;
      font-weight: bold;
    }
    .signature {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid #e5e5e5;
      display: flex;
      align-items: flex-start;
      gap: 20px;
    }
    .signature-avatar {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      flex-shrink: 0;
    }
    .signature-text {
      flex: 1;
    }
    .signature-name {
      font-weight: 600;
      font-size: 17px;
      color: #1a1a1a;
      margin: 0 0 4px 0;
    }
    .signature-title {
      font-size: 14px;
      color: #666;
      margin: 0 0 2px 0;
    }
    .signature-tagline {
      font-size: 13px;
      color: #999;
      margin: 12px 0 0 0;
      font-style: italic;
      line-height: 1.5;
    }
    .attachment-note {
      background: #f8f9fa;
      border-left: 3px solid #3BA0FF;
      padding: 16px 20px;
      margin: 25px 0;
      font-size: 15px;
    }
    .pdf-link {
      display: inline-block;
      background: #3BA0FF;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 10px;
    }
    strong { font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <p>${greetingLine}</p>
      
      <p><strong>Moi, c'est M.A.X.</strong></p>
      
      <p>Vous explorez actuellement mes capacités.<br>
      ${industryLine}</p>
      
      <p>Je peux vous aider à optimiser votre entreprise,<br>
      non pas en ajoutant des outils ou de la complexité,<br>
      mais en travaillant en arrière-plan, là où s'accumulent les erreurs, les frictions et la charge mentale.</p>
      
      <div class="attachment-note">
        📎 Vous trouverez ci-dessous un guide qui me concerne, ainsi que le CRM que je pilote.
        <br><br>
        <a href="${PDF_URL}" class="pdf-link" style="color: white;">📄 Télécharger le guide MaCréa CRM + M.A.X.</a>
      </div>
      
      <p>Vous y découvrirez notamment :</p>
      
      <ul>
        <li>comment je m'intègre au CRM sans perturber vos habitudes</li>
        <li>comment certaines actions se corrigent, s'enchaînent ou s'optimisent automatiquement</li>
        <li>le principe du Self-Healing CRM™ : un environnement capable de s'ajuster et de se maintenir sans intervention constante</li>
      </ul>
      
      <p>Il n'est pas nécessaire d'être expert pour travailler avec moi.<br>
      Je suis conçu pour :</p>
      
      <ul>
        <li>vous faire gagner du temps</li>
        <li>réduire vos coûts opérationnels</li>
        <li>et alléger durablement la charge mentale liée à la gestion quotidienne</li>
      </ul>
      
      <p>La démo reste accessible pendant que vous l'explorez.</p>
      
      <p>Si vous souhaitez vérifier comment je fonctionnerais dans votre propre contexte,<br>
      vous pouvez simplement répondre à cet email.</p>
      
      <div class="signature">
        <img src="https://macrea-max-demo.vercel.app/docs/readme-assets/max-hero-guide.png" alt="M.A.X." class="signature-avatar" />
        <div class="signature-text">
          <div class="signature-name">M.A.X.</div>
          <div class="signature-title">MaCréa Assistant eXpert</div>
          <div class="signature-title">Copilote CRM autonome</div>
          <div class="signature-tagline">
            Conçu pour structurer.<br>
            Pensé pour durer.
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`

    const textContent = `${greetingLine}

Moi, c'est M.A.X.

Vous explorez actuellement mes capacités.
${industryLine}

Je peux vous aider à optimiser votre entreprise,
non pas en ajoutant des outils ou de la complexité,
mais en travaillant en arrière-plan, là où s'accumulent les erreurs, les frictions et la charge mentale.

📎 Téléchargez le guide MaCréa CRM + M.A.X. : ${PDF_URL}

Vous y découvrirez notamment :

• comment je m'intègre au CRM sans perturber vos habitudes
• comment certaines actions se corrigent, s'enchaînent ou s'optimisent automatiquement
• le principe du Self-Healing CRM™ : un environnement capable de s'ajuster et de se maintenir sans intervention constante

Il n'est pas nécessaire d'être expert pour travailler avec moi.
Je suis conçu pour :

• vous faire gagner du temps
• réduire vos coûts opérationnels
• et alléger durablement la charge mentale liée à la gestion quotidienne

La démo reste accessible pendant que vous l'explorez.

Si vous souhaitez vérifier comment je fonctionnerais dans votre propre contexte,
vous pouvez simplement répondre à cet email.

—

M.A.X.
MaCréa Assistant eXpert
Copilote CRM autonome

Conçu pour structurer.
Pensé pour durer.`

    // Envoi via Mailjet API v3.1
    const mailjetRequest = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`).toString('base64')
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: MAILJET_SENDER_EMAIL,
              Name: "M.A.X."
            },
            To: [
              {
                Email: leadData.email,
                Name: userFirstName || ''
              }
            ],
            Subject: userFirstName ? `${userFirstName}, moi, c'est M.A.X.` : `Moi, c'est M.A.X.`,
            HTMLPart: htmlContent,
            TextPart: textContent
          }
        ]
      })
    })

    const mailjetResponse = await mailjetRequest.json()
    
    if (!mailjetRequest.ok) {
      throw new Error(`Mailjet error: ${JSON.stringify(mailjetResponse)}`)
    }

    console.log('[MAILJET SUCCESS]', mailjetResponse)
      to: leadData.email,
      subject: userFirstName ? `${userFirstName}, moi, c'est M.A.X.` : `Moi, c'est M.A.X.`,
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; 
      line-height: 1.75; 
      color: #1a1a1a; 
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .container { 
      max-width: 650px; 
      margin: 40px auto; 
      padding: 0 20px;
    }
    .content { 
      background: #ffffff;
      padding: 0;
      font-size: 16px;
      letter-spacing: 0.01em;
    }
    .content p { 
      margin: 0 0 20px 0;
      line-height: 1.75;
    }
    .content ul {
      margin: 20px 0;
      padding-left: 20px;
      list-style: none;
    }
    .content ul li {
      margin-bottom: 12px;
      padding-left: 20px;
      position: relative;
    }
    .content ul li:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #3BA0FF;
      font-weight: bold;
    }
    .signature {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid #e5e5e5;
      display: flex;
      align-items: flex-start;
      gap: 20px;
    }
    .signature-avatar {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      flex-shrink: 0;
    }
    .signature-text {
      flex: 1;
    }
    .signature-name {
      font-weight: 600;
      font-size: 17px;
      color: #1a1a1a;
      margin: 0 0 4px 0;
    }
    .signature-title {
      font-size: 14px;
      color: #666;
      margin: 0 0 2px 0;
    }
    .signature-tagline {
      font-size: 13px;
      color: #999;
      margin: 12px 0 0 0;
      font-style: italic;
      line-height: 1.5;
    }
    .attachment-note {
      background: #f8f9fa;
      border-left: 3px solid #3BA0FF;
      padding: 16px 20px;
      margin: 25px 0;
      font-size: 15px;
    }
    strong { font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <p>${greetingLine}</p>
      
      <p><strong>Moi, c'est M.A.X.</strong></p>
      
      <p>Vous explorez actuellement mes capacités.<br>
      ${industryLine}</p>
      
      <p>Je peux vous aider à optimiser votre entreprise,<br>
      non pas en ajoutant des outils ou de la complexité,<br>
      mais en travaillant en arrière-plan, là où s'accumulent les erreurs, les frictions et la charge mentale.</p>
      
      <div class="attachment-note">
        📎 Vous trouverez en pièce jointe un guide qui me concerne, ainsi que le CRM que je pilote.
      </div>
      
      <p>Vous y découvrirez notamment :</p>
      
      <ul>
        <li>comment je m'intègre au CRM sans perturber vos habitudes</li>
        <li>comment certaines actions se corrigent, s'enchaînent ou s'optimisent automatiquement</li>
        <li>le principe du Self-Healing CRM™ : un environnement capable de s'ajuster et de se maintenir sans intervention constante</li>
      </ul>
      
      <p>Il n'est pas nécessaire d'être expert pour travailler avec moi.<br>
      Je suis conçu pour :</p>
      
      <ul>
        <li>vous faire gagner du temps</li>
        <li>réduire vos coûts opérationnels</li>
        <li>et alléger durablement la charge mentale liée à la gestion quotidienne</li>
      </ul>
      
      <p>La démo reste accessible pendant que vous l'explorez.</p>
      
      <p>Si vous souhaitez vérifier comment je fonctionnerais dans votre propre contexte,<br>
      vous pouvez simplement répondre à cet email.</p>
      
      <div class="signature">
        <img src="https://macrea-max-demo.vercel.app/docs/readme-assets/max-hero-guide.png" alt="M.A.X." class="signature-avatar" />
        <div class="signature-text">
          <div class="signature-name">M.A.X.</div>
          <div class="signature-title">MaCréa Assistant eXpert</div>
          <div class="signature-title">Copilote CRM autonome</div>
          <div class="signature-tagline">
            Conçu pour structurer.<br>
            Pensé pour durer.
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`,
      text: `${greetingLine}

Moi, c'est M.A.X.

Vous explorez actuellement mes capacités.
${industryLine}

Je peux vous aider à optimiser votre entreprise,
non pas en ajoutant des outils ou de la complexité,
mais en travaillant en arrière-plan, là où s'accumulent les erreurs, les frictions et la charge mentale.

📎 Vous trouverez en pièce jointe un guide qui me concerne, ainsi que le CRM que je pilote.

Vous y découvrirez notamment :

• comment je m'intègre au CRM sans perturber vos habitudes
• comment certaines actions se corrigent, s'enchaînent ou s'optimisent automatiquement
• le principe du Self-Healing CRM™ : un environnement capable de s'ajuster et de se maintenir sans intervention constante

Il n'est pas nécessaire d'être expert pour travailler avec moi.
Je suis conçu pour :

• vous faire gagner du temps
• réduire vos coûts opérationnels
• et alléger durablement la charge mentale liée à la gestion quotidienne

La démo reste accessible pendant que vous l'explorez.

Si vous souhaitez vérifier comment je fonctionnerais dans votre propre contexte,
vous pouvez simplement répondre à cet email.

—

M.A.X.
MaCréa Assistant eXpert
Copilote CRM autonome

Conçu pour structurer.
Pensé pour durer.`,
    console.log('[MAILJET SUCCESS]', mailjetResponse)

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
    console.error('[ERROR DETAILS]', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      response: error.response
    })

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
      error: error.message || 'Erreur lors de l\'envoi. Nous allons corriger ça rapidement.',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}
