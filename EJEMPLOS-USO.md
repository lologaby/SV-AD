# 📖 Ejemplos de Uso - Funcionalidades Nuevas

## 🎵 Slides con Música

Usa el componente `WithMusic` para agregar música a cualquier slide:

```tsx
import WithMusic from './components/WithMusic';
import PhotoTextSlide from './components/CustomSlides/PhotoTextSlide';

// En el array de stories:
{
  content: ({ isPaused }) => (
    <WithMusic
      audioUrl="/music/cancion-romantica.mp3"
      songName="Perfect"
      artist="Ed Sheeran"
      stickerPosition="bottom-left"
      isPaused={isPaused}
      volume={0.5}
    >
      <PhotoTextSlide
        imageUrl="/images/foto-pareja.jpg"
        message="Nuestro momento especial"
      />
    </WithMusic>
  ),
  duration: 8000
}
```

**Notas:**
- La música se auto-reproduce cuando aparece el slide
- Se pausa automáticamente cuando haces "hold" en la story
- El sticker muestra el nombre de la canción
- Coloca tus archivos MP3 en `public/music/`

---

## 🎬 Invitación al Cine

Slide con QR code para la taquilla de Caribbean Cinemas:

```tsx
import CinemaInviteSlide from './components/CustomSlides/CinemaInviteSlide';

{
  content: () => (
    <CinemaInviteSlide
      movieTitle="Deadpool & Wolverine"
      cinema="Caribbean Cinemas Plaza Escorial"
      date="14 de febrero, 2026"
      time="20:30"
      seats="F12, F13"
      qrCodeData="https://tickets.caribbeancinemas.com/123456"
      message="¿Vamos al cine?"
    />
  ),
  duration: 10000
}
```

**Personalización:**
- `qrCodeData`: URL del ticket o código de confirmación
- El QR se puede escanear en la taquilla
- Logo de Caribbean Cinemas incluido

---

## 📅 Stickers de Fecha

Agregar fechas importantes sobre fotos:

```tsx
import DateSticker from './components/Stickers/DateSticker';

{
  url: '/images/primera-cita.jpg',
  duration: 6000,
  content: () => (
    <div className="relative w-full h-full">
      <img src="/images/primera-cita.jpg" className="w-full h-full object-cover" />
      <DateSticker
        date="15 Jun 2023"
        icon="💕"
        position="bottom"
        variant="romantic"
      />
    </div>
  )
}
```

**Variantes:**
- `default`: fondo blanco, texto oscuro
- `romantic`: gradiente rosa/rojo, texto blanco
- `minimal`: fondo negro transparente

---

## 💬 Stickers de Caption (Texto)

Textos sobre imágenes, estilo Instagram:

```tsx
import CaptionSticker from './components/Stickers/CaptionSticker';

{
  url: '/images/atardecer.jpg',
  duration: 6000,
  content: () => (
    <div className="relative w-full h-full">
      <img src="/images/atardecer.jpg" className="w-full h-full object-cover" />
      <CaptionSticker
        text="Eres mi atardecer favorito"
        position="middle"
        variant="neon"
      />
    </div>
  )
}
```

**Variantes:**
- `classic`: texto negro en caja blanca (tradicional)
- `typewriter`: estilo máquina de escribir
- `neon`: texto con efecto neón brillante
- `handwritten`: estilo manuscrito

---

## 🎨 Combinando Todo

Slide con imagen + música + caption:

```tsx
{
  content: ({ isPaused }) => (
    <WithMusic
      audioUrl="/music/nuestra-cancion.mp3"
      songName="All of Me"
      artist="John Legend"
      isPaused={isPaused}
    >
      <div className="relative w-full h-full">
        <img 
          src="/images/nosotros.jpg" 
          className="w-full h-full object-cover"
        />
        <CaptionSticker
          text="Tú y yo, siempre"
          position="top"
          variant="classic"
        />
        <DateSticker
          date="Día 1"
          icon="💖"
          position="bottom"
          variant="romantic"
        />
      </div>
    </WithMusic>
  ),
  duration: 10000
}
```

---

## ⚙️ Optimizaciones Implementadas

✅ **React.memo** en todos los componentes (evita re-renders innecesarios)  
✅ **Lazy loading** de imágenes (`loading="lazy"`)  
✅ **Decoding async** para no bloquear el render  
✅ **Audio optimizado** con pause/resume automático  
✅ **Hold-to-pause** nativo de react-insta-stories  

---

## 📁 Estructura de Archivos Recomendada

```
public/
├── images/
│   ├── foto1.jpg
│   ├── foto2.jpg
│   └── perfil.jpg
└── music/
    ├── cancion1.mp3
    ├── cancion2.mp3
    └── cancion3.mp3
```

---

## 💡 Tips de Rendimiento

1. **Comprime tus imágenes** antes de subirlas:
   - Usa herramientas como TinyPNG o Squoosh
   - Tamaño recomendado: 1080x1920px (vertical)
   - Peso máximo: 500KB por imagen

2. **Música en formato MP3**:
   - Bitrate recomendado: 128kbps
   - Peso máximo: 2MB por canción
   - Duración: máximo 30 segundos (loop automático)

3. **URLs de imágenes externas**:
   - Usa CDN cuando sea posible (Unsplash, Cloudinary)
   - Agrega `?w=1080&q=80` para optimizar

4. **Build de producción**:
   ```bash
   npm run build
   ```
   - El bundle se optimiza automáticamente
   - Tree-shaking elimina código no usado
   - CSS y JS se minifican

---

## 🎯 Checklist antes de publicar

- [ ] Reemplazar imágenes de ejemplo con las tuyas
- [ ] Agregar archivos de música en `public/music/`
- [ ] Personalizar preguntas del quiz
- [ ] Actualizar datos de invitación al cine (fecha, hora, QR)
- [ ] Probar en móvil (gestos, hold-to-pause)
- [ ] Verificar que la música se reproduce correctamente
- [ ] Comprimir imágenes y música
- [ ] Build y deploy

---

¡Listo para sorprender! 💖✨
