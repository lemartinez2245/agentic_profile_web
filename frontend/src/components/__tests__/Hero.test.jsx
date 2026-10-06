import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Hero from '../Hero.jsx'

vi.mock('@shared/profile-pic.jpg', () => ({ default: 'profile-pic.jpg' }))

const baseProfile = {
  name: 'Nombre Apellido',
  role: 'Data Engineer',
  tagline: 'MSc. Data Science',
  bio: 'Bio de ejemplo para tests.',
  location: 'Madrid, España',
  contact: {
    email: 'test@example.com',
    github: 'https://github.com/test',
    linkedin: 'https://linkedin.com/in/test',
  },
}

describe('Hero — cabecera con avatar y enlaces seguros', () => {
  it('renderiza nombre, rol, bio y avatar con atributos anti-CLS', () => {
    render(<Hero profile={baseProfile} />)
    expect(
      screen.getByRole('heading', { level: 1, name: baseProfile.name }),
    ).toBeInTheDocument()
    expect(screen.getByText(baseProfile.role)).toBeInTheDocument()
    expect(screen.getByText(baseProfile.bio)).toBeInTheDocument()

    const img = screen.getByAltText(
      `Fotografía de perfil de ${baseProfile.name}`,
    )
    expect(img).toHaveAttribute('width', '150')
    expect(img).toHaveAttribute('height', '150')
    expect(img).toHaveAttribute('loading', 'eager')
  })

  it('los enlaces externos llevan target, rel seguro y aria-label', () => {
    render(<Hero profile={baseProfile} />)
    const github = screen.getByRole('link', {
      name: /perfil de github/i,
    })
    expect(github).toHaveAttribute('target', '_blank')
    expect(github.getAttribute('rel')).toContain('noopener')
    expect(github.getAttribute('rel')).toContain('noreferrer')

    const linkedin = screen.getByRole('link', {
      name: /perfil de linkedin/i,
    })
    expect(linkedin).toHaveAttribute('target', '_blank')
  })

  it('el email usa mailto sin abrir pestaña nueva', () => {
    render(<Hero profile={baseProfile} />)
    const email = screen.getByRole('link', { name: /correo electrónico/i })
    expect(email.getAttribute('href')).toContain('mailto:')
    expect(email).not.toHaveAttribute('target')
  })
})
