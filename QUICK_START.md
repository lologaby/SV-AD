# 🚀 Inicio Rápido

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

## Personalización Rápida

### 1. Cambiar Fecha del Countdown
Edita `src/components/ValentineStories.tsx` línea 83:
```typescript
startDate={new Date('2023-06-15')} // 👈 Tu fecha aquí
```

### 2. Cambiar Imágenes
- Coloca tus imágenes en `public/images/`
- Reemplaza las URLs en `ValentineStories.tsx`:
```typescript
url: '/images/tu-foto.jpg'
```

### 3. Personalizar Mensajes
Busca `TextSlide` y `FinalSlide` en `ValentineStories.tsx` y cambia los mensajes.

## Build para Producción

```bash
npm run build
```

Los archivos estarán en `dist/`. Despliega en Vercel, Netlify, etc.

## 📖 Documentación Completa

- **README.md**: Documentación completa del proyecto
- **PERSONALIZACION.md**: Guía detallada de personalización

## 💡 Tips

- Prueba en móvil usando tu IP local o ngrok
- Las imágenes deben estar en `public/images/`
- Usa formato vertical (1080x1920px) para mejor experiencia móvil

¡Listo para sorprender! 💖
