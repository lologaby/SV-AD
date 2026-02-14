import React, { useState, useCallback, useEffect, useRef } from 'react';
import Stories from 'react-insta-stories';
import PhotoYearSlide from './CustomSlides/PhotoYearSlide';

interface ValentineStoriesProps {
  /** Si false, al terminar todas las stories se llama onAllStoriesEnd en vez de hacer loop */
  loop?: boolean;
  /** Se llama cuando se terminan todas las stories (solo tiene efecto si loop es false) */
  onAllStoriesEnd?: () => void;
}

/** Reproduce Die.mp3 desde el segundo 40 cuando empiezan las stories */
const STORIES_MUSIC_START_TIME = 40;

/**
 * Componente principal de las Stories de San Valentín
 * Integra todos los slides personalizados y configura react-insta-stories
 */
const ValentineStories: React.FC<ValentineStoriesProps> = ({
  loop = true,
  onAllStoriesEnd,
}) => {
  const [isPaused] = useState(false);
  const musicPlayedRef = useRef(false);

  const base = import.meta.env.BASE_URL;
  const musicUrl = `${base}sounds/Die.mp3`;

  // Reproducir Die.mp3 desde segundo 40 al iniciar las stories
  useEffect(() => {
    if (musicPlayedRef.current) return;
    musicPlayedRef.current = true;
    const audio = new Audio(musicUrl);
    audio.currentTime = STORIES_MUSIC_START_TIME;
    const p = audio.play();
    if (p !== undefined) {
      p.catch(() => {
        // Autoplay bloqueado (ej. sin interacción previa); se ignora
      });
    }
    return () => {
      audio.pause();
    };
  }, [musicUrl]);

  // Función para vibrar en móvil (opcional)
  const vibrate = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // Vibración suave de 50ms
    }
  }, []);

  // Rutas de imágenes (public/images) — compatible con GitHub Pages
  const image = (name: string) => `${base}images/${name}.png`;

  // Stories: fotos por año en orden 2018 → 2019 → 2022 → 2024 → 2025, cada una con sticker del año
  const stories = [
    { content: () => <PhotoYearSlide imageUrl={image('2018')} year="2018" />, duration: 5000 },
    { content: () => <PhotoYearSlide imageUrl={image('2019')} year="2019" />, duration: 5000 },
    { content: () => <PhotoYearSlide imageUrl={image('2022')} year="2022" />, duration: 5000 },
    { content: () => <PhotoYearSlide imageUrl={image('2024')} year="2024" />, duration: 5000 },
    { content: () => <PhotoYearSlide imageUrl={image('2025')} year="2025" />, duration: 5000 },
  ];

  // Manejar eventos de las stories
  const handleStoryStart = useCallback(() => {
    vibrate();
  }, [vibrate]);

  const handleStoryEnd = useCallback(() => {
    vibrate();
  }, [vibrate]);

  const handleAllStoriesEnd = useCallback(() => {
    vibrate();
    if (!loop && onAllStoriesEnd) onAllStoriesEnd();
  }, [vibrate, loop, onAllStoriesEnd]);

  // Nota: react-insta-stories maneja automáticamente la pausa al mantener presionado
  // El estado isPaused se puede usar para control manual si es necesario
  // La librería ya tiene soporte nativo para hold-to-pause

  return (
    <div className="stories-container bg-black">
      <Stories
        stories={stories}
        defaultInterval={5000}
        width="100%"
        height="100%"
        loop={loop}
        keyboardNavigation={true}
        isPaused={isPaused}
        onStoryStart={handleStoryStart}
        onStoryEnd={handleStoryEnd}
        onAllStoriesEnd={handleAllStoriesEnd}
        storyStyles={{
          width: '100%',
          height: '100%',
          maxHeight: '100%',
          objectFit: 'cover',
          overflow: 'hidden',
        }}
        storyContainerStyles={{
          width: '100%',
          height: '100%',
          maxHeight: '100%',
          overflow: 'hidden',
        }}
        // Estilos personalizados para las barras de progreso
        progressContainerStyles={{
          height: '4px',
          maxWidth: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          position: 'relative',
          zIndex: 50,
        }}
        progressWrapperStyles={{
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}
        progressStyles={{
          backgroundColor: '#fff',
          height: '4px',
        }}
      />
    </div>
  );
};

export default ValentineStories;
