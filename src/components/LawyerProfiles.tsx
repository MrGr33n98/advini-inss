import React from 'react';
import { motion } from 'framer-motion';

interface LawyerProfileProps {
  name: string;
  title: string;
  bio: string;
  image: string;
}

const LawyerProfile: React.FC<LawyerProfileProps> = ({ name, title, bio, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <img 
        src={image} 
        alt={`Dr. ${name}`}
        className="w-full h-64 object-cover"
      />
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-secondary-700">
          Dr. {name}
        </h3>
        
        <p className="text-primary-500 font-semibold mb-4">
          {title}
        </p>
        
        <p className="text-gray-600">
          {bio}
        </p>
      </div>
    </div>
  );
};

const LawyerProfiles: React.FC = () => {
  const lawyers = [
    {
      name: "Carlos Mendes",
      title: "Especialista em Direito Previdenciário",
      bio: "Advogado com mais de 15 anos de experiência em direito previdenciário, especializado em restituição de valores indevidos para aposentados. Já recuperou mais de R$ 5 milhões para seus clientes.",
      image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg"
    },
    {
      name: "Ana Paula Silva",
      title: "Especialista em Direito do Consumidor",
      bio: "Formada com honras pela USP, com pós-graduação em Direito do Consumidor. Atua há 10 anos defendendo os direitos de aposentados, com especialização em restituição em dobro de valores.",
      image: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg"
    },
    {
      name: "Roberto Almeida",
      title: "Especialista em Conciliação",
      bio: "Advogado com formação em mediação e conciliação, especializado em resolver casos de forma rápida e eficiente. Atendimento humanizado, com foco na explicação clara de todas as etapas do processo.",
      image: "https://images.pexels.com/photos/8117689/pexels-photo-8117689.jpeg"
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
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-secondary-700">
          Sua Equipe de Especialistas: Confiabilidade e Experiência
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {lawyers.map((lawyer, index) => (
            <motion.div key={index} variants={itemVariants}>
              <LawyerProfile {...lawyer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LawyerProfiles;