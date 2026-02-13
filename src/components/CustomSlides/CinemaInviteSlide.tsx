import React from 'react';
import QRCode from 'react-qr-code';

export interface CinemaInviteSlideProps {
  movieTitle?: string;
  cinema?: string;
  date?: string;
  time?: string;
  seats?: string;
  qrCodeData?: string; // URL del ticket o código de confirmación
  message?: string;
}

/**
 * Slide de invitación al cine con QR code para la taquilla
 * Incluye logo de Caribbean Cinemas
 */
const CinemaInviteSlide: React.FC<CinemaInviteSlideProps> = ({
  movieTitle = 'Película Sorpresa',
  cinema = 'Caribbean Cinemas',
  date = '14 de febrero',
  time = '20:30',
  seats = 'Asientos por confirmar',
  qrCodeData = 'https://caribbeancinemas.com',
  message = '¿Vamos al cine?',
}) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Efecto de fondo con iconos de cine */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <span className="text-[20rem]">🎬</span>
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Logo de Caribbean Cinemas */}
        <div className="flex justify-center mb-6">
          <img
            src="caribbean-cinemas-profile.png"
            alt="Caribbean Cinemas"
            className="h-16 object-contain"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              // Fallback si no carga el logo
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Mensaje principal */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎟️</div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3 drop-shadow-2xl">
            {message}
          </h1>
          <p className="text-lg text-white/80 font-body">Te invito al cine</p>
        </div>

        {/* Ticket estilo tarjeta */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Borde superior decorativo */}
          <div className="h-2 bg-gradient-to-r from-valentine-pink via-valentine-red to-valentine-dark-red"></div>

          <div className="p-6 space-y-4">
            {/* Título de la película */}
            <div className="text-center border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-display font-bold text-gray-900">
                {movieTitle}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{cinema}</p>
            </div>

            {/* Detalles */}
            <div className="grid grid-cols-2 gap-4 text-gray-800">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Fecha</p>
                <p className="text-lg font-body">{date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Hora</p>
                <p className="text-lg font-body">{time}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Asientos</p>
              <p className="text-lg font-body text-gray-800">{seats}</p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="bg-white p-4 rounded-xl">
                <QRCode
                  value={qrCodeData}
                  size={180}
                  level="H"
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>
            </div>

            <p className="text-center text-xs text-gray-500">
              Escanea en la taquilla
            </p>
          </div>

          {/* Borde inferior decorativo (estilo ticket perforado) */}
          <div className="h-6 bg-gray-50 border-t-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="flex gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Emojis decorativos */}
        <div className="flex justify-center gap-4 mt-8 text-3xl">
          <span>🍿</span>
          <span>🎬</span>
          <span>💕</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CinemaInviteSlide);
