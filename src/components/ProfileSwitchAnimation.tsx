import React, { useState, useEffect } from 'react';
import DateInviteSlide from './CustomSlides/DateInviteSlide';

interface ProfileSwitchAnimationProps {
  /** Avatar/url del perfil actual (el que acaba de terminar) */
  currentProfileImage?: string;
  /** Nombre del perfil actual */
  currentProfileName?: string;
  /** Al terminar la animación (después de mostrar la invitación) */
  onComplete?: () => void;
  /** Props para personalizar la invitación a la cita */
  dateInvite?: {
    title?: string;
    message?: string;
    place?: string;
    date?: string;
    time?: string;
    extraNote?: string;
  };
}

/**
 * Animación que simula "cambiar de perfil" para ver otro story:
 * 1) Pantalla tipo feed con círculos de stories (perfil actual + "nuevo" perfil).
 * 2) Transición como si abrieras el story del segundo perfil.
 * 3) Se muestra el story de invitación a la cita.
 */
const ProfileSwitchAnimation: React.FC<ProfileSwitchAnimationProps> = ({
  currentProfileImage = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
  currentProfileName = 'Mi Amor',
  onComplete,
  dateInvite = {},
}) => {
  const [phase, setPhase] = useState<'list' | 'opening' | 'story'>('list');

  // Fase 1: mostrar "lista" de stories (dos perfiles)
  useEffect(() => {
    if (phase !== 'list') return;
    const t = setTimeout(() => setPhase('opening'), 2200);
    return () => clearTimeout(t);
  }, [phase]);

  // Fase 2: animación de "abriendo" el otro perfil → mostrar story
  useEffect(() => {
    if (phase !== 'opening') return;
    const t = setTimeout(() => setPhase('story'), 600);
    return () => clearTimeout(t);
  }, [phase]);

  // Lista de perfiles (vista tipo Instagram)
  if (phase === 'list') {
    return (
      <div className="w-full h-full bg-black flex flex-col">
        {/* Barra superior tipo app */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h1 className="text-white font-body font-semibold text-lg">Stories</h1>
          <span className="text-white/60 text-sm">← Desliza</span>
        </div>

        {/* Fila de avatares (como en Instagram) */}
        <div className="flex gap-6 px-6 py-8 overflow-x-auto">
          {/* Perfil actual (ya visto) */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-20 h-20 rounded-full border-2 border-white/30 p-0.5 bg-black">
              <img
                src={currentProfileImage}
                alt={currentProfileName}
                className="w-full h-full rounded-full object-cover opacity-70"
              />
            </div>
            <span className="text-white/50 text-xs mt-2 font-body truncate max-w-[80px]">
              {currentProfileName}
            </span>
          </div>

          {/* "Otro" perfil (el de la invitación) - con anillo de nuevo */}
          <div className="flex flex-col items-center flex-shrink-0 animate-pulse-custom">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-valentine-pink to-valentine-red p-1 ring-2 ring-valentine-pink">
              <div className="w-full h-full rounded-full bg-black p-0.5 flex items-center justify-center">
                <span className="text-4xl">💌</span>
              </div>
            </div>
            <span className="text-white font-body text-sm mt-2 font-semibold">
              Invitación
            </span>
          </div>
        </div>

        {/* Texto que simula que "abriste" el otro perfil */}
        <div className="flex-1 flex items-center justify-center px-6">
          <p className="text-white/80 font-body text-center animate-fade-in">
            Tocaste en <strong className="text-valentine-pink">Invitación</strong>…
            <br />
            <span className="text-white/60 text-sm mt-2 block">Abriendo story…</span>
          </p>
        </div>
      </div>
    );
  }

  if (phase === 'opening') {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-white/90 font-body animate-fade-in">Abriendo…</div>
      </div>
    );
  }

  // Fase 3: mostrar el story de la invitación a la cita (pantalla completa)
  return (
    <div className="w-full h-full relative">
      <DateInviteSlide {...dateInvite} />
      {onComplete && (
        <button
          onClick={onComplete}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 font-body text-sm hover:text-white transition-colors"
        >
          Cerrar
        </button>
      )}
    </div>
  );
};

export default ProfileSwitchAnimation;
