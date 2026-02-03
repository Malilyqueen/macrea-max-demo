import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-[rgba(255,255,255,0.9)] backdrop-blur-[20px] shadow-sm border-b border-[rgba(0,145,255,0.15)]">
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
            <a href="http://localhost:4321/blog" className="text-[#64748b] hover:text-[#0091ff] hover:shadow-[0_0_15px_rgba(0,207,255,0.1)] transition-all" target="_blank" rel="noopener noreferrer">
              Blog
            </a>
          </div>

          <Link 
            to="/demoboard" 
            className="bg-gradient-to-r from-[#0091ff] to-[#00cfff] text-white px-6 py-2 rounded-lg hover:shadow-[0_0_25px_rgba(0,207,255,0.5)] transition-all font-semibold"
          >
            Voir la démo
          </Link>
        </div>
      </nav>
    </header>
  );
}
