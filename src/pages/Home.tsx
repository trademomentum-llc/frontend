import Navigation from '../components/Navigation'
import Hero from '../sections/Hero'
import Capabilities from '../sections/Capabilities'
import Projects from '../sections/Projects'
import Insights from '../sections/Insights'
import Partners from '../sections/Partners'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <main className="relative" style={{ zIndex: 2 }}>
        <Capabilities />
        <Projects />
        <Insights />
        <Partners />
        <Footer />
      </main>
    </>
  )
}
