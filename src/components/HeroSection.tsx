import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Users, TrendingUp } from 'lucide-react';
import DiagnosisForm from './DiagnosisForm';

const MiniFormSchema = z.object({
  name: z.string().min(3, "Digite seu nome completo"),
  phone: z.string().min(10, "Digite seu WhatsApp")
});

type MiniFormData = z.infer<typeof MiniFormSchema>;

const HeroSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting }
  } = useForm<MiniFormData>({
    resolver: zodResolver(MiniFormSchema)
  });

  const onSubmit = async (data: MiniFormData) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would save this data to your database
    console.log('Form submitted:', data);
    
    // Reset form and show success state
    reset();
    setSubmitted(true);
    
    // Redirect to WhatsApp after short delay
    setTimeout(() => {
      window.open(
        `https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Meu+nome+é+${data.name}.+Gostaria+de+saber+mais+sobre+a+restituição+em+dobro+dos+valores+indevidos+no+meu+benefício.`,
        '_blank'
      );
    }, 1500);
  };

  return (
    <section className="relative bg-hero-pattern bg-cover bg-center py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              APOSENTADO(A): Recupere em DOBRO os Valores Descontados Ilegalmente do Seu Benefício!
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-6">
              Descubra seu direito à restituição em dobro com nossa análise gratuita e segura.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.div 
                className="flex items-center text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Users className="h-6 w-6 mr-2 text-primary-400" />
                <span className="text-lg">+5.000 Aposentados Atendidos</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TrendingUp className="h-6 w-6 mr-2 text-primary-400" />
                <span className="text-lg">+7  milhões foram lesados</span>
              </motion.div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+saber+mais+sobre+a+redução+de+dívidas+e+a+restituição+em+dobro+dos+valores+indevidos."
                className="btn-primary text-lg px-8 py-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                QUERO MINHA RESTITUIÇÃO AGORA!
              </a>
              
              <button 
                className="btn-secondary bg-white/90 text-lg px-8 py-4"
                onClick={() => setIsModalOpen(true)}
              >
                Fazer Diagnóstico Gratuito Online
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {!submitted ? (
              <>
                <h3 className="text-2xl font-bold text-secondary-700 mb-4">
                  Análise Gratuita e Rápida
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Preencha para descobrir se você tem direito à restituição em dobro:
                </p>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">
                      Seu Nome Completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Digite seu nome completo"
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                      {...register('name')}
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="form-error">{errors.name.message}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="phone" className="form-label">
                      Seu WhatsApp
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                      {...register('phone')}
                      disabled={isSubmitting}
                    />
                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full btn-primary text-lg py-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Iniciar Análise Gratuita'}
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Seus dados estão seguros e protegidos.
                  </p>
                </form>
              </>
            ) : (
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-secondary-700 mb-2">
                  Solicitação Enviada!
                </h3>
                
                <p className="text-gray-600 mb-4">
                  Estamos redirecionando você para o WhatsApp para continuar o atendimento.
                </p>
                
                <p className="text-primary-500 font-semibold">
                  Aguarde um momento...
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      {isModalOpen && (
        <DiagnosisForm onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
};

export default HeroSection;