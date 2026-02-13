import React from 'react';
import QRCode from 'react-qr-code';

export interface CinemaInviteSlideProps {
  movieTitle?: string;
  cinema?: string;
  date?: string;
  time?: string;
  seats?: string;
  screen?: string;
  qrCodeData?: string; // URL del ticket o código de confirmación (si no se usa qrImageUrl)
  qrImageUrl?: string; // Imagen QR ya generada (ej. public/qr-tickets.png)
  ticketNumber?: string; // Número de ticket bajo el QR (ej. #9338842)
  posterUrl?: string; // Póster/artwork de la película (ej. public/poster-entre-las-vias.png)
  message?: string;
}

/**
 * Slide de invitación al cine con QR code para la taquilla
 * (El logo del cine ya aparece en la foto de perfil del story.)
 */
const CinemaInviteSlide: React.FC<CinemaInviteSlideProps> = ({
  movieTitle = 'Película Sorpresa',
  cinema = 'Caribbean Cinemas',
  date = '14 de febrero',
  time = '20:30',
  seats = 'Asientos por confirmar',
  screen,
  qrCodeData = 'https://caribbeancinemas.com',
  qrImageUrl,
  ticketNumber,
  posterUrl,
  message = '¿Vamos al cine?',
}) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Efecto de fondo con iconos de cine */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <span className="text-[20rem]">🎬</span>
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in flex flex-col items-center overflow-y-auto">
        {/* Mensaje principal */}
        <div className="text-center mb-4">
          <div className="text-5xl mb-2">🎟️</div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-1 drop-shadow-2xl">
            {message}
          </h1>
          <p className="text-base text-white/80 font-body">Te invito al cine</p>
        </div>

        {/* Póster de la película */}
        {posterUrl && (
          <div className="w-full max-w-[200px] rounded-xl overflow-hidden shadow-2xl mb-4 flex-shrink-0">
            <img
              src={posterUrl}
              alt={movieTitle}
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Ticket estilo tarjeta */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full">
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Asientos</p>
                <p className="text-lg font-body text-gray-800">{seats}</p>
              </div>
              {screen && (
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Sala</p>
                  <p className="text-lg font-body text-gray-800">{screen}</p>
                </div>
              )}
            </div>

            {/* QR Code: imagen proporcionada o generada */}
            <div className="flex flex-col items-center pt-4 pb-2">
              <div className="bg-white p-4 rounded-xl">
                {qrImageUrl ? (
                  <img
                    src={qrImageUrl}
                    alt="Código QR para taquilla"
                    className="w-[180px] h-[180px] object-contain"
                    width={180}
                    height={180}
                  />
                ) : (
                  <QRCode
                    value={qrCodeData}
                    size={180}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                )}
              </div>
              {ticketNumber && (
                <p className="text-center text-lg font-body font-semibold text-gray-800 mt-2">
                  {ticketNumber}
                </p>
              )}
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
