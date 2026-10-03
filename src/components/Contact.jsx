import { useState } from 'react'
import Section from './Section.jsx'
import { links, profile } from '../content/profile.js'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function update(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <Section
      id="contact"
      title="Contact"
      note="Noida or remote. I answer email within a day."
      bodyClass="ledger"
    >
      <div className="ledger__body">
        <p className="contact__lede">Have a role or a problem worth solving?</p>

        <div className="contact__grid">
          <div>
            <div className="detail">
              <span className="detail__key">Email</span>
              <span className="detail__pair">
                <a className="detail__value" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <button className="copy" type="button" onClick={copyEmail}>
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </span>
            </div>
            <div className="detail">
              <span className="detail__key">Phone</span>
              <a className="detail__value" href={`tel:${profile.phoneHref}`}>
                {profile.phone}
              </a>
            </div>
            <div className="detail">
              <span className="detail__key">GitHub</span>
              <a className="detail__value" href={links.github} target="_blank" rel="noreferrer">
                {links.github.replace('https://', '')}
              </a>
            </div>
            <div className="detail">
              <span className="detail__key">LinkedIn</span>
              <a className="detail__value" href={links.linkedin} target="_blank" rel="noreferrer">
                {links.linkedin.replace('https://www.', '')}
              </a>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form__row">
              <div className="field">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={update('name')}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="contact-email">Your email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="contact-message">What do you need built?</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={update('message')}
                required
              />
            </div>

            <div className="form__foot">
              <button className="btn btn--primary" type="submit">
                Open in your email app
              </button>
              <p className="form__hint">
                This fills a draft in whatever mail app you use, so nothing is sent until you press
                send.
              </p>
            </div>
          </form>
        </div>
      </div>
    </Section>
  )
}
