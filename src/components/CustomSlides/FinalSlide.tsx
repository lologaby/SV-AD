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
    <div className="w-full h-full bg-gradient-to-br from-valentine-dark-red via-valentine-red to-valentine-pink flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Efecto de corazones animados */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-[15rem] opacity-20 animate-pulse-custom">
          {emoji}
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 text-center animate-fade-in">
        {/* Emoji grande */}
        <div className="text-8xl md:text-9xl mb-8 animate-pulse-custom">
          {emoji}
        </div>
        
        {/* Mensaje */}
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-2xl leading-tight">
          {message}
        </h1>
        
        {/* Mensaje secundario */}
        <p className="text-xl md:text-2xl font-body text-white/90 mb-8 drop-shadow-lg">
          Feliz San Valentín
        </p>
        
        {/* Botón de compartir */}
        {showShareButton && (
          <button
            onClick={handleShare}
            className="bg-white/90 hover:bg-white text-valentine-red font-body font-semibold px-8 py-4 rounded-full shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              <span>Compartir</span>
              <span>📤</span>
            </span>
          </button>
        )}
        
        {/* Decoración inferior */}
        <div className="mt-12 flex justify-center gap-4 text-white/60">
          <span className="text-3xl">💕</span>
          <span className="text-3xl">✨</span>
          <span className="text-3xl">💕</span>
        </div>
      </div>
      
      {/* Instrucción para volver al inicio */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm font-body">
        Toca para volver al inicio
      </div>
    </div>
  );
};

export default React.memo(FinalSlide);
