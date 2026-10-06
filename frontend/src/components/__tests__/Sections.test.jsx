import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Certifications from '../Certifications.jsx'
import Experience from '../Experience.jsx'

describe('Experience — línea de tiempo', () => {
  it('retorna null con lista vacía o ausente', () => {
    const { container: empty } = render(<Experience experience={[]} />)
    expect(empty).toBeEmptyDOMElement()
    const { container: missing } = render(<Experience experience={undefined} />)
    expect(missing).toBeEmptyDOMElement()
  })

  it('renderiza títulos, periodos y etiquetas por tipo', () => {
    render(
      <Experience
        experience={[
          {
            id: 'w1',
            type: 'work',
            title: 'Data Engineer',
            org: 'ACME',
            period: '2024 - Hoy',
            description: 'Desc',
          },
          {
            id: 'e1',
            type: 'education',
            title: 'MSc Data',
            org: 'Uni',
            period: '2022 - 2023',
            description: 'Desc',
          },
        ]}
      />,
    )
    expect(screen.getByText('Data Engineer')).toBeInTheDocument()
    expect(screen.getByText('MSc Data')).toBeInTheDocument()
    expect(screen.getByText('Experiencia')).toBeInTheDocument()
    expect(screen.getByText('Formación')).toBeInTheDocument()
  })
})

describe('Certifications — tarjetas con credenciales verificables', () => {
  it('retorna null con lista vacía o ausente', () => {
    const { container: empty } = render(<Certifications certifications={[]} />)
    expect(empty).toBeEmptyDOMElement()
    const { container: missing } = render(
      <Certifications certifications={undefined} />,
    )
    expect(missing).toBeEmptyDOMElement()
  })

  it('muestra botón "Ver credencial" seguro por cada certificación con url', () => {
    render(
      <Certifications
        certifications={[
          { id: 'c1', title: 'Cert A', org: 'Org A', url: 'https://a.example' },
          { id: 'c2', title: 'Cert B', org: 'Org B', url: '' },
        ]}
      />,
    )
    const links = screen.getAllByRole('link', { name: /ver credencial/i })
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAttribute('href', 'https://a.example')
    expect(links[0]).toHaveAttribute('target', '_blank')
    expect(links[0].getAttribute('rel')).toContain('noopener')
  })
})
