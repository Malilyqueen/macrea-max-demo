Parfait, voici un **README FRONTEND complet** pour `macrea-max-landing`, orienté **développement de la landing page + démo**.
Tu peux le coller tel quel dans `README.md` et adapter ensuite.

---

# 🌌 M.A.X. Landing & Demo

### Frontend — Vitrine officielle + Démo interactive

Ce projet contient :

1. **La landing page officielle de M.A.X.** (site marketing public)
2. **Une démo front simulée** de M.A.X. (sans dépendance au backend réel / MaCréa CRM)

L’objectif :
👉 Permettre de **présenter MAX** (Self-Healing CRM™ + Agent IA)
👉 Montrer une **expérience de chat / scénarios** très proche du vrai produit
👉 Sans aucun risque pour les données ni pour MaCréa CRM.

---

## 🎯 Objectifs du frontend

* Créer une landing page claire, premium, futuriste pour M.A.X.
* Mettre en avant le concept : **Self-Healing CRM™** & **Infrastructure IA**
* Intégrer la **mascotte MAX** comme héros / guide du produit
* Fournir une **démo interactive** basée sur des scénarios mockés :

  * nettoyage de base CRM
  * création automatique de champs
  * import CSV massif
  * déclenchement d’automatisations (WhatsApp / SMS / workflows simulés)

---

## 🧠 Positionnement produit à refléter dans l’UI

> **M.A.X. — Le premier Self-Healing CRM™ qui se répare, évolue et agit tout seul.**
> Basé sur **MaCréa CRM**, une architecture open-core robuste, renforcée pour l’IA, les automatisations et les workflows métier.

Sur la landing, le message doit être simple :

* MAX **n’est pas un assistant** : c’est un **moteur IA** lié à un CRM réel.
* MAX **lit, corrige, enrichit** la base CRM.
* MAX **crée et répare** les champs tout seul.
* MAX **exécute des actions réelles** (WhatsApp, SMS, appels, workflows).
* MAX **traite des CSV massifs** et insère des données propres dans MaCréa CRM.

La démo front doit **raconter ça** visuellement et narrativement.

---

## 🧱 Stack technique

Tu peux adapter, mais le projet est pensé pour :

* **Framework** : React + Vite (recommandé) ou Next.js
* **Langage** : TypeScript (idéal) ou JavaScript
* **Styling** : Tailwind CSS (recommandé) ou CSS Modules
* **Routing** :

  * Vite + `react-router-dom` ou
  * Next.js (routes file-based)

---

## 📁 Structure recommandée du projet

```bash
macrea-max-landing/
  README.md

  package.json
  tsconfig.json            # si TypeScript
  vite.config.ts           # ou next.config.mjs
  tailwind.config.cjs
  postcss.config.cjs

  public/
    favicon.ico
    max/
      max-hero.png         # version principale pour la landing

  docs/
    readme-assets/         # images utilisées uniquement dans la doc
      max-hero-happy.png
      max-hero-thinking.png
      max-hero-guide.png

  src/
    main.tsx
    App.tsx

    assets/
      max/
        max-hero-happy.png
        max-hero-thinking.png
        max-hero-guide.png

    routes/
      HomePage.tsx
      FeaturesPage.tsx
      ForWhoPage.tsx
      PricingPage.tsx
      ContactPage.tsx
      DemoPage.tsx         # interface de démo “Chat M.A.X.”

    components/
      layout/
        MainLayout.tsx
        Header.tsx
        Footer.tsx
      hero/
        MaxHeroSection.tsx
      demo/
        MaxDemoLayout.tsx
        MaxDemoChat.tsx
        ScenarioSelector.tsx
        ScenarioProgress.tsx
      ui/                  # boutons, badges, cards, etc.
        Button.tsx
        Badge.tsx
        Card.tsx

    demo/
      scenarios.ts         # tous les scénarios mockés (JSON / TS)
```

---

## 🎨 Pages à implémenter

### `/` — **Accueil (Hero + pitch)**

* Hero Section avec la mascotte M.A.X.
* Titre principal :

  > **Le premier Self-Healing CRM™ qui protège votre business.**
* Sous-titre :

  > Moteur IA + CRM vivant + automatisations réelles.
* CTA principaux :

  * **[Voir la démo]** → `/demo`
  * **[Découvrir les fonctionnalités]** → `/fonctionnalites`

---

### `/fonctionnalites`

Sections suggérées :

1. **Self-Healing CRM™**

   * explication du CRM qui se répare et crée ses champs
2. **IA connectée au CRM réel**

   * lecture / modification de la base
3. **Actions dans le monde réel**

   * WhatsApp, SMS, appels, workflows
4. **Traitement de données massives**

   * import CSV, nettoyage, enrichissement
5. **Pilotage d’entreprise**

   * multi-tenant, mémoire long-terme, décision IA

---

### `/pour-qui`

* Freelances / coaches / artisans avec besoin de suivi client
* PME avec équipe commerciale
* Agences / studios qui gèrent plusieurs clients (multi-tenant)
* Logistique, e-commerce, services…

---

### `/tarifs`

* Placeholder simple pour l’instant :

  * Offre **Starter**
  * Offre **Pro**
  * Offre **Custom / Entreprise**

(Le détail pourra évoluer plus tard, pas besoin d’être définitif.)

---

### `/contact`

* Formulaire simple (nom, email, site, message)
* CTA : **“Demander une démo personnalisée de M.A.X.”**
* Pour la dev, tu peux :

  * soit mocker le submit
  * soit appeler un webhook/endpoint plus tard

---

### `/demo` — **Démo interactive**

C’est ici qu’on **simule le vrai MAX** avec le style du produit actuel
(chat, sidebar, avatar, modes Auto / Assisté / Conseil).

