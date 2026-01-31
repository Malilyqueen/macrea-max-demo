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

const MAILJET_API_KEY = process.env.MAILJET_API_KEY || ''
const MAILJET_SECRET_KEY = process.env.MAILJET_SECRET_KEY || ''
const MAILJET_SENDER_EMAIL = 'max@studiomacrea.cloud'
const BASE_URL = 'https://macrea-max-demo.vercel.app'

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
      email_sent: false,
      created_at: new Date().toISOString(),
    }

    // Vérifier si l'email existe déjà
    const { data: existingLead } = await supabase
      .from('earlybirds_leads')
      .select('id, email, created_at, first_name, company, last_sent_at, email_sent')
      .eq('email', leadData.email)
      .single()

    if (existingLead) {
      // Lead déjà inscrit - vérifier cooldown email (10 minutes)
      console.log('[DUPLICATE] Email already registered:', leadData.email)
      
      const shouldSkipEmail = existingLead.email_sent && existingLead.last_sent_at
      let skipReason = null
      
      if (shouldSkipEmail) {
        const lastSent = new Date(existingLead.last_sent_at).getTime()
        const now = Date.now()
        const minutesSinceLastSend = (now - lastSent) / (1000 * 60)
        
        if (minutesSinceLastSend < 10) {
          console.log('[COOLDOWN] Email already sent recently:', leadData.email)
          skipReason = 'cooldown'
          
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
            alreadyRegistered: true,
            emailSkipped: true
          })
        }
      }
      
      // Update des infos
      await supabase
        .from('earlybirds_leads')
        .update({
          first_name: leadData.first_name || existingLead.first_name,
          company: leadData.company || existingLead.company,
          source: leadData.source,
          offer: leadData.offer,
        })
        .eq('id', existingLead.id)
      
      // Pas de cooldown, on continue pour envoyer l'email
      console.log('[RESEND] Will resend confirmation email:', leadData.email)
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

    // ==========================
    // 3. Envoi email de confirmation via Mailjet
    // ==========================

    const leadId = existingLead?.id || newLead.id
    const userFirstName = leadData.first_name
    const greetingLine = userFirstName ? `Bonjour ${userFirstName},` : 'Bonjour,'
    const offerDetails = leadData.offer === 'starter' 
      ? '<strong>-30% pendant 3 mois</strong> sur l\'abonnement MAX Starter (169€/mois)'
      : 'des conditions fondatrices exclusives'

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
    }
    .content p { 
      margin: 0 0 20px 0;
      line-height: 1.75;
    }
    .hero-box {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-left: 4px solid #22d3ee;
      padding: 24px;
      margin: 30px 0;
      border-radius: 8px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%);
      color: white;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
    }
    .signature {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid #e5e5e5;
    }
    strong { font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <p>${greetingLine}</p>
      
      <p><strong>Bienvenue dans le programme Early Birds M.A.X. ! 🚀</strong></p>
      
      <p>Votre inscription a été confirmée avec succès.</p>
      
      <div class="hero-box">
        <p style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #0c4a6e;">
          Vous bénéficiez de :
        </p>
        <p style="margin: 0; font-size: 16px; color: #0369a1;">
          🔵 ${offerDetails}<br>
          🔵 Accès prioritaire dès le lancement<br>
          🔵 Support dédié pendant l'onboarding<br>
          🔵 Aucun engagement, aucune carte bancaire
        </p>
      </div>
      
      <p>Vous recevrez un email de notre équipe dès que le programme sera officiellement lancé. D'ici là, vous pouvez découvrir M.A.X. en action :</p>
      
      <div style="text-align: center;">
        <a href="${BASE_URL}/tarifs" class="cta-button" style="color: white;">
          � Voir les offres MAX
        </a>
      </div>
      
      <p style="font-size: 14px; color: #666; margin-top: 30px;">
        <strong>Note :</strong> Vous ne recevrez aucun spam. Nous vous contacterons uniquement pour le lancement du programme Early Birds.
      </p>
      
      <p>Si vous avez des questions, répondez simplement à cet email.</p>
      
      <div class="signature">
        <p style="margin: 0; font-weight: 600; font-size: 17px; color: #1a1a1a;">M.A.X.</p>
        <p style="margin: 4px 0 0 0; font-size: 14px; color: #666;">MaCréa Assistant eXpert</p>
        <p style="margin: 2px 0 0 0; font-size: 14px; color: #666;">Copilote CRM autonome</p>
      </div>
    </div>
  </div>
</body>
</html>`

    const textContent = `${greetingLine}

Bienvenue dans le programme Early Birds M.A.X. ! 🚀

Votre inscription a été confirmée avec succès.

Vous bénéficiez de :
🔵 ${offerDetails.replace(/<[^>]*>/g, '')}
🔵 Accès prioritaire dès le lancement
🔵 Support dédié pendant l'onboarding
🔵 Aucun engagement, aucune carte bancaire

Vous recevrez un email de notre équipe dès que le programme sera officiellement lancé.

Découvrez M.A.X. : ${BASE_URL}/tarifs

Note : Vous ne recevrez aucun spam. Nous vous contacterons uniquement pour le lancement du programme Early Birds.

Si vous avez des questions, répondez simplement à cet email.

—
M.A.X.
MaCréa Assistant eXpert
Copilote CRM autonome`

    try {
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
              Subject: "Bienvenue dans les Early Birds M.A.X. ✅",
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

      // Update Supabase: email envoyé
      await supabase
        .from('earlybirds_leads')
        .update({
          email_sent: true,
          last_sent_at: new Date().toISOString(),
          status: 'confirmed',
          error_message: null
        })
        .eq('id', leadId)

      console.log('[SUCCESS] Confirmation email sent to:', leadData.email)

      return res.status(200).json({
        ok: true,
        message: 'Inscription réussie',
        emailSent: true
      })

    } catch (emailError: any) {
      console.error('[EMAIL ERROR]', emailError)
      
      // Enregistrer l'erreur dans Supabase
      await supabase
        .from('earlybirds_leads')
        .update({
          status: 'error',
          error_message: emailError.message || 'Email sending failed'
        })
        .eq('id', leadId)
      
      // Retourner 500 avec message générique (ne pas exposer Mailjet)
      return res.status(500).json({
        ok: false,
        error: 'Votre inscription a été enregistrée, mais l\'email de confirmation n\'a pas pu être envoyé. Nous allons corriger cela rapidement.'
      })
    }

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
