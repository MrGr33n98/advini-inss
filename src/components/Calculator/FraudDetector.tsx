import React, { useEffect, useState } from 'react';

interface DeductionItem {
  id: string;
  name: string;
  amount: number;
}

interface FraudDetectorProps {
  onDetectionsComplete: (deductions: DeductionItem[]) => void;
}

const FraudDetector: React.FC<FraudDetectorProps> = ({ onDetectionsComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [detectedDeductions, setDetectedDeductions] = useState<DeductionItem[]>([]);

  // Sample suspicious entities for demonstration
  const suspiciousEntities = [
    { id: '1', name: 'Ambec', amount: 1500 },
    { id: '2', name: 'Sindnapi/FS', amount: 1200 },
    { id: '3', name: 'AAPB', amount: 800 },
    { id: '4', name: 'Aapen', amount: 900 },
    { id: '5', name: 'Contag', amount: 600 }
  ];

  // Simulate analysis process
  useEffect(() => {
    if (isAnalyzing) {
      const timer = setTimeout(() => {
        if (progress < 100) {
          setProgress(prev => prev + 10);
        } else {
          setIsAnalyzing(false);
          setDetectedDeductions(suspiciousEntities);
          onDetectionsComplete(suspiciousEntities);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, progress, onDetectionsComplete]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setDetectedDeductions([]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-md border">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Análise de Descontos Indevidos</h3>
        <p className="text-sm text-gray-600 mb-4">
          Faça upload de um extrato de pagamento para detectar possíveis descontos indevidos.
        </p>

        <div className="mt-4">
          {!isAnalyzing && progress === 0 && (
            <button
              onClick={startAnalysis}
              className="mt-2 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-sm transition-colors duration-200"
            >
              Iniciar Detecção Automatizada
            </button>
          )}

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">Analisando descontos... {progress}%</p>
            </div>
          )}

          {!isAnalyzing && progress === 100 && (
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="font-medium text-green-700">Análise concluída!</span>
              </div>
              
              <div className="mt-4 border rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h4 className="text-sm font-medium">Descontos potencialmente indevidos</h4>
                </div>
                <div className="divide-y">
                  {detectedDeductions.map(entity => (
                    <div key={entity.id} className="px-4 py-3 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{entity.name}</p>
                        <p className="text-xs text-gray-500">Entidade não autorizada</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-red-600">R$ {entity.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Seção do especialista com foto circular */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          {/* Foto do especialista em formato circular */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-300 shadow-md">
              <img 
                src="/img4.jpg" 
                alt="Especialista em restituição"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/150";
                  e.currentTarget.onerror = null;
                }}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Texto de ajuda personalizada */}
          <div className="flex-1">
            <h4 className="text-sm font-medium text-blue-800">Precisa de ajuda personalizada?</h4>
            <p className="text-xs text-blue-600 mt-1">
              Nossa equipe pode preparar documentos específicos para o seu caso e aumentar suas chances de sucesso.
            </p>
            <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5 px-3 rounded transition-colors duration-200">
              Falar com nosso especialista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudDetector;