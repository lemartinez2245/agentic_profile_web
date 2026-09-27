export default function Footer({ profile }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {year} {profile.name}. Hecho con FastAPI y React.
        </p>
        <p className="footer__note">
          El código está disponible en{' '}
          <a
            href={profile.contact?.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
