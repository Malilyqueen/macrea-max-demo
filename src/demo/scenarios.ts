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
      text: 'MAX, j\'ai un bug : il manque le champ "source" sur certains leads.'
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
      text: '132 clients trouvés. J\'utilise le template approuvé "PANIER_ABANDON_72H".',
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
      text: 'Top 25 leads identifiés. Je t\'affiche un tableau trié par probabilité de conversion.',
      delay: 1200
    }
  ]
};
