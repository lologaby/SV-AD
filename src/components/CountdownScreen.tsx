import React, { useState, useEffect } from 'react';

/** 14 Feb 2026 12:00 AM Eastern = 05:00 UTC */
const TARGET_UTC = '2026-02-14T05:00:00.000Z';
const STORAGE_KEY_SKIP = 'sv-ad-countdown-skip';

/** Reproducir dtmf.mp3 desde 1:20 (80 s) en el countdown */
const COUNTDOWN_MUSIC_START_SEC = 80;

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

  // Música de fondo: dtmf.mp3 desde 1:20
  useEffect(() => {
    const base = import.meta.env.BASE_URL || '/';
    const musicUrl = `${base}sounds/dtmf.mp3`;
    const audio = new Audio(musicUrl);
    audio.currentTime = COUNTDOWN_MUSIC_START_SEC;
    audio.loop = true;
    const p = audio.play();
    if (p !== undefined) p.catch(() => {});
    return () => {
      audio.pause();
    };
  }, []);

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
    <div className="h-screen-safe w-screen bg-black flex flex-col items-center justify-center px-6 font-duo text-white">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">Duolingo de Amor</h1>
      <p className="text-white/80 text-center mb-8">La invitación se abre el 14 de febrero a las 12:00 AM (hora del Este)</p>

      <div className="flex gap-3 sm:gap-4 mb-2">
        <div className="flex flex-col items-center bg-white/10 rounded-xl px-4 py-3 min-w-[64px]">
          <span className="text-3xl sm:text-4xl font-bold tabular-nums">{remaining.d}</span>
          <span className="text-xs text-white/70 uppercase tracking-wider mt-1">días</span>
        </div>
        <div className="flex flex-col items-center bg-white/10 rounded-xl px-4 py-3 min-w-[64px]">
          <span className="text-3xl sm:text-4xl font-bold tabular-nums">{pad(remaining.h)}</span>
          <span className="text-xs text-white/70 uppercase tracking-wider mt-1">horas</span>
        </div>
        <div className="flex flex-col items-center bg-white/10 rounded-xl px-4 py-3 min-w-[64px]">
          <span className="text-3xl sm:text-4xl font-bold tabular-nums">{pad(remaining.m)}</span>
          <span className="text-xs text-white/70 uppercase tracking-wider mt-1">min</span>
        </div>
        <div className="flex flex-col items-center bg-white/10 rounded-xl px-4 py-3 min-w-[64px]">
          <span className="text-3xl sm:text-4xl font-bold tabular-nums">{pad(remaining.s)}</span>
          <span className="text-xs text-white/70 uppercase tracking-wider mt-1">seg</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownScreen;
