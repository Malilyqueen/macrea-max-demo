import SidebarDemo from '../layout/SidebarDemo';
import MaxDemoChat from './MaxDemoChat';

export default function MaxDemoLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarDemo />
      
      <div className="flex-1 flex flex-col">
        {/* Header Demo */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Chat M.A.X.</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                12 895 / 50 000 tokens
              </span>
            </div>
          </div>
        </header>

        {/* Zone principale */}
        <main className="flex-1 p-6">
          <MaxDemoChat />
        </main>
      </div>
    </div>
  );
}
