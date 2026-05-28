import Preloader from '../src/components/Preloader/Preloader'
import Cursor from '../src/components/Cursor/Cursor'
import AvailabilityBanner from '../src/components/AvailabilityBanner/AvailabilityBanner'
import Navbar from '../src/components/Navbar/Navbar'
import Hero from '../src/sections/Hero/Hero'
import About from '../src/sections/About/About'
import Services from '../src/sections/Services/index'
import Stack from '../src/sections/Stack/index'
import Projects from '../src/sections/Projects/Projects'
import Experience from '../src/sections/Experience/Experience'
import Achievements from '../src/sections/Achievements/Achievements'
import Philosophy from '../src/sections/Philosophy/Philosophy'
import Contact from '../src/sections/Contact/Contact'
// GithubContributions uses `ssr: false` — must be wrapped in a Client Component
// per Next.js 15 rules. The Client Component wrapper handles dynamic() internally.
import GithubContributionsClient from '../src/components/GithubContributionsClient/GithubContributionsClient'
import Footer from '../src/components/Footer/Footer'
import PageClient from '../src/components/PageClient/PageClient'

export default function Home() {
  return (
    <>
      <PageClient />
      <Cursor />
      <AvailabilityBanner />
      <Preloader />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Stack />
        <Experience />
        <Projects />
        <GithubContributionsClient />
        <Achievements />

        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
