import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { LandingPage } from './pages/LandingPage'
import DashboardApp from './pages/dashboard/DashboardApp'

function LenisProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  useEffect(() => {
    // Only enable Lenis smooth scroll on the landing page.
    // Dashboard uses its own scroll containers (table, sidebar, drawer)
    // and Lenis would intercept wheel events preventing them from scrolling.
    if (location.pathname.startsWith('/dashboard')) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [location.pathname])

  return <>{children}</>
}

function App() {
  return (
    <div className="bg-dark-900 min-h-screen text-white selection:bg-neon-purple/30 selection:text-white">
      <BrowserRouter>
        <LenisProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardApp />} />
          </Routes>
        </LenisProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

