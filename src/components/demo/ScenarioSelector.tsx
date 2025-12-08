import { DemoScenarioKey } from '../../demo/scenarios';

interface ScenarioSelectorProps {
  onSelectScenario: (key: DemoScenarioKey) => void;
  isPlaying: boolean;
}

export default function ScenarioSelector({ onSelectScenario, isPlaying }: ScenarioSelectorProps) {
  const scenarios = [
    {
      key: 'csvCleaning' as DemoScenarioKey,
      title: 'Nettoyage CSV',
      description: 'Import et nettoyage de 20 000 lignes',
      icon: '📊',
    },
    {
      key: 'selfHealingFields' as DemoScenarioKey,
      title: 'Self-Healing',
      description: 'Réparation automatique des champs',
      icon: '💠',
    },
    {
      key: 'whatsappCampaign' as DemoScenarioKey,
      title: 'Campagne WhatsApp',
      description: 'Relance automatique des paniers abandonnés',
      icon: '📲',
    },
    {
      key: 'leadAnalysis' as DemoScenarioKey,
      title: 'Analyse de leads',
      description: 'Identification des leads prioritaires',
      icon: '🎯',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Scénarios de démo
      </h3>
      
      <div className="space-y-2">
        {scenarios.map((scenario) => (
          <button
            key={scenario.key}
            onClick={() => onSelectScenario(scenario.key)}
            disabled={isPlaying}
            className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{scenario.icon}</span>
              <div>
                <h4 className="font-semibold text-gray-900">{scenario.title}</h4>
                <p className="text-sm text-gray-600">{scenario.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
