import React, { useState, useEffect } from 'react';

interface ReasonsListProps {
  reasons: string[];
  title?: string;
}

/**
 * Slide con lista animada de razones por las que te amo
 * Cada razón aparece con una animación secuencial
 */
const ReasonsList: React.FC<ReasonsListProps> = ({ 
  reasons, 
  title = 'Razones por las que te amo' 
}) => {
  const [visibleReasons, setVisibleReasons] = useState<number>(0);

  useEffect(() => {
    // Animar la aparición de cada razón con delay
    const timers = reasons.map((_, index) => 
      setTimeout(() => {
        setVisibleReasons(index + 1);
      }, index * 400)
    );

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [reasons]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-valentine-dark-red via-valentine-red to-valentine-pink flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 drop-shadow-lg">
          {title}
        </h2>
        <div className="flex justify-center gap-2 mt-4">
          <span className="text-2xl">💖</span>
          <span className="text-2xl">💕</span>
          <span className="text-2xl">💖</span>
        </div>
      </div>

      {/* Lista de razones */}
      <div className="w-full max-w-md space-y-4">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className={`bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg transform transition-all duration-500 ${
              index < visibleReasons
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl flex-shrink-0">
                {index % 2 === 0 ? '💝' : '✨'}
              </span>
              <p className="text-lg md:text-xl font-body text-white font-semibold">
                {reason}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Contador */}
      <div className="mt-8 text-white/80 text-sm font-body">
        {visibleReasons} / {reasons.length}
      </div>
    </div>
  );
};

export default ReasonsList;
