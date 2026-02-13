import { useState } from 'react'
import WorthyQuiz from './components/WorthyQuiz'
import type { QuizQuestion } from './components/WorthyQuiz'
import ValentineStories from './components/ValentineStories'
import ProfileSwitchAnimation from './components/ProfileSwitchAnimation'

type Stage = 'quiz' | 'stories' | 'profile_switch'

// Preguntas para la prueba "¿Eres digno/a?" — personaliza con datos reales de la pareja
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: '¿Cuál es nuestra canción?',
    options: ['La que ponemos siempre', 'Otra que no es esa', 'No tenemos', 'La del primer beso'],
    correctIndex: 0, // Cambia al índice correcto (0-3)
  },
  {
    question: '¿En qué mes nos conocimos?',
    options: ['Enero', 'Junio', 'Septiembre', 'Diciembre'],
    correctIndex: 1, // Cambia por el mes real
  },
  {
    question: '¿Qué me gusta que me regalen?',
    options: ['Flores', 'Chocolate', 'Tiempo contigo', 'Todo lo anterior'],
    correctIndex: 3,
  },
]

function App() {
  const [stage, setStage] = useState<Stage>('quiz')

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      {stage === 'quiz' && (
        <WorthyQuiz
          questions={QUIZ_QUESTIONS}
          minCorrect={2}
          onPass={() => setStage('stories')}
          passGifUrl="shrek-approval.png"
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
            movieTitle: 'Película Sorpresa 🎬',
            cinema: 'Caribbean Cinemas Plaza Escorial',
            date: '14 de febrero, 2026',
            time: '20:30',
            seats: 'Por confirmar en taquilla',
            qrCodeData: 'https://caribbeancinemas.com/tickets/12345',
            message: '¿Vamos al cine?',
          }}
        />
      )}
    </div>
  )
}

export default App
