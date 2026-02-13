import React, { useState } from 'react';
import { playCorrect, playWrong } from '../utils/duoSounds';

// Opcional: pon correct.mp3 y wrong.mp3 en public/sounds/ para sonidos tipo Duolingo
const USE_SOUND_FILES = false;

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

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelect = (optionIndex: number) => {
    if (selectedIndex !== null) return; // ya respondió
    setSelectedIndex(optionIndex);

    const isCorrect = optionIndex === currentQuestion.correctIndex;
    const newCorrectCount = correctCount + (isCorrect ? 1 : 0);
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

    // Avanzar después de un momento
    setTimeout(() => {
      if (isLastQuestion) {
        const didPass = newCorrectCount >= minCorrect;
        setPassed(didPass);
        if (didPass) {
          // Si pasó, mostrar GIF de Shrek con botón en la misma pantalla
          setShowShrek(true);
          setFinished(true); // Mostrar botón inmediatamente
        } else {
          // Si no pasó, mostrar resultado directamente
          setFinished(true);
        }
      } else {
        setCurrentIndex((i) => i + 1);
        setSelectedIndex(null);
      }
    }, 800);
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setCorrectCount(0);
    setFinished(false);
    setPassed(false);
    setShowShrek(false);
    setGifSrc(passGifUrl ?? SHREK_GIF_URL);
    setGifTriedFallback(false);
  };

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

  // Estilo Duolingo: fondo blanco, barra de progreso, tiles redondeados, colores Duo
  return (
    <div className="w-full min-h-screen bg-duo-snow flex flex-col font-duo">
      {/* Barra de progreso estilo Duolingo (puntos por pregunta) */}
      <div className="flex justify-center gap-2 pt-6 pb-4 px-4">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i < currentIndex
                ? 'bg-duo-green w-8'
                : i === currentIndex
                ? 'bg-duo-blue w-10'
                : 'bg-gray-200 w-2'
            }`}
          />
        ))}
      </div>

      {/* Pregunta (tipografía bold, texto oscuro) */}
      <div className="px-6 pt-4 pb-8">
        <p className="text-duo-eel font-duo font-bold text-xl md:text-2xl text-center leading-tight">
          {currentQuestion.question}
        </p>
      </div>

      {/* Opciones: tiles blancos con borde, al tocar → verde o rojo */}
      <div className="flex-1 px-6 pb-8 space-y-3 max-w-lg mx-auto w-full">
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
              className={`w-full py-4 px-5 rounded-2xl font-duo font-bold text-lg text-left transition-all duration-200 border-2 active:scale-[0.98] ${
                showResult
                  ? isCorrectChoice
                    ? 'bg-duo-green border-duo-green text-white shadow-md'
                    : isWrongChoice
                    ? 'bg-duo-red border-duo-red text-white shadow-md'
                    : correct
                    ? 'bg-duo-green border-duo-green text-white'
                    : 'bg-gray-50 border-gray-200 text-duo-eel'
                  : 'bg-white border-gray-300 text-duo-eel hover:border-duo-blue hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-between">
                {option}
                {showResult && correct && <span className="text-2xl">✓</span>}
                {showResult && isWrongChoice && <span className="text-2xl">✗</span>}
              </span>
            </button>
          );
        })}
      </div>

      {/* Pie tipo Duolingo: "Elige la respuesta correcta" */}
      <p className="text-center text-gray-400 font-duo text-sm pb-6">
        Elige la respuesta correcta
      </p>
    </div>
  );
};

export default React.memo(WorthyQuiz);
