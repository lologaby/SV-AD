import React from 'react';

type DuoMood = 'happy' | 'sad' | 'neutral' | 'celebrate';

interface DuoOwlProps {
  size?: number;
  mood?: DuoMood;
  className?: string;
}

/**
 * Mascota tipo Duo (owl) para el tema "Nuestro amor es un Duolingo".
 * Diseño inspirado en búho verde redondo, sin usar assets con copyright.
 */
const DuoOwl: React.FC<DuoOwlProps> = ({ size = 80, mood = 'happy', className = '' }) => {
  const eyeY = mood === 'sad' ? 2 : 0;
  const browAngle = mood === 'sad' ? -8 : mood === 'celebrate' ? 10 : 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Cuerpo verde (Duo green) */}
      <ellipse cx="50" cy="55" rx="38" ry="40" fill="#58CC02" />
      {/* Barriga blanca */}
      <ellipse cx="50" cy="62" rx="28" ry="32" fill="#FFFFFF" />
      {/* Detalle barriga */}
      <ellipse cx="50" cy="58" rx="22" ry="26" fill="#DCF0D9" opacity={0.6} />

      {/* Cabeza / cara */}
      <circle cx="50" cy="32" r="30" fill="#58CC02" />
      {/* Máscara blanca alrededor de ojos */}
      <path
        d="M 28 28 Q 50 38 72 28 Q 72 42 50 48 Q 28 42 28 28 Z"
        fill="#FFFFFF"
      />

      {/* Ojos */}
      <g transform={`translate(0, ${eyeY})`}>
        <ellipse cx="38" cy="30" rx="10" ry="12" fill="#1A1A1A" />
        <ellipse cx="62" cy="30" rx="10" ry="12" fill="#1A1A1A" />
        <circle cx="40" cy="28" r="3" fill="#FFFFFF" />
        <circle cx="64" cy="28" r="3" fill="#FFFFFF" />
      </g>

      {/* Cejas (varían con mood) */}
      <path
        d="M 26 18 Q 38 12 50 18"
        stroke="#1A7F37"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        transform={`rotate(${browAngle} 38 18)`}
      />
      <path
        d="M 50 18 Q 62 12 74 18"
        stroke="#1A7F37"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        transform={`rotate(${-browAngle} 62 18)`}
      />

      {/* Pico */}
      <path
        d="M 48 42 L 50 50 L 52 42 Z"
        fill="#FF9600"
        stroke="#E68600"
        strokeWidth="1"
      />

      {/* Celebración: estrellas alrededor */}
      {mood === 'celebrate' && (
        <>
          <text x="15" y="25" fontSize="14" fill="#FFC800">✦</text>
          <text x="82" y="28" fontSize="12" fill="#FFC800">✦</text>
          <text x="88" y="55" fontSize="10" fill="#FFC800">✦</text>
          <text x="10" y="60" fontSize="10" fill="#FFC800">✦</text>
        </>
      )}
    </svg>
  );
};

export default React.memo(DuoOwl);
