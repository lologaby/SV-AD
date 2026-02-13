import React from 'react';

export interface MusicStickerProps {
  songName: string;
  artist?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * Sticker de música estilo Instagram Stories
 * Muestra el nombre de la canción y artista con animación
 */
const MusicSticker: React.FC<MusicStickerProps> = ({
  songName,
  artist,
  position = 'bottom-left',
}) => {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-20 left-4',
    'bottom-right': 'bottom-20 right-4',
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} z-20 animate-fade-in`}
    >
      <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-xl">
        {/* Icono de música animado */}
        <div className="relative">
          <span className="text-xl animate-pulse-custom">🎵</span>
        </div>

        {/* Info de la canción */}
        <div className="text-left">
          <p className="text-white font-body font-semibold text-sm leading-tight">
            {songName}
          </p>
          {artist && (
            <p className="text-white/70 font-body text-xs leading-tight">
              {artist}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MusicSticker);
