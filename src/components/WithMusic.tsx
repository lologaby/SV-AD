import React, { useEffect, useRef } from 'react';
import MusicSticker from './Stickers/MusicSticker';

export interface WithMusicProps {
  children: React.ReactNode;
  audioUrl: string;
  songName: string;
  artist?: string;
  stickerPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  isPaused?: boolean; // Viene de react-insta-stories
  volume?: number; // 0-1
}

/**
 * HOC que agrega música a un slide tipo Instagram Stories
 * - Auto-play cuando se muestra el slide
 * - Pause/resume sincronizado con el estado del story
 * - Muestra sticker de música
 */
const WithMusic: React.FC<WithMusicProps> = ({
  children,
  audioUrl,
  songName,
  artist,
  stickerPosition = 'bottom-left',
  isPaused = false,
  volume = 0.5,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play cuando se monta el componente
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    
    // Intentar reproducir (puede fallar si el usuario no ha interactuado)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log('Auto-play bloqueado:', error);
        // En producción, el usuario ya habrá interactuado con el quiz o las stories
      });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioUrl, volume]);

  // Pausar/reanudar cuando cambia isPaused
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPaused) {
      audio.pause();
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignorar errores de auto-play
        });
      }
    }
  }, [isPaused]);

  return (
    <div className="relative w-full h-full">
      {/* Audio element (hidden) */}
      <audio ref={audioRef} src={audioUrl} loop />

      {/* Contenido del slide */}
      {children}

      {/* Sticker de música */}
      <MusicSticker
        songName={songName}
        artist={artist}
        position={stickerPosition}
      />
    </div>
  );
};

export default React.memo(WithMusic);
