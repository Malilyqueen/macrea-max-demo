# 🌐 Configuration Domaines — Architecture MAX

**Date** : 17 janvier 2026  
**Projet** : macrea-max-demo

---

## 📍 Architecture actuelle

### 🚀 max.studiomacrea.cloud
**Usage** : Application MAX principale (produit/inscription)  
**Stack** : Application full-stack MAX  
**Contenu** :
- Page d'accueil produit
- Tarifs
- Inscription / Login
- Dashboard client (accès authentifié)

❌ **N'est PAS utilisé pour la landing démo**

---

### 🎯 macrea-max-demo.vercel.app
**Usage** : Landing + Démo interactive (pour la pub du 20 janvier)  
**Stack** : Vite React SPA + Vercel Serverless Functions  
**Contenu** :
- Landing page marketing M.A.X.
- Démo interactive (demoboard simulé)
- Formulaire email gate + API d'envoi PDF

✅ **URL de production pour le lancement du 20 janvier**

---

## 🔮 Évolution future (post-25 janvier)

### Option 1 : Garder Vercel native
- Continuer sur `macrea-max-demo.vercel.app`
- Simple, stable, pas de config DNS
- Branding Vercel visible dans l'URL

### Option 2 : Sous-domaine Cloudflare dédié
- Créer `demo.studiomacrea.cloud` via Cloudflare
- Pointer vers le projet Vercel `macrea-max-demo`
- URL plus courte et branded
- Configuration : Vercel Dashboard > Domains > Add `demo.studiomacrea.cloud`

---

## 🔗 Liens dans les emails

**Actuellement** (dans `/api/demo-email.ts`) :
```
Retour démo : https://macrea-max-demo.vercel.app/demoboard
Footer : MaCréa Studio • studiomacrea.cloud
```

Si domaine custom ajouté plus tard :
```
Retour démo : https://demo.studiomacrea.cloud/demoboard
```

---

## ⚙️ Configuration technique

### vercel.json (corrigé)
```json
{
  "rewrites": [
    {
      "source": "/((?!api).*)",
      "destination": "/index.html"
    }
  ]
}
```

**Explication** : 
- Le pattern `/((?!api).*)` exclut `/api/*` du rewrite SPA
- Les API routes (`/api/demo-email`) sont gérées directement
- Toutes les autres routes (`/`, `/demoboard`, etc.) renvoient `index.html` (SPA)

---

## 📊 Récapitulatif URLs

| Environnement | URL | Usage |
|--------------|-----|-------|
| **Dev local** | `http://localhost:5181` | Développement |
| **Vercel Preview** | `https://macrea-max-demo-xxx.vercel.app` | Tests avant merge |
| **Production** | `https://macrea-max-demo.vercel.app` | Lancement 20 janvier |
| **Future custom** | `https://demo.studiomacrea.cloud` | Option post-lancement |

---

**Important** : Ne pas confondre les deux projets :
- **macrea-max-demo** = Landing/démo marketing (public)
- **max.studiomacrea.cloud** = App MAX (signup/produit/auth)
