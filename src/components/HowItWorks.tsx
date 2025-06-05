import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, Coins } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      icon: <MessageSquare className="h-12 w-12 text-white" />,
      title: "Contato Rápido",
      description: "Fale conosco ou preencha o formulário para uma análise inicial gratuita."
    },
    {
      number: 2,
      icon: <FileText className="h-12 w-12 text-white" />,
      title: "Análise e Documentação",
      description: "Identificamos os descontos indevidos e cuidamos da burocracia para você."
    },
    {
      number: 3,
      icon: <Coins className="h-12 w-12 text-white" />,
      title: "Receba em Dobro",
      description: "Acompanhe o processo e receba o valor corrigido da sua restituição."
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-secondary-700">
          Seu Caminho para a Restituição em 3 Passos Simples
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-secondary-500 flex items-center justify-center shadow-lg">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-xl">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-24 w-full h-0.5 bg-gray-200"></div>
                )}
              </div>
              
              <h3 className="text-2xl font-semibold mb-3 text-secondary-700">
                {step.title}
              </h3>
              
              <p className="text-gray-600 max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+saber+mais+sobre+a+redução+de+dívidas+e+a+restituição+em+dobro+dos+valores+indevidos."
            className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
            </svg>
            QUERO INICIAR MINHA RESTITUIÇÃO
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;