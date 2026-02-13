import React from 'react';
import QRCode from 'react-qr-code';

export interface CinemaInviteSlideProps {
  movieTitle?: string;
  cinema?: string;
  date?: string;
  time?: string;
  seats?: string;
  screen?: string;
  qrCodeData?: string;
  qrImageUrl?: string;
  ticketNumber?: string;
  posterUrl?: string;
  message?: string;
}

/**
 * Todo en una pantalla, sin scroll. Layout compacto: póster pequeño + tarjeta en fila (info | QR).
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
    <div className="w-full h-full min-h-0 flex flex-col bg-[#0f1419] overflow-hidden">
      {/* Una línea: mensaje */}
      <div className="flex-shrink-0 text-center pt-2 pb-1 px-3">
        <h1 className="text-base font-display font-bold text-white">{message}</h1>
      </div>

      {/* Póster pequeño para que quepa todo */}
      {posterUrl && (
        <div className="flex-shrink-0 flex justify-center px-4 pb-2">
          <div className="w-full max-w-[140px] aspect-[2/3] rounded-lg overflow-hidden bg-white/5">
            <img
              src={posterUrl}
              alt={movieTitle}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* Tarjeta: ocupa el resto, sin scroll — fila [ info | QR ] */}
      <div className="flex-1 min-h-0 flex flex-col justify-center px-3 pb-3">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col min-h-0 max-h-full">
          <div className="p-3 flex flex-1 min-h-0 gap-3">
            {/* Columna izquierda: título + datos */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h2 className="text-sm font-display font-bold text-gray-900 leading-tight line-clamp-2">
                {movieTitle}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">{cinema}</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-2 text-xs">
                <div>
                  <span className="text-gray-400 uppercase">Fecha</span>
                  <p className="font-body text-gray-900 font-medium">{date}</p>
                </div>
                <div>
                  <span className="text-gray-400 uppercase">Hora</span>
                  <p className="font-body text-gray-900 font-medium">{time}</p>
                </div>
                {screen && (
                  <div>
                    <span className="text-gray-400 uppercase">Sala</span>
                    <p className="font-body text-gray-900 font-medium">{screen}</p>
                  </div>
                )}
                <div>
                  <span className="text-gray-400 uppercase">Asientos</span>
                  <p className="font-body text-gray-900 font-medium">{seats}</p>
                </div>
              </div>
            </div>
            {/* Columna derecha: QR + número */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center border-l border-gray-100 pl-3">
              <div className="bg-white p-1.5 rounded-lg border border-gray-100">
                {qrImageUrl ? (
                  <img
                    src={qrImageUrl}
                    alt="QR taquilla"
                    className="w-[72px] h-[72px] object-contain"
                    width={72}
                    height={72}
                  />
                ) : (
                  <QRCode
                    value={qrCodeData}
                    size={72}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                )}
              </div>
              {ticketNumber && (
                <p className="text-sm font-body font-bold text-gray-900 mt-1 text-center">
                  {ticketNumber}
                </p>
              )}
              <p className="text-[10px] text-gray-500 mt-0.5 text-center">Escanea en taquilla</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CinemaInviteSlide);
