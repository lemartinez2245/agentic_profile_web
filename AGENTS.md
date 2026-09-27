# AGENTS.md

## Overview & Architecture
Full-stack portfolio app designed for static deployment to GitHub Pages.
- `shared/profile.json`: Single source of truth for all portfolio data (bio, contact, projects, experience, languages).
- `backend/`: Optional FastAPI dev server serving `/api/profile` and `/api/health` from `shared/profile.json`.
- `frontend/`: React 19 + Vite app. In dev, proxies `/api/*` to FastAPI port 8000; in production / fallback, imports `shared/profile.json` directly.
- CI/CD (`.github/workflows/deploy.yml`): Triggers on pushes to `main` and builds only `frontend/` (`npm run build`), deploying `frontend/dist` to GitHub Pages. Note: local default git branch may be `master`; CI expects `main`.

## Developer Commands

### Frontend (`frontend/`)
- Install: `cd frontend && npm install`
- Dev server: `npm run dev` (starts on http://localhost:5173, proxies `/api` -> `http://localhost:8000`)
- Build: `npm run build` (outputs to `frontend/dist/`)
- Preview build: `npm run preview`
- Verification step: `cd frontend && npm run build` (verifies JSX, bundling, and asset resolution)

### Backend (`backend/`)
- Environment setup:
  ```bash
  cd backend
  python3 -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
  ```
- Run dev API: `uvicorn main:app --reload --port 8000`

## Data Modification Rules
- When editing user profile information, modify `shared/profile.json`.
- Do not hardcode profile data into frontend components; components should read from props passed down from `profile` in `App.jsx`.
- When adding new profile fields in `shared/profile.json`, update the corresponding React components in `frontend/src/components/` and check styles in `frontend/src/index.css`.
