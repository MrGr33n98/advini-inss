import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">
              Restituição<span className="text-primary-400">EmDobro</span>
            </h3>
            
            <p className="mb-6">
              Especialistas em recuperar valores descontados indevidamente em benefícios do INSS, com a restituição em dobro garantida por lei.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              
              <a 
                href="#" 
                className="text-white hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              
              <a 
                href="#" 
                className="text-white hover:text-primary-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Contato</h4>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary-400 mr-3 mt-1 flex-shrink-0" />
                <a 
                  href="tel:+5565992918889" 
                  className="hover:text-primary-400 transition-colors"
                >
                  (65) 99291-8889
                </a>
              </li>
              
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary-400 mr-3 mt-1 flex-shrink-0" />
                <a 
                  href="mailto:contato@restituicaoemdobro.com.br" 
                  className="hover:text-primary-400 transition-colors"
                >
                  contato@restituicaoemdobro.com.br
                </a>
              </li>
              
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-400 mr-3 mt-1 flex-shrink-0" />
                <address className="not-italic">
                  Av. Paulista, 1000, São Paulo - SP
                </address>
              </li>
              
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-primary-400 mr-3 mt-1 flex-shrink-0" />
                <p>Segunda a Sexta: 8h às 18h</p>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Links Rápidos</h4>
            
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Vídeos Explicativos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Nossos Especialistas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Informações Legais</h4>
            
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Aviso Legal
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <a 
                href="https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+saber+mais+sobre+a+redução+de+dívidas+e+a+restituição+em+dobro+dos+valores+indevidos."
                className="btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Restituição em Dobro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;