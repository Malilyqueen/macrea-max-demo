import { motion } from 'framer-motion'
import { useState } from 'react'

const ActionIcon = ({ type }: { type: 'email' | 'sms' | 'whatsapp' | 'call' | 'click' | 'chat' | 'target' | 'trophy' | 'lightbulb' | 'chart' | 'lightning' }) => {
  switch (type) {
    case 'email':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    case 'sms':
    case 'chat':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <line x1="9" y1="10" x2="15" y2="10"/>
          <line x1="9" y1="14" x2="13" y2="14"/>
        </svg>
      )
    case 'whatsapp':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      )
    case 'call':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      )
    case 'click':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      )
    case 'target':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      )
    case 'trophy':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
          <path d="M4 22h16"/>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
        </svg>
      )
    case 'lightbulb':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18h6"/>
          <path d="M10 22h4"/>
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
        </svg>
      )
    case 'chart':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18"/>
          <path d="M18 17V9"/>
          <path d="M13 17V5"/>
          <path d="M8 17v-3"/>
        </svg>
      )
    case 'lightning':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      )
  }
}

type MetricCard = {
  title: string
  value: string
  change: string
  isPositive: boolean
  iconType: 'email' | 'click' | 'chat' | 'target'
}

type CampaignStat = {
  channel: string
  sent: number
  opened: number
  clicked: number
  responded: number
  converted: number
  iconType: 'email' | 'sms' | 'whatsapp' | 'call'
  color: string
}

const metrics: MetricCard[] = [
  {
    title: 'Taux d\'ouverture moyen',
    value: '68.4%',
    change: '+12.3%',
    isPositive: true,
    iconType: 'email'
  },
  {
    title: 'Taux de clic (CTR)',
    value: '24.7%',
    change: '+8.5%',
    isPositive: true,
    iconType: 'click'
  },
  {
    title: 'Taux de réponse',
    value: '15.2%',
    change: '+3.1%',
    isPositive: true,
    iconType: 'chat'
  },
  {
    title: 'Taux de conversion',
    value: '9.8%',
    change: '-1.2%',
    isPositive: false,
    iconType: 'target'
  }
]

const campaignStats: CampaignStat[] = [
  {
    channel: 'Email',
    sent: 2450,
    opened: 1680,
    clicked: 605,
    responded: 372,
    converted: 240,
    iconType: 'email',
    color: 'from-blue-500 to-blue-600'
  },
  {
    channel: 'WhatsApp',
    sent: 892,
    opened: 847,
    clicked: 312,
    responded: 189,
    converted: 98,
    iconType: 'whatsapp',
    color: 'from-green-500 to-green-600'
  },
  {
    channel: 'SMS',
    sent: 1340,
    opened: 1206,
    clicked: 268,
    responded: 134,
    converted: 67,
    iconType: 'sms',
    color: 'from-purple-500 to-purple-600'
  },
  {
    channel: 'Appels',
    sent: 156,
    opened: 156,
    clicked: 89,
    responded: 62,
    converted: 34,
    iconType: 'call',
    color: 'from-orange-500 to-orange-600'
  }
]

