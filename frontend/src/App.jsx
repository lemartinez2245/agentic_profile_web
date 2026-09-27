import { useProfile } from './hooks/useProfile.js'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Languages from './components/Languages.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const { profile, loading } = useProfile()

  if (loading) {
    return (
      <div className="loading" role="status">
        Cargando…
      </div>
    )
  }

  return (
    <>
      <Hero profile={profile} />
      <main>
        <Projects projects={profile.projects} />
        <Experience experience={profile.experience} />
        <Languages languages={profile.languages} />
      </main>
      <Footer profile={profile} />
    </>
  )
}
