export default function Languages({ languages }) {
  if (!languages?.length) return null

  return (
    <section id="idiomas" className="section" aria-labelledby="idiomas-title">
      <div className="container">
        <h2 id="idiomas-title" className="section__title">
          Idiomas
        </h2>
        <div className="languages-grid">
          {languages.map((lang) => (
            <div key={lang.id || lang.name} className="language-card">
              <span className="language-name">{lang.name}</span>
              <span className="language-level">{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
