import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Calculator, HelpCircle, Download, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { pdfjs } from 'react-pdf';
import FraudDetector from './FraudDetector';

// ---------- Funções Utilitárias ----------
export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR').format(date);
};

export const formatCurrency = (num: number): string => {
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// ---------- Interfaces ----------
export interface FullFormData {
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  benefitType: string;
  benefitNumber: string;
  parcels: { id: string; date: string; value: string }[];
  correctionIndex: string;
  interest: string;
  doubleRestitution: boolean;
  calculatedValue: number;
}

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
}

interface DeductionItem {
  id: string;
  name: string;
  amount: number;
}

// ---------- Componentes Auxiliares ----------
const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </div>
      {show && (
        <div className="absolute z-10 w-64 px-3 py-2 text-xs bg-gray-800 text-white rounded shadow-lg -right-2 top-6">
          {content}
        </div>
      )}
    </div>
  );
};

// Configuração do worker do PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FutureValueSimulator: React.FC<{ initialValue: number }> = ({ initialValue }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [interestRate, setInterestRate] = useState(1);
  const [timeframe, setTimeframe] = useState(24);
  const [simulationType, setSimulationType] = useState<'judicial'|'administrative'>('judicial');

  const projections = useMemo(() => {
    const results = [];
    let currentValue = initialValue;
    if (simulationType === 'judicial') {
      currentValue *= 1.2;
    }
    for (let month = 6; month <= timeframe; month += 6) {
      const monthlyRate = interestRate / 100;
      currentValue *= Math.pow(1 + monthlyRate, 6);
      results.push({ month, value: currentValue });
    }
    return results;
  }, [initialValue, interestRate, timeframe, simulationType]);
  
  return (
    <div className="border rounded-lg overflow-hidden transition-all duration-300 mt-6">
      <div 
        className="bg-gray-50 p-3 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Calculator className="text-primary-600 w-5 h-5" />
          <h3 className="font-medium text-gray-700">Simulador de Valor Futuro</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            Simule quanto seu processo de restituição pode valer ao longo do tempo, considerando juros e tipo de processo.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="interestRate">
                Taxa de juros mensal (%)
              </label>
              <input
                type="range"
                id="interestRate"
                min="0.1"
                max="3"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>0,1%</span>
                <span>{interestRate.toFixed(1)}%</span>
                <span>3,0%</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="timeframe">
                Prazo (meses)
              </label>
              <input
                type="range"
                id="timeframe"
                min="6"
                max="60"
                step="6"
                value={timeframe}
                onChange={(e) => setTimeframe(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>6 meses</span>
                <span>{timeframe} meses</span>
                <span>60 meses</span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de processo
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                className={`p-2 text-sm rounded-md border ${
                  simulationType === 'judicial' 
                    ? 'bg-primary-50 border-primary-300 text-primary-700' 
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
                onClick={() => setSimulationType('judicial')}
              >
                Judicial
              </button>
              <button 
                className={`p-2 text-sm rounded-md border ${
                  simulationType === 'administrative' 
                    ? 'bg-primary-50 border-primary-300 text-primary-700' 
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
                onClick={() => setSimulationType('administrative')}
              >
                Administrativo
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Projeção de valores</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Período</th>
                    <th className="py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Valor estimado</th>
                    <th className="py-2 text-right text-xs font-medium text-gray-500 tracking-wider">Aumento</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 text-sm text-gray-700">Inicial</td>
                    <td className="py-2 text-sm text-right font-medium text-gray-900">
                      {formatCurrency(initialValue)}
                    </td>
                    <td className="py-2 text-sm text-right text-gray-500">-</td>
                  </tr>
                  {projections.map((item, index) => {
                    const previousValue = index === 0 ? initialValue : projections[index-1].value;
                    const increase = ((item.value / previousValue) - 1) * 100;
                    
                    return (
                      <tr key={`month-${item.month}`} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="py-2 text-sm text-gray-700">{item.month} meses</td>
                        <td className="py-2 text-sm text-right font-medium text-primary-700">
                          {formatCurrency(item.value)}
                        </td>
                        <td className="py-2 text-sm text-right text-green-600">
                          +{increase.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2 italic">
              Esta simulação é meramente ilustrativa e não constitui promessa de resultado.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const DocumentsHelper: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const documents = [
    {
      id: 'petition-sample',
      title: 'Modelo de Petição Inicial',
      description: 'Petição base para processo de restituição de valores descontados indevidamente.',
      type: 'doc',
      size: '32 KB'
    },
    {
      id: 'power-attorney',
      title: 'Procuração',
      description: 'Modelo de procuração para representação do beneficiário no processo.',
      type: 'doc',
      size: '18 KB'
    },
    {
      id: 'law-references',
      title: 'Referências Legais',
      description: 'Compilação das leis e jurisprudência sobre descontos indevidos no INSS.',
      type: 'pdf',
      size: '156 KB' 
    },
    {
      id: 'checklist',
      title: 'Checklist de Documentos',
      description: 'Lista de documentos necessários para ingressar com o processo.',
      type: 'pdf',
      size: '42 KB'
    },
  ];
  
  return (
    <div className="border rounded-lg overflow-hidden transition-all duration-300 mt-6">
      <div 
        className="bg-gray-50 p-3 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <FileText className="text-primary-600 w-5 h-5" />
          <h3 className="font-medium text-gray-700">Documentos e Modelos</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>
      {isExpanded && (
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            Documentos úteis para dar seguimento ao seu processo de restituição de valores.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map(doc => (
              <div 
                key={doc.id}
                className="border rounded-lg p-3 hover:border-primary-300 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium text-gray-800">{doc.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    doc.type === 'pdf' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {doc.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 mb-3">{doc.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{doc.size}</span>
                  <button className="text-primary-600 hover:text-primary-800 text-sm flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Baixar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-700">Precisa de ajuda personalizada?</h4>
            <p className="text-xs text-blue-600 mt-1">
              Nossa equipe pode preparar documentos específicos para o seu caso e aumentar suas chances de sucesso.
            </p>
            <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5 px-3 rounded transition-colors duration-200">
              Falar com um Especialista
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------- Componente Principal ----------
const CalculatorForm: React.FC = () => {
  // Estados de exibição
  const [showCalculator, setShowCalculator] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showFraudDetector, setShowFraudDetector] = useState(false);
  
  // Controle de passos e loading
  const [currentStep, setCurrentStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Estados para erros, formulários e fraudes
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [detectedDeductions, setDetectedDeductions] = useState<DeductionItem[]>([]);
  
  // Refs para acessibilidade
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estados específicos de step
  const [newDate, setNewDate] = useState('');
  const [newValue, setNewValue] = useState('');
  const [parcelError, setParcelError] = useState('');
  
  // Estado central do formulário
  const initialFormData: FullFormData = {
    leadName: '',
    leadEmail: '',
    leadPhone: '',
    benefitType: '',
    benefitNumber: '',
    parcels: [],
    correctionIndex: '',
    interest: '',
    doubleRestitution: false,
    calculatedValue: 2735.48
  };
  const [formData, setFormData] = useState<FullFormData>(initialFormData);
  
  // Lista de entidades suspeitas (exemplo)
  const suspiciousEntities = [
    { name: "Ambec", amount: 1500 },
    { name: "Sindnapi/FS", amount: 1200 },
    { name: "AAPB", amount: 800 },
    { name: "Aapen", amount: 900 },
    { name: "Contag", amount: 600 }
  ];

  // Capturar teclas para fechar modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showLeadModal) closeLeadModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showLeadModal]);

  // Focar no primeiro input quando o modal abre
  useEffect(() => {
    if (showLeadModal && modalRef.current) {
      const firstInput = modalRef.current.querySelector('input');
      firstInput && (firstInput as HTMLInputElement).focus();
    }
  }, [showLeadModal]);

  // Atualização do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Adicionar parcela
  const addParcel = () => {
    if (!newDate || !newValue) {
      setParcelError('Preencha a data e o valor da parcela');
      return;
    }
    const selectedDate = new Date(newDate);
    if (isNaN(selectedDate.getTime())) {
      setParcelError('Data inválida');
      return;
    }
    if (selectedDate > new Date()) {
      setParcelError('A data não pode ser futura');
      return;
    }
    const valueNumber = parseFloat(newValue.replace(',', '.'));
    if (isNaN(valueNumber) || valueNumber <= 0) {
      setParcelError('Valor inválido. Insira um número positivo');
      return;
    }
    const updatedParcels = [
      ...formData.parcels,
      { id: String(Date.now()), date: newDate, value: newValue }
    ];
    setFormData(prev => ({ ...prev, parcels: updatedParcels }));
    setNewDate('');
    setNewValue('');
    setParcelError('');
  };

  const removeParcel = (id: string) => {
    setFormData(prev => ({ ...prev, parcels: prev.parcels.filter(p => p.id !== id) }));
  };

  // Abertura e fechamento do modal
  const openLeadModal = () => setShowLeadModal(true);
  const closeLeadModal = () => {
    setShowLeadModal(false);
    buttonRef.current?.focus();
  };

  // Validações por etapa
  const validateStep1 = (): boolean => {
    const stepErrors: Record<string, string> = {};
    if (!formData.leadName) stepErrors.leadName = 'Nome é obrigatório';
    if (!formData.leadPhone) stepErrors.leadPhone = 'Telefone é obrigatório';
    if (!formData.benefitType) stepErrors.benefitType = 'Tipo de benefício é obrigatório';
    if (!formData.benefitNumber) stepErrors.benefitNumber = 'Número do benefício é obrigatório';
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    if (formData.parcels.length === 0) {
      setErrors({ parcels: 'Adicione pelo menos uma parcela' });
      return false;
    }
    return true;
  };

  const validateStep3 = (): boolean => {
    if (!formData.correctionIndex) {
      setErrors({ correctionIndex: 'Selecione um índice de correção' });
      return false;
    }
    return true;
  };

  const submitLeadForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.leadName) newErrors.leadName = 'Nome é obrigatório';
    if (!formData.leadEmail) newErrors.leadEmail = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.leadEmail)) newErrors.leadEmail = 'Email inválido';
    if (!formData.leadPhone) newErrors.leadPhone = 'Telefone é obrigatório';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log("Dados do lead coletados:", { nome: formData.leadName, email: formData.leadEmail, telefone: formData.leadPhone });
    setShowLeadModal(false);
    setShowCalculator(true);
  };

  const nextStep = () => {
    let valid = false;
    if (currentStep === 1) valid = validateStep1();
    else if (currentStep === 2) valid = validateStep2();
    else if (currentStep === 3) valid = validateStep3();
    if (valid) setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const calculateResult = () => {
    if (!validateStep3()) return;
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setCurrentStep(4);
    }, 1000);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  // Cálculo do valor estimado baseado nas parcelas, índice e juros
  const getInterestRate = (): number => {
    const rate = parseFloat(formData.interest.replace(',', '.'));
    return isNaN(rate) ? 0 : rate;
  };

  const totalValue = formData.parcels.reduce((acc, parcel) => acc + parseFloat(parcel.value.replace(',', '.')), 0);

  const calculateEstimate = (): number => {
    if (!formData.correctionIndex || formData.parcels.length === 0) return 0;
    const totalParcels = totalValue;
    const indexRate = formData.correctionIndex === 'ipca' ? 4.40 / 100 : 3.80 / 100;
    const interestRate = getInterestRate() / 100;
    let estimate = totalParcels * (1 + indexRate);
    estimate *= (1 + interestRate);
    if (formData.doubleRestitution) estimate *= 2;
    return estimate;
  };

  const estimatedValue = calculateEstimate();

  const canGoToStep2 = formData.leadName && formData.leadPhone && formData.benefitType && formData.benefitNumber;
  const canGoToStep3 = formData.parcels.length > 0;
  const canCalculate = formData.correctionIndex !== '';

  // Handler para atualizações do detector de fraudes (se necessário)
  const handleDetectionsComplete = (deductions: DeductionItem[]) => {
    setDetectedDeductions(deductions);
  };

  // Se não estiver mostrando a calculadora, exibir somente o botão de abertura do modal
  if (!showCalculator) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg shadow-md flex items-center gap-3 h-14 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          onClick={openLeadModal}
          aria-label="Abrir calculadora de restituição"
        >
          <Calculator className="w-6 h-6" />
          <span>CALCULAR SUA RESTITUIÇÃO</span>
        </motion.button>
        
        <p className="mt-4 text-gray-600 text-center max-w-sm">
          Descubra quanto você pode recuperar dos valores descontados indevidamente
        </p>

        {/* Modal de coleta de leads com acessibilidade aprimorada */}
        <AnimatePresence>
          {showLeadModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={closeLeadModal}
            >
              <motion.div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalTitle"
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative"
                onClick={e => e.stopPropagation()}
                tabIndex={-1}
              >
                <button 
                  onClick={closeLeadModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1"
                  aria-label="Fechar modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 id="modalTitle" className="text-xl font-bold text-secondary-800 mb-2">
                  Calcule sua restituição
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Preencha seus dados para descobrir quanto você pode recuperar
                </p>

                <form onSubmit={submitLeadForm} className="space-y-4">
                  <div>
                    <label htmlFor="leadName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="leadName"
                      name="leadName"
                      value={formData.leadName}
                      onChange={handleChange}
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.leadName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.leadName && <p className="text-red-500 text-xs mt-1">{errors.leadName}</p>}
                  </div>

                  <div>
                    <label htmlFor="leadEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="leadEmail"
                      name="leadEmail"
                      value={formData.leadEmail}
                      onChange={handleChange}
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.leadEmail ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.leadEmail && <p className="text-red-500 text-xs mt-1">{errors.leadEmail}</p>}
                  </div>

                  <div>
                    <label htmlFor="leadPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone/WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="leadPhone"
                      name="leadPhone"
                      value={formData.leadPhone}
                      onChange={handleChange}
                      className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.leadPhone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="(00) 00000-0000"
                      required
                    />
                    {errors.leadPhone && <p className="text-red-500 text-xs mt-1">{errors.leadPhone}</p>}
                  </div>

                  <div className="flex items-start mt-4">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      name="acceptTerms"
                      className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-600">
                      Concordo em receber comunicações sobre meus direitos e valores a receber
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-md shadow-sm transition-colors duration-300 h-12 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    ACESSAR CALCULADORA
                  </button>
                </form>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Seus dados estão seguros e não serão compartilhados com terceiros.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Se o detector de fraudes estiver ativo
  if (showFraudDetector) {
    return (
      <div className="bg-white rounded-lg shadow-md p-5 max-w-2xl mx-auto">
        <div className="mb-5 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-secondary-800">Detector de Fraudes</h2>
          <button 
            onClick={() => setShowFraudDetector(false)}
            className="text-sm text-primary-600 hover:text-primary-800 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar à Calculadora
          </button>
        </div>
        
        <FraudDetector onDetectionsComplete={handleDetectionsComplete} />
      </div>
    );
  }

  // Resto da calculadora
  return (
    <div className="bg-white rounded-lg shadow-md p-5 max-w-2xl mx-auto" id="calculadora">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-secondary-800">Calculadora de Restituição</h2>
        <p className="text-sm text-gray-600">
          Olá {formData.leadName}, descubra quanto você pode recuperar dos descontos indevidos.
        </p>
      </div>
      {/* Stepper */}
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4].map((step, idx, arr) => (
          <React.Fragment key={step}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'} transition-colors duration-200`}>
              {step}
            </div>
            {idx < arr.length - 1 && (
              <div className={`flex-1 h-1 ${currentStep > step ? 'bg-primary-500' : 'bg-gray-200'} transition-colors duration-200`} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center mb-6">
        {[1, 2, 3, 4].map(step => (
          <div key={step} className="flex-1 text-center">
            <span className={`text-xs block ${currentStep === step ? 'text-primary-600 font-medium' : 'text-gray-500'} transition-colors duration-200`}>
              {step === 1 && "Dados"}
              {step === 2 && "Parcelas"}
              {step === 3 && "Reajuste"}
              {step === 4 && "Resultado"}
            </span>
          </div>
        ))}
      </div>
      <motion.div className="py-4" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} key={currentStep} transition={{ duration: 0.3 }}>
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="leadName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="leadName"
                  name="leadName"
                  value={formData.leadName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.leadName ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.leadName && <p className="text-red-500 text-xs mt-1">{errors.leadName}</p>}
              </div>

              <div>
                <label htmlFor="leadPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="leadPhone"
                  name="leadPhone"
                  value={formData.leadPhone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.leadPhone ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.leadPhone && <p className="text-red-500 text-xs mt-1">{errors.leadPhone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="benefitType" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de benefício <span className="text-red-500">*</span>
              </label>
              <select
                id="benefitType"
                name="benefitType"
                value={formData.benefitType}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.benefitType ? 'border-red-500' : 'border-gray-300'}`}
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="aposentadoria">Aposentadoria</option>
                <option value="pensao">Pensão</option>
                <option value="auxilio">Auxílio-doença</option>
                <option value="bpc">BPC/LOAS</option>
                <option value="outros">Outros benefícios</option>
              </select>
              {errors.benefitType && <p className="text-red-500 text-xs mt-1">{errors.benefitType}</p>}
            </div>

            <div>
              <label htmlFor="benefitNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Nº do benefício <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="benefitNumber"
                name="benefitNumber"
                value={formData.benefitNumber}
                onChange={handleChange}
                placeholder="000.000.000-0"
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.benefitNumber ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.benefitNumber && <p className="text-red-500 text-xs mt-1">{errors.benefitNumber}</p>}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="border rounded-md">
              <div className="overflow-x-auto px-2">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-3 text-left">Data</th>
                      <th className="py-2 px-3 text-left">Valor (R$)</th>
                      <th className="py-2 px-3 text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.parcels.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-4 text-center text-gray-500">
                          Nenhuma parcela adicionada
                        </td>
                      </tr>
                    ) : (
                      formData.parcels.map(parcel => (
                        <tr key={parcel.id} className="border-b">
                          <td className="py-2 px-3">{formatDate(parcel.date)}</td>
                          <td className="py-2 px-3">R$ {parcel.value}</td>
                          <td className="py-2 px-3 flex gap-2">
                            <button 
                              className="text-primary-600 hover:text-primary-800 text-sm" 
                              onClick={() => removeParcel(parcel.id)}
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                    {formData.parcels.length > 0 && (
                      <tr className="font-medium bg-gray-50">
                        <td className="py-2 px-3">Total de {formData.parcels.length} parcelas</td>
                        <td className="py-2 px-3">R$ {totalValue.toFixed(2).replace('.', ',')}</td>
                        <td className="py-2 px-3"></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="p-3 border-t">
                <h3 className="text-sm font-medium mb-2">Nova parcela</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <input 
                      type="date" 
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-2 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Valor (ex: 120,00)" 
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="w-full px-2 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                </div>
                {parcelError && <p className="text-red-500 text-xs mt-1">{parcelError}</p>}
                <div className="text-right">
                  <button 
                    className="mt-2 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded text-sm h-10 transition-colors duration-200"
                    onClick={addParcel}
                  >
                    Adicionar Parcela
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center mb-1">
                  <label htmlFor="correctionIndex" className="text-sm font-medium text-gray-700">
                    Índice de correção <span className="text-red-500">*</span>
                  </label>
                  <Tooltip content={`IPCA: Corrige valores pela inflação oficial.
IGPM: Usado em contratos financeiros e de aluguel.`}>
                    <HelpCircle className="w-4 h-4 ml-1 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </Tooltip>
                </div>
                <select
                  id="correctionIndex"
                  name="correctionIndex"
                  value={formData.correctionIndex}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.correctionIndex ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="">Selecione o índice</option>
                  <option value="ipca">IPCA (4,40% a.a.)</option>
                  <option value="igpm">IGPM (3,80% a.a.)</option>
                </select>
                {errors.correctionIndex && <p className="text-red-500 text-xs mt-1">{errors.correctionIndex}</p>}
              </div>
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                  Juros (%)
                </label>
                <input
                  type="text"
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  placeholder="Ex: 1,5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="doubleRestitution"
                  checked={formData.doubleRestitution}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Calcular restituição em dobro
                </span>
              </label>
              <p className="mt-1 text-xs text-gray-500 ml-6">
                O cálculo considerará multa em dobro conforme legislação vigente.
              </p>
            </div>
            {formData.correctionIndex && formData.parcels.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 border rounded">
                <h4 className="text-sm font-medium text-gray-700">Pré-visualização do reajuste</h4>
                <p className="text-xs text-gray-600 mt-1">
                  {formData.correctionIndex === 'ipca' ? 'IPCA (4,40%)' : 'IGPM (3,80%)'}
                  {getInterestRate() > 0 && ` + Juros de ${formData.interest}%`}
                  {formData.doubleRestitution && ' + Restituição em dobro'}
                </p>
                <p className="text-sm font-medium text-primary-700 mt-2">
                  Estimativa: {formatCurrency(estimatedValue)}
                </p>
              </div>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded">
              <p className="text-sm text-primary-700 font-medium">Valor total calculado</p>
              <p className="text-2xl font-bold text-primary-700 mt-1">
                {formatCurrency(formData.calculatedValue)}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition-colors duration-200 text-center">
                <h3 className="font-medium text-secondary-700 mb-3 text-sm">
                  Relatório descritivo
                </h3>
                <button className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 px-4 rounded-md text-sm h-10 shadow-sm transition-colors duration-200">
                  <Download className="w-4 h-4" />
                  Baixar relatório PDF
                </button>
              </div>
              <div className="group bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition-colors duration-200 text-center">
                <h3 className="font-medium text-secondary-700 mb-3 text-sm">
                  Documentação
                </h3>
                <button className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 px-4 rounded-md text-sm h-10 shadow-sm transition-colors duration-200">
                  <FileText className="w-4 h-4" />
                  Ver modelos de petição
                </button>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={resetForm}
                className="mt-4 text-primary-600 hover:text-primary-800 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md px-2"
              >
                Fazer novo cálculo
              </button>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg max-w-sm mx-auto">
                <p className="text-sm text-gray-700">
                  Precisa de ajuda com sua restituição?
                </p>
                <a
                  href="#contato"
                  className="mt-2 inline-block bg-secondary-600 hover:bg-secondary-700 text-white text-sm py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Agendar consulta com especialista
                </a>
              </div>
            </div>
          </div>
        )}
      </motion.div>
      {currentStep !== 4 && (
        <div className="flex justify-between mt-6 pt-4 border-t">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          ) : (
            <div></div>
          )}
          {currentStep < 4 && (
            currentStep === 3 ? (
              <button
                type="button"
                onClick={calculateResult}
                disabled={!canCalculate || isCalculating}
                className={`flex items-center justify-center gap-2 bg-primary-600 text-white py-2 px-6 rounded h-10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  (!canCalculate || isCalculating) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-700'
                }`}
              >
                {isCalculating ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Calculando...</span>
                  </>
                ) : (
                  <span>Calcular</span>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                disabled={currentStep === 1 ? !canGoToStep2 : (currentStep === 2 ? !canGoToStep3 : false)}
                className={`flex items-center gap-2 bg-primary-600 text-white py-2 px-6 rounded h-10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  (currentStep === 1 && !canGoToStep2) || (currentStep === 2 && !canGoToStep3)
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-primary-700'
                }`}
              >
                <span>Próximo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      )}
      <FutureValueSimulator initialValue={formData.calculatedValue} />
      <DocumentsHelper />
    </div>
  );
};

export default CalculatorForm;
