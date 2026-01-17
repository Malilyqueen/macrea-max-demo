# 🚀 IMPLÉMENTATION COMPLÈTE — Demo Email Automation

**Projet** : macrea-max-demo  
**Date** : 17 janvier 2026  
**Deadline** : 20 janvier 2026  
**Status** : ✅ Code prêt à déployer

---

## 📦 Fichiers créés

### 1. Migration SQL Supabase
📄 **sql/demo_leads.sql**
- Table `public.demo_leads` avec RLS activé
- Indexes sur email, created_at, status
- Trigger auto pour `updated_at`
- Politiques de sécurité (service role + anon insert)

### 2. API Route Vercel
📄 **api/demo-email.ts**
- Handler Vercel Serverless Function
- Validation email + anti-spam honeypot
- Upsert Supabase (évite les doublons)
- Envoi email via Nodemailer SMTP OVH
- PDF en pièce jointe
- Gestion complète des erreurs
- Rate limit implicite (pas de renvoi < 24h)

### 3. Composant Front modifié
📄 **src/components/demo/DemoEmailGate.tsx**
- Appel API `/api/demo-email` en POST
- `onUnlock()` déclenché **immédiatement** (UX non bloquante)
- Envoi email en background (async)
- Gestion des états : loading, success, error
- Console logs pour debug

### 4. Configuration
📄 **.env.example** — Template variables d'environnement  
📄 **.gitignore** — Protection des secrets

### 5. Documentation
📄 **CHECKLIST_TESTS.md** — Guide de test complet (local + preview + prod)

---

## 📋 Étapes de déploiement (ORDRE CRITIQUE)

### Étape 1 : Installer les dépendances NPM
```bash
npm install @supabase/supabase-js nodemailer @types/nodemailer @vercel/node
```

### Étape 2 : Exécuter la migration Supabase
1. Aller sur Supabase Dashboard : https://supabase.com/dashboard
2. Sélectionner le projet `macrea-max-prod`
3. Aller dans **SQL Editor**
4. Copier/coller le contenu de `sql/demo_leads.sql`
5. Exécuter (Run)
6. Vérifier dans **Table Editor** que `demo_leads` existe

### Étape 3 : Récupérer les credentials Supabase
1. Dans Supabase Dashboard > Settings > API
2. Copier `URL` (déjà fourni : `https://macrea-cerle.supabase.co`)
3. Copier `service_role` key (secret, **ne pas commit**)

### Étape 4 : Configurer SMTP OVH
1. Vérifier que `max@studiomacrea.cloud` existe sur OVH
2. Récupérer le mot de passe SMTP
3. Host : `ssl0.ovh.net`, Port : `465`

### Étape 5 : Créer le fichier .env local
```bash
cp .env.example .env
```

Puis éditer `.env` et remplir :
```env
SUPABASE_URL=https://macrea-cerle.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (à récupérer)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_USER=max@studiomacrea.cloud
SMTP_PASS=votre_mot_de_passe_smtp
```

⚠️ **Ne JAMAIS commit `.env`** (déjà dans `.gitignore`)

### Étape 6 : Ajouter le PDF
1. Créer le dossier : `mkdir -p public/pdf`
2. Placer le PDF : `public/pdf/macrea-crm-max-guide.pdf`
3. Vérifier que le fichier existe et fait < 10 MB

### Étape 7 : Tester en local
```bash
npm run dev
```

1. Naviguer vers `http://localhost:5181/demoboard`
2. Saisir un email valide (le vôtre)
3. Vérifier :
   - Démo se débloque immédiatement
   - Email reçu sous 2 min avec PDF
   - Supabase : record créé avec `status=sent`

### Étape 8 : Configurer Vercel (variables d'environnement)
1. Aller sur Vercel Dashboard : https://vercel.com/
2. Sélectionner le projet `macrea-max-demo`
3. Settings > Environment Variables
4. Ajouter **pour TOUS les environnements** (Production, Preview, Development) :
   ```
   SUPABASE_URL = https://macrea-cerle.supabase.co
   SUPABASE_SERVICE_ROLE_KEY = eyJhbGc... (votre clé)
   SMTP_HOST = ssl0.ovh.net
   SMTP_PORT = 465
   SMTP_USER = max@studiomacrea.cloud
   SMTP_PASS = votre_mot_de_passe_smtp
   ```

### Étape 9 : Commit et push
```bash
git add .
git commit -m "feat: Demo email automation with Supabase + SMTP OVH"
git push origin main
```

Vercel va déployer automatiquement (≈ 2 min).

### Étape 10 : Tester sur Vercel Preview
1. Récupérer l'URL preview dans Vercel Dashboard
2. Naviguer vers `https://xxx.vercel.app/demoboard`
3. Tester avec un email valide
4. Vérifier email + Supabase + logs Vercel

### Étape 11 : Déployer en production
Si preview OK :
1. Merger dans `main` (si pas déjà fait)
2. Vercel déploie automatiquement sur `macrea-max-demo.vercel.app`
3. Tester en prod avec un email externe

**Note** : L'URL de production est l'URL Vercel native. Le domaine `max.studiomacrea.cloud` est réservé pour l'app MAX principale (inscription/produit). Un sous-domaine dédié `demo.studiomacrea.cloud` pourra être configuré plus tard si besoin.

---

## ✅ Checklist de validation

- [ ] Dépendances NPM installées
- [ ] Table Supabase `demo_leads` créée
- [ ] Variables d'environnement configurées (local + Vercel)
- [ ] PDF placé dans `public/pdf/`
- [ ] Test local réussi
- [ ] Test Vercel preview réussi
- [ ] Déploiement prod réussi
- [ ] Email bien reçu (pas dans spam)
- [ ] Supabase : records créés avec status=sent
- [ ] Logs Vercel propres (pas d'erreurs 500)
- [ ] Démo JAMAIS bloquée (UX non bloquante validée)

---

## 🎯 Architecture finale

```
User saisit email dans DemoEmailGate.tsx
    ↓
onUnlock() déclenché IMMÉDIATEMENT
    ↓ (en parallèle)
Fetch POST /api/demo-email (async, non bloquant)
    ↓
API Route Vercel (serverless)
    ↓
    ├─→ Validation email
    ├─→ Upsert Supabase (table demo_leads)
    ├─→ Envoi email SMTP OVH + PDF
    └─→ Update Supabase status=sent
```

**Temps d'envoi moyen** : < 2 minutes  
**UX** : Démo débloquée en 0s (immédiat)

---

## 📊 Prêt pour le 20 janvier ? ✅

**Estimation temps total déploiement** : 1h30  
**Reste 3 jours** (17 → 20 janvier) : **largement faisable** ✅

---

## 🆘 Support rapide

### Erreur : "Email pas reçu"
→ Vérifier spam/promotions  
→ Supabase : vérifier `status=sent`  
→ Logs Vercel : chercher erreurs SMTP

### Erreur : "PDF file not found"
→ Vérifier que `public/pdf/macrea-crm-max-guide.pdf` existe  
→ Vérifier le nom exact du fichier (case-sensitive sur Linux)

### Erreur : "Authentication failed" (SMTP)
→ Vérifier `SMTP_PASS` dans Vercel Dashboard  
→ Tester connexion SMTP avec un client email externe

### Erreur : "Database error"
→ Vérifier `SUPABASE_SERVICE_ROLE_KEY` (pas la clé anon)  
→ Vérifier que la table `demo_leads` existe dans Supabase  
→ Vérifier RLS policies (service_role doit avoir accès)

---

**Le code est prêt. Il ne reste plus qu'à déployer ! 🚀**
