import React, { useState, useEffect } from 'react';

interface CountdownSlideProps {
  startDate: Date;
  title?: string;
}

/**
 * Slide con countdown mostrando cuánto tiempo llevan juntos
 * Calcula días, meses y años desde la fecha de inicio
 */
const CountdownSlide: React.FC<CountdownSlideProps> = ({ 
  startDate, 
  title = 'Juntos desde' 
}) => {
  const [timeTogether, setTimeTogether] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0
  });

  useEffect(() => {
    const calculateTimeTogether = () => {
      const now = new Date();
      const start = new Date(startDate);
      
      // Calcular diferencia total en días
      const diffTime = Math.abs(now.getTime() - start.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      // Calcular años, meses y días
      const years = Math.floor(diffDays / 365);
      const remainingDaysAfterYears = diffDays % 365;
      const months = Math.floor(remainingDaysAfterYears / 30);
      const days = remainingDaysAfterYears % 30;
      
      setTimeTogether({
        years,
        months,
        days,
        totalDays: diffDays
      });
    };

    calculateTimeTogether();
    // Actualizar cada minuto
    const interval = setInterval(calculateTimeTogether, 60000);
    
    return () => clearInterval(interval);
  }, [startDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="story-slide bg-gradient-to-br from-valentine-pink via-valentine-light-pink to-white relative">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <span className="text-[12rem]">💑</span>
      </div>
      
      {/* Contenido principal - flex centrado */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 relative z-10 min-h-0">
        <div className="text-center animate-fade-in w-full max-w-sm">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-valentine-dark-red mb-4 drop-shadow-md">
            {title}
          </h2>
          
          {/* Fecha */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-xl">
            <p className="text-lg sm:text-xl font-display text-valentine-dark-red font-semibold">
              {formatDate(startDate)}
            </p>
          </div>
          
          {/* Tiempo juntos */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            {timeTogether.years > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-slide-up">
                <div className="text-2xl sm:text-3xl font-display font-bold text-valentine-red">
                  {timeTogether.years}
                </div>
                <div className="text-xs sm:text-sm font-body text-valentine-dark-red">
                  {timeTogether.years === 1 ? 'Año' : 'Años'}
                </div>
              </div>
            )}
            
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-2xl sm:text-3xl font-display font-bold text-valentine-red">
                {timeTogether.months}
              </div>
              <div className="text-xs sm:text-sm font-body text-valentine-dark-red">
                {timeTogether.months === 1 ? 'Mes' : 'Meses'}
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl sm:text-3xl font-display font-bold text-valentine-red">
                {timeTogether.days}
              </div>
              <div className="text-xs sm:text-sm font-body text-valentine-dark-red">
                {timeTogether.days === 1 ? 'Día' : 'Días'}
              </div>
            </div>
          </div>
          
          {/* Total de días */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg mb-4">
            <p className="text-base sm:text-lg font-body text-valentine-dark-red">
              <span className="font-bold">{timeTogether.totalDays.toLocaleString()}</span> días juntos
            </p>
          </div>
          
          {/* Emoji decorativo */}
          <div className="text-2xl">
            💕✨💕
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CountdownSlide);
