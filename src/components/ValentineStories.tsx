import React, { useState, useCallback } from 'react';
import Stories from 'react-insta-stories';
import TextSlide from './CustomSlides/TextSlide';
import ReasonsList from './CustomSlides/ReasonsList';
import CountdownSlide from './CustomSlides/CountdownSlide';
import FinalSlide from './CustomSlides/FinalSlide';

interface ValentineStoriesProps {
  /** Si false, al terminar todas las stories se llama onAllStoriesEnd en vez de hacer loop */
  loop?: boolean;
  /** Se llama cuando se terminan todas las stories (solo tiene efecto si loop es false) */
  onAllStoriesEnd?: () => void;
}

/**
 * Componente principal de las Stories de San Valentín
 * Integra todos los slides personalizados y configura react-insta-stories
 */
const ValentineStories: React.FC<ValentineStoriesProps> = ({
  loop = true,
  onAllStoriesEnd,
}) => {
  const [isPaused] = useState(false);

  // Función para vibrar en móvil (opcional)
  const vibrate = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // Vibración suave de 50ms
    }
  }, []);

  // Configuración de las stories (header requiere heading, subheading y profileImage como string)
  const stories = [
    // Slide 1: Bienvenida con imagen
    {
      url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&q=80',
      duration: 5000,
      header: {
        heading: 'Mi Amor ❤️',
        subheading: 'San Valentín 2026',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80'
      }
    },
    
    // Slide 2: Mensaje de texto con gradiente
    {
      content: () => (
        <TextSlide 
          message="Te amo más cada día"
          subtitle="Eres mi persona favorita"
          gradient="from-valentine-pink via-valentine-red to-valentine-dark-red"
        />
      ),
      duration: 5000
    },
    
    // Slide 3: Razones por las que te amo
    {
      content: () => (
        <ReasonsList 
          reasons={[
            'Tu sonrisa ilumina mi día',
            'Tu forma de ser única y especial',
            'Cómo me haces reír sin esfuerzo',
            'Tu apoyo incondicional',
            'Los momentos que compartimos',
            'Tu corazón generoso',
            'Cómo me haces sentir amado/a',
            'Eres mi mejor decisión'
          ]}
          title="Razones por las que te amo"
        />
      ),
      duration: 8000
    },
    
    // Slide 4: Imagen con texto overlay
    {
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80',
      duration: 5000,
      header: {
        heading: 'Nuestro momento especial',
        subheading: '',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80'
      }
    },
    
    // Slide 5: Countdown - Juntos desde...
    {
      content: () => (
        <CountdownSlide 
          startDate={new Date('2023-06-15')} // Cambia esta fecha por tu fecha especial
          title="Juntos desde"
        />
      ),
      duration: 6000
    },
    
    // Slide 6: Mensaje romántico
    {
      content: () => (
        <TextSlide 
          message="Eres mi todo"
          subtitle="Mi presente y mi futuro"
          gradient="from-valentine-dark-red via-valentine-red to-valentine-pink"
        />
      ),
      duration: 5000
    },
    
    // Slide 7: Otra imagen romántica
    {
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80',
      duration: 5000,
      header: {
        heading: 'Para siempre',
        subheading: '',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80'
      }
    },
    
    // Slide 8: Slide final
    {
      content: () => (
        <FinalSlide 
          message="Te amo infinitamente"
          emoji="💖"
          showShareButton={true}
        />
      ),
      duration: 6000
    }
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
    <div className="w-screen h-screen-dynamic bg-black stories-container">
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
          objectFit: 'cover',
        }}
        // Estilos personalizados para las barras de progreso
        progressContainerStyles={{
          height: '4px',
          maxWidth: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
