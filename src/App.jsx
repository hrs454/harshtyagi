import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Work from './components/Work.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Background from './components/Background.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Projects />
        <Skills />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
