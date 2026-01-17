# 📦 Installation des dépendances

```bash
npm install @supabase/supabase-js nodemailer @types/nodemailer @vercel/node
```

---

# 🧪 CHECKLIST TESTS — Demo Email Automation

## ✅ Pré-requis avant tests

### 1. Configuration Supabase
- [ ] Exécuter la migration SQL dans Supabase (macrea-max-prod)
  ```sql
  -- Copier/coller le contenu de sql/demo_leads.sql
  ```
- [ ] Vérifier que la table `demo_leads` existe
- [ ] Tester manuellement un INSERT via Supabase Dashboard
- [ ] Récupérer la `SERVICE_ROLE_KEY` depuis Supabase Dashboard > Settings > API

### 2. Configuration SMTP OVH
- [ ] Vérifier que l'email max@studiomacrea.cloud existe sur OVH
- [ ] Récupérer le mot de passe SMTP
- [ ] Tester la connexion SMTP (optionnel : via outil externe type Thunderbird)

### 3. Configuration .env local
- [ ] Copier `.env.example` vers `.env`
- [ ] Remplir `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Remplir `SMTP_PASS`
- [ ] Vérifier que `.env` est bien dans `.gitignore`

### 4. Ajouter le PDF
- [ ] Créer le dossier `public/pdf/`
- [ ] Placer `macrea-crm-max-guide.pdf` dans `public/pdf/`
- [ ] Vérifier taille < 10 MB (limite raisonnable pour email)
- [ ] Tester l'accès local : `http://localhost:5181/pdf/macrea-crm-max-guide.pdf`

---

## 🧪 Tests locaux (dev)

### Test 1 : Email valide (premier envoi)
```bash
npm run dev
```

1. [ ] Naviguer vers `http://localhost:5181/demoboard`
2. [ ] Saisir un **email valide de test** (le vôtre)
3. [ ] Cliquer sur "Débloquer la démo"
4. [ ] **Vérifier** :
   - [ ] La démo se débloque **immédiatement** (UX non bloquante)
   - [ ] Console : `[SUCCESS] PDF envoyé à ...`
   - [ ] Email reçu dans les **1-2 minutes**
   - [ ] PDF en pièce jointe
   - [ ] Supabase : vérifier dans `demo_leads` que `status=sent` et `pdf_sent=true`

### Test 2 : Email invalide
1. [ ] Saisir `testinvalide` (sans @)
2. [ ] Cliquer sur submit
3. [ ] **Vérifier** :
   - [ ] La démo se débloque quand même (UX)
   - [ ] Console : `[API ERROR] Email invalide`
   - [ ] Aucun email envoyé
   - [ ] Supabase : aucun record créé (ou status=error si partiellement enregistré)

### Test 3 : Double submit (même email)
1. [ ] Recharger `/demoboard`
2. [ ] Saisir le **même email** que Test 1
3. [ ] Submit
4. [ ] **Vérifier** :
   - [ ] Démo débloquée
   - [ ] Message API : `"PDF déjà envoyé récemment"` ou email renvoyé si > 24h
   - [ ] Supabase : `last_sent_at` mis à jour (si renvoyé)

### Test 4 : SMTP down / erreur serveur
1. [ ] Modifier `.env` : mettre un mauvais `SMTP_PASS`
2. [ ] Redémarrer `npm run dev`
3. [ ] Saisir un email valide
4. [ ] **Vérifier** :
   - [ ] La démo se débloque quand même (UX)
   - [ ] Console : `[FETCH ERROR] Envoi email échoué`
   - [ ] Supabase : `status=error` + `error_message` rempli

### Test 5 : PDF manquant
1. [ ] Renommer temporairement `public/pdf/macrea-crm-max-guide.pdf`
2. [ ] Saisir un email valide
3. [ ] **Vérifier** :
   - [ ] Démo débloquée
   - [ ] API retourne `{ ok: false, error: "PDF introuvable" }`
   - [ ] Supabase : `status=error`

---

## 🚀 Tests Vercel Preview

### Déploiement preview
```bash
git add .
git commit -m "feat: Demo email automation (SMTP + Supabase)"
git push origin main
```

1. [ ] Attendre le build Vercel (≈ 2 min)
2. [ ] Récupérer l'URL preview : `https://macrea-max-demo-xxx.vercel.app`

### Configuration variables d'environnement Vercel
1. [ ] Aller dans Vercel Dashboard > macrea-max-demo > Settings > Environment Variables
2. [ ] Ajouter (pour TOUS les environments : Production, Preview, Development) :
   ```
   SUPABASE_URL
   SUPABASE_SERVICE_ROLE_KEY
   SMTP_HOST
   SMTP_PORT
   SMTP_USER
   SMTP_PASS
   ```
3. [ ] Redéployer si nécessaire

### Test 6 : Email valide (preview)
1. [ ] Naviguer vers `https://xxx.vercel.app/demoboard`
2. [ ] Saisir un email valide
3. [ ] **Vérifier** :
   - [ ] Démo débloquée
   - [ ] Email reçu (vérifier spam/promotions)
   - [ ] PDF présent
   - [ ] Supabase : record créé

