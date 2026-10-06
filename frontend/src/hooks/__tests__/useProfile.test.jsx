import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import fallbackProfile from '@shared/profile.json'
import { useProfile } from '../useProfile.js'

describe('useProfile — carga inmediata local + sincronización con API', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('retorna inmediatamente el fallback local (zero-CLS, sin estado vacío)', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => fallbackProfile,
    })
    const { result } = renderHook(() => useProfile())
    // Primer render: datos disponibles al instante, sin parpadeo
    expect(result.current.profile).toEqual(fallbackProfile)
    expect(result.current.profile.name.length).toBeGreaterThan(0)
  })

  it('actualiza a source=api cuando /api/profile responde JSON válido', async () => {
    const apiProfile = { ...fallbackProfile, name: 'Nombre desde API' }
    fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => apiProfile,
    })
    const { result } = renderHook(() => useProfile())
    await waitFor(() => {
      expect(result.current.source).toBe('api')
    })
    expect(result.current.profile.name).toBe('Nombre desde API')
    expect(fetch).toHaveBeenCalledWith(
      '/api/profile',
      expect.objectContaining({ headers: { Accept: 'application/json' } }),
    )
  })

  it('mantiene el fallback con source=fallback si la API falla (500)', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      headers: { get: () => 'application/json' },
      json: async () => ({}),
    })
    const { result } = renderHook(() => useProfile())
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    })
    // Esperar un tick para que el catch se procese; el perfil local sigue intacto
    await act(async () => {})
    expect(result.current.profile).toEqual(fallbackProfile)
    expect(result.current.source).toBe('fallback')
  })

  it('mantiene el fallback si la respuesta no es JSON', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => 'text/html' },
      json: async () => ({}),
    })
    const { result } = renderHook(() => useProfile())
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    })
    await act(async () => {})
    expect(result.current.profile).toEqual(fallbackProfile)
    expect(result.current.source).toBe('fallback')
  })

  it('mantiene el fallback si fetch rechaza (red caída)', async () => {
    fetch.mockRejectedValueOnce(new TypeError('Network error'))
    const { result } = renderHook(() => useProfile())
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    })
    await act(async () => {})
    expect(result.current.profile).toEqual(fallbackProfile)
    expect(result.current.source).toBe('fallback')
  })
})
