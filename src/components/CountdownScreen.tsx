import React, { useState, useEffect, useRef } from 'react';
import { createMusicPlayer, type MusicController } from '../utils/duoSounds';

/** 14 Feb 2026 12:00 AM Atlantic (Puerto Rico, UTC-4) = 04:00 UTC */
const TARGET_UTC = '2026-02-14T04:00:00.000Z';
const STORAGE_KEY_SKIP = 'sv-ad-countdown-skip';

/** Reproducir dtmf.mp3 desde 1:20 (80 s) en el countdown */
const COUNTDOWN_MUSIC_START_SEC = 80;

/** Assets oficiales desde Duolingo Brand Guidelines */
const DUOLINGO_ASSETS_BASE = 'https://design.duolingo.com';
const DUO_SVG_IDS = [
  'a57733350c2c9a01fd6e.svg', // celebrando
  'fe225c25f1c6afe81424.svg', // sorprendido
  '215f9f8714df8f7de63c.svg', // pensativo
  'ad9ec13f2b161e008ab1.svg', 
  '9a6ea4292d92aebb9c5a.svg', // guiñando
];

function getTargetDate(): Date {
  return new Date(TARGET_UTC);
}

function getRemaining(now: Date, target: Date) {
  const ms = Math.max(0, target.getTime() - now.getTime());
  const s = Math.floor((ms / 1000) % 60);
  const m = Math.floor((ms / 60000) % 60);
  const h = Math.floor((ms / 3600000) % 24);
  const d = Math.floor(ms / 86400000);
  return { d, h, m, s, ms };
}

function isSkipped(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY_SKIP) === '1';
}

export function setCountdownSkipped(): void {
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY_SKIP, '1');
}

export function isCountdownReachedOrSkipped(): boolean {
  if (typeof window === 'undefined') return false;
  if (isSkipped()) return true;
  return Date.now() >= getTargetDate().getTime();
}

interface CountdownScreenProps {
  onReached: () => void;
}

/**
 * Pantalla de countdown hasta 14 feb 2026 12:00 AM ET.
 * Para saltar en pruebas: usar la URL lupitayjuangabriel.com/skip
 */
const CountdownScreen: React.FC<CountdownScreenProps> = ({ onReached }) => {
  const target = getTargetDate();
  const [remaining, setRemaining] = useState(() => getRemaining(new Date(), target));
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showMusicButton, setShowMusicButton] = useState(true);
  const musicRef = useRef<MusicController | null>(null);

  // Crear el reproductor de música (Web Audio API, sin mostrar controles)
  useEffect(() => {
    musicRef.current = createMusicPlayer('dtmf', COUNTDOWN_MUSIC_START_SEC, true, 0.5);
    
    return () => {
      if (musicRef.current) {
        musicRef.current.stop();
      }
    };
  }, []);

  // Función para activar música manualmente
  const handlePlayMusic = async () => {
    if (musicRef.current) {
      try {
        await musicRef.current.play();
        setMusicPlaying(true);
        setShowMusicButton(false);
      } catch {
        // Error reproduciendo
      }
    }
  };

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      if (now.getTime() >= target.getTime()) {
        clearInterval(t);
        onReached();
        return;
      }
      setRemaining(getRemaining(now, target));
    }, 1000);
    return () => clearInterval(t);
  }, [target, onReached]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="w-full h-screen-safe relative overflow-hidden bg-duo-snow px-6 py-10 flex items-center justify-center">
      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        {/* Duo guiñando */}
        <div className="mb-6 animate-fade-in">
          <img 
            src={`${DUOLINGO_ASSETS_BASE}/${DUO_SVG_IDS[4]}`} 
            alt="Duo guiñando" 
            className="h-32 w-auto object-contain" 
            width={128} 
            height={128} 
          />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-duo font-bold text-duo-eel mb-2 text-center">
          Duolingo de Amor
        </h1>
        <p className="text-duo-eel/70 font-duo text-base text-center mb-8">
          La tarjeta virtual se abre el <span className="font-bold text-duo-eel">14 de febrero</span> a la medianoche
        </p>

        {/* Countdown cards estilo Duolingo */}
        <div className="flex gap-2 sm:gap-3 mb-6">
          {/* Días */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 px-3 sm:px-5 py-3 sm:py-4 min-w-[60px] sm:min-w-[72px]">
              <span className="text-2xl sm:text-4xl font-duo font-bold text-duo-eel tabular-nums">
                {remaining.d}
              </span>
            </div>
            <span className="text-xs font-duo font-bold text-duo-eel/60 uppercase tracking-wider mt-2">
              días
            </span>
          </div>

          {/* Horas */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 px-3 sm:px-5 py-3 sm:py-4 min-w-[60px] sm:min-w-[72px]">
              <span className="text-2xl sm:text-4xl font-duo font-bold text-duo-eel tabular-nums">
                {pad(remaining.h)}
              </span>
            </div>
            <span className="text-xs font-duo font-bold text-duo-eel/60 uppercase tracking-wider mt-2">
              horas
            </span>
          </div>

          {/* Minutos */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 px-3 sm:px-5 py-3 sm:py-4 min-w-[60px] sm:min-w-[72px]">
              <span className="text-2xl sm:text-4xl font-duo font-bold text-duo-eel tabular-nums">
                {pad(remaining.m)}
              </span>
            </div>
            <span className="text-xs font-duo font-bold text-duo-eel/60 uppercase tracking-wider mt-2">
              min
            </span>
          </div>

          {/* Segundos */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 px-3 sm:px-5 py-3 sm:py-4 min-w-[60px] sm:min-w-[72px]">
              <span className="text-2xl sm:text-4xl font-duo font-bold text-duo-green tabular-nums">
                {pad(remaining.s)}
              </span>
            </div>
            <span className="text-xs font-duo font-bold text-duo-eel/60 uppercase tracking-wider mt-2">
              seg
            </span>
          </div>
        </div>

        {/* Botón de música */}
        {showMusicButton && !musicPlaying && (
          <button
            onClick={handlePlayMusic}
            className="mt-4 mb-2 flex items-center gap-2 px-5 py-3 rounded-2xl bg-duo-green text-white font-duo font-bold shadow-lg hover:bg-duo-green-light hover:scale-[1.02] transition-transform active:scale-[0.98]"
          >
            <span className="text-xl">🎵</span>
            <span>Activar música</span>
          </button>
        )}

        {/* Indicador de música sonando */}
        {musicPlaying && (
          <div className="mt-4 mb-2 flex items-center gap-2 text-duo-green font-duo text-sm">
            <span className="animate-pulse">🎵</span>
            <span>Música sonando</span>
          </div>
        )}

        {/* Mensaje adicional */}
        <p className="text-duo-eel/50 font-duo text-sm text-center mt-4">
          ¡Pronto llegará tu sorpresa! 💚
        </p>
      </div>
    </div>
  );
};

export default CountdownScreen;
