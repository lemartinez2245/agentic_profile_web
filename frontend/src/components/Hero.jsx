import { useMemo } from 'react'
import profilePic from '@shared/profile-pic.jpg'

export default function Hero({ profile }) {
  const { name, role, tagline, bio, location, contact } = profile

  const links = useMemo(() => [
    contact?.email && {
      id: 'contact-email',
      label: 'Email',
      href: `mailto:${contact.email}`,
      isExternal: false,
      ariaLabel: `Enviar correo electrónico a ${contact.email}`,
    },
    contact?.github && {
      id: 'contact-github',
      label: 'GitHub',
      href: contact.github,
      isExternal: true,
      ariaLabel: 'Perfil de GitHub (abre en nueva pestaña)',
    },
    contact?.linkedin && {
      id: 'contact-linkedin',
      label: 'LinkedIn',
      href: contact.linkedin,
      isExternal: true,
      ariaLabel: 'Perfil de LinkedIn (abre en nueva pestaña)',
    },
  ].filter(Boolean), [contact])

  return (
    <header className="hero">
      <div className="container">
        <div className="hero__grid">
          {/* Columna de Texto e Información */}
          <div className="hero__content">
            <div className="hero__status">
              <span className="hero__status-indicator"></span>
              <span>Disponible para nuevos retos</span>
            </div>

            <h1 className="hero__name">{name}</h1>

            <div className="hero__role-group">
              <p className="hero__role">{role}</p>
              {tagline && <p className="hero__tagline">{tagline}</p>}
            </div>

            <section className="hero__bio" aria-label="Biografía">
              <p>{bio}</p>
              {location && <span className="hero__meta">📍 {location}</span>}
            </section>

            <nav className="hero__links" aria-label="Enlaces de contacto">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.isExternal ? '_blank' : undefined}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  aria-label={link.ariaLabel}
                  className="btn"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Columna de Foto de Perfil */}
          <div className="hero__media">
            <img
              src={profilePic}
              alt={`Fotografía de perfil de ${name}`}
              className="hero__avatar"
              width="150"
              height="150"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </header>
  )
}