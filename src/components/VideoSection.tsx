import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoItemProps {
  title: string;
  thumbnail: string;
  description: string;
}

const VideoItem: React.FC<VideoItemProps> = ({ title, thumbnail, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      {!isPlaying ? (
        <div 
          className="relative cursor-pointer group"
          onClick={() => setIsPlaying(true)}
        >
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all">
            <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
              <Play className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
          <p className="text-white">Vídeo seria carregado aqui.</p>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-secondary-700">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

const VideoSection: React.FC = () => {
  const videos = [
    {
      title: "Como identificar descontos indevidos no seu benefício?",
      thumbnail: "https://images.pexels.com/photos/7551592/pexels-photo-7551592.jpeg",
      description: "Neste vídeo, explicamos como verificar seu extrato de pagamento do INSS e identificar descontos que podem estar sendo aplicados sem sua autorização."
    },
    {
      title: "A restituição em dobro: O que a lei diz?",
      thumbnail: "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg",
      description: "Entenda seus direitos conforme o Código de Defesa do Consumidor e como a lei garante a devolução em dobro de valores cobrados indevidamente."
    },
    {
      title: "Nosso processo: Como funciona o atendimento?",
      thumbnail: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg",
      description: "Conheça cada etapa do nosso processo, desde o primeiro contato até o recebimento da sua restituição, com atendimento personalizado e humanizado."
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
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-secondary-700">
          Tire Suas Dúvidas: Vídeos Curtos e Descomplicados
        </h2>
        
        <p className="section-subtitle">
          Assista e entenda seus direitos sobre descontos indevidos e restituição.
        </p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {videos.map((video, index) => (
            <motion.div key={index} variants={itemVariants}>
              <VideoItem 
                title={video.title} 
                thumbnail={video.thumbnail} 
                description={video.description} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;