import Section from './Section.jsx'
import { skills } from '../content/profile.js'

export default function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      note="Grouped by how often I use them, which says more than a percentage bar."
    >
      {skills.map((group) => (
        <div className="ledger tier" key={group.tier}>
          <div>
            <h3 className="tier__name">{group.tier}</h3>
            <p className="tier__note">{group.note}</p>
          </div>
          <ul className="tier__items">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  )
}
