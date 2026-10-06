import { describe, expect, it } from 'vitest'
import profile from '@shared/profile.json'

const HTTPS_URL = /^https:\/\/.+/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function collectIds(list) {
  return (list || []).map((item) => item.id)
}

describe('shared/profile.json — integridad de datos (fuente única de verdad)', () => {
  it('tiene los campos obligatorios de nivel superior', () => {
    for (const key of [
      'name',
      'role',
      'bio',
      'contact',
      'languages',
      'experience',
      'certifications',
    ]) {
      expect(profile, `falta clave: ${key}`).toHaveProperty(key)
    }
    expect(profile.name.length).toBeGreaterThan(0)
    expect(profile.role.length).toBeGreaterThan(0)
    expect(profile.bio.length).toBeGreaterThan(0)
  })

  it('contacto tiene email válido y enlaces https', () => {
    expect(profile.contact.email).toMatch(EMAIL)
    expect(profile.contact.github).toMatch(HTTPS_URL)
    expect(profile.contact.linkedin).toMatch(HTTPS_URL)
  })

  it('languages tienen ids únicos y no vacíos', () => {
    const ids = collectIds(profile.languages)
    expect(ids.length).toBeGreaterThan(0)
    expect(new Set(ids).size).toBe(ids.length)
    for (const lang of profile.languages) {
      expect(lang.name.length).toBeGreaterThan(0)
      expect(lang.level.length).toBeGreaterThan(0)
    }
  })

  it('experience tiene ids únicos y tipos válidos', () => {
    const ids = collectIds(profile.experience)
    expect(new Set(ids).size).toBe(ids.length)
    for (const item of profile.experience) {
      expect(['work', 'education']).toContain(item.type)
      expect(item.title.length).toBeGreaterThan(0)
      expect(item.org.length).toBeGreaterThan(0)
      expect(item.period.length).toBeGreaterThan(0)
    }
  })

  it('certifications tienen ids únicos y urls https verificables', () => {
    expect(profile.certifications.length).toBeGreaterThan(0)
    const ids = collectIds(profile.certifications)
    expect(new Set(ids).size).toBe(ids.length)
    for (const cert of profile.certifications) {
      expect(cert.title.length).toBeGreaterThan(0)
      expect(cert.org.length).toBeGreaterThan(0)
      expect(cert.url).toMatch(HTTPS_URL)
    }
  })

  it('avatar apunta a un fichero existente declarado', () => {
    // El campo avatar es la referencia canónica usada por Hero.jsx
    expect(profile.avatar).toBe('profile-pic.jpg')
  })
})
