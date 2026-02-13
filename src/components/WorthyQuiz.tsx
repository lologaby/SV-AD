import React, { useState } from 'react';
import { playCorrect, playWrong } from '../utils/duoSounds';

// Sonido correcto: public/sounds/correct.mp3 (Duolingo). Incorrecto: wrong.mp3 o tono generado.
const USE_SOUND_FILES = true;

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

/** GIF de Shrek aprobando (Giphy = URLs estables). Alternativa: pon tu GIF en public/shrek-approval.gif */
const SHREK_GIF_URL = 'https://media.giphy.com/media/TIGP3k4gNAqvza2KJK/giphy.gif';

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
const WorthyQuiz: React.FC<WorthyQuizProps> = ({
  questions,
  minCorrect = 2,
  onPass,
  passGifUrl = SHREK_GIF_URL,
  passGifFallbackUrl,
}) => {
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
        const a = new Audio(`${import.meta.env.BASE_URL || '/'}sounds/correct.mp3`);
        a.volume = 0.6;
        a.play().catch(() => playCorrect());
      } else {
        playCorrect();
      }
    } else {
      if (USE_SOUND_FILES) {
        const a = new Audio(`${import.meta.env.BASE_URL || '/'}sounds/wrong.mp3`);
        a.volume = 0.6;
        a.play().catch(() => playWrong());
      } else {
        playWrong();
      }
    }
    setShowFeedback(true);
  };

  const handleContinue = () => {
    setShowFeedback(false);
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
    setGifSrc(passGifUrl ?? SHREK_GIF_URL);
    setGifTriedFallback(false);
  };

  const progressPercent = ((currentIndex + (showFeedback ? 1 : 0)) / questions.length) * 100;
  const hearts = 3; // decorativo tipo Duolingo

  // Mostrar GIF de Shrek con botón cuando pasan la prueba
  if (finished && passed && showShrek) {
    return (
      <div className="w-full h-full min-h-screen bg-gradient-to-br from-valentine-dark-red via-valentine-red to-valentine-pink flex flex-col items-center justify-center px-6 text-center">
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
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 animate-fade-in">
          ¡Eres digno/a! 🎉
        </h1>
        <p className="text-xl font-body text-white/90 mb-8 animate-fade-in">
          Shrek aprueba tu conocimiento 💚
        </p>
        <button
          onClick={onPass}
          className="bg-white text-valentine-red font-body font-semibold px-8 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform animate-fade-in"
        >
          Ver mi sorpresa
        </button>
      </div>
    );
  }

  if (finished && !passed) {
    return (
      <div className="w-full h-full min-h-screen bg-gradient-to-br from-valentine-dark-red via-valentine-red to-valentine-pink flex flex-col items-center justify-center px-6 text-center">
        {passed ? (
          <>
            <div className="text-7xl mb-6 animate-pulse-custom">💖</div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              ¡Eres digno/a!
            </h1>
            <p className="text-xl font-body text-white/90 mb-8">
              Has demostrado que conoces nuestro amor. Toca para ver tu sorpresa.
            </p>
            <button
              onClick={onPass}
              className="bg-white text-valentine-red font-body font-semibold px-8 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              Ver mi sorpresa
            </button>
          </>
        ) : (
          <>
            <div className="text-6xl mb-6">😤</div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              No has pasado la prueba
            </h1>
            <p className="text-xl font-body text-white/90 mb-2">
              Solo acertaste {correctCount} de {questions.length}. ¡Repasa nuestros momentos!
            </p>
            <p className="text-lg font-body text-white/80 mb-8">
              (En el fondo sabes que sí eres digno/a 💕)
            </p>
            <button
              onClick={handleRetry}
              className="bg-duo-green hover:bg-duo-green-light text-white font-duo font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              Reintentar
            </button>
          </>
        )}
      </div>
    );
  }

  // Estilo Duolingo como en las capturas: barra verde arriba, tiles, feedback abajo
  return (
    <div className="w-full min-h-screen bg-duo-snow flex flex-col font-duo safe-area-pb">
      {/* Top bar Duolingo: barra de progreso verde continua + icono corazones */}
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
        <div className="flex items-center gap-1 text-duo-purple font-duo font-bold">
          <span className="text-xl">⚡</span>
          <span>{hearts}</span>
        </div>
      </header>

      {/* Título del ejercicio */}
      <p className="text-duo-eel font-duo font-bold text-lg text-center px-4 pt-2 pb-6">
        Elige la respuesta correcta
      </p>

      {/* Pregunta */}
      <div className="px-6 pb-6">
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
          <div className={`flex items-center justify-center gap-2 mb-6 ${lastAnswerCorrect ? 'text-duo-green-dark' : 'text-duo-red-dark'}`}>
            {lastAnswerCorrect ? (
              <>
                <span className="text-3xl">✓</span>
                <span className="font-duo font-bold text-2xl">¡Perfecto!</span>
              </>
            ) : (
              <>
                <span className="text-3xl">✗</span>
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
