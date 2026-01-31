import { useState } from 'react';
import SidebarDemo from '../layout/SidebarDemo';
import MaxDemoChat from './MaxDemoChat';
import FloatingEarlyBirdsCTA from './FloatingEarlyBirdsCTA';

export default function MaxDemoLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarDemo onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Demo */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Ouvrir le menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>

            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Chat M.A.X.</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                12 895 / 50 000 tokens
              </span>
            </div>
          </div>
        </header>

        {/* Zone principale */}
        <main className="flex-1 p-4 md:p-6">
          <MaxDemoChat />
        </main>
      </div>
      
      {/* Floating Early Birds CTA */}
      <FloatingEarlyBirdsCTA />
    </div>
  );
}