### Test 7 : Logs Vercel
1. [ ] Aller dans Vercel Dashboard > Functions > Logs
2. [ ] Chercher `/api/demo-email`
3. [ ] **Vérifier** :
   - [ ] Logs de succès/erreur visibles
   - [ ] Pas d'erreurs 500 non catchées

---

## 🌐 Tests Production

### Déploiement production
1. [ ] Merger la branche dans `main`
2. [ ] Vercel déploie automatiquement
3. [ ] Vérifier URL : `https://macrea-max-demo.vercel.app/demoboard`

**Note** : L'URL de production est l'URL Vercel native pour le lancement du 20 janvier. Le domaine `max.studiomacrea.cloud` est réservé pour l'app MAX (signup/produit). Un sous-domaine custom pourra être ajouté plus tard.

### Test 8 : Email valide (production)
1. [ ] Naviguer vers le site prod
2. [ ] Saisir un **email réel externe** (pas le vôtre)
3. [ ] **Vérifier** :
   - [ ] Démo débloquée immédiatement
   - [ ] Email reçu sous 2 min
   - [ ] PDF lisible
   - [ ] Supabase : status=sent

### Test 9 : Volume test (optionnel)
1. [ ] Saisir 5-10 emails différents rapidement
2. [ ] **Vérifier** :
   - [ ] Tous les emails sont envoyés
   - [ ] Pas de rate limit SMTP
   - [ ] Supabase : tous les records présents

### Test 10 : Monitoring continu
1. [ ] Vérifier que les emails arrivent bien (pas dans spam)
2. [ ] Supabase : requête pour voir les `status=error` :
   ```sql
   SELECT * FROM demo_leads WHERE status = 'error' ORDER BY created_at DESC;
   ```
3. [ ] Configurer une alerte Slack/email si trop d'erreurs (optionnel, plus tard)

---

## 🐛 Cas d'erreur à vérifier

| Cas | Comportement attendu |
|-----|---------------------|
| Email invalide | Démo débloquée, API retourne 400, pas d'envoi |
| SMTP down | Démo débloquée, status=error dans Supabase |
| PDF manquant | Démo débloquée, API retourne 500, status=error |
| Supabase down | Démo débloquée, email peut être envoyé mais pas enregistré (log erreur) |
| Double submit < 24h | Email pas renvoyé, message "déjà envoyé" |
| Double submit > 24h | Email renvoyé, last_sent_at mis à jour |

---

## 📊 Monitoring post-déploiement

### Métriques à suivre (jour du lancement - 20 janvier)

1. [ ] **Nombre de leads collectés** :
   ```sql
   SELECT COUNT(*) FROM demo_leads;
   ```

2. [ ] **Taux d'envoi réussi** :
   ```sql
   SELECT 
     COUNT(CASE WHEN status = 'sent' THEN 1 END) as sent,
     COUNT(CASE WHEN status = 'error' THEN 1 END) as error,
     COUNT(*) as total
   FROM demo_leads;
   ```

3. [ ] **Dernières erreurs** :
   ```sql
   SELECT email, error_message, created_at 
   FROM demo_leads 
   WHERE status = 'error' 
   ORDER BY created_at DESC 
   LIMIT 10;
   ```

4. [ ] **Logs Vercel** :
   - Aller dans Functions > Logs
   - Filtrer par `/api/demo-email`
   - Vérifier qu'il n'y a pas d'erreurs 500 non catchées

---

## ✅ Critères de validation finale

- [ ] ✅ **La démo n'est JAMAIS bloquée** (onUnlock immédiat)
- [ ] ✅ Email envoyé en < 2 minutes
- [ ] ✅ PDF reçu en pièce jointe
- [ ] ✅ Lead enregistré dans Supabase
- [ ] ✅ Gestion d'erreur graceful (pas de crash)
- [ ] ✅ Logs propres dans Vercel
- [ ] ✅ Emails pas dans spam (vérifier avec Gmail/Outlook)
- [ ] ✅ Aucune donnée sensible exposée côté client
- [ ] ✅ Rate limit implicite OK (pas de submit spam)

---

## 🔧 Dépannage rapide

### Problème : Email pas reçu
1. Vérifier spam/promotions
2. Vérifier Supabase : `status=sent` ?
3. Vérifier logs Vercel : erreur SMTP ?
4. Tester SMTP avec un outil externe

### Problème : Status = error dans Supabase
1. Vérifier `error_message` dans la table
2. Vérifier logs Vercel pour détails
3. Cas communs :
   - `PDF file not found` → Vérifier `public/pdf/`
   - `Authentication failed` → Vérifier `SMTP_PASS`
   - `Network error` → SMTP down ou firewall

### Problème : Démo ne se débloque pas
1. Vérifier console browser : erreurs JS ?
2. Vérifier `DemoEmailGate.tsx` : `onUnlock()` bien appelé ?
3. Tester sans API : commenter fetch, vérifier onUnlock seul

---

**Date limite : 20 janvier 2026**
**Prêt pour le lancement ? ✅**
