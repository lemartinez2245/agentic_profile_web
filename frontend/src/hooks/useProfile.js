import { useEffect, useState } from 'react'
// Fallback local: la misma fuente de datos que consume la API de FastAPI.
// Se usa en producción (GitHub Pages), donde no hay backend disponible.
import fallbackProfile from '../../../shared/profile.json'

/**
 * Carga los datos del perfil:
 * 1. Intenta obtenerlos de la API de FastAPI (`/api/profile`), disponible en desarrollo.
 * 2. Si no hay backend (por ejemplo, en GitHub Pages), usa los datos embebidos.
 */
export function useProfile() {
  const [profile, setProfile] = useState(fallbackProfile)
  const [source, setSource] = useState('fallback') // 'api' | 'fallback'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('/api/profile', {
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const contentType = res.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) {
          // GitHub Pages devuelve HTML (404) para rutas inexistentes.
          throw new Error('Respuesta no JSON')
        }
        const data = await res.json()
        if (!cancelled) {
          setProfile(data)
          setSource('api')
        }
      } catch {
        // Sin backend: se mantienen los datos del fallback importado.
        if (!cancelled) setSource('fallback')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { profile, source, loading }
}