#### Contenu visuel :

* Sidebar à gauche (Dashboard, Chat M.A.X., CRM, Automatisations, Rapports, Paramètres)
* Header avec :

  * logo M.A.X.
  * quotas (ex. “12 895 / 50 000 tokens”) mockés
* Zone centrale “Chat M.A.X.”
* Modes **Auto / Assisté / Conseil** (boutons)
* Avatar MAX au centre ou en haut de la conversation

#### Comportement :

Tout est **mocké côté frontend**, sans requête API.
ON SIMULE :

* la saisie utilisateur
* les réponses de MAX
* la progression de tâches

---

## 🧪 Système de scénarios pour la démo

Fichier : `src/demo/scenarios.ts`

```ts
export type DemoMessage = {
  from: 'user' | 'max';
  text: string;
  delay?: number; // en ms
};

export type DemoScenarioKey =
  | 'csvCleaning'
  | 'selfHealingFields'
  | 'whatsappCampaign'
  | 'leadAnalysis';

export const DEMO_SCENARIOS: Record<DemoScenarioKey, DemoMessage[]> = {
  csvCleaning: [
    {
      from: 'user',
      text: 'MAX, nettoie ce fichier CSV de 20 000 lignes et supprime les doublons.'
    },
    {
      from: 'max',
      text: 'Je scanne ton fichier… 👀 20 000 lignes détectées, 18 colonnes reconnues.',
      delay: 800
    },
    {
      from: 'max',
      text: '✅ 184 doublons supprimés, 312 erreurs de format corrigées, numéros normalisés.',
      delay: 1200
    },
    {
      from: 'max',
      text: 'Je peux maintenant insérer ces leads proprement dans MaCréa CRM. Tu confirmes ?',
      delay: 1000
    }
  ],

  selfHealingFields: [
    {
      from: 'user',
      text: 'MAX, j’ai un bug : il manque le champ "source" sur certains leads.'
    },
    {
      from: 'max',
      text: 'Je vérifie la structure de MaCréa CRM… 🔎',
      delay: 700
    },
    {
      from: 'max',
      text: 'Je vois : le champ "source" est absent sur 2 pipelines et mal typé sur 1 module.',
      delay: 1200
    },
    {
      from: 'max',
      text: '💠 Je propose : créer le champ "source" manquant + corriger le type partout.',
      delay: 900
    },
    {
      from: 'max',
      text: 'Self-Healing appliqué. Ton CRM est à nouveau cohérent. ✨',
      delay: 1100
    }
  ],

  whatsappCampaign: [
    {
      from: 'user',
      text: 'MAX, lance une campagne WhatsApp de relance sur les paniers abandonnés de plus de 72h.'
    },
    {
      from: 'max',
      text: 'Je filtre les leads concernés dans MaCréa CRM…',
      delay: 800
    },
    {
      from: 'max',
      text: '132 clients trouvés. J’utilise le template approuvé "PANIER_ABANDON_72H".',
      delay: 900
    },
    {
      from: 'max',
      text: '📲 Campagne prête. Envoi programmé sur 3 heures pour éviter les pics.',
      delay: 1000
    }
  ],

  leadAnalysis: [
    {
      from: 'user',
      text: 'MAX, montre-moi les leads à traiter en priorité cette semaine.'
    },
    {
      from: 'max',
      text: 'Je croise le score, la source et la date de dernier contact…',
      delay: 900
    },
    {
      from: 'max',
      text: 'Top 25 leads identifiés. Je t’affiche un tableau trié par probabilité de conversion.',
      delay: 1200
    }
  ]
};
```

---

## 🧩 Composant `MaxDemoChat`

Comportement attendu :

* Au clic sur un scénario dans `ScenarioSelector`,
  on vide les messages et on **rejoue le scénario** message par message.
* Utiliser `setTimeout` pour respecter les `delay`.
* Afficher les bulles avec un style proche du vrai chat de MAX.

Pseudo-code :

```ts
const [messages, setMessages] = useState<DemoMessage[]>([]);
const [isPlaying, setIsPlaying] = useState(false);

const playScenario = (key: DemoScenarioKey) => {
  const script = DEMO_SCENARIOS[key];
  setMessages([]);
  setIsPlaying(true);

  let totalDelay = 0;

  script.forEach((msg) => {
    totalDelay += msg.delay ?? 500;
    setTimeout(() => {
      setMessages((prev) => [...prev, msg]);
      if (msg === script[script.length - 1]) {
        setIsPlaying(false);
      }
    }, totalDelay);
  });
};
```

---

## 🧸 Mascotte M.A.X. — Assets

### Pour la **landing/demo (UI)**

Mettre les fichiers dans :

```bash
public/max/...
ou
src/assets/max/...
```

Ex. :

* `max-hero-happy.png`
* `max-hero-thinking.png`
* `max-hero-guide.png`

### Pour le **README uniquement**

```bash
docs/readme-assets/
  max-hero-happy.png
  max-hero-thinking.png
  max-hero-guide.png
```

Et dans le README :

```md
![MAX](./docs/readme-assets/max-hero-happy.png)
```

---

## ⚙️ Installation & scripts

Exemple pour un projet Vite + React :

```bash
# installation
npm install
# ou
yarn
# ou
pnpm install

# lancer en dev
npm run dev

# build
npm run build

# prévisualisation du build
npm run preview
```

---

## ✅ Ce qui est **hors scope** dans ce projet

* Pas de connexion réelle à MaCréa CRM
* Pas d’appels API Twilio / n8n
* Pas de logique d’authentification complète
* Pas de gestion multi-tenant côté frontend

Tout ce qui touche à **l’infrastructure réelle** reste dans le projet backend + MaCréa CRM.
Ici, le but est : **vitrine + storytelling + démo simulée**.

---

