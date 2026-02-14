import React from 'react';
import QRCode from 'react-qr-code';

/** Logo oficial Caribbean Cinemas (https://home.caribbeancinemas.com) */
const CARIBBEAN_CINEMAS_LOGO = 'https://caribbeancinemas.com/img/logo.png';

/** Tema Caribbean Cinemas: burgundy / rojo vino */
const CC_STRIP_GRADIENT = 'linear-gradient(135deg, #6b0f1a 0%, #8B1538 40%, #a01d42 100%)';

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
 * Apple Wallet Pass Style - Cinema Ticket
 * Franja con tema Caribbean Cinemas, logo oficial, miniatura de la película sin romper el diseño.
 */
const CinemaInviteSlide: React.FC<CinemaInviteSlideProps> = ({
  movieTitle = 'Película Sorpresa',
  cinema = 'Caribbean Cinemas',
  date = '14 de febrero',
  time = '20:30',
  seats = 'Por confirmar',
  screen,
  qrCodeData = 'https://caribbeancinemas.com',
  qrImageUrl,
  ticketNumber,
  posterUrl,
  message = '¿Me aceptas esta humilde invitación al cine?',
}) => {
  return (
    <div className="story-slide bg-[#0a0a0a] relative">
      {/* Mensaje superior */}
      <div className="flex-shrink-0 text-center pt-4 pb-3 px-4">
        <p className="text-white/90 font-body text-lg font-semibold">{message}</p>
      </div>

      {/* Contenedor del Wallet Pass */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 pb-4">
        <div 
          className="w-full max-w-[340px] rounded-[18px] overflow-hidden"
          style={{
            background: '#ffffff',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* === FRANJA SUPERIOR: tema Caribbean Cinemas (sin foto de película) === */}
          <div 
            className="relative h-[88px] overflow-hidden flex items-center justify-between px-4"
            style={{ background: CC_STRIP_GRADIENT }}
          >
            {/* Logo oficial Caribbean Cinemas */}
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={CARIBBEAN_CINEMAS_LOGO}
                alt=""
                className="h-9 w-auto object-contain object-left flex-shrink-0 max-w-[140px]"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="text-white font-semibold text-sm truncate drop-shadow-md">{cinema}</span>
            </div>
            {ticketNumber && (
              <span className="text-white/90 text-xs font-mono bg-black/25 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                {ticketNumber}
              </span>
            )}
          </div>

          {/* === CUERPO: miniatura de la película + grid de datos === */}
          <div className="px-4 py-4 bg-white">
            <div className="flex gap-4 mb-4">
              {/* Miniatura de la película (carátula) */}
              {posterUrl && (
                <div className="flex-shrink-0">
                  <div className="w-[72px] h-[108px] rounded-lg overflow-hidden shadow-md ring-1 ring-black/10">
                    <img
                      src={posterUrl}
                      alt={movieTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              {/* Título + grid en el mismo bloque */}
              <div className="flex-1 min-w-0">
                <h2 className="text-gray-900 font-bold text-sm leading-tight line-clamp-2 mb-3">
                  {movieTitle}
                </h2>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              {/* Fecha */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                  Fecha
                </p>
                <p className="text-gray-900 font-semibold text-sm">{date}</p>
              </div>
              
              {/* Hora */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                  Hora
                </p>
                <p className="text-gray-900 font-semibold text-sm">{time}</p>
              </div>
              
              {/* Sala */}
              {screen && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                    Sala
                  </p>
                  <p className="text-gray-900 font-semibold text-sm">{screen}</p>
                </div>
              )}
              
              {/* Asientos */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                  Asientos
                </p>
                <p className="text-gray-900 font-semibold text-sm">{seats}</p>
              </div>
                </div>
              </div>
            </div>

            {/* Línea separadora estilo Wallet */}
            <div className="relative py-3">
              <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-300" />
              {/* Círculos de corte */}
              <div 
                className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                style={{ background: '#0a0a0a' }}
              />
              <div 
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                style={{ background: '#0a0a0a' }}
              />
            </div>
          </div>

          {/* === ZONA DEL CÓDIGO QR (estilo Wallet) === */}
          <div 
            className="px-4 pt-2 pb-5"
            style={{
              background: 'linear-gradient(180deg, #f8f8f8 0%, #f0f0f0 100%)',
            }}
          >
            {/* QR Code */}
            <div className="flex flex-col items-center">
              <div 
                className="bg-white p-3 rounded-xl shadow-sm"
                style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
                }}
              >
                {qrImageUrl ? (
                  <img
                    src={qrImageUrl}
                    alt="Código QR"
                    className="w-[120px] h-[120px] object-contain"
                    width={120}
                    height={120}
                  />
                ) : (
                  <QRCode
                    value={qrCodeData}
                    size={120}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                )}
              </div>
              
              {/* Instrucción */}
              <p className="text-gray-500 text-xs mt-3 text-center font-medium">
                Muestra este código en taquilla
              </p>
              
              {/* Número de ticket si existe */}
              {ticketNumber && (
                <p className="text-gray-400 text-[10px] mt-1.5 font-mono tracking-wide">
                  {ticketNumber}
                </p>
              )}
            </div>
          </div>

          {/* === FOOTER DEL PASS === */}
          <div 
            className="px-4 py-3 flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(180deg, #e8e8e8 0%, #e0e0e0 100%)',
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <svg 
              className="w-4 h-4 text-gray-400" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span className="text-gray-500 text-xs font-medium">Wallet</span>
          </div>
        </div>
      </div>

      {/* Texto inferior */}
      <div className="flex-shrink-0 pb-4 text-center">
        <p className="text-white/50 text-xs font-body">
          Desliza para añadir a Wallet
        </p>
      </div>
    </div>
  );
};

export default React.memo(CinemaInviteSlide);
