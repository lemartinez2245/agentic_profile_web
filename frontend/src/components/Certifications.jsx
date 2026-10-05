export default function Certifications({ certifications }) {
  if (!certifications?.length) return null

  return (
    <section id="certificaciones" className="section" aria-labelledby="certificaciones-title">
      <div className="container">
        <h2 id="certificaciones-title" className="section__title">
          Certificaciones
        </h2>
        <div className="certifications-grid">
          {certifications.map((cert) => (
            <div key={cert.id || cert.title} className="cert-card">
              <div className="cert-card__content">
                <span className="cert-card__org">{cert.org}</span>
                <h3 className="cert-card__title">{cert.title}</h3>
              </div>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
                  aria-label={`Ver credencial de ${cert.title} emitida por ${cert.org} (se abre en nueva pestaña)`}
                >
                  Ver credencial
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
