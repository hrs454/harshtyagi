import { useEffect, useState } from 'react'
import { nav, profile } from '../content/profile.js'

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Private browsing blocks storage; the toggle still works for this visit.
    }
  }, [theme])

  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return active
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path
        strokeLinecap="round"
        d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6M18.6 5.4l-1.6 1.6M7 17l-1.6 1.6M18.6 18.6 17 17M7 7 5.4 5.4"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinejoin="round" d="M20 14.4A8.4 8.4 0 0 1 9.6 4a8.4 8.4 0 1 0 10.4 10.4Z" />
    </svg>
  )
}

export default function Header() {
  const [theme, toggleTheme] = useTheme()
  const active = useActiveSection()

  return (
    <header className="header">
      <div className="wrap header__inner">
        <a className="mark" href="#main">
          <span className="mark__dot" aria-hidden="true" />
          {profile.name}
        </a>

        <nav className="nav" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} aria-current={active === item.id || undefined}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="toggle"
          type="button"
          onClick={toggleTheme}
          aria-pressed={theme === 'dark'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  )
}
