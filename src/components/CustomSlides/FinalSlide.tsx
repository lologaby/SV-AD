import React from 'react';

interface FinalSlideProps {
  message: string;
  emoji?: string;
  showShareButton?: boolean;
}

/**
 * Slide final con mensaje personalizado y opción de compartir
 */
const FinalSlide: React.FC<FinalSlideProps> = ({ 
  message, 
  emoji = '💖',
  showShareButton = true
}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'San Valentín ❤️',
          text: message,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error al compartir:', error);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(`${message}\n${window.location.href}`);
      alert('¡Mensaje copiado al portapapeles!');
    }
  };

  return (
    <div className="story-slide bg-gradient-to-br from-valentine-dark-red via-valentine-red to-valentine-pink relative">
      {/* Efecto de corazones animados - fondo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-[10rem] opacity-20 animate-pulse-custom">
          {emoji}
        </div>
      </div>
      
      {/* Contenido principal - centrado con flex */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative z-10">
        <div className="text-center animate-fade-in max-w-full">
          {/* Emoji grande */}
          <div className="text-6xl sm:text-7xl mb-6 animate-pulse-custom">
            {emoji}
          </div>
          
          {/* Mensaje */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-2xl leading-tight">
            {message}
          </h1>
          
          {/* Mensaje secundario */}
          <p className="text-lg sm:text-xl font-body text-white/90 mb-6 drop-shadow-lg">
            Feliz San Valentín
          </p>
          
          {/* Botón de compartir */}
          {showShareButton && (
            <button
              onClick={handleShare}
              className="bg-white/90 hover:bg-white text-valentine-red font-body font-semibold px-6 py-3 rounded-full shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="flex items-center gap-2">
                <span>Compartir</span>
                <span>📤</span>
              </span>
            </button>
          )}
          
          {/* Decoración */}
          <div className="mt-6 flex justify-center gap-3 text-white/60">
            <span className="text-2xl">💕</span>
            <span className="text-2xl">✨</span>
            <span className="text-2xl">💕</span>
          </div>
        </div>
      </div>
      
      {/* Instrucción para volver al inicio */}
      <div className="flex-shrink-0 pb-6 text-center text-white/70 text-sm font-body">
        Toca para volver al inicio
      </div>
    </div>
  );
};

export default React.memo(FinalSlide);
