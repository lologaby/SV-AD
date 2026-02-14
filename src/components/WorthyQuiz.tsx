import React, { useState } from 'react';
import { playCorrect, playWrong, playSoundFromFile } from '../utils/duoSounds';

// Sonido correcto: public/sounds/correct.mp3 (Duolingo). Incorrecto: wrong.mp3 o tono generado.
const USE_SOUND_FILES = true;

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  /** Si es "image", se muestra una cuadrícula 2x2 de opciones visuales (emoji o URL). */
  questionType?: 'text' | 'image';
  /** Para questionType === 'image': 4 items con image (emoji o URL) y opcional label. */
  imageOptions?: { image: string; label?: string }[];
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
 * Quiz de "¿Eres digna?" antes de poder ver las stories.
 * Si acierta las preguntas necesarias, llama onPass() para mostrar el contenido.
 */
const EXPECTED_NAME = 'Dayralee';

/** Detecta si el valor es una URL/ruta de imagen (no emoji) */
function isImageUrl(value: string): boolean {
  if (!value || value.length > 200) return false;
  return value.startsWith('/') || value.startsWith('http') || /\.(jpg|jpeg|png|gif|webp|avif|svg)(\?|$)/i.test(value);
}

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
  const [, setUserName] = useState('');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);
  const [showShrek, setShowShrek] = useState(false);
  const [gifSrc, setGifSrc] = useState<string>(passGifUrl ?? SHREK_GIF_URL);
  const [gifTriedFallback, setGifTriedFallback] = useState(false);
  const [gifKey, setGifKey] = useState(0);
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
        setGifKey((k) => k + 1);
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
    setGifKey(0);
    setLives(99);
    setGifSrc(passGifUrl ?? SHREK_GIF_URL);
    setGifTriedFallback(false);
  };

  const progressPercent = ((currentIndex + (showFeedback ? 1 : 0)) / questions.length) * 100;

  // ——— Fase: Bienvenida (estilo Duolingo minimalista) ———
  if (phase === 'welcome') {
    return (
      <div className="w-full quiz-fullscreen relative overflow-hidden bg-duo-snow px-6 py-10 flex items-center justify-center">
        <div className="relative z-10 flex flex-col items-center max-w-md w-full">
          {/* Duo celebrando */}
          <div className="mb-6 animate-fade-in">
            <img src={`${DUOLINGO_ASSETS_BASE}/${DUO_SVG_IDS[0]}`} alt="" className="h-32 w-auto object-contain" width={128} height={128} />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-duo font-bold text-duo-eel mb-3 text-center">Hola Muñeca!</h1>
          <p className="text-duo-eel/80 font-duo text-lg text-center mb-10">¿Esta tarjeta super mega especial es para ti?</p>
          
          {saidNo ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <p className="text-duo-eel/70 font-duo text-center mb-2">Esta invitación es solo para ti 💕</p>
              <button
                type="button"
                onClick={() => { setSaidNo(false); setPhase('name'); }}
                className="w-full max-w-xs min-h-[48px] px-8 py-4 rounded-2xl bg-duo-green text-white font-duo font-bold shadow-lg hover:bg-duo-green-light hover:scale-[1.02] transition-transform active:scale-[0.98]"
              >
                Sí, es para mí
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <button
                type="button"
                onClick={() => setPhase('name')}
                className="w-full min-h-[48px] px-8 py-4 rounded-2xl bg-duo-green text-white font-duo font-bold shadow-lg hover:bg-duo-green-light hover:scale-[1.02] transition-transform active:scale-[0.98]"
              >
                Sí
              </button>
              <button
                type="button"
                onClick={() => setSaidNo(true)}
                className="w-full min-h-[48px] px-8 py-4 rounded-2xl bg-white border-2 border-gray-300 text-duo-eel font-duo font-bold hover:bg-gray-50 hover:scale-[1.02] transition-transform active:scale-[0.98]"
              >
                No
              </button>
            </div>
          )}
        </div>
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
      <div className="w-full quiz-fullscreen relative overflow-hidden bg-duo-snow px-6 py-10 flex items-center justify-center">
        <div className="relative z-10 flex flex-col items-center w-full max-w-md">
          {/* Duo pensativo */}
          <div className="mb-6 animate-fade-in">
            <img src={`${DUOLINGO_ASSETS_BASE}/${DUO_SVG_IDS[2]}`} alt="" className="h-28 w-auto object-contain" width={112} height={112} />
          </div>
          
          <h2 className="text-2xl font-duo font-bold text-duo-eel mb-8 text-center">Escribe tu nombre</h2>
          
          <form onSubmit={handleNameSubmit} className="w-full max-w-xs flex flex-col items-center gap-4">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => { setNameInput(e.target.value); setNameError(false); }}
              placeholder="Tu nombre"
              className="w-full px-4 py-4 rounded-2xl border-2 border-gray-300 bg-white focus:border-duo-blue focus:ring-2 focus:ring-duo-blue/20 focus:outline-none font-duo text-center text-lg text-duo-eel placeholder-gray-400 transition-colors"
              autoFocus
              autoComplete="off"
            />
            {nameError && (
              <div className="flex flex-col items-center gap-2 animate-fade-in">
                <img src={`${DUOLINGO_ASSETS_BASE}/${DUO_SVG_IDS[1]}`} alt="" className="h-12 w-auto object-contain" width={48} height={48} />
                <p className="text-duo-red font-duo text-sm text-center">Ese no es tu nombre. Intenta de nuevo.</p>
              </div>
            )}
            <button
              type="submit"
              className="w-full min-h-[48px] px-8 py-4 rounded-2xl bg-duo-green text-white font-duo font-bold shadow-lg hover:bg-duo-green-light hover:scale-[1.02] transition-transform active:scale-[0.98]"
            >
              Continuar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ——— Fase: Quiz y pantallas finales ———
  // Pantalla de éxito: estilo Duolingo + Shrek + Ver mi sorpresa (sin tocar lo de Instagram)
  if (finished && passed && showShrek) {
    return (
      <div className="w-full quiz-fullscreen bg-duo-snow px-6 pt-8 pb-10">
        {/* Duo oficial (design.duolingo.com) celebrando */}
        <div className="mb-4 animate-fade-in">
          <img src={`${DUOLINGO_ASSETS_BASE}/${DUO_SVG_IDS[0]}`} alt="" className="h-24 w-auto object-contain" width={100} height={100} />
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
              key={`shrek-gif-${gifKey}`}
              src={`${gifSrc}${gifSrc.includes('?') ? '&' : '?'}n=${gifKey}`}
              alt="Shrek aprobando"
              className="w-full max-w-md rounded-2xl shadow-2xl"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
              loading="eager"
              decoding="async"
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
          ¡Eres digna! 🎉
        </h1>
        <p className="text-duo-eel font-duo mb-8 animate-fade-in">
          Shrek aprueba tu conocimiento 💚
        </p>
        <button
          onClick={onPass}
          className="w-full max-w-xs min-h-[48px] py-4 rounded-2xl font-duo font-bold text-lg uppercase tracking-wide text-white bg-duo-green hover:bg-duo-green-light transition-transform active:scale-[0.98] animate-fade-in"
        >
          Ver mi sorpresa
        </button>
      </div>
    );
  }

  if (finished && !passed) {
    return (
      <div className="w-full quiz-fullscreen bg-duo-red-bg px-6 py-10">
        <img src={`${DUOLINGO_ASSETS_BASE}/${DUO_SVG_IDS[1]}`} alt="" className="h-28 w-auto object-contain mb-6" width={120} height={120} />
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
          className="w-full max-w-xs min-h-[48px] py-4 rounded-2xl font-duo font-bold text-lg uppercase tracking-wide text-white bg-duo-red hover:opacity-95 transition-transform active:scale-[0.98]"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const isImageQuestion = currentQuestion.questionType === 'image' && currentQuestion.imageOptions && currentQuestion.imageOptions.length >= 4;

  // Personajes al frente, integrados con la pregunta (1-2 por pregunta)
  const char1 = QUESTION_CHARACTER_IDS[currentIndex % QUESTION_CHARACTER_IDS.length];
  const char2 = QUESTION_CHARACTER_IDS[(currentIndex + 7) % QUESTION_CHARACTER_IDS.length];

  // Estilo Duolingo: barra verde arriba, tiles, feedback abajo
  return (
    <div className="w-full quiz-screen bg-duo-snow font-duo">
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
      {/* Instrucción */}
      <p className="text-gray-500 font-duo text-sm text-center px-4 pb-2">
        {isImageQuestion ? 'Elige la imagen correcta' : 'Elige la respuesta correcta'}
      </p>

      {/* Pregunta con personajes al frente: uno a la izquierda, texto al centro, otro a la derecha */}
      <div className="px-4 sm:px-6 pb-6 flex items-center justify-center gap-3 sm:gap-4">
        <img
          src={`${DUOLINGO_ASSETS_BASE}/${char1}`}
          alt=""
          className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 object-contain"
          width={64}
          height={64}
        />
        <p className="flex-1 min-w-0 text-duo-eel font-duo font-bold text-lg sm:text-xl md:text-2xl text-center leading-tight">
          {currentQuestion.question}
        </p>
        <img
          src={`${DUOLINGO_ASSETS_BASE}/${char2}`}
          alt=""
          className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 object-contain"
          width={64}
          height={64}
        />
      </div>

      {/* Opciones: tiles como en Duolingo; si es imagen, cuadrícula 2x2 */}
      <div className={`flex-1 overflow-y-auto px-4 sm:px-6 pb-4 max-w-lg mx-auto w-full ${isImageQuestion ? 'grid grid-cols-2 gap-3 content-start' : 'space-y-3'}`}>
        {(isImageQuestion ? (currentQuestion.imageOptions ?? []).slice(0, 4) : currentQuestion.options.map((text) => ({ image: text, label: text }))).map((item, i) => {
          const optionIndex = i;
          const optionText = item.label ?? item.image;
          const optionImage = isImageQuestion ? item.image : undefined;
          const selected = selectedIndex === optionIndex;
          const correct = optionIndex === currentQuestion.correctIndex;
          const showResult = selectedIndex !== null;
          const isCorrectChoice = selected && correct;
          const isWrongChoice = selected && !correct;

          return (
            <button
              key={optionIndex}
              onClick={() => handleSelect(optionIndex)}
              disabled={selectedIndex !== null}
              className={`rounded-2xl font-duo font-bold text-lg transition-colors duration-200 active:scale-[0.98] ${
                isImageQuestion
                  ? `flex flex-col items-stretch justify-start py-3 px-3 min-h-[140px] w-full ${
                      showResult
                        ? isCorrectChoice
                          ? 'bg-duo-green-bg text-duo-green-dark'
                          : isWrongChoice
                          ? 'bg-duo-red-bg text-duo-red-dark'
                          : correct
                          ? 'bg-duo-green-bg text-duo-green-dark'
                          : 'bg-gray-100 text-gray-500'
                        : 'bg-white border-2 border-gray-300 text-duo-eel hover:border-duo-blue hover:bg-gray-50'
                    }`
                  : `w-full py-4 px-5 text-left ${
                      showResult
                        ? isCorrectChoice
                          ? 'bg-duo-green-bg text-duo-green-dark'
                          : isWrongChoice
                          ? 'bg-duo-red-bg text-duo-red-dark'
                          : correct
                          ? 'bg-duo-green-bg text-duo-green-dark'
                          : 'bg-gray-100 text-gray-500'
                        : 'bg-white border-2 border-gray-300 text-duo-eel hover:border-duo-blue hover:bg-gray-50'
                    }`
              }`}
            >
              {isImageQuestion && optionImage ? (
                <>
                  {/* Contenedor fijo para la imagen: no se encoge al mostrar resultado */}
                  <div className="w-full h-24 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    {isImageUrl(optionImage) ? (
                      <img
                        src={optionImage}
                        alt={optionText ?? ''}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center text-4xl md:text-5xl" aria-hidden>{optionImage}</span>
                    )}
                  </div>
                  <span className="text-sm font-normal mt-1.5 line-clamp-1">{optionText}</span>
                  {showResult && correct && <span className="text-duo-green-dark text-xl mt-0.5 flex-shrink-0">✓</span>}
                  {showResult && isWrongChoice && <span className="text-duo-red-dark text-xl mt-0.5 flex-shrink-0">✗</span>}
                </>
              ) : (
                <span className="flex items-center justify-between w-full">
                  {optionText}
                  {showResult && correct && <span className="text-duo-green-dark text-2xl">✓</span>}
                  {showResult && isWrongChoice && <span className="text-duo-red-dark text-2xl">✗</span>}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Panel de feedback inferior (como en las fotos Duolingo) */}
      {showFeedback && (
        <div
          className={`relative z-10 mt-auto rounded-t-3xl px-6 pt-8 pb-10 ${
            lastAnswerCorrect ? 'bg-duo-green-bg' : 'bg-duo-red-bg'
          }`}
        >
          <div className={`flex flex-col items-center gap-2 mb-6 ${lastAnswerCorrect ? 'text-duo-green-dark' : 'text-duo-red-dark'}`}>
            {lastAnswerCorrect ? (
              <>
                <img src={`${DUOLINGO_ASSETS_BASE}/${DUO_SVG_IDS[0]}`} alt="" className="h-16 w-auto object-contain" width={64} height={64} />
                <span className="font-duo font-bold text-2xl">¡Perfecto!</span>
              </>
            ) : (
              <>
                <img src={`${DUOLINGO_ASSETS_BASE}/${DUO_SVG_IDS[1]}`} alt="" className="h-14 w-auto object-contain" width={56} height={56} />
                <span className="font-duo font-bold text-xl">Sigue practicando</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={handleContinue}
            className={`w-full min-h-[48px] py-4 rounded-2xl font-duo font-bold text-lg uppercase tracking-wide text-white transition-transform active:scale-[0.98] ${
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
