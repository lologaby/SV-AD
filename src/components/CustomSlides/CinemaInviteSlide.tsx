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

/** Colores tipo Wallet Pass: strip cine + fondo oscuro */
const CARD_STRIP_BG = '#8B1538';
const PASS_BG = 'linear-gradient(180deg, #1a0a0f 0%, #0f0610 100%)';

/**
 * Slide tipo Apple Wallet Pass: franja de color arriba, cuerpo blanco, zona QR destacada.
 * Todo en una pantalla, sin scroll.
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
    <div
      className="w-full h-full min-h-0 flex flex-col overflow-hidden"
      style={{ background: PASS_BG }}
    >
      {/* Mensaje sobre el pass */}
      <div className="flex-shrink-0 text-center pt-2 pb-1 px-3">
        <h1 className="text-base font-display font-bold text-white/95">{message}</h1>
      </div>

      {/* Póster pequeño */}
      {posterUrl && (
        <div className="flex-shrink-0 flex justify-center px-4 pb-2">
          <div className="w-full max-w-[120px] aspect-[2/3] rounded-lg overflow-hidden ring-2 ring-white/20 shadow-xl">
            <img
              src={posterUrl}
              alt={movieTitle}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* Pass card: strip + cuerpo + zona QR */}
      <div className="flex-1 min-h-0 flex flex-col justify-center px-3 pb-3">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-0 max-h-full border border-white/10">
          {/* Strip superior tipo Wallet — color cine */}
          <div
            className="flex-shrink-0 py-2 px-4 flex items-center justify-center gap-2"
            style={{ backgroundColor: CARD_STRIP_BG }}
          >
            <span className="text-white/90 text-[10px] uppercase tracking-widest font-semibold">
              Admit one
            </span>
            <span className="text-white w-1.5 h-1.5 rounded-full bg-white/80" aria-hidden />
            <span className="text-white/90 text-[10px] uppercase tracking-widest font-semibold">
              Event
            </span>
          </div>

          <div className="flex-1 min-h-0 flex p-3 gap-3">
            {/* Columna info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h2 className="text-sm font-display font-bold text-gray-900 leading-tight line-clamp-2">
                {movieTitle}
              </h2>
              <p className="text-xs text-gray-600 mt-0.5 font-medium">{cinema}</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2 text-xs">
                <div>
                  <span className="text-gray-400 uppercase tracking-wide">Fecha</span>
                  <p className="font-body text-gray-900 font-semibold">{date}</p>
                </div>
                <div>
                  <span className="text-gray-400 uppercase tracking-wide">Hora</span>
                  <p className="font-body text-gray-900 font-semibold">{time}</p>
                </div>
                {screen && (
                  <div>
                    <span className="text-gray-400 uppercase tracking-wide">Sala</span>
                    <p className="font-body text-gray-900 font-semibold">{screen}</p>
                  </div>
                )}
                <div>
                  <span className="text-gray-400 uppercase tracking-wide">Asientos</span>
                  <p className="font-body text-gray-900 font-semibold">{seats}</p>
                </div>
              </div>
            </div>

            {/* Zona QR tipo Wallet — fondo gris suave */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center bg-gray-100 rounded-xl px-2.5 py-2.5 border border-gray-200/80">
              {qrImageUrl ? (
                <img
                  src={qrImageUrl}
                  alt="QR taquilla"
                  className="w-[70px] h-[70px] object-contain"
                  width={70}
                  height={70}
                />
              ) : (
                <QRCode
                  value={qrCodeData}
                  size={70}
                  level="H"
                  bgColor="#f3f4f6"
                  fgColor="#111827"
                />
              )}
              {ticketNumber && (
                <p className="text-xs font-mono font-bold text-gray-800 mt-1.5 text-center leading-tight">
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
