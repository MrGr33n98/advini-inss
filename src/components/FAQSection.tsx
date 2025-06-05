import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="border-b border-gray-200 last:border-none py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left py-2 focus:outline-none"
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-semibold text-secondary-700">
          {question}
        </h3>
        {isOpen ? (
          <ChevronUp className="h-6 w-6 text-primary-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-6 w-6 text-primary-500 flex-shrink-0" />
        )}
      </button>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="py-4">
          <p className="text-gray-700">{answer}</p>
        </div>
      </motion.div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const faqItems = [
    {
      question: "Quem tem direito à restituição em dobro?",
      answer: "Aposentados e pensionistas do INSS que tiveram descontos indevidos em seus benefícios têm direito à restituição em dobro. Isso inclui empréstimos consignados não autorizados, descontos de associações ou sindicatos sem consentimento, e outros valores cobrados sem justificativa legal."
    },
    {
      question: "Quanto tempo leva o processo para reaver o dinheiro?",
      answer: "O tempo para receber a restituição varia conforme a complexidade do caso. Geralmente, casos mais simples podem ser resolvidos em 3 a 6 meses. Processos que exigem ações judiciais podem levar de 1 a 2 anos. Nossa equipe trabalha para agilizar ao máximo cada etapa."
    },
    {
      question: "Preciso pagar algo adiantado para a análise do meu caso?",
      answer: "Não! Nossa análise inicial é 100% gratuita e sem compromisso. Só haverá cobrança de honorários quando você efetivamente receber sua restituição. Não cobramos nenhum valor adiantado para analisar seu caso ou iniciar o processo."
    },
    {
      question: "Como sei se realmente tenho descontos indevidos?",
      answer: "Você pode verificar no extrato de pagamento do seu benefício, disponível no aplicativo ou site Meu INSS, ou no extrato bancário onde recebe o benefício. Qualquer desconto que você não reconheça ou não tenha autorizado pode ser indevido. Nossa análise gratuita também ajuda a identificar esses descontos."
    },
    {
      question: "O que devo fazer após descobrir um desconto indevido?",
      answer: "Entre em contato conosco imediatamente através do WhatsApp ou formulário do site. Quanto antes iniciarmos o processo, mais rápido você poderá receber sua restituição. É importante não autorizar novos descontos e guardar extratos e comprovantes de pagamento."
    },
    {
      question: "Posso fazer o processo sozinho ou preciso de um advogado?",
      answer: "Embora seja possível tentar resolver administrativamente, a presença de um advogado especializado aumenta significativamente as chances de sucesso e agiliza o processo. Para a restituição em dobro, geralmente é necessária ação judicial, onde a representação por advogado é obrigatória."
    },
    {
      question: "Qual a diferença entre restituição simples e em dobro?",
      answer: "A restituição simples devolve exatamente o valor descontado indevidamente. Já a restituição em dobro, garantida pelo Código de Defesa do Consumidor, devolve o dobro do valor cobrado indevidamente, como forma de compensação pelo dano sofrido pelo consumidor."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-secondary-700">
          Perguntas Frequentes: Respostas Simples para Suas Dúvidas
        </h2>
        
        <div className="max-w-3xl mx-auto mt-12 bg-white rounded-lg shadow-card p-6 md:p-8">
          {faqItems.map((item, index) => (
            <FAQItem 
              key={index}
              question={item.question} 
              answer={item.answer} 
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-xl mb-6">
            Ainda tem dúvidas? Fale diretamente com nossos especialistas.
          </p>
          
          <a 
            href="https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Tenho+dúvidas+sobre+a+restituição+em+dobro+e+gostaria+de+mais+informações."
            className="btn-whatsapp text-lg px-8 py-4 inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
            </svg>
            Tire Suas Dúvidas no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;