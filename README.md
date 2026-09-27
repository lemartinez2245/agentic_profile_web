# sample_opencode_app

Web personal de perfil (bio, proyectos y experiencia) construida con **FastAPI** (backend/API) y **React + Vite** (frontend), publicada en **GitHub Pages**.

## Estructura del proyecto

```text
.
├── shared/
│   └── profile.json      # Fuente única de verdad de tu perfil
├── backend/
│   ├── main.py           # API FastAPI (sirve /api/profile)
│   └── requirements.txt
├── frontend/             # App React con Vite
│   └── src/
├── .github/workflows/
│   └── deploy.yml        # Despliegue automático a GitHub Pages
└── README.md
```

**Flujo de datos:** `shared/profile.json` → la API de FastAPI lo sirve en `/api/profile` durante el desarrollo → en producción (GitHub Pages, sin backend) el frontend usa el mismo JSON importado como fallback. Edita **solo** `shared/profile.json` para actualizar tu perfil.

## Desarrollo local

Necesitas **Python 3.10+** y **Node.js 18+**.

### 1. Backend (FastAPI)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API disponible en: <http://localhost:8000/api/profile> (docs en `/docs`).

### 2. Frontend (React)

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Web disponible en: <http://localhost:5173>. Vite redirige `/api/*` al backend.

## Publicar en GitHub Pages

1. Crea el repositorio en GitHub y sube el código:

   ```bash
   git init
   git add .
   git commit -m "Web personal inicial"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/sample_opencode_app.git
   git push -u origin main
   ```

2. En GitHub: **Settings → Pages → Source → GitHub Actions**.

3. Cada push a `main` compila el frontend y lo publica automáticamente.

Tu web quedará en: `https://TU-USUARIO.github.io/sample_opencode_app/`

> Nota: `base: './'` en `vite.config.js` hace que funcione sin importar el nombre del repositorio.

## Editar tu perfil

Todo el contenido (bio, contacto, proyectos, experiencia) vive en [`shared/profile.json`](shared/profile.json). Modifícalo, haz commit y push: la web se actualizará sola.
