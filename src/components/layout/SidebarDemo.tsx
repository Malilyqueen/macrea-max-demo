import { Link } from 'react-router-dom';

interface SidebarDemoProps {
  onClose?: () => void;
}

export default function SidebarDemo({ onClose }: SidebarDemoProps) {
  // const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/demo', icon: '📊' },
    { name: 'Chat M.A.X.', path: '/demo', icon: '💬' },
    { name: 'CRM', path: '/demo', icon: '👥' },
    { name: 'Automatisations', path: '/demo', icon: '⚡' },
    { name: 'Rapports', path: '/demo', icon: '📈' },
    { name: 'Paramètres', path: '/demo', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Close button mobile */}
      {onClose && (
        <button
          onClick={onClose}
          className="md:hidden self-end mb-4 p-2 rounded-lg hover:bg-gray-800 text-white"
          aria-label="Fermer le menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}

      <div className="mb-8">
        <Link to="/" className="flex items-center" onClick={onClose}>
          <img src="/docs/readme-assets/max-logo.png" alt="M.A.X." className="h-14" />
        </Link>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={onClose}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
