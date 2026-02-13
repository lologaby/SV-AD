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
 */
const ProfileSwitchAnimation: React.FC<ProfileSwitchAnimationProps> = ({
  onComplete,
  cinemaInvite = {},
}) => {
  const [phase, setPhase] = useState<'swiping' | 'transition' | 'story'>('swiping');

  // Fase 1: Animación de swipe left (deslizamiento)
  useEffect(() => {
    if (phase !== 'swiping') return;
    const t = setTimeout(() => setPhase('transition'), 400);
    return () => clearTimeout(t);
  }, [phase]);

  // Fase 2: Transición breve antes de mostrar el nuevo story
  useEffect(() => {
    if (phase !== 'transition') return;
    const t = setTimeout(() => setPhase('story'), 300);
    return () => clearTimeout(t);
  }, [phase]);

  // Fase 1: Simular swipe left - el story actual se desliza hacia la izquierda
  if (phase === 'swiping') {
    return (
      <div className="w-full h-full bg-black relative overflow-hidden safe-area-all">
        {/* Story anterior (deslizándose hacia la izquierda) */}
        <div className="absolute inset-0 animate-swipe-left">
          <div className="w-full h-full bg-gradient-to-br from-valentine-dark-red via-valentine-red to-valentine-pink flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">💖</div>
              <p className="text-2xl font-display">Fin del story</p>
            </div>
          </div>
        </div>

        {/* Header del nuevo perfil (Caribbean Cinemas) apareciendo desde la derecha */}
        <div className="absolute top-0 left-0 right-0 z-30 animate-slide-from-right">
          <div className="flex items-center gap-3 px-4 py-3 bg-black/50 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30 flex-shrink-0 bg-white relative">
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
                <span className="text-xl">🎬</span>
              </div>
            </div>
            <div>
              <p className="text-white font-body font-semibold text-sm">Caribbean Cinemas</p>
              <p className="text-white/70 font-body text-xs">Ahora</p>
            </div>
          </div>
        </div>

        {/* Indicador visual de swipe */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 text-white/60 text-sm font-body animate-fade-in">
          ← Deslizando al siguiente perfil
        </div>
      </div>
    );
  }

  // Fase 2: Transición breve (header completo visible)
  if (phase === 'transition') {
    return (
      <div className="w-full h-full bg-black relative safe-area-all">
        {/* Header del nuevo perfil: Caribbean Cinemas */}
        <div className="absolute top-0 left-0 right-0 z-30 bg-black/50 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30 flex-shrink-0 bg-white relative">
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
                <span className="text-xl">🎬</span>
              </div>
            </div>
            <div>
              <p className="text-white font-body font-semibold text-sm">Caribbean Cinemas</p>
              <p className="text-white/70 font-body text-xs">Ahora</p>
            </div>
          </div>
        </div>

        {/* Contenido en transición */}
        <div className="absolute inset-0 flex items-center justify-center pt-14">
          <div className="text-white/80 font-body animate-fade-in">Cargando story...</div>
        </div>
      </div>
    );
  }

  // Fase 3: Mostrar el story de invitación al cine (con header del nuevo perfil)
  return (
    <div className="w-full h-full relative bg-black safe-area-all">
      {/* Header del perfil Caribbean Cinemas (como en Instagram Stories) */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent pb-4">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30 flex-shrink-0 bg-white relative">
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
              <span className="text-xl">🎬</span>
            </div>
          </div>
          <div>
            <p className="text-white font-body font-semibold text-sm">Caribbean Cinemas</p>
            <p className="text-white/70 font-body text-xs">Ahora</p>
          </div>
        </div>
      </div>

      {/* Story de invitación al cine */}
      <div className="w-full h-full pt-14">
        <CinemaInviteSlide {...cinemaInvite} />
      </div>

      {onComplete && (
        <button
          onClick={onComplete}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 font-body text-sm hover:text-white transition-colors z-40"
        >
          Cerrar
        </button>
      )}
    </div>
  );
};

export default React.memo(ProfileSwitchAnimation);
