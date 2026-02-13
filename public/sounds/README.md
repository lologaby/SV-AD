# Sonidos del quiz (estilo Duolingo)

Para usar tus propios sonidos (por ejemplo tipo Duolingo):

1. Añade aquí:
   - `correct.mp3` — se reproduce al acertar
   - `wrong.mp3` — se reproduce al fallar

2. En `src/components/WorthyQuiz.tsx` cambia:
   ```ts
   const USE_SOUND_FILES = true;
   ```

Si no existen los archivos, se usan los tonos generados por Web Audio.
