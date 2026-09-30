export default function Footer({ profile }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {year} {profile.name} — Data & Software Engineer
        </p>
        <p className="footer__note">
          Código fuente disponible en{' '}
          <a
            href={profile.contact?.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
