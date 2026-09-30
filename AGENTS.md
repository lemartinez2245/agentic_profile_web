# AGENTS.md

## Overview & Architecture
Full-stack personal portfolio web app designed for static deployment to GitHub Pages with an optional FastAPI dev server.
- `shared/profile.json`: Single source of truth for all portfolio data (bio, contact, projects, experience, languages). Uses stable unique string identifiers (`id`) for React list reconciliation.
- `backend/`: Optional FastAPI dev server serving `/api/profile` and `/api/health` from `shared/profile.json`.
- `frontend/`: React 19 + Vite app. In dev, proxies `/api/*` to FastAPI port 8000; in production / fallback, imports `@shared/profile.json` directly for zero-latency, zero-CLS rendering.
- Path aliases: `@` points to `frontend/src`, `@shared` points to `shared`.
- CI/CD (`.github/workflows/deploy.yml`): Triggers on pushes to `main` and builds only `frontend/` (`npm run build`), deploying `frontend/dist` to GitHub Pages via GitHub Actions.

## Developer Commands

### Frontend (`frontend/`)
- Install: `cd frontend && npm install`
- Dev server: `npm run dev` (starts on http://localhost:5173, proxies `/api` -> `http://localhost:8000`)
- Build: `npm run build` (outputs to `frontend/dist/`)
- Preview build: `npm run preview`
- Verification step: `cd frontend && npm run build` (verifies JSX, bundling, alias resolution, and asset integrity)

### Backend (`backend/`)
- Environment setup:
  ```bash
  cd backend
  python3 -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
  ```
- Run dev API: `uvicorn main:app --reload --port 8000`
- API Endpoints: `GET /api/health`, `GET /api/profile`

### Git & Deployment
- Default branch: `main`
- Remote push authentication: Requires a GitHub Personal Access Token (PAT) with `Contents: Read and write` permissions (or classic token with `repo` scope).
- GitHub Pages configuration: Repository Settings -> Pages -> Build and deployment Source must be set to **GitHub Actions**.

## Documentation & Context7 MCP
Use Context7 MCP whenever working with or asking questions about libraries, frameworks, SDKs, APIs, CLI tools, or cloud services (e.g. React 19, Vite, FastAPI, Tailwind, etc.). Do not rely on stale assumptions or training cutoff data.

### Context7 Workflow:
1. **`resolve-library-id`**: Search with the library name and specific query (e.g., library: `"react"`, query: `"react 19 use hook"`).
2. **Select Best Match**: Match official library format (`/org/project`) prioritizing exact match, high benchmark score, and version specificity.
3. **`query-docs`**: Query with the resolved ID and a focused concept (query one concept at a time; separate queries for distinct topics).
4. **Implementation**: Code against the fetched verified documentation.

*Do not use Context7 for:* Internal business logic, repository scripts, general code review, or refactoring existing custom codebase logic.

## Skills & Capabilities

The following agent skills are installed and should be leveraged according to task context:

### UI & Design Skills
- **`ui-ux-pro-max`** (`.agents/skills/ui-ux-pro-max/`):
  - Primary UI/UX design intelligence. Covers 79 styles, 192 product palettes, 74 font pairings, 119 UX guidelines, and stack-specific rules (including React and Tailwind).
  - Searchable CLI utilities: `python3 .agents/skills/ui-ux-pro-max/scripts/search.py [query]`
  - Use when designing new layouts, adjusting theme tokens, checking color contrast, selecting typography, or auditing accessibility.
- **`frontend-design`**:
  - Guidance for intentional, distinctive aesthetic direction.
  - Avoid generic AI/template tropes (default purple gradients, generic cards without hierarchy). Emphasize cohesive typography, deliberate spacing, and domain-appropriate styling (e.g. technical Data & AI Engineer aesthetic).

### Engineering & Workflow Skills
- **`brainstorming`**: MUST be used before any creative work, creating new features, building components, or modifying interface behavior. Explores user intent and options first.
- **`writing-plans` & `executing-plans`**: Use for multi-step tasks. Create a clear spec and broken-down implementation steps before making changes.
- **`test-driven-development`**: Write tests or verification scenarios before implementation code.
- **`systematic-debugging`**: Use when encountering bugs or build failures before proposing fixes. Identify root causes methodically.
- **`verification-before-completion`**: NEVER claim work is complete without running verification commands (`cd frontend && npm run build`) and confirming success output. Evidence before assertions.
- **`requesting-code-review` & `receiving-code-review`**: Request code reviews before finishing major features or merging branches; review feedback with technical rigor.
- **`using-git-worktrees`**: Isolate experimental or major feature branches when needed.

## Coding Standards & Data Modification Rules

### Profile Data (`shared/profile.json`)
- Single source of truth: Modify `shared/profile.json` for all user profile changes (bio, experience, education, projects, languages, links).
- Never hardcode user data inside React components.
- Always include a unique, stable string `id` (e.g., `proj-retail-analytics`, `exp-deep-kernel-labs`, `lang-es`) for React list keys.
- When new fields are added in `shared/profile.json`, update the corresponding React components in `frontend/src/components/` and check CSS in `frontend/src/index.css`.

### Frontend & React 19 Practices
- **No artificial loading delay**: Initial state in hooks (`useProfile`) must immediately load fallback data from `@shared/profile.json` to avoid layout shifts (CLS) on static hosts.
- **Modern syntax**: Use `import { StrictMode } from 'react'` and `import { createRoot } from 'react-dom/client'`. Do not use default `import React from 'react'`.
- **Imports & Aliases**: Use `@/...` for `frontend/src` modules and `@shared/...` for files in `shared/`.
- **Accessibility (a11y)**:
  - All external links opening in a new tab (`target="_blank"`) MUST include `rel="noopener noreferrer"` and a descriptive `aria-label` stating that they open in a new tab (e.g., `aria-label="Perfil de GitHub (abre en nueva pestaña)"`).
  - Use semantic landmarks (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`, `<article>`).
