import { useProfile } from './hooks/useProfile.js'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Certifications from './components/Certifications.jsx'
import Languages from './components/Languages.jsx'
import Footer from './components/Footer.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'

export default function App() {
  const { profile } = useProfile()

  return (
    <>
      <ThemeToggle />
      <Hero profile={profile} />
      <main>
        <Experience experience={profile.experience} />
        <Certifications certifications={profile.certifications} />
        <Languages languages={profile.languages} />
      </main>
      <Footer profile={profile} />
    </>
  )
}
