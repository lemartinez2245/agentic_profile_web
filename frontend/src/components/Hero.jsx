export default function Hero({ profile }) {
  const { name, role, tagline, bio, location, contact } = profile

  const links = [
    contact?.email && {
      label: 'Email',
      href: `mailto:${contact.email}`,
    },
    contact?.github && { label: 'GitHub', href: contact.github },
    contact?.linkedin && { label: 'LinkedIn', href: contact.linkedin },
    contact?.twitter && { label: 'X / Twitter', href: contact.twitter },
  ].filter(Boolean)

  return (
    <header className="hero">
      <div className="container">
        <p className="hero__hello">Hola, soy</p>
        <h1 className="hero__name">{name}</h1>
        <p className="hero__role">{role}</p>
        {tagline && <p className="hero__tagline">{tagline}</p>}

        <section className="hero__bio" aria-label="Biografía">
          <p>{bio}</p>
          {location && <p className="hero__location">📍 {location}</p>}
        </section>

        <nav className="hero__links" aria-label="Contacto">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
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
