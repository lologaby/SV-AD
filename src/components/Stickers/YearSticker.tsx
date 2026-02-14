import React from 'react';

export interface YearStickerProps {
  year: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'center';
}

/**
 * Sticker con el año estilo Instagram Stories.
 * Posición fija para evitar que se mueva al cargar.
 */
const YearSticker: React.FC<YearStickerProps> = ({
  year,
  position = 'bottom-center',
}) => {
  const positionClasses = {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-8 left-6',
    'bottom-right': 'bottom-8 right-6',
    'bottom-center': 'bottom-8 left-1/2 -translate-x-1/2',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div className={`absolute ${positionClasses[position]} z-20`}>
      <div className="bg-white/25 backdrop-blur-md rounded-2xl px-6 py-3 shadow-xl border border-white/30 min-w-[5rem] text-center">
        <p className="font-display font-bold text-4xl md:text-5xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] tabular-nums">{year}</p>
      </div>
    </div>
  );
};

export default React.memo(YearSticker);
