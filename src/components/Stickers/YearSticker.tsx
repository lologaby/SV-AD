import React from 'react';

export interface YearStickerProps {
  year: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'center';
}

/**
 * Año minimalista integrado al estilo de la story.
 * Pill sutil en la parte inferior, sin dominar la foto.
 */
const YearSticker: React.FC<YearStickerProps> = ({
  year,
  position = 'bottom-center',
}) => {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-5 left-4',
    'bottom-right': 'bottom-5 right-4',
    'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div className={`absolute ${positionClasses[position]} z-20`}>
      <span className="inline-flex items-center rounded-full bg-black/35 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-white/95 tracking-wide tabular-nums shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
        {year}
      </span>
    </div>
  );
};

export default React.memo(YearSticker);
