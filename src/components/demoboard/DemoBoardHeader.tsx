interface DemoBoardHeaderProps {
  onMenuClick?: () => void;
}

export default function DemoBoardHeader({ onMenuClick }: DemoBoardHeaderProps) {
  return (
    <header className="bg-white border-b border-[rgba(0,145,255,0.15)] px-4 md:px-8 py-4 flex items-center justify-between">
      {/* Mobile menu button */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 mr-2 fixed top-4 left-4 z-[110] bg-white/90 border border-[#0091ff] shadow-lg"
          aria-label="Ouvrir le menu"
          style={{ boxShadow: '0 2px 12px 0 rgba(0,145,255,0.15)' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0091ff" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      )}

      {/* Left: Avatar MAX + Token counter */}
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0091ff] to-[#00cfff] flex items-center justify-center shadow-lg animate-pulse">
            <div className="h-4 w-4 rounded-full bg-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1e293b]">M.A.X. est actif</p>
            <p className="text-xs text-[#64748b]">Mode : Assisté</p>
          </div>
        </div>

        {/* Token bar */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#F6FAFF] border border-[rgba(0,145,255,0.2)] rounded-full">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#0091ff]">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <span className="text-xs font-semibold text-[#0091ff]">
            14 200 / 20 000 tokens
          </span>
        </div>
      </div>

      {/* Right: Mode selector + CTA */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mode selector */}
        <div className="hidden sm:flex gap-2 bg-[#F6FAFF] p-1 rounded-lg border border-[rgba(0,145,255,0.1)]">
          <button className="px-4 py-1.5 text-xs font-semibold rounded-md bg-white text-[#0091ff] shadow-sm">
            Assisté
          </button>
          <button className="px-4 py-1.5 text-xs font-semibold text-[#64748b] hover:text-[#0091ff]">
            Auto
          </button>
          <button className="px-4 py-1.5 text-xs font-semibold text-[#64748b] hover:text-[#0091ff]">
            Conseil
          </button>
        </div>

        {/* Ask MAX button */}
        <button className="hidden sm:block px-5 py-2 bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-[#0091ff]/30 transition-all duration-300">
          Ask M.A.X.
        </button>

        {/* Early Birds CTA */}
        <a 
          href="/early-birds?src=demoboard"
          className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 flex items-center gap-2 animate-pulse"
        >
          <span>🚀</span>
          <span>Early Birds</span>
        </a>

        {/* Connection badge */}
        <div className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-md">
          <span className="text-xs font-semibold text-green-700">✓ Connecté CRM</span>
        </div>
      </div>
    </header>
  )
}
