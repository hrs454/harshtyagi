import Section from './Section.jsx'
import { work } from '../content/profile.js'
import { highlight } from '../lib/highlight.jsx'

export default function Work() {
  return (
    <Section
      id="work"
      title="Work"
      note="Two roles so far, both spent building the internal tools a business runs on."
    >
      {work.map((role) => (
        <article className="ledger role" key={role.company}>
          <div className="role__meta">
            <p className="role__dates">
              <span className="num">
                {role.start} – {role.end}
              </span>
              {role.current && <span className="role__now">Now</span>}
            </p>
            <p className="role__place">{role.mode}</p>
          </div>

          <div className="role__body">
            <h3 className="role__title">{role.title}</h3>
            <p className="role__company">{role.company}</p>

            <ul className="role__points">
              {role.points.map((point, i) => (
                <li key={i}>{highlight(point)}</li>
              ))}
            </ul>

            <ul className="tags">
              {role.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </Section>
  )
}
