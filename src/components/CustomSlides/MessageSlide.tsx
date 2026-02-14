import React from 'react';

interface MessageSlideProps {
  message: string;
  signature?: string;
}

/**
 * Slide con un mensaje romántico centrado con estilo elegante
 */
const MessageSlide: React.FC<MessageSlideProps> = ({ message, signature }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-rose-950 via-black to-black flex flex-col items-center justify-center px-8">
      {/* Corazón sutil arriba */}
      <div className="text-rose-500/30 text-6xl mb-8 animate-pulse">
        ♥
      </div>
      
      {/* Mensaje principal */}
      <p className="text-white text-2xl sm:text-3xl font-serif text-center leading-relaxed max-w-sm">
        "{message}"
      </p>
      
      {/* Firma opcional */}
      {signature && (
        <p className="text-rose-400 text-lg mt-8 font-light italic">
          — {signature}
        </p>
      )}
      
      {/* Corazón sutil abajo */}
      <div className="text-rose-500/30 text-4xl mt-8">
        ♥
      </div>
    </div>
  );
};

export default MessageSlide;
