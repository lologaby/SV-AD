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
    <div className="story-slide bg-gradient-to-br from-valentine-dark-red via-valentine-red to-valentine-pink">
      {/* Header - flex-shrink-0 para que no se comprima */}
      <div className="flex-shrink-0 text-center pt-6 pb-4 px-4 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 drop-shadow-lg">
          {title}
        </h2>
        <div className="flex justify-center gap-2">
          <span className="text-xl">💖</span>
          <span className="text-xl">💕</span>
          <span className="text-xl">💖</span>
        </div>
      </div>

      {/* Lista de razones - scrollable si es necesario */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
        <div className="w-full max-w-md mx-auto space-y-3">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg transform transition-all duration-500 ${
                index < visibleReasons
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg flex-shrink-0">
                  {index % 2 === 0 ? '💝' : '✨'}
                </span>
                <p className="text-sm sm:text-base font-body text-white font-semibold leading-tight">
                  {reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contador - siempre visible en la parte inferior */}
      <div className="flex-shrink-0 py-3 text-center text-white/80 text-sm font-body">
        {visibleReasons} / {reasons.length}
      </div>
    </div>
  );
};

export default React.memo(ReasonsList);
