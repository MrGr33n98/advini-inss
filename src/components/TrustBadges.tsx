import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Search, 
  UserCheck, 
  TrendingUp,
  Star
} from 'lucide-react';

const TrustBadges: React.FC = () => {
  const badgeItems = [
    {
      icon: <Award className="h-10 w-10 text-primary-500" />,
      title: "Experiência Comprovada",
      description: "Anos de atuação focada em direito previdenciário."
    },
    {
      icon: <Search className="h-10 w-10 text-primary-500" />,
      title: "Análise 100% Gratuita",
      description: "Sem letras miúdas ou surpresas."
    },
    {
      icon: <UserCheck className="h-10 w-10 text-primary-500" />,
      title: "Atendimento Humanizado",
      description: "Nossos especialistas falam a sua língua."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary-500" />,
      title: "Resultados Garantidos",
      description: "Lutamos pelo seu direito de restituição em dobro."
    },
    {
      icon: <Star className="h-10 w-10 text-primary-500" />,
      title: "Reputação Sólida",
      description: "Avaliação 4.8★ no Reclame Aqui e Google."
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container-custom">
        <h2 className="section-title text-secondary-700 mb-12">
          Sua Segurança e Confiança em Primeiro Lugar
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {badgeItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-card hover:shadow-card-hover transition-shadow"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center text-center">
                {item.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 text-secondary-700">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 bg-white p-6 rounded-lg shadow-card">
          <h3 className="text-xl font-semibold mb-6 text-center text-secondary-700">
            O Que Nossos Clientes Dizem
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard 
              name="Maria Aparecida, 68 anos"
              text="Recuperei mais de R$ 8.500 que haviam descontado do meu benefício sem minha autorização. O atendimento foi excelente e não precisei me preocupar com nada!"
              rating={5}
            />
            
            <TestimonialCard 
              name="José Carlos, 72 anos"
              text="Eu nem sabia que tinha tantos descontos indevidos. Graças à análise gratuita, descobri que tinha direito à restituição em dobro. Já recebi o valor e estou muito satisfeito."
              rating={5}
            />
            
            <TestimonialCard 
              name="Antônia Silva, 65 anos"
              text="Fiquei receosa no início, mas o atendimento foi muito atencioso. Explicaram tudo com paciência e conseguiram recuperar valores que eu nem sabia que tinha direito."
              rating={4}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, text, rating }) => {
  return (
    <div className="bg-gray-50 p-4 rounded border border-gray-100">
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-4">"{text}"</p>
      <p className="font-semibold text-secondary-700">{name}</p>
    </div>
  );
};

export default TrustBadges;