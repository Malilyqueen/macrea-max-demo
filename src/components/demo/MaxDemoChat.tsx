import { useState } from 'react';
import ScenarioSelector from './ScenarioSelector';
import { DemoMessage } from '../../demo/scenarios';

export default function MaxDemoChat() {
  const [messages] = useState<DemoMessage[]>([]);
  const [isPlaying] = useState(false);

  return (
    <div className="flex gap-6 h-full">
      {/* Sélecteur de scénarios */}
      <div className="w-80">
        <ScenarioSelector 
          onSelectScenario={() => {}}
          isPlaying={isPlaying}
        />
      </div>

      {/* Zone de chat */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <p className="text-lg mb-2">👋 Bienvenue dans la démo M.A.X.</p>
                <p>Sélectionnez un scénario pour commencer</p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-lg ${
                    msg.from === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modes Auto / Assisté / Conseil */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
              Auto
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
              Assisté
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
              Conseil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
