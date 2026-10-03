import Section from './Section.jsx'
import { about } from '../content/profile.js'

export default function About() {
  return (
    <Section
      id="about"
      title="About"
      note="Full-stack engineer, two years in, happiest somewhere between a database and a data table."
      bodyClass="ledger"
    >
      <div className="ledger__body about__body">
        {about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}