export default function DemoBoardReports() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  const totalSent = campaignStats.reduce((sum, stat) => sum + stat.sent, 0)
  const totalConverted = campaignStats.reduce((sum, stat) => sum + stat.converted, 0)
  const overallConversion = ((totalConverted / totalSent) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
            Rapports <span className="bg-gradient-to-r from-[#0091ff] to-[#00cfff] bg-clip-text text-transparent">M.A.X.</span>
          </h1>
          <p className="text-[#64748b]">
            Analyse de performance de vos campagnes marketing
          </p>
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-2 bg-white rounded-xl border border-[rgba(0,145,255,0.15)] p-1">
          <button
            onClick={() => setPeriod('7d')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              period === '7d'
                ? 'bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white shadow-md'
                : 'text-[#64748b] hover:text-[#0091ff]'
            }`}
          >
            7 jours
          </button>
          <button
            onClick={() => setPeriod('30d')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              period === '30d'
                ? 'bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white shadow-md'
                : 'text-[#64748b] hover:text-[#0091ff]'
            }`}
          >
            30 jours
          </button>
          <button
            onClick={() => setPeriod('90d')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              period === '90d'
                ? 'bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white shadow-md'
                : 'text-[#64748b] hover:text-[#0091ff]'
            }`}
          >
            90 jours
          </button>
        </div>
      </motion.div>

      {/* Metrics cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-[rgba(0,145,255,0.15)] p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0091ff] to-[#00cfff] flex items-center justify-center">
                <ActionIcon type={metric.iconType} />
              </div>
              <span className={`text-sm font-semibold ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </span>
            </div>
            <h3 className="text-sm text-[#64748b] mb-1">{metric.title}</h3>
            <p className="text-3xl font-bold text-[#0091ff]">{metric.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Campaign performance table */}
      <motion.div
        className="bg-white rounded-2xl border border-[rgba(0,145,255,0.15)] shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#1e293b]">Performance par canal</h2>
          <p className="text-sm text-[#64748b] mt-1">Analyse détaillée des métriques de vos campagnes</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F6FAFF]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748b] uppercase">Canal</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748b] uppercase">Envoyés</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748b] uppercase">Ouverts</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748b] uppercase">Clics</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748b] uppercase">Réponses</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748b] uppercase">Conversions</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748b] uppercase">Taux Conv.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaignStats.map((stat, index) => {
                const openRate = ((stat.opened / stat.sent) * 100).toFixed(1)
                const clickRate = ((stat.clicked / stat.opened) * 100).toFixed(1)
                const conversionRate = ((stat.converted / stat.sent) * 100).toFixed(1)

                return (
                  <motion.tr
                    key={stat.channel}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-[#F6FAFF] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}>
                          <ActionIcon type={stat.iconType} />
                        </div>
                        <span className="font-semibold text-[#1e293b]">{stat.channel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#1e293b]">{stat.sent.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-sm font-medium text-[#1e293b]">{stat.opened.toLocaleString()}</span>
                        <span className="text-xs text-[#64748b] ml-2">({openRate}%)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-sm font-medium text-[#1e293b]">{stat.clicked.toLocaleString()}</span>
                        <span className="text-xs text-[#64748b] ml-2">({clickRate}%)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#1e293b]">{stat.responded.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-green-600">{stat.converted.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#0091ff] to-[#00cfff] rounded-full"
                            style={{ width: `${conversionRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-[#0091ff] min-w-[3rem]">{conversionRate}%</span>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
            <tfoot className="bg-[#F6FAFF] border-t-2 border-[#0091ff]">
              <tr>
                <td className="px-6 py-4 font-bold text-[#1e293b]">Total</td>
                <td className="px-6 py-4 font-bold text-[#1e293b]">{totalSent.toLocaleString()}</td>
                <td className="px-6 py-4" />
                <td className="px-6 py-4" />
                <td className="px-6 py-4" />
                <td className="px-6 py-4 font-bold text-green-600">{totalConverted.toLocaleString()}</td>
                <td className="px-6 py-4 font-bold text-[#0091ff]">{overallConversion}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>

      {/* Best performers */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Top campaigns */}
        <div className="bg-white rounded-2xl border border-[rgba(0,145,255,0.15)] p-6">
          <h3 className="text-lg font-bold text-[#1e293b] mb-4 flex items-center gap-2">
            <div className="w-6 h-6 text-[#0091ff]">
              <ActionIcon type="trophy" />
            </div>
            Meilleures campagnes
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Relance panier abandonné', conv: '12.4%', revenue: '28 450 €' },
              { name: 'WhatsApp Black Friday', conv: '18.7%', revenue: '42 180 €' },
              { name: 'Email bienvenue série', conv: '9.8%', revenue: '15 320 €' }
            ].map((campaign) => (
              <div key={campaign.name} className="flex items-center justify-between p-3 bg-[#F6FAFF] rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-[#1e293b]">{campaign.name}</p>
                  <p className="text-xs text-[#64748b] mt-1">Taux de conv: {campaign.conv}</p>
                </div>
                <p className="text-sm font-bold text-[#0091ff]">{campaign.revenue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Insights M.A.X. */}
        <div className="bg-gradient-to-br from-[#0091ff] to-[#00cfff] rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <div className="w-6 h-6">
              <ActionIcon type="lightbulb" />
            </div>
            Insights M.A.X.
          </h3>
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <div className="w-4 h-4">
                  <ActionIcon type="chart" />
                </div>
                Opportunité détectée
              </p>
              <p className="text-xs opacity-90">
                Vos campagnes WhatsApp ont un taux d'ouverture de 95%. M.A.X. recommande d'augmenter le budget de 30%.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <div className="w-4 h-4">
                  <ActionIcon type="lightning" />
                </div>
                Optimisation suggérée
              </p>
              <p className="text-xs opacity-90">
                Les emails envoyés le mardi à 10h ont un CTR 23% supérieur. Ajuster l'horaire automatiquement ?
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <div className="w-4 h-4">
                  <ActionIcon type="target" />
                </div>
                Action recommandée
              </p>
              <p className="text-xs opacity-90">
                47 leads ont ouvert votre email 3+ fois sans cliquer. Lancer une campagne de relance ciblée ?
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Export button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center"
      >
        <button className="px-6 py-3 bg-white text-[#0091ff] border-2 border-[#0091ff] font-semibold rounded-xl hover:bg-[#F6FAFF] transition-colors flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Exporter le rapport complet
        </button>
      </motion.div>
    </div>
  )
}
