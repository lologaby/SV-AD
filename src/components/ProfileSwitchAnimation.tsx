import React, { useState, useEffect } from 'react';
import CinemaInviteSlide from './CustomSlides/CinemaInviteSlide';

/** Foto de perfil del "perfil" Caribbean Cinemas (en public/caribbean-cinemas-profile.png) */
const CARIBBEAN_CINEMAS_PROFILE_IMAGE = 'caribbean-cinemas-profile.png';

interface ProfileSwitchAnimationProps {
  /** Al terminar la animación (después de mostrar la invitación) */
  onComplete?: () => void;
  /** Props para personalizar la invitación al cine */
  cinemaInvite?: {
    movieTitle?: string;
    cinema?: string;
    date?: string;
    time?: string;
    seats?: string;
    screen?: string;
    qrCodeData?: string;
    qrImageUrl?: string;
    ticketNumber?: string;
    posterUrl?: string;
    message?: string;
  };
}

/**
 * Animación que simula swipe left dentro del story para cambiar al siguiente usuario
 * Como en Instagram: deslizas hacia la izquierda y cambias directamente al siguiente perfil
 * Optimizado para Safari iOS 26
 */
const ProfileSwitchAnimation: React.FC<ProfileSwitchAnimationProps> = ({
  onComplete,
  cinemaInvite = {},
}) => {
  const [phase, setPhase] = useState<'swiping' | 'story'>('swiping');

  // Fase 1: Animación de swipe left, luego saltar directo al story de la taquilla
  useEffect(() => {
    if (phase !== 'swiping') return;
    const t = setTimeout(() => setPhase('story'), 400);
    return () => clearTimeout(t);
  }, [phase]);

  // Header component reutilizable
  const ProfileHeader = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center gap-3 px-4 py-3 ${className}`}>
      <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/30 flex-shrink-0 bg-white relative">
        <img
          src={CARIBBEAN_CINEMAS_PROFILE_IMAGE}
          alt="Caribbean Cinemas"
          className="w-full h-full object-contain"
          loading="eager"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.parentElement?.querySelector('[data-fallback]');
            if (fallback) fallback.classList.remove('hidden');
          }}
        />
        <div data-fallback className="absolute inset-0 bg-gradient-to-tr from-valentine-pink to-valentine-red flex items-center justify-center hidden">
          <span className="text-lg">🎬</span>
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-white font-body font-semibold text-sm truncate">Caribbean Cinemas</p>
        <p className="text-white/70 font-body text-xs">Ahora</p>
      </div>
    </div>
  );

  // Fase 1: Simular swipe left - el story actual se desliza hacia la izquierda
  if (phase === 'swiping') {
    return (
      <div className="stories-container bg-black">
        {/* Story anterior (deslizándose hacia la izquierda) */}
        <div className="absolute inset-0 animate-swipe-left">
          <div className="w-full h-full bg-gradient-to-br from-valentine-dark-red via-valentine-red to-valentine-pink flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-5xl mb-3">💖</div>
              <p className="text-xl font-display">Fin del story</p>
            </div>
          </div>
        </div>

        {/* Header del nuevo perfil apareciendo desde la derecha */}
        <div className="absolute top-0 left-0 right-0 z-30 animate-slide-from-right bg-black/50 backdrop-blur-sm">
          <ProfileHeader />
        </div>

        {/* Indicador visual de swipe */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 text-white/60 text-sm font-body animate-fade-in">
          ← Deslizando al siguiente perfil
        </div>
      </div>
    );
  }

  // Fase 2: Mostrar el story de la taquilla (invitación al cine)
  return (
    <div className="stories-container bg-black">
      {/* Header del perfil Caribbean Cinemas (como en Instagram Stories) */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <ProfileHeader />
        {/* Barra de progreso simulada */}
        <div className="px-4 pb-2">
          <div className="h-[3px] bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white w-full" />
          </div>
        </div>
      </div>

      {/* Story de invitación al cine - con padding top para el header */}
      <div className="w-full h-full flex flex-col pt-[72px]">
        <div className="flex-1 min-h-0 overflow-hidden">
          <CinemaInviteSlide {...cinemaInvite} />
        </div>
      </div>

      {onComplete && (
        <button
          onClick={onComplete}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-body text-sm hover:text-white transition-colors z-40 py-2 px-4"
        >
          Cerrar
        </button>
      )}
    </div>
  );
};

export default React.memo(ProfileSwitchAnimation);
