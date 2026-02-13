import React, { useState } from 'react';

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
  /** URL opcional del GIF al pasar (ej. /shrek-approval.gif si está en public/) */
  passGifUrl?: string;
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
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);
  const [showShrek, setShowShrek] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelect = (optionIndex: number) => {
    if (selectedIndex !== null) return; // ya respondió
    setSelectedIndex(optionIndex);

    const isCorrect = optionIndex === currentQuestion.correctIndex;
    const newCorrectCount = correctCount + (isCorrect ? 1 : 0);
    if (isCorrect) setCorrectCount((c) => c + 1);

    // Avanzar después de un momento
    setTimeout(() => {
      if (isLastQuestion) {
        const didPass = newCorrectCount >= minCorrect;
        setPassed(didPass);
        if (didPass) {
          // Si pasó, mostrar GIF de Shrek primero; luego pantalla con botón
          setShowShrek(true);
          setTimeout(() => {
            setShowShrek(false);
            setFinished(true);
          }, 2500); // Duración del GIF (~2.3s) + pequeño delay
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
  };

  // Mostrar GIF de Shrek cuando pasan la prueba (Giphy = URLs estables)
  if (showShrek && passed) {
    return (
      <div className="w-full h-full min-h-screen bg-gradient-to-br from-valentine-dark-red via-valentine-red to-valentine-pink flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 animate-fade-in">
          <img
            src={passGifUrl}
            alt="Shrek aprobando"
            className="w-full max-w-md rounded-2xl shadow-2xl"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const next = e.currentTarget.nextElementSibling;
              if (next) (next as HTMLElement).classList.remove('hidden');
            }}
          />
          <div className="hidden text-8xl mb-6 animate-pulse-custom" aria-hidden>
            💚
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 animate-fade-in">
          ¡Eres digno/a! 🎉
        </h1>
        <p className="text-xl font-body text-white/90 animate-fade-in">
          Shrek aprueba tu conocimiento 💚
        </p>
      </div>
    );
  }

  if (finished) {
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
              className="bg-white text-valentine-red font-body font-semibold px-8 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              Reintentar
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-valentine-pink via-valentine-red to-valentine-dark-red flex flex-col items-center justify-center px-6">
      <div className="mb-6 text-white/80 font-body text-sm">
        Pregunta {currentIndex + 1} de {questions.length}
      </div>
      <h2 className="text-2xl md:text-3xl font-display font-bold text-white text-center mb-8 drop-shadow-lg">
        {currentQuestion.question}
      </h2>
      <div className="w-full max-w-md space-y-4">
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
              className={`w-full py-4 px-6 rounded-2xl font-body text-lg text-left transition-all duration-300 ${
                showResult
                  ? isCorrectChoice
                    ? 'bg-green-500/90 text-white'
                    : isWrongChoice
                    ? 'bg-red-500/80 text-white'
                    : correct
                    ? 'bg-green-500/70 text-white'
                    : 'bg-white/20 text-white'
              : 'bg-white/30 hover:bg-white/50 text-white active:scale-[0.98]'}`}
            >
              {option}
              {showResult && correct && ' ✓'}
            </button>
          );
        })}
      </div>
      <p className="mt-8 text-white/70 text-sm font-body">
        Responde bien para demostrar que eres digno/a de ver lo que sigue 💕
      </p>
    </div>
  );
};

export default React.memo(WorthyQuiz);
