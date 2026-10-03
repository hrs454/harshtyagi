import { profile, work } from '../content/profile.js'

const facts = [
  { key: 'Based in', value: profile.location },
  { key: 'Currently', value: `${work[0].title}, ${work[0].company}` },
  { key: 'Status', value: profile.availability },
]

export default function Hero() {
  const [first, last] = profile.name.split(' ')
  const resumeHref = import.meta.env.BASE_URL + profile.resume

  return (
    <section className="hero" aria-label="Introduction">
      <div className="wrap hero__inner">
        <h1 className="hero__name reveal">
          <span>{first}</span>
          <span>{last}</span>
        </h1>

        <p className="hero__lede reveal">{profile.statement}</p>

        <div className="hero__actions reveal">
          <a className="btn btn--primary" href="#projects">
            See the work
          </a>
          <a className="btn btn--quiet" href={resumeHref} download>
            Download résumé
          </a>
        </div>

        <dl className="hero__facts reveal">
          {facts.map((fact) => (
            <div className="fact" key={fact.key}>
              <dt className="fact__key">{fact.key}</dt>
              <dd className="fact__value">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
