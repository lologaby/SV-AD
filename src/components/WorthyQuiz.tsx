import React, { useState } from 'react';
import { playCorrect, playWrong, playSoundFromFile } from '../utils/duoSounds';
import DuoOwl from './DuoOwl';

// Sonido correcto: public/sounds/correct.mp3 (Duolingo). Incorrecto: wrong.mp3 o tono generado.
const USE_SOUND_FILES = true;

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

/** GIF de Shrek aprobando (Giphy = URLs estables). Alternativa: pon tu GIF en public/shrek-approval.gif */
const SHREK_GIF_URL = 'https://media.giphy.com/media/TIGP3k4gNAqvza2KJK/giphy.gif';

/** Assets oficiales desde Duolingo Brand Guidelines:
 *  https://design.duolingo.com/marketing/assets#duo
 *  https://design.duolingo.com/marketing/assets#cast-of-characters
 */
const DUOLINGO_ASSETS_BASE = 'https://design.duolingo.com';
const DUO_SVG_IDS = [
  'a57733350c2c9a01fd6e.svg',
  'fe225c25f1c6afe81424.svg',
  '215f9f8714df8f7de63c.svg',
  'ad9ec13f2b161e008ab1.svg',
  '9a6ea4292d92aebb9c5a.svg',
  '885521149d32d1cf32c3.svg',
  '3aeb9f981f17977278cf.svg',
  '6289e2c94af3a5dbdcec.svg',
  '266788168c5f135b35e3.svg',
  '2c82efcd38d61a9bd45e.svg',
];
const CAST_SVG_IDS = [
  '52ba0a30df9d8346a1d7.svg',
  '47cea17496b4500c170e.svg',
  '4a0a10a8a660d11fe5af.svg',
  '6ae0baeaa1d7dd4ccf6a.svg',
  '3759efd081011423baf6.svg',
  '4f72eb158dd9f677e4b7.svg',
  'bb221188924ec942b2f1.svg',
  '1ec082de7137d333435e.svg',
  '6bf7411898766ffa8cb8.svg',
  '3b2af5841d5325e4acd3.svg',
];
/** Duo + Cast of characters: alternamos por pregunta */
const QUESTION_CHARACTER_IDS = [...DUO_SVG_IDS, ...CAST_SVG_IDS];

interface WorthyQuizProps {
  questions: QuizQuestion[];
  minCorrect?: number;
  onPass: () => void;
  /** URL del GIF animado al pasar (ej. shrek-approval.gif en public/) */
  passGifUrl?: string;
  /** Si el GIF falla (404), se usa esta imagen estática (ej. shrek-approval.png) */
  passGifFallbackUrl?: string;
}

/**
 * Quiz de "¿Eres digno/a?" antes de poder ver las stories.
 * Si acierta las preguntas necesarias, llama onPass() para mostrar el contenido.
 */
const EXPECTED_NAME = 'Dayralee';

