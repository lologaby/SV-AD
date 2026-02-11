# 💖 Tarjeta de San Valentín Virtual - Instagram Stories Style

Una tarjeta de San Valentín interactiva estilo Instagram Stories construida con React, TypeScript y Vite. Perfecta para compartir con tu persona especial en móviles y desktop.

## ✨ Características

- 📱 **Diseño Mobile-First**: Optimizado 100% para móviles
- 🎨 **8 Slides Interactivos**: Variedad de contenido romántico
- 🎭 **Animaciones Suaves**: Transiciones fluidas a 60fps
- 💫 **Gestos Intuitivos**: 
  - Tap derecho = siguiente slide
  - Tap izquierdo = slide anterior
  - Mantener presionado = pausar
- 🔄 **Loop Infinito**: Vuelve al inicio automáticamente
- ⏱️ **Auto-avance**: Cada 5 segundos (configurable)
- 📳 **Vibración en Móvil**: Feedback táctil al cambiar slides
- 🎨 **Paleta Romántica**: Colores rosa, rojo y blanco
- 📸 **Slides Personalizables**: Fácil de modificar y agregar contenido

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+ y npm (o yarn/pnpm)

### Pasos

1. **Clonar o descargar el proyecto**

```bash
cd saint-v
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar servidor de desarrollo**

```bash
npm run dev
```

4. **Abrir en el navegador**

El proyecto estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
saint-v/
├── src/
│   ├── components/
│   │   ├── ValentineStories.tsx      # Componente principal
│   │   └── CustomSlides/
│   │       ├── TextSlide.tsx         # Slide de texto con gradiente
│   │       ├── ReasonsList.tsx       # Lista animada de razones
│   │       ├── PhotoTextSlide.tsx    # Imagen con texto overlay
│   │       ├── CountdownSlide.tsx    # Contador de tiempo juntos
│   │       └── FinalSlide.tsx        # Slide final con compartir
│   ├── types/
│   │   └── stories.ts               # Tipos TypeScript
│   ├── App.tsx                      # Componente raíz
│   ├── main.tsx                     # Punto de entrada
│   └── index.css                    # Estilos globales + Tailwind
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Personalización

### 1. Cambiar las Imágenes

Las imágenes actuales usan URLs de Unsplash. Para usar tus propias imágenes:

1. Coloca tus imágenes en `public/images/`
2. Actualiza las URLs en `src/components/ValentineStories.tsx`:

```typescript
{
  url: '/images/tu-imagen.jpg', // Cambia esta línea
  duration: 5000,
  header: {
    heading: 'Mi Amor ❤️',
    profileImage: '/images/perfil.jpg' // Y esta
  }
}
```

### 2. Personalizar el Countdown

Edita la fecha de inicio en `ValentineStories.tsx`:

```typescript
<CountdownSlide 
  startDate={new Date('2023-06-15')} // 👈 Cambia esta fecha
  title="Juntos desde"
/>
```

### 3. Modificar las Razones

Edita el array de razones en `ValentineStories.tsx`:

```typescript
<ReasonsList 
  reasons={[
    'Tu sonrisa ilumina mi día',
    'Tu forma de ser única y especial',
    // 👆 Agrega o modifica las razones aquí
  ]}
/>
```

### 4. Cambiar Mensajes de Texto

Todos los mensajes están en `ValentineStories.tsx`. Busca los componentes `TextSlide` y modifica el prop `message`:

```typescript
<TextSlide 
  message="Tu mensaje personalizado aquí" // 👈 Cambia esto
  subtitle="Subtítulo opcional"
