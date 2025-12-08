import { Link } from 'react-router-dom'

type DemoBoardSidebarProps = {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function DemoBoardSidebar({ activeTab, setActiveTab }: DemoBoardSidebarProps) {
  
  const menuItems = [
    { 
      name: 'Dashboard',
      id: 'dashboard',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    },
    { 
      name: 'Chat M.A.X.',
      id: 'chat',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    },
    { 
      name: 'CRM',
      id: 'crm',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    },
    { 
      name: 'Automatisations',
      id: 'automatisations',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    },
    { 
      name: 'Rapports',
      id: 'rapports',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
    },
    { 
      name: 'Paramètres',
      id: 'parametres',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m-9-9h6m6 0h6"/></svg>
    },
  ]

  return (
    <aside className="w-64 bg-[#F0F6FF] border-r border-[rgba(0,145,255,0.15)] min-h-screen p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0091ff] to-[#00cfff] flex items-center justify-center shadow-lg">
            <div className="h-4 w-4 rounded-full bg-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#0091ff] to-[#00cfff] bg-clip-text text-transparent">
            M.A.X.
          </span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white shadow-lg'
                : 'text-[#64748b] hover:bg-white hover:text-[#0091ff] hover:shadow-sm'
            }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* User section */}
      <div className="mt-auto pt-4 border-t border-[rgba(0,145,255,0.1)]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/50">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0091ff] to-[#00cfff]" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#1e293b] truncate">Démo User</p>
            <p className="text-xs text-[#64748b]">demo@max.ai</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
