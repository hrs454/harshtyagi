import { useState } from 'react'
import Section from './Section.jsx'
import { links, profile } from '../content/profile.js'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const details = [
    { key: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { key: 'Phone', value: profile.phone, href: `tel:${profile.phoneHref}` },
    { key: 'GitHub', value: links.github.replace('https://', ''), href: links.github },
    {
      key: 'LinkedIn',
      value: links.linkedin.replace('https://www.', ''),
      href: links.linkedin,
    },
  ]

  return (
    <Section
      id="contact"
      title="Contact"
      note="Noida or remote. I answer email within a day."
      bodyClass="ledger"
    >
      <div className="ledger__body">
        <p className="contact__lede">Have a role or a problem worth solving?</p>

        <div className="contact__details">
          {details.map((detail) => (
            <div className="detail" key={detail.key}>
              <span className="detail__key">{detail.key}</span>
              <a
                className="detail__value"
                href={detail.href}
                {...(detail.href.startsWith('http')
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
              >
                {detail.value}
              </a>
            </div>
          ))}
        </div>

        <div className="contact__actions">
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <button className="btn btn--quiet" type="button" onClick={copyEmail}>
            {copied ? 'Copied' : 'Copy email address'}
          </button>
          <a
            className="btn btn--quiet"
            href={import.meta.env.BASE_URL + profile.resume}
            download
          >
            Download résumé
          </a>
        </div>
      </div>
    </Section>
  )
}
