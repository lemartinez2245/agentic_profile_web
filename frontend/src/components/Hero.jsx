export default function Hero({ profile }) {
  const { name, role, tagline, bio, location, contact } = profile

  const links = [
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
    contact?.twitter && {
      id: 'contact-twitter',
      label: 'X',
      href: contact.twitter,
      isExternal: true,
      ariaLabel: 'Perfil de X / Twitter (abre en nueva pestaña)',
    },
  ].filter(Boolean)

  return (
    <header className="hero">
      <div className="container">
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
    </header>
  )
}
