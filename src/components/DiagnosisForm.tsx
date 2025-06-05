import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  phone: z.string().min(10, "Formato de telefone inválido"),
  cpf: z.string().optional(),
  benefitType: z.enum(['APOSENTADORIA', 'PENSAO', 'OUTRO'], {
    errorMap: () => ({ message: "Selecione o tipo de benefício" })
  }),
  problemType: z.enum(['EMPRESTIMO', 'DESCONTO', 'NAO_SEI', 'OUTRO'], {
    errorMap: () => ({ message: "Selecione o tipo de problema" })
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Você precisa concordar com os termos" })
  })
});

type FormData = z.infer<typeof formSchema>;

interface DiagnosisFormProps {
  onClose: () => void;
}

const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      benefitType: 'APOSENTADORIA',
      problemType: 'NAO_SEI',
      consent: false
    }
  });

  const onSubmit = async (data: FormData) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', data);
    
    // Show success state
    setIsSuccess(true);
  };

  const handleWhatsAppRedirect = () => {
    window.open(
      `https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+saber+mais+sobre+a+restituição+em+dobro+dos+valores+indevidos+no+meu+benefício.`,
      '_blank'
    );
    onClose();
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div 
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold text-secondary-700">
              {isSuccess ? 'Solicitação Enviada!' : 'Diagnóstico Gratuito'}
            </h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6">
            {!isSuccess ? (
              <>
                <p className="text-gray-600 mb-6">
                  Preencha e um especialista entrará em contato em breve. Seus dados 100% seguros.
                </p>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="modal-name" className="form-label">
                      Nome Completo
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      placeholder="Digite seu nome completo"
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                      {...register('name')}
                      disabled={isSubmitting}
                      autoComplete="name"
                    />
                    {errors.name && <p className="form-error">{errors.name.message}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="modal-phone" className="form-label">
                      WhatsApp
                    </label>
                    <input
                      id="modal-phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                      {...register('phone')}
                      disabled={isSubmitting}
                      autoComplete="tel"
                    />
                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="modal-cpf" className="form-label">
                      CPF (opcional)
                    </label>
                    <input
                      id="modal-cpf"
                      type="text"
                      placeholder="000.000.000-00 (apenas números)"
                      className="form-input"
                      {...register('cpf')}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="modal-benefit-type" className="form-label">
                        Tipo de Benefício
                      </label>
                      <select
                        id="modal-benefit-type"
                        className={`form-select ${errors.benefitType ? 'border-red-500' : ''}`}
                        {...register('benefitType')}
                        disabled={isSubmitting}
                      >
                        <option value="APOSENTADORIA">Aposentadoria</option>
                        <option value="PENSAO">Pensão por Morte</option>
                        <option value="OUTRO">Outro</option>
                      </select>
                      {errors.benefitType && <p className="form-error">{errors.benefitType.message}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="modal-problem-type" className="form-label">
                        Qual o problema?
                      </label>
                      <select
                        id="modal-problem-type"
                        className={`form-select ${errors.problemType ? 'border-red-500' : ''}`}
                        {...register('problemType')}
                        disabled={isSubmitting}
                      >
                        <option value="EMPRESTIMO">Empréstimo consignado não solicitado</option>
                        <option value="DESCONTO">Desconto de associação/sindicato indevido</option>
                        <option value="NAO_SEI">Não reconheço alguns descontos</option>
                        <option value="OUTRO">Outro</option>
                      </select>
                      {errors.problemType && <p className="form-error">{errors.problemType.message}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="form-checkbox mt-1"
                        {...register('consent')}
                        disabled={isSubmitting}
                      />
                      <span className="ml-2 text-gray-700">
                        Li e concordo em receber contato via WhatsApp para minha análise gratuita.{' '}
                        <a href="#" className="text-primary-500 hover:underline">
                          Política de Privacidade
                        </a>
                      </span>
                    </label>
                    {errors.consent && <p className="form-error">{errors.consent.message}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full btn-primary text-lg py-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      'ENVIAR MEU DIAGNÓSTICO E FALAR AGORA'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-secondary-700 mb-4">
                  Seu pedido foi enviado com sucesso!
                </h3>
                
                <p className="text-gray-600 mb-8 text-lg">
                  Para agilizar, clique no botão abaixo e fale AGORA com um de nossos especialistas no WhatsApp.
                </p>
                
                <button 
                  onClick={handleWhatsAppRedirect}
                  className="btn-whatsapp text-lg py-4 px-8"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
                  </svg>
                  Falar no WhatsApp Agora
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DiagnosisForm;