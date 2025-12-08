import { motion } from 'framer-motion'
import MainLayout from '../components/layout/MainLayout';

const features = [
  {
    id: 1,
    category: 'Analyse intelligente',
    title: 'Analyse conversationnelle de votre CRM',
    description: "Posez des questions en langage naturel à M.A.X. sur vos données : \"Combien de leads qualifiés ce mois ?\", \"Quel est le taux de conversion de mes campagnes email ?\"",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <line x1="9" y1="10" x2="15" y2="10"/>
        <line x1="9" y1="14" x2="13" y2="14"/>
      </svg>
    ),
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    category: 'Analyse intelligente',
    title: 'Détection de tendances et insights',
    description: "M.A.X. analyse vos données CRM en temps réel et détecte automatiquement les tendances, opportunités et points d'attention pour optimiser votre stratégie commerciale.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 3,
    category: 'Analyse intelligente',
    title: 'Scoring intelligent des prospects',
    description: "Attribution automatique de scores de qualité basés sur le comportement, l'historique et les interactions. Priorisez vos meilleurs leads automatiquement.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 4,
    category: 'Automatisations marketing',
    title: 'Messages automatiques multi-canaux',
    description: "Envoi automatisé d'emails, SMS et messages WhatsApp personnalisés selon le statut du prospect, son score ou ses actions récentes.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 5,
    category: 'Automatisations marketing',
    title: 'Relances et suivis automatisés',
    description: "Relances de devis, suivis de rendez-vous, messages post-achat ou post-prestation programmés automatiquement selon vos règles métier.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 6,
    category: 'Automatisations marketing',
    title: 'Appels et messages vocaux assistés',
    description: "Préparation et déclenchement d'appels ou messages vocaux automatisés pour confirmer rendez-vous ou rappeler échéances importantes.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 7,
    category: 'Workflows CRM',
    title: 'Mise à jour automatique des statuts',
    description: "M.A.X. met à jour automatiquement les statuts de vos leads dans MaCréa CRM selon vos scénarios : nouveau, contacté, qualifié, en négociation, gagné.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    color: 'from-green-500 to-green-600'
  },
  {
    id: 8,
    category: 'Workflows CRM',
    title: 'Gestion automatique des tags',
    description: "Application automatique de tags selon les comportements détectés : prospect chaud, inactif, fidèle, à relancer. Organisez votre CRM sans effort.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
    color: 'from-teal-500 to-teal-600'
  },
  {
    id: 9,
    category: 'Workflows CRM',
    title: 'Création de tâches et rappels',
    description: "Génération automatique de tâches et rappels pour votre équipe selon les échéances, actions clients ou règles de suivi que vous définissez.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 10,
    category: 'Import et traitement',
    title: 'Import intelligent de fichiers prospects',
    description: "Importez vos fichiers Excel, CSV ou autres. M.A.X. scanne, nettoie, valide et insère proprement les données dans MaCréa CRM.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 11,
    category: 'Import et traitement',
    title: 'Nettoyage et validation des données',
    description: "Détection automatique de doublons, validation des formats (emails, téléphones), enrichissement des informations manquantes pour un CRM toujours propre.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    color: 'from-lime-500 to-lime-600'
  },
  {
    id: 12,
    category: 'Rapports et analytics',
    title: 'Tableaux de bord en temps réel',
    description: "Visualisation instantanée de vos KPIs : taux d'ouverture, taux de clic, conversions, CA généré. Tout accessible depuis votre interface M.A.X.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    ),
    color: 'from-red-500 to-red-600'
  },
  {
    id: 13,
    category: 'Rapports et analytics',
    title: 'Performance des campagnes par canal',
    description: "Analyse détaillée des performances de vos campagnes email, SMS, WhatsApp et appels. Identifiez ce qui fonctionne le mieux pour votre activité.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18"/>
        <path d="M18 17V9"/>
        <path d="M13 17V5"/>
        <path d="M8 17v-3"/>
      </svg>
    ),
    color: 'from-rose-500 to-rose-600'
  },
  {
    id: 14,
    category: 'Rapports et analytics',
    title: 'Export de rapports personnalisés',
    description: "Générez et exportez des rapports détaillés au format Excel, PDF ou CSV. Partagez facilement vos résultats avec votre équipe ou vos partenaires.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    color: 'from-violet-500 to-violet-600'
  },
  {
    id: 15,
    category: 'Intégration',
    title: 'Connexion native avec MaCréa CRM',
    description: "M.A.X. se connecte directement à votre MaCréa CRM existant. Aucune migration de données, installation immédiate et sécurisée.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    color: 'from-sky-500 to-sky-600'
  },
  {
    id: 16,
    category: 'Intégration',
    title: 'API et webhooks',
    description: "Intégrez M.A.X. avec vos outils métier existants via API REST et webhooks. Automatisez encore plus vos processus métier.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    color: 'from-amber-500 to-amber-600'
  }
]

const categories = [
  'Analyse intelligente',
  'Automatisations marketing',
  'Workflows CRM',
  'Import et traitement',
  'Rapports et analytics',
  'Intégration'
]

export default function FeaturesPage() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-[#F6FAFF]/30 to-white min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-max-dark mb-6">
              Toutes les fonctionnalités de{' '}
              <span className="bg-gradient-to-r from-[#3BA0FF] to-[#00C8FF] bg-clip-text text-transparent">
                M.A.X.
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Votre assistant IA complet pour automatiser, analyser et optimiser votre relation client depuis MaCréa CRM.
            </p>
          </motion.div>

          {/* Fonctionnalités par catégorie */}
          {categories.map((category, categoryIndex) => {
            const categoryFeatures = features.filter(f => f.category === category)
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="mb-20"
              >
                {/* Titre de catégorie */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-1 w-12 bg-gradient-to-r from-[#3BA0FF] to-[#00C8FF] rounded-full" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    {category}
                  </h2>
                  <div className="h-1 flex-1 bg-gradient-to-r from-[#00C8FF]/50 to-transparent rounded-full" />
                </div>

                {/* Grille de fonctionnalités */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryFeatures.map((feature, featureIndex) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: featureIndex * 0.1,
                        ease: [0.21, 0.47, 0.32, 0.98]
                      }}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      className="group"
                    >
                      <div className="h-full bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-xl transition-all duration-300">
                        {/* Icône */}
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          {feature.icon}
                        </div>

                        {/* Contenu */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#3BA0FF] transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-[15px]">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}

          {/* CTA final */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-20 p-12 bg-gradient-to-br from-[#3BA0FF] to-[#00C8FF] rounded-3xl shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-4 text-white">
              Prêt à transformer votre CRM avec{' '}
              <span className="inline-block px-3 py-1 bg-white/20 rounded-lg backdrop-blur-sm">M.A.X.</span> ?
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Découvrez comment <span className="font-semibold bg-white/10 px-2 py-0.5 rounded">M.A.X.</span> peut automatiser votre relation client et booster vos performances commerciales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/demoboard"
                className="inline-block px-8 py-4 bg-white text-[#3BA0FF] font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Voir la démo interactive
              </a>
              <a 
                href="/tarifs"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-[#3BA0FF] transition-all"
              >
                Inscription early bird
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
