import { Link, useLocation } from 'react-router-dom';

export default function SidebarDemo() {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/demo', icon: '📊' },
    { name: 'Chat M.A.X.', path: '/demo', icon: '💬' },
    { name: 'CRM', path: '/demo', icon: '👥' },
    { name: 'Automatisations', path: '/demo', icon: '⚡' },
    { name: 'Rapports', path: '/demo', icon: '📈' },
    { name: 'Paramètres', path: '/demo', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <Link to="/" className="flex items-center">
          <img src="/docs/readme-assets/max-logo.png" alt="M.A.X." className="h-14" />
        </Link>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
