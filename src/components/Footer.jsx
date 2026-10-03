import { links, profile } from '../content/profile.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <p>
          Built by {profile.name} with React and hand-written CSS. Hosted on GitHub Pages.
        </p>
        <nav className="footer__links" aria-label="Elsewhere">
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href="#main">Back to top</a>
        </nav>
      </div>
    </footer>
  )
}
