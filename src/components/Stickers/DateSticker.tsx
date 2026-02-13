import React from 'react';

export interface DateStickerProps {
  date: string;
  icon?: string;
  position?: 'top' | 'bottom' | 'center';
  variant?: 'default' | 'romantic' | 'minimal';
}

/**
 * Sticker de fecha estilo Instagram Stories
 * Se puede usar para mostrar fechas importantes en fotos
 */
const DateSticker: React.FC<DateStickerProps> = ({
  date,
  icon = '📅',
  position = 'bottom',
  variant = 'default',
}) => {
  const positionClasses = {
    top: 'top-8',
    center: 'top-1/2 -translate-y-1/2',
    bottom: 'bottom-8',
  };

  const variantClasses = {
    default: 'bg-white/90 text-gray-900',
    romantic: 'bg-gradient-to-r from-valentine-pink to-valentine-red text-white',
    minimal: 'bg-black/50 text-white',
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} left-1/2 -translate-x-1/2 z-20 animate-slide-up`}
    >
      <div
        className={`${variantClasses[variant]} backdrop-blur-sm rounded-2xl px-6 py-3 shadow-2xl`}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <p className="font-display font-bold text-xl">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DateSticker);
