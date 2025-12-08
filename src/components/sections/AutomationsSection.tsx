import { motion } from 'framer-motion'

const automations = [
  {
    id: 1,
    title: 'Messages automatiques',
    description: "Envoi d'emails, SMS et messages WhatsApp personnalisés en fonction du statut du prospect ou de l'action récente.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    title: 'Relances programmées',
    description: 'Relances de devis, suivis de rendez-vous, messages post-achat ou post-prestation, sans que vous ayez à y penser.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 3,
    title: 'Appels et messages vocaux assistés',
    description: "Préparation et déclenchement d'appels ou de messages vocaux automatisés pour confirmer un rendez-vous ou rappeler une échéance importante.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 4,
    title: 'Workflows CRM et tâches internes',
    description: "Mise à jour des statuts dans MaCréa CRM, ajout de tags, création de tâches ou rappels pour votre équipe, selon des scénarios métier.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 5,
    title: 'Imports et traitements en arrière-plan',
    description: "Lorsqu'un fichier prospect est importé, M.A.X. peut scanner, nettoyer, valider et insérer proprement les données dans votre CRM.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
    color: 'from-green-500 to-green-600'
  }
]

export default function AutomationsSection() {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Fond décoratif subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-max-bg/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-max-dark mb-6">
            Automatisations intelligentes :{' '}
            <span className="bg-gradient-to-r from-max-blue to-max-glow bg-clip-text text-transparent">
              M.A.X. exécute pour vous
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            M.A.X. ne se contente pas d'analyser votre MaCréa CRM.
            <br />
            Il peut aussi déclencher des messages, relances, notifications et workflows,
            selon les règles que vous définissez.
          </p>
        </motion.div>

        {/* Grille de cartes d'automatisations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automations.map((automation, index) => (
            <motion.div
              key={automation.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="h-full bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Icône avec gradient */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${automation.color} flex items-center justify-center mb-5 text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {automation.icon}
                </div>

                {/* Contenu */}
                <h3 className="text-xl font-bold text-max-dark mb-3 group-hover:text-max-blue transition-colors">
                  {automation.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {automation.description}
                </p>

                {/* Indicateur visuel au hover */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <div className="flex items-center text-sm text-max-blue font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Configuration dans M.A.X.</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Badge de réassurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-max-bg/50 rounded-full border border-max-blue/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-max-blue">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span className="text-sm font-medium text-gray-700">
              Automatisations configurables en quelques clics depuis votre MaCréa CRM
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
