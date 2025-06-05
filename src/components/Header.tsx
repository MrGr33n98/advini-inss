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
    </header>
  );
};

export default Header;