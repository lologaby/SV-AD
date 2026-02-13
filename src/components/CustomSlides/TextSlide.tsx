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
      className={`story-slide bg-gradient-to-br ${gradient} relative`}
    >
      {/* Efecto de corazones decorativos */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <span className="text-8xl animate-pulse-custom">💕</span>
      </div>
      
      {/* Contenido principal - centrado con flex */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative z-10">
        <div className="text-center animate-fade-in max-w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-lg leading-tight">
            {message}
          </h1>
          {subtitle && (
            <p className="text-lg sm:text-xl md:text-2xl font-body text-white/90 mt-4 drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Decoración inferior */}
      <div className="flex-shrink-0 pb-8 flex justify-center">
        <span className="text-3xl text-white/30">✨</span>
      </div>
    </div>
  );
};

export default React.memo(TextSlide);
