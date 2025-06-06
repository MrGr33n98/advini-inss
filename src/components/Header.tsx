import React from 'react';
import { Phone, Clock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-3 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary-500">
              Restituição<span className="text-primary-500">EmDobro</span>
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-primary-500 mr-2" />
              <a 
                href="tel:+5565992918889" 
                className="text-lg hover:text-primary-500 transition-colors"
              >
                (65) 99291-8889
              </a>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-primary-500 mr-2" />
              <span className="text-lg">Seg-Sex: 8h às 18h</span>
            </div>
            
            <a 
              href="https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+saber+mais+sobre+a+redução+de+dívidas+e+a+restituição+em+dobro+dos+valores+indevidos."
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar Agora
            </a>
          </div>
        </div>
      </div>

      {/* Botão de calcular restituição */}
      <a 
        href="#calculadora" 
        className="fixed right-10 bottom-24 z-30 flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span>Calcular Restituição</span>
      </a>
    </header>
  );
};

export default Header;