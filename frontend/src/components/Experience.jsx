const TYPE_LABELS = {
  work: 'Experiencia',
  education: 'Formación',
}

export default function Experience({ experience }) {
  if (!experience?.length) return null

  return (
    <section id="experiencia" className="section" aria-labelledby="experiencia-title">
      <div className="container">
        <h2 id="experiencia-title" className="section__title">
          Experiencia y formación
        </h2>
        <ol className="timeline">
          {experience.map((item) => (
            <li key={item.id || item.title} className="timeline__item">
              <span className={`timeline__badge timeline__badge--${item.type}`}>
                {TYPE_LABELS[item.type] || item.type}
              </span>
              <div className="timeline__content">
                <div className="timeline__header">
                  <h3 className="timeline__title">{item.title}</h3>
                  <span className="timeline__period">{item.period}</span>
                </div>
                <p className="timeline__org">{item.org}</p>
                <p className="timeline__desc">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
