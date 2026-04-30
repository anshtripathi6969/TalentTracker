import { Navbar } from '../components/ui/Navbar'
import { Hero } from '../components/sections/Hero'
import { Features } from '../components/sections/Features'
import { InteractivePreview } from '../components/sections/InteractivePreview'
import { HowItWorks } from '../components/sections/HowItWorks'
import { Benefits } from '../components/sections/Benefits'
import { DemoShowcase } from '../components/sections/DemoShowcase'
import { FinalCTA } from '../components/sections/FinalCTA'
import { Footer } from '../components/sections/Footer'

export function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <InteractivePreview />
        <HowItWorks />
        <Benefits />
        <DemoShowcase />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
