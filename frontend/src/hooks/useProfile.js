import { useEffect, useState } from 'react'
import fallbackProfile from '@shared/profile.json'

/**
 * Carga los datos del perfil:
 * - Inicia inmediatamente con los datos locales (fallbackProfile) para evitar
 *   bloqueos o parpadeos de interfaz (CLS/LCP óptimos).
 * - En segundo plano intenta sincronizar con la API de FastAPI (`/api/profile`) si está disponible.
 */
export function useProfile() {
  const [profile, setProfile] = useState(fallbackProfile)
  const [source, setSource] = useState('fallback') // 'api' | 'fallback'

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
          throw new Error('Respuesta no JSON')
        }
        const data = await res.json()
        if (!cancelled) {
          setProfile(data)
          setSource('api')
        }
      } catch {
        if (!cancelled) setSource('fallback')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { profile, source }
}
