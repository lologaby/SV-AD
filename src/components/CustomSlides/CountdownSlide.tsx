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
    <div className="w-full h-full bg-gradient-to-br from-valentine-pink via-valentine-light-pink to-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <span className="text-[20rem]">💑</span>
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 text-center animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-valentine-dark-red mb-8 drop-shadow-md">
          {title}
        </h2>
        
        {/* Fecha */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl">
          <p className="text-2xl md:text-3xl font-display text-valentine-dark-red font-semibold">
            {formatDate(startDate)}
          </p>
        </div>
        
        {/* Tiempo juntos */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {timeTogether.years > 0 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-slide-up">
              <div className="text-4xl md:text-5xl font-display font-bold text-valentine-red">
                {timeTogether.years}
              </div>
              <div className="text-sm md:text-base font-body text-valentine-dark-red mt-1">
                {timeTogether.years === 1 ? 'Año' : 'Años'}
              </div>
            </div>
          )}
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl md:text-5xl font-display font-bold text-valentine-red">
              {timeTogether.months}
            </div>
            <div className="text-sm md:text-base font-body text-valentine-dark-red mt-1">
              {timeTogether.months === 1 ? 'Mes' : 'Meses'}
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl md:text-5xl font-display font-bold text-valentine-red">
              {timeTogether.days}
            </div>
            <div className="text-sm md:text-base font-body text-valentine-dark-red mt-1">
              {timeTogether.days === 1 ? 'Día' : 'Días'}
            </div>
          </div>
        </div>
        
        {/* Total de días */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <p className="text-lg md:text-xl font-body text-valentine-dark-red">
            <span className="font-bold">{timeTogether.totalDays.toLocaleString()}</span> días de felicidad juntos
          </p>
        </div>
        
        {/* Emoji decorativo */}
        <div className="mt-6 text-4xl">
          💕✨💕
        </div>
      </div>
    </div>
  );
};

export default React.memo(CountdownSlide);
