import React, { useState } from 'react';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface WorthyQuizProps {
  questions: QuizQuestion[];
  minCorrect?: number;
  onPass: () => void;
}

/**
 * Quiz de "¿Eres digno/a?" antes de poder ver las stories.
 * Si acierta las preguntas necesarias, llama onPass() para mostrar el contenido.
 */
const WorthyQuiz: React.FC<WorthyQuizProps> = ({
  questions,
  minCorrect = 2,
  onPass,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);

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
        setFinished(true);
        setPassed(newCorrectCount >= minCorrect);
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
  };

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

export default WorthyQuiz;
