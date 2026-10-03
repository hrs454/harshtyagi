import Section from './Section.jsx'
import { background } from '../content/profile.js'

const { education, certification, activities } = background

export default function Background() {
  return (
    <Section
      id="background"
      title="Background"
      note="Where the degree, the certificate and the campus work come from."
      bodyClass="ledger"
    >
      <div className="ledger__body background__body">
        <div className="entry">
          <p className="entry__label">Education</p>
          <h3 className="entry__title">{education.degree}</h3>
          <p className="entry__meta">
            {education.school}, {education.place}
          </p>
          <p className="entry__period num">{education.period}</p>
        </div>

        <div className="entry">
          <p className="entry__label">Certification</p>
          <h3 className="entry__title">{certification.name}</h3>
          <p className="entry__meta">{certification.issuer}</p>
          <p className="entry__period num">{certification.period}</p>
        </div>

        <div className="entry">
          <p className="entry__label">Outside the job description</p>
          <ul>
            {activities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
