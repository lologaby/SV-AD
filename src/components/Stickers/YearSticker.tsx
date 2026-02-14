import React from 'react';

export interface YearStickerProps {
  year: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * Sticker con el año estilo Instagram Stories
 * Para marcar fotos por año en el timeline
 */
const YearSticker: React.FC<YearStickerProps> = ({
  year,
  position = 'top-right',
}) => {
  const positionClasses = {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} z-20 animate-fade-in`}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-2.5 shadow-xl border border-white/50">
        <p className="font-display font-bold text-xl text-gray-900">{year}</p>
      </div>
    </div>
  );
};

export default React.memo(YearSticker);
