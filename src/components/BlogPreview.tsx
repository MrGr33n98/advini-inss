import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BlogPostProps {
  title: string;
  date: string;
  summary: string;
  image: string;
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, date, summary, image, slug }) => {
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        
        <h3 className="text-xl font-semibold mb-3 text-secondary-700">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {summary}
        </p>
        
        <a 
          href={`/blog/${slug}`}
          className="inline-flex items-center text-primary-500 font-semibold hover:text-primary-600"
        >
          Ler artigo completo
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

const BlogPreview: React.FC = () => {
  const blogPosts = [
    {
      title: "Como Identificar Descontos Indevidos na Sua Aposentadoria do INSS",
      date: "01 de Junho, 2025",
      summary: "Aprenda a analisar seu extrato de pagamento e identificar descontos que podem estar sendo feitos sem sua autorização.",
      image: "https://images.pexels.com/photos/7821879/pexels-photo-7821879.jpeg",
      slug: "descontos-indevidos-inss"
    },
    {
      title: "Você Sabe o Que é a Restituição em Dobro e Quem Tem Direito?",
      date: "20 de Maio, 2025",
      summary: "Entenda como funciona a restituição em dobro garantida pelo Código de Defesa do Consumidor e quais aposentados têm direito.",
      image: "https://images.pexels.com/photos/6256083/pexels-photo-6256083.jpeg",
      slug: "direito-restituicao-dobro"
    },
    {
      title: "Guia Completo: Como Aposentados Podem Evitar Fraudes em Empréstimos Consignados",
      date: "10 de Maio, 2025",
      summary: "Dicas práticas para se proteger de golpes e fraudes relacionados a empréstimos consignados não autorizados.",
      image: "https://images.pexels.com/photos/6863251/pexels-photo-6863251.jpeg",
      slug: "evitar-fraudes-consignado"
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
          Mantenha-se Informado: Artigos Exclusivos para Aposentados
        </h2>
        
        <p className="section-subtitle">
          Conteúdo atualizado sobre direitos, fraudes e benefícios do INSS.
        </p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogPosts.map((post, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BlogPost {...post} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <a 
            href="/blog"
            className="btn-secondary text-lg px-8 py-3 inline-flex items-center"
          >
            Ver Todos os Artigos
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;