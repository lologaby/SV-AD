/**
 * Sonidos estilo Duolingo (correcto / incorrecto)
 * Usamos Web Audio API para generar tonos similares, sin usar audio con copyright.
 * Opcional: si existen public/sounds/correct.mp3 y wrong.mp3 se usan esos.
 */

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
}

/** Sonido corto de "correcto" (tono ascendente, tipo ding) */
export function playCorrect(): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2);
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } catch {
    // Ignorar si el usuario no ha interactuado (autoplay policy)
  }
}

/** Sonido corto de "incorrecto" (tono descendente, tipo error) */
export function playWrong(): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
    osc.type = 'square';
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    // Ignorar
  }
}

/** Intenta reproducir un MP3 desde public/sounds/ (ej. duolingo-style) */
export function playSoundFromFile(filename: 'correct' | 'wrong'): void {
  const url = `${import.meta.env.BASE_URL || '/'}sounds/${filename}.mp3`;
  const audio = new Audio(url);
  audio.volume = 0.6;
  audio.play().catch(() => {
    if (filename === 'correct') playCorrect();
    else playWrong();
  });
}
