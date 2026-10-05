# Portfolio Web – agentic_profile_web

Sitio web personal de perfil (bio, proyectos, experiencia y contacto) construido con **FastAPI** (backend/API) y **React 19 + Vite** (frontend), desplegado en **GitHub Pages**.

🔗 **Demo en vivo:** https://lemartinez2245.github.io/agentic_profile_web/

---

## Estructura del proyecto

```text
.
├── shared/
│   └── profile.json      # Fuente única de verdad del perfil (bio, proyectos, experiencia, idiomas, enlaces)
├── backend/
│   ├── main.py           # API FastAPI (sirve /api/profile y /api/health)
│   └── requirements.txt
├── frontend/             # App React 19 + Vite
│   └── src/
├── .github/workflows/
│   └── deploy.yml        # Despliegue automático a GitHub Pages
└── README.md
```

**Flujo de datos:** `shared/profile.json` → la API de FastAPI lo sirve en `/api/profile` durante el desarrollo → en producción (GitHub Pages, sin backend) el frontend importa el mismo JSON directamente como fallback, logrando carga instantánea y cero *layout shift*. Para actualizar el contenido, basta editar **solo** `shared/profile.json`.

---

## Desarrollo local

Requisitos: **Python 3.10+** y **Node.js 18+**.

### 1. Backend (FastAPI)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API disponible en: <http://localhost:8000/api/profile> (documentación Swagger en `/docs`).

### 2. Frontend (React + Vite)

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Aplicación disponible en: <http://localhost:5173>. Vite redirige automáticamente `/api/*` al backend en desarrollo.

### Verificación de build

```bash
cd frontend && npm run build
```

Este comando valida JSX, bundling, resolución de aliases (`@/`, `@shared/`) e integridad de assets.

---

## Despliegue en GitHub Pages

El repositorio incluye un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que se ejecuta en cada *push* a `main`:

1. Instala dependencias del frontend
2. Ejecuta `npm run build`
3. Publica el contenido de `frontend/dist/` en GitHub Pages

**Configuración requerida en el repositorio:**
- Settings → Pages → Build and deployment → Source: **GitHub Actions**

La web se publica automáticamente en: **https://lemartinez2245.github.io/agentic_profile_web/**

> Nota: `base: './'` en `vite.config.js` permite que el sitio funcione correctamente independientemente del nombre del repositorio o subdirectorio.

---

## Editar el perfil

Todo el contenido visible (biografía, información de contacto, proyectos, experiencia laboral, formación, idiomas y enlaces sociales) reside en [`shared/profile.json`](shared/profile.json).

Para actualizar la web:
1. Modifica `shared/profile.json`
2. Haz commit y push a `main`
3. GitHub Actions reconstruye y publica automáticamente

No es necesario tocar código React ni CSS para cambios de contenido.

---

## Tecnologías principales

| Área | Stack |
|------|-------|
| Frontend | React 19, Vite, CSS moderno (custom properties, grid/flex) |
| Backend (dev) | FastAPI, Uvicorn, Pydantic |
| Despliegue | GitHub Actions, GitHub Pages |
| Datos | JSON estático (`shared/profile.json`) |
| Alias de rutas | `@/` → `frontend/src`, `@shared/` → `shared/` |

---

## Licencia

Este proyecto es código abierto bajo licencia MIT. Si te sirve de base para tu propio portfolio, ¡adelante!