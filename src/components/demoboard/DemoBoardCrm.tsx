import { motion } from 'framer-motion'
import { useState } from 'react'

type Lead = {
  id: number
  name: string
  company: string
  email: string
  phone: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
  score: number
  source: string
  value: string
  lastContact: string
}

const statusConfig = {
  new: { label: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
  contacted: { label: 'Contacté', color: 'bg-purple-100 text-purple-700' },
  qualified: { label: 'Qualifié', color: 'bg-cyan-100 text-cyan-700' },
  proposal: { label: 'Proposition', color: 'bg-yellow-100 text-yellow-700' },
  negotiation: { label: 'Négociation', color: 'bg-orange-100 text-orange-700' },
  won: { label: 'Gagné', color: 'bg-green-100 text-green-700' },
  lost: { label: 'Perdu', color: 'bg-red-100 text-red-700' }
}

const FAKE_LEADS: Lead[] = [
  {
    id: 1,
    name: 'Sophie Martin',
    company: 'TechCorp Solutions',
    email: 'sophie.martin@techcorp.fr',
    phone: '+33 6 12 34 56 78',
    status: 'qualified',
    score: 92,
    source: 'Site web',
    value: '15 000 €',
    lastContact: 'Hier, 14:32'
  },
  {
    id: 2,
    name: 'Marc Durand',
    company: 'Innovation Labs',
    email: 'marc.durand@innov-labs.com',
    phone: '+33 6 23 45 67 89',
    status: 'proposal',
    score: 87,
    source: 'LinkedIn',
    value: '28 500 €',
    lastContact: 'Aujourd\'hui, 10:15'
  },
  {
    id: 3,
    name: 'Émilie Rousseau',
    company: 'Digital Partners',
    email: 'emilie.r@digital-partners.fr',
    phone: '+33 6 34 56 78 90',
    status: 'negotiation',
    score: 95,
    source: 'Recommandation',
    value: '42 000 €',
    lastContact: 'Il y a 2h'
  },
  {
    id: 4,
    name: 'Thomas Lefèvre',
    company: 'StartUp Booster',
    email: 't.lefevre@startup-booster.io',
    phone: '+33 6 45 67 89 01',
    status: 'contacted',
    score: 68,
    source: 'Événement',
    value: '8 200 €',
    lastContact: 'Il y a 5 jours'
  },
  {
    id: 5,
    name: 'Julie Bernard',
    company: 'Consulting & Co',
    email: 'julie.bernard@consulting-co.fr',
    phone: '+33 6 56 78 90 12',
    status: 'new',
    score: 75,
    source: 'Import CSV',
    value: '12 500 €',
    lastContact: 'Jamais'
  },
  {
    id: 6,
    name: 'Alexandre Petit',
    company: 'Cloud Services Pro',
    email: 'a.petit@cloudservices.fr',
    phone: '+33 6 67 89 01 23',
    status: 'won',
    score: 98,
    source: 'Partenaire',
    value: '55 000 €',
    lastContact: 'Il y a 3 jours'
  },
  {
    id: 7,
    name: 'Nathalie Moreau',
    company: 'E-commerce Factory',
    email: 'nathalie.m@ecommerce-factory.com',
    phone: '+33 6 78 90 12 34',
    status: 'qualified',
    score: 83,
    source: 'WhatsApp',
    value: '19 800 €',
    lastContact: 'Hier, 16:45'
  },
  {
    id: 8,
    name: 'Pierre Dubois',
    company: 'Marketing Solutions',
    email: 'p.dubois@marketing-sol.fr',
    phone: '+33 6 89 01 23 45',
    status: 'lost',
    score: 42,
    source: 'Publicité',
    value: '6 500 €',
    lastContact: 'Il y a 2 semaines'
  },
  {
    id: 9,
    name: 'Céline Lambert',
    company: 'Growth Hacking Inc',
    email: 'celine.lambert@growthhack.io',
    phone: '+33 6 90 12 34 56',
    status: 'proposal',
    score: 88,
    source: 'Site web',
    value: '32 000 €',
    lastContact: 'Aujourd\'hui, 09:20'
  },
  {
    id: 10,
    name: 'Vincent Garnier',
    company: 'Data Analytics Group',
    email: 'v.garnier@data-analytics.com',
    phone: '+33 6 01 23 45 67',
    status: 'contacted',
    score: 71,
    source: 'Email campagne',
    value: '11 200 €',
    lastContact: 'Il y a 4 jours'
  }
]

export default function DemoBoardCrm() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLeads = FAKE_LEADS.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white rounded-2xl border border-[rgba(0,145,255,0.15)] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#1e293b]">Mes Leads</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748b] px-3 py-1 bg-[#F6FAFF] rounded-full">
              {filteredLeads.length} leads
            </span>
            <button className="px-4 py-2 bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
              + Nouveau lead
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Rechercher un lead..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F6FAFF] border border-[rgba(0,145,255,0.15)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0091ff]/20"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F6FAFF] border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                Lead
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                Entreprise
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                Valeur
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                Dernier contact
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredLeads.map((lead, index) => (
              <motion.tr
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedLead(lead)}
                className="hover:bg-[#F6FAFF] cursor-pointer transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1e293b]">{lead.name}</p>
                    <p className="text-xs text-[#64748b]">{lead.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-[#1e293b]">{lead.company}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[lead.status].color}`}>
                    {statusConfig[lead.status].label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          lead.score >= 80 ? 'bg-green-500' : 
                          lead.score >= 60 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-[#1e293b]">{lead.score}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-[#64748b]">{lead.source}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-[#1e293b]">{lead.value}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-[#64748b]">{lead.lastContact}</p>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de détails */}
      {selectedLead && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedLead(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#1e293b]">{selectedLead.name}</h3>
                <p className="text-sm text-[#64748b] mt-1">{selectedLead.company}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-[#64748b] hover:text-[#1e293b] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs font-semibold text-[#64748b] uppercase mb-1">Email</p>
                <p className="text-sm text-[#1e293b]">{selectedLead.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#64748b] uppercase mb-1">Téléphone</p>
                <p className="text-sm text-[#1e293b]">{selectedLead.phone}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#64748b] uppercase mb-1">Statut</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[selectedLead.status].color}`}>
                  {statusConfig[selectedLead.status].label}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#64748b] uppercase mb-1">Score</p>
                <p className="text-sm font-bold text-[#1e293b]">{selectedLead.score}/100</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#64748b] uppercase mb-1">Source</p>
                <p className="text-sm text-[#1e293b]">{selectedLead.source}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#64748b] uppercase mb-1">Valeur estimée</p>
                <p className="text-sm font-bold text-[#0091ff]">{selectedLead.value}</p>
              </div>
            </div>

            <div className="bg-[#F6FAFF] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#64748b] uppercase mb-2">Dernier contact</p>
              <p className="text-sm text-[#1e293b]">{selectedLead.lastContact}</p>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Envoyer un message
              </button>
              <button className="px-4 py-2 border border-[rgba(0,145,255,0.3)] text-[#0091ff] text-sm font-semibold rounded-lg hover:bg-[#F6FAFF] transition-colors">
                Modifier
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
