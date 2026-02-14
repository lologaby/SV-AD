import React from 'react';

export interface YearStickerProps {
  year: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

/**
 * Sticker con el año estilo Instagram Stories
 * Para marcar fotos por año en el timeline
 */
const YearSticker: React.FC<YearStickerProps> = ({
  year,
  position = 'center',
}) => {
  const positionClasses = {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} z-20 animate-fade-in`}
    >
      <div className="bg-white/20 backdrop-blur-md rounded-3xl px-8 py-4 shadow-2xl border border-white/30">
        <p className="font-display font-bold text-5xl md:text-6xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">{year}</p>
      </div>
    </div>
  );
};

export default React.memo(YearSticker);
