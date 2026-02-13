import React from 'react';

export interface CaptionStickerProps {
  text: string;
  position?: 'top' | 'middle' | 'bottom';
  variant?: 'classic' | 'typewriter' | 'neon' | 'handwritten';
}

/**
 * Sticker de caption/texto estilo Instagram Stories
 * Para agregar mensajes sobre las fotos
 */
const CaptionSticker: React.FC<CaptionStickerProps> = ({
  text,
  position = 'middle',
  variant = 'classic',
}) => {
  const positionClasses = {
    top: 'top-16',
    middle: 'top-1/2 -translate-y-1/2',
    bottom: 'bottom-16',
  };

  const variantStyles = {
    classic: {
      container: 'bg-white/95 px-6 py-3 rounded-xl shadow-xl',
      text: 'font-display font-bold text-gray-900 text-xl md:text-2xl',
    },
    typewriter: {
      container: 'bg-black/80 px-6 py-3 border-2 border-white/30',
      text: 'font-mono text-white text-lg md:text-xl tracking-wider',
    },
    neon: {
      container: 'bg-transparent px-6 py-3',
      text: 'font-display font-black text-valentine-pink text-2xl md:text-3xl drop-shadow-[0_0_10px_rgba(255,107,157,0.8)]',
    },
    handwritten: {
      container: 'bg-transparent px-6 py-3',
      text: 'font-body italic text-white text-xl md:text-2xl drop-shadow-2xl',
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className={`absolute ${positionClasses[position]} left-1/2 -translate-x-1/2 z-20 animate-fade-in w-full max-w-md px-4`}
    >
      <div className={`${style.container} text-center`}>
        <p className={style.text}>{text}</p>
      </div>
    </div>
  );
};

export default React.memo(CaptionSticker);
