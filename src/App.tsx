import { useState } from 'react'
import WorthyQuiz from './components/WorthyQuiz'
import type { QuizQuestion } from './components/WorthyQuiz'
import ValentineStories from './components/ValentineStories'
import ProfileSwitchAnimation from './components/ProfileSwitchAnimation'

type Stage = 'quiz' | 'stories' | 'profile_switch'

// Preguntas para la prueba "¿Eres digno/a?" — personaliza con datos reales de la pareja
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: '¿Cuál representa nuestro amor?',
    questionType: 'image',
    options: ['💕', '🎁', '💔', '🍕'],
    correctIndex: 0,
    imageOptions: [
      { image: '💕', label: 'Corazones' },
      { image: '🎁', label: 'Regalo' },
      { image: '💔', label: 'Corazón roto' },
      { image: '🍕', label: 'Pizza' },
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
  const [stage, setStage] = useState<Stage>('quiz')

  return (
    <div className="h-screen-safe w-screen bg-black">
      {stage === 'quiz' && (
        <WorthyQuiz
          questions={QUIZ_QUESTIONS}
          minCorrect={2}
          onPass={() => setStage('stories')}
          passGifUrl="shrek.gif"
          passGifFallbackUrl="shrek-approval.png"
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
            qrImageUrl: 'qr-tickets.png',
            ticketNumber: '#9338842',
            posterUrl: 'poster-entre-las-vias.png',
            message: '¿Me aceptas esta humilde invitación al cine?',
          }}
        />
      )}
    </div>
  )
}

export default App
