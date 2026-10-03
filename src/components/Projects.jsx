import Section from './Section.jsx'
import TypingTest from './TypingTest.jsx'
import { projects } from '../content/profile.js'
import useMouseParallax from '../hooks/useMouseParallax.js'

function ProjectCard({ project }) {
  const cardRef = useMouseParallax(8, 0.12)

  return (
    <article
      ref={cardRef}
      className={`project${project.playable ? ' project--live' : ''}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="project__head">
        <h3 className="project__name">{project.name}</h3>
        <p className="project__period num">{project.period}</p>
      </div>
      <p className="project__subtitle">{project.subtitle}</p>
      <p className="project__summary">{project.summary}</p>

      {project.features.length > 0 && (
        <ul className="project__features">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      )}

      {project.metric && (
        <p className="project__metric">
          <b className="num">{project.metric.value}</b>
          {project.metric.label}
        </p>
      )}

      {project.playable && <TypingTest />}

      <ul className="tags">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      {(project.url || project.repo) && (
        <div className="project__links">
          {project.url && (
            <a className="btn btn--primary" href={project.url} target="_blank" rel="noreferrer">
              Open {project.name}
            </a>
          )}
          {project.repo && (
            <a className="btn btn--quiet" href={project.repo} target="_blank" rel="noreferrer">
              Read the code
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      note="Things I built end to end. The typing game below is playable right here."
      bodyClass="ledger"
    >
      <div className="ledger__body projects__body">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
