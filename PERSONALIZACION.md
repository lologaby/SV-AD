# 🎨 Guía de Personalización

Esta guía te ayudará a personalizar completamente tu tarjeta de San Valentín.

## 📸 Paso 1: Agregar tus Imágenes

### Opción A: Usar imágenes locales

1. Crea la carpeta `public/images/` si no existe
2. Coloca tus imágenes allí (ej: `foto1.jpg`, `perfil.jpg`)
3. En `src/components/ValentineStories.tsx`, reemplaza las URLs:

```typescript
{
  url: '/images/foto1.jpg', // 👈 Cambia esto
  duration: 5000,
  header: {
    heading: 'Mi Amor ❤️',
    profileImage: '/images/perfil.jpg' // 👈 Y esto
  }
}
```

### Opción B: Usar URLs externas

Simplemente reemplaza las URLs de Unsplash con tus propias URLs:

```typescript
{
  url: 'https://tu-servidor.com/imagen.jpg',
  duration: 5000,
  header: {
    heading: 'Mi Amor ❤️',
    profileImage: 'https://tu-servidor.com/perfil.jpg'
  }
}
```

## 💑 Paso 2: Personalizar la Fecha del Countdown

En `src/components/ValentineStories.tsx`, busca el slide de CountdownSlide y cambia la fecha:

```typescript
<CountdownSlide 
  startDate={new Date('2023-06-15')} // 👈 Cambia por tu fecha: 'AÑO-MES-DÍA'
  title="Juntos desde"
/>
```

Ejemplo: Si empezaron el 14 de febrero de 2024:
```typescript
startDate={new Date('2024-02-14')}
```

## 💝 Paso 3: Personalizar las Razones

Edita el array de razones en el slide `ReasonsList`:

```typescript
<ReasonsList 
  reasons={[
    'Tu sonrisa ilumina mi día',        // 👈 Edita estas
    'Tu forma de ser única y especial',
    'Cómo me haces reír sin esfuerzo',
    'Tu apoyo incondicional',
    'Los momentos que compartimos',
    'Tu corazón generoso',
    'Cómo me haces sentir amado/a',
    'Eres mi mejor decisión'
  ]}
  title="Razones por las que te amo"  // 👈 O cambia el título
/>
```

## 💌 Paso 4: Personalizar los Mensajes

### Mensajes en TextSlide

Busca los componentes `TextSlide` y modifica:

```typescript
<TextSlide 
  message="Te amo más cada día"        // 👈 Tu mensaje principal
  subtitle="Eres mi persona favorita"  // 👈 Subtítulo opcional
  gradient="from-valentine-pink via-valentine-red to-valentine-dark-red"
/>
```

### Mensaje Final

En el `FinalSlide`:

```typescript
<FinalSlide 
  message="Te amo infinitamente"  // 👈 Cambia este mensaje
  emoji="💖"                      // 👈 Cambia el emoji (💕, 💝, ❤️, etc.)
  showShareButton={true}
/>
```

## 🎨 Paso 5: Personalizar Colores

Edita `tailwind.config.js`:

```javascript
colors: {
  'valentine-pink': '#ff6b9d',      // 👈 Cambia estos colores
  'valentine-light-pink': '#ffc3d5',
  'valentine-red': '#ff4757',
  'valentine-dark-red': '#c06c84',
}
```

Luego puedes usar estos colores en los gradientes:

```typescript
gradient="from-valentine-pink via-valentine-red to-valentine-dark-red"
```

## 📝 Paso 6: Personalizar Headers

Los headers aparecen en las imágenes. Personalízalos:

```typescript
header: {
  heading: 'Mi Amor ❤️',           // 👈 Título principal
  subheading: 'San Valentín 2026', // 👈 Subtítulo (opcional)
  profileImage: 'url-de-imagen.jpg' // 👈 Foto de perfil circular
}
```

## ➕ Paso 7: Agregar Nuevos Slides

Puedes agregar más slides al array `stories`:

```typescript
const stories: Story[] = [
  // ... slides existentes ...
  
  // Nuevo slide de texto
  {
    content: (props) => (
      <TextSlide 
        message="Nuevo mensaje romántico"
        subtitle="Subtítulo opcional"
      />
    ),
    duration: 5000
  },
  
  // Nuevo slide con imagen
  {
    url: '/images/nueva-foto.jpg',
    duration: 5000,
    header: {
      heading: 'Título del slide',
      profileImage: '/images/perfil.jpg'
    }
  }
];
```

## ⏱️ Paso 8: Ajustar Duración de los Slides

Cambia el prop `duration` (en milisegundos):

```typescript
{
  content: (props) => <TextSlide message="Mensaje" />,
  duration: 5000  // 👈 5000ms = 5 segundos
}
```

Recomendaciones:
- Slides de texto: 4000-6000ms
- Slides con lista: 8000-10000ms (más tiempo para leer)
- Slides con imagen: 5000-7000ms

## 🎵 Paso 9: Agregar Sonido (Opcional)

Para agregar sonido al cambiar de slide, edita `ValentineStories.tsx`:

```typescript
const vibrate = useCallback(() => {
  if ('vibrate' in navigator) {
    navigator.vibrate(50);
  }
  
  // Agregar sonido (opcional)
  const audio = new Audio('/sounds/click.mp3');
  audio.volume = 0.3;
  audio.play().catch(() => {}); // Ignorar errores si el usuario no ha interactuado
}, []);
```

Luego coloca tu archivo de sonido en `public/sounds/click.mp3`.

## 📱 Paso 10: Personalizar para Compartir

El botón de compartir usa la Web Share API. Puedes personalizar el mensaje en `FinalSlide.tsx`:

```typescript
await navigator.share({
  title: 'San Valentín ❤️',           // 👈 Cambia esto
  text: message,                        // Usa el mensaje del slide
  url: window.location.href,
});
```

## ✅ Checklist de Personalización

- [ ] Imágenes reemplazadas con tus fotos
- [ ] Fecha del countdown actualizada
- [ ] Razones personalizadas
- [ ] Mensajes de texto personalizados
- [ ] Mensaje final personalizado
- [ ] Headers con nombres/títulos correctos
- [ ] Colores ajustados (si es necesario)
- [ ] Duración de slides ajustada
- [ ] Probado en móvil
- [ ] Probado en desktop

## 🚀 Después de Personalizar

1. Prueba localmente: `npm run dev`
2. Verifica en móvil (usa tu IP local o ngrok)
3. Build para producción: `npm run build`
4. Despliega en Vercel, Netlify, etc.

¡Listo! Tu tarjeta de San Valentín está personalizada. 💖
