import { useState, useEffect } from 'react'
import WorthyQuiz from './components/WorthyQuiz'
import type { QuizQuestion } from './components/WorthyQuiz'
import ValentineStories from './components/ValentineStories'
import ProfileSwitchAnimation from './components/ProfileSwitchAnimation'
import CountdownScreen, { isCountdownReachedOrSkipped, setCountdownSkipped } from './components/CountdownScreen'

type Stage = 'welcome_back' | 'quiz' | 'stories' | 'profile_switch'

const STORAGE_KEY_PASSED = 'sv-ad-passed'

/** Duolingo assets */
const DUOLINGO_ASSETS_BASE = 'https://design.duolingo.com';
const DUO_WINK = '9a6ea4292d92aebb9c5a.svg';

function getInitialStage(): Stage {
  if (typeof window === 'undefined') return 'quiz'
  // Si ya pasó el quiz, mostrar pantalla de "bienvenida" que requiere tap (para desbloquear audio)
  return localStorage.getItem(STORAGE_KEY_PASSED) ? 'welcome_back' : 'quiz'
}

function getShowCountdown(): boolean {
  if (typeof window === 'undefined') return true
  // URL alternativa para skip: /skip (ej. lupitayjuangabriel.com/skip)
  if (typeof window !== 'undefined' && window.location.pathname.includes('/skip')) return false
  return !isCountdownReachedOrSkipped()
}

// Helper para rutas de imágenes con BASE_URL
const base = import.meta.env.BASE_URL;
const image = (path: string) => `${base}${path}`;

// Preguntas para la prueba "¿Eres digna?" — personaliza con datos reales de la pareja
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: 'Si tuviera que dejar alguno de estos alimentos, ¿cuál crees que se me haría difícil dejar?',
    questionType: 'image',
    options: ['Churrasco', 'Dolceroni', 'Oeufs', 'Smash'],
    correctIndex: 1,
    imageOptions: [
      { image: image('images/churrasco.jpg'), label: 'Churrasco' },
      { image: image('images/diavola.avif'), label: 'Dolceroni' },
      { image: image('images/oeufs.webp'), label: 'Oeufs' },
      { image: image('images/smash.avif'), label: 'Smash' },
    ],
  },
  {
    question: '¿A qué lugar fuimos en nuestro primer Date?',
    options: ['Al cine', 'A Ben & Jerry\'s', 'Cold Stone', 'El Bori'],
    correctIndex: 2, // Cold Stone
  },
  {
    question: '¿En qué mes nos conocimos?',
    options: ['Enero', 'Junio', 'Septiembre', 'Octubre', 'Diciembre'],
    correctIndex: 3, // Octubre
  },
  {
    question: 'Si yo fuera a la chocolatería, ¿qué me pediría?',
    options: ['Bombones de chocolate', 'Quesito', 'Cheesecake', 'Un croissant'],
    correctIndex: 3, // Un croissant
  },
]

function App() {
  const [stage, setStage] = useState<Stage>(getInitialStage)
  const [showCountdown, setShowCountdown] = useState(getShowCountdown)

  // Si entraron por /skip: marcar skip y limpiar la URL
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.location.pathname.includes('/skip')) return
    setCountdownSkipped()
    const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')
    window.history.replaceState(null, '', base === '/' ? '/' : base)
  }, [])

  const handleQuizPass = () => {
    localStorage.setItem(STORAGE_KEY_PASSED, '1')
    setStage('stories')
  }

  if (showCountdown) {
    return (
      <CountdownScreen onReached={() => setShowCountdown(false)} />
    )
  }

  return (
    <div className="h-screen-safe w-screen bg-black">
      {/* Pantalla de bienvenida para usuarios que regresan (requiere tap para desbloquear audio) */}
      {stage === 'welcome_back' && (
        <div className="w-full h-full bg-duo-snow flex flex-col items-center justify-center px-6">
          <div className="flex flex-col items-center max-w-md w-full">
            <img 
              src={`${DUOLINGO_ASSETS_BASE}/${DUO_WINK}`} 
              alt="Duo" 
              className="h-32 w-auto object-contain mb-6 animate-fade-in" 
            />
            <h1 className="text-2xl md:text-3xl font-duo font-bold text-duo-eel mb-3 text-center">
              ¡Hola de nuevo!
            </h1>
            <p className="text-duo-eel/70 font-duo text-base text-center mb-8">
              Toca para continuar viendo tu tarjeta
            </p>
            <button
              onClick={() => setStage('stories')}
              className="px-8 py-4 rounded-2xl bg-duo-green text-white font-duo font-bold text-lg shadow-lg hover:bg-duo-green-light hover:scale-[1.02] transition-transform active:scale-[0.98]"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {stage === 'quiz' && (
        <WorthyQuiz
          questions={QUIZ_QUESTIONS}
          minCorrect={2}
          onPass={handleQuizPass}
          passGifUrl={image('shrek.gif')}
          passGifFallbackUrl={image('shrek-approval.png')}
        />
      )}

      {stage === 'stories' && (
        <ValentineStories
          loop={false}
          onAllStoriesEnd={() => setStage('profile_switch')}
        />
      )}

      {stage === 'profile_switch' && (
        <ProfileSwitchAnimation
          cinemaInvite={{
            movieTitle: 'Entre las Vías: La Historia del Tren en PR',
            cinema: 'Plaza Las Américas',
            date: '14 de febrero, 2026',
            time: '7:10 PM',
            seats: 'K10, K11',
            screen: 'Sala 7',
            qrImageUrl: image('qr-tickets.png'),
            ticketNumber: '#9338842',
            posterUrl: image('poster-entre-las-vias.png'),
            message: '¿Me aceptas esta humilde invitación al cine?',
          }}
        />
      )}
    </div>
  )
}

export default App
