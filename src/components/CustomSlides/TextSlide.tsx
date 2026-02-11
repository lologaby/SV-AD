import React from 'react';

interface TextSlideProps {
  message: string;
  subtitle?: string;
  gradient?: string;
}

/**
 * Slide de texto con fondo gradiente romántico
 * Muestra un mensaje centrado con animación suave
 */
const TextSlide: React.FC<TextSlideProps> = ({ 
  message, 
  subtitle,
  gradient = 'from-valentine-pink via-valentine-red to-valentine-dark-red'
}) => {
  return (
    <div 
      className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${gradient} relative overflow-hidden`}
    >
      {/* Efecto de corazones decorativos */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <span className="text-9xl animate-pulse-custom">💕</span>
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 px-6 text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 drop-shadow-lg">
          {message}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl font-body text-white/90 mt-4 drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Decoración inferior */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30">
        <span className="text-4xl">✨</span>
      </div>
    </div>
  );
};

export default TextSlide;
