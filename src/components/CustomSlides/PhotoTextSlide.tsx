import React from 'react';

interface PhotoTextSlideProps {
  imageUrl: string;
  message: string;
  subtitle?: string;
  overlayOpacity?: number;
}

/**
 * Slide con imagen de fondo y texto overlay
 * La imagen tiene object-fit: cover para mantener proporción
 */
const PhotoTextSlide: React.FC<PhotoTextSlideProps> = ({ 
  imageUrl, 
  message,
  subtitle,
  overlayOpacity = 0.4
}) => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Imagen de fondo */}
      <img 
        src={imageUrl} 
        alt="Valentine"
        className="w-full h-full object-cover"
        style={{ objectFit: 'cover' }}
      />
      
      {/* Overlay oscuro para legibilidad del texto */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Contenido de texto */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 drop-shadow-2xl">
            {message}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl font-body text-white/95 mt-4 drop-shadow-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Decoración de corazones flotantes */}
      <div className="absolute top-20 left-10 text-white/30 text-3xl animate-pulse-custom">
        💖
      </div>
      <div className="absolute bottom-20 right-10 text-white/30 text-3xl animate-pulse-custom" style={{ animationDelay: '1s' }}>
        💕
      </div>
    </div>
  );
};

export default PhotoTextSlide;