/>
```

### 5. Personalizar Colores

Los colores están definidos en `tailwind.config.js`:

```javascript
colors: {
  'valentine-pink': '#ff6b9d',
  'valentine-light-pink': '#ffc3d5',
  'valentine-red': '#ff4757',
  'valentine-dark-red': '#c06c84',
}
```

### 6. Agregar Más Slides

En `ValentineStories.tsx`, agrega nuevos objetos al array `stories`:

```typescript
const stories: Story[] = [
  // ... slides existentes
  
  // Nuevo slide
  {
    content: (props) => (
      <TextSlide 
        message="Nuevo mensaje"
        subtitle="Nuevo subtítulo"
      />
    ),
    duration: 5000
  }
];
```

## 🎯 Tipos de Slides Disponibles

### TextSlide
Slide de texto con fondo gradiente.

```typescript
<TextSlide 
  message="Mensaje principal"
  subtitle="Subtítulo opcional"
  gradient="from-valentine-pink via-valentine-red to-valentine-dark-red"
/>
```

### ReasonsList
Lista animada de razones.

```typescript
<ReasonsList 
  reasons={['Razón 1', 'Razón 2', 'Razón 3']}
  title="Razones por las que te amo"
/>
```

### PhotoTextSlide
Imagen con texto overlay.

```typescript
<PhotoTextSlide 
  imageUrl="/images/foto.jpg"
  message="Mensaje sobre la imagen"
  subtitle="Subtítulo opcional"
  overlayOpacity={0.4}
/>
```

### CountdownSlide
Contador de tiempo juntos.

```typescript
<CountdownSlide 
  startDate={new Date('2023-06-15')}
  title="Juntos desde"
/>
```

### FinalSlide
Slide final con opción de compartir.

```typescript
<FinalSlide 
  message="Mensaje final"
  emoji="💖"
  showShareButton={true}
/>
```

## 📱 Uso en Móvil

### Para Probar en tu Móvil:

1. Inicia el servidor de desarrollo: `npm run dev`
2. Encuentra tu IP local (ej: `192.168.1.100`)
3. Accede desde tu móvil: `http://TU_IP:5173`
4. O usa un túnel como ngrok: `npx ngrok http 5173`

### Build para Producción:

```bash
npm run build
```

Los archivos estarán en `dist/`. Puedes desplegarlos en:
- Vercel
- Netlify
- GitHub Pages
- Cualquier hosting estático

## 🎮 Controles

- **Tap Derecho**: Siguiente slide
- **Tap Izquierdo**: Slide anterior
- **Mantener Presionado**: Pausar reproducción
- **Teclado** (desktop): Flechas izquierda/derecha para navegar

## 🛠️ Tecnologías Utilizadas

- **React 18+**: Framework UI
- **TypeScript**: Tipado estático
- **Vite**: Build tool y dev server
- **react-insta-stories**: Componente de stories
- **Tailwind CSS**: Estilos utility-first
- **Google Fonts**: Playfair Display y Poppins

## 📝 Notas Importantes

1. **Imágenes**: Las URLs de Unsplash son placeholders. Reemplázalas con tus propias imágenes para producción.

2. **Fecha del Countdown**: Asegúrate de cambiar la fecha en `CountdownSlide` por tu fecha especial.

3. **Responsive**: El diseño es mobile-first pero funciona perfectamente en desktop (centrado con max-width).

4. **Vibración**: Solo funciona en dispositivos móviles que soporten la API de vibración.

5. **Compartir**: El botón de compartir usa la Web Share API cuando está disponible, con fallback a copiar al portapapeles.

## 🐛 Solución de Problemas

### Las imágenes no se cargan
- Verifica que las rutas sean correctas
- Si usas imágenes locales, colócalas en `public/`
- Revisa la consola del navegador para errores CORS

### Los slides no avanzan
- Verifica que `isPaused` no esté siempre en `true`
- Revisa la consola para errores de JavaScript

### Estilos no se aplican
- Ejecuta `npm install` de nuevo
- Verifica que Tailwind esté configurado correctamente
- Limpia la caché del navegador

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal.

## 💝 Créditos

Creado con ❤️ para San Valentín 2026

---

**¡Feliz San Valentín! 💖**
