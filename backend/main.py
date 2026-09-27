"""
API de la web personal de perfil.

Sirve los datos definidos en `shared/profile.json` como JSON,
para que el frontend (React) pueda consumirlos en desarrollo.

En producción la web se publica como estático en GitHub Pages,
por lo que el frontend incluye una copia de los datos como fallback.
"""

import json
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

PROFILE_PATH = Path(__file__).resolve().parent.parent / "shared" / "profile.json"

app = FastAPI(
    title="Profile API",
    description="API de la web personal de perfil",
    version="0.1.0",
)

# Solo se necesita CORS cuando el frontend corre en un puerto distinto
# (en local normalmente el proxy de Vite evita esto, pero se deja por si acaso).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


def load_profile() -> dict:
    """Lee los datos del perfil desde el archivo compartido."""
    return json.loads(PROFILE_PATH.read_text(encoding="utf-8"))


@app.get("/api/health")
def health() -> dict:
    """Comprobación de que la API está viva."""
    return {"status": "ok"}


@app.get("/api/profile")
def profile() -> dict:
    """Devuelve los datos completos del perfil."""
    return load_profile()
