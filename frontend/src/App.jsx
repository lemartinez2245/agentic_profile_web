import { useProfile } from './hooks/useProfile.js'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Certifications from './components/Certifications.jsx'
import Languages from './components/Languages.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const { profile } = useProfile()

  return (
    <>
      <Hero profile={profile} />
      <main>
        <Projects projects={profile.projects} />
        <Experience experience={profile.experience} />
        <Certifications certifications={profile.certifications} />
        <Languages languages={profile.languages} />
      </main>
      <Footer profile={profile} />
    </>
  )
}
