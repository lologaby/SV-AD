import React from 'react';

export interface DateInviteSlideProps {
  title?: string;
  message?: string;
  place?: string;
  date?: string;
  time?: string;
  extraNote?: string;
}

/**
 * Slide de invitación a la cita (date) que se muestra después de la animación de "cambio de perfil".
 */
const DateInviteSlide: React.FC<DateInviteSlideProps> = ({
  title = '¿Me acompañas?',
  message = 'Te invito a una cita especial',
  place = 'Lugar por confirmar 💕',
  date = '14 de febrero',
  time = '20:00',
  extraNote = 'Vístete bonito/a, te mereces una noche inolvidable.',
}) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-valentine-dark-red via-valentine-red to-valentine-pink flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <span className="text-[18rem]">💑</span>
      </div>

      <div className="relative z-10 text-center animate-fade-in max-w-md">
        <div className="text-6xl mb-6">🎟️</div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 drop-shadow-2xl">
          {title}
        </h1>
        <p className="text-xl font-body text-white/95 mb-8">{message}</p>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl space-y-4 text-white text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <span className="font-body text-lg">{place}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <span className="font-body text-lg">{date}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🕐</span>
            <span className="font-body text-lg">{time}</span>
          </div>
        </div>

        {extraNote && (
          <p className="mt-6 text-white/90 font-body text-base">{extraNote}</p>
        )}

        <div className="mt-10 flex justify-center gap-4 text-3xl">
          <span>💕</span>
          <span>✨</span>
          <span>💕</span>
        </div>
      </div>
    </div>
  );
};

export default DateInviteSlide;
