@echo off
REM Sube todos los cambios a GitHub (add + commit + push)
REM Uso: push.cmd "mensaje del commit"
REM Ejemplo: push.cmd "actualizar preview"

if "%~1"=="" (
  echo Uso: push.cmd "mensaje del commit"
  echo Ejemplo: push.cmd "cambios de hoy"
  exit /b 1
)

git add -A
git commit -m "%~1"
if errorlevel 1 (
  echo No habia cambios para commitear. Guarda los archivos y vuelve a intentar.
  pause
  exit /b 1
)
git push origin main
if errorlevel 1 (
  echo Push fallo. Revisa conexion o GitHub.
  pause
  exit /b 1
)
echo Listo: cambios subidos a GitHub.
pause