const WorthyQuiz: React.FC<WorthyQuizProps> = ({
  questions,
  minCorrect = 2,
  onPass,
  passGifUrl = SHREK_GIF_URL,
  passGifFallbackUrl,
}) => {
  const [phase, setPhase] = useState<'welcome' | 'name' | 'quiz'>('welcome');
  const [saidNo, setSaidNo] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [nameError, setNameError] = useState(false);
  const [userName, setUserName] = useState('');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);
  const [showShrek, setShowShrek] = useState(false);
  const [gifSrc, setGifSrc] = useState<string>(passGifUrl ?? SHREK_GIF_URL);
  const [gifTriedFallback, setGifTriedFallback] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [lives, setLives] = useState(99);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelect = (optionIndex: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(optionIndex);

    const isCorrect = optionIndex === currentQuestion.correctIndex;
    setLastAnswerCorrect(isCorrect);
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      if (USE_SOUND_FILES) {
        playSoundFromFile('correct');
      } else {
        playCorrect();
      }
    } else {
      setLives((l) => Math.max(0, l - 1));
      if (USE_SOUND_FILES) {
        playSoundFromFile('wrong');
      } else {
        playWrong();
      }
    }
    setShowFeedback(true);
  };

  const handleContinue = () => {
    setShowFeedback(false);
    if (lives <= 0) {
      setPassed(false);
      setFinished(true);
      return;
    }
    if (isLastQuestion) {
      const didPass = correctCount >= minCorrect;
      setPassed(didPass);
      if (didPass) {
        setShowShrek(true);
        setFinished(true);
      } else {
        setFinished(true);
      }
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setCorrectCount(0);
    setFinished(false);
    setPassed(false);
    setShowShrek(false);
    setShowFeedback(false);
    setLives(99);
    setGifSrc(passGifUrl ?? SHREK_GIF_URL);
    setGifTriedFallback(false);
  };

  const progressPercent = ((currentIndex + (showFeedback ? 1 : 0)) / questions.length) * 100;

  // ——— Fase: Bienvenida ———
  if (phase === 'welcome') {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-pink-50 to-rose-100 flex flex-col items-center justify-center px-6 py-10">
        <p className="text-2xl md:text-3xl font-duo font-bold text-rose-700 mb-2">Hola Muñeca!</p>
        <p className="text-duo-eel font-duo text-lg text-center mb-8">¿Esta invitación romántica es para ti?</p>
        {saidNo ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-rose-600 font-duo text-center">Esta invitación es solo para ti 💕</p>
            <button
              type="button"
              onClick={() => { setSaidNo(false); setPhase('name'); }}
              className="px-8 py-3 rounded-2xl bg-rose-500 text-white font-duo font-bold shadow-lg hover:bg-rose-600 transition"
            >
              Sí, es para mí
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setPhase('name')}
              className="px-8 py-3 rounded-2xl bg-duo-green text-white font-duo font-bold shadow-lg hover:bg-duo-green-dark transition"
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => setSaidNo(true)}
              className="px-8 py-3 rounded-2xl bg-gray-300 text-gray-700 font-duo font-bold hover:bg-gray-400 transition"
            >
              No
            </button>
          </div>
        )}
      </div>
    );
  }

  // ——— Fase: Escribir nombre (debe ser Dayralee) ———
  if (phase === 'name') {
    const handleNameSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const name = nameInput.trim();
      if (name.toLowerCase() !== EXPECTED_NAME.toLowerCase()) {
        setNameError(true);
        return;
      }
      setNameError(false);
      setUserName(name);
      setPhase('quiz');
    };
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-pink-50 to-rose-100 flex flex-col items-center justify-center px-6 py-10">
        <p className="text-xl font-duo font-bold text-rose-700 mb-2">Escribe tu nombre</p>
        <form onSubmit={handleNameSubmit} className="w-full max-w-xs flex flex-col items-center gap-4">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => { setNameInput(e.target.value); setNameError(false); }}
            placeholder="Tu nombre"
            className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none font-duo text-center text-lg"
            autoFocus
            autoComplete="off"
          />
          {nameError && (
            <p className="text-red-600 font-duo text-sm">Ese no es tu nombre. Intenta de nuevo.</p>
          )}
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-duo-green text-white font-duo font-bold shadow-lg hover:bg-duo-green-dark transition"
          >
            Continuar
          </button>
        </form>
      </div>
    );
  }

  // ——— Fase: Quiz y pantallas finales ———
  // Pantalla de éxito: estilo Duolingo + Shrek + Ver mi sorpresa (sin tocar lo de Instagram)
  if (finished && passed && showShrek) {
    return (
      <div className="w-full min-h-screen bg-duo-snow flex flex-col items-center px-6 pt-8 pb-10">
        {/* Duo celebrando - tema Duolingo */}
        <div className="mb-4 animate-fade-in">
          <DuoOwl size={100} mood="celebrate" />
        </div>
        <p className="text-duo-green-dark font-duo font-bold text-2xl mb-1">¡Lección completada!</p>
        <p className="text-duo-eel font-duo text-lg mb-6">Nuestro amor es un Duolingo 💚</p>

        <div className="mb-6 animate-fade-in">
          {/* Usar video si es .mp4/.webm para control de loop, sino usar img para GIF */}
          {gifSrc.endsWith('.mp4') || gifSrc.endsWith('.webm') ? (
            <video
              src={gifSrc}
              className="w-full max-w-md rounded-2xl shadow-2xl"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
              autoPlay
              playsInline
              muted
              loop={false}
              onError={(e) => {
                if (passGifFallbackUrl && !gifTriedFallback) {
                  setGifTriedFallback(true);
                  setGifSrc(passGifFallbackUrl);
                  return;
                }
                const video = e.currentTarget;
                video.style.display = 'none';
                const next = video.nextElementSibling;
                if (next) (next as HTMLElement).classList.remove('hidden');
              }}
            />
          ) : (
            <img
              src={gifSrc}
              alt="Shrek aprobando"
              className="w-full max-w-md rounded-2xl shadow-2xl"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
              onError={(e) => {
                if (passGifFallbackUrl && !gifTriedFallback) {
                  setGifTriedFallback(true);
                  setGifSrc(passGifFallbackUrl);
                  return;
                }
                const img = e.currentTarget;
                img.style.display = 'none';
                const next = img.nextElementSibling;
                if (next) (next as HTMLElement).classList.remove('hidden');
              }}
            />
          )}
          <div className="hidden text-8xl mb-6 animate-pulse-custom" aria-hidden>
            💚
          </div>
        </div>
        <h1 className="text-2xl font-duo font-bold text-duo-eel mb-2 animate-fade-in">
          ¡Eres digno/a! 🎉
        </h1>
        <p className="text-duo-eel font-duo mb-8 animate-fade-in">
          Shrek aprueba tu conocimiento 💚
        </p>
        <button
          onClick={onPass}
          className="w-full max-w-xs py-4 rounded-2xl font-duo font-bold text-lg uppercase tracking-wide text-white bg-duo-green hover:bg-duo-green-light transition-transform active:scale-[0.98] animate-fade-in"
        >
          Ver mi sorpresa
        </button>
      </div>
    );
  }

  if (finished && !passed) {
    return (
      <div className="w-full min-h-screen bg-duo-red-bg flex flex-col items-center justify-center px-6 py-10">
        <DuoOwl size={120} mood="sad" className="mb-6" />
        <h1 className="text-duo-red-dark font-duo font-bold text-2xl mb-2 text-center">
          Sigue practicando
        </h1>
        <p className="text-duo-eel font-duo text-center mb-2">
          Acertaste {correctCount} de {questions.length}. ¡Tú puedes!
        </p>
        <p className="text-gray-500 font-duo text-sm text-center mb-8">
          Nuestro amor es un Duolingo — no te rindas 💚
        </p>
        <button
          onClick={handleRetry}
          className="w-full max-w-xs py-4 rounded-2xl font-duo font-bold text-lg uppercase tracking-wide text-white bg-duo-red hover:opacity-95 transition-transform active:scale-[0.98]"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Estilo Duolingo como en las capturas: barra verde arriba, tiles, feedback abajo
  return (
    <div className="w-full min-h-screen bg-duo-snow flex flex-col font-duo safe-area-pb">
      {/* Top bar Duolingo 2026: X, barra progreso, corazones */}
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <button type="button" className="w-10 h-10 flex items-center justify-center text-gray-400" aria-label="Cerrar">
          <span className="text-2xl font-bold">×</span>
        </button>
        <div className="flex-1 mx-4 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-duo-green rounded-full transition-all duration-400 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center gap-1 text-duo-red font-duo font-bold text-lg">
          <span aria-hidden>♥</span>
          <span>{lives}</span>
        </div>
      </header>

      {/* Título + racha (sin "Nuestro amor es un Duolingo" hasta que pase el test) */}
      <div className="flex items-center justify-center gap-2 pt-2 pb-1">
        {correctCount > 0 && (
          <span className="flex items-center gap-0.5 text-duo-orange font-duo font-bold text-sm" title="Racha">
            🔥 {correctCount}
          </span>
        )}
      </div>
      <p className="text-rose-700 font-duo text-sm text-center px-4 pb-4">
        {userName}, demuestra que eres digna de esta cita especial romántica secreta.
      </p>

      {/* Instrucción */}
      <p className="text-gray-500 font-duo text-sm text-center px-4 pb-4">
        Elige la respuesta correcta
      </p>

      {/* Pregunta (Duo + Cast of characters desde design.duolingo.com/marketing/assets) */}
      <div className="px-6 pb-6 flex flex-col items-center">
        <img
          src={`${DUOLINGO_ASSETS_BASE}/${QUESTION_CHARACTER_IDS[currentIndex % QUESTION_CHARACTER_IDS.length]}`}
          alt=""
          className="h-14 w-auto mb-3 object-contain"
          width={56}
          height={56}
        />
        <p className="text-duo-eel font-duo font-bold text-xl md:text-2xl text-center leading-tight">
          {currentQuestion.question}
        </p>
      </div>

      {/* Opciones: tiles como en Duolingo (verde claro/oscuro, rojo claro/oscuro, gris) */}
      <div className="flex-1 px-6 pb-4 space-y-3 max-w-lg mx-auto w-full">
        {currentQuestion.options.map((option, i) => {
          const selected = selectedIndex === i;
          const correct = i === currentQuestion.correctIndex;
          const showResult = selectedIndex !== null;
          const isCorrectChoice = selected && correct;
          const isWrongChoice = selected && !correct;

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selectedIndex !== null}
              className={`w-full py-4 px-5 rounded-2xl font-duo font-bold text-lg text-left transition-all duration-200 active:scale-[0.98] ${
                showResult
                  ? isCorrectChoice
                    ? 'bg-duo-green-bg text-duo-green-dark'
                    : isWrongChoice
                    ? 'bg-duo-red-bg text-duo-red-dark'
                    : correct
                    ? 'bg-duo-green-bg text-duo-green-dark'
                    : 'bg-gray-100 text-gray-500'
                  : 'bg-white border-2 border-gray-300 text-duo-eel hover:border-duo-blue hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-between">
                {option}
                {showResult && correct && <span className="text-duo-green-dark text-2xl">✓</span>}
                {showResult && isWrongChoice && <span className="text-duo-red-dark text-2xl">✗</span>}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel de feedback inferior (como en las fotos Duolingo) */}
      {showFeedback && (
        <div
          className={`mt-auto rounded-t-3xl px-6 pt-8 pb-10 ${
            lastAnswerCorrect ? 'bg-duo-green-bg' : 'bg-duo-red-bg'
          }`}
        >
          <div className={`flex flex-col items-center gap-2 mb-6 ${lastAnswerCorrect ? 'text-duo-green-dark' : 'text-duo-red-dark'}`}>
            {lastAnswerCorrect ? (
              <>
                <DuoOwl size={64} mood="celebrate" />
                <span className="font-duo font-bold text-2xl">¡Perfecto!</span>
              </>
            ) : (
              <>
                <DuoOwl size={56} mood="sad" />
                <span className="font-duo font-bold text-xl">Sigue practicando</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={handleContinue}
            className={`w-full py-4 rounded-2xl font-duo font-bold text-lg uppercase tracking-wide text-white transition-transform active:scale-[0.98] ${
              lastAnswerCorrect ? 'bg-duo-green hover:bg-duo-green-light' : 'bg-duo-red hover:opacity-95'
            }`}
          >
            {lastAnswerCorrect ? 'Continuar' : 'Entendido'}
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(WorthyQuiz);
