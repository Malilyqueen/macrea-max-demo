import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  // Masquer le hamburger du Header sur toutes les routes liées au demo board
  // (plus robuste que startsWith pour gérer query params ou variantes)
  const hideMobileHamburger = /demoboard/i.test(location.pathname)

  return (
    <header className="relative z-[100005] bg-[rgba(255,255,255,0.9)] backdrop-blur-[20px] shadow-sm border-b border-[rgba(0,145,255,0.15)]">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/docs/readme-assets/max-logo.png" alt="M.A.X." className="h-16" />
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-[#64748b] hover:text-[#0091ff] hover:shadow-[0_0_15px_rgba(0,207,255,0.1)] transition-all">
              Accueil
            </Link>
            <Link to="/fonctionnalites" className="text-[#64748b] hover:text-[#0091ff] hover:shadow-[0_0_15px_rgba(0,207,255,0.1)] transition-all">
              Fonctionnalités
            </Link>
            <Link to="/pour-qui" className="text-[#64748b] hover:text-[#0091ff] hover:shadow-[0_0_15px_rgba(0,207,255,0.1)] transition-all">
              Pour qui ?
            </Link>
            <Link to="/tarifs" className="text-[#64748b] hover:text-[#0091ff] hover:shadow-[0_0_15px_rgba(0,207,255,0.1)] transition-all">
              Tarifs
            </Link>
            <a href="/blog" className="text-[#64748b] hover:text-[#0091ff] hover:shadow-[0_0_15px_rgba(0,207,255,0.1)] transition-all">
              Blog
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile hamburger button */}
            {!hideMobileHamburger && (
            <button
              onClick={() => { console.log('hamburger: main header clicked'); setMobileOpen(true) }}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 mr-2 relative"
              aria-label="Ouvrir le menu"
              title="Ouvrir le menu"
            >
              <span className="absolute -top-2 -right-6 bg-green-600 text-white text-[10px] px-1 py-0.5 rounded z-[200000]">HEADER</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            )}

            <Link 
              to="/demoboard" 
              className="bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white px-6 py-2 rounded-lg hover:shadow-[0_0_25px_rgba(0,207,255,0.5)] transition-all font-semibold"
            >
              Voir la démo
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && !hideMobileHamburger && (
        <div className="md:hidden fixed inset-0 z-[100002] bg-white/95 backdrop-blur-sm p-6 overflow-auto h-screen" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex items-center justify-between mb-6">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center">
              <img src="/docs/readme-assets/max-logo.png" alt="M.A.X." className="h-12" />
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Fermer le menu" className="p-2 rounded-lg bg-gray-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <nav className="space-y-4">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block text-lg font-semibold text-[#1e293b]">Accueil</Link>
            <Link to="/fonctionnalites" onClick={() => setMobileOpen(false)} className="block text-lg text-[#64748b] hover:text-[#0091ff]">Fonctionnalités</Link>
            <Link to="/pour-qui" onClick={() => setMobileOpen(false)} className="block text-lg text-[#64748b] hover:text-[#0091ff]">Pour qui ?</Link>
            <Link to="/tarifs" onClick={() => setMobileOpen(false)} className="block text-lg text-[#64748b] hover:text-[#0091ff]">Tarifs</Link>
            <a href="/blog" onClick={() => setMobileOpen(false)} className="block text-lg text-[#64748b] hover:text-[#0091ff]">Blog</a>

            <div className="mt-6">
              <Link to="/demoboard" onClick={() => setMobileOpen(false)} className="inline-block px-6 py-3 bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white rounded-lg font-semibold">Voir la démo</Link>
            </div>
          </nav>
        </div>
      )}
      {/* Floating quick-menu button (mobile) — visible even if header is covered */}
      {/* Floating quick-menu removed to avoid duplicate hamburger controls on pages */}
    </header>
  );
}
