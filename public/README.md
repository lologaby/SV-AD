# 📁 Carpeta de Assets Públicos

Coloca aquí tus imágenes y otros recursos estáticos.

## Estructura Recomendada

```
public/
├── images/
│   ├── foto1.jpg          # Imagen principal 1
│   ├── foto2.jpg          # Imagen principal 2
│   ├── foto3.jpg          # Imagen principal 3
│   └── perfil.jpg         # Foto de perfil circular (para headers)
└── sounds/
    └── click.mp3          # Sonido opcional para transiciones
```

## Especificaciones de Imágenes

### Imágenes Principales
- **Formato**: JPG, PNG, WebP
- **Tamaño recomendado**: 1080x1920px (vertical) o 1920x1080px (horizontal)
- **Peso**: Máximo 2MB por imagen para mejor rendimiento
- **Aspecto**: Cualquiera (se ajustará con object-fit: cover)

### Foto de Perfil
- **Formato**: JPG, PNG
- **Tamaño recomendado**: 200x200px (cuadrada)
- **Forma**: Circular (se mostrará como círculo)
- **Peso**: Máximo 500KB

## Cómo Usar

1. Coloca tus imágenes en `public/images/`
2. En `src/components/ValentineStories.tsx`, referencia las imágenes así:
   ```typescript
   url: '/images/foto1.jpg'
   ```
3. Las imágenes estarán disponibles en la ruta `/images/foto1.jpg`

## Nota

Las imágenes en `public/` se copian directamente al build final, por lo que:
- No necesitas importarlas
- Usa rutas absolutas empezando con `/`
- Son accesibles directamente desde el navegador
