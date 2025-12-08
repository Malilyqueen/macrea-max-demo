interface ScenarioProgressProps {
  currentStep: number;
  totalSteps: number;
  scenarioName: string;
}

export default function ScenarioProgress({ currentStep, totalSteps, scenarioName }: ScenarioProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h4 className="font-semibold text-gray-900 mb-2">{scenarioName}</h4>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-sm text-gray-600">
        Étape {currentStep} / {totalSteps}
      </p>
    </div>
  );
}
