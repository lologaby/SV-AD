import React from 'react';
import YearSticker from '../Stickers/YearSticker';

export interface PhotoYearSlideProps {
  imageUrl: string;
  year: string;
}

/**
 * Slide de foto con sticker del año (estilo story)
 * La imagen cubre todo el espacio y el año aparece como sticker
 */
const PhotoYearSlide: React.FC<PhotoYearSlideProps> = ({ imageUrl, year }) => {
  return (
    <div className="story-slide bg-black relative">
      <img
        src={imageUrl}
        alt={`${year}`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <YearSticker year={year} position="top-right" />
    </div>
  );
};

export default React.memo(PhotoYearSlide);
