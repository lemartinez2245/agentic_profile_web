export default function Projects({ projects }) {
  if (!projects?.length) return null

  return (
    <section id="proyectos" className="section" aria-labelledby="proyectos-title">
      <div className="container">
        <h2 id="proyectos-title" className="section__title">
          Proyectos
        </h2>
        <div className="projects">
          {projects.map((project) => (
            <article key={project.title} className="card">
              <h3 className="card__title">{project.title}</h3>
              <p className="card__desc">{project.description}</p>
              {project.tech?.length > 0 && (
                <ul className="tags" aria-label="Tecnologías">
                  {project.tech.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
              <div className="card__links">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Código →
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Demo →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
