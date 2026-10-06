import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import ThemeToggle from '../ThemeToggle.jsx'

function ensureFaviconLink() {
  let link = document.getElementById('favicon')
  if (!link) {
    link = document.createElement('link')
    link.id = 'favicon'
    link.rel = 'icon'
    link.href = './favicon-dark.png'
    document.head.appendChild(link)
  }
  return link
}

describe('ThemeToggle — cambio de tema dark/light con persistencia', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    ensureFaviconLink().href = './favicon-dark.png'
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('inicia en modo dark por defecto', () => {
    render(<ThemeToggle />)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(
      screen.getByRole('button', { name: /cambiar a modo claro/i }),
    ).toBeInTheDocument()
  })

  it('respeta el tema guardado previamente en localStorage', () => {
    localStorage.setItem('theme', 'light')
    render(<ThemeToggle />)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(
      screen.getByRole('button', { name: /cambiar a modo oscuro/i }),
    ).toBeInTheDocument()
  })

  it('alterna a light: actualiza data-theme, localStorage y favicon', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /cambiar a modo claro/i })
    fireEvent.click(button)

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.getElementById('favicon').href).toContain(
      'favicon-light.png',
    )
    expect(
      screen.getByRole('button', { name: /cambiar a modo oscuro/i }),
    ).toBeInTheDocument()
  })

  it('alterna de vuelta a dark y restaura el favicon oscuro', () => {
    localStorage.setItem('theme', 'light')
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /cambiar a modo oscuro/i })
    fireEvent.click(button)

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.getElementById('favicon').href).toContain(
      'favicon-dark.png',
    )
  })

  it('es accesible: type=button y aria-label descriptivo', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
    expect(button.getAttribute('aria-label').length).toBeGreaterThan(0)
  })
})
