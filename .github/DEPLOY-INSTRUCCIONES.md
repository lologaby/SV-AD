# Cómo activar GitHub Pages para SV-AD

1. Ve a **Settings** → **Pages** del repo:  
   https://github.com/lologaby/SV-AD/settings/pages

2. En **Build and deployment**:
   - **Source**: elige **Deploy from a branch**
   - **Branch**: elige **gh-pages** y carpeta **/ (root)**
   - Pulsa **Save**

3. El workflow se ejecuta en cada push a `main`. Si quieres lanzarlo a mano:
   - Pestaña **Actions** → **Deploy to GitHub Pages** → **Run workflow**

4. La web quedará en: **https://lologaby.github.io/SV-AD/**

(La primera vez puede tardar 1–2 minutos después de que el workflow termine.)
