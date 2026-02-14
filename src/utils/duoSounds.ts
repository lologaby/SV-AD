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

/** En Safari el contexto puede estar suspended hasta el primer tap; reanudar si hace falta */
function resumeContext(ctx: AudioContext): Promise<void> {
  if (ctx.state === 'suspended') {
    return ctx.resume();
  }
  return Promise.resolve();
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

/**
 * Reproduce un MP3 con Web Audio API (sin crear <audio> en el DOM).
 * Así Safari y otros navegadores no muestran ningún reproductor.
 */
export function playSoundFromFile(filename: 'correct' | 'wrong'): void {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  const url = `${base}sounds/${filename}.mp3`;

  const ctx = getAudioContext();

  resumeContext(ctx)
    .then(() => fetch(url))
    .then((res) => res.arrayBuffer())
    .then((buffer) => ctx.decodeAudioData(buffer))
    .then((decoded) => {
      const source = ctx.createBufferSource();
      source.buffer = decoded;
      const gain = ctx.createGain();
      gain.gain.value = 0.6;
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(0);
    })
    .catch(() => {
      if (filename === 'correct') playCorrect();
      else playWrong();
    });
}

/**
 * Interfaz para controlar música de fondo reproducida con Web Audio API.
 */
export interface MusicController {
  play: () => Promise<void>;
  stop: () => void;
  isPlaying: () => boolean;
}

/**
 * Crea un controlador para reproducir música de fondo usando Web Audio API.
 * No muestra controles de audio en Safari ni otros navegadores.
 * 
 * @param filename - Nombre del archivo en public/sounds/ (sin extensión)
 * @param startTime - Segundo desde donde empezar (ej. 80 para 1:20)
 * @param loop - Si debe repetirse al terminar
 * @param volume - Volumen de 0 a 1
 */
export function createMusicPlayer(
  filename: string,
  startTime: number = 0,
  loop: boolean = true,
  volume: number = 0.5
): MusicController {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  const url = `${base}sounds/${filename}.mp3`;
  
  let source: AudioBufferSourceNode | null = null;
  let gainNode: GainNode | null = null;
  let audioBuffer: AudioBuffer | null = null;
  let playing = false;
  let loaded = false;

  // Precargar el audio
  const loadPromise = fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      const ctx = getAudioContext();
      return ctx.decodeAudioData(buffer);
    })
    .then((decoded) => {
      audioBuffer = decoded;
      loaded = true;
    })
    .catch(() => {
      // Error cargando audio
    });

  const play = async (): Promise<void> => {
    if (playing) return;
    
    // Esperar a que cargue si no ha cargado
    if (!loaded) {
      await loadPromise;
    }
    
    if (!audioBuffer) return;

    const ctx = getAudioContext();
    await resumeContext(ctx);

    source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = loop;
    
    // Si hay loop, configurar el punto de loop
    if (loop) {
      source.loopStart = startTime;
      source.loopEnd = audioBuffer.duration;
    }

    gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Empezar desde startTime
    source.start(0, startTime);
    playing = true;

    source.onended = () => {
      if (!loop) {
        playing = false;
      }
    };
  };

  const stop = (): void => {
    if (source && playing) {
      try {
        source.stop();
      } catch {
        // Ya estaba detenido
      }
      source.disconnect();
      source = null;
    }
    if (gainNode) {
      gainNode.disconnect();
      gainNode = null;
    }
    playing = false;
  };

  const isPlaying = (): boolean => playing;

  return { play, stop, isPlaying };
}
